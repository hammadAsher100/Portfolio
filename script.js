/* ============================
   Portfolio JavaScript
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- DOM Elements ----
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const backToTop = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const allNavLinks = document.querySelectorAll('.nav-link');

  // ---- Theme Toggle ----
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // ---- Navbar Scroll Effect ----
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Add/remove scrolled class
    navbar.classList.toggle('scrolled', scrollY > 50);

    // Back to top button
    backToTop.classList.toggle('visible', scrollY > 500);

    lastScroll = scrollY;
  });

  // ---- Hamburger Menu ----
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---- Active Nav Link Highlighting ----
  const sections = document.querySelectorAll('.section');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        allNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ---- Scroll Animations ----
  const animatedElements = document.querySelectorAll(
    '.section-title, .about-description, .highlight-card, .info-card, ' +
    '.timeline-item, .skill-category, .project-card, .certificate-card, ' +
    '.contact-item, .contact-form, .section-subtitle'
  );

  animatedElements.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

  animatedElements.forEach(el => fadeObserver.observe(el));

  // ---- GPA Bar Animation ----
  const gpaFills = document.querySelectorAll('.gpa-fill');
  const gpaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const gpa = target.getAttribute('data-gpa');
        target.style.width = gpa + '%';
        gpaObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  gpaFills.forEach(fill => gpaObserver.observe(fill));

  // ---- Project Filtering ----
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Re-trigger animation
          card.style.animation = 'none';
          card.offsetHeight; // force reflow
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---- Contact Form (Formspree Integration) ----
  contactForm.addEventListener('submit', (e) => {
    // If using Formspree, let the form submit naturally
    // Remove e.preventDefault() when Formspree is configured
    const formAction = contactForm.getAttribute('action');
    
    if (!formAction || formAction.includes('YOUR_FORMSPREE_ID')) {
      // Fallback for demo/testing
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        showFormStatus('Please fill in all fields.', 'error');
        return;
      }

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        showFormStatus('Message sent successfully! I\'ll get back to you soon. 🎉', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      }, 1500);
    }
    // If Formspree is configured, form will submit normally
  });

  function showFormStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 5000);
  }

  // ---- Back to Top ----
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Download Resume ----
  const downloadResumeBtn = document.getElementById('downloadResume');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
      // If href is already set to resume.pdf, let it work naturally
      // This handler is just for additional tracking if needed
      console.log('Resume download initiated');
    });
  }

  // ---- Footer Date ----
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  const lastUpdated = document.getElementById('lastUpdated');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  lastUpdated.textContent = new Date().toLocaleDateString('en-US', options);

  // ---- Smooth scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Staggered animation for skill badges ----
  const skillCategories = document.querySelectorAll('.skill-category');
  skillCategories.forEach(category => {
    const badges = category.querySelectorAll('.skill-badge');
    const badgeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          badges.forEach((badge, i) => {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(10px)';
            setTimeout(() => {
              badge.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              badge.style.opacity = '1';
              badge.style.transform = 'translateY(0)';
            }, i * 50);
          });
          badgeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    badgeObserver.observe(category);
  });

  // ---- Typing effect for hero greeting ----
  const greeting = document.getElementById('heroGreeting');
  const hour = new Date().getHours();
  let timeGreeting = 'Hello';
  if (hour >= 5 && hour < 12) timeGreeting = 'Good Morning';
  else if (hour >= 12 && hour < 17) timeGreeting = 'Good Afternoon';
  else if (hour >= 17 && hour < 21) timeGreeting = 'Good Evening';
  else timeGreeting = 'Hello';

  greeting.innerHTML = `<span class="greeting-wave">👋</span> ${timeGreeting}, I'm`;

  // ---- Typing animation for hero role ----
  const roles = [
    'Software Engineering Student',
    'AI & ML Enthusiast',
    'Full-Stack Developer',
    'Data Science Enthusiast'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedRoleElement = document.getElementById('typedRole');
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 500;
    }

    setTimeout(typeRole, speed);
  }

  // Start typing animation after a short delay
  setTimeout(typeRole, 1000);

  // ---- Skill Bar Animation ----
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const percent = target.getAttribute('data-percent');
        target.style.width = percent + '%';
        skillBarObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillBarObserver.observe(bar));
});
