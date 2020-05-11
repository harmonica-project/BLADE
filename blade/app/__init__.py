import re
from flask import Flask, render_template, flash, request, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_appconfig import AppConfig
from app.classes.models import forms
from flask_nav import Nav
from flask_nav.elements import Navbar, View
from app.blade_lib import get_request_from_dict, solve_from_dict, get_alternatives
import yaml

def create_app(configfile=None):
    app = Flask(__name__)


    AppConfig(app, configfile)  # Flask-Appconfig is not necessary, but
    # highly recommend =)
    # https://github.com/mbr/flask-appconfig
    Bootstrap(app)

    # in a real app, these should be configured through Flask-Appconfig

    nav = Nav()

    @nav.navigation()
    def mynavbar():
        return Navbar(
            'The BLADE project',
            View('Home', 'index'),
            View('Get recommendation', 'get_recommandation'),
            View('Display knowledge base', 'display_knowledge_base')
        )

    nav.init_app(app)

    app.config['SECRET_KEY'] = 'devkey'


    @app.route("/results", methods=["POST"])
    def post_recommendation():
        result = request.form
        res = get_request_from_dict(result)
        try:
            s = solve_from_dict(res)
        except:
            s="failed to compute valid solution"
        r=yaml.dump(res)
        return render_template('pages/results.html', solution=s,request=r)

    @app.route('/')
    def index():
        return render_template('pages/index.html')

    @app.route('/recommendation')
    def get_recommandation():
        return render_template('pages/get_recommendation.html')

    @app.route('/knowledge_base')
    def display_knowledge_base():
        alternatives = get_alternatives()
        return render_template('pages/display_knowledge_base.html', alternatives=alternatives)

    return app


if __name__ == '__main__':
    a=create_app()
    a.run(port=8080,debug=True)
