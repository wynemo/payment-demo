## 使用docker 部署payment-demo

1. 首先你需要修改app.env文件，填入你的paypal client id 和 secret 以及jwt key
2. 然后运行下面的命令 用docker compose 启动服务
```
docker compose up --build
```

它会监听在8081端口，可以通过浏览器访问 http://127.0.0.1:8081

## postman 测试

在postman中导入[payment-demo.postman_collection.json](payment-demo.postman_collection.json)文件，可以测试api接口

## postman 测试演示视频

## API 接口

### 注册用户
curl 请求为
```bash
curl 'http://127.0.0.1:8081/api/v1/users/register' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.9,zh;q=0.8,ja;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: CSRF-Token-4AACGSG=UpeCYrj6DiKtC5SCMHxCPTFomDhKMHmH; pma_lang=en; phpMyAdmin=66d09b9c188b115d12a8a713df950e4a; pmaUser-1=0YoKBda%2B9DUpQhx8%2BFVtw2ktJETmomfa%2FHrgr6w97HEFFwWyTcrx27wM28w%3D; pmaAuth-1=fMPpDDqRyF0d8wa0Q0%2BEQXmuhjwwO2UPmeBr15th2lL9Un%2B0GgIDS6D%2FGy2zEmvwB31OfD7UqWpVQ3HE' \
  -H 'Origin: http://127.0.0.1:8081' \
  -H 'Referer: http://127.0.0.1:8081/register.html' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  --data-raw '{"email":"test@test.com","password":"123","first_name":"mazi","last_name":"wong"}'
```
会返回用户信息
```json
{
    "data": {
        "id": 505,
        "email": "test@test1.com",
        "first_name": "mazi",
        "last_name": "wong",
        "updatedAt": "2025-01-19T10:45:28.743Z",
        "createdAt": "2025-01-19T10:45:28.743Z"
    }
}
```
[用户注册-点击此处观看视频](用户注册-1.mp4)

