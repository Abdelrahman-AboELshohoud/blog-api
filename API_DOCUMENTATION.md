# API Documentation

Base URL: `http://localhost:4500/api`
Run:
1- npm install 
2- npm run dev
## Authentication Endpoints

### Register User

- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: Returns user data and authentication token

### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: Returns user data and authentication token

### Logout

- **URL**: `/auth/logout`
- **Method**: `POST`
- **Response**: Clears authentication cookie

### Validate Token

- **URL**: `/auth/validate-token`
- **Method**: `GET`
- **Auth Required**: Yes
- **Response**: Confirms if token is valid

## User Management Endpoints

### Update Profile Image

- **URL**: `/user/update-avatar/:id`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**: Form-data with `image` file
- **Response**: Returns updated avatar URL

### Update Profile

- **URL**: `/user/update-profile/:id`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**:
  ```json
  {
    "name": "string",
    "bio": "string"
  }
  ```

### Delete Profile

- **URL**: `/user/delete-profile/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes

### Get User

- **URL**: `/user/get-user/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Response**: Returns user profile data

### Reset Password

- **URL**: `/user/reset-password/:id`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**:
  ```json
  {
    "email": "string",
    "newPassword": "string"
  }
  ```

## Blog Post Endpoints

### Create Post

- **URL**: `/post/create-post/:id`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**: Form-data with:
  ```json
  {
    "title": "string",
    "description": "string",
    "tags": "array",
    "status": "string",
    "category": "string",
    "image": "file"
  }
  ```

### Delete Post

- **URL**: `/post/delete-post/:postId/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes

### Update Post

- **URL**: `/post/update-post/:postId/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Body**: Same as Create Post

### Get Single Post

- **URL**: `/post/get-post/:postId/:id`
- **Method**: `GET`
- **Auth Required**: Yes

## Posts Listing Endpoints

### Get All Posts

- **URL**: `/posts/get-posts`
- **Method**: `GET`
- **Response**: Returns all blog posts

### Get My Posts

- **URL**: `/posts/get-my-posts/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Response**: Returns authenticated user's posts

### Get User Posts

- **URL**: `/posts/get-user-posts/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Response**: Returns specified user's posts

## Social Actions Endpoints

### Like/Unlike Blog

- **URL**: `/actions/like/:blogId/:id`
- **URL**: `/actions/unlike/:blogId/:id`
- **Method**: `POST`
- **Auth Required**: Yes

### Share/Unshare Blog

- **URL**: `/actions/share/:blogId/:id`
- **URL**: `/actions/unshare/:blogId/:id`
- **Method**: `POST`
- **Auth Required**: Yes

### Follow/Unfollow User

- **URL**: `/actions/follow/:userIdToFollow/:id`
- **URL**: `/actions/unfollow/:userIdToUnfollow/:id`
- **Method**: `POST`
- **Auth Required**: Yes

## Payment Endpoints

### Create Payment Order

- **URL**: `/payments/create-order/:id`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**:
  ```json
  {
    "amount": "number"
  }
  ```

### Capture Payment Order

- **URL**: `/payments/capture-order/:id`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**:
  ```json
  {
    "orderId": "string"
  }
  ```

## Search Endpoint

### Search

- **URL**: `/search/search`
- **Method**: `GET`
- **Query Parameters**: Implementation dependent

## Authentication

Most endpoints require authentication via a JWT token. The token should be sent as an HTTP-only cookie named `auth_token`.

## Error Responses

All endpoints may return the following error responses:

- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

Each error response includes a message explaining the error.

## CORS

The API allows requests from `http://localhost:5173` with credentials.
