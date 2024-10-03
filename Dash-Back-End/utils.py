from flask import Flask, request,jsonify
import jwt
import datetime
from functools import wraps
SECRET_KEY = 'Kawtar_Zineb_BENKABLIA'

# Fonction pour générer un token JWT
def generate_token(username):
    token = jwt.encode({
        'username': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Expiration dans 1 jour
    }, SECRET_KEY, algorithm='HS256')
    return token

def verify_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token manquant'}), 401

        try:
            # Décodage du token
            jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expiré'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token invalide'}), 401

        return f(*args, **kwargs)
    return decorated