import config from '../../dbconfig.js'
import sql from 'mssql'
import Personaje from './../models/personaje.js';
import Pelicula from './../models/pelicula.js';
import LogWriter from '../modules/log-helper.js'

class DisneyServices {
    getToken = async() => {
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
    getByCharacters = async(peliculasOSeries,edad,nombre) => {
        let returnEntry = null;
        try{
            let pool =  await sql.connect(config)
            let result = await pool.request()
                            .input('pNombre', sql.NChar, nombre)
                            .input('pEdad', sql.Int, edad)
                            .input('pPeliculasOSeries', sql.NChar, peliculasOSeries)
                            .query("select * from Personaje WHERE nombre = @pNombre or edad = @pEdad or peliculasOSeries = @pPeliculasOSeries")
            returnEntry = result.recordsets[0][0]
            
        }
        catch(error){
            LogWriter(error)
        }
        return returnEntry
    }
    getByMovie= async(titulo,orden) => {
        let returnEntry = null;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request()
                            .input('pTitulo', sql.NChar, titulo)
                            .query(`select * from Pelicula  WHERE titulo = @pTitulo order by fechaDeCreacion ${orden}`)
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