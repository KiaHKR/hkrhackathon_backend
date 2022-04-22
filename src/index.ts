import express from 'express';
const app = express();
import users from './routes/users';
import login from './routes/login';
import admin from './routes/admins';
import puzzles from './routes/puzzles';
import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();
if (!process.env.JWT_KEY) {
   console.log('FATAL ERROR: jwt private key is not defined.');
   process.exit(1);
}

mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('Connected to mongoDB'));

app.use(express.json());
app.use('/user', users);
app.use('/login', login);
app.use('/admin', admin);
app.use('/puzzles', puzzles);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
   return console.log(`Express is listening at: ${port} port.`)
});
