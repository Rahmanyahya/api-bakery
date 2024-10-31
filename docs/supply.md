# SUPPLY SPECIFICATION

## CREATE SUPLY
Endpoint: POST /api/supply/

Request Header: 
- X-API-TOKEN: token

Request Body:
``` json 
{
    "supply_date": 25-09-2024,
    "supplier_id": 1,
    "user_id": 1,
    "details_supply": [
        {
            "material_id": 1,
            "material_price": 250.000,
            "quantity": 25000
        }
    ]
}
```

Response Body (Success):
``` json 
{
    "id": 1,
    "supply_date": 25-09-2024,
    "supplier_name": "Agung",
    "user_name": "yahya",
    "details_supply": [
        {
            "material_name": "margarin",
            "material_price": 250.000,
            "quantity": 25000,
            "total": 62.500.000
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

## UPDATE SUPLY
Endpoint: PUT /api/supply/:id

Request Header:
- X-API-TOKEN: Token

Request Params:
- id

Request Body:
``` json 
{
    "supply_date": 25-09-2024, // tidak wajib
    "supplier_id": 2, // tidak wajib
    "user_id": 2, // tidak wajib
    "details_supply": [
        {
            "material_id": 2, // tidak wajib
            "material_price": 20.000, // tidak wajib
            "quantity": 2500 // tidak wajib
        }
    ]
}
```

Response Body (Success):
``` json 
{
    "id": 1,
    "supply_date": 25-09-2024,
    "supplier_name": "Ega",
    "user_name": "Rahman",
    "details_supply": [
        {
            "material_name": "Baking Powder",
            "material_price": 20.000,
            "quantity": 2500,
            "total": 50.000.000
        }
    ]
}
```

Response Body (Failed):
``` json 
{
    "errors": "someting went wring, ..."
}
```

## DELETE SUPPLY
Endpoint: DELETE /api/supply/:id

Request Header:
- X-API-TOKEN: Token

Request Params:
- id

Response Body (Sucess):
``` json 
{
    "data": "OK"
}
```

Response Body (Failed):
``` json 
{
    "errors": "someting went wring, ..."
}
```

## GET SUPPLY
Endpoint: /api/suppply/

Request Header:
- X-API-TOKEN: Token

Response Body (Success):
``` json 
{
    "data": [
{
    "id": 1,
    "supply_date": 25-09-2024,
    "supplier_name": "Ega",
    "user_name": "Rahman",
    "details_supply": [
        {
            "material_name": "Baking Powder",
            "material_price": 20.000,
            "quantity": 2500,
            "total": 50.000.000
        }
    ]
},
{
    "id": 2,
    "supply_date": 25-09-2024,
    "supplier_name": "Agung",
    "user_name": "yahya",
    "details_supply": [
        {
            "material_name": "margarin",
            "material_price": 250.000,
            "quantity": 25000,
            "total": 62.500.000
        }
    ]
}
    ]
}
```

Response Body (Failed):
``` json 
{
    "errors": "someting went wring, ..."
}
```


