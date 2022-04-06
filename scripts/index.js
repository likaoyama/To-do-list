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

form.addEventListener("submit", function (event) {
  event.preventDefault();
  error.innerHTML = "";

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
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem('token', data.jwt);
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
