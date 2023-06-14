from flask_restx import Namespace, Resource, fields
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token, create_refresh_token
from flask import request, jsonify, make_response

#create new namespace with a description
auth_ns = Namespace('auth', description="A namespace for authentication")

#define expected fields for signup and their type
signup_model = auth_ns.model(
    'SignUp',
    {
        'username': fields.String(),
        'email': fields.String(),
        'password': fields.String()

    }
)

#define expected fields for login endpoint and their type
login_model = auth_ns.model(
    'Login',
    {
        'username': fields.String(),
        'password': fields.String()

    }
)


#routes and HTTP method for signup
@auth_ns.route('/signup', methods=['POST'])
class Signup(Resource):
    @auth_ns.expect(signup_model)#checks if request payload matches signup-model
    def post(self):
        data = request.get_json()#extracts json payload from request

        username = data.get('username') #retrieve username value from payload


        db_user = User.query.filter_by(username=username).first()#query database if user exists

        if db_user is not None:
            response = jsonify({"message": f"User already exists"})
            response.status_code = 209
            return response
        
        try:
            new_user = User(
                username=data.get('username'),
                email=data.get('email'),
                password=generate_password_hash(data.get('password'))
            )
            new_user.save()
            response = jsonify({"message": f"User succesfully generated"})
            response.status_code = 201
            return response
        except Exception:
            response = jsonify({"error": f"Database Error"})
            response.status_code = 500
            return response


#routes and HTTP method for login
@auth_ns.route('/login', methods=['POST'])
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()#retrieves json payload from the request

        username = data.get('username')#extract username from data dictionary
        password = data.get('password')

        #query database to retrieve user with given username
        db_user = User.query.filter_by(username=username).first()

        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)

            response = jsonify(
                {"access_token": access_token, "refresh_token": refresh_token}
            )
            response.status_code = 200
            return response

        response = jsonify(
            {"error": "Could not login with provided details"}
        )
        response.status_code = 404
        return response

#verifies refresh token enable access without logging in again
@auth_ns.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):

        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)

        return make_response(jsonify({"access token": new_access_token}), 200)
