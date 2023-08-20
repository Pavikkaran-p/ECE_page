from flask_restful import Resource
from flask import jsonify, request
import bcrypt
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, jwt_required, get_jwt

from Models.tables import cursor, conn
from Models.MarshmallowSchema import InputSchema, ValidationError

class Login(Resource):
    
    def post(self):
        try:
            data = request.get_json()
            try:
                email = data['email']
                password = data['password']
            except Exception as err:
                return {'status':False, 'message':f'missing {err} value'}
            schema = InputSchema()
            schema.load({'email':email, 'password':password})
            cursor.execute("select * from users where email = %s ",(email))
            user = cursor.fetchone()
            if user :
                if user['status'] == 1:
                    if (bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8'))):
                        token = create_access_token(identity = user['email'], additional_claims = {
                            'name' : user['name'],
                            'user_id' : user['user_id']
                        })
                        return {'status':True, 'token':token},200
                return {'status':False, 'message':"Check mail for the Setup"}
            return {'status':False},401
        except ValidationError as err:
            return {"status":False,'type':'Invalid Syntax', "message":err.messages}
    
from Models.Mail import Account_Verify_Mail

class Register(Resource):
    def post(self):
        try:
            data = request.get_json()
            try : 
                name = data['name']
                email = data['email']
                password = data['password']
                re_enter_password = data['re_enter_password']
            except Exception as err:
                return {'status':False, 'message':f'missing {err} value'}
            if password != re_enter_password:
                return {'status':False, 'message':"Password_doesnot match"}
            schema = InputSchema()
            schema.load({'name':name,'email':email, 'password':password})
            hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            cursor.execute("select * from users where email = %s", (email))
            exist_user = cursor.fetchone()
            if exist_user != None:
                return {'status':False, "msg":'Email Already Registered'}
            cursor.execute("insert into users (name, email, password, created_on, role) values (%s,%s, %s, %s, 'student')",(name, email, hashed_pw, datetime.utcnow()))
            conn.commit()
            jwt = create_access_token(identity = email, additional_claims = { 'name' : name },expires_delta=timedelta(minutes=5))
            Account_Verify_Mail(email,jwt)
            return {'status':True}
        except ValidationError as err:
            return {"status":False, "message":err.messages}
        
class RegisterVerify(Resource):
    @jwt_required()
    def post(self):
        claims = get_jwt()
        email = claims['email']
        data = request.get_json()
        password = data['password']
        cursor.execute("select * from users where email = %s and status = 0",(email))
        user = cursor.fetchone()
        if user:
            if (bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8'))):
                cursor.execute("update table users set status = 1 where email = %s",(email))
                return {'status':True}
        else :
            return {'status':False, 'message':"Wrong Credentials"}
        
class VerifyJWT(Resource):
    @jwt_required()
    def get(self):
        return {'status':True}