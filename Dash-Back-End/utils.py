from flask import Flask, request,jsonify
import jwt
import datetime
from functools import wraps
SECRET_KEY = 'Kawtar_Zineb_BENKABLIA'

# Fonction pour générer un token JWT
def generate_token(user_id):
    try:
        token = jwt.encode({
            'id': user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Expiration dans 1 jour
        }, SECRET_KEY, algorithm='HS256')
        return token
    except Exception as e:
            return {'message': f"Erreur lors de la génération du token: {str(e)}"}, 500

def verify_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token manquant'}), 401

        try:
            # Décoder le token et récupérer l'ID de l'utilisateur
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token['id']  # Extraction de l'ID de l'utilisateur
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expiré'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token invalide'}), 401

         # Passer l'ID de l'utilisateur comme argument à la fonction protégée
        return f(user_id=user_id, *args, **kwargs)
    return decorated