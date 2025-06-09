# 🎙️ Skailama - Podcast Transcript & Project Manager

Skailama is a modern full-stack web application that enables users to log in, manage podcasts, generate transcripts, and handle project workflows — all through an intuitive UI and secure backend.

> ✅ **Deployed Frontend:** [https://skailama-rbd3.vercel.app](https://skailama-rbd3.vercel.app)  
> ✅ **Deployed Backend:** [https://skailama-3kpj.onrender.com](https://skailama-3kpj.onrender.com/)

---

## 🖼️ Screenshots

![Skailama dashboard interface showing podcast management panel with project list sidebar and transcript preview area. The layout is clean and modern with a calm blue and white color scheme. Main navigation links are visible at the top. The overall tone is professional and organized.](image.png) | c

---

## 🧩 Features

- 🔐 **Authentication** – JWT + HTTP-only cookies login flow.
- 📦 **Project Management** – Create, update, and manage multiple projects.
- 📝 **Podcast Transcripts** – Upload or auto-generate transcripts.
- ⚙️ **Settings Panel** – Profile, support, etc.
- 💻 **Responsive Design** – Mobile-first, clean UI with TailwindCSS.
- ☁️ **Deployment Ready** – Frontend on Vercel, Backend on Render.

---

## 🚀 Tech Stack

### 🌐 Frontend

- **React.js** with **Next.js**
- **Tailwind CSS**
- **Framer Motion**
- **Axios**
- **React Icons**

### 🔧 Backend

- **Node.js**, **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **HTTP-only Cookies**
- **CORS Configuration**

---

## 📁 Folder Structure (Backend)

src/
├── config/
│ └── db.js
├── controllers/
│ └── auth.controller.js
├── models/
│ └── user.model.js
├── routes/
│ └── auth.routes.js
├── index.js

---

## 🔐 API Endpoints

### 🔑 Authentication (`/api/auth`)

| Method | Endpoint  | Description               |
| ------ | --------- | ------------------------- |
| POST   | `/login`  | Log in user and set token |
| GET    | `/logout` | Clear token               |
| GET    | `/me`     | Get current user info     |

### 📁 Project (`/api/project`)

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| GET    | `/`      | Fetch all projects   |
| POST   | `/`      | Create new project   |
| PUT    | `/:id`   | Update project by ID |
| DELETE | `/:id`   | Delete project by ID |

### 📜 Transcripts (`/api/transcript`)

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| POST   | `/`      | Create new transcript   |
| GET    | `/`      | Get all transcripts     |
| PUT    | `/:id`   | Update transcript by ID |
| DELETE | `/:id`   | Delete transcript by ID |

---

## 🍪 Authentication Strategy

Tokens are managed securely using **HTTP-only cookies**.

```js
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});
```

🌍 Environment Variables (Backend)
PORT=8080
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
CLIENT_URL=https://skailama-rbd3.vercel.app
NODE_ENV=production
🛠️ Development Setup

## Backend

git clone https://github.com/yourrepo/backend.git
cd backend
npm install
npm run dev

##Frontend
git clone https://github.com/yourrepo/frontend.git
cd frontend
npm install
npm run dev

👨‍💻 Author
Md Irshad Alam
Full Stack MERN Developer from Jharkhand, India
Runs a CBSE-based school and builds modern digital tools 🚀
