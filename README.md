# BOSCH STORE - eCommerce Web Application
A full-stack eCommerce web application built using React for frontend and Spring Boot for backend.
This project was developed as part of an internship application and it showcases user authentication, role-based access, product browsing and sorting, and cart functionality.

## Features
* JWT Authentication with roles (USER, ADMIN)
* Browse and view product details with images and specifications
* Search and sort products by name or price (A-Z, Z-A, High to Low, Low to High)
* Pagination on products grid or products list
* Adjust product quantity and add them to cart
* User specific cart with ability to update cart item quantity
* User registration and login

## Project Architecture

### Frontend (React)
* Built with reusable components such as *NavBar*, *LoginForm*, *RegisterForm*, *ProductGrid*, *Product*, *Cart* etc.
* Used Axios for HTTP requests
* Used react-router for navigation

### Backend (Spring Boot)
* Organized into
  - entities (User, Product, CartItem)
  - controllers (REST endpoints)
  - services and implementations for each service
  - DTOs (UserDto, UserLoginDto, CartItemDto, CartItemResponseDto, etc.)
* Uses JPA
* Database: MySQL

## Project Structure
* bosch-store
  - bosch-frontend
  - bosch-backend

## Setup Instructions

### Backend
1. Clone the project using `git clone`(repo link)
2. Create your own `application.properties` file by copying the example file. Generate your own key using `openssl rand -base64`. JWT Key must be 64-byte Base64
3. Update your own database name, username and password
4. Make sure MySQL is running and run the backend with `./mvnw spring-boot:run`

### Frontend
1. Open frontend folder
2. Install dependencies with `npm install`
3. Start React application with `npm start`

## Architecture Decisions
* React was chosen because it supports reusable components and due to familiarity
* MySQL was selected for database due to familiarity and ease of integration
* DTOs were added to control what is returned in API responses
* Authentication is handled using JWT

## Improvements with more time
* Add "Remove from cart" functionality on frontend (already implemented on backend)
* Allow user to filter products by categories
* Add real checkout/payment integration
* Improve error handling
