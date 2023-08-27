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

from Sources.users import Login, Register, RegisterVerify, VerifyJWT, UserDetails
api.add_resource(Login, '/login')
api.add_resource(Register, '/register')
api.add_resource(VerifyJWT, '/checkjwt')
api.add_resource(RegisterVerify, '/registerverify')
api.add_resource(UserDetails, '/userdetails/<string:id>')

from Sources.hackathons import Hackathon, Event, Organisation
api.add_resource(Hackathon, '/gethackathons')
api.add_resource(Event, '/event/<int:id>')
api.add_resource(Organisation, '/organisation/<int:id>')

# from Models.tables import cursor,conn
# @app.route('/table')
# def delete__data():
#     cursor.execute("delete from events")
#     conn.commit()

if __name__=="__main__":
    app.run(debug = True)