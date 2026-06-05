import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import apiroute from './routes/apiroute.js';
import loginroute from './routes/login.js';
import connectdb from './database/config.js';
import passport from 'passport';
import session from 'express-session';
import './passportconfig.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({
    // `secret` is used to sign the session ID cookie. It should be a long, random string kept secret.
    // It uses the SESSION_SECRET environment variable or a default fallback key.
    secret: process.env.SESSION_SECRET || "your_secret_key",
    // `resave: false` means the session will not be saved back to the session store
    // if it was never modified during the request. This can help prevent race conditions.
    resave: false,
    // `saveUninitialized: false` means that a session that is new but not modified will not be saved.
    // This is useful for reducing server storage usage and complying with cookie laws.
    saveUninitialized: false,
    cookie: {
      // `secure: true` ensures the cookie is only sent over HTTPS. This should be true in production.
      // It's set based on the NODE_ENV environment variable.
      secure: process.env.NODE_ENV === "production",
      // `maxAge` sets the maximum age of the cookie in milliseconds (here, 7 days).
      // After this time, the cookie (and session) will expire.
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      // `sameSite: 'strict'` helps protect against CSRF (Cross-Site Request Forgery) attacks
      // by restricting when the browser sends the cookie.
      sameSite: "strict",
    },
  })
);


app.use(express.json());
app.use(cors());

connectdb();

app.use(passport.initialize());

app.use(passport.session());

app.use('/note', apiroute);
app.use('/start', loginroute);
// const prompt = inquirer.createPromptModule();




// async function newnotenetry() {
//     const entry= await prompt([
//          {
//             type: "input",
//             message: "Title",
            
//         },
//         {
//             type: "input",
//             message: "Note"
            
//         }
//     ])
//     console.log("\nResponse received:", response);
//     const postData = {
//         text: entry.input
        
//       };

// }


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);