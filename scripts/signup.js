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

let form = selectId("formCreate");

let error = document.querySelector("ul");
let errorList = selectId("errorMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  error.innerHTML = "";

  let firstName = selectId("firstName");
  let email = selectId("email");
  let password = selectId("password");

  // Verificar inputs vazios e retornar mensagem de erro.
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

  //Verificar se os campos de senha e confirmação de senha são iguais
  if (password.value !== passwordCheck.value) {
    errorMessage("As senhas devem ser idênticas");
  }

  //Verificar se há mensagens de erro na lista e ocultar errorList.
  if (error.querySelectorAll("li").length > 0) {
    errorList.hidden = "";
  }

  //Comunicar com a API
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
      // Verificar se há jwt, armazenar no localStorage e redirecionar usuário para a tela de tarefas
      if(data.jwt){ 

        notie.alert({
          type: "success", 
          text: "Usuário cadastrado com sucesso!",
          position: "top" 
        })
        localStorage.setItem('token', data.jwt);        
        window.location.href = "tarefas.html";
        // Se não houver o jwt, o usuário receberá um alerta com erro.
      } else { 
        notie.alert({
          type: "error", 
          text: "Erro ao realizar cadastro, verifique os campos e tente novamente!",
          position: "top" 
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
