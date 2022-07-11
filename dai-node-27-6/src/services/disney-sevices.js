import config from '../../dbconfig.js'
import sql from 'mssql'
import Personaje from './../models/personaje.js';
import Pelicula from './../models/pelicula.js';
import LogWriter from '../modules/log-helper.js'

async function verificacion(token){
    console.log(token);
    let returnEntry = null;
    let pool =  await sql.connect(config)
        let result = await pool.request()
                                .input('pToken', sql.NChar, token)
                                .query("select * from Usuario where Token = @pToken")
    returnEntry = result.recordsets[0]
    if (returnEntry.length == 0 ){
        return 401
    }
    if ( returnEntry["TokenExperationDate"] < Date.now){
        return 403
    }
    return 200
}

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
                                        .input('pTokenExpira', sql.DateTime, new Date(new Date().getTime() + (1000 * 60 * 60 * 24)))
                                        .query("UPDATE usuario SET token = @pToken, TokenExperationDate = @pTokenExpira WHERE Usuario.nombre = @pNombre and Usuario.pin  = @pPin")
            rowsAffected = result.rowsAffected
        }
        catch(error){
            LogWriter(error)
        }
        return rowsAffected,token
    }

    getByCharacters = async(character,token) => {
        let estado = await verificacion(token)
        let resupuesta = {value: null, estadoRespuesta : estado}
        if (estado  != 200){
            return resupuesta
        }
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
        resupuesta = {value: returnEntry, estadoRespuesta : estado}
        return resupuesta
    }

    insertCharacter = async(character, token) => {
        let estado = await verificacion(token)
        let resupuesta = {value: null, estadoRespuesta : estado}
        if (estado  != 200){
            return resupuesta
        }
        let rowsAffected = 0;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request()
                                        .input('pImagen', sql.NChar, character.imagen)
                                        .input('pNombre', sql.NChar, character.nombre)                                        
                                        .input('pEdad', sql.Int, character.edad)
                                        .input('pPeso', sql.Int, character.peso)
                                        .input('pHistoria', sql.NChar, character.historia)
                                        .input('pPeliculasOSeries', sql.NChar, character.peliculasOSeries)
                                        .query("Insert into Personaje (imagen, nombre, edad, peso,historia,peliculasOSeries) values (@pImagen,@pNombre, @pEdad, @pPeso, @pHistoria,@pPeliculasOSeries )")
            rowsAffected = result.rowsAffected
        }
        catch(error){
            LogWriter(error)
        }
        resupuesta = {value: rowsAffected, estadoRespuesta : estado}
        return resupuesta
    }

    updateCharacter = async(character,id,token) => {
        let estado = await verificacion(token)
        let resupuesta = {value: null, estadoRespuesta : estado}
        if (estado  != 200){
            return resupuesta
        }
        let rowsAffected = 0;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request()
                                        .input('pId', sql.Int, id)
                                        .input('pImagen', sql.NChar, character.imagen)
                                        .input('pNombre', sql.NChar, character.nombre)                                        
                                        .input('pEdad', sql.Int, character.edad)
                                        .input('pPeso', sql.Int, character.peso)
                                        .input('pHistoria', sql.NChar, character.historia)
                                        .input('pPeliculasOSeries', sql.NChar, character.peliculasOSeries)
                                        .query("Update Personaje Set imagen = @pImagen, nombre = @pNombre, edad = @pEdad, peso = @pPeso ,historia = @pHistoria ,peliculasOSeries = @pPeliculasOSeries" )
            rowsAffected = result.rowsAffected
        }
        catch(error){
            LogWriter(error)
        }
        resupuesta = {value: rowsAffected, estadoRespuesta : estado}
        return resupuesta
    }

    getByMovie= async(movies,token) => {
        let estado = await verificacion(token)
        let resupuesta = {value: null, estadoRespuesta : estado}
        if (estado  != 200){
            return resupuesta
        }
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

            let result = await pool.request()
                            .query(query)

            returnEntry = result.recordsets[0]
        }
        catch(error){
            LogWriter(error)
        }
        resupuesta = {value: returnEntry, estadoRespuesta : estado}
        return resupuesta
    }

    insertmovie = async(movie, token) => {
        let estado = await verificacion(token)
        let resupuesta = {value: null, estadoRespuesta : estado}
        if (estado  != 200){
            return resupuesta
        }
        let rowsAffected = 0;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request()
                                        .input('pImagen', sql.NChar, movie.imagen)
                                        .input('pTitulo', sql.NChar, movie.titulo)                                        
                                        .input('pFechaDeCreacion', sql.DateTime, movie.fechaDeCreacion)
                                        .input('pCalificacion', sql.Int, movie.calificacion)
                                        .input('pPersonajesAsociados', sql.NChar, movie.PersonajesAsociados)
                                        .query("Insert into Pelicula (imagen, titulo, fechaDeCreacion, calificacion,PersonajesAsociados) values (@pImagen,@pTitulo, @pFechaDeCreacion, @pCalificacion, @pPersonajesAsociados )")
            rowsAffected = result.rowsAffected
        }
        catch(error){
            LogWriter(error)
        }
        resupuesta = {value: rowsAffected, estadoRespuesta : estado}
        return resupuesta
    }

    updateMovie = async(movie,id,token) => {
        let estado = await verificacion(token)
        let resupuesta = {value: null, estadoRespuesta : estado}
        if (estado  != 200){
            return resupuesta
        }
        let rowsAffected = 0;
        //try{
            let pool = await sql.connect(config)
            let result = await pool.request()
                                        .input('pId', sql.Int, id)
                                        .input('pImagen', sql.NChar, movie.imagen)
                                        .input('pNombre', sql.NChar, movie.nombre)                                        
                                        .input('pEdad', sql.Int, movie.edad)
                                        .input('pPeso', sql.Int, movie.peso)
                                        .input('pHistoria', sql.NChar, movie.historia)
                                        .input('pPeliculasOSeries', sql.NChar, movie.peliculasOSeries)
                                        .query("Update Pelicula Set imagen = @pImagen, nombre = @pNombre, edad = @pEdad, peso = @pPeso ,historia = @pHistoria ,peliculasOSeries = @pPeliculasOSeries" )
            rowsAffected = result.rowsAffected
        /*}
        catch(error){
            LogWriter(error)
        }*/
        resupuesta = {value: rowsAffected, estadoRespuesta : estado}
        return resupuesta
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