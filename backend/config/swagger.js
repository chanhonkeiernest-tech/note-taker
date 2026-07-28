import { Passport } from "passport";
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import account from '../model/accountdb.js';
import note from '../model/notedb.js';
import { timeStamp } from "console";

const __filename = fileURLToPath(import.meta.url);
console.log(import.meta.url);
const __dirname = import.meta.dirname;


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
        // User schema - defines the structure of a user object
        account: {
          type: "object", // It's an object
          properties: {
            // Fields in the user object
            id: { type: "integer", example: 1 }, // User ID (auto-generated)
            username: { type: "string", example: "John Doe" }, // User name
            password: { type: "string", example: "dsj2sal43kq1ke" },
          },
          required: ["username", "password"], // name field is required; id is auto-generated
        },
        note: {
          type: "object", // It's an object
          properties: {
            // Fields in the user object
            id: { type: "integer", example: 1 }, // User ID (auto-generated)
            title: { type: "string", example: "John Doe" }, // User name
            text: { type: "string", example: "dsj2sal43kq1ke" },
            user: {type:"account Id", example: 1 },
            timeStamp:{type: "string", example: "2026-07-26T21:42:29.082Z" }
          },
          required: ["title"], // name field is required; id is auto-generated
        },
      },
    },
  },
  // File paths where Swagger looks for API documentation (@swagger comments)
  apis: [
    path.join(__dirname, "..", "server.js"), // Look in app.js for documentation
    path.join(__dirname, "..", "routes", "*.js"), // Look in all route files
  ],
};

export default swaggerJsdoc(options);
//module.exports = swaggerJsdoc(options);
