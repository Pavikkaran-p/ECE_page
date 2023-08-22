from flask_restful import Resource

class Hackathon(Resource):
    def get(self):
        return {'status':True, 'hackathon':"adbjbfs"}