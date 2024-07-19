// src/app.js
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import connectDB from "./dbconfig/dbConnect.js";
import router from "./routes/Application_Url_Routs.js";
import dotenv from "dotenv"

dotenv.config();

// const urlRoutes = require('./routes/urlRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

// Set EJS as the templating engine
// app.set('view engine', 'ejs');

// Routes
app.use('/api',router);

app.get('/')
connectDB()

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
