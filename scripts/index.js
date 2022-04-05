let form = document.getElementById('formLogin');
let email = localStorage.getItem('email');
let password = localStorage.getItem('password');

let error = document.querySelector('ul');
let errorList = selectId('errorMessage');

function errorMessage(message) {
    error.innerHTML += "<li>" + message + "</li>";
}

form.addEventListener('submit', function(event) {

    error.innerHTML = '';

    if(email === null) {
        errorMessage("Campo <b>email</b> não preenchido");
    }

    if(password === null) {
        errorMessage("Campo <b>senha</b> não preenchido")
    }


    event.preventDefault();
})

