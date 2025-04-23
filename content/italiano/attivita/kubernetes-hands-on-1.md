---
title: "Kubernetes Hands On - Parte 1"
subtitle: "Kubernetes e YAML: dalle basi dei manifest alla gestione di cluster con kubectl. Con Matteo Antonio Augelli"
date: "2025-05-10T16:00:00"
endDate: "2025-05-10T18:00:00"
recurring: false
location: "Sede Metro Olografix - Viale Marconi 278/1, Pescara"
locationUrl: "https://www.openstreetmap.org/node/12539021893"
---

### **Descrizione**  
Affronteremo una panoramica essenziale ma solida dei concetti fondamentali legati all’uso di Kubernetes e YAML. Partiremo dalle basi della sintassi YAML, utile per scrivere file di configurazione chiari e corretti, per poi esplorare la struttura tipica dei manifest di Kubernetes, comprendendo i campi principali come `apiVersion`, `kind`, `metadata` e `spec`. Approfondiremo l’uso di `kubectl`, il principale strumento da linea di comando per interagire con un cluster, imparando sia i comandi di lettura che quelli per creare e gestire risorse. Chiuderemo con un approfondimento sulla struttura del file `.kube/config`, fondamentale per lavorare con più cluster e contesti.

### Materiale necessario

Nessuno 

### Contenuti dell'attività (versione breve)

- Sintassi YAML (struttura, array, oggetti, override, multilinea, tipi)
- Struttura dei file K8s (`apiVersion`, `kind`, `metadata`, `spec`)
- Comandi base di `kubectl` (get, describe, explain, apply, port-forward)
- Creazione di risorse: Pod, ReplicaSet, Deployment
- Configurazione e gestione del file `.kube/config`

### Contenuti dell'attività (versione estesa)

#### 🧾 YAML

- **Struttura file**: basata su indentazione a spazi, rappresenta dati gerarchici.
- **Dictionary (Mappe)**: coppie chiave-valore.
- **Array (Liste)**: elenco ordinato di elementi.
- **Anchors e Aliases**: permettono il riuso e l’estensione di strutture.
- **Oggetti inline**: rappresentazione su una sola riga.
- **Overrides**: sovrascrittura di valori da alias o anchor.
- **Folded (`>`)**: testo multilinea con newline convertiti in spazi.
- **Literal (`|`)**: testo multilinea che preserva i newline.
- **Strict Type**: coercizione esplicita dei tipi (es. stringa, intero, booleano).

---

#### ☸️ Kubernetes File Structure – Simple Overview

- **apiVersion**: definisce la versione dell’API K8s per la risorsa.
- **kind**: specifica il tipo di risorsa (es. Pod, Deployment).
- **metadata**: informazioni descrittive (nome, namespace, etichette).
- **spec**: definisce la configurazione specifica della risorsa.

---

#### 🛠️ kubectl – Overview

- **Install**: procedura per installare il client `kubectl`.
- **Syntax**: struttura dei comandi da riga di comando.
- **api-resources**: mostra le risorse supportate dall’API server.
- **get / describe / explain**: recupero, ispezione e spiegazione delle risorse.
- **port-forward**: mappa una porta locale a una risorsa nel cluster.

---

#### 📦 kubectl – Work

- **apply**: applica un file di configurazione al cluster.
- **create pod**: crea un Pod manualmente.
- **create replica set**: definisce e crea un ReplicaSet.
- **create deployment**: definisce e crea un Deployment.

---

#### 🎁 Bonus – Struttura file `.kube/config`

- **clusters**: definisce i cluster configurati.
- **users**: definisce le credenziali di accesso.
- **contexts**: associa un utente a un cluster.
- **current-context**: indica il contesto attivo.

---

Durata: 2 ore