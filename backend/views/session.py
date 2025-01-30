# backend/views/session.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from datetime import datetime
from models import db, StudySession, Group

session_bp = Blueprint("session", __name__)

@session_bp.route("/", methods=["POST"])
@jwt_required()
def schedule_session():
    data = request.json
    group_id = data.get("group_id")
    session_name = data.get("session_name")
    scheduled_time_str = data.get("scheduled_time")

    if not group_id or not session_name or not scheduled_time_str:
        return jsonify({"message": "Missing fields"}), 400

    # Ensure group exists
    Group.query.get_or_404(group_id)
    scheduled_time = datetime.fromisoformat(scheduled_time_str)

    new_session = StudySession(
        session_name=session_name,
        scheduled_time=scheduled_time,
        group_id=group_id
    )
    db.session.add(new_session)
    db.session.commit()

    return jsonify({"message": "Session scheduled", "session": new_session.to_dict()}), 201

@session_bp.route("/group/<int:group_id>", methods=["GET"])
@jwt_required()
def get_group_sessions(group_id):
    sessions = StudySession.query.filter_by(group_id=group_id).all()
    return jsonify([s.to_dict() for s in sessions]), 200

@session_bp.route("/<int:session_id>", methods=["PUT"])
@jwt_required()
def update_session(session_id):
    data = request.json
    session_obj = StudySession.query.get_or_404(session_id)

    session_obj.session_name = data.get("session_name", session_obj.session_name)
    if "scheduled_time" in data:
        session_obj.scheduled_time = datetime.fromisoformat(data["scheduled_time"])
    db.session.commit()

    return jsonify({"message": "Session updated", "session": session_obj.to_dict()}), 200

@session_bp.route("/<int:session_id>", methods=["DELETE"])
@jwt_required()
def delete_session(session_id):
    session_obj = StudySession.query.get_or_404(session_id)
    db.session.delete(session_obj)
    db.session.commit()
    return jsonify({"message": "Session deleted"}), 200
