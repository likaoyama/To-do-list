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

let form = selectId("formCreate");

let error = document.querySelector("ul");
let errorList = selectId("errorMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let firstName = selectId("firstName");
  error.innerHTML = "";
  let email = selectId("email");
  let password = selectId("password");

  if (empty(firstName)) {
    errorMessage("Campo <b>nome</b> não preenchido");
  }

  if (empty(lastName)) {
    errorMessage("Campo <b>sobrenome</b> não preenchido");
  }

  if (empty(email)) {
    errorMessage("Campo <b>email</b> não preenchido");
  }

  if (empty(password)) {
    errorMessage("Campo <b>senha</b> não preenchido");
  }

  if (empty(passwordCheck)) {
    errorMessage("Campo <b>repetir senha</b> não preenchido");
  }

  //Verificação se os dados da senha e da confirmação da senha são iguais
  if (password.value !== passwordCheck.value) {
    errorMessage("As senhas devem ser idênticas");
  }

  if (error.querySelectorAll("li").length > 0) {
    errorList.hidden = "";
  }

  //Comunicação com a API
  const user = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };


  const promise = fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
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
      if(data.jwt){
        localStorage.setItem('token', data.jwt);
        window.location.href = "tarefas.html"
      } else {
        throw "Erro ao criar usuário";
      }
    })

    .catch(function (error) {
      alert(error);
    });
});
