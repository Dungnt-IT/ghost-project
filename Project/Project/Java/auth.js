(function () {
  function get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }

  function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  let authBtnsHTML = '';

  function updateNavbar() {
    const authBtns = document.getElementById('auth-btns');
    const userMenu = document.getElementById('user-menu');
    const usernameDisplay = document.getElementById('username');

    if (!authBtns || !userMenu || !usernameDisplay) return;

    const currentUser = get('currentUser');

    if (currentUser) {
      authBtns.innerHTML = '';
      userMenu.style.display = 'flex';
      usernameDisplay.textContent = currentUser.username || currentUser.email;
    } else {
      authBtns.innerHTML = authBtnsHTML;
      userMenu.style.display = 'none';
      usernameDisplay.textContent = '';
    }
  }

  function logout() {
    localStorage.removeItem('currentUser');
    updateNavbar();
  }

  function handleLogin(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = form.querySelector('#email')?.value.trim();
      const password = form.querySelector('#password')?.value;

      if (!email || !password) {
        alert('Please enter email and password');
        return;
      }

      const users = get('users') || [];
      const user = users.find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        alert('Invalid email or password');
        return;
      }

      set('currentUser', {
        username: user.username,
        email: user.email
      });

      updateNavbar();
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 100);
    });
  }

  function handleRegister(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = form.querySelector('#username')?.value.trim();
      const email = form.querySelector('#email')?.value.trim();
      const password = form.querySelector('#password')?.value;
      const confirm = form.querySelector('#confirm-password')?.value;

      if (!username || !email || !password || !confirm) {
        alert('Please fill all fields');
        return;
      }

      if (password !== confirm) {
        alert('Passwords do not match');
        return;
      }

      const users = get('users') || [];
      if (users.some(u => u.email === email)) {
        alert('Email already exists');
        return;
      }

      users.push({ username, email, password });
      set('users', users);
      alert('Register successful! Please login with your email and password.');
      window.location.href = 'login.html';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const authBtns = document.getElementById('auth-btns');
    if (authBtns) {
      authBtnsHTML = authBtns.innerHTML;
    }

    updateNavbar();

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    if (loginForm) handleLogin(loginForm);
    if (registerForm) handleRegister(registerForm);
  });

  window.authUtils = { updateNavbar, logout };

})();
