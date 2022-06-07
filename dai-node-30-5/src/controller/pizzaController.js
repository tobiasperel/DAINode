import { Router } from 'express'
import PizzaServices from "../services/pizzas-sevices.js"

const router = Router();
const pizzaService = new PizzaServices();

router.get('', async(req,res) => {
    
    const pizzas = await pizzaService.getAll()
    return res.status(200).json(pizzas)
})


router.get('/:id', async(req,res) => {
    const pizza = await pizzaService.getById(req.params.id)
    return res.status(200).json(pizza)
})

router.post('', async(req,res) => {
    const pizza = await pizzaService.insert(req.body)
    return res.status(200).json(pizza)
})

router.put('/:id', async(req,res) => {
    const pizza = await pizzaService.update(req.body,req.params.id)
    return res.status(200).json(pizza)
})

router.delete('/:id', async(req,res) => {
    const pizza = await pizzaService.deleteById(req.params.id)
    return res.status(200).json(pizza)
})
export default router;