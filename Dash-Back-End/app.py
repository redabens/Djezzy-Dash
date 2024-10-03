from flask import Flask, request,jsonify
from dash_apps import graph1,graph2,graph3
from flask_cors import CORS
from ldap import authenticate
from utils import generate_token,verify_token

app = Flask(__name__)
CORS(app)

graph1.create_dash_app(app)
graph2.create_dash_app(app)
graph3.create_dash_app(app)

@app.route('/login', methods=['POST'])
def login():
    # Récupérer les données JSON envoyées dans le corps de la requête
    data = request.get_json()
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
    
# Route protégée pour obtenir les informations de l'utilisateur
@app.route('/user')
@verify_token  # Applique le décorateur de vérification du token
def get_user():
    # Ici, tu peux récupérer les informations de l'utilisateur
    return jsonify({'message': 'Informations de l\'utilisateur'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
