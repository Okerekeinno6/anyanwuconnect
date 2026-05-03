"""
AnyanwuConnect — Flask Backend API
===================================
Deploy to Namecheap via Passenger WSGI (see passenger_wsgi.py & README.md).
All routes prefixed /api/ to avoid collisions with the Next.js frontend.
"""

import os
import json
import uuid
from datetime import datetime, timedelta, timezone
from functools import wraps

from flask import Flask, request, jsonify, g, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import jwt
import bcrypt
from dotenv import load_dotenv
from werkzeug.utils import secure_filename

load_dotenv()

# ── App setup ──────────────────────────────────────────────────
app = Flask(__name__)

# CORS: allow Next.js frontend origin
CORS(app, resources={r"/api/*": {"origins": os.getenv("FRONTEND_URL", "*")}},
     supports_credentials=True)

# ── Config ─────────────────────────────────────────────────────
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL", f"sqlite:///{os.path.join(BASE_DIR, 'anyanwu.db')}"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "change-me-in-production-!!!")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
JWT_EXPIRY_HOURS = int(os.getenv("JWT_EXPIRY_HOURS", 24))

db = SQLAlchemy(app)


# ════════════════════════════════════════════════════════════════
# MODELS
# ════════════════════════════════════════════════════════════════

class Admin(db.Model):
    """Single site owner account."""
    __tablename__ = "admins"
    id            = db.Column(db.Integer, primary_key=True)
    username      = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at    = db.Column(db.DateTime, default=datetime.utcnow)

    def check_password(self, password: str) -> bool:
        return bcrypt.checkpw(password.encode(), self.password_hash.encode())


class SiteContent(db.Model):
    """Stores the entire site JSON content as a single row (key=page)."""
    __tablename__ = "site_content"
    id         = db.Column(db.Integer, primary_key=True)
    page       = db.Column(db.String(80), unique=True, nullable=False)
    content    = db.Column(db.Text, nullable=False)  # JSON string
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {"page": self.page, "content": json.loads(self.content),
                "updated_at": self.updated_at.isoformat()}


class BlogPost(db.Model):
    __tablename__ = "blog_posts"
    id           = db.Column(db.Integer, primary_key=True)
    slug         = db.Column(db.String(200), unique=True, nullable=False)
    title        = db.Column(db.String(300), nullable=False)
    excerpt      = db.Column(db.Text, default="")
    category     = db.Column(db.String(100), default="General")
    content      = db.Column(db.Text, default="")
    cover_image  = db.Column(db.String(500), default="")
    author       = db.Column(db.String(150), default="The AnyanwuConnect Team")
    author_role  = db.Column(db.String(150), default="Executive Think Tank")
    author_avatar= db.Column(db.String(500), default="")
    tags         = db.Column(db.Text, default="[]")  # JSON array string
    published    = db.Column(db.Boolean, default=False)
    read_time    = db.Column(db.String(40), default="5 min read")
    created_at   = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at   = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id":           self.id,
            "slug":         self.slug,
            "title":        self.title,
            "excerpt":      self.excerpt,
            "category":     self.category,
            "content":      self.content,
            "coverImage":   self.cover_image,
            "author":       self.author,
            "authorRole":   self.author_role,
            "authorAvatar": self.author_avatar,
            "tags":         json.loads(self.tags or "[]"),
            "published":    self.published,
            "readTime":     self.read_time,
            "date":         self.created_at.strftime("%B %d, %Y"),
            "createdAt":    self.created_at.isoformat(),
            "updatedAt":    self.updated_at.isoformat(),
        }


# ════════════════════════════════════════════════════════════════
# AUTH HELPERS
# ════════════════════════════════════════════════════════════════

