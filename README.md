#List of dependencies
- bcrypt
- cors
- dotenv
- express
- express-session
- mongoose
- swagger-ui-express
- swagger-jsdoc
- passport
- passport-local

#Required component
-mongo db it uses the default database of test
-node js


#Set up guide
Fork the code and run npm install at the backend directory terminal
After the installation, create a .env file inside the backend directory.
Inside the .env file, specify a PORT number for listening 'PORT=Your port Number', session secret for the session 'SESSION_SECRET="Your Secret" and url for mongo database 'MONGODB_URI=The URL'. 
Go to the terminal, run npm start.
Go to any browder and input the link http://localhost:Your Port/index.html.
You should see a login page.
Since the database is clean and has no record within it, start with registering a new account.
