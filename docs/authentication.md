# AUTHENTICATION SPECIFICATION

## LOGIN
Endpoint: POST /api/auth/login

Request Body: 
``` json 
{
    "user_email": "yahya@gmail.com",
    "user_password": "12345678"
}
```

Response Body (Success): 
``` json 
{
   "data": {
    "user_name": "yahya",
     "token": "your_jwt_token"
   },
   
}
```

Response Body (Failed):
``` json 
{
    "message": "username or password is wrong, ..."
}
``` 

## Logout
Endpoint: DELETE /api/auth/logout

Request Headers:
- X-API-TOKEN: token

Response Body (Success):
``` json 
{
    "message": "OK"
}
```

Response Body (Failed):
``` json 
{
    "message": "unautorized, ...."
}
```
