# TRABALHO 04 - DESIGN PATTERNS

Este repositório é destinado para o desenvolvimento do 4º trabalho da matéria de Linguagens de Programas e Paradigmas.
O objeitvo deste trabalho é desenvolver dois sistemas simples aplicando padrões de design ou Design Patterns.

# PADRÃO SINGLETON

O Padrão Singleton garante que uma classe tenha apenas uma instância e oferece um ponto global de acesso a essa instância. Este padrão foi usado na classe UserManager para gerenciar o registro de usuários e garantir que apenas uma instância do gerenciador de usuários seja criada, independentemente de quantas vezes o código seja executado ou quantos formulários sejam submetidos.

1. Como foi implementado
A classe UserManager contém uma propriedade estática instance que armazena a única instância da classe. No construtor da classe, verificamos se essa instância já foi criada (if (UserManager.instance)). Se já existir, o UserManager simplesmente retorna essa instância. Caso contrário, ele cria uma nova instância e a armazena na propriedade instance.

class UserManager {
    static instance = null;

    constructor() {
        if (UserManager.instance) {
            return UserManager.instance;
        }
        UserManager.instance = this;
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    addUser(user) {
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    getUsers() {
        return this.users;
    }
}

O código cria a instância da classe UserManager com const userManager = new UserManager();. A partir deste ponto, em qualquer lugar do código, userManager sempre apontará para a mesma instância.

2. Vantagem
Com isso, garantimos que a aplicação utilize sempre a mesma instância do UserManager durante toda a execução do sistema, sem criar múltiplos objetos desnecessários, o que é essencial para o gerenciamento de dados de usuários de forma centralizada e consistente.


# PADRÃO OBSERVER 

O Padrão Observer permite que objetos (observadores) se inscrevam para receber notificações sobre eventos ou mudanças em outro objeto (o sujeito). Neste código, o padrão Observer foi implementado de forma mais simples, onde a interface de usuário (UI) age como um "observador", atualizando automaticamente a lista de usuários sempre que um novo usuário é cadastrado.

1. Como foi implementado
A interface do usuário, representada pela lista de usuários (userList), é a parte que observa os dados de UserManager. Quando um novo usuário é adicionado, a lista de usuários é atualizada, refletindo imediatamente as mudanças no sistema.

function renderUserList() {
    userList.innerHTML = '';
    const users = userManager.getUsers();

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.username} (Idade: ${user.age}, Cadastrado em: ${user.createdAt})`;
        userList.appendChild(li);
    });
}

A classe UserManager é o "sujeito" que mantém a lista de usuários e gerencia os dados. Ela notifica os "observadores" (a UI) sempre que há uma mudança na lista de usuários, como quando um novo usuário é adicionado. Toda vez que o método addUser é chamado, o estado da lista de usuários é alterado. Para garantir que a UI refleta essa mudança, a função renderUserList é chamada, o que faz com que a lista de usuários seja atualizada na página.

userManager.addUser({ username, age, createdAt });
renderUserList();

Sempre que um usuário é adicionado via o formulário de cadastro, a função renderUserList é chamada para atualizar a lista de usuários na interface do usuário. Essa abordagem simula o comportamento de um "observador", onde a interface reage automaticamente às mudanças de estado no UserManager.

2. Vantagem
O padrão Observer facilita a manutenção da UI sincronizada com os dados do sistema. Qualquer alteração na lista de usuários (como a adição de um novo usuário) é automaticamente refletida na interface, sem a necessidade de recarregar a página ou manualmente modificar a DOM após cada alteração. Isso torna o sistema mais dinâmico e reativo.

# COMO EXECUTAR O PROGRAMA

- O programa é executado em um navegador web e não requer instalação de software adicional.
- Abra o arquivo index.html em um navegador.
- No campo “Nome do usuário”, insira um nome para cadastrar e no campo "Idades do usuário" a idade que será salva.
- Clique no botão “Cadastrar” para salvar as informações e realizar o cadastro.

# AUTORES

O projeot foi desenvolvido pelos alunos Gustavo Herdt: @gustavoherdt10 e Gustavo Verdi: @GustavoVerdi