import dash
from dash import dcc, html
import plotly.express as px
import pandas as pd

def create_dash_app(flask_app):
    # Application Dash pour le Graphique 2
    dash_app = dash.Dash(__name__, server=flask_app, url_base_pathname='/graph2/')
    df = pd.DataFrame({
        'Category': ['A', 'B', 'C'],
        'Value': [10, 20, 30]
    })
    dash_app.layout = html.Div([
        html.H1('Graphique 2 - Répartition des Catégories'),
        dcc.Graph(
            id='category-pie-chart',
            figure=px.pie(df, names='Category', values='Value', title='Répartition des Catégories')
        )
    ])