# 📝 Blog Application

A full-stack blog application where users can create blog posts and add/delete comments. The application uses:

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM

---

## 🚀 Features

- Create a new blog post with title, author, and content.
- Expand/collapse blog content.
- Add comments to blog posts.
- Delete individual comments.
- Data persists in PostgreSQL.
- Responsive and clean UI.

---

## 📁 Project Structure
blog-app/
├── public/
│ ├── index.html # Frontend HTML
│ ├── style.css # Stylesheet
│ └── script.js # Frontend logic
├── models/
│ ├── blog.js # Blog model
│ ├── comment.js # Comment model
│ └── index.js # Sequelize DB config
├── routes/
│ └── blogRoutes.js # API routes
├── server.js # Main backend entry point
├── .env # DB credentials
├── package.json
└── README.md # Project info
