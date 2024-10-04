from flask import Flask, request,jsonify
from dash_apps import graph1,graph2,graph3
from flask_cors import CORS
from ldap import authenticate
from utils import generate_token,verify_token
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import ARRAY
import uuid

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:sara2004@localhost/Djezzy-Dash'

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users' # Nom de la table
    id = db.Column(db.String(36), primary_key=True,default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(30), nullable=False)
    # password = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    dashboards = db.Column(ARRAY(db.String), default=[])
    is_admin = db.Column(db.Boolean, default=False)

    #add a repr method to return a string representation of the object
    def __repr__(self):
        return f'<User {self.username}>'
        
@app.route('/dash')
def get_dashboards():
    return graph1.create_dash_app(app)

graph2.create_dash_app(app)
graph3.create_dash_app(app)

@app.route('/login', methods=['POST'])
def login():
    # Récupérer les données JSON envoyées dans le corps de la requête    
    data = request.get_json()
    username= data.get('username')
    # Check if the user exists in the database
    user = User.query.filter_by(username=username).first()
    if not user:
        return {'message': 'Nom d\'utilisateur incorrect'}, 404  # user does not exist in db

    auth = authenticate(data.get('username'),data.get('password'))
    if auth == 'Authentification réussie':
        token = generate_token(data.get('username'))
        return {'message':'Authentification réussie','token':token}, 200
    elif auth == 'username Incorrect':
        return {'message':'Nom d\'utilisateur incorrect'}, 401
    elif auth == 'Mot de passe Incorrect':
        return {'message':'Mot de passe incorrect'}, 404
    else:
        return {'message':'Erreur serveur LDAP'}, 500
    
@app.route('/creation-user', methods=['POST'])
def create_user():

    data = request.get_json()
    # Vérifier si les données requises sont présentes
    if not data or not data.get('username') :
     return jsonify({'message':'missing information'}),400

    # Vérifier si l'utilisateur existe déjà
    if User.query.filter_by(username=data['username']).first():
     return jsonify({'message':'user already exists'}),409
    
    # Créer un nouvel utilisateur
    new_user = User(username=data['username'],is_admin=data.get('is_admin',False), dashboards=data.get('dashboards',[]))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'user created successfully', 'user': repr(new_user)}), 201

# Route protégée pour obtenir les informations de l'utilisateur
@app.route('/user')
@verify_token  # Applique le décorateur de vérification du token
def get_user():
    # Ici, tu peux récupérer les informations de l'utilisateur
    return jsonify({'message': 'Informations de l\'utilisateur'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # This line creates the tables
    app.run(debug=True, port=5000)