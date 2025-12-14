# 🚀 Setup & Deployment Guide

Complete guide to set up and deploy your calculator project on GitHub.

## 📋 Prerequisites

Before you begin, make sure you have:
- A GitHub account ([Sign up here](https://github.com/join))
- Git installed on your computer ([Download here](https://git-scm.com/downloads))
- A text editor (VS Code, Sublime Text, etc.)

## 📥 Step 1: Download/Create Project Files

### Option A: If you got these files as separate documents

1. Create a new folder called `calculator`
2. Inside this folder, create these files:
   - `index.html` (paste HTML code)
   - `style.css` (paste CSS code)
   - `script.js` (paste JavaScript code)
   - `README.md` (paste README content)
   - `.gitignore` (paste gitignore content)

### Option B: If you cloned from somewhere

Skip to Step 2

## 🧪 Step 2: Test Locally

1. Open `index.html` in your browser
2. Test all features:
   - Click number buttons
   - Try all operations
   - Test keyboard input
   - Switch themes
   - Check history
3. Make sure everything works!

## 🐙 Step 3: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon → "New repository"
3. Fill in:
   - **Repository name**: `calculator` (or your preferred name)
   - **Description**: "A simple calculator web app with history and themes"
   - **Public** or **Private**: Your choice
   - ⚠️ **Do NOT** initialize with README (we already have one)
4. Click "Create repository"

## 💻 Step 4: Push Your Code to GitHub

Open terminal/command prompt in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Calculator app"

# Add your GitHub repository as remote
# Replace YOUR-USERNAME and YOUR-REPO-NAME
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 🔐 If you get authentication errors:

GitHub no longer accepts passwords. Use a Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Give it `repo` access
4. Copy the token
5. When pushing, use this token as your password

**Or use GitHub Desktop** (easier for beginners):
1. Download [GitHub Desktop](https://desktop.github.com/)
2. File → Add Local Repository
3. Select your calculator folder
4. Publish repository

## 🌐 Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (left sidebar)
4. Under "Source":
   - Select branch: `main`
   - Select folder: `/ (root)`
5. Click "Save"
6. Wait a few minutes
7. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## ✅ Step 6: Verify Deployment

1. Visit your GitHub Pages URL
2. Test all features again
3. Share the link with friends!

## 📝 Step 7: Update README

1. Open `README.md`
2. Replace placeholders:
   - `yourusername` → your actual GitHub username
   - `your.email@example.com` → your actual email
   - Add your live demo link
3. Commit and push changes:

```bash
git add README.md
git commit -m "Update README with correct links"
git push
```

## 📸 Optional: Add Screenshots

1. Take screenshots of your calculator (dark and light themes)
2. Create a `screenshots` folder in your project
3. Add the images: `dark-theme.png` and `light-theme.png`
4. Commit and push:

```bash
git add screenshots/
git commit -m "Add screenshots"
git push
```

## 🔄 Making Updates Later

Whenever you make changes:

```bash
# 1. Make your changes in the files

# 2. Check what changed
git status

# 3. Add the changed files
git add .

# 4. Commit with a message
git commit -m "Description of what you changed"

# 5. Push to GitHub
git push
```

Your GitHub Pages site will automatically update in a few minutes!

## 🎨 Customization Tips

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --btn-operator: #your-color;
}
```

### Add More Buttons
1. Add button in `index.html`
2. Add styling in `style.css`
3. Add functionality in `script.js`

### Change Layout
Modify the grid in `style.css`:
```css
.buttons {
    grid-template-columns: repeat(4, 1fr); /* Change number */
}
```

## 🐛 Troubleshooting

### Files not showing up on GitHub
- Make sure you added them: `git add .`
- Make sure you pushed: `git push`

### GitHub Pages not working
- Wait 5-10 minutes after enabling
- Check that you selected the correct branch
- Make sure `index.html` is in root folder
- Check GitHub Actions tab for build errors

### Calculator not working after deployment
- Open browser console (F12) for errors
- Make sure file names are correct (case-sensitive)
- Check that all files are in the same folder

### Theme/History not saving
- Check if localStorage is enabled in your browser
- Try in incognito mode to test
- Some browsers block localStorage for local files

## 🆘 Need Help?

- **Git Issues**: [Git Documentation](https://git-scm.com/doc)
- **GitHub Issues**: [GitHub Docs](https://docs.github.com)
- **HTML/CSS/JS**: [MDN Web Docs](https://developer.mozilla.org)

## 🎉 You're Done!

Your calculator is now live on the internet! Share it with:
- Friends and family
- On social media
- In your portfolio
- On your resume

Good luck! 🚀