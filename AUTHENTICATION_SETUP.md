# Authentication & Dashboard Setup Guide

This guide will help you set up Supabase authentication for your website's login and dashboard system.

## ✅ What's Been Implemented

- **Login Page** (`/login`) - User authentication interface
- **Dashboard** (`/dashboard`) - Protected content management area
- **Protected Routes** - Only authenticated users can access the dashboard
- **Supabase Integration** - Complete authentication system using Supabase

## 🚀 Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in (it's free!)
3. Click **"New Project"**
4. Fill in:
   - **Name**: Your project name (e.g., "Hollanda Website")
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click **"Create new project"** (takes 1-2 minutes)

## 🔑 Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string)
3. Copy both values - you'll need them in the next step

## 📝 Step 3: Configure Environment Variables

1. In your project root, create a `.env` file (if it doesn't exist)
2. Add these lines:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Replace** `your-project-id` and `your-anon-key-here` with the values from Step 2.

⚠️ **Important**: 
- Never commit your `.env` file to Git (it should already be in `.gitignore`)
- The `anon` key is safe to use in client-side code (it's designed for this)
- For production on Mijndomein, you'll need to set these environment variables in your hosting panel

## 👤 Step 4: Create Your First User

### Option A: Using Supabase Dashboard (Recommended for First User)

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: Your admin email (e.g., `admin@hollandafairfoods.com`)
   - **Password**: A strong password
4. Click **"Create user"**

### Option B: Using the Sign-Up Form (Future Enhancement)

You can add a sign-up form to your login page, but for now, use Option A for security.

## 🧪 Step 5: Test the Login

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/login`

3. Enter the email and password you created in Step 4

4. You should be redirected to `/dashboard`

5. Try accessing `/dashboard` directly - you should be redirected to `/login` if not authenticated

## 🔒 How It Works

### Authentication Flow

1. **User visits `/login`** → Enters credentials
2. **Supabase validates** → Returns session token
3. **Token stored** → In browser's localStorage (handled by Supabase)
4. **User redirected** → To `/dashboard`
5. **Protected routes check** → If no valid session, redirect to `/login`

### Security Features

- ✅ Passwords are **hashed** by Supabase (never stored in plain text)
- ✅ Sessions are **automatically refreshed**
- ✅ **Row Level Security (RLS)** can be enabled in Supabase for database access
- ✅ **HTTPS required** in production (Supabase enforces this)

## 📦 Deploying to Mijndomein

### Before Building

1. Make sure your `.env` file has the correct Supabase credentials
2. Test locally that login works

### Building for Production

```bash
npm run build
```

### Setting Environment Variables on Mijndomein

Since Mijndomein is static hosting, you have two options:

#### Option 1: Environment Variables in Build (Recommended)

1. Create a `.env.production` file with your Supabase credentials
2. Vite will embed these during build
3. ⚠️ **Note**: These values will be visible in the built JavaScript files (this is safe for the `anon` key)

#### Option 2: Runtime Configuration

If Mijndomein supports environment variables:
1. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your hosting panel
2. Rebuild and redeploy

## 🎨 Customizing the Dashboard

The dashboard is located at `src/pages/Dashboard.tsx`. You can:

- Add more content management sections
- Integrate with Sanity for direct blog post creation
- Add user management features
- Add analytics or statistics

## 🔧 Troubleshooting

### "Supabase environment variables are not set"

- Check that your `.env` file exists in the project root
- Verify the variable names start with `VITE_`
- Restart your dev server after adding `.env` variables

### "Invalid login credentials"

- Verify the user exists in Supabase dashboard (Authentication → Users)
- Check that email/password are correct
- Make sure email is confirmed (Supabase may require email confirmation)

### "Failed to sign in"

- Check browser console for errors
- Verify Supabase project is active
- Check that your Supabase URL and key are correct

### Dashboard redirects to login immediately

- Check browser console for authentication errors
- Verify Supabase credentials are correct
- Clear browser localStorage and try again

## 📚 Next Steps

### Recommended Enhancements

1. **Email Confirmation**: Enable email verification in Supabase
2. **Password Reset**: Add "Forgot Password" functionality
3. **User Roles**: Add admin/editor roles using Supabase RLS
4. **Sanity Integration**: Add direct blog post creation from dashboard
5. **Activity Logging**: Track user actions in Supabase database

### Supabase Database Features

You can also use Supabase's PostgreSQL database to:
- Store additional user metadata
- Log dashboard activities
- Store website settings
- Create custom content tables

## 🆘 Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [React + Supabase Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-react)

---

**Your authentication system is now ready!** 🎉

Users can log in at `/login` and access the protected dashboard at `/dashboard`.

