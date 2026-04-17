# 🤖 AI Chat App

Aplicación de chat con inteligencia artificial desarrollada con **React**, **Node.js** y **OpenRouter**,que permite mantener múltiples conversaciones y recibir respuestas en tiempo real mediante streaming.

---

# 🚀 Características

* 💬 Chat con IA en tiempo real
* ⚡ Respuestas en **streaming**
* 🧠 Soporte para **Markdown** en las respuestas
* 🗂 Historial de múltiples chats
* 📑 Sidebar para navegar entre conversaciones
* 🎨 Interfaz moderna inspirada en chats de IA

---

# 🛠 Tecnologías utilizadas

* **React**
* **Node.js**
* **Fetch API**
* **React Markdown**
* **CSS**

---

# 📂 Estructura del proyecto

```
AI-CHAT-APP
│
├── client
│   ├── src
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙ Instalación

## 1️⃣ Clonar el repositorio

```bash
git clone "https://github.com/LFcoronado/OpenRouter-Chat-Ai.git"
```

---

## 2️⃣ Instalar dependencias

Instalar dependencias del proyecto:

```bash
npm install
```

---

## 3️⃣ Ejecutar el proyecto

### Ejecutar el backend

```bash
node server.js
```

o

```bash
npm run dev
```

---

### Ejecutar el frontend

```bash
npm run dev
```

La aplicación se abrirá normalmente en:

```
http://localhost:5173
```

---

# 🧠 Funcionamiento

1. El usuario escribe un mensaje en la interfaz.
2. El frontend envía la solicitud al servidor.
3. El servidor procesa la petición y consulta el modelo de IA.
4. La respuesta se envía en **streaming** al frontend.
5. React actualiza el chat en tiempo real mostrando la respuesta progresivamente.

---

# 📸 Interfaz

La aplicación incluye:

* Sidebar con historial de conversaciones
* Burbujas de chat para usuario y asistente
* Barra de entrada moderna
* Indicador de escritura de la IA
* Soporte para mensajes en Markdown

---

# 📌 Mejoras futuras

* 💾 Guardar conversaciones en base de datos
* 👤 Sistema de autenticación
* 📎 Subida de archivos
* 🖼 Soporte para imágenes
* 📱 Diseño responsive para móviles
* 🌙 Modo oscuro / claro
*    Sea responsive en movil

---

# 👨‍💻 Autor

**Luis Felipe Coronado**
Tecnólogo en Sistemas

---

# ⭐ Contribuciones

Las contribuciones, sugerencias y mejoras son bienvenidas.

Si deseas contribuir:

1. Haz un fork del proyecto
2. Crea una nueva rama
3. Realiza tus cambios
4. Envía un Pull Request

---

# 📜 Licencia

Este proyecto se encuentra bajo la licencia **MIT**.