### 用户登录
curl 请求为
```bash
curl --location 'http://127.0.0.1:8081/api/v1/users/login' \
--header 'Accept: */*' \
--header 'Accept-Language: en-US,en;q=0.9,zh;q=0.8,ja;q=0.7' \
--header 'Connection: keep-alive' \
--header 'Content-Type: application/json' \
--header 'Cookie: CSRF-Token-4AACGSG=UpeCYrj6DiKtC5SCMHxCPTFomDhKMHmH; pma_lang=en; phpMyAdmin=66d09b9c188b115d12a8a713df950e4a; pmaUser-1=0YoKBda%2B9DUpQhx8%2BFVtw2ktJETmomfa%2FHrgr6w97HEFFwWyTcrx27wM28w%3D; pmaAuth-1=fMPpDDqRyF0d8wa0Q0%2BEQXmuhjwwO2UPmeBr15th2lL9Un%2B0GgIDS6D%2FGy2zEmvwB31OfD7UqWpVQ3HE' \
--header 'Origin: http://127.0.0.1:8081' \
--header 'Referer: http://127.0.0.1:8081/index.html' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-origin' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' \
--header 'sec-ch-ua: "Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"' \
--data-raw '{"email":"test@test1.com","password":"123"}'
```
成功后会返回token
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTA2LCJlbWFpbCI6InRlc3RAdGVzdDEuY29tIiwiaWF0IjoxNzM3Mjg0MTI5LCJleHAiOjE3MzcyODc3Mjl9.MdzK1HeVQOgT0DPx4hd0xMbDSrtflxZV9SMHSazRqh8"
}
后续的请求在header里加入Authorization: Bearer token
```

### 创建订单
curl 请求为
```bash
curl --location 'http://127.0.0.1:8081/api/v1/payment/pay' \
--header 'Accept: */*' \
--header 'Accept-Language: en-US,en;q=0.9,zh;q=0.8,ja;q=0.7' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTA2LCJlbWFpbCI6InRlc3RAdGVzdDEuY29tIiwiaWF0IjoxNzM3Mjg0MTI5LCJleHAiOjE3MzcyODc3Mjl9.MdzK1HeVQOgT0DPx4hd0xMbDSrtflxZV9SMHSazRqh8' \
--header 'Connection: keep-alive' \
--header 'Content-Type: application/json' \
--header 'Cookie: CSRF-Token-4AACGSG=UpeCYrj6DiKtC5SCMHxCPTFomDhKMHmH; pma_lang=en; phpMyAdmin=66d09b9c188b115d12a8a713df950e4a; pmaUser-1=0YoKBda%2B9DUpQhx8%2BFVtw2ktJETmomfa%2FHrgr6w97HEFFwWyTcrx27wM28w%3D; pmaAuth-1=fMPpDDqRyF0d8wa0Q0%2BEQXmuhjwwO2UPmeBr15th2lL9Un%2B0GgIDS6D%2FGy2zEmvwB31OfD7UqWpVQ3HE' \
--header 'Origin: http://127.0.0.1:8081' \
--header 'Referer: http://127.0.0.1:8081/payment.html' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-origin' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' \
--header 'sec-ch-ua: "Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"' \
--data '{"value":"10"}'
```
发起购买10点的请求 返回订单信息
```json
{
    "id": "2U1384255V032611M",
    "status": "CREATED",
    "links": [
        {
            "href": "https://api.sandbox.paypal.com/v2/checkout/orders/2U1384255V032611M",
            "rel": "self",
            "method": "GET"
        },
        {
            "href": "https://www.sandbox.paypal.com/checkoutnow?token=2U1384255V032611M",
            "rel": "approve",
            "method": "GET"
        },
        {
            "href": "https://api.sandbox.paypal.com/v2/checkout/orders/2U1384255V032611M",
            "rel": "update",
            "method": "PATCH"
        },
        {
            "href": "https://api.sandbox.paypal.com/v2/checkout/orders/2U1384255V032611M/capture",
            "rel": "capture",
            "method": "POST"
        }
    ]
}
```

返回来的链接， https://www.sandbox.paypal.com/checkoutnow?token=2U1384255V032611M，为paypal的支付链接，用户可以直接访问进行支付

### 支付完成 捕获订单
```bash
curl --location --request POST 'http://127.0.0.1:8081/api/v1/payment/capture/2U1384255V032611M' \
--header 'Accept: */*' \
--header 'Accept-Language: en-US,en;q=0.9,zh;q=0.8,ja;q=0.7' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTA2LCJlbWFpbCI6InRlc3RAdGVzdDEuY29tIiwiaWF0IjoxNzM3Mjg0MTI5LCJleHAiOjE3MzcyODc3Mjl9.MdzK1HeVQOgT0DPx4hd0xMbDSrtflxZV9SMHSazRqh8' \
--header 'Connection: keep-alive' \
--header 'Content-Length: 0' \
--header 'Content-Type: application/json' \
--header 'Cookie: CSRF-Token-4AACGSG=UpeCYrj6DiKtC5SCMHxCPTFomDhKMHmH; pma_lang=en; phpMyAdmin=66d09b9c188b115d12a8a713df950e4a; pmaUser-1=0YoKBda%2B9DUpQhx8%2BFVtw2ktJETmomfa%2FHrgr6w97HEFFwWyTcrx27wM28w%3D; pmaAuth-1=fMPpDDqRyF0d8wa0Q0%2BEQXmuhjwwO2UPmeBr15th2lL9Un%2B0GgIDS6D%2FGy2zEmvwB31OfD7UqWpVQ3HE' \
--header 'Origin: http://127.0.0.1:8081' \
--header 'Referer: http://127.0.0.1:8081/payment.html' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-origin' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' \
--header 'sec-ch-ua: "Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"'
```
返回订单数据
```json
{
    "id": "2U1384255V032611M",
    "status": "COMPLETED",
    "purchase_units": [
        {
            "reference_id": "default",
            "shipping": {
                "name": {
                    "full_name": "Doe John"
                },
                "address": {
                    "address_line_1": "NO 1 Nan Jin Road",
                    "admin_area_2": "Shanghai",
                    "admin_area_1": "Shanghai",
                    "postal_code": "200000",
                    "country_code": "C2"
                }
            },
            "payments": {
                "captures": [
                    {
                        "id": "1VJ72169GX4734455",
                        "status": "COMPLETED",
                        "amount": {
                            "currency_code": "USD",
                            "value": "10.00"
                        },
                        "final_capture": true,
                        "seller_protection": {
                            "status": "ELIGIBLE",
                            "dispute_categories": [
                                "ITEM_NOT_RECEIVED",
                                "UNAUTHORIZED_TRANSACTION"
                            ]
                        },
                        "seller_receivable_breakdown": {
                            "gross_amount": {
                                "currency_code": "USD",
                                "value": "10.00"
                            },
                            "paypal_fee": {
                                "currency_code": "USD",
                                "value": "0.64"
                            },
                            "net_amount": {
                                "currency_code": "USD",
                                "value": "9.36"
                            }
                        },
                        "links": [
                            {
                                "href": "https://api.sandbox.paypal.com/v2/payments/captures/1VJ72169GX4734455",
                                "rel": "self",
                                "method": "GET"
                            },
                            {
                                "href": "https://api.sandbox.paypal.com/v2/payments/captures/1VJ72169GX4734455/refund",
                                "rel": "refund",
                                "method": "POST"
                            },
                            {
                                "href": "https://api.sandbox.paypal.com/v2/checkout/orders/2U1384255V032611M",
                                "rel": "up",
                                "method": "GET"
                            }
                        ],
                        "create_time": "2025-01-19T11:13:39Z",
                        "update_time": "2025-01-19T11:13:39Z"
                    }
                ]
            }
        }
    ]
}
```
