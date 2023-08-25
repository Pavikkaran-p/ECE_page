from flask_restful import Resource
from flask import request, jsonify
from Models.MarshmallowSchema import InputSchema, ValidationError
from datetime import datetime
from Models.tables import cursor, conn
from Models.UserAuth import admin
import os

class Hackathon(Resource):
    def get(self):
        cursor.execute('select * from events')
        events = cursor.fetchall()
        # print(events)
        return jsonify({'status':True, 'events':events})
    
    @admin()
    def post(self):
        try :
            image = request.files['image'] 
            # current_directory = os.getcwd()
            # image_path = os.path.join(current_directory, image.filename)
            # image.save(image_path)
            data = request.form
            name = data['name']
            register_start_date = data['register_start_date']
            register_end_date = data['register_end_date']
            hackathon_date = data['hackathon_date']
            organising_name = data['organising_name']
            organising_mode = data['organising_mode']
            location = data['location']
            description = data['description']
            url = data['url']
            if hackathon_date < register_end_date or register_end_date < register_start_date:
                return {'status':False, 'msg':'Give correct date'}
        except: 
            return jsonify({'status':False, 'msg':'Missing Values'})
        try:
            schema = InputSchema()
            schema.load({'hackathon_name':name, 'organisation_name':organising_name, 'organising_mode':organising_mode, 'url':url})
        except ValidationError as err:
            return jsonify({'status':False, 'message':err.messages})
        # Some code to push the image on S3 Bucket and return the link
        # Import boto3
        # s3.upload_file(image, eventimage, name+url)
        # image_url = f"https://{eventimage}.s3.amazonaws.com/{name+url}"
        # print(image.filename)
        image_url = 'https://media.istockphoto.com/id/1189767041/vector/hackathon-signs-round-design-template-thin-line-icon-concept-vector.jpg?s=612x612&w=0&k=20&c=DW-btIjpNjItFfk35N4KvrMkoGoqd1rEPwb_uV9IZEU='
        query = '''insert into events (name, register_start_date, register_end_date, hackathon_date, organisation_name, organising_mode, location, description,
        url, image_hackathon) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'''
        values = name, register_start_date, register_end_date, hackathon_date, organising_name, organising_mode, location, description, url, image_url
        cursor.execute(query, values)
        conn.commit()
        return jsonify({'status':True, 'msg':'Registered Successfully'})
    
class Event(Resource):
    def get(self, id):
        return {'status': True}
    
    def put(self, id):
        return {'status':True}
    
class Organisation(Resource):
    def get(self, id):
        return {'status': True}
    
    def put(self, id):
        return {'status':True}