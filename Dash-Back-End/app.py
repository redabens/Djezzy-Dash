from flask import Flask
import dash
from dash import dcc, html
import plotly.express as px
import pandas as pd
from dash_apps import graph1,graph2,graph3

app = Flask(__name__)

graph1.create_dash_app(app)
graph2.create_dash_app(app)
graph3.create_dash_app(app)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
