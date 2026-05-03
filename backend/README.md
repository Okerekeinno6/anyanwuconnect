# AnyanwuConnect — Namecheap Deployment Guide

## Overview

The backend is a **Python Flask API** that you deploy to Namecheap's cPanel as a **Python App**. The Next.js frontend is deployed separately (Vercel, Netlify, or Namecheap Node.js app) and talks to the Flask API.

---

## Part 1 — Deploy the Flask Backend to Namecheap

### Step 1: Upload Files

Upload the entire `/backend` folder to your Namecheap server. Recommended path:
```
/home/yourusername/anyanwu-api/
```

Files to upload:
- `app.py`
- `init_db.py`
- `passenger_wsgi.py`
- `requirements.txt`
- `.env.example` → rename to `.env` and fill in your values
- `.htaccess`

### Step 2: Create a Python App in cPanel

1. Log in to **cPanel** → find **"Setup Python App"**
2. Click **"Create Application"**
3. Set:
   - **Python version**: 3.11 (or latest available)
   - **Application root**: `/home/yourusername/anyanwu-api`
   - **Application URL**: `api.yourdomain.com` (or a subfolder like `yourdomain.com/api`)
   - **Application startup file**: `passenger_wsgi.py`
   - **Application Entry point**: `application`
4. Click **Create**

### Step 3: Install Dependencies

In cPanel → SSH or Terminal:
```bash
cd /home/yourusername/anyanwu-api
source /home/yourusername/virtualenv/anyanwu-api/3.11/bin/activate
pip install -r requirements.txt
```

### Step 4: Configure Environment

```bash
cp .env.example .env
nano .env
```

Fill in:
- `SECRET_KEY` — a long random string (generate with `python -c "import secrets; print(secrets.token_hex(32))"`)
- `ADMIN_USERNAME` — your admin username
- `ADMIN_PASSWORD` — your secure password
- `FRONTEND_URL` — your Next.js site URL (e.g. `https://anyanwuconnect.org`)

### Step 5: Initialise the Database

```bash
python init_db.py
```

This creates the SQLite database and seeds all blog posts + your admin account.

### Step 6: Restart the App

In cPanel → Setup Python App → click **Restart** on your app.

### Step 7: Test the API

Visit `https://api.yourdomain.com/api/health` — you should see:
```json
{"status": "ok", "service": "AnyanwuConnect API"}
```

---

## Part 2 — Connect the Frontend

### In your Next.js project:

1. Copy `.env.local.example` to `.env.local`
2. Set:
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   ```
3. Rebuild & redeploy the Next.js app

### Test the admin panel:

1. Go to `https://yourdomain.com/admin`
2. Log in with your admin credentials
3. The **🟢 Live** indicator confirms backend connection
4. Edit content → **Save Changes** → changes saved to server
5. Blog → **New Post** → write, publish, done

---

## Part 3 — Change Admin Password

SSH into your server and run:
```bash
cd /home/yourusername/anyanwu-api
source /home/yourusername/virtualenv/anyanwu-api/3.11/bin/activate
python -c "
from app import app, db, Admin
import bcrypt
with app.app_context():
    a = Admin.query.filter_by(username='admin').first()
    a.password_hash = bcrypt.hashpw(b'YOUR_NEW_PASSWORD', bcrypt.gensalt()).decode()
    db.session.commit()
    print('Password updated.')
"
```

---

## API Endpoints Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | No | Login, returns JWT token |
| GET | `/api/auth/verify` | Yes | Verify token is still valid |
| GET | `/api/content` | No | Get all site content |
| PUT | `/api/content` | Yes | Update all site content |
| GET | `/api/blogs` | No* | List published blog posts |
| GET | `/api/blogs/:slug` | No* | Get single blog post |
| POST | `/api/blogs` | Yes | Create new blog post |
| PUT | `/api/blogs/:id` | Yes | Update blog post |
| DELETE | `/api/blogs/:id` | Yes | Delete blog post |
| GET | `/api/health` | No | Health check |

*Admins (with valid token) can also see unpublished drafts.

---

## Troubleshooting

**500 Error on startup**: Check that all pip packages are installed and `.env` is configured.

**CORS errors in browser**: Set `FRONTEND_URL` in `.env` to your exact frontend URL (no trailing slash).

**Database locked**: SQLite limitation on high traffic. For production scale, switch to MySQL (available on Namecheap) by setting `DATABASE_URL=mysql+pymysql://user:pass@localhost/dbname` and adding `PyMySQL` to `requirements.txt`.

**Passenger not picking up changes**: After editing `app.py`, create or touch a `restart.txt` file in the app root, or restart in cPanel.
