from app import create_app
from flask.cli import FlaskGroup


app = create_app()
if __name__ == '__main__':

    cli = FlaskGroup(app)
    cli()

    # Get the port from the environment variable or use a default value
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)