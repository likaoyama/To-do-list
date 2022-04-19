const token = localStorage.getItem('token'); // token salvo no localStorage

// promessa que irá trazer as informações do nome e sobrenome do usuário e será inserido na classe user-name
fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", {
    headers: {
        "Content-Type": "application/json",
        authorization: token
    }
})
.then((response) => response.json())
.then((user) => {
    const element = document.querySelector(".user-name");
    element.innerHTML = `${user.firstName} ${user.lastName}`
});


// Caso o usuário clique no botão de finalizar sessão, os dados do jwt que estavam salvos no localStorage serão apagados e o usuário será redirecionado para a tela de login
let finalize = document.querySelector("#closeApp");
finalize.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "index.html";
});

// Obter lista de tarefas utilizando a chamada da API que se encontra no utils.js, passando apenas os parâmetros
const listaTarefas = window.callApi ('/tasks', 'GET', '', token);

listaTarefas
// Caso tenha obtido a lista de tarefas
.then((lista) => {
    // Remove o id skeleton
    let selectSkeleton = document.getElementById("skeleton");
    selectSkeleton.remove()
    
    // Obter minha lista => <ul class="tarefas-pendentes"></ul>
    let tarefasPendentes = document.querySelector(".tarefas-pendentes");
    // Obter minha lista => <ul class="tarefas-terminadas"></ul>
    let tarefasTerminadas = document.querySelector(".tarefas-terminadas")

    // Pra cada tarefa da minha lista, executar o loop
    lista.forEach(item => {
        console.log(item);        
        // 1 - Criar um elemento <li>
        let lista = document.createElement("li");
        // 2 - Atribuir a classe .tarefa ao elemento <li>
        lista.classList.add("tarefa");
        lista.id = item.id;
        // Verificar se a tarefa (item) não está concluída
        if(!item.completed){
            lista.innerHTML = `
                <div class="not-done"></div>
                <div class="descricao">
                    <p class="nome">${item.description}</p>
                    <p class="timestamp">${item.createdAt}</p>
                </div>
            `  
            tarefasPendentes.appendChild(lista); // adiciona as tarefas pendentes à lista
        } else { // se estiver concluída, adiciona à lista de tarefas terminadas
            lista.innerHTML = `
                <div class="descricao">
                    <p class="nome">${item.description}</p>
                    <p class="timestamp">${item.createdAt}</p>
                </div>
            `
            tarefasTerminadas.appendChild(lista);
        }
    })
})

//Form Nova Tarefa: Ao enviar uma nova tarefa, deve realizar um post para API (/tasks)
const formNovaTarefa = document.querySelector(".nova-tarefa");
formNovaTarefa.addEventListener("submit", function (event) { // ao ouvir o evento de submit de uma nova tarefa
    event.preventDefault();
    let descricao = document.querySelector("#novaTarefa");
    let tarefa = {
        description: descricao.value,
        completed: false
    }
    const promise = window.callApi('/tasks', 'POST', tarefa, token);
    promise
        .then(function (response) {
            console.log(response);
            descricao.value = "";
            let tarefasPendentes = document.querySelector(".tarefas-pendentes");
            // 1 - Criar um elemento <li>
            let lista = document.createElement("li");
            // 2 - Atribuir a classe .tarefa ao elemento <li>
            lista.classList.add("tarefa");
            lista.id = response.id;
    
            // Verificar se a tarefa (item) não está concluída
            lista.innerHTML = `
                <div class="not-done"></div>
                <div class="descricao">
                    <p class="nome">${response.description}</p>
                    <p class="timestamp">${response.createdAt}</p>
                </div>
            `
              
            tarefasPendentes.prepend(lista);
                
        })
        .catch(function (error) {
            console.log(error);
        })
})

//Quando uma tarefa for completada, deve realizar um put para API (tasks/ID_DA_TASK) alterando a chave completed para true

// Selecionar elemento <div class="not-done"></div>
let terminada = document.querySelectorAll(".not-done");

// Ao clicar no item .not-done, a chave completed (que será chamado de acordo com o ID) receberá o valor true e a tarefa será acrescentada à lista de tarefas terminadas
terminada.addEventListener("click", function () {
    let id = this.parentElement.id;
    let tarefa = {
        completed: true
    }
    const promise = window.callApi(`/tasks/${id}`, 'PUT', tarefa, token);
    promise
        .then(function (response) {
            console.log(response);
            this.parentElement.remove();
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
            `
              
            tarefasTerminadas.prepend(lista);
                
        })
        .catch(function (error) {
            console.log(error);
        })
})
// Ela vai pegar o status daquela tarefa e mudar para completed: true
// Depois adicionar <li> em tarefas terminadas