# Chirper aka "not a Twitter"
Chirper is a platform made with 
- `React` for the front-end
- `NODE.js` for the back-end
- `MySQL` as relational DBMS
- `JEST` for unit-testing

using `MVC` framework but the view part is replaced with React as a front-end.

The packages used are:
- `express` for server, router and json body
- `cookie-parser` for parsing cookies
- `cors` for Cross Origin Resource Sharing json data fetched from backend 
- `jsonwebtoken` to genereate jwt for authentication and authorization
- `bcrypt` for hashing password
- `dotenv` for securing secrets and not hardcoding secrets
- `express-validator` to validate email and password

## Existing APIs
- POST `/signup` to sign user up
```
{
"email": "test@test.com",
"password": "testpassword", "phone_number":"1111111111"
}
```
- POST `/login` to log in to the account
```
{
"email": "test@test.com",
"password": "testpassword"
}
```
- GET `/posts` retrieves all the posts
- GET `/posts/:post_id` retrieves specific post with post_id
- POST `/posts` to post record to the database
```
{
    "post": "MY NEW POST!!"
}
```
- GET `/deletePost/:post_id` deletes the specific post if the **specific post is owned by the user**
- POST `/updateData/post_id` updates the post_id if the **post is owned by user** `is not availabe in the fron-end yet`
```
{
"post":"new post"
}
```
## SETTING UP THE PROJECT
1. Setting up MYSQL Database
    - Download Xampp
    - Start `apache` and `mysql` server on default PORT
    - make a database named `walk_users`
    - make two tables `posts` and `users`
    - import `posts.sql` into `posts` table
    - import `users.sql` into `users` table
2. Starting up backend server
    - Open terminal in this directory
    - `$ npm install`
    - `$ nodemon app.js` if nodemon is installed
    - `$ node app.js` if node is not installed
    - Do not change the PORT number
3. Setting up front-end
    - Open terminal in `./front-end/chirper/`
    - `$ npm install`
    - `$ npm run dev`
    - Do not change the port number. The default port should be `5173`
4. JEST testing
    - `$ npm test`
Following the above steps should run the application smoothly.

### DEMO
video file `demo.mkv`
