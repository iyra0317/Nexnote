# How to Add Your NEXNOTE Logo

## 📸 Step 1: Save the Logo Image

1. Right-click on the logo image you shared
2. Click "Save image as..."
3. Save it with the name: `nexnote-logo.png`
4. Save location: `client/public/nexnote-logo.png`

**Important**: The file must be named exactly `nexnote-logo.png` and placed in the `client/public` folder.

---

## 🔧 Step 2: Code is Already Updated

I've already updated the Layout component to use your logo image. Once you save the image file, it will automatically appear in your application.

---

## 📁 File Structure

```
nexnote/
├── client/
│   ├── public/
│   │   └── nexnote-logo.png  ← Save your logo here
│   └── src/
│       └── components/
│           └── Layout.jsx     ← Already updated to use the logo
```

---

## ✅ Verification

After saving the logo:

1. Rebuild the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Restart the server (if needed):
   ```bash
   cd server
   npm start
   ```

3. Open http://localhost:5000/login

4. You should see your new logo in the sidebar!

---

## 🎨 Logo Specifications

Your logo will be displayed as:
- **Size**: 48px height (auto width to maintain aspect ratio)
- **Location**: Top of the sidebar
- **Style**: Rounded corners with shadow
- **Fallback**: If image doesn't load, shows the "N" icon

---

## 🔄 Alternative: Use as Favicon

To also use this logo as the browser tab icon:

1. Save a smaller version (32x32 or 64x64) as `favicon.png` in `client/public/`
2. Update `client/index.html`:
   ```html
   <link rel="icon" type="image/png" href="/favicon.png" />
   ```

---

## ❓ Troubleshooting

**Logo not showing?**
- Check file name is exactly `nexnote-logo.png`
- Check file is in `client/public/` folder
- Rebuild frontend: `cd client && npm run build`
- Clear browser cache (Ctrl+Shift+R)

**Logo too big/small?**
- Edit `Layout.jsx` and change `h-12` to `h-16` (bigger) or `h-8` (smaller)

---

**Once you save the image, your custom logo will appear throughout the application!** 🎉
