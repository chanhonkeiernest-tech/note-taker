const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const apiroute = require('./routes/apiroute');
const loginroute = require('./routes/login');
const connectdb = require('./database/config');
const passport = require('passport');
const session = require('express-session');
 require("./passportconfig.js");

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