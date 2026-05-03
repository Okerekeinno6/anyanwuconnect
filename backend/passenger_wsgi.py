"""
passenger_wsgi.py — Namecheap cPanel Python App entry point.
Place this file in the root of your Python app directory on Namecheap.
The cPanel Python App dashboard will auto-detect it.
"""
import sys
import os

# Add the backend directory to the Python path
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# Load environment variables from .env
from dotenv import load_dotenv
load_dotenv(os.path.join(BACKEND_DIR, ".env"))

# Import the Flask app
from app import app, db

# Create all tables on startup if they don't exist
with app.app_context():
    db.create_all()

# Passenger expects the WSGI callable to be named 'application'
application = app
