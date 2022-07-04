import { Router } from 'express'
import DisneyServices from "../services/disney-sevices.js"
const router = Router();
const disneyServices = new DisneyServices();

router.put('/auth/login', async(req,res) => {
    let rowsAffected,token = await disneyServices.putToken(req.body)
    return res.status(200).json(token)
})

router.get('/characters', async(req,res) => {
    const personajes = await disneyServices.getByCharacters(req.query)
    return res.status(200).json(personajes)
})

router.get('/movies', async(req,res) => {
    const pelicula = await disneyServices.getByMovie(req.query)
    return res.status(200).json(pelicula)
})
export default router;