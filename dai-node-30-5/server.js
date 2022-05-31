import express from 'express'
import cors from 'cors'
import pizzaRouter from "./src/controller"

const app = express()
const port = 5000

app.use(cors());
//app.use(addNewHeader);

app.use(express.json());

app.listen(port, () => {
    console.log("listening")
})