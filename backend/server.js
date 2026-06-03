const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const apiroute = require('./routes/apiroute');
const loginroute = require('./routes/login');
const connectdb = require('./database/config');

app.use(express.json());
app.use(cors());

connectdb();


app.use('/note', apiroute);
app.use('/login', loginroute);
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