import express from 'express';
const app = express();

const port = 3000 || process.env.PORT;

app.use(express.json());


app.listen(port, () => {
   return console.log(`Express is listening at: ${port} port.`)
});
