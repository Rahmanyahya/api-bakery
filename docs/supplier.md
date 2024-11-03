# SUPLIER SPECIFICATION

## CREATE SUPLIER
Endpoint: POST /api/suplier/

Request Header:
- X-API-TOKEN: Token

Request Body:
``` json 
{
    "supplier_name": "Agus",
    "supplier_address": "Sawojajar Malang",
    "supplier_phone": "08912345678"
}
```

Response Body (Success):
``` json 
{
    "data": {
        "id": 1,
        "supplier_name": "Agus",
        "supplier_address": "Sawojajar Malang",
        "supplier_phone": "08912345678" 
    }
}
```

Response Body (Failed):
``` json 
{
    "error": "Something went wrong, Supplier is already exist"
}
```

## UPDATE SUPLIER
Endpoint: PUT /api/suplier/:id

Request Header:
- X-API-TOKEN: Token

Request Params:
- Id

Response Body (Success):
``` json 
{
    "supplier_name": "Agung", // Tidak Wajib
    "supplier_address": "Sawojajar Malang", // Tidak Wajib
    "supplier_phone": "08912345678" // Tidak Wajib
}
```

Response Body (Succes):
``` json 
{
     "data": {
        "id": 1,
        "supplier_name": "Agung",
        "supplier_address": "Sawojajar Malang",
        "supplier_phone": "08912345678" 
    }
}
```

Response Body (Failed):
``` json 
{
    "error": "Something went wreng, Supplier not found"
}
```

## DELETE SUPLIER
Endpoint: DELETE /api/suplier/:id

Request Header:
- X-API-TOKEN

Request Params:
- id

Response Body (Succes):
``` json 
{
    "data": "OK"
}
```

Response Body (Failed):
``` json 
{
    "errors": "something went wrong, Supplier not found"
}
```

## GET SUPLIER
Endpoint: GET /api/suplier/

Request Header:
- X-API-TOKEN: token

Response body (Failed): 
``` json
{
    "error": "Something went wrong, No supplier registered"
}
```
Response body (Success):
``` json 
{
    "data": [
        {
           "id": 1,
           "supplier_name": "Agung",
           "supplier_address": "Sawojajar Malang",
           "supplier_phone": "08912345678" 
        },
        {
            "id": 2,
            "supplier_name": "Ega",
            "supplier_address": "Tamanan Tulungagung",
            "supplier_phone": "08998765432"
        }
    ]
}
``` 

## Search Supplier
Endpoint: GET /api/suplier/search

Request Header:
- X-API-TOKEN: Token

Request Query:
- keyword

Response Body (Failed): 
``` json 
{
     "error": "Something went wrong, No supplier listed"
}
```
Response body (Success):
``` json 
{
    "data": [
        {
           "id": 1,
           "supplier_name": "Agung",
           "supplier_address": "Sawojajar Malang",
           "supplier_phone": "08912345678" 
        },
        {
            "id": 2,
            "supplier_name": "Ega",
            "supplier_address": "Tamanan Tulungagung",
            "supplier_phone": "08998765432"
        }
    ]
}
``` 