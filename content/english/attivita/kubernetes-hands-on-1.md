---
title: "Kubernetes Hands On - Part 1"
subtitle: "Kubernetes and YAML: from manifest basics to cluster management with kubectl. With Matteo Antonio Augelli"
date: "2025-05-10T16:00:00"
endDate: "2025-05-10T18:00:00"
recurring: false
location: "Metro Olografix Headquarters - Viale Marconi 278/1, Pescara"
locationUrl: "https://www.openstreetmap.org/node/12539021893"
---

### **Description**  
We will cover an essential but solid overview of the fundamental concepts related to using Kubernetes and YAML. We'll start with the basics of YAML syntax, useful for writing clear and correct configuration files, and then explore the typical structure of Kubernetes manifests, understanding the main fields such as `apiVersion`, `kind`, `metadata`, and `spec`. We will delve into the use of `kubectl`, the main command-line tool for interacting with a cluster, learning both reading commands and those for creating and managing resources. We'll close with an in-depth look at the structure of the `.kube/config` file, essential for working with multiple clusters and contexts.

### Required Materials

None

### Activity Content (brief version)

- YAML Syntax (structure, arrays, objects, override, multiline, types)
- K8s file structure (`apiVersion`, `kind`, `metadata`, `spec`)
- Basic `kubectl` commands (get, describe, explain, apply, port-forward)
- Creating resources: Pod, ReplicaSet, Deployment
- Configuration and management of the `.kube/config` file

### Activity Content (extended version)

#### 🧾 YAML

- **File structure**: based on space indentation, represents hierarchical data.
- **Dictionary (Maps)**: key-value pairs.
- **Array (Lists)**: ordered list of elements.
- **Anchors and Aliases**: allow reuse and extension of structures.
- **Inline objects**: representation on a single line.
- **Overrides**: overwriting values from aliases or anchors.
- **Folded (`>`)**: multiline text with newlines converted to spaces.
- **Literal (`|`)**: multiline text that preserves newlines.
- **Strict Type**: explicit type coercion (e.g., string, integer, boolean).

---

#### ☸️ Kubernetes File Structure – Simple Overview

- **apiVersion**: defines the K8s API version for the resource.
- **kind**: specifies the type of resource (e.g., Pod, Deployment).
- **metadata**: descriptive information (name, namespace, labels).
- **spec**: defines the specific configuration of the resource.

---

#### 🛠️ kubectl – Overview

- **Install**: procedure for installing the `kubectl` client.
- **Syntax**: command-line command structure.
- **api-resources**: shows resources supported by the API server.
- **get / describe / explain**: retrieval, inspection, and explanation of resources.
- **port-forward**: maps a local port to a resource in the cluster.

---

#### 📦 kubectl – Work

- **apply**: applies a configuration file to the cluster.
- **create pod**: manually creates a Pod.
- **create replica set**: defines and creates a ReplicaSet.
- **create deployment**: defines and creates a Deployment.

---

#### 🎁 Bonus – Structure of `.kube/config` file

- **clusters**: defines the configured clusters.
- **users**: defines access credentials.
- **contexts**: associates a user with a cluster.
- **current-context**: indicates the active context.

---

Duration: 2 hours