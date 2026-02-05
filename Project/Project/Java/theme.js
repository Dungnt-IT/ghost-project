const themeBtn = document.getElementById('theme-btn');
      const htmlElement = document.documentElement;
      const savedTheme = localStorage.getItem('theme') || 'dark';

      htmlElement.setAttribute('data-bs-theme', savedTheme);
      updateThemeButton(savedTheme);

      themeBtn && themeBtn.addEventListener('click', () => {
        const current = htmlElement.getAttribute('data-bs-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-bs-theme', next);
        localStorage.setItem('theme', next);
        updateThemeButton(next);
      });

      function updateThemeButton(theme) {
        const html = theme === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
        if (themeBtn) themeBtn.innerHTML = html;
      }