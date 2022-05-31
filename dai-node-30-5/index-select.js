import config from  './dbconfig.js'
import sql from 'mssql'

let pool = await sql.connect(config)
let result = await pool.request().query("select top 2 * from Pizzas")

console.log(result)
console.log(result.recordsets)

process.exit()