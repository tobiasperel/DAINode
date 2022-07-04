import { Router } from 'express'
import DisneyServices from "../services/disney-sevices.js"
const queryString = require('query-string');
const router = Router();
const disneyServices = new DisneyServices();

router.get('/auth/login', async(req,res) => {
    const pizza = await disneyServices.getById(req.params.id)
    return res.status(200).json(pizza)
})

router.get('/characters', async(req,res) => {
    let objeto = queryString.parse(parsedUrl.query);
    console.log(objeto);
    let peliculasOSeries = req.query.peliculasOSeries
    let edad = req.query.edad
    let nombre = req.query.nombre
    const personajes = await disneyServices.getByCharacters(peliculasOSeries,edad,nombre)
    return res.status(200).json(personajes)
})

router.get('/movies', async(req,res) => {
    let titulo = req.query.titulo
    let orden = req.query.orden
    const pelicula = await disneyServices.getByMovie(titulo,orden)
    return res.status(200).json(pelicula)
})
/*
router.get('/movies?orden', async(req,res) => {
    const peliculas = await disneyServices.getByOrden(req.query.orden)
    return res.status(200).json(peliculas)
})
*/
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