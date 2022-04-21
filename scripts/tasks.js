const token = localStorage.getItem("token");

// Trazer as informações do nome e sobrenome do usuário
fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", {
  headers: {
    "Content-Type": "application/json",
    authorization: token,
  },
})
  .then((response) => response.json())
  .then((user) => {
    const element = document.querySelector(".user-name");
    element.innerHTML = `${user.firstName} ${user.lastName}`;
});

// Finalizar sessão, os dados do jwt que estavam salvos no localStorage serão apagados
// e o usuário será redirecionado para a tela de login
let finalize = document.querySelector("#closeApp");

finalize.addEventListener("click", function () {
  
    localStorage.clear()
    notie.alert({
        type: "info", 
        text: "Sessão encerrada",
        position: "top" 
    })
    window.location.href = "index.html"; 
});

// Obter lista de tarefas utilizando a chamada da API que se encontra no utils.js
const listaTarefas = await window.callApi("/tasks", "GET", "", token);

// Remover o id skeleton
let selectSkeleton = document.getElementById("skeleton");
selectSkeleton.remove();

// Selecionar lista de tarefas pendentes e terminadas
let tarefasPendentes = document.querySelector(".tarefas-pendentes");
let tarefasTerminadas = document.querySelector(".tarefas-terminadas");

listaTarefas.forEach((item) => {
  // 1 - Criar um elemento <li>
  let lista = document.createElement("li");
  
  // 2 - Atribuir a classe .tarefa ao elemento <li>
  lista.classList.add("tarefa");
  lista.id = item.id;
  
  // Verificar se a tarefa (item) não está concluída
  if (!item.completed) {
    lista.innerHTML = `
            <div class="not-done"></div>
            <div class="descricao">
                <p class="nome">${item.description}</p>
                <p class="timestamp">${item.createdAt}</p>
            </div>
        `;
    
    // Adicionar tarefas pendentes à lista
    tarefasPendentes.appendChild(lista);

    // Adicionar à lista de tarefas terminadas
  } else {
    lista.innerHTML = `
            <div class="descricao">
                <p class="nome">${item.description}</p>
                <p class="timestamp">${item.createdAt}</p>
            </div>
        `;
    tarefasTerminadas.appendChild(lista);
  }
});

//Enviar uma nova tarefa
const formNovaTarefa = document.querySelector(".nova-tarefa");

formNovaTarefa.addEventListener("submit", function (event) {
  
  event.preventDefault();
  
  let descricao = document.querySelector("#novaTarefa");
  let span = document.querySelector("span");
  
  if (descricao.value === "") {
    span.innerHTML = "Tarefa não pode estar vazia";
  } else {
    let tarefa = {
      description: descricao.value,
      completed: false,
    };
    const promise = window.callApi("/tasks", "POST", tarefa, token);
    promise
      .then(function (response) {
        descricao.value = "";
        let tarefasPendentes = document.querySelector(".tarefas-pendentes");
        
        // 1 - Criar um elemento <li>
        let lista = document.createElement("li");
        
        // 2 - Atribuir a classe .tarefa ao elemento <li>
        lista.classList.add("tarefa");
        lista.id = response.id;
        (span.innerHTML = ""),
          
        // Verificar se a tarefa (item) não está concluída
        (lista.innerHTML = `
            <div class="not-done"></div>
            <div class="descricao">
                <p class="nome">${response.description}</p>
                <p class="timestamp">${response.createdAt}</p>
            </div>
        `);

        tarefasPendentes.prepend(lista);
        notie.alert({
            type: "success",
            text: "Tarefa criada com sucesso",
            position: "top",
        });

        let botaoConcluir = lista.querySelector(".not-done");
        botaoConcluir.addEventListener("click", concluirTarefa);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

// Selecionar todos elementos <div class="not-done"></div>
let terminadas = document.querySelectorAll(".not-done");

const concluirTarefa = function () {
  let divTarefa = this.parentElement;
  let id = divTarefa.id;

  let tarefa = {
    completed: true,
  };

  const promise = window.callApi(`/tasks/${id}`, "PUT", tarefa, token);
  promise
    .then(function (response) {
      divTarefa.remove();
      let tarefasTerminadas = document.querySelector(".tarefas-terminadas");
      
      // 1 - Criar um elemento <li>
      let lista = document.createElement("li");
      
      // 2 - Atribuir a classe .tarefa ao elemento <li>
      lista.classList.add("tarefa");
      lista.id = response.id;
      
      // Verificar se a tarefa (item) não está concluída
      lista.innerHTML = `
            <div class="descricao">
                <p class="nome">${response.description}</p>
                <p class="timestamp">${response.createdAt}</p>
            </div>
        `;
      
      //Melhoria a ser feita - colocar confirmação
      notie.alert({
        type: "info",
        text: "Tarefa finalizada",
        position: "top",
      });
      
      tarefasTerminadas.prepend(lista);
    })
    .catch(function (error) {
      console.log(error);
    });
};

terminadas.forEach((item) => {
  item.addEventListener("click", concluirTarefa);
});
