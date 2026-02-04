💰 SpendIQ – Full Stack Web App

A full-stack expense tracker web application that allows users to securely manage income and expenses, visualize spending patterns, and analyze financial data over time.

Built with React, Node.js, Express, and MongoDB Atlas, and deployed using Vercel and Render.

🚀 Live Demo

Frontend: https://expense-tracker-five-navy-51.vercel.app/

Backend API: https://expense-tracker-efc1.onrender.com/

🧠 Features

🔐 Authentication

User registration & login

JWT-based authentication

Protected routes

Secure password hashing with bcrypt

💸 Transactions

Add income & expense transactions

Edit existing transactions

Delete transactions

User-specific data isolation

📊 Analytics

Total income vs expenses

Expense distribution by category

Time-based analysis (daily / monthly / last 6 months)

Visual charts for better understanding

🎨 UI / UX

Clean, responsive design

Dashboard with tabs (Transactions / Analytics)

Empty & loading states

Color-coded income (green) & expense (red)

🏗️ Tech Stack

Frontend

React (Vite)

React Router

Axios

Tailwind CSS

Recharts (for analytics)

Backend

Node.js

Express.js

MongoDB (Atlas)

Mongoose

JSON Web Tokens (JWT)

bcrypt

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

🗂️ Project Structure

expense-tracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

🔑 How Authentication Works

User logs in with email & password

Backend verifies credentials

JWT token is generated

Token is stored on the client

Protected routes verify token on every request

Each transaction is linked to a specific user ID

This ensures complete data isolation between users.

🧪 Local Setup (Optional)

Backend

cd backend

npm install

npm run dev


Create a .env file:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

Frontend

cd frontend

npm install

npm run dev

🌍 Deployment

Backend deployed on Render

Frontend deployed on Vercel

Database hosted on MongoDB Atlas

All services used on free tier

📌 Future Improvements

CSV / PDF export

Budget limits & alerts

Category-wise monthly comparison

Dark mode

Mobile-first UI enhancements

👨‍💻 Author

Sujal Tamboli

GitHub: https://github.com/sujaltamboli99

LinkedIn: https://www.linkedin.com/in/sujaltamboli/

⭐ Acknowledgements

This project was built as a learning-focused full-stack application to understand real-world authentication, database design, analytics, and deployment workflows.
