# ORDER SPECIFICATION

## CREATE ORDER
Endpoint: POST /api/order/

Request Header:
- X-API-TOKEN: token

Request Body:
``` json 
{
    "order_date": 12-10-2024,
    "user_id": 1,
    "detail_order": [
        {
            "order_id": 1,
            "cake_id": 1,
            "cake_price": 12.000,
            "quantity": 5
        },
         {
            "order_id": 1,
            "cake_id": 5,
            "cake_price": 15.000,
            "quantity": 3
        }
        
    ],
    "status": "delivered"
}
```

Response Body (Success):
``` json 
{
    "user_name": "yahya",
    "detail_order": [
        {
            "cake_name": "Tart",
            "cake_price": 12.000,
            "quantity": 5,
            "total": 60.000
        },
        {
            "cake_name": "Brownise",
            "cake_price": 15.000,
            "quantity": 3,
            "total": 45.000
        }
    ],
    "status_order": "delivered"
}
```

Response Body (error):
``` json 
{
    "error": "Something went wrong, ...."
}
```

## UPDATE ORDER
Endpoint: PUT /api/order/:id

Request Header:
- X-API-TOKEN: token

Request Body:
``` json
{
    "order_date": 12-10-2024, // tidak wajib
    "user_id": 1, // tidak wajib
    "detail_order": [
        {
            "order_id": 1, // tidak wajib
            "cake_id": 1, // tidak wajib
            "cake_price": 12.000, // tidak wajib
            "quantity": 5 // tidak wajib
        },
         {
            "order_id": 1, // tidak wajib
            "cake_id": 5, // tidak wajib
            "cake_price": 15.000, // tidak wajib
            "quantity": 3 // tidak wajib
        }
        
    ],
    "status": "delivered" // tidak wajib

}
```

Response Body (Succes) :
``` json 
{
    "data" : {
         "order_date": 12-10-2024,
    "user_id": 1,
    "detail_order": [
        {
            "order_id": 1,
            "cake_id": 1,
            "cake_price": 12.000,
            "quantity": 5
        },
         {
            "order_id": 1,
            "cake_id": 5,
            "cake_price": 15.000,
            "quantity": 3
        }
        
    ],
    "status": "delivered"
    }
}
```

Response Body (Failed):
``` json 
{
    "message": "Something went wrong, ...."
}
```

## DELETE ORDER
Endpoint : DELETE /api/order/:id

Request Header:
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
    "errors": "Somthing went wrong, ....."
}
```

## GET ORDER
Endpoint : GET /api/order/

Request Header:
- X-API-TOKEN: Token

Response Body (Succes):
``` json 
{
    "data": [
{
    "order_date": 12-10-2024,
    "user_name": "yahya",
    "detail_order": [
        {
            "cake_name": "Tart",
            "cake_price": 12.000,
            "quantity": 5,
            "total": 60.000
        },
        {
            "cake_name": "Brownise",
            "cake_price": 15.000,
            "quantity": 3,
            "total": 45.000
        }
    ],
    "status_order": "delivered"
},
{
    "order_date": 13-10-2024,
    "user_name": "Rahman",
    "detail_order": [
        {
            "cake_name": "Sus",
            "cake_price": 12.000,
            "quantity": 5,
            "total": 60.000
        },
        {
            "cake_name": "Cromboloni",
            "cake_price": 15.000,
            "quantity": 3,
            "total": 45.000
        }
    ],
    "status_order": "delivered"
}
    ]
}
```

Response Body (Failed):
``` json
{
    "error": "no order has been saved"
}
```

## FILTER BY STATUS
Endpoint: GET /api/order/filters?

Request Header:
- X-API-TOKEN: tokwn

Request Query:
- Status

Response Body:
``` json 
{
    "data": [
{
    "order_date": 15-10-2024,
    "user_name": "Yono",
    "detail_order": [
        {
            "cake_name": "Tart",
            "cake_price": 12.000,
            "quantity": 5,
            "total": 60.000
        },
        {
            "cake_name": "Brownise",
            "cake_price": 15.000,
            "quantity": 3,
            "total": 45.000
        }
    ],
    "status_order": "process"
},
{
    "order_date": 18-10-2024,
    "user_name": "Puji",
    "detail_order": [
        {
            "cake_name": "Sus",
            "cake_price": 12.000,
            "quantity": 5,
            "total": 60.000
        },
        {
            "cake_name": "Cromboloni",
            "cake_price": 15.000,
            "quantity": 3,
            "total": 45.000
        }
    ],
    "status_order": "process"
}
    ]
}
```

Response Body (failed):
``` json 
{
    "error": "No item selected"
}
```
