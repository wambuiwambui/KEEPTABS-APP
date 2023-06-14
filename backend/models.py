from exts import db
from datetime import datetime

"""
class User:
id:integer
email:string
password:string
"""


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(30), nullable=False)
    email = db.Column(db.String(80), nullable=True)

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()


"""
class EmployeeTimeSheet:
id:int primary key
user_id:int foreign key
time_in:str
time_out:str
"""


class EmployeeTimeSheet(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    time_in = db.Column(db.String(), nullable=True)
    time_out = db.Column(db.String(), nullable=True)
    date = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"<EmployeeTimeSheet {self.id}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
