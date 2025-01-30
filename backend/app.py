import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Import your models and blueprints
from models import db
from views.auth import auth_bp
from views.user import user_bp
from views.group import group_bp
from views.session import session_bp

def create_app():
    app = Flask(__name__)

    # Configuration from environment variables
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "defaultsecretkey")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "defaultjwtsecret")

    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "https://study-app-jade.vercel.app"}})
    db.init_app(app)
    jwt = JWTManager(app)
    migrate = Migrate(app, db)

    # Register blueprints with /api prefix
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(group_bp, url_prefix="/api/groups")
    app.register_blueprint(session_bp, url_prefix="/api/sessions")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
