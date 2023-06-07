from flask import Flask
from flask_restx import Api
from models import Employee, User
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from auth import auth_ns
from employee import employee_ns


def create_app():

    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.config.from_object('config.DevConfig')

    db.init_app(app)

    migrate = Migrate(app, db)

    JWTManager(app)

    api = Api(app, doc='/docs')

    api.add_namespace(employee_ns)
    api.add_namespace(auth_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "Employee": Employee,
            "User": User
        }

    return app
