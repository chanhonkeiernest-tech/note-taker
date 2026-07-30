import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = import.meta.dirname;
var x =path.join(__dirname, "..", "server.js").replace(/\\/g, "/");
console.log(__dirname);
console.log(x);

const options = {
  definition: {
    // OpenAPI version (3.0.0 is the current standard)
    openapi: "3.0.0",
    // General information about the API
    info: {
      title: "Note Taker", // API name shown in Swagger UI
      version: "1.0.0", // API version number
      description: "It is an API that allows user to create note for themselve.", // Brief description
    },
    // Server URL where the API runs
    servers: [
      {
        url: "http://localhost:3001/", // Base URL for all API requests
        description: "Local development server", // Environment description
      },
    ],
    // Reusable components (authentication, data models, etc.)
    components: {
      // Security schemes available for the API
      securitySchemes: {
        Passport: {
          type: "http", 
          scheme:"bearer"
          
        },
      },
      // Data models/schemas used in API
      schemas: {
        // Defines account schemas 
        account: {
          type: "object", // It's an object
          properties: {
            // Fields in the user object
            id: { type: "integer", example: 1 }, // User ID (auto-generated)
            username: { type: "string", example: "Jon" }, // User name
            password: { type: "string", example: "1234" },
          },
          required: ["username", "password"], // need username and password to create new user
        },
        // Defines newaccount schemas 
        newaccount: {
          type: "object", // It's an object
          properties: {
            // Fields in the user object
            id: { type: "integer", example: 1 }, // User ID (auto-generated)
            username: { type: "string", example: "Jon" }, // User name
            password: { type: "string", example: "1234" },
            confirm_password: { type: "string", example: "1234" },
          },
          required: ["username", "password", "confirm_password"], // need username and password to create new user
        },
        // Defines note schemas 
        note: {
          type: "object", // It's an object
          properties: {
            // Fields in the user object
            id: { type: "integer", example: 1 }, // User ID (auto-generated)
            title: { type: "string", example: "John Doe" }, // User name
            text: { type: "string", example: "dsj2sal43kq1ke" },
            user: {type:"account Id", example: 1 },
            timeStamp:{type: "string", example: "2026-07-26T21:42:29.082Z" },
          },
          required: ["title"], // name field is required; id is auto-generated
        },
        //Defines new note schemas
        newNote: {
          type: "object", // It's an object
          properties: {
            // Fields in the user object
            title: { type: "string", example: "note 1" }, // User name
            text: { type: "string", example: "It is an apple." },
            
          },
          required: ["title"], // title is needed to create note;
        },
        //Defines update note schemas
        updatenote: {
          type: "object", // It's an object
          properties: {
            // Fields in the user object
            title: { type: "string", example: "Note 1" }, // User name
            text: { type: "string", example: "It is now an orange." },
            
          },
          required: ["title"], // title is neeeded to update;
        },
        //Defines rename note schemas
        rename: {
          type: "object", // It's an object
          properties: {
            // Fields in the user object
            oldtitle: { type: "string", example: "note 1" }, // User name
            newtitle: { type: "string", example: "Note 1" },
          },
          required: ["title"], // an old title and new title are neeeded to update;
        },
        //Defines delete note schemas
        delete: {
          type: "object", // It's an object
          properties: {
            // Fields in the user object
            title: { type: "string", example: "Note 1" }, // User name

          },
          required: ["title"], // title is neeeded to update;
        },
      },
    },
  },
  // File paths where Swagger looks for API documentation (@swagger comments)
  apis: [
    path.join(__dirname, "..", "server.js").replace(/\\/g, "/"),
    path.join(__dirname, "..", "routes", "*.js").replace(/\\/g, "/"),
  ],
};

export default swaggerJsdoc(options);
