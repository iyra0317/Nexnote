# NEXNOTE - College Notes Management Platform

A modern, full-stack notes management system designed specifically for colleges and universities. Built with MERN stack (MongoDB, Express, React, Node.js).

![Node.js](https://img.shields.io/badge/Node.js-v24-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 Features

### Core Features
- ✅ **User Authentication** - Student, Teacher, and Admin roles with JWT
- ✅ **Department & Semester Organization** - Notes organized by department (CSE, ECE, etc.) and semester (1-8)
- ✅ **Exam Preparation Mode** - Mark and filter exam-important notes with tags
- ✅ **Announcement System** - Targeted announcements by department/semester with priority levels
- ✅ **Notes Management** - Upload (PDF, DOC, DOCX), view, download, search, and filter
- ✅ **Social Features** - Comments, 5-star ratings, and favorites
- ✅ **Analytics Dashboard** - Track uploads, downloads, and engagement
- ✅ **User Profiles** - Manage profile, view activity, and track points

### UI/UX
- ✅ Modern purple/indigo/pink gradient theme
- ✅ Fully responsive mobile design
- ✅ Toast notifications
- ✅ Smooth animations with Framer Motion
- ✅ Dark mode optimized

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/nexnote.git
cd nexnote
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Setup Environment Variables

**Backend** (`server/.env`):
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5000
```

**Frontend** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Build Frontend
```bash
cd client
npm run build
```

### 5. Start Server
```bash
cd server
npm start
```

### 6. Access Application
Open browser: `http://localhost:5000/login`

---

## 📚 Documentation

- **[TEAM_SETUP_GUIDE.md](TEAM_SETUP_GUIDE.md)** - Complete setup guide for teammates
- **[GITHUB_SETUP.md](GITHUB_SETUP.md)** - How to upload to GitHub and share
- **[COLLEGE_PITCH_GUIDE.md](COLLEGE_PITCH_GUIDE.md)** - Presentation guide for college pitch
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Deploy to production (Vercel, Railway, etc.)
- **[FEATURES_IMPLEMENTATION.md](FEATURES_IMPLEMENTATION.md)** - Detailed feature documentation
- **[QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)** - Quick reference guide

---

## 🎓 For College Pitch

See **[COLLEGE_PITCH_GUIDE.md](COLLEGE_PITCH_GUIDE.md)** for:
- Complete presentation structure
- Live demo script
- Q&A preparation
- Implementation plan
- Success metrics

---

## 👥 For Teammates

See **[TEAM_SETUP_GUIDE.md](TEAM_SETUP_GUIDE.md)** for:
- Step-by-step setup instructions
- Troubleshooting guide
- Test accounts
- Project structure

---

## 📱 Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/login` | User login | Public |
| `/signup` | User registration | Public |
| `/dashboard` | Main dashboard | All users |
| `/upload` | Upload notes | Teachers/Admins |
| `/notes` | View & filter notes | All users |
| `/favorites` | Favorite notes | All users |
| `/analytics` | Analytics dashboard | Teachers/Admins |
| `/announcements` | View/create announcements | All users |
| `/profile` | User profile | All users |
| `/about` | About page | All users |

---

## 🔐 User Roles

### Student
- View and download notes
- Filter by department and semester
- Add comments and ratings
- Favorite notes
- View announcements

### Teacher
- All student features
- Upload notes with exam tags
- Create announcements
- View analytics
- Delete own notes

### Admin
- All teacher features
- Manage users
- Verify teachers
- Full system access

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Icons** - Icons

---

## 📝 API Endpoints

### Authentication
```
POST /api/auth/signup - Register user
POST /api/auth/login  - Login user
```

### Notes
```
GET    /api/notes              - Get all notes (with filters)
POST   /api/notes              - Upload note
DELETE /api/notes/:id          - Delete note
GET    /api/notes/:id/download - Download note
POST   /api/notes/:id/comments - Add comment
POST   /api/notes/:id/ratings  - Add rating
POST   /api/notes/:id/favorite - Toggle favorite
```

### Announcements
```
GET    /api/announcements     - Get all announcements
POST   /api/announcements     - Create announcement
DELETE /api/announcements/:id - Delete announcement
```

### User
```
GET /api/users/profile    - Get user profile
PUT /api/users/profile    - Update profile
GET /api/users/favorites  - Get favorite notes
GET /api/users/analytics  - Get analytics
```

---

## 🎨 Key Features Explained

### 1. Department & Semester Organization
Students select their department and semester during signup. Notes are uploaded with department and semester tags, making it easy to filter and find relevant content.

**Departments**: CSE, ECE, Mechanical, Civil, IT, EEE, Chemical, Biotechnology, Other  
**Semesters**: 1-8

### 2. Exam Preparation Mode
Teachers can mark notes as "important for exams" and add exam tags (midterm, final, quick-revision, important). Students can toggle "Exam Mode" to see only exam-relevant notes.

### 3. Announcement System
Teachers and admins can create announcements targeted to specific departments and semesters with priority levels:
- 🔴 **Urgent** - Red gradient
- 🟣 **Normal** - Purple gradient
- 🔵 **Info** - Blue gradient

### 4. Advanced Filtering
- Filter by department
- Filter by semester
- Filter by subject
- Toggle exam mode
- Search by title/subject
- Sort by date, title, or rating

---

## 📂 Project Structure

```
nexnote/
├── client/                    # Frontend
│   ├── src/
│   │   ├── api/              # API client
│   │   ├── components/       # React components
│   │   ├── context/          # Context providers
│   │   ├── pages/            # Page components
│   │   ├── assets/           # Images, icons
│   │   └── main.jsx          # Entry point
│   └── package.json
│
├── server/                    # Backend
│   ├── config/               # Database config
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Auth & upload middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── uploads/              # Uploaded files
│   └── server.js             # Entry point
│
└── Documentation files
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure network connectivity
- For home WiFi issues, try VPN or change DNS to 8.8.8.8

### Port Already in Use
```bash
# Windows
npx kill-port 5000

# Or manually
taskkill /F /IM node.exe
```

### Build Errors
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🚀 Deployment

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for detailed instructions on deploying to:
- Vercel (Frontend)
- Railway/Render (Backend)
- Custom domain setup
- SSL configuration

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Iyra**  
Full Stack Developer & Creator  
Email: iyra0367.becse24@chitkara.edu.in

---

## 📞 Support

For issues or questions:
- Check documentation files
- Review API endpoints
- Check browser console for errors
- Verify environment variables
- Contact: iyra0367.becse24@chitkara.edu.in

---

## 🎯 Roadmap

### Planned Features
- [ ] Offline download support (PWA)
- [ ] Admin panel for user management
- [ ] Teacher verification badges
- [ ] Gamification (points, badges, leaderboard)
- [ ] Syllabus mapping
- [ ] Push notifications
- [ ] Mobile app (React Native)

---

**Version**: 2.0 (College Edition)  
**Last Updated**: 2024  
**Status**: ✅ Production Ready

---

**⭐ Star this repository if you find it helpful!**
