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
const listaTarefas = await window.callApi('/tasks', 'GET', '', token);

// Remove o id skeleton
let selectSkeleton = document.getElementById("skeleton");
selectSkeleton.remove()

// Obter minha lista => <ul class="tarefas-pendentes"></ul>
let tarefasPendentes = document.querySelector(".tarefas-pendentes");
// Obter minha lista => <ul class="tarefas-terminadas"></ul>
let tarefasTerminadas = document.querySelector(".tarefas-terminadas")

// Pra cada tarefa da minha lista, executar o loop
listaTarefas.forEach(item => {
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
        // adiciona as tarefas pendentes à lista
        tarefasPendentes.appendChild(lista);
        // se estiver concluída, adiciona à lista de tarefas terminadas
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



//Form Nova Tarefa: Ao enviar uma nova tarefa, deve realizar um post para API (/tasks)
const formNovaTarefa = document.querySelector(".nova-tarefa");
// ao ouvir o evento de submit de uma nova tarefa
formNovaTarefa.addEventListener("submit", function (event) {

    event.preventDefault();
    let descricao = document.querySelector("#novaTarefa");
    let span = document.querySelector("span");
    if(descricao.value === ""){
        span.innerHTML = "Tarefa não pode estar vazia";
    } else {
    let tarefa = {
        description: descricao.value,
        completed: false
    }
    const promise = window.callApi('/tasks', 'POST', tarefa, token);
    promise
        .then(function (response) {
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

            let botaoConcluir = lista.querySelector('.not-done')
            botaoConcluir.addEventListener("click", concluirTarefa);

        })
        .catch(function (error) {
            console.log(error);
        })
    }
})

// Selecionar elemento <div class="not-done"></div>
let terminadas = document.querySelectorAll(".not-done");

const concluirTarefa = function() {
    let divTarefa = this.parentElement;
    let id = divTarefa.id;

    let tarefa = {
        completed: true
    }

    const promise = window.callApi(`/tasks/${id}`, 'PUT', tarefa, token);
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
            `
            tarefasTerminadas.prepend(lista);

        })
        .catch(function (error) {
            console.log(error);
        })
}

terminadas.forEach((item) => {
    item.addEventListener("click", concluirTarefa)
})