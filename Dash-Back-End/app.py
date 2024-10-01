from flask import Flask, jsonify
import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import requests
from flask_ldap3_login import LDAP3LoginManager
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required

# Initialize Flask
app = Flask(__name__)

# Sample data for multiple graph types stored in Flask
data = {
    'graphs': [
        {
            'type': 'bar',
            'data': [
                {'x': [1, 2, 3], 'y': [4, 1, 2], 'type': 'bar', 'name': 'Bar Chart'}
            ],
            'layout': {'title': 'Bar Chart Example'}
        },
        {
            'type': 'line',
            'data': [
                {'x': [1, 2, 3], 'y': [1, 4, 9], 'type': 'line', 'name': 'Line Chart'}
            ],
            'layout': {'title': 'Line Chart Example'}
        },
        {
            'type': 'scatter',
            'data': [
                {'x': [1, 2, 3], 'y': [5, 3, 6], 'mode': 'markers', 'name': 'Scatter Plot'}
            ],
            'layout': {'title': 'Scatter Plot Example'}
        }
    ]
}

# API endpoint to expose data
@app.route('/api/data')
def get_data():
    return jsonify(data)

# Initialize Dash
dash_app = dash.Dash(__name__, server=app, url_base_pathname='/dash/')

# Define Dash layout to render multiple graphs
dash_app.layout = html.Div([
    html.H1('Multiple Graph Types Example'),
    html.Div(id='graph-container'),
    dcc.Interval(id='interval-component', interval=5*1000, n_intervals=0)  # Refresh every 5 seconds
])

# Dash callback to update graphs based on Flask API data
@dash_app.callback(
    Output('graph-container', 'children'),
    [Input('interval-component', 'n_intervals')]
)
def update_graphs(n):
    # Fetch data from Flask API
    response = requests.get('http://localhost:5000/api/data')
    flask_data = response.json()

    # Create a list of dcc.Graph components for each graph in the data
    graphs = []
    for graph_data in flask_data['graphs']:
        graphs.append(
            dcc.Graph(
                figure={
                    'data': graph_data['data'],
                    'layout': graph_data['layout']
                }
            )
        )

    return graphs

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
