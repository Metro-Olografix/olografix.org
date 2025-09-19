#!/usr/bin/env node

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Simple frontmatter parser
function parseFrontmatter(content) {
  const match = content.match(/^---\n(.*?)\n---/s);
  if (!match) return null;

  const lines = match[1].split('\n');
  const data = {};

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return data;
}

// Get all markdown files
function getAllMarkdownFiles(dir, files = []) {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getAllMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Create OG image component (plain object)
function createOGImage(title, subtitle, date, logoBase64) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        background: '#e2e8f0', // indigo-50 equivalent
        fontFamily: 'IBM Plex Mono, monospace',
      },
      children: [
        // Left side - content
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '64px',
              width: '70%',
              height: '100%',
            },
            children: [
              {
                type: 'h1',
                props: {
                  style: {
                    fontSize: '56px',
                    fontWeight: 'bold',
                    marginBottom: '24px',
                    lineHeight: '1.1',
                    color: '#16213e', // primary-dark
                    margin: '0 0 24px 0',
                  },
                  children: title,
                },
              },
              subtitle && {
                type: 'p',
                props: {
                  style: {
                    fontSize: '28px',
                    marginBottom: '20px',
                    color: '#042a59', // accent
                    lineHeight: '1.3',
                    margin: '0 0 20px 0',
                  },
                  children: subtitle,
                },
              },
              date && {
                type: 'p',
                props: {
                  style: {
                    fontSize: '20px',
                    color: '#64748b',
                    marginBottom: '32px',
                    margin: '0 0 32px 0',
                  },
                  children: new Date(date).toLocaleDateString('it-IT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }),
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#16213e',
                  },
                  children: 'Metro Olografix',
                },
              },
            ].filter(Boolean),
          },
        },
        // Right side - accent bar
        {
          type: 'div',
          props: {
            style: {
              width: '30%',
              height: '100%',
              background: 'linear-gradient(135deg, #16213e 0%, #042a59 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  children: [
                    {
                      type: 'img',
                      props: {
                        src: logoBase64,
                        style: {
                          height: '80px',
                          filter: 'brightness(0) invert(1)', // Make it white
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function generateOGImages() {
  console.log('🚀 Generating OG images...');

  // Create output directory
  const outputDir = 'static/images/og';
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Load IBM Plex Mono fonts
  const fonts = [];
  let logoBase64 = '';

  try {
    const regularFont = readFileSync('static/fonts/IBMPlexMono-Regular.ttf');
    const boldFont = readFileSync('static/fonts/IBMPlexMono-Bold.ttf');

    fonts.push({
      name: 'IBM Plex Mono',
      data: regularFont,
      weight: 400,
      style: 'normal',
    });

    fonts.push({
      name: 'IBM Plex Mono',
      data: boldFont,
      weight: 700,
      style: 'normal',
    });

    // Load logo and convert to base64
    const logoBuffer = readFileSync('static/images/metro-light.png');
    logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

    console.log('✅ Loaded IBM Plex Mono fonts and logo');
  } catch (error) {
    console.error('❌ Failed to load fonts or logo:', error.message);
    process.exit(1);
  }

  // Get all markdown files
  const markdownFiles = getAllMarkdownFiles('content');
  console.log(`📄 Found ${markdownFiles.length} markdown files`);

  let generated = 0;

  // Language mapping and regex compilation (moved outside the loop)
  const languageMap = {
    'italiano': 'it',
    'english': 'en',
    'spanish': 'es'
  };
  const langRegex = new RegExp(Object.keys(languageMap).join('|'), 'g');

  for (const filePath of markdownFiles) {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const frontmatter = parseFrontmatter(content);

      if (!frontmatter?.title) continue;

      // Generate image filename
      let relativePath = filePath.replace('content/', '').replace('.md', '');
      // Replace language names using regex and mapping
      relativePath = relativePath.replace(langRegex, matched => languageMap[matched]);
      const imageFileName = relativePath.replace(/\//g, '-') + '.png';
      const imagePath = join(outputDir, imageFileName);

      // Skip if image exists and is up-to-date
      if (existsSync(imagePath)) {
        const imageStat = statSync(imagePath);
        const markdownStat = statSync(filePath);
        if (imageStat.mtime >= markdownStat.mtime) continue;
      }

      console.log(`🎨 Generating: ${imageFileName}`);

      // Create component
      const component = createOGImage(
        frontmatter.title,
        frontmatter.subtitle,
        frontmatter.date,
        logoBase64
      );

      // Generate SVG
      const svg = await satori(component, {
        width: 1200,
        height: 630,
        fonts,
      });

      // Convert to PNG
      const resvg = new Resvg(svg);
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      // Save
      writeFileSync(imagePath, pngBuffer);
      generated++;

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  console.log(`✅ Generated ${generated} new images`);
}

// Run
generateOGImages().catch(console.error);