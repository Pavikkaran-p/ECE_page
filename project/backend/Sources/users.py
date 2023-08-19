from flask_restful import Resource
from flask import jsonify, request
import bcrypt

from Models.tables import cursor, conn

class Login(Resource):
    def get(self):
        return "Hello World 2"
    
    def post(self):
        data = request.get_json()
        name = data['name']
        password = data['password']
        cursor.execute("select * from users where name = %s ",(name))
        user = cursor.fetchone()
        if user :
            if (bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8'))):
                return {'status':True},200
        return {'status':False},401
    
class Register(Resource):
    def post(self):
        data = request.get_json()
        name = data['name']
        password = data['password']
        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        return {'password':str(hashed_pw)}