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

const userManager = new UserManager();

const userForm = document.getElementById('userForm');
const usernameInput = document.getElementById('username');
const ageInput = document.getElementById('age');
const userList = document.getElementById('userList');

function renderUserList() {
  userList.innerHTML = '';

  const users = userManager.getUsers();
  
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.username} (Idade: ${user.age}, Cadastrado em: ${user.createdAt})`;
    userList.appendChild(li);
  });
}

window.addEventListener('load', renderUserList);

userForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const age = ageInput.value.trim();
  const createdAt = new Date().toLocaleString(); 

  if (!username || !age) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, preencha todos os campos.'
    });
    return;
  }

  userManager.addUser({ username, age, createdAt });

  renderUserList();

  Swal.fire({
    icon: 'success',
    title: 'Usuário Cadastrado!',
    text: `O usuário ${username} foi cadastrado com sucesso.`
  });

  usernameInput.value = '';
  ageInput.value = '';
});
