# USER SPECIFICATION

## CREATE USER

Endpoint: POST /api/users/

Request Headers:
- X-API-TOKEN: Token

Request Body: 
``` json 
{
    "user_name": "Yahya",
    "user_email": "yahya@gmail.com",
    "user_password": "12345678",
    "user_role": "cashier",
}
```

Response body (Success): 
``` json 
{
    "data": {
        "user_name": "Yahya",
        "user_email": "yahya@gmail.com",
        "user_role": "cashier",
    },
}
```

Response body (failed) example:
```json 
{
    "error": "user_name is required"
}
```

## UPDATE USER

Endpoint: PUT /api/users/:id

Request Params:
- id

Request Header:
- X-API-TOKEN: Token

Request body: 
``` json 
{
    "user_name": "rahman", // tidak wajib
    "user_email": "rahman@gmail.com", // tidak wajib
    "user_password": "9876543", // tidak wajib
    "user_role": "cashier", // tidak wajib
}
```

Response body (succes):
``` json
{
    "data": {
        "user_name": "rahman", 
        "user_email": "rahman@gmail.com", 
        "user_password": "9876543", 
        "user_role": "cashier"
    }
}
```

Response body (failed):
``` json 
{
    "erors": "something went wrong, ...."
}
```

## DELETE USER
Endpoint: DELETE /api/users/:id

Request Params:
- id

Request Header:
- X-API-TOKEN: Token

Response Body (Succes):
``` json 
{
    "data": "OK"
}
```

Response Body (failed):
``` json 
{
    "message": "User not found"
}
```

## GET USER
Endpoint: GET /api/users/

Request Params:
- id

Request Header:
- X-API-TOKEN: Token

Response Body: 
``` json 
{
    "data": [
        {
            "id": 1,
            "user_name": "yahya",
            "user_email": "yahya@gmail.com",
            "user_role": "Cashier"
        },
        {
            "id": 2,
            "user_name": "Rahman",
            "user_email": "rahman@gmail.com",
            "user_role": "Admin"
        }
    ]
}
```

Response Body (failed):
``` json 
{
    "message": "no users registered"
}
```