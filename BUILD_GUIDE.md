# Build and Deployment Guide for Mijndomein

This guide is specifically for building your site locally and uploading the `dist` folder to Mijndomein.

## Prerequisites

1. Node.js and npm installed
2. All dependencies installed: `npm install`
3. Sanity credentials ready

## Step-by-Step Build Process

### 1. Set Up Environment Variables

Create a `.env` file in your project root:

```bash
# .env
VITE_SANITY_PROJECT_ID=sth2kycb
VITE_SANITY_DATASET=production
```

**Important**: 
- The `.env` file must be in the project root (same folder as `package.json`)
- Never commit `.env` to git (it's already in `.gitignore`)
- These values will be baked into your build

### 2. Verify Environment Variables (Optional)

Before building, you can verify the variables are loaded:

**Windows PowerShell:**
```powershell
# Check if variables are loaded
$env:VITE_SANITY_PROJECT_ID
$env:VITE_SANITY_DATASET

# If they're not set, Vite will read from .env file automatically
```

**Linux/Mac:**
```bash
# Check .env file
cat .env

# Vite will automatically load .env file
```

### 3. Clean Previous Build

**Always delete the old `dist` folder before building:**

```bash
# Windows PowerShell
Remove-Item -Recurse -Force dist

# Linux/Mac
rm -rf dist
```

### 4. Build Your Site

```bash
npm run build
```

This will:
- Read environment variables from `.env`
- Bundle your React app
- Create a `dist` folder with all static files
- **Bake environment variables into the JavaScript bundle**

### 5. Verify the Build

Check that the build was successful:

```bash
# Check dist folder exists
ls dist  # or dir dist on Windows

# Verify environment variables are in the build
# Open dist/index.html in a text editor and search for "sth2kycb"
# Or check dist/assets/*.js files
```

### 6. Upload to Mijndomein

1. **Upload the entire contents of the `dist` folder**
   - Not the `dist` folder itself, but everything inside it
   - `index.html` should be in the root of your hosting directory

2. **File structure on Mijndomein should be:**
   ```
   your-domain.com/
   ├── index.html
   ├── assets/
   │   ├── index-[hash].js
   │   ├── index-[hash].css
   │   └── ...
   └── ...
   ```

### 7. Test Your Deployment

1. Open your website in a browser
2. Open browser DevTools (F12)
3. Check the Console tab:
   - Should see: `✅ Fetched posts from Sanity: X`
   - Should NOT see old test posts
4. Check the Network tab:
   - Look for requests to `api.sanity.io`
   - Verify the project ID in the request URL

## Common Issues and Solutions

### Issue: Still seeing old test posts

**Solution:**
1. Delete the `dist` folder completely
2. Verify `.env` file has correct values
3. Rebuild: `npm run build`
4. Upload fresh `dist` contents
5. Clear browser cache (Ctrl+Shift+Delete)
6. Test in incognito mode

### Issue: Environment variables not working

**Solution:**
1. Check `.env` file is in project root
2. Check `.env` file has no spaces around `=`
3. Restart your terminal/command prompt
4. Rebuild: `npm run build`

### Issue: Build fails

**Solution:**
1. Make sure all dependencies are installed: `npm install`
2. Check for TypeScript errors: `npm run lint`
3. Check Node.js version (should be 18+)

### Issue: Blank page after upload

**Solution:**
1. Verify `index.html` is in the root directory
2. Check file paths in `index.html` are correct
3. Check browser console for errors
4. Verify all files from `dist` were uploaded

## Quick Build Script

You can create a build script to automate the process:

**Windows PowerShell (`build.ps1`):**
```powershell
# Clean old build
if (Test-Path dist) {
    Remove-Item -Recurse -Force dist
    Write-Host "Cleaned old dist folder"
}

# Build
Write-Host "Building site..."
npm run build

if (Test-Path dist) {
    Write-Host "✅ Build successful! Upload the dist folder contents to Mijndomein"
} else {
    Write-Host "❌ Build failed!"
}
```

**Linux/Mac (`build.sh`):**
```bash
#!/bin/bash

# Clean old build
if [ -d "dist" ]; then
    rm -rf dist
    echo "Cleaned old dist folder"
fi

# Build
echo "Building site..."
npm run build

if [ -d "dist" ]; then
    echo "✅ Build successful! Upload the dist folder contents to Mijndomein"
else
    echo "❌ Build failed!"
fi
```

Make it executable (Linux/Mac):
```bash
chmod +x build.sh
```

## Best Practices

1. **Always rebuild** when:
   - Environment variables change
   - Posts are added/deleted in Sanity
   - You want to ensure fresh data

2. **Never reuse old builds** - always delete `dist` and rebuild

3. **Test locally first**:
   ```bash
   npm run build
   npm run preview
   # Visit http://localhost:4173 to test
   ```

4. **Keep `.env` file secure**:
   - Never commit to git
   - Don't share publicly
   - Use different values for dev/prod if needed

5. **Version your builds**:
   - Keep track of when you built
   - Note which environment variables were used
   - Consider adding a build timestamp

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_SANITY_PROJECT_ID` | Yes | Your Sanity project ID | `sth2kycb` |
| `VITE_SANITY_DATASET` | Yes | Your dataset name | `production` |
| `VITE_SANITY_API_TOKEN` | No | Only for private datasets | (optional) |

## Next Steps

After successful deployment:
1. Test the blog section shows current posts
2. Verify deleted posts don't appear
3. Test adding a new post in Sanity
4. Rebuild and verify new post appears

