from email.message import EmailMessage
import smtplib
import os
from dotenv import load_dotenv
load_dotenv()

Email_passsword = os.getenv('email_pass_key')
def Account_Verify_Mail(email, jwt):
    # 
    # Some Code to mail the user
    # 
    sender_email = os.getenv('email_id')
    msg = EmailMessage()
    msg['subject'] = "Verification Mail from Hacathon @sece"
    msg['to'] = email 
    msg['from'] = sender_email
    msg.set_content( '''
        <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" type="text/css" hs-webfonts="true" href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">
          h1{font-size:56px}
          h2{font-size:28px;font-weight:900}
          p{font-weight:100}
          td{vertical-align:top}
          #email{margin:auto;width:auto;background-color:#fff}
        </style>
    </head>
    <body bgcolor="#F5F8FA" style="width: 100%; font-family:Lato, sans-serif; font-size:18px;">
    <div id="email">
        <table role="presentation" width="100%">
            <tr>
                <td bgcolor="#00A4BD" align="center" style="color: white;">
                    <h3> Event @SECE verification </h3>
                </td>
        </table>
        <a href="http://localhost:3000/verifyAccount/'''+jwt+'''">Click on the link and Enter the password</a>
        <table role="presentation" border="0" cellpadding="0" cellspacing="10px" style="padding: 30px 30px 30px 60px;">
            <tr>
                <td>
                    <h2>Click on the link and Enter the password</h2>
                    <p>
                        You can add HTML/CSS code here to stylize your emails.
                    </p>
                    <p>
                        If this is not you kindly ignore the mail
                    </p>
                </td>
            </tr>
        </table>
    </div>
    </body>
    </html> '''
        ,subtype='html')
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(sender_email, Email_passsword)
        smtp.send_message(msg)
    return 1