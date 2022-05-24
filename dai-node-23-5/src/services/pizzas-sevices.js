import config from '../../dbconfig.js'
import sql from 'mssql'

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
    insert = async() => {
        
    }
    update = async() => {
        
    }
    deleteById = async() => {
        
    }
}   
export default PizzaServices;