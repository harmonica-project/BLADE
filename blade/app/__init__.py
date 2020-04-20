import re
from flask import Flask, render_template, flash, request, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_appconfig import AppConfig
from app.classes.models import forms
from flask_nav import Nav
from flask_nav.elements import Navbar, View
from app.blade_lib import get_request_from_dict, solve_from_dict
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
            View('Knowledge base', 'knowledge_base'),
            View('Get recommandation', 'get_form')

        )

    nav.init_app(app)

    app.config['SECRET_KEY'] = 'devkey'


    @app.route("/recommendation", methods=["POST"])
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

    @app.route('/knowledge_base')
    def knowledge_base():
        return render_template('pages/knowledge_base.html')

    @app.route('/knowledge_base/add_blockchain')
    def add_blockchain():
        form = forms.NewBlockchainForm()
        form.validate_on_submit()
        return render_template('pages/add_blockchain.html', form=form)

    @app.route('/recommandation')
    def get_recommandation():
        return render_template('pages/get_recommandation.html')

    @app.route('/form')
    def get_form():
        return render_template('pages/form.html')

    return app


if __name__ == '__main__':
    a=create_app()
    a.run(port=8080,debug=True)
