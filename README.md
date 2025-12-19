# Full Stack Admin Dashboard & Landing Page

A full-stack web application with a **public landing page** and a **secure admin panel** to manage content.

---

## ✨ Features

### Public
- View projects
- View happy clients
- Contact form submission
- Newsletter subscription

### Admin (Protected)
- Admin login (JWT-based)
- Add & view projects
- Add & view clients
- View contact submissions
- View newsletter subscriptions

---

## 🛠 Tech Stack
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **MongoDB Atlas**
- **JWT Authentication**

---

## 🔐 Admin Credentials

```
Email: admin@example.com
Password: admin123
```

---

## ⚙️ Environment Variables

Create `.env.local`:

```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

---

## 🚀 Run Locally

```
npm install
npm run dev
```

App runs at:
```
http://localhost:3000
```

---

## 📌 Notes
- Admin routes are protected using JWT
- Data added via admin panel is reflected on the landing page
- Designed for deployment on **Vercel**

---

## ✅ Status
✔ Backend complete  
✔ Admin panel complete  
✔ Landing page complete  
✔ Deployed-ready  
