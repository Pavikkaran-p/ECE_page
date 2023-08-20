from flask import Flask 
from flask_restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
jwt = JWTManager(app)
api = Api(app)

from Sources.users import Login, Register, RegisterVerify, VerifyJWT
api.add_resource(Login, '/login')
api.add_resource(Register, '/register')
api.add_resource(VerifyJWT, '/checkjwt')


from Models.tables import cursor, conn
@app.route('/simplequery')
def add_column():
    cursor.execute('alter table users add column otp bigint')
    conn.commit()
    return {"ok":"dai"}

if __name__=="__main__":
    app.run(debug = True)