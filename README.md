 # Home Assignment for Olderan Investment LTD

Users management REST API developed with NodeJs & mongoBD on AWS.  

Packeges to start -  npm i express express-validator bcryptjs config mongoose

Deployed on Heroku: https://limitless-journey-82462.herokuapp.com  

Get all users - fetch all users data from MongoDB into Json list, without the password field.  
HTTP GET - api/admin/users.      

Create a new User - Encrypts the password and save the new user in MongoDB.   
HTTP GET - POST api/users.  
Params in Body (Json): nickname, username, password, status.
