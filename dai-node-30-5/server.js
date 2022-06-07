import express from 'express'
//import cors from 'cors'
import router from "./src/controller/pizzaController.js"

const app = express()
const port = 5000

//app.use(cors());
app.use(express.json());
app.use("/api/pizzas", router);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})