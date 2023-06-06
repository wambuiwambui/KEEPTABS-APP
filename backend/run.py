from app import create_app
from flask.cli import FlaskGroup


if __name__ == '__main__':
    app = create_app()

    cli = FlaskGroup(app)
    cli()

    app.run()