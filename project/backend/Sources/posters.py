from flask import jsonify, request
from flask_restful import Resource
from Models.tables import conn,cursor
from Models.UserAuth import admin
import boto3, datetime, tempfile, os
s3 = boto3.client('s3')

class EventPosters(Resource):
    def get(self):
        cursor.execute("select * from posters where status = true and type = 'event'")
        events_posters = cursor.fetchall()
        cursor.execute("select * from posters where status = true and type = 'hackathon'")
        hackathon_posters = cursor.fetchall()
        # print(hackathon_posters)    
        cursor.execute("select * from posters where status = true and type = 'conference'")
        conference_posters = cursor.fetchall()
        return jsonify({'status':True, 'event_posters':events_posters, 'hackathon_posters': hackathon_posters, 'conference_posters':conference_posters})
    
    @admin()
    def post(self):
        try : 
            data = request.form 
            name = data['name']
            type = data['type']
            image = request.files['image']
            # print(data)
            if type == 'hackathon' or type == 'event' or type == 'conference':
                ###################################### S3 Code to save Images ##################################
                filename = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '_' + image.filename            
                temp_file = tempfile.NamedTemporaryFile(delete=False)
                image.save(temp_file)
                temp_file.close()
                s3.upload_file(temp_file.name, "sece-events", filename)
                os.remove(temp_file.name)
                image_url = f"https://sece-events.s3.amazonaws.com/{filename}"
                ################################################################################################
                query = 'insert into posters(name, image_link, type) values(%s, %s, %s)'
                values = name,image_url, type
                cursor.execute(query,values)
                conn.commit()
                return {'status':True, 'message':"Poster Updated"}
            else :
                return {'status': False, 'message':'Invalid Type'}
        except :
            return {'status' : False, 'message':"Request details is Insufficient"}