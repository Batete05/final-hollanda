# Quick Start: Getting Your Credentials

## 🔑 Step 1: Get Supabase Project Credentials

You need to create a Supabase project first. Here's how:

### A. Create Supabase Account & Project

1. **Go to**: https://app.supabase.com
2. **Sign up** (free) or **log in**
3. **Click "New Project"**
4. **Fill in**:
   - **Name**: `Hollanda Website` (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you (e.g., `West Europe` for Netherlands)
5. **Click "Create new project"** (takes 1-2 minutes)

### B. Get Your Credentials

Once your project is ready:

1. In your Supabase dashboard, click **Settings** (gear icon) → **API**
2. You'll see two values you need:

   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Copy both values**

### C. Add to Your `.env` File

Create a `.env` file in your project root (if it doesn't exist):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Replace** the values with your actual Supabase credentials.

---

## 👤 Step 2: Create Your Login User

You need to create a user account to log in with:

### Option A: Create User in Supabase Dashboard (Easiest)

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: `admin@hollandafairfoods.com` (or your email)
   - **Password**: Choose a strong password
   - **Auto Confirm User**: ✅ Check this box (so you can log in immediately)
4. Click **"Create user"**

**Now you can log in with these credentials!**

### Option B: Use Email Sign-Up (If Enabled)

If you enable email sign-up in Supabase:

1. Go to **Authentication** → **Providers** → **Email**
2. Enable **"Enable email provider"**
3. Users can sign up at `/login` (you'd need to add a sign-up form)

---

## 🧪 Step 3: Test Your Login

1. **Start your dev server**:

   ```bash
   npm run dev
   ```

2. **Go to**: http://localhost:5173/login

3. **Enter**:

   - **Email**: The email you created (e.g., `admin@hollandafairfoods.com`)
   - **Password**: The password you set

4. **Click "Sign In"**

5. You should be redirected to `/dashboard` ✅

---

## 📝 Example `.env` File

Here's what your `.env` file should look like (with fake values as example):

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI4MCwiZXhwIjoxOTU0NTQzMjgwfQ.example-key-here

# Sanity Configuration (if you need it)
VITE_SANITY_PROJECT_ID=sth2kycb
VITE_SANITY_DATASET=production
```

---

## ⚠️ Important Notes

1. **Never commit `.env` to Git** - It should be in `.gitignore`
2. **The `anon` key is safe** - It's designed to be used in client-side code
3. **For production** - You'll need to set these same variables in your Mijndomein hosting panel
4. **Restart dev server** - After adding `.env` variables, restart `npm run dev`

---

## 🆘 Troubleshooting

### "Supabase environment variables are not set"

- Make sure `.env` file is in the **project root** (same folder as `package.json`)
- Check variable names start with `VITE_`
- Restart your dev server

### "Invalid login credentials"

- Make sure you created the user in Supabase dashboard
- Check email/password are correct
- If email confirmation is required, check your email or disable it in Supabase settings

### Can't find Supabase credentials

- Go to: **Settings** → **API** in your Supabase dashboard
- The URL and anon key are at the top of that page

---

## 🎯 Quick Checklist

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Copied Project URL
- [ ] Copied anon public key
- [ ] Created `.env` file with both values
- [ ] Created a user in Authentication → Users
- [ ] Tested login at `/login`

**Once you complete these steps, you'll have working credentials!** 🎉
