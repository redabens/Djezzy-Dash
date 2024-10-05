from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ARRAY
import uuid
import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users' # Nom de la table
    id = db.Column(db.String(36), primary_key=True,default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    dashboards = db.Column(db.JSON, default=[])
    categories = db.Column(ARRAY(db.String()),default=['Sales'])
    is_admin = db.Column(db.Boolean, default=False)

    #add a repr method to return a string representation of the object
    def __repr__(self):
        return f'<User {self.username}>'
    