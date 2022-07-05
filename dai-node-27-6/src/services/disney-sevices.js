import config from '../../dbconfig.js'
import sql from 'mssql'
import Personaje from './../models/personaje.js';
import Pelicula from './../models/pelicula.js';
import LogWriter from '../modules/log-helper.js'

class DisneyServices {
    putToken = async(Usuario) => {
        
        function rand() {
            return Math.random().toString(36).substr(2); // remove `0.`
        };
        
        function token12() {
            return rand() + rand(); // to make it longer
        };
        
        let token = token12(); // "bnh5yzdirjinqaorq0ox1tf383nb3xr"
        console.log(token);
        let rowsAffected = 0;
        try{
            let pool = await sql.connect(config)
            console.log(Usuario);
            let result = await pool.request()
                                        .input('pId', sql.Int, Usuario.Id)
                                        .input('pNombre', sql.NChar, Usuario.nombre)
                                        .input('pPin', sql.NChar, Usuario.pin) 
                                        .input('pToken', sql.NChar, token) 
                                        .query("UPDATE usuario SET token = @pToken WHERE Usuario.nombre = @pNombre and Usuario.pin  = @pPin")
            rowsAffected = result.rowsAffected
        }
        catch(error){
            LogWriter(error)
        }
        return rowsAffected,token
    }

    verificacion(token){
        let returnEntry = null;
        let pool =  await sql.connect(config)
            let result = await pool.request()
                                    .input('pToken', sql.NChar, token)
                                    .query("select * from Personaje where token = @pToken")
        returnEntry = result.recordsets[0]
        if (returnEntry == null){
            return false
        }
        if ( returnEntry["tokenExperationDate"] < Date.now){
            return false
        }
        return true
    }

    getByCharacters = async(character) => {
        let returnEntry = null;
        let query = "select * from Personaje WHERE 1=1 "
        if (character.nombre) {
            query = query + `AND nombre = '${character.nombre}' `
        }
        if (character.edad) {
            query = query + `AND edad = ${character.edad} `
        }
        if (character.peliculasOSeries) {
            query = query + `AND peliculasOSeries = '${character.peliculasOSeries}' `
        }
        try{
            let pool =  await sql.connect(config)
            let result = await pool.request()
                                    .query(query)
            returnEntry = result.recordsets[0]
            
        }
        catch(error){
            LogWriter(error)
        }
        return returnEntry
    }
    getByMovie= async(movies,token) => {
        let sePudo = this.verificacion(token)
        let returnEntry = null;
        let query = "select * from Pelicula  WHERE 1=1 "
        if (movies.titulo) {
            query = query + `AND titulo = '${movies.titulo}' `
        }
        if (movies.orden) {
            query = query + `order by fechaDeCreacion ${movies.orden} `
        }
        console.log(query)
        try{
            let pool = await sql.connect(config)
            console.log(query)

            let result = await pool.request()
                            .query(query)
                            console.log(query)

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