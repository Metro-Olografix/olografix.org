# olografix.org - Il sito ufficiale di Metro Olografix

Questo sito è costruito utilizzando Hugo, un framework per la creazione di siti web statici.

## Cosa c'è in questo repository

Questo repository contiene tutto il codice sorgente necessario per generare il sito [olografix.org](https://olografix.org). Il sito è multilingua (italiano, inglese e spagnolo) e presenta diverse sezioni:

- **Attività**: workshop, corsi, eventi passati e futuri
- **Progetti**: iniziative portate avanti dall'associazione
- **Photogallery**: raccolta di foto degli eventi passati
- Sezione sulla sede e sulle informazioni dell'associazione

## Come iniziare

Per contribuire al sito, avrai bisogno di:

1. **Hugo Extended** - [Istruzioni di installazione](https://gohugo.io/installation/)
2. **Git**
3. **VS Code** con l'estensione **Front Matter CMS** (consigliato)

### Installazione e test locale

```bash
# Clona il repository
git clone https://github.com/Metro-Olografix/olografix.org.git
cd olografix.org

# Avvia il server di sviluppo
hugo server -D
```

Ora puoi vedere il sito in esecuzione all'indirizzo [http://localhost:1313](http://localhost:1313)

## Usare Front Matter CMS (metodo consigliato)

[Front Matter CMS](https://frontmatter.codes/) è un'estensione per VS Code che semplifica la gestione dei contenuti Hugo. Il repository è già configurato per utilizzarla.

### Installazione

1. Apri VS Code
2. Installa l'estensione **Front Matter CMS** (`eliostruyf.vscode-front-matter`) dal marketplace
3. Apri la cartella del repository in VS Code

### Come usarla

Una volta installata, vedrai l'icona di Front Matter nella barra laterale sinistra (icona con la "FM").

**Dashboard**: Clicca sull'icona per aprire la dashboard dove puoi:
- Vedere tutti i contenuti del sito organizzati per tipo
- Creare nuove attività, progetti o pagine
- Modificare i contenuti esistenti

**Creare una nuova attività**:
1. Apri la dashboard di Front Matter
2. Clicca su "Create content"
3. Seleziona il tipo di contenuto (es. "attivita")
4. Compila i campi del frontmatter tramite l'interfaccia grafica
5. Scrivi il contenuto nel pannello dell'editor

**Modificare un contenuto esistente**:
1. Apri un file `.md` dalla dashboard o dall'explorer
2. Il pannello laterale di Front Matter mostrerà tutti i campi del frontmatter
3. Modifica i valori direttamente dall'interfaccia grafica

### Vantaggi

- Non devi ricordare la sintassi del frontmatter
- Autocompletamento dei campi
- Validazione automatica dei valori
- Anteprima delle date in formato leggibile
- Gestione semplificata delle immagini

## Contribuire al sito

### Come aprire una Pull Request

Ci sono due metodi per contribuire, a seconda che tu faccia parte o meno dell'organizzazione Metro Olografix su GitHub:

**Se sei membro dell'organizzazione:**
1. Crea un nuovo branch direttamente nel repository:
   ```bash
   git checkout -b nome-del-branch
   ```
2. Effettua le modifiche e committa:
   ```bash
   git add .
   git commit -m "Descrizione delle modifiche"
   ```
3. Pusha il tuo branch:
   ```bash
   git push origin nome-del-branch
   ```
4. Vai su GitHub e crea una Pull Request dal tuo branch verso il branch main.

**Se NON sei membro dell'organizzazione:**
1. Fai un fork del repository tramite il pulsante "Fork" in alto a destra su GitHub
2. Clona il tuo fork:
   ```bash
   git clone https://github.com/TUO-USERNAME/olografix.org.git
   ```
3. Crea un branch per le tue modifiche:
   ```bash
   git checkout -b nome-del-branch
   ```
4. Effettua le modifiche e committa:
   ```bash
   git add .
   git commit -m "Descrizione delle modifiche"
   ```
5. Pusha il tuo branch:
   ```bash
   git push origin nome-del-branch
   ```
6. Vai sul tuo fork su GitHub e crea una Pull Request verso il repository originale.

### Aggiungere una nuova attività

Le attività sono uno degli elementi più importanti del sito. Ecco come aggiungerne una nuova:

1. Crea un nuovo file markdown nella cartella `content/italiano/attivita/` con un nome significativo (es: `workshop-arduino.md`)
2. Aggiungi il frontmatter necessario seguendo questo template:

```markdown
---
title: "Nome dell'Attività"
subtitle: "Una breve descrizione dell'attività"
date: "2023-11-15T18:30:00"  # Data di inizio dell'evento
endDate: "2023-11-15T20:30:00"  # Data di fine (opzionale)
recurring: false  # true se l'evento è ricorrente
recurrenceType: "weekly"  # weekly, bi-weekly, monthly (se ricorrente)
recurrenceDay: "wednesday"  # giorno della settimana (se ricorrente)
recurrenceCount: 10  # numero di ricorrenze (se ricorrente)
location: "Sede Metro Olografix - Viale Marconi 278/1, Pescara"  # Luogo dell'evento
locationUrl: "https://www.openstreetmap.org/node/12539021893"  # Link alla mappa
externalUrl: ""  # URL dell'evento esterno (opzionale)
---

Qui inserisci la descrizione dettagliata dell'attività. Puoi usare il markdown per formattare il testo.

**Materiale necessario**:
- Item 1
- Item 2

**Contenuti del workshop**:
1. Introduzione a...
2. Come funziona...
3. Esercitazioni pratiche
```

3. Per rendere l'attività disponibile anche in altre lingue, crea file corrispondenti nelle cartelle `content/english/attivita/` e `content/spanish/attivita/` con lo stesso nome file.

### Tradurre un'attività o un contenuto esistente

Per aggiungere una traduzione di un contenuto esistente:

1. Identifica il file che vuoi tradurre nella cartella della lingua originale
2. Crea un file con lo stesso nome nella cartella della lingua di destinazione
3. Copia il frontmatter, traducendo i campi `title`, `subtitle` e il contenuto
4. Assicurati che i parametri come `date`, `recurring`, ecc. siano identici

Esempio per tradurre in inglese:
1. Da: `content/italiano/attivita/workshop-golang.md`
2. A: `content/english/attivita/workshop-golang.md`

### Struttura del repository

```
olografix.org/
├── content/                  # Contenuti del sito
│   ├── italiano/             # Contenuti in italiano
│   │   ├── attivita/         # Eventi e workshop
│   │   ├── progetti/         # Progetti dell'associazione
│   │   └── photogallery/     # Galleria fotografica
│   ├── english/              # Contenuti in inglese
│   └── spanish/              # Contenuti in spagnolo
├── layouts/                  # Template e layout
│   ├── _default/            
│   ├── partials/            
│   └── shortcodes/          
├── static/                   # File statici (CSS, JS, immagini)
├── assets/                   # Asset gestiti da Hugo
└── config.toml               # Configurazione del sito
```

## Funzionalità specifiche

### Eventi ricorrenti

Per gli eventi ricorrenti, è importante compilare correttamente i campi:
- `recurring: true`
- `recurrenceType`: specificare il tipo (weekly, bi-weekly, monthly)
- `recurrenceDay`: specificare il giorno della settimana
- `recurrenceCount`: specificare il numero di occorrenze

### Progetti esterni

Per i progetti con un sito esterno dedicato:
- Usa `externalUrl` nel frontmatter per specificare l'URL esterno
- Opzionalmente, usa `footerUrl` per un pulsante nel footer

## Multilingua

Il sito supporta tre lingue:
- Italiano (predefinito)
- Inglese 
- Spagnolo

Le traduzioni per l'interfaccia si trovano nei file:
- `i18n/it.toml`
- `i18n/en.toml`
- `i18n/es.toml`

## Test e pubblicazione

Prima di fare una pull request, assicurati che:

1. Il sito funzioni correttamente in locale (`hugo server`)
2. Il contenuto sia formattato correttamente 
3. Tutte le traduzioni necessarie siano presenti
4. I link interni ed esterni funzionino

## Contributors

<a href="https://github.com/Metro-Olografix/olografix.org/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Metro-Olografix/olografix.org" />
</a>
