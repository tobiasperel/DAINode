import PizzaServices from "./src/services/pizzas-sevices.js"

let srv = new PizzaServices();

let todasLasPizzas= await srv.getAll();
console.log(todasLasPizzas)

let pizzaEspecifica= await srv.getById(2);
console.log(pizzaEspecifica)

let rowsAffectedInsert = await srv.insert(pizzaEspecifica)
console.log(rowsAffectedInsert)

let idPizza = 5;
let rowsAffectedUpdate = await srv.update(pizzaEspecifica,idPizza)
console.log(rowsAffectedUpdate)

let rowsAffectedDelete= await srv.deleteById(1);
console.log(rowsAffectedDelete)


process.exit()