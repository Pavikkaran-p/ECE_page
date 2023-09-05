from flask_restful import Resource
from flask import request, jsonify
from Models.MarshmallowSchema import InputSchema, ValidationError
from datetime import datetime
from Models.tables import cursor, conn
from Models.UserAuth import admin
from flask_jwt_extended import jwt_required
import os
import boto3
import tempfile
import datetime

s3 = boto3.client('s3')

class Hackathon(Resource):
    @jwt_required()
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
            event_type = data['event_type']
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
        # filename = "thisisimageof"+image.filename
        # s3.upload_file(image, 'sece-events', filename)
        # image_url = f"https://sece-events.s3.amazonaws.com/{filename}"
        # print(image.filename)
        filename = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '_' + image.filename            
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        image.save(temp_file)
        temp_file.close()
        s3.upload_file(temp_file.name, "sece-events", filename)
        os.remove(temp_file.name)
        
        image_url = f"https://sece-events.s3.amazonaws.com/{filename}"
        # image_url = 'https://media.istockphoto.com/id/1189767041/vector/hackathon-signs-round-design-template-thin-line-icon-concept-vector.jpg?s=612x612&w=0&k=20&c=DW-btIjpNjItFfk35N4KvrMkoGoqd1rEPwb_uV9IZEU='
        query = '''insert into events (name, register_start_date, register_end_date, hackathon_date, organisation_name, organising_mode, location, description,
        url, image_hackathon, event_type) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'''
        values = name, register_start_date, register_end_date, hackathon_date, organising_name, organising_mode, location, description, url, image_url, event_type
        cursor.execute(query, values)
        conn.commit()
        return jsonify({'status':True, 'msg':'Registered Successfully'})
    
class Event(Resource):
    @jwt_required()
    def get(self, id):
        cursor.execute("select * from events where event_id = %s",(int(id)))
        event = cursor.fetchone()
        # print(event)
        return jsonify({'status': True, 'details':event})
    
    @admin()
    def put(self, id):
        return {'status':True}
    
class Organisation(Resource):
    def get(self, id):
        return {'status': True}
    
    def put(self, id):
        return {'status':True}