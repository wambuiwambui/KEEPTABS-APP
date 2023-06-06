from exts import db

"""
class Employee:
id:int primary key
tittle:str
description:str (text)
"""

class Employee(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    title=db.Column(db.String(), nullable=False)
    description=db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<Employee {self.title}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    def update(self,title, description):
        self.title=title
        self.description=description
        
        db.session.commit()

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
    


    def __repr(self):
       return f"<User {self.username}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()