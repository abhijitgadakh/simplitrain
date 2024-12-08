# simplitrain

simplitrain

# User Authentication and Role-Based Authorization API

This API provides authentication, user profile management, and role-based authorization. It uses JWT for authentication and defines two user roles:

- **General User** (`usertype: "gen"`) - Can only view and update their own profile.
- **Admin User** (`usertype: "admin"`) - Can view all users, view individual user profiles, and update any user's profile.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Postman Usage](#postman-usage)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/yourrepo.git
   ```

2. Install the dependencies:

   ```bash
   cd yourrepo
   npm install
   ```

3. Set up your MongoDB database (e.g., MongoDB Atlas or a local instance) and create a `.env` file with the following variables:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/simplitraindb
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Run the application:

   ```bash
   npm start
   ```

## API Endpoints

### 1. Register a New User

- **URL**: `/api/auth/register`
- **Method**: POST
- **Description**: Register a new user with their details.
- **Request Body**:

  ```json
  {
    "username": "john_doe",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "usertype": "gen"
  }
  ```

- **Response**:

  ```json
  {
    "user": {
      "username": "john_doe",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "usertype": "gen",
      "_id": "user_id_here",
      "createdAt": "2024-12-09T10:00:00Z",
      "updatedAt": "2024-12-09T10:00:00Z"
    },
    "token": "jwt_token_here"
  }
  ```

- **Who can use this**: Anyone (no authentication needed).

### 2. Login to Get a JWT Token

- **URL**: `/api/auth/login`
- **Method**: POST
- **Description**: Login with email and password to obtain a JWT token for authentication.
- **Request Body**:

  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **Response**:

  ```json
  {
    "user": {
      "username": "john_doe",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "usertype": "gen",
      "_id": "user_id_here"
    },
    "token": "jwt_token_here"
  }
  ```

- **Who can use this**: Anyone (no authentication needed).

### 3. Get User Profile (Authenticated User)

- **URL**: `/api/users/profile`
- **Method**: GET
- **Description**: Get the profile of the currently authenticated user.
- **Headers**:
  - Authorization: Bearer `<jwt_token_here>`
- **Response**:

  ```json
  {
    "username": "john_doe",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "usertype": "gen",
    "_id": "user_id_here",
    "createdAt": "2024-12-09T10:00:00Z",
    "updatedAt": "2024-12-09T10:00:00Z"
  }
  ```

- **Who can use this**: Only authenticated users (users who are logged in).

### 4. Update User Profile (Authenticated User)

- **URL**: `/api/users/profile`
- **Method**: PUT
- **Description**: Update the profile of the currently authenticated user.
- **Headers**:
  - Authorization: Bearer `<jwt_token_here>`
- **Request Body**:

  ```json
  {
    "firstname": "Johnathan",
    "lastname": "Doe",
    "email": "johnathan.doe@example.com"
  }
  ```

- **Response**:

  ```json
  {
    "username": "john_doe",
    "firstname": "Johnathan",
    "lastname": "Doe",
    "email": "johnathan.doe@example.com",
    "usertype": "gen",
    "_id": "user_id_here",
    "createdAt": "2024-12-09T10:00:00Z",
    "updatedAt": "2024-12-09T10:10:00Z"
  }
  ```

- **Who can use this**: Only authenticated users (users who are logged in).

### 5. Get All Users (Admin Only)

- **URL**: `/api/users`
- **Method**: GET
- **Description**: Get all users (admin only).
- **Headers**:
  - Authorization: Bearer `<jwt_token_here>`
- **Response**:

  ```json
  [
    {
      "username": "john_doe",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "usertype": "gen",
      "_id": "user_id_here",
      "createdAt": "2024-12-09T10:00:00Z",
      "updatedAt": "2024-12-09T10:00:00Z"
    },
    {
      "username": "admin_user",
      "firstname": "Admin",
      "lastname": "User",
      "email": "admin.user@example.com",
      "usertype": "admin",
      "_id": "admin_user_id_here",
      "createdAt": "2024-12-09T10:00:00Z",
      "updatedAt": "2024-12-09T10:00:00Z"
    }
  ]
  ```

- **Who can use this**: Only users with the "admin" role.

### 6. Get Single User (Admin Only)

- **URL**: `/api/users/:id`
- **Method**: GET
- **Description**: Get a single user's profile by ID (admin only).
- **Headers**:
  - Authorization: Bearer `<jwt_token_here>`
- **Response**:

  ```json
  {
    "username": "john_doe",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "usertype": "gen",
    "_id": "user_id_here",
    "createdAt": "2024-12-09T10:00:00Z",
    "updatedAt": "2024-12-09T10:00:00Z"
  }
  ```

- **Who can use this**: Only users with the "admin" role.

## Postman Usage

To test these APIs using Postman, follow the steps below:

### Register a New User

- **URL**: POST `http://localhost:5000/api/auth/register`
- **Body**: Choose raw and set to JSON. Paste the request body:

  ```json
  {
    "username": "john_doe",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "usertype": "gen"
  }
  ```

### Login and Get JWT Token

- **URL**: POST `http://localhost:5000/api/auth/login`
- **Body**: Choose raw and set to JSON. Paste the request body:

  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

### Get User Profile

- **URL**: GET `http://localhost:5000/api/users/profile`
- **Headers**: Add Authorization with Bearer `<your_jwt_token_here>`.

### Update User Profile

- **URL**: PUT `http://localhost:5000/api/users/profile`
- **Headers**: Add Authorization with Bearer `<your_jwt_token_here>`.
- **Body**: Choose raw and set to JSON. Paste the request body:

  ```json
  {
    "firstname": "Johnathan",
    "lastname": "Doe",
    "email": "johnathan.doe@example.com"
  }
  ```

### Get All Users (Admin Only)

- **URL**: GET `http://localhost:5000/api/users`
- **Headers**: Add Authorization with Bearer `<your_jwt_token_here>`.

### Get Single User (Admin Only)

- **URL**: GET `http://localhost:5000/api/users/:id`
- **Headers**: Add Authorization with Bearer `<your_jwt_token_here>`.

## Conclusion

This API provides essential user authentication, profile management, and role-based access control features for general and admin users. Use the provided Postman test cases to interact with the API and test various functionalities.
