document.addEventListener('DOMContentLoaded', function() {
    const antibotPassed = sessionStorage.getItem('antibotPassed');
    
    if (antibotPassed !== 'true' && !window.location.pathname.includes('antibot')) {
        window.location.href = '/antibot';
        return;
    }
    
    const sections = document.querySelectorAll('.section-content');
  const navLinks = document.querySelectorAll('.rw-nav a');

  function showSection(sectionId) {
    sections.forEach(section => {
      section.style.display = 'none';
    });
    
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId || 
                (sectionId === '#hero' && link.getAttribute('href') === '/')) {
                link.classList.add('active');
            }
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '/') {
                showSection('#hero');
                window.history.pushState({}, '', '/');
                return;
            }
            
            window.location.href = href;
        });
    });
    
    function handleInitialNavigation() {
        const hash = window.location.hash;
        if (hash && hash !== '#hero') {
            showSection(hash);
            setTimeout(() => {
                const targetSection = document.querySelector(hash);
    if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
    }
            }, 100);
        } else {
            showSection('#hero');
            if (window.location.hash === '#hero') {
                window.history.replaceState({}, '', '/');
    }
  }
    }
    
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        if (hash && hash !== '#hero') {
            showSection(hash);
        } else {
            showSection('#hero');
            window.history.replaceState({}, '', '/');
        }
    });
    
    handleInitialNavigation();
    
  const serverIP = '212.21.15.122:10000';

  function updateServerStatus() {
    const serverCard = document.querySelector('.rw-server-card');
    if (!serverCard) return;

    fetch(`https://api.mcsrvstat.us/3/${serverIP}`)
      .then(res => res.json())
      .then(data => {
        if (!data.online) {
          serverCard.innerHTML = `
            <div class="rw-server-icon">★</div>
            <div class="rw-server-info">
              <div class="rw-server-title">НАШ СЕРВЕР</div>
              <div class="rw-server-status">ОФФЛАЙН</div>
            </div>
            <div class="rw-server-ip">${serverIP}</div>
          `;
          return;
        }
        
        serverCard.innerHTML = `
          <div class="rw-server-icon">★</div>
          <div class="rw-server-info">
            <div class="rw-server-title">НАШ СЕРВЕР</div>
            <div class="rw-server-status">ОНЛАЙН: ${data.players.online} / ${data.players.max}</div>
          </div>
          <div class="rw-server-ip">${serverIP}</div>
        `;
      })
      .catch(() => {
        serverCard.innerHTML = `
          <div class="rw-server-icon">★</div>
          <div class="rw-server-info">
            <div class="rw-server-title">НАШ СЕРВЕР</div>
            <div class="rw-server-status">Ошибка загрузки</div>
          </div>
          <div class="rw-server-ip">${serverIP}</div>
        `;
      });
  }

  updateServerStatus();
  setInterval(updateServerStatus, 30000);
}); 