from flask_restx import Namespace, Resource, fields
from models import Employee
from flask import request
from flask_jwt_extended import jwt_required

employee_ns=Namespace('employee', description="A namespace for ")

employee_model = employee_ns.model(
    "employee",
    {"id": fields.Integer(), "title": fields.String(), "description": fields.String()},
)


@employee_ns.route("/hello")
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}

@employee_ns.route("/employees")
class EmployeesResource(Resource):
    @employee_ns.marshal_list_with(employee_model)
    def get(self):
        """Get all employees"""

        recipes = Employee.query.all()

        return employees
    
    @employee_ns.marshal_with(employee_model)
    @employee_ns.expect(employee_model)
    @jwt_required()
    def post(self):
        """Create employee entry"""
        data =request.get_json()
        new_employee=Employee(
            title=data.get('title'),
            description= data.get('description')
        )

        new_employee.save()

        return new_employee,201



@employee_ns.route('/employee/<int:id>')
class EmployeeResource(Resource):

    @employee_ns.marshal_with(employee_model)
    def get(self,id):
        """get employee by id"""
        employee=employee.query.get_or_404(id)
        
        return employee
    
    @employee_ns.marshal_with(employee_model)
    @jwt_required()
    def put(self,id):
        """update employee by id"""

        employee_to_update=Employee.query.get_or_404(id)
        data=request.get_json()

        employee_to_update.update(data.get("title"), data.get("description"))

        return employee_to_update

    @employee_ns.marshal_with(employee_model)
    @jwt_required()
    def delete(self):
        
        """delete by id"""
        employee_to_delete=employee.query.get_or_404(id)

        employee_to_delete()
        return employee_to_delete
