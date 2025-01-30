# backend/app.py
import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables from .env (optional)
load_dotenv()

# Import your models and blueprints
from models import db
from views.auth import auth_bp
from views.user import user_bp
from views.group import group_bp
from views.session import session_bp

def create_app():
    app = Flask(__name__)

    # Configuration directly in app.py
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "mysecretkey")
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://studygrupodb_user:heHErMTa9NYRbH7aLSIDUC1VtAR94Mfc@dpg-cudmhql2ng1s73ejia40-a.oregon-postgres.render.com/studygrupodb"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "myjwtsecret")

    # Initialize extensions
    CORS(app)
    db.init_app(app)
    jwt = JWTManager(app)
    migrate = Migrate(app, db)

    # Register your blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(user_bp, url_prefix="/users")
    app.register_blueprint(group_bp, url_prefix="/groups")
    app.register_blueprint(session_bp, url_prefix="/sessions")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)


# backend/app.py
import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables from .env (optional)
load_dotenv()

# Import your models and blueprints
from models import db
from views.auth import auth_bp
from views.user import user_bp
from views.group import group_bp
from views.session import session_bp

def create_app():
    app = Flask(__name__)

    # Configuration directly in app.py
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "mysecretkey")
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://studygrupodb_user:heHErMTa9NYRbH7aLSIDUC1VtAR94Mfc@dpg-cudmhql2ng1s73ejia40-a.oregon-postgres.render.com/studygrupodb"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "myjwtsecret")

    # Initialize extensions
    CORS(app)
    db.init_app(app)
    jwt = JWTManager(app)
    migrate = Migrate(app, db)

    # Register your blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(user_bp, url_prefix="/users")
    app.register_blueprint(group_bp, url_prefix="/groups")
    app.register_blueprint(session_bp, url_prefix="/sessions")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)