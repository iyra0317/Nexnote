# NEXNOTE - Team Setup Guide

## 🚀 For Your Teammates to Run the Project

### Prerequisites
- Node.js (v14 or higher) - Download from https://nodejs.org
- Git - Download from https://git-scm.com
- MongoDB Atlas account (or use the existing one)

---

## 📥 Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/YOUR_USERNAME/nexnote.git
cd nexnote
```

---

## 🔧 Step 2: Install Dependencies

### Install Backend Dependencies:
```bash
cd server
npm install
```

### Install Frontend Dependencies:
```bash
cd ../client
npm install
```

---

## ⚙️ Step 3: Setup Environment Variables

### Backend (.env file):
Create `server/.env` file with:
```env
PORT=5000
MONGODB_URI=mongodb+srv://guptaiyra0042_db_user:Dhairya%401705@cluster0.mw3gcl6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=neeti123
CLIENT_URL=http://localhost:5000
```

### Frontend (.env file):
Create `client/.env` file with:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🏗️ Step 4: Build Frontend

```bash
cd client
npm run build
```

This creates a production-ready build in `client/dist` folder.

---

## ▶️ Step 5: Start the Server

```bash
cd server
npm start
```

You should see:
```
✅ Server running on port 5000
✅ Open browser: http://localhost:5000/login
✅ MongoDB Connected
```

---

## 🌐 Step 6: Access the Application

Open your browser and go to:
```
http://localhost:5000/login
```

---

## 👥 Test Accounts

### Student Account:
- Email: `test@test.com`
- Password: `test123`
- Department: CSE
- Semester: 5

### Teacher Account:
- Email: `iyra0367.becse24@chitkara.edu.in`
- Password: (your password)

Or create new accounts using the Signup page!

---

## 🐛 Troubleshooting

### Port Already in Use:
```bash
# Windows
npx kill-port 5000

# Or manually kill Node processes
taskkill /F /IM node.exe
```

### MongoDB Connection Issues:
- Check if MongoDB URI is correct in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Try using VPN if on home WiFi

### Build Errors:
```bash
# Clear node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📁 Project Structure

```
nexnote/
├── client/              # React frontend
│   ├── dist/           # Production build (after npm run build)
│   ├── src/            # Source code
│   └── package.json
├── server/             # Node.js backend
│   ├── config/         # Database config
│   ├── controllers/    # API logic
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── uploads/        # Uploaded files
│   └── server.js       # Main server file
└── README.md
```

---

## 🎯 Features Available

- ✅ User Authentication (Student/Teacher/Admin)
- ✅ Department & Semester Organization
- ✅ Upload Notes (PDF, DOC, DOCX)
- ✅ View & Download Notes
- ✅ Filter by Department, Semester, Exam Mode
- ✅ Comments & Ratings
- ✅ Favorites
- ✅ Announcements
- ✅ Analytics Dashboard
- ✅ User Profiles

---

## 📞 Need Help?

Contact: Iyra (iyra0367.becse24@chitkara.edu.in)

---

**Last Updated**: 2024  
**Version**: 2.0 (College Edition)
