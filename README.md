# INVENTORY-ALLOCATION-SYSTEM
## Overview
This project implements an Inventory Allocation System using Node.js, MySQL, and React.js, designed to safely process concurrent order requests while preventing stock over-allocation.

The system strictly follows the task constraints:

- **Single API endpoint**

- **Service-layer** 

- **business logic**

- **Transaction-safe** 

- **inventory updates**

- **Minimal frontends with no business logic**

## Tech Stack
- **Backend**: Node.js (Express)

- **Database**: MySQL

- **Frontend**: React.js

- **Concurrency Control**: MySQL transactions with row-level locking

  ## Project Structure
  <img width="584" height="754" alt="image" src="https://github.com/user-attachments/assets/8e65df09-6bab-4f98-9c7b-affadd2b6fac" />

## Backened Design

The backend follows a layered architecture:

Routes → Controllers → Services → Repositories → Database

## Responsiblities
- **Routes**: Define API endpoints

- **Controllers**: Handle HTTP request/response only

- **Services**: Core business logic and transactions

-  **Repositories**: Database queries

- **Models**: Database connection setup

  All validation, stock checks, order creation, and error handling are implemented **inside the service layer**, as required.

  ## API Specification

  ### POST /order

  #### Request Body

   {
  
  "productId": 1,
  
  "quantity": 3
  
 }

#### Success Response

 {

  "message": "Order placed successfully"

 }

#### Failure Response

 {

  "message": "Insufficient stock"

 }








