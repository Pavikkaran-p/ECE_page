import pymysql 
from Models.tables import cursor, conn

def delete_unverified_users():
    cursor.execute('delete from users where status = 0')
    conn.commit()

delete_unverified_users()