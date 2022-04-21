//endereço principal da API
window.enderecoApi = 'https://ctd-todo-api.herokuapp.com/v1';

//Pegar os valor dos elementos pelo id
window.getValue = (id) => {
    return document.getElementById(id).value;
}

// Chamar a API
window.callApi = (caminho, metodo, dados, jwt) => {
    return (
        fetch(window.enderecoApi + caminho, {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
                authorization: jwt
            },
            // Verificar se há corpo na requisição
            body: dados ? JSON.stringify(dados) : null

        })
        .then(res => window.obterJson(res))
        .catch((err) => notie.alert(err))
    )
}

// Verificar se houve retorno do status HTTP
window.obterJson = (resposta) => {
    if(!resposta.ok) {
        const err = new Error(`HTTP: ${resposta.status}`);
        err.response = resposta;
        err.status = resposta.status;

        throw err;
    }

    return resposta.json()
}