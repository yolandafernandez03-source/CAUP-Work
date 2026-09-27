/**
 * JAVASCRIPT VANILLA // PORTFOLIO EDITORIAL
 * Yolanda F. V. — Comunicación Audiovisual
 * Funcionalidad: Menú accesible, reproductor audiovisual, filtros dinámicos y validación de formulario
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. AÑO ACTUAL EN EL COPYRIGHT
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. MENÚ DE NAVEGACIÓN MÓVIL ACCESIBLE
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-active', !isExpanded);
    };

    navToggle.addEventListener('click', () => toggleMenu());

    // Cerrar al pulsar un enlace de navegación
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(true));
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
        toggleMenu(true);
        navToggle.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. REPRODUCTOR AUDIOVISUAL MINIMALISTA
  // --------------------------------------------------------------------------
  const videoPlayBtn = document.getElementById('video-play-btn');
  const videoStatusText = document.getElementById('video-status-text');

  if (videoPlayBtn) {
    let isPlaying = false;

    videoPlayBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;

      const icon = videoPlayBtn.querySelector('.video-play-icon');
      const text = videoPlayBtn.querySelector('.video-play-text');

      if (isPlaying) {
        if (icon) icon.textContent = '❚❚';
        if (text) text.textContent = 'PAUSE';
        if (videoStatusText) videoStatusText.textContent = 'REPRODUCIENDO // MUESTRA AUDIOVISUAL';
        videoPlayBtn.setAttribute('aria-label', 'Pausar muestra audiovisual');
      } else {
        if (icon) icon.textContent = '▶';
        if (text) text.textContent = 'PLAY';
        if (videoStatusText) videoStatusText.textContent = 'PAUSA // HAZ CLIC PARA REPRODUCIR';
        videoPlayBtn.setAttribute('aria-label', 'Reproducir muestra audiovisual');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. FILTROS DE PROYECTOS (EN proyectos.html)
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn-clean');
  const projectItems = document.querySelectorAll('.project-item[data-category]');

  if (filterButtons.length > 0 && projectItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-filter');

        projectItems.forEach((item) => {
          const itemCategory = item.getAttribute('data-category');
          if (selectedCategory === 'all' || itemCategory === selectedCategory) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. ANIMACIONES SUAVES AL SCROLL (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 6. VALIDACIÓN ACCESIBLE DEL FORMULARIO DE CONTACTO
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('nombre');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('mensaje');

      let isValid = true;
      let errorMessage = '';

      // Validación Nombre
      if (!nameInput || nameInput.value.trim().length < 2) {
        isValid = false;
        errorMessage = 'Por favor, introduce tu nombre o productora.';
        if (nameInput) {
          nameInput.setAttribute('aria-invalid', 'true');
          nameInput.focus();
        }
      } else if (nameInput) {
        nameInput.setAttribute('aria-invalid', 'false');
      }

      // Validación Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (isValid && (!emailInput || !emailRegex.test(emailInput.value.trim()))) {
        isValid = false;
        errorMessage = 'Por favor, introduce un correo electrónico válido.';
        if (emailInput) {
          emailInput.setAttribute('aria-invalid', 'true');
          emailInput.focus();
        }
      } else if (emailInput) {
        emailInput.setAttribute('aria-invalid', 'false');
      }

      // Validación Mensaje
      if (isValid && (!messageInput || messageInput.value.trim().length < 5)) {
        isValid = false;
        errorMessage = 'Por favor, escribe un mensaje con tu propuesta o consulta.';
        if (messageInput) {
          messageInput.setAttribute('aria-invalid', 'true');
          messageInput.focus();
        }
      } else if (messageInput) {
        messageInput.setAttribute('aria-invalid', 'false');
      }

      if (isValid) {
        formStatus.className = 'form-status-box success';
        formStatus.textContent = '✓ Mensaje enviado correctamente. Te responderé lo antes posible.';
        formStatus.style.display = 'block';
        contactForm.reset();
      } else {
        formStatus.className = 'form-status-box error';
        formStatus.textContent = `⚠ ${errorMessage}`;
        formStatus.style.display = 'block';
      }
    });
  }

});
