import pymysql
import os
from dotenv import load_dotenv
load_dotenv()

try:
    conn = pymysql.connect(
    host = os.getenv('dbhost'),
    user = os.getenv('dbuser'),
    password = os.getenv('dbpassword'),
    database = os.getenv('dbname'),
    cursorclass=pymysql.cursors.DictCursor
    )
    cursor = conn.cursor()
except :
    print("Error in DB",Exception)