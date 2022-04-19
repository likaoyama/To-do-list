function selectId(id) {
  //função para pegar os elementos pelo id
  return document.getElementById(id);
}

function empty(input) {
  //função para verificar se o input está vazio
  return input.value.trim() === "";
}

function errorMessage(message) {
  //função para criar uma lista de mensagens de erro
  error.innerHTML += "<li>" + message + "</li>";
}

let form = selectId("formLogin");

let error = document.querySelector("ul");
let errorList = selectId("errorMessage");
let email = selectId("email");
let password = selectId("password");


form.addEventListener("submit", function (event) {
  event.preventDefault();
  error.innerHTML = "";

  //Quando o usuário clicar no botão submit ele receberá mensagens de erro caso os inputs estejam vazios.
  if (empty(email)) {
    errorMessage("Campo <b>email</b> não preenchido");
  }

  if (empty(password)) {
    errorMessage("Campo <b>senha</b> não preenchido");
  }

  if (error.querySelectorAll("li").length > 0) {
    errorList.hidden = "";
  }

  //Comunicação com a API
  const user = {
    email: email.value,
    password: password.value,
  };

  console.log(user);

  const promise = fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  promise
    .then(function (response) {
      return response.json(); // Se houver resposta da Promessa, os dados serão salvos em formato JSON.
    })
    .then(function (data) { 
      if(data.jwt){ //Se tiver o jwt, será salvo no localStorage e a página será redirecionada para a tela de tarefas.
          localStorage.setItem('token', data.jwt);
          window.location.href = "tarefas.html";
      } else { // Mensagem de erro caso não haja o jwt que será exibido no alert
          throw "Erro ao realizar login, tente novamente!"
      }
    })
    .catch(function (error) {
      alert(error);
    });
});
