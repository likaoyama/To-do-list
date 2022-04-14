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
let errorList = getElementbyClassName("errorMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let firstName = selectId("firstName");
  error.innerHTML = "";

  if (empty(firstName)) {
    errorMessage("Campo <b>nome</b> não preenchido");
    error.classList.add(errorMessage)
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

  console.log(user);

  const promise = fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  promise
    .then(function (response) {
      console.log(response.json());
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
