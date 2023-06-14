from datetime import datetime, date
from flask_restx import Namespace, Resource, fields
from models import EmployeeTimeSheet
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

employee_ns = Namespace(
    'employee', description="A namespace for employee time data")

employee_in_model = employee_ns.model(
    'employeetimein',
    {
        'time_in': fields.String()
    }
)

employee_out_model = employee_ns.model(
    'employeetimeout',
    {
        'time_out': fields.String()
    }
)


@employee_ns.route('/submitTimeIn', methods=['POST'])
class SubmitTimeIn(Resource):
    @employee_ns.expect(employee_in_model)
    @jwt_required()
    def post(self):
        data = request.get_json()
        current_user = get_jwt_identity()
        time_in = data.get("time_in")

        try:
            new_time_in_stamp = EmployeeTimeSheet(
                time_in=time_in,
                user_id=current_user
            )
            new_time_in_stamp.save()
            response = jsonify({"message": f"Time In submitted successfully"})
            response.status_code = 201
            return response
        except Exception:
            response = jsonify({"error": f"Database Error"})
            response.status_code = 500
            return response


@employee_ns.route('/submitTimeOut', methods=['POST'])
class SubmitTimeOut(Resource):
    @employee_ns.expect(employee_out_model)
    @jwt_required()
    def post(self):
        data = request.get_json()
        current_user = get_jwt_identity()
        time_out = data.get("time_out")

        try:
            new_time_out_stamp = EmployeeTimeSheet(
                user_id=current_user,
                time_out=time_out
            )
            new_time_out_stamp.save()
            response = jsonify({"message": f"Time Out submitted successfully"})
            response.status_code = 201
            return response
        except Exception as e:
            response = jsonify({"error": f"Database Error, {e}"})
            response.status_code = 500
            return response


@employee_ns.route('/getTodayStatus', methods=['GET'])
class GetTodayStatus(Resource):
    @employee_ns.expect(employee_out_model)
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()

        try:
            today = date.today()
            start_of_day = datetime.combine(today, datetime.min.time())
            end_of_day = datetime.combine(today, datetime.max.time())

            # Query data within the date range
            clockedInRecord = EmployeeTimeSheet.query.filter(
                EmployeeTimeSheet.date.between(start_of_day, end_of_day),
                EmployeeTimeSheet.time_in.isnot(None),
                EmployeeTimeSheet.user_id == current_user
            ).all()

            clockedOutRecord = EmployeeTimeSheet.query.filter(
                EmployeeTimeSheet.date.between(start_of_day, end_of_day),
                EmployeeTimeSheet.time_out.isnot(None),
                EmployeeTimeSheet.user_id == current_user
            ).all()

            if clockedInRecord and not clockedOutRecord:
                message = "User had clocked in"
            elif clockedInRecord and clockedOutRecord:
                message = 'User done for the day'
            elif not clockedOutRecord and not clockedInRecord:
                message = "User yet to clock in"

            response = jsonify({"message": message})
            response.status_code = 200
            return response
        except Exception:
            response = jsonify({"error": f"Database Error"})
            response.status_code = 500
            return response
