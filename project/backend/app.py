from flask import Flask 
from flask_restful import Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

from Sources.users import Login, Register
api.add_resource(Login, '/login')
api.add_resource(Register, '/register')

if __name__=="__main__":
    app.run(debug = True)