# Deployment Guide - Fixing 404 Errors on Routes

## Problem
When accessing routes like `/login` or `/dashboard` directly in production, you get 404 errors. This happens because the server looks for a file at that path, which doesn't exist in your static build.

## Solution
You need to configure your web server to redirect all requests to `index.html` so React Router can handle the routing.

## Files Created
I've created configuration files for different hosting providers:

1. **`.htaccess`** - For Apache servers (most common on shared hosting)
2. **`_redirects`** - For Netlify/Vercel
3. **`vercel.json`** - For Vercel deployments
4. **`nginx.conf.example`** - For Nginx servers

## Steps to Fix

### For Apache Servers (Most Common - including mjindomain)
1. The `.htaccess` file has been created in the `public` folder
2. When you run `npm run build`, Vite will copy it to your `dist` folder
3. Upload your `dist` folder to your hosting
4. Make sure your hosting supports `.htaccess` files (most do)

### Verify the Fix
After deploying:
1. Go to `hollandafairfoods.com/login` - should work
2. Go to `hollandafairfoods.com/dashboard` - should work
3. Refresh any page - should work without 404

## For Nginx Servers
If your hosting uses Nginx, you'll need server-level configuration. Use the `nginx.conf.example` file as a reference and contact your hosting provider or add it to your server configuration.

## For Netlify/Vercel
The `_redirects` and `vercel.json` files are ready. These platforms usually auto-detect them.

## Testing Locally
After building, you can test locally:
```bash
npm run build
npm run preview
```

Then try accessing `http://localhost:4173/login` to verify it works.

## Troubleshooting
- If `.htaccess` doesn't work, contact your hosting provider to ensure mod_rewrite is enabled
- Make sure the `.htaccess` file is in the root of your `dist` folder (same level as `index.html`)
- Check file permissions - `.htaccess` should be readable by the web server

