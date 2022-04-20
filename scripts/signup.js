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
  error.innerHTML = "";

  let firstName = selectId("firstName");
  let email = selectId("email");
  let password = selectId("password");

  // Quando o usuário clicar no botão submit ele receberá mensagens de erro caso os inputs estejam vazios.
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

  //Verifica se há mensagens de erro na lista e caso não tenha, esconde o errorList.
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
      // Se houver resposta da Promessa, os dados serão salvos em formato JSON.
      return response.json(); 
    })
    .then(function (data) {
      // Se houver o jwt, o mesmo será armazenado no localStorage e o usuário será redirecionado para a tela de tarefas
      if(data.jwt){ 
        localStorage.setItem('token', data.jwt);
        window.location.href = "tarefas.html"
        // Se não houver o jwt, o usuário receberá um alerta com erro.
      } else { 
        throw "Erro ao criar usuário";
      }
    })
    .catch(function (error) {
      alert(error);
    });
});
