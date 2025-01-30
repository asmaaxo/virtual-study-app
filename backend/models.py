# backend/models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(512), nullable=False)
    subjects_of_interest = db.Column(db.String(255), nullable=True)

    # One-to-Many: A user can own many groups
    groups = db.relationship("Group", back_populates="user", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "subjects_of_interest": self.subjects_of_interest
        }

class Group(db.Model):
    __tablename__ = "groups"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(100), nullable=False)

    # Foreign key to the user who created this group
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationship back to User
    user = db.relationship("User", back_populates="groups")

    # Relationship to Resource (1 Group -> Many Resources)
    resources = db.relationship("Resource", backref="group", lazy=True)
    # Relationship to StudySession (1 Group -> Many Sessions)
    study_sessions = db.relationship("StudySession", backref="group", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "subject": self.subject,
            "user_id": self.user_id
        }

class Resource(db.Model):
    __tablename__ = "resources"
    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(255), nullable=False)
    file_url = db.Column(db.String(255), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "file_name": self.file_name,
            "file_url": self.file_url,
            "upload_date": self.upload_date.isoformat(),
            "group_id": self.group_id
        }

class StudySession(db.Model):
    __tablename__ = "study_sessions"
    id = db.Column(db.Integer, primary_key=True)
    session_name = db.Column(db.String(100), nullable=False)
    scheduled_time = db.Column(db.DateTime, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "session_name": self.session_name,
            "scheduled_time": self.scheduled_time.isoformat(),
            "group_id": self.group_id
        }
