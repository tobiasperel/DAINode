import {router} from 'express'
import pizzaService from "./src/services/pizzas-sevices.js"

const router = Router();
const pizzaService = new pizzaService();

router.get('', async(req,res) => {
    console.log("patito");

    const pizzas = await pizzaService.getAll()

    return res.status(200).json(pizzas)
})

router.get('/:id', async(req,res) => {
    //console.log(req.params.)
    const id  = req.params....
    const unaPizza = await pizzaService.getById(id)
})

