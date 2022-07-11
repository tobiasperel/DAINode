import { Router } from 'express'
import DisneyServices from "../services/disney-sevices.js"
const router = Router();
const disneyServices = new DisneyServices();

router.put('/auth/login', async(req,res) => {
    let rowsAffected,token = await disneyServices.putToken(req.body)
    return res.status(200).json(token)
})

router.get('/characters', async(req,res) => {
    
    const respuesta = await disneyServices.getByCharacters(req.query,req.headers["authorization"])
    return res.status(respuesta["estadoRespuesta"]).json(respuesta["value"])
})

router.post('/characters', async(req,res) => {
    const respuesta = await disneyServices.insertCharacter(req.body,req.headers["authorization"])
    return res.status(respuesta["estadoRespuesta"]).json(respuesta["value"])
})

router.put('/characters/:id', async(req,res) => {
    const respuesta = await disneyServices.updateCharacter(req.body,req.params.id,req.headers["authorization"])
    return res.status(respuesta["estadoRespuesta"]).json(respuesta["value"])
})

router.get('/movies', async(req,res) => {
    const respuesta = await disneyServices.getByMovie(req.query, req.headers["authorization"])
    return res.status(respuesta["estadoRespuesta"]).json(respuesta["value"])
})

router.post('/movies', async(req,res) => {
    const respuesta = await disneyServices.insertmovie(req.body,req.headers["authorization"])
    return res.status(respuesta["estadoRespuesta"]).json(respuesta["value"])
})


export default router;