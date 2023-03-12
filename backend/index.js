// Import dependencies
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Use middleware
app.use(express.json());
app.use(cors());

// Set up API routes
app.use("/", routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
