import config from '../../dbconfig.js'
import sql from 'mssql'
import Pizza from './../models/pizza.js';

class PizzaServices {
    getAll = async() => {
        let returnEntry = null;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request().query("select * from Pizzas")
            returnEntry = result.recordsets[0]
        }
        catch(error){
            console.log(error)
        }
        return returnEntry
    }
    getById = async(id) => {
        let returnEntry = null;
        try{
            let pool = await sql.connect(config)
            let result = await pool.request()
                            .input('pId', sql.Int, id)
                            .query("select * from Pizzas WHERE id = @pId")
            returnEntry = result.recordsets[0][0]
        }
        catch(error){
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
        }
        return rowsAffected
    }
}   
export default PizzaServices;