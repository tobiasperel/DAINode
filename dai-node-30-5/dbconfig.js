import 'dotenv/config'
const config = {
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    server : process.env.DB_SERVER,
    daabase : process.env.DB_DATABASE,
    options : {
        trustServerCertificate : true,
        trustedConnection : true,
    }
}
export default config;