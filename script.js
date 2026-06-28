/* ============================
   Portfolio JavaScript
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const backToTop = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const heroContent = document.querySelector('.hero-content');
  const scrollProgress = document.getElementById('scrollProgress');
  const cursorFollower = document.getElementById('cursorFollower');
  const projectSearch = document.getElementById('projectSearch');
  const projectModal = document.getElementById('projectModal');
  const commandTrigger = document.getElementById('commandTrigger');
  const commandPalette = document.getElementById('commandPalette');
  const commandInput = document.getElementById('commandInput');
  const commandResults = document.getElementById('commandResults');
  const printResume = document.getElementById('printResume');

  let currentFilter = 'all';

  // ---- Theme Toggle ----
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (themeIcon) themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // ---- Navbar, Scroll Progress, Back To Top ----
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    navbar?.classList.toggle('scrolled', scrollY > 50);
    backToTop?.classList.toggle('visible', scrollY > 500);
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;

    if (heroContent && !prefersReducedMotion) {
      const fadeProgress = Math.min(scrollY / (window.innerHeight * 0.72), 1);
      heroContent.style.opacity = String(1 - fadeProgress);
      heroContent.style.transform = `translateY(${-scrollY * 0.08}px)`;
    }
  }, { passive: true });

  // ---- Cursor Follower ----
  if (cursorFollower && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      cursorFollower.classList.add('active');
      cursorFollower.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    document.querySelectorAll('a, button, input, textarea, .project-card').forEach((item) => {
      item.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
      item.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
    });
  }

  // ---- Mobile Navigation ----
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('open');
  });

  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('open');
    });
  });

  // ---- Active Nav Link Highlighting ----
  const sections = document.querySelectorAll('.hero, .section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        allNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => sectionObserver.observe(section));

  // ---- Scroll Reveal ----
  const animatedElements = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-profile-photo, .currently-learning, .fun-facts, ' +
    '.about-description, .highlight-card, .info-card, .timeline-item, .skill-category, ' +
    '.project-toolbar, .project-card, .tech-marquee, .certificate-card, ' +
    '.testimonial-card, .contact-item, .contact-form'
  );

  animatedElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${Math.min((index % 6) * 55, 275)}ms`;
  });

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('scroll-past');
        if (!entry.target.classList.contains('reveal-settled')) {
          window.setTimeout(() => {
            entry.target.style.transitionDelay = '0ms';
            entry.target.classList.add('reveal-settled');
          }, 900);
        }
      } else {
        entry.target.classList.remove('visible');
        entry.target.classList.toggle('scroll-past', entry.boundingClientRect.top < 0);
      }
    });
  }, {
    root: null,
    rootMargin: '-8% 0px -12% 0px',
    threshold: [0, 0.12, 0.35]
  });

  animatedElements.forEach(el => fadeObserver.observe(el));

  // ---- Progress Bars ----
  observeFill('.gpa-fill', 'data-gpa');
  observeFill('.skill-bar-fill', 'data-percent');

  function observeFill(selector, attribute) {
    const fills = document.querySelectorAll(selector);
    const fillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.style.width = `${target.getAttribute(attribute)}%`;
          fillObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    fills.forEach(fill => fillObserver.observe(fill));
  }

  // ---- Project Filtering and Search ----
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      applyProjectVisibility();
    });
  });

  projectSearch?.addEventListener('input', applyProjectVisibility);

  function applyProjectVisibility() {
    const query = (projectSearch?.value || '').trim().toLowerCase();

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const text = card.textContent.toLowerCase();
      const matchesFilter = currentFilter === 'all' || category === currentFilter;
      const matchesSearch = !query || text.includes(query);

      card.classList.toggle('hidden', !matchesFilter);
      card.classList.toggle('search-hidden', !matchesSearch);
    });
  }

  // ---- Project Tilt ----
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    projectCards.forEach(card => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -5;
        const rotateY = ((x / rect.width) - 0.5) * 5;
        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ---- Project Modals ----
  document.querySelectorAll('.project-read-more, .architecture-btn').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.project-card');
      if (card) openProjectModal(card);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(item => {
    item.addEventListener('click', closeProjectModal);
  });

  function openProjectModal(card) {
    if (!projectModal) return;

    const title = card.querySelector('.project-title')?.textContent || 'Project';
    const subtitle = card.querySelector('.project-subtitle')?.textContent || '';
    const description = card.querySelector('.project-desc')?.textContent || '';
    const image = card.querySelector('.project-thumbnail img');
    const tech = [...card.querySelectorAll('.project-tech span')].map(item => item.textContent);
    const links = [...card.querySelectorAll('.project-links a')];

    setText('modalTitle', title);
    setText('modalCategory', `${card.getAttribute('data-category') || 'Project'} / ${subtitle}`);
    setText('modalDescription', description);
    setText('modalProblem', card.dataset.problem);
    setText('modalSolution', card.dataset.solution);
    setText('modalArchitecture', card.dataset.architecture);
    setText('modalFeatures', card.dataset.features);
    setText('modalPerformance', card.dataset.performance);
    setText('modalFuture', card.dataset.future);

    const modalImage = document.getElementById('modalImage');
    if (modalImage && image) {
      modalImage.src = image.getAttribute('src');
      modalImage.alt = image.getAttribute('alt') || `${title} preview`;
    }

    const modalTech = document.getElementById('modalTech');
    if (modalTech) {
      modalTech.innerHTML = tech.map(item => `<span>${escapeHtml(item)}</span>`).join('');
    }

    const modalActions = document.getElementById('modalActions');
    if (modalActions) {
      modalActions.innerHTML = links.map(link => {
        const label = link.title || link.getAttribute('aria-label') || 'Open Link';
        const icon = link.querySelector('i')?.className || 'fas fa-arrow-up-right-from-square';
        return `<a class="btn btn-sm btn-outline" href="${link.href}" target="_blank" rel="noopener noreferrer"><i class="${icon}"></i> ${escapeHtml(label)}</a>`;
      }).join('');
    }

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setText(id, value = '') {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  // ---- Command Palette ----
  const commandItems = [
    ...[...document.querySelectorAll('.hero, .section')].map(section => ({
      title: section.querySelector('.section-title')?.textContent?.replace(/\s+/g, ' ').trim() || 'Home',
      meta: 'Section',
      icon: section.id === 'hero' ? 'fas fa-house' : 'fas fa-layer-group',
      href: `#${section.id}`
    })),
    ...[...projectCards].map(card => ({
      title: card.querySelector('.project-title')?.textContent || 'Project',
      meta: card.querySelector('.project-subtitle')?.textContent || 'Project',
      icon: 'fas fa-folder-open',
      href: '#projects',
      action: () => openProjectModal(card)
    }))
  ];

  commandTrigger?.addEventListener('click', openCommandPalette);
  document.querySelectorAll('[data-close-command]').forEach(item => {
    item.addEventListener('click', closeCommandPalette);
  });
  commandInput?.addEventListener('input', renderCommandResults);

  window.addEventListener('keydown', (event) => {
    const isCommandShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
    if (isCommandShortcut) {
      event.preventDefault();
      openCommandPalette();
    }
    if (event.key === 'Escape') {
      closeProjectModal();
      closeCommandPalette();
    }
  });

  function openCommandPalette() {
    if (!commandPalette) return;
    commandPalette.classList.add('open');
    commandPalette.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderCommandResults();
    window.setTimeout(() => commandInput?.focus(), 20);
  }

  function closeCommandPalette() {
    if (!commandPalette) return;
    commandPalette.classList.remove('open');
    commandPalette.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (commandInput) commandInput.value = '';
  }

  function renderCommandResults() {
    if (!commandResults) return;
    const query = (commandInput?.value || '').trim().toLowerCase();
    const results = commandItems
      .filter(item => !query || `${item.title} ${item.meta}`.toLowerCase().includes(query))
      .slice(0, 9);

    commandResults.innerHTML = results.map((item, index) => `
      <button class="command-result ${index === 0 ? 'active' : ''}" type="button" data-command-index="${commandItems.indexOf(item)}">
        <i class="${item.icon}"></i>
        <div>${escapeHtml(item.title)}<span>${escapeHtml(item.meta)}</span></div>
      </button>
    `).join('');

    commandResults.querySelectorAll('.command-result').forEach(button => {
      button.addEventListener('click', () => {
        const item = commandItems[Number(button.dataset.commandIndex)];
        closeCommandPalette();
        if (item.action) {
          item.action();
        } else {
          document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ---- Toast Notifications ----
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${escapeHtml(message)}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ---- Contact Form ----
  contactForm?.addEventListener('submit', (event) => {
    const formAction = contactForm.getAttribute('action') || '';

    if (!formAction || formAction.includes('YOUR_FORMSPREE_ID')) {
      event.preventDefault();
      const name = document.getElementById('formName')?.value.trim();
      const email = document.getElementById('formEmail')?.value.trim();
      const subject = document.getElementById('formSubject')?.value.trim();
      const message = document.getElementById('formMessage')?.value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all fields.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        showToast("Message ready. Configure Formspree to send it live.", 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      }, 900);
    }
  });

  // ---- Resume Actions ----
  printResume?.addEventListener('click', () => {
    const resumeWindow = window.open('Hammad_Asher_Resume.pdf', '_blank', 'noopener,noreferrer');
    if (resumeWindow) {
      showToast('Resume opened in a new tab for printing.', 'success');
    } else {
      showToast('Please allow popups to print the resume.', 'error');
    }
  });

  document.getElementById('downloadResume')?.addEventListener('click', () => {
    showToast('Resume download started.', 'success');
  });

  // ---- Footer Date ----
  const currentYear = document.getElementById('currentYear');
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  const lastUpdated = document.getElementById('lastUpdated');
  if (lastUpdated) {
    lastUpdated.textContent = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Skill Badge Stagger ----
  document.querySelectorAll('.skill-category').forEach(category => {
    const badges = category.querySelectorAll('.skill-badge');
    const badgeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          badges.forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(10px)';
            setTimeout(() => {
              badge.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              badge.style.opacity = '1';
              badge.style.transform = 'translateY(0)';
            }, index * 45);
          });
          badgeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    badgeObserver.observe(category);
  });

  // ---- Time-Aware Greeting and Typing ----
  const greeting = document.getElementById('heroGreeting');
  if (greeting) {
    const hour = new Date().getHours();
    let timeGreeting = 'Hello';
    if (hour >= 5 && hour < 12) timeGreeting = 'Good Morning';
    else if (hour >= 12 && hour < 17) timeGreeting = 'Good Afternoon';
    else if (hour >= 17 && hour < 21) timeGreeting = 'Good Evening';

    greeting.innerHTML = `<span class="greeting-wave">Hi</span> ${timeGreeting}, I'm`;
  }

  const roles = [
    'AI Engineer',
    'Machine Learning Engineer',
    'Software Engineer',
    'Python Developer',
    'Full Stack Developer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedRoleElement = document.getElementById('typedRole');

  function typeRole() {
    if (!typedRoleElement) return;

    const currentRole = roles[roleIndex];
    typedRoleElement.textContent = currentRole.substring(0, charIndex + (isDeleting ? -1 : 1));
    charIndex += isDeleting ? -1 : 1;

    let speed = isDeleting ? 46 : 88;
    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 420;
    }

    setTimeout(typeRole, speed);
  }

  setTimeout(typeRole, 800);
});
