def Account_Verify_Mail(email, jwt):
    # 
    # Some Code to mail the user
    # 
    print (email)
    print(f"localhost:3000/verifyAccount/{jwt}")
    return 1