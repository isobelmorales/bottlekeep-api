# Bottlekeep

This is the backend API for the Bottlekeep client: TBD
This is a RESTful API and allows users of my React front-end application to CRUD bottles and their comments.

## Overview

This app allows users to keep track of their bottles on keep at various restaurants, bars, and lounges. 
This is a full-stack MERN app featuring token user authentication.

### Technologies Used:

- Mongoose
- MongoDB
- Express
- React
- Nodemon
- Morgan
- Postman
- bootstrap
- bcrypt
- axios

## User Stories

```
As a user, I want the ability to: 
- sign up for an account.
- sign in to my account.
- sign out of my account.
- create a new bottle.
- keep track of how long a location will hold a bottle.
- keep track of when I purchased a bottle.
- keep track of how much is left in my bottle. 
- share a bottle with a group of users. 
- view all of my bottles. 
- update a bottle.
- delete a bottle I have created. 
- post a comment on a bottle.
- delete comments I have made.
- view a bottle's comments.
```

## Routes

### Bottles

| Verb   | URI Pattern     | Controller#Action |
|--------|-----------------|-------------------|
| GET    | `/bottles`      | `bottles#index`   |
| GET    | `/bottles/:id`  | `bottles#show`    |
| POST   | `/bottles`      | `bottles#create`  |
| PATCH  | `/bottles/:id`  | `bottles#update`  |
| DELETE | `/bottles/:id`  | `bottles#delete`  |

### Users

| Verb   | URI Pattern         | Controller#Action |
|--------|---------------------|-------------------|
| POST   | `/sign-up`          | `users#signup`    |
| POST   | `/sign-in`          | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |
