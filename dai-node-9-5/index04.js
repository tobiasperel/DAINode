import fs from "fs";

var path = './src/modules/testito.txt'
/*let patito = (err,data)=>{
  if(err){
    throw err;
  }
  console.log(data.toString())
}
fs.readFile(path,patito)*/

fs.readFile(path,(err,data) => {
  if(err){
    throw err;
  }
  console.log(data.toString())
})


const content = 'Tuki';
fs.writeFile(path, content, err => {
  if (err) {
    console.error(err);
  }
});