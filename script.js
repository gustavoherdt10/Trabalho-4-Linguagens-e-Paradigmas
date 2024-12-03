// script.js
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
  const notificationBell = document.getElementById('notificationBell');
  const notificationModal = document.getElementById('notificationModal');
  const notificationsContainer = document.getElementById('notificationsContainer');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  userForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const username = usernameInput.value.trim();
    const age = ageInput.value;
    const createdAt = new Date().toISOString();
  
    if (!username || !age) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, preencha todos os campos.'
      });
      return;
    }
  
    userManager.addUser({ username, age, createdAt });

    notificationBell.classList.add('active');
    notificationBell.classList.add('ring');

    Swal.fire({
      icon: 'success',
      title: 'Usuário Cadastrado!',
      text: `O usuário ${username} foi cadastrado com sucesso.`
    });

    usernameInput.value = '';
    ageInput.value = '';

    function renderUserList() {
      userList.innerHTML = ''; 
  
      userManager.getUsers().forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.username} (Idade: ${user.age}, Cadastrado em: ${user.createdAt})`;
        userList.appendChild(li);
      });
    }
  
    renderUserList();

    setTimeout(() => {
      notificationBell.classList.remove('active');
      notificationBell.classList.remove('ring');
    }, 5000);
  });

  notificationBell.addEventListener('click', () => {
    notificationModal.classList.add('active');
    renderNotifications();
  });

  closeModalBtn.addEventListener('click', () => {
    notificationModal.classList.remove('active');
  });
  
  function renderNotifications() {
    notificationsContainer.innerHTML = ''; 
  
    userManager.getUsers().forEach(user => {
      const notificationItem = document.createElement('div');
      notificationItem.classList.add('notificationItem');
      notificationItem.textContent = `${user.username} (Idade: ${user.age}, Cadastrado em: ${user.createdAt})`;
      notificationsContainer.appendChild(notificationItem);
    });
  }
  