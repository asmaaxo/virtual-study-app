# backend/views/user.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User

user_bp = Blueprint("user", __name__)

@user_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    return jsonify(user.to_dict()), 200

@user_bp.route("/profiles", methods=["PUT"])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)

    data = request.json
    user.name = data.get("name", user.name)
    user.subjects_of_interest = data.get("subjects_of_interest", user.subjects_of_interest)
    db.session.commit()

    return jsonify({"message": "Profile updated", "user": user.to_dict()}), 200

@user_bp.route("/delete", methods=["DELETE"])
@jwt_required()
def delete_user():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200
