import { getCurrency } from 'currency-map-country';

function ObtenerMoneda(moneda){
    let data = getCurrency (moneda); 
    return data["name"]
}

let moneda = ObtenerMoneda("ARS")
console.log(moneda)