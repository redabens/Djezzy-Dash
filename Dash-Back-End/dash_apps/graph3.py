import dash
from dash import dcc, html
import plotly.express as px
import pandas as pd

def create_dash_app(flask_app):
    # Application Dash pour le Graphique 3
    dash_app = dash.Dash(__name__, server=flask_app, url_base_pathname='/graph3/')
    df = pd.DataFrame({
        'Region': ['North', 'South', 'East', 'West'],
        'Amount': [500, 700, 300, 400]
    })
    dash_app.layout = html.Div([
        html.H1('Graphique 3 - Montant par Région'),
        dcc.Graph(
            id='region-bar-chart',
            figure=px.bar(df, x='Region', y='Amount', title='Montant par Région')
        )
    ])