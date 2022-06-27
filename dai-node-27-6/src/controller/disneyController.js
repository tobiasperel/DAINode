import { Router } from 'express'
import disneyServices from "../services/disney-sevices.js"

const router = Router();
const disneyServices = new disneyServices();

router.get('/auth/login', async(req,res) => {
    const pizza = await disneyServices.getById(req.params.id)
    return res.status(200).json(pizza)
})

router.get('characters/:nombre', async(req,res) => {
    const personaje = await disneyServices.getByNombre(req.params.nombre)
    return res.status(200).json(personaje)
})

router.get('characters/:edad', async(req,res) => {
    const personajes = await disneyServices.getByEdad(req.params.edad)
    return res.status(200).json(personajes)
})

router.get('characters/:movieTitle', async(req,res) => {
    const personajes = await disneyServices.getByTituloPelicula(req.params.peliculasOSeries)
    return res.status(200).json(personajes)
})

router.get('movies/:titulo', async(req,res) => {
    const pelicula = await disneyServices.getByTitulo(req.params.titulo)
    return res.status(200).json(pelicula)
})

router.get('movies/:orden', async(req,res) => {
    const peliculas = await disneyServices.getByOrden(req.params.orden)
    return res.status(200).json(peliculas)
})

// router.post('', async(req,res) => {
//     const pizza = await pizzaService.insert(req.body)
//     return res.status(200).json(pizza)
// })

// router.put('/:id', async(req,res) => {
//     const pizza = await pizzaService.update(req.body,req.params.id)
//     return res.status(200).json(pizza)
// })

// router.delete('/:id', async(req,res) => {
//     const pizza = await pizzaService.deleteById(req.params.id)
//     return res.status(200).json(pizza)
// })
export default router;