from flask import Flask, request,jsonify
from dash_apps import graph1,graph2,graph3
from flask_cors import CORS
from ldap import authenticate
from utils import generate_token,verify_token
from models.User import User,db

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Redabens2004%2E%2E@localhost/Djezzy-Dash'
db.init_app(app)  # Lier l'instance de SQLAlchemy à l'application

graph1.create_dash_app(app)
graph2.create_dash_app(app)
graph3.create_dash_app(app)

@app.route('/login', methods=['POST'])
def login():
    # Récupérer les données JSON envoyées dans le corps de la requête    
    data = request.get_json()
    username= data.get('username')

    auth = authenticate(data.get('username'),data.get('password'))
    if auth == 'Authentification réussie':
        # Vérifier si l'utilisateur existe dans la base de données après authentification LDAP réussie
        user = User.query.filter_by(username=username).first()
        if not user:
            return {'message': 'Utilisateur Inexistant dans DB'}, 404  # user does not exist in db
        token = generate_token(user.id)
        return {'message':'Authentification réussie','token':token}, 200
    elif auth == 'username Incorrect':
        return {'message':'Nom d\'utilisateur incorrect'}, 401
    elif auth == 'Mot de passe Incorrect':
        return {'message':'Mot de passe incorrect'}, 403
    else:
        return {'message':'Erreur serveur LDAP'}, 500
    
@app.route('/dashboard/<category>', methods=['GET'])
@verify_token
def get_dashboards(user_id,category):
    if not user_id:
        return {'message': 'ID du user non transmis'}, 404
    user = User.query.get(user_id)
    if not user:
        return {'message': 'Utilisateur inexistant'}, 404
    dashboards = user.dashboards
    if category:
        dashboards = [d for d in dashboards if d['category'] == category]
    print(dashboards)
    return {'message': 'dashboards trouvé', 'dashboards': dashboards}, 200
# @app.route('/creation-user', methods=['POST'])
# def create_user():

#     data = request.get_json()
#     # Vérifier si les données requises sont présentes
#     if not data or not data.get('username') :
#      return jsonify({'message':'missing information'}),400

#     # Vérifier si l'utilisateur existe déjà
#     if User.query.filter_by(username=data['username']).first():
#      return jsonify({'message':'user already exists'}),409
    
#     # Créer un nouvel utilisateur
#     new_user = User(username=data['username'],is_admin=data.get('is_admin',False), dashboards=data.get('dashboards',[]))
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify({'message': 'user created successfully', 'user': repr(new_user)}), 201

# Route protégée pour obtenir les informations de l'utilisateur
@app.route('/user', methods=['GET'])
@verify_token  # Applique le décorateur de vérification du token
def get_user(user_id):
    if not user_id:
        return {'message': 'ID du user non transmis'}, 404
    # Ici, tu peux récupérer les informations de l'utilisateur
    user = User.query.get(user_id)
    if not user:
        return {'message': 'Utilisateur inexistant'}, 404
    return {'message': 'Utilisateur trouvé', 'user': {
        'id': user.id,
        'username': user.username,
        'categories': user.categories,
        'is_admin': user.is_admin
    }}, 200
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Créer les tables dans la DB
    app.run(debug=True, port=3000)