from flask import Flask, request
from flask_restx import Api
from models import Employee, User
from exts import db
from flask_migrate import Migrate
from employee import employee_ns
from flask_jwt_extended import JWTManager, jwt_required
from auth import auth_ns
from flask_cors import CORS

def create_app():

    app=Flask(__name__)
    app.config.from_object('config.DevConfig')

    CORS(app, origins='http://localhost:3000')

    db.init_app(app)

    migrate = Migrate(app,db)
    JWTManager(app)

    api=Api(app, doc='/docs')
   
    api.add_namespace(employee_ns)
    api.add_namespace(auth_ns)
        
    
    @app.shell_context_processor
    def make_shell_context():
        return{
            "db": db,
            "Employee": Employee,
            "User": User
        }
    
    return app


