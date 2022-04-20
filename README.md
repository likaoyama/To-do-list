# To Do - Checkpoint II
- Disciplina - Front-end II
- Digital House Brasil
- Integrantes: Lika Oyama, Tamiris R. G. Costa, Roberta da Silva

MVP Checklist:

- Login (index.html)

  - [X] Campos devem ser obrigatórios
  - [X] Obter os dados preenchidos e realizar a chamada (fetch) de login
  - [X] Em caso de sucesso: Salvar o JWT em local ou session storage
  - [X] Em caso de sucesso: Redirecionar para tarefas.html
  - [X] Em caso de erro: Informar (ex. com alert) o usuário que ocorreu um erro

- Signup (signup.html)

  - [X] Campos devem ser obrigatórios
  - [X] Necessário validar igualdade dos campos senha e confirmar senha
  - [X] Obter os dados preenchidos e realizar a chamada (fetch) de cadastro
  - [X] Em caso de sucesso: Salvar o JWT em local ou session storage
  - [X] Em caso de sucesso: Redirecionar para tarefas.html
  - [X] Em caso de erro: Informar (ex. com alert) o usuário que ocorreu um erro

- Tarefas (tarefas.html)

  - [X] Header: Obter dados do usuário para apresentar seu nome completo
  - [X] Header: Botão Finalizar Sessão remove o JWT do storage e redireciona para index.html (quando for clicado)
  - [X] Ao carregar a página, buscar as tarefas (get para /tasks) e exibir na lista
  - [X] Form Nova Tarefa: Ao enviar uma nova tarefa, deve realizar um post para API (/tasks)
  - [X] Quando uma tarefa for adicionada, a lista de tarefas deve ser atualizada
  - [X] Quando uma tarefa for completada, deve realizar um put para API (tasks/ID_DA_TASK) alterando a chave completed para true

Melhorias:

- Identificar campos invalidos com CSS;
- Mensagem de erro na validação do login e cadastro do usuário;
- Mensagem de erro quando o usuário tenta enviar uma nova tarefa com a descrição vazia;

---

Estrutura do projeto

Nosso projeto é baseado em HTML, CSS e JavaScript sem utilização de modulos ou bundlers.

Pastas:

- assets: Contem os arquivos do projeto como imagens, fontes e vetores.
- scripts: Contem os arquivos javascript do projeto. Separados por tela.
- styles: Contém os arquivos css com a estilização das telas.
