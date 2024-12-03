# TRABALHO 04 - DESIGN PATTERNS

Este repositório é destinado para o desenvolvimento do 4º trabalho da matéria de Linguagens de Programas e Paradigmas.
O objeitvo deste trabalho é desenvolver dois sistemas simples aplicando padrões de design ou Design Patterns.
# Padrões de Projeto Implementados
## PADRÃO SINGLETON

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

## PADRÃO OBSERVER 

O padrão Observer é usado para que um objeto (o Subject, ou "sujeito") notifique automaticamente outros objetos (os Observers, ou "observadores") quando ocorre uma mudança de estado. No seu código, o Observer foi utilizado para notificar a interface sobre a adição de um novo usuário.

Implementação do Observer:
Embora não seja um Observer tradicional (com uma lista explícita de "observadores"), a funcionalidade de notificação (ao clicar no sino) pode ser vista como uma implementação do padrão Observer, onde a interface "observa" as mudanças no sistema (como a adição de usuários).

Notificação ao adicionar um novo usuário:
```JavaScript
userManager.addUser({ username, age, createdAt });

// Exibindo uma notificação de sucesso
Swal.fire({
    icon: 'success',
    title: 'Usuário Cadastrado!',
    text: `O usuário ${username} foi cadastrado com sucesso.`
});

// Atualizando a lista na interface do usuário
renderUserList();;
}
```
Explicação:
```addUser(user)```: Quando um novo usuário é adicionado, a lista de usuários é atualizada. O método addUser da classe UserManager é chamado para adicionar um novo usuário e salvar os dados no localStorage.

Notificação via ```Swal.fire```: Após adicionar um usuário, o sistema exibe uma notificação (utilizando a biblioteca SweetAlert2). Isso funciona como uma forma de notificar a interface (o "Observer") sobre a mudança de estado no "Subject" (que é a classe UserManager).

```renderUserList()```: O método renderUserList é chamado após o cadastro do usuário para atualizar a interface e exibir a lista atualizada de usuários. Esse é o "Observer" sendo notificado e atualizando a interface.
A classe UserManager é o "sujeito" que mantém a lista de usuários e gerencia os dados. Ela notifica os "observadores" (a UI) sempre que há uma mudança na lista de usuários, como quando um novo usuário é adicionado. Toda vez que o método addUser é chamado, o estado da lista de usuários é alterado. Para garantir que a UI refleta essa mudança, a função renderUserList é chamada, o que faz com que a lista de usuários seja atualizada na página.

Função renderUserList (atualizando a interface):
```JavaScript
function renderUserList() {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Limpa a lista antes de renderizar novamente

    userManager.getUsers().forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.username} (Idade: ${user.age}, Cadastrado em: ${user.createdAt})`;
        userListElement.appendChild(li);
    });
}
```
Explicação:
```renderUserList()```: Esse método é responsável por renderizar a lista de usuários na interface. Ele "observa" as mudanças no estado da lista de usuários (como a adição de um novo usuário) e atualiza a lista na tela.
Interface Atualizada: Após cada adição de usuário, a lista de usuários é renderizada novamente para mostrar a nova informação.


# COMO EXECUTAR O PROGRAMA

- O programa é executado em um navegador web e não requer instalação de software adicional.
- Abra o arquivo index.html em um navegador.
- No campo “Nome do usuário”, insira um nome para cadastrar e no campo "Idades do usuário" a idade que será salva.
- Clique no botão “Cadastrar” para salvar as informações e realizar o cadastro.

# AUTORES

O projeot foi desenvolvido pelos alunos [@GustavoVerdi](https://github.com/GustavoVerdi/) & [@gustavoherdt10](https://github.com/gustavoherdt10/)
