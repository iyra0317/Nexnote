# How to Upload NEXNOTE to GitHub

## 📋 Prerequisites
- GitHub account (create at https://github.com)
- Git installed on your computer

---

## 🚀 Step-by-Step Instructions

### Step 1: Create .gitignore File

Create a file named `.gitignore` in the root folder with this content:

```
# Dependencies
node_modules/
client/node_modules/
server/node_modules/

# Environment variables
.env
server/.env
client/.env

# Build files
client/dist/
client/build/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Uploads (optional - remove if you want to include uploaded files)
server/uploads/*.pdf
server/uploads/*.doc
server/uploads/*.docx
```

---

### Step 2: Initialize Git Repository

Open terminal/command prompt in your project folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: NEXNOTE College Notes Management System"
```

---

### Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon (top right)
3. Click **"New repository"**
4. Fill in:
   - Repository name: `nexnote`
   - Description: `College Notes Management System with Department/Semester Organization`
   - Choose **Public** or **Private**
   - **DO NOT** check "Initialize with README" (you already have one)
5. Click **"Create repository"**

---

### Step 4: Connect Local to GitHub

GitHub will show you commands. Use these:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/nexnote.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

### Step 5: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Check that `.env` files are NOT uploaded (they should be ignored)

---

## 🔄 Updating Your Repository

When you make changes:

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

---

## 👥 Sharing with Teammates

### Option 1: Public Repository
Share the link: `https://github.com/YOUR_USERNAME/nexnote`

### Option 2: Private Repository
1. Go to repository Settings
2. Click "Collaborators"
3. Add teammates by their GitHub username

### For Teammates to Clone:
```bash
git clone https://github.com/YOUR_USERNAME/nexnote.git
cd nexnote
```

Then follow the **TEAM_SETUP_GUIDE.md** instructions.

---

## ⚠️ IMPORTANT: Environment Variables

**NEVER commit .env files to GitHub!**

Your `.gitignore` file prevents this, but double-check:

1. Go to your GitHub repository
2. Make sure you DON'T see:
   - `server/.env`
   - `client/.env`
3. If you see them, remove them:

```bash
git rm --cached server/.env
git rm --cached client/.env
git commit -m "Remove .env files"
git push
```

---

## 📝 Share Environment Variables Separately

Create a file `ENV_TEMPLATE.md` (this CAN be committed):

```markdown
# Environment Variables Setup

## Backend (server/.env):
```
PORT=5000
MONGODB_URI=<ask_team_lead_for_this>
JWT_SECRET=<ask_team_lead_for_this>
CLIENT_URL=http://localhost:5000
```

## Frontend (client/.env):
```
VITE_API_URL=http://localhost:5000/api
```

Contact Iyra for the actual MongoDB URI and JWT secret.
```

---

## 🎯 Repository Description

Use this for your GitHub repository description:

```
NEXNOTE - A modern college notes management system built with MERN stack. 
Features: Department/Semester organization, Exam preparation mode, 
Announcements, Comments & Ratings, Analytics. Perfect for colleges and universities.
```

---

## 🏷️ Add Topics/Tags

In GitHub repository settings, add these topics:
- `mern-stack`
- `react`
- `nodejs`
- `mongodb`
- `education`
- `notes-management`
- `college-project`

---

## 📄 README Badge (Optional)

Add this to the top of your README.md:

```markdown
![Node.js](https://img.shields.io/badge/Node.js-v24-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
```

---

## ✅ Checklist Before Pushing

- [ ] `.gitignore` file created
- [ ] `.env` files NOT included
- [ ] `node_modules/` NOT included
- [ ] README.md is complete
- [ ] All code is working
- [ ] Sensitive data removed

---

**Your repository is now ready to share with teammates and showcase to your college!** 🎉
