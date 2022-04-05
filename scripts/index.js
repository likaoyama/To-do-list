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
  error.innerHTML = "";

  if (empty(email)) {
    errorMessage("Campo <b>email</b> não preenchido");
  }

  if (empty(password)) {
    errorMessage("Campo <b>senha</b> não preenchido");
  }

  if (error.querySelectorAll("li").length > 0) {
    event.preventDefault();
    errorList.hidden = "";
  }

//Verificar
//   let user = {
//     email: email.value,
//     password: password.value,
//   };

//   console.log(user);
//   debugger;

//   fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then(function (response) {
//       console.log(response.json());
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
});
