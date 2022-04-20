//Pegar os elementos pelo id
function selectId(id) {
  return document.getElementById(id);
}

//Verificar se o input está vazio
function empty(input) {
  return input.value.trim() === "";
}

//Criar uma lista de mensagens de erro
function errorMessage(message) {
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

  //Verificar se inputs estão vazios e retornar mensagem de erro.
  if (empty(email)) {
    errorMessage("Campo <b>email</b> não preenchido");
  }

  if (empty(password)) {
    errorMessage("Campo <b>senha</b> não preenchido");
  }

  if (error.querySelectorAll("li").length > 0) {
    errorList.hidden = "";
  }

  //Comunicar com a API
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
      return response.json();
    })
    .then(function (data) {
      // Verificar se há jwt, armazenar no localStorage e redirecionar usuário para a tela de tarefas
      if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        window.location.href = "tarefas.html";
        // Se não houver o jwt, o usuário receberá um alerta com erro.
      } else {
        throw "Erro ao realizar login, verifique os dados e tente novamente!"
      }
    })
    .catch(function (error) {
      alert(error);
    });
});
