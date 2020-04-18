from flask import Flask, render_template, flash
from flask_bootstrap import Bootstrap
from flask_appconfig import AppConfig
from app.classes.models import forms
from flask_nav import Nav
from flask_nav.elements import Navbar, View

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
            View('Get recommandation', 'get_recommandation')
        )

    nav.init_app(app)

    app.config['SECRET_KEY'] = 'devkey'

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

    return app

if __name__ == '__main__':
    create_app().run(debug=True)
