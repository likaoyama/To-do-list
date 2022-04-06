function selectId(id) {
  return document.getElementById(id);
}

function empty(input) {
  return input.value.trim() === "";
}

function errorMessage(message) {
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

//Verificar
  const user = {
    email: email.value,
    password: password.value,
  };

  console.log(user);
  debugger;

  const promise = fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
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
