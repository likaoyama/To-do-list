window.enderecoApi = 'https://ctd-todo-api.herokuapp.com/v1';

window.getValue = (id) => {
    //função para pegar os elementos pelo id
    return document.getElementById(id).value;
}


window.callApi = (caminho, metodo, dados, jwt) => {
    return (
        fetch(window.enderecoApi + caminho, {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
                authorization: jwt   
            },
            body: dados ? JSON.stringify(dados) : null
            
        })
        .then(res => window.obterJson(res))
        .catch((err) => alert(err))
    )
}

window.obterJson = (resposta) => {
    if(!resposta.ok) {
        const err = new Error(`HTTP: ${resposta.status}`);
        err.response = resposta;
        err.status = resposta.status;

        throw err;
    }

    return resposta.json()
}