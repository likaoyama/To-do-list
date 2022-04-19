const token = localStorage.getItem('token');


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



let finalize = document.querySelector("#closeApp");
finalize.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "index.html";
});

// Obter lista de tarefas
const listaTarefas = window.callApi ('/tasks', 'GET', '', token);

listaTarefas
// Caso tenha obtido a lista de tarefas
.then((lista) => {
    // Remover o skeleton
    let selectSkeleton = document.getElementById("skeleton");
    selectSkeleton.remove()
    
    // Obter minha lista => <ul class="tarefas-pendentes"></ul>
    let tarefasPendentes = document.querySelector(".tarefas-pendentes");
    let tarefasTerminadas = document.querySelector(".tarefas-terminadas")

    // Pra cada tarefa da minha lista
    // Executar meu loop (forEach ou for of)
    lista.forEach(item => {
        console.log(item);        
        // 1 - Criar um elemento <li>
        let lista = document.createElement("li");
        // 2 - Atribuir a classe .tarefa ao elemento <li> className = "classe" / classList.add("classe")
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
            tarefasPendentes.appendChild(lista);
        } else {
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
formNovaTarefa.addEventListener("submit", function (event) {
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
            // 2 - Atribuir a classe .tarefa ao elemento <li> className = "classe" / classList.add("classe")
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
// notDone.addEventListener("click", function)
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
            // 2 - Atribuir a classe .tarefa ao elemento <li> className = "classe" / classList.add("classe")
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