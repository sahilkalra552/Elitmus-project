import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// mongoose.set('strictQuery', true) //not needed

export default function connect() {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((res) => {
            console.log(`Connection successful with db`);
        }).catch((err) => console.log(`err `, err));
};