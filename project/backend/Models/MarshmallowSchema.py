from marshmallow import Schema, fields, validates, ValidationError
import re

class InputSchema(Schema):
    name = fields.Str()
    email = fields.Email()
    password = fields.Str()

    @validates('name')
    def validate_name(self, value):
        if any(not char.isalpha() and char != ' ' for char in value):
            raise ValidationError("The name should not contain only alphabets")

    @validates('email')
    def validate_email_domain(self, value):
        if not re.match(r'^.*@sece\.ac\.in$', value):
            raise ValidationError("Email must end with @sece.ac.in")
        
    @validates('password')
    def validate_password(self, value):
        if len(value) < 8:
            raise ValidationError("Password must be at least 8 characters long")
        if not any(char.isdigit() for char in value):
            raise ValidationError("Password must contain at least one digit")
        if not any(char.isalpha() for char in value):
            raise ValidationError("Password must contain at least one letter")
