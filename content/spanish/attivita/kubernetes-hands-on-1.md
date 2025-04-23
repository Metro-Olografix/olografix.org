---
title: "Kubernetes Hands On - Parte 1"
subtitle: "Kubernetes y YAML: desde los fundamentos de manifiestos hasta la gestión de clústeres con kubectl. Con Matteo Antonio Augelli"
date: "2025-05-10T16:00:00"
endDate: "2025-05-10T18:00:00"
recurring: false
location: "Sede Metro Olografix - Viale Marconi 278/1, Pescara"
locationUrl: "https://www.openstreetmap.org/node/12539021893"
---

### **Descripción**  
Abordaremos una visión general esencial pero sólida de los conceptos fundamentales relacionados con el uso de Kubernetes y YAML. Comenzaremos con los fundamentos de la sintaxis YAML, útil para escribir archivos de configuración claros y correctos, para luego explorar la estructura típica de los manifiestos de Kubernetes, comprendiendo los campos principales como `apiVersion`, `kind`, `metadata` y `spec`. Profundizaremos en el uso de `kubectl`, la principal herramienta de línea de comandos para interactuar con un clúster, aprendiendo tanto los comandos de lectura como los de creación y gestión de recursos. Cerraremos con un análisis detallado de la estructura del archivo `.kube/config`, fundamental para trabajar con múltiples clústeres y contextos.

### Material necesario

Ninguno

### Contenido de la actividad (versión breve)

- Sintaxis YAML (estructura, arrays, objetos, sobrescritura, multilínea, tipos)
- Estructura de archivos K8s (`apiVersion`, `kind`, `metadata`, `spec`)
- Comandos básicos de `kubectl` (get, describe, explain, apply, port-forward)
- Creación de recursos: Pod, ReplicaSet, Deployment
- Configuración y gestión del archivo `.kube/config`

### Contenido de la actividad (versión extendida)

#### 🧾 YAML

- **Estructura de archivo**: basada en indentación con espacios, representa datos jerárquicos.
- **Dictionary (Mapas)**: pares clave-valor.
- **Array (Listas)**: lista ordenada de elementos.
- **Anchors y Aliases**: permiten la reutilización y extensión de estructuras.
- **Objetos en línea**: representación en una sola línea.
- **Sobrescrituras**: sobreescritura de valores desde alias o anchor.
- **Folded (`>`)**: texto multilínea con saltos de línea convertidos en espacios.
- **Literal (`|`)**: texto multilínea que preserva los saltos de línea.
- **Tipo estricto**: coerción explícita de tipos (ej. cadena, entero, booleano).

---

#### ☸️ Estructura de Archivos Kubernetes – Visión Simple

- **apiVersion**: define la versión de API K8s para el recurso.
- **kind**: especifica el tipo de recurso (ej. Pod, Deployment).
- **metadata**: información descriptiva (nombre, namespace, etiquetas).
- **spec**: define la configuración específica del recurso.

---

#### 🛠️ kubectl – Visión General

- **Install**: procedimiento para instalar el cliente `kubectl`.
- **Syntax**: estructura de comandos en línea de comandos.
- **api-resources**: muestra los recursos soportados por el servidor API.
- **get / describe / explain**: recuperación, inspección y explicación de recursos.
- **port-forward**: mapea un puerto local a un recurso en el clúster.

---

#### 📦 kubectl – Trabajo

- **apply**: aplica un archivo de configuración al clúster.
- **create pod**: crea un Pod manualmente.
- **create replica set**: define y crea un ReplicaSet.
- **create deployment**: define y crea un Deployment.

---

#### 🎁 Bonus – Estructura del archivo `.kube/config`

- **clusters**: define los clústeres configurados.
- **users**: define las credenciales de acceso.
- **contexts**: asocia un usuario a un clúster.
- **current-context**: indica el contexto activo.

---

Duración: 2 horas