# AutoMart

[![Build Status](https://travis-ci.org/olaludesunkanmi/AutoMart.svg?branch=develop)](https://travis-ci.org/olaludesunkanmi/AutoMart)
[![Coverage Status](https://coveralls.io/repos/github/olaludesunkanmi/AutoMart/badge.svg?branch=develop)](https://coveralls.io/github/olaludesunkanmi/AutoMart?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/65b647ee1e9958a0937a/maintainability)](https://codeclimate.com/github/olaludesunkanmi/AutoMart/maintainability)

## Description
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With
Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

### Required Features
1. User can sign up.
2. User can sign in.
3. User (seller) can post a car sale advertisement.
4. User (buyer) can make a purchase order.
5. User (buyer) can update the price of his/her purchase order.
6. User (seller) can mark his/her posted AD as sold.
7. User (seller) can update the price of his/her posted AD.
8. User can view a specific car.
9. User can view all unsold cars.
10. User can view all unsold cars within a price range.
11. Admin can delete a posted AD record.
12. Admin can view all posted ads whether sold or unsold.

### Optional Features
- User can reset password.
- User can view all cars of a specific body type.
- User can add multiple pictures to a posted ad.
- User can flag/report a posted AD as fraudulent.
- User can view all unsold cars of a specific make (manufacturer).
- User can view all used unsold cars.
- User can view all new unsold cars.

## Gh-pages Link
https://olaludesunkanmi.github.io/AutoMart/UI

### API Routes
S/N | Verb   | Endpoint         | Description                    |
---:| -------|------------------|--------------------------------|
  1 | Post   | /auth/signup     | Create a user account          |
  2 | Post   | /auth/login      | Sign in a user                 |
  3 | Get    | /car             | Get all posted car ads         |
  4 | Get    | /car/:id         | Get specific car               |
  5 | Get    | /available/range | Get cars within a price range  |
  6 | Get    | /available/used  | Get all used unsold cars       |
  7 | Get    | /available/new   | Get all new unsold cars        |
  8 | Get    | /available       | Get all unsold cars            |
  9 | Patch  | /car/:id/status  | Update car post ad as sold     |
  10| Patch  | /car/:id/price   | Update price of posted ad      |
  11| Delete | /car/:id         | Delete a car ad                |
  12| Post   | /order           | Create a purchase order        |
  13| Patch  | /order/:id/price | Update price of purchase order |
  14| Post   | /car             | Create a car sale ad           |

### Database
 PostgreSQL

### HEROKU LINK
https://auto-mart-andela-app.herokuapp.com/

### API Documentation
https://automart14.docs.apiary.io/