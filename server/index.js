import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connector from "./database/connection.js";
import userRoutes from "./routes/userRoutes.js";

// env config
dotenv.config();

// connectoin to DB
connector();


// express app
const app = express();


// middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/user",userRoutes);

// starting server
app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
})