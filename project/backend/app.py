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
api.add_resource(Login, '/api/login')
api.add_resource(Register, '/api/register')
api.add_resource(VerifyJWT, '/api/checkjwt')
api.add_resource(RegisterVerify, '/api/registerverify')
api.add_resource(UserDetails, '/api/userdetails/<string:id>')

from Sources.hackathons import Hackathon, Event, Organisation
api.add_resource(Hackathon, '/api/gethackathons')
api.add_resource(Event, '/api/event/<int:id>')
api.add_resource(Organisation, '/api/organisation/<int:id>')

from Sources.posters import EventPosters
api.add_resource(EventPosters, '/api/eventposter')

# from Models.tables import cursor,conn
# @app.route('/api/table')
# def delete__data():
#     cursor.execute("delete from events")
#     conn.commit()

if __name__=="__main__":
    app.run(host='0.0.0.0', port=5000, debug = True)