import re
from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS
from src.classes.models import forms
from src.blade_lib import get_request_from_dict, solve_from_dict_api, get_alternatives
import yaml
import logging
import json

def create_app(configfile=None):
    app = Flask(__name__)
    cors = CORS(app)
    app.config['SECRET_KEY'] = 'devkey'
    logging.basicConfig(level=logging.DEBUG)

    @app.route('/api/knowledge_base/get')
    def get_knowledge_base():
        alternatives = get_alternatives()
        return json.dumps(alternatives, default=str)

    @app.route("/api/recommendation/generate", methods=["POST"])
    def generate_recommendation():
        json_request = request.get_json()
        s = solve_from_dict_api(json_request)
        payload = {
            "result": s,
            "request": json_request
        }
        return json.dumps(payload, default=str)

    return app


if __name__ == '__main__':
    a=create_app()
    a.run(port=8080,debug=True)
