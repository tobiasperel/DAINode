import config from '../../dbconfig.js'
import sql from 'mssql'
import Personaje from './../models/personaje.js';
import Pelicula from './../models/pelicula.js';
import LogWriter from '../modules/log-helper.js'

class DisneyServices {
    getAll = async() => {
        let returnEntry = null;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request().query("select * from Pizzas")
            returnEntry = result.recordsets[0]
        }
        catch(error){
            LogWriter(error)
        }
        return returnEntry
    }
    getByNombre = async(nombre) => {
        let returnEntry = null;
        try{
            let pool =  await sql.connect(config)
            let result = await pool.request()
                            .input('pNombre', sql.Int, nombre)
                            .query("select * from Personajes WHERE nombre = @pNombre")
            returnEntry = result.recordsets[0][0]
        }
        catch(error){
            LogWriter(error)
        }
        return returnEntry
    }
    getByEdad = async(edad) => {
        let returnEntry = null;
        try{
            let pool =  await sql.connect(config)
            let result = await pool.request()
                            .input('pEdad', sql.Int, edad)
                            .query("select * from Personajes WHERE edad = @pEdad")
            returnEntry = result.recordsets[0][0]
        }
        catch(error){
            LogWriter(error)
        }
        return returnEntry
    }
    getByTituloPelicula = async(peliculasOSeries) => {
        let returnEntry = null;
        try{
            let pool =  await sql.connect(config)
            let result = await pool.request()
                            .input('pPeliculasOSeries', sql.Int, peliculasOSeries)
                            .query("select * from Personajes WHERE peliculasOSeries = @pPeliculasOSeries")
            returnEntry = result.recordsets[0][0]
        }
        catch(error){
            LogWriter(error)
        }
        return returnEntry
    }
    getByTitulo = async(titulo) => {
        let returnEntry = null;
        try{
            let pool =  await sql.connect(config)
            let result = await pool.request()
                            .input('pTitulo', sql.titulo, titulo)
                            .query("select * from Peliculas WHERE titulo = @pTitulo")
            returnEntry = result.recordsets[0][0]
        }
        catch(error){
            LogWriter(error)
        }
        return returnEntry
    }
    getByOrden = async(orden) => {
        let returnEntry = null;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request()
                            .query(`select * from Peliculas order by fechaDeCreacion ${orden}`)
            returnEntry = result.recordsets[0]
        }
        catch(error){
            LogWriter(error)
        }
        return returnEntry
    }
    insert = async(pizza) => {
        let rowsAffected = 0;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request()
                                        .input('pNombre', sql.NChar, pizza.Nombre)
                                        .input('pLibreGluten', sql.Bit, pizza.LibreGluten)                                        
                                        .input('pImporte', sql.Float, pizza.Importe)
                                        .input('pDescripcion', sql.NChar, pizza.Descripcion)
                                        .query("Insert into pizzas(Nombre, LibreGluten, Importe, Descripcion) values (@pNombre, @pLibreGluten, @pImporte, @pDescripcion)")
            rowsAffected = result.rowsAffected
        }
        catch(error){
            LogWriter(error)
        }
        return rowsAffected
    }
    update = async(pizza,id) => {
        let rowsAffected = 0;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request()
                                        .input('pId', sql.Int, id)
                                        .input('pNombre', sql.NChar, pizza.Nombre)
                                        .input('pLibreGluten', sql.Bit, pizza.LibreGluten)                                        
                                        .input('pImporte', sql.Float, pizza.Importe)
                                        .input('pDescripcion', sql.NChar, pizza.Descripcion)
                                        .query("UPDATE Pizzas SET Nombre = @pNombre, LibreGluten = @pLibreGluten, Importe= @pImporte, Descripcion = @pDescripcion WHERE Pizzas.Id = @pId")
            rowsAffected = result.rowsAffected
        }
        catch(error){
            LogWriter(error)
        }
        return rowsAffected
    }
    deleteById = async(id) => {
        let rowsAffected = 0;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request().input('pId', sql.Int, id)
            .query("DELETE from Pizzas WHERE id = @pId")
            rowsAffected = result.rowsAffected
        }
        catch(error){
            LogWriter(error)
        }
        return rowsAffected
    }
}   
export default DisneyServices;