from flask import Flask, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ARRAY
from models.User import User,db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Redabens2004%2E%2E@localhost/Djezzy-Dash'
db.init_app(app)  # Lier l'instance de SQLAlchemy à l'application
# # Créer un nouvel utilisateur
# new_user = User(username='reda.bens',is_admin=True, dashboards=[{
#     'name': 'graph1',
#     'url': '/graph1/',
#     'category': 'Sales'
# },{
#     'name': 'graph2',
#     'url': '/graph2/',
#     'category': 'Offers'
# }], categories=['Sales','Offers'])
# Créer un nouvel utilisateur
with app.app_context():
    user = User.query.filter_by(username='reda.bens').first()
    if user:  # Vérifiez si l'utilisateur existe
            # Mettre à jour les dashboards
            user.dashboards.append({
                'name': 'graph3',
                'url': '/graph3/',
                'category': 'Sales'
            })
    else:
            print("Utilisateur inexistant")

    db.create_all()  # Crée les tables si elles n'existent pas
    # db.session.add(new_user)  # Ajoute l'utilisateur
    db.session.commit()  # Valide les changements

