import dash
from dash import dcc, html
import plotly.express as px
import pandas as pd

def create_dash_app(flask_app):
    # Application Dash pour le Graphique 1
    dash_app = dash.Dash(__name__, server= flask_app, url_base_pathname='/graph1/')
    df = pd.DataFrame({
        'Month': ['January', 'February', 'March'],
        'Sales': [1000, 1500, 1300]
    })
    dash_app.layout = html.Div([
        html.H1('Graphique 1 - Ventes Mensuelles'),
        dcc.Graph(
            id='sales-bar-chart',
            figure=px.bar(df, x='Month', y='Sales', title='Ventes par Mois')
        )
    ])
