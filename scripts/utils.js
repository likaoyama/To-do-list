//endereço principal da API
window.enderecoApi = 'https://ctd-todo-api.herokuapp.com/v1';

window.getValue = (id) => {
    //função para pegar os valor dos elementos pelo id
    return document.getElementById(id).value;
}

// função para chamar a API onde serão passados os parâmetros
window.callApi = (caminho, metodo, dados, jwt) => {
    return (
        fetch(window.enderecoApi + caminho, {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
                authorization: jwt
            },
            // se houver corpo na requisição, os dados serão transformados em json, se não houver, eles serão nulos
            body: dados ? JSON.stringify(dados) : null

        })
            .then(res => window.obterJson(res))
            .catch((err) => alert(err))
    )
}

// função para verificar se houve retorno do status HTTP
window.obterJson = (resposta) => {
    if(!resposta.ok) {
        const err = new Error(`HTTP: ${resposta.status}`);
        err.response = resposta;
        err.status = resposta.status;

        throw err;
    }

    return resposta.json()
}