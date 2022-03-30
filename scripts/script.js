function selectId(id) {
    return document.getElementById(id);
}

function empty(input) {
    return input.value.trim() === "";
}

function errorMessage(message) {
    error.innerHTML += "<li>" + message + "</li>";
}

let form = selectId('formCreate');

let error = document.querySelector('ul');
let errorList = selectId('errorMessage');

form.addEventListener('submit', function(event) {
    let name = selectId('name');
    error.innerHTML = '';

    if(empty(name)) {
       errorMessage("Campo <b>nome</b> não preenchido");
    }

    if(empty(nickname)) {
        errorMessage("Campo <b>apelido</b> não preenchido");
    }

    if(empty(email)) {
        errorMessage("Campo <b>email</b> não preenchido");
    }

    if(empty(password)) {
        errorMessage("Campo <b>senha</b> não preenchido");
    }

    if(empty(passwordCheck)) {
        errorMessage("Campo <b>repetir senha</b> não preenchido");
    }

    if(password.value !== passwordCheck.value) {
        errorMessage("As senhas devem ser idênticas");
    }

    if(error.querySelectorAll('li').length > 0) {
        event.preventDefault();
        errorList.hidden = '';
    }

})