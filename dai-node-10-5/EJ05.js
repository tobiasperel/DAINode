var url = 'http://www.ort.edu.ar:8080/alumnos/index.htm?curso=2022&mes=mayo'

function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var primeraYsegundaParte = url ? url.split('?')[0] : window.location.search.slice(1);
    var patito = primeraYsegundaParte.split('/')[0] + "//" + primeraYsegundaParte.split('/')[2];
    var ckuak = primeraYsegundaParte.split('/')[3] + "//" + primeraYsegundaParte.split('/')[4];
  

    let obj = {};
    obj["host"]= patito
    obj["pathname"] = ckuak
    let subObj = {}
    if (queryString) {
  
      let arr = queryString.split('&');
      
      for (var i = 0; i < arr.length; i++) {

        
        let a = arr[i].split('=');
        
        let key = a[0];
        let value = a[1]
        let array = []
        
        subObj[key] = value

        array.push(key)
        array.push(value)
      }
    }
    let array0 =[]
    array0.push(subObj)
    obj["parametros"] = subObj
    return obj;
  }

console.log(getAllUrlParams(url))