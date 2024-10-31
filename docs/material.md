# MATERIAL SPECIFICATION

## CREATE MATERIAL
Endpoint: POST /api/material/

Request Header: 
- X-API-TOKEN: Token

Reequest Body:
``` json 
{
    "material_name": "margarin",
    "material_price": 5000,
    "material_type": "Solid"
}
```

Response Body (Success):
``` json 
 {
    "data": {
    "id": 1,
    "material_name": "margarin",
    "material_price": 5000,
    "material_type": "Solid"
    }
 }
```

Response Body (Failed):
``` json 
{
    "errors": "something went wrong, ...."
}
```

## UPDATE MATERIAL
Endpoint: PUT /api/material/:id

Request Header:
- X-API-TOKEN: Token

Request Params:
- id

Request Body:
``` json 
{
    "material_name": "Baking powder", // tidak wajib
    "material_price": 2000, // tidak wajib
    "material_type": "Powder" // tidak wajib
}
```

Response Body (success):
``` json 
{
    "data": {
    "id": 1,
    "material_name": "Baking powder", // tidak wajib
    "material_price": 2000, // tidak wajib
    "material_type": "Powder" // tidak wajib
    }
}
```

Response Body (failed):
``` json 
{
    "errors": "something went wrong, ...",
}
```

## DELETE MATERIAL
Endpoint: DELETE /api/material/:id

Request Header:
- X-API-TOKEN: Token

Request Params:
- id

Response Body (success):
``` json 
{
    "Data": "OK"
}
```

Response Body (Failed):
``` json 
{
    "errors": "something went wrong, ..."
}
```

# GET MATERIAL
Endpoint: GET /api/material/

Request Header:
- X-API-TOKEN: Token

Response (Success):
``` json 
{
    "data": [
{
    "id": 1,
    "material_name": "Baking powder", 
    "material_price": 2000, 
    "material_type": "Powder" 
 },
{
    "id": 2,
    "material_name": "margarin",
    "material_price": 5000,
    "material_type": "Solid"
}

    ]
}
```
Response Body (Failed):
``` json 
{
    "errors": "something went wrong, ..."
}
```