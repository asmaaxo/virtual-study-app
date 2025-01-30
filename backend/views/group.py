# backend/views/group.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Group

group_bp = Blueprint("group", __name__)

@group_bp.route("/", methods=["POST"])
@jwt_required()
def create_group():
    data = request.json
    name = data.get("name")
    subject = data.get("subject")

    if not name or not subject:
        return jsonify({"message": "Missing name or subject"}), 400

    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)

    new_group = Group(
        name=name,
        subject=subject,
        user_id=user.id  # user is the owner of this group
    )
    db.session.add(new_group)
    db.session.commit()

    return jsonify({"message": "Group created", "group": new_group.to_dict()}), 201

@group_bp.route("/my-groups", methods=["GET"])
@jwt_required()
def get_user_groups():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    
    # "groups" is the relationship from User -> Group
    user_groups = [g.to_dict() for g in user.groups]
    return jsonify(user_groups), 200

@group_bp.route("/<int:group_id>", methods=["PUT"])
@jwt_required()
def update_group(group_id):
    data = request.json
    group = Group.query.get_or_404(group_id)

    # Ensure only the owner can update
    current_user_id = get_jwt_identity()
    if group.user_id != current_user_id:
        return jsonify({"message": "Unauthorized"}), 403

    group.name = data.get("name", group.name)
    group.subject = data.get("subject", group.subject)
    db.session.commit()

    return jsonify({"message": "Group updated", "group": group.to_dict()}), 200

@group_bp.route("/<int:group_id>", methods=["DELETE"])
@jwt_required()
def delete_group(group_id):
    group = Group.query.get_or_404(group_id)

    # Ensure only the owner can delete
    current_user_id = get_jwt_identity()
    if group.user_id != current_user_id:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(group)
    db.session.commit()
    return jsonify({"message": "Group deleted"}), 200
