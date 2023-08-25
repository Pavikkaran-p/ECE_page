from flask_restful import Resource
from flask import request, jsonify
from Models.MarshmallowSchema import InputSchema, ValidationError
from datetime import datetime
from Models.tables import cursor, conn

class Hackathon(Resource):
    def get(self):
        cursor.execute('select * from events')
        events = cursor.fetchall()
        # print(events)
        return jsonify({'status':True, 'events':events})
    
    def post(self):
        try :
            data = request.form
            name = data['name']
            register_start_date = datetime.strptime(data['register_start_date'], "%Y-%m-%dT%H:%M:%S")
            register_end_date = datetime.strptime(data['register_end_date'], "%Y-%m-%dT%H:%M:%S")
            hackathon_date = datetime.strptime(data['hackathon_date'], "%Y-%m-%dT%H:%M:%S")
            organising_name = data['organising_name']
            organising_mode = data['organising_mode']
            location = data['location']
            description = data['description']
            url = data['url']
            image = request.files['image']
            if hackathon_date < register_end_date or register_end_date < register_start_date:
                return {'msg':'Give correct date'}
        except: 
            return jsonify({'status':False, 'msg':'Missing Values'})
        try:
            schema = InputSchema()
            schema.load({'hackathon_name':name, 'organisation_name':organising_name, 'organising_mode':organising_mode, 'url':url})
        except ValidationError as err:
            return jsonify({'status':False, 'message':err.messages})
        # Some code to push the image on S3 Bucket and return the link
        # 
        # 
        image_url = 'https://media.istockphoto.com/id/1189767041/vector/hackathon-signs-round-design-template-thin-line-icon-concept-vector.jpg?s=612x612&w=0&k=20&c=DW-btIjpNjItFfk35N4KvrMkoGoqd1rEPwb_uV9IZEU='
        query = '''insert into events (name, register_start_date, register_end_date, hackathon_date, organisation_name, organising_mode, location, description,
        url, image_hackathon) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'''
        values = name, register_start_date, register_end_date, hackathon_date, organising_name, organising_mode, location, description, url, image_url
        cursor.execute(query, values)
        conn.commit()
        return jsonify({'status':True})