from flask import Flask
from flask_restx import Api
from models import EmployeeTimeSheet, User
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from auth import auth_ns
from employee import employee_ns

#entry point to Flask
def create_app():

    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})#Enables CORS for handling requests across origins
    app.config.from_object('config.DevConfig')#load configuration fro devconfig class in devconfig module

    db.init_app(app)#initialize database

    migrate = Migrate(app, db)#configure migrations using Flask-Migrate

    JWTManager(app)#Initialize JWT fot jason token authentication

    api = Api(app, doc='/docs')#Flask-RESTX API endpoint to access documentation

    api.add_namespace(auth_ns)#add authentication namespace to API
    api.add_namespace(employee_ns)#Add employee namespace to api

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db, #make database model available to Flask shell
            "Employee": EmployeeTimeSheet, #make employee model available to Flask shell
            "User": User #make user model available to flask shell
        }

    #Return configured flask object
    return app
