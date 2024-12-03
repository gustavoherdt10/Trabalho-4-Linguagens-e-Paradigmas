# TRABALHO 04 - DESIGN PATTERNS

Este repositório é destinado para o desenvolvimento do 4º trabalho da matéria de Linguagens de Programas e Paradigmas.
O objeitvo deste trabalho é desenvolver dois sistemas simples aplicando padrões de design ou Design Patterns.
# Padrões de Projeto Implementados
## PADRÃO SINGLETON

Padrão Singleton:

*Objetivo*: Garantir que uma classe tenha apenas uma instância e fornecer um ponto de acesso global a essa instância.
*Implementação*: O padrão Singleton foi aplicado na classe UserManager, que gerencia a lista de usuários cadastrados. Essa classe garante que a lista de usuários seja manipulada de maneira centralizada, mantendo apenas uma instância da classe durante todo o ciclo de vida da aplicação.

*UserManager* foi estruturada de forma que, mesmo quando se criam várias instâncias, sempre se retorna à mesma instância da classe. Isso garante consistência no gerenciamento dos dados dos usuários, evitando que diferentes partes da aplicação criem instâncias separadas e manipulem dados de forma inconsistente.

1. Como foi implementado
A classe UserManager contém uma propriedade estática instance que armazena a única instância da classe. No construtor da classe, verificamos se essa instância já foi criada (if (UserManager.instance)). Se já existir, o UserManager simplesmente retorna essa instância. Caso contrário, ele cria uma nova instância e a armazena na propriedade instance.
```JavaScript
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
        localStorage.setItem('users', JSON.stringify(this.users)); // Salva os usuários no localStorage.
    }

    getUsers() {
        return this.users; 
    }
}
```

```UserManager.instance = null;```: A variável instance é estática e é usada para armazenar a única instância da classe.

```constructor()```: Se a instância já existir (ou seja, UserManager.instance não for null), o construtor simplesmente retorna essa instância. Caso contrário, ele cria a instância e a armazena na variável estática instance.

```addUser(user)``` e ```getUsers()```: São métodos para adicionar usuários e obter a lista de usuários. Isso garante que todos os usuários sejam armazenados na mesma instância da classe.

Benefício do Singleton: Ao usar o Singleton, garantimos que, independentemente de quantas vezes a classe UserManager seja instanciada ao longo do ciclo de vida da aplicação, sempre se utilizará a mesma instância, o que mantém a consistência dos dados dos usuários.

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