def make_token(admin_id: int) -> str:
    payload = {
        "sub": admin_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")


def require_auth(f):
    """Decorator — validates JWT in Authorization header."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid token"}), 401
        token = auth_header.split(" ", 1)[1]
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            g.admin_id = data["sub"]
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated


def slugify(text: str) -> str:
    import re
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text


# ════════════════════════════════════════════════════════════════
# ROUTES — AUTH
# ════════════════════════════════════════════════════════════════

@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    admin = Admin.query.filter_by(username=username).first()
    if not admin or not admin.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = make_token(admin.id)
    return jsonify({"token": token, "username": admin.username}), 200


@app.route("/api/auth/verify", methods=["GET"])
@require_auth
def verify_token():
    return jsonify({"valid": True, "admin_id": g.admin_id}), 200


# ════════════════════════════════════════════════════════════════
# ROUTES — UPLOADS
# ════════════════════════════════════════════════════════════════

@app.route("/api/upload", methods=["POST"])
@require_auth
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400
        
    if file:
        ext = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4().hex}{ext}"
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)
        
        # Build the public URL (ensure it uses https in production if behind proxy, but request.host_url works fine usually)
        # We will use hardcoded FRONTEND_URL or rely on request.host_url
        scheme = "https" if "anyanwuconnect.com" in request.host_url else request.scheme
        host = request.host
        url = f"{scheme}://{host}/uploads/{filename}"
        return jsonify({"url": url}), 201

@app.route("/uploads/<filename>")
def serve_upload(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


# ════════════════════════════════════════════════════════════════
# ROUTES — SITE CONTENT
# ════════════════════════════════════════════════════════════════

@app.route("/api/content", methods=["GET"])
def get_content():
    """Return merged content for all pages."""
    rows = SiteContent.query.all()
    result = {}
    for row in rows:
        result.update(json.loads(row.content))
    return jsonify(result), 200


@app.route("/api/content", methods=["PUT"])
@require_auth
def update_content():
    """Replace full site content blob (sent as one JSON object)."""
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "No content provided"}), 400

    # Store as a single 'all' row for simplicity
    row = SiteContent.query.filter_by(page="all").first()
    if row:
        row.content = json.dumps(data)
        row.updated_at = datetime.utcnow()
    else:
        row = SiteContent(page="all", content=json.dumps(data))
        db.session.add(row)

    db.session.commit()
    return jsonify({"message": "Content saved successfully"}), 200


# ════════════════════════════════════════════════════════════════
# ROUTES — BLOG POSTS
# ════════════════════════════════════════════════════════════════

@app.route("/api/blogs", methods=["GET"])
def get_blogs():
    """List blog posts. Public: only published. Admin (with token): all."""
    auth_header = request.headers.get("Authorization", "")
    is_admin = False
    if auth_header.startswith("Bearer "):
        try:
            jwt.decode(auth_header.split(" ", 1)[1], app.config["SECRET_KEY"], algorithms=["HS256"])
            is_admin = True
        except Exception:
            pass

    query = BlogPost.query if is_admin else BlogPost.query.filter_by(published=True)
    posts = query.order_by(BlogPost.created_at.desc()).all()
    return jsonify([p.to_dict() for p in posts]), 200


@app.route("/api/blogs/<slug>", methods=["GET"])
def get_blog(slug):
    post = BlogPost.query.filter_by(slug=slug).first_or_404()
    if not post.published:
        # Allow admins to preview drafts
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Post not found"}), 404
        try:
            jwt.decode(auth_header.split(" ", 1)[1], app.config["SECRET_KEY"], algorithms=["HS256"])
        except Exception:
            return jsonify({"error": "Post not found"}), 404
    return jsonify(post.to_dict()), 200


@app.route("/api/blogs", methods=["POST"])
@require_auth
def create_blog():
    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    if not title:
        return jsonify({"error": "Title is required"}), 400

    # Auto-generate slug, ensure unique
    base_slug = slugify(title)
    slug = base_slug
    counter = 1
    while BlogPost.query.filter_by(slug=slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    post = BlogPost(
        slug         = slug,
        title        = title,
        excerpt      = data.get("excerpt", ""),
        category     = data.get("category", "General"),
        content      = data.get("content", ""),
        cover_image  = data.get("coverImage", ""),
        author       = data.get("author", "The AnyanwuConnect Team"),
        author_role  = data.get("authorRole", "Executive Think Tank"),
        author_avatar= data.get("authorAvatar", ""),
        tags         = json.dumps(data.get("tags", [])),
        published    = data.get("published", False),
        read_time    = data.get("readTime", "5 min read"),
    )
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201


@app.route("/api/blogs/<int:post_id>", methods=["PUT"])
@require_auth
def update_blog(post_id):
    post = BlogPost.query.get_or_404(post_id)
    data = request.get_json(silent=True) or {}

    if "title" in data:
        post.title = data["title"]
    if "excerpt" in data:
        post.excerpt = data["excerpt"]
    if "category" in data:
        post.category = data["category"]
    if "content" in data:
        post.content = data["content"]
    if "coverImage" in data:
        post.cover_image = data["coverImage"]
    if "author" in data:
        post.author = data["author"]
    if "authorRole" in data:
        post.author_role = data["authorRole"]
    if "authorAvatar" in data:
        post.author_avatar = data["authorAvatar"]
    if "tags" in data:
        post.tags = json.dumps(data["tags"])
    if "published" in data:
        post.published = bool(data["published"])
    if "readTime" in data:
        post.read_time = data["readTime"]

    post.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify(post.to_dict()), 200


@app.route("/api/blogs/<int:post_id>", methods=["DELETE"])
@require_auth
def delete_blog(post_id):
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200


# ── Health check ───────────────────────────────────────────────
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "AnyanwuConnect API"}), 200


# ════════════════════════════════════════════════════════════════
# ENTRY POINT
# ════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=os.getenv("FLASK_ENV") == "development", port=5000)
