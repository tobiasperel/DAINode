import PizzaServices from "./src/services/pizzas-sevices.js"

let srv = new PizzaServices();

let todasLasPizzas= await srv.getAll();
console.log(todasLasPizzas)

let pizzaEspecifica= await srv.getById(1);
console.log(pizzaEspecifica)

let pizzaEspecifica= await srv.getById(1);
console.log(pizzaEspecifica)

process.exit()