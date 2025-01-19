## 使用docker 部署payment-demo

1. 首先你需要修改app.env文件，填入你的paypal client id 和 secret 以及jwt key
2. 然后运行下面的命令 用docker compose 启动服务
```
docker compose up --build
```

它会监听在8081端口，可以通过浏览器访问 http://127.0.0.1:8081

## 演示网站

也可以在 https://demo.dabin.info/ 这个网站上进行测试

## postman 测试

在postman中导入[payment.postman_collection.json](payment.postman_collection.json)文件，可以测试api接口

## postman 测试演示视频

[![postman 测试](https://img.youtube.com/vi/6awCiAD7OEY/0.jpg)](https://www.youtube.com/watch?v=6awCiAD7OEY)

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
```

后续的请求在header里加入Authorization: Bearer token

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

## 整体架构
+ nginx 作为反向代理，负责转发请求到后端服务
+ nodejs 作为后端服务，提供api接口, 使用express框架
+ mysql 作为数据库存储用户信息
+ mongodb 作为订单信息存储
+ 分为用户服务和支付服务两个服务，用户服务负责用户注册和登录，使用mysql; 支付服务负责支付接口 使用mongodb
+ 后续也可以加入其他服务，依旧使用用户服务来做用户验证
+ 使用redis作为缓存，缓存订单信息列表 因为这个也不会变的特别频繁
+ 使用payal作为支付接口
+ express-mongo-sanitize来清洗输入; joi验证字段合法性  前端的用户 订单的输入字段 以及分页的字段
+ 用jwt来做用户验证


## Overall Architecture
+	Nginx acts as a reverse proxy, responsible for forwarding requests to backend services.
+	Node.js serves as the backend, providing API endpoints using the Express framework.
+	MySQL is used as the database to store user information.
+	MongoDB is used to store order information.
+	The architecture is divided into two services:
+	User Service: Handles user registration and login, using MySQL.
+	Payment Service: Handles payment APIs, using MongoDB.
+	Additional services can be added in the future, with user authentication still handled by the User Service.
+	Redis is used as a cache to store the order information list since it does not change frequently.
+	PayPal is used as the payment gateway.
+	express-mongo-sanitize is used to sanitize inputs; Joi is used to validate the legality of input fields. This applies to fields such as user data, order data, and pagination parameters from the frontend.
+	JWT (JSON Web Token) is used for user authentication.

### 说明图
```mermaid
graph TD
  subgraph Reverse Proxy
    Nginx["Nginx"]
  end

  subgraph Services
    UserService["User Service (Node.js, Express)"]
    OrderService["Order Service (Node.js, Express)"]
  end

  subgraph Databases
    MySQL["MySQL (User Data)"]
    MongoDB["MongoDB (Order Data)"]
  end

  subgraph Caching
    Redis["Redis (Order Cache)"]
  end

  subgraph External API
    PayPal["PayPal (Payment Gateway)"]
  end

  Nginx --> UserService
  Nginx --> OrderService

  UserService --> MySQL
  OrderService --> MongoDB
  OrderService --> Redis

  OrderService --> PayPal

  MySQL -->|Persistent Data| DataVolume1["MySQL Volume"]
  MongoDB -->|Persistent Data| DataVolume2["MongoDB Volume"]
  Redis -->|Persistent Data| DataVolume3["Redis Volume"]

  style Nginx fill:#ffcccb,stroke:#333,stroke-width:2px
  style Services fill:#add8e6,stroke:#333,stroke-width:2px
  style Databases fill:#f5deb3,stroke:#333,stroke-width:2px
  style Caching fill:#98fb98,stroke:#333,stroke-width:2px
```

### 代码说明
```
├── Dockerfile
├── api_server
│   ├── config // 配置目录
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── config.js
│   │   └── database.js
│   ├── controllers // 控制器
│   │   ├── order.controller.js
│   │   ├── payment.controller.js
│   │   └── user.controller.js
│   ├── database // sequelize 数据库配置, redis
│   │   ├── migrations
│   │   ├── redis.js
│   │   ├── seeders
│   │   └── sequelize.js
│   ├── enum // 枚举 http code
│   │   └── httpCode.js
│   ├── middleware // 中间件 用于验证token， admin权限
│   │   ├── admin.js
│   │   └── auth.js
│   ├── models // sequelize 数据模型，mongodb 数据模型，用户，订单
│   │   ├── index.js
│   │   ├── order.js
│   │   └── user.js
│   ├── repositories // 数据库操作
│   │   ├── order.repository.js
│   │   ├── repository.js
│   │   └── user.repository.js
│   ├── routes // 路由
│   │   ├── api
│   │   ├── order.js
│   │   └── user.js
│   ├── services // 服务层，用户服务，订单服务
│   │   ├── order.service.js
│   │   ├── service.js
│   │   └── user.service.js
│   ├── utils // 工具函数
│   │   ├── asyncHandler.js
│   │   ├── axios.js
│   │   ├── formatQuery.js
│   │   └── httpError.js
│   └── validators // 验证器，字段检查，分页检查
│       ├── order.validator.js
│       ├── user.validator.js
│       └── validator.js
├── app.env      // 环境变量
├── app_order.js // 订单服务入口
├── app_user.js // 用户服务入口
├── database
│   └── mongo-init.js // mongodb 初始化
├── docker-compose.yml // docker compose 配置
├── html
│   ├── admin.html // 管理员页面
│   ├── index.html // 首页 登陆
│   ├── payment.html // 支付页面
│   ├── profile.html // 用户信息页面
│   └── register.html // 注册页面
├── mongod.conf // mongodb 配置
├── nginx.conf // nginx 配置
├── node_modules
├── package-lock.json
├── package.json
├── payment.postman_collection.json
├── readme.md
```
