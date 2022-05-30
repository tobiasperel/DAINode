import fs from 'fs'

let path = "./src/modules/log.txt"

function LogWriter(content){
    fs.writeFileSync( path, content);
}

export default LogWriter