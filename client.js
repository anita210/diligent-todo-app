const prompt = require("prompt-sync")();

const input = prompt();

switch (input) {
  case "list":
    display(listAllTodos());
    break;

  default:
    break;
}

async function listAllTodos() {
  const respons = await fetch("http://localhost:3000/todos");
  const todos = await respons.json();
  return todos;
}

function display(todos){
  console.log(todos);
}