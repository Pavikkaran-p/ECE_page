from flask_jwt_extended import get_jwt , verify_jwt_in_request
from functools import wraps 

def admin():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims["role"] == 'admin' :
                return fn(*args, **kwargs)
            else:
                return {'msg':"Admins only!"},401
        return decorator
    return wrapper