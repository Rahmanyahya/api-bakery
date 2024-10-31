# CAKE SPECIFICATION

## CREATE CAKE
Endpoint: POST /api/cake/

Request Header:
- X-API-TOKEN: Token

Request Body:
``` json 
{
    "cake_name": "tart",
    "cake_price": 5.000,
    "cake_image": "http://imagecake.com/",
    "best_before": 25-11-2024,
    "cake_flavour": "Chocolate",
    "compotition": [
        {
            "material_id": 1,
            "quantity": 50,
        },
        {
            "material_id": 2,
            "quantity": 250, 
        }
    ]
}
```

Response Body (Success):
``` json 
{
    "data": {
        "id": 1,
        "cake_name": "tart",
        "cake_price": 5.000,
        "cake_image": "http://imagecake.com/",
        "best_before": 25-11-2024,
        "cake_flavour": "Chocolate",
        "compotition": [
        {
            "material_name": "margarin",
            "quantity": 50,
        },
        {
            "material_name": "baking powder",
            "quantity": 250, 
        }
    ]
     }
}
```

Response Body (Failed):
``` json 
{
    "errors": "something went wrong, ..."
}
```

## UPDATE CAKE
Endpoint : PUT /api/cake/:id

Request Header:
- X-API-TOKEN: Token

Request Params:
- id

Request Body:
``` json 
{
    "cake_name": "tart", // tiddak wajib
    "cake_price": 5.000,  // tiddak wajib
    "cake_image": "http://imagecake.com/",  // tiddak wajib
    "best_before": 25-11-2024,  // tiddak wajib
    "cake_flavour": "Chocolate",  // tiddak wajib
    "compotition": [
        {  // tiddak wajib
            "material_id": 1,  // tiddak wajib
            "quantity": 50,  // tiddak wajib
        },
        {  // tiddak wajib
            "material_id": 2,  // tiddak wajib
            "quantity": 250,   // tiddak wajib
        }
    ]
}
```

Response Body (Sucess):
``` json 
{
    "data": 
{
    "id": 1,
    "cake_name": "Pie", // tidak wajib
    "cake_price": 3.000, // tidak wajib
    "cake_image": "http://imagecake.com/", // tidak wajib
    "best_before": 20-11-2024, // tidak wajib
    "cake_flavour": "Chocolate", // tidak wajib
    "compotition": [
        {
            "material_name": "margarin",
            "quantity": 50,
        },
        {
            "material_name": "baking powder",
            "quantity": 250, 
        }
    ]
}
    
}
```

Response Body (Failed):
``` json 
{
    "errors": "something went wrong, ..."
}
```

## DELETE CAKE
Endpoint: DELETE /api/cake/:id

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
    "errors": "Something went wrong, ..."
}
```

## GET CAKE
Endpoint: GET /api/cake/

Request Header:
- X-API-TOKEN: Token

Response Body (Sucess):
``` json 
{
    "data": [
{
    "id": 1,
    "cake_name": "tart",
    "cake_price": 5.000,
    "cake_image": "http://imagecake.com/",
    "best_before": 25-11-2024,
    "cake_flavour": "Chocolate",
    "compotition": [
        {
            "material_name": "margarin",
            "quantity": 50,
        },
        {
            "material_name": "baking powder",
            "quantity": 250, 
        }
    ]
},
{
    "id": 2,
    "cake_name": "Pie",
    "cake_price": 2.000,
    "cake_image": "http://imagecake.com/",
    "best_before": 10-12-2024,
    "cake_flavour": "Strawberry",
    "compotition": [
        {
            "material_name": "margarin",
            "quantity": 50,
        },
        {
            "material_name": "baking powder",
            "quantity": 250, 
        }
    ]
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