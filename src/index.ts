import express from 'express';
const app = express();
import users from './routes/users'
import login from './routes/login'
import admin from './routes/admins'
import authentic from './routes/authorisation';

import dotenv from 'dotenv';
dotenv.config();
if (!process.env.JWT_KEY) {
   console.log('FATAL ERROR: jwt private key is not defined.');
   process.exit(1);
}

app.use(express.json());
app.use('/users', users);
app.use('/login', login);
app.use('/admin', admin);
app.use('/auth', authentic);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
   return console.log(`Express is listening at: ${port} port.`)
});
