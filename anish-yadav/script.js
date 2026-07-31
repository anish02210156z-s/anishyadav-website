/* ==========================================================================
   ANISH YADAV - OFFICIAL PERSONAL BRAND WEBSITE INTERACTIVITY
   Features: Theme Engine, Preloader, Particles, Typing, Counter, Modals, Forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. PAGE PRELOADER
  // ------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 300);
    });
  }

  // ------------------------------------------------------------------------
  // 2. THEME ENGINE (DARK / LIGHT MODE)
  // ------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        showToast('Switched to Dark Mode', 'success');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        showToast('Switched to Light Mode', 'success');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. CURSOR GLOW EFFECT
  // ------------------------------------------------------------------------
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // ------------------------------------------------------------------------
  // 4. SCROLL PROGRESS & STICKY HEADER
  // ------------------------------------------------------------------------
  const header = document.querySelector('.header');
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  document.body.appendChild(progressBar);

  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;

    if (window.scrollY > 50) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
      if (backToTop) backToTop.classList.add('active');
    } else {
      if (backToTop) backToTop.classList.remove('active');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 5. HAMBURGER MOBILE MENU
  // ------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. TYPING ANIMATION IN HERO
  // ------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const words = [
      'Education',
      'Technology',
      'Artificial Intelligence',
      'Programming',
      'Blogging',
      'Entertainment'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 60 : 120;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // ------------------------------------------------------------------------
  // 7. PARTICLES CANVAS ANIMATION
  // ------------------------------------------------------------------------
  const particleCanvas = document.getElementById('particle-canvas');
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particlesArray = [];

    function resizeCanvas() {
      particleCanvas.width = particleCanvas.parentElement.clientWidth;
      particleCanvas.height = particleCanvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = 'rgba(59, 130, 246, ' + (Math.random() * 0.4 + 0.1) + ')';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.floor((particleCanvas.width * particleCanvas.height) / 12000);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ------------------------------------------------------------------------
  // 8. COUNTER ANIMATION FOR STATISTICS
  // ------------------------------------------------------------------------
  const counters = document.querySelectorAll('.counter');
  let counterAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 200; // Lower is faster
      const inc = target / speed;
      let count = 0;

      const updateCount = () => {
        count += inc;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target + '+';
        }
      };
      updateCount();
    });
  }

  // Trigger counters on scroll into view
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counterAnimated) {
        runCounters();
        counterAnimated = true;
      }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  // ------------------------------------------------------------------------
  // 9. SEARCH POPUP MODAL & FILTER
  // ------------------------------------------------------------------------
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  const siteSearchIndex = [
    { title: 'AI Research & Projects', category: 'Artificial Intelligence', link: 'projects.html' },
    { title: 'Full Stack Web Applications', category: 'Programming', link: 'projects.html' },
    { title: 'Educational Tech & Notes Platform', category: 'Education', link: 'blog.html' },
    { title: 'The Future of AI in Education', category: 'Blog', link: 'blog.html' },
    { title: 'Modern Web Architecture Trends', category: 'Blog', link: 'blog.html' },
    { title: 'About Anish Yadav - Biography & Skills', category: 'About', link: 'about.html' },
    { title: 'Contact & Collaboration', category: 'Contact', link: 'contact.html' }
  ];

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      if (searchInput) searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('active');
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.remove('active');
    });

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (query.length === 0) {
          searchResults.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Type to search across projects, articles, and pages...</p>';
          return;
        }

        const filtered = siteSearchIndex.filter(item =>
          item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
          searchResults.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No matching results found.</p>';
        } else {
          filtered.forEach(item => {
            const div = document.createElement('a');
            div.href = item.link;
            div.className = 'search-result-item';
            div.innerHTML = `
              <div style="font-weight: 600; color: var(--text-main);">${item.title}</div>
              <div style="font-size: 0.8rem; color: var(--secondary);">${item.category}</div>
            `;
            searchResults.appendChild(div);
          });
        }
      });
    }
  }

  // ------------------------------------------------------------------------
  // 10. PROJECT & BLOG FILTERING TABS
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card, .blog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 11. LIGHTBOX MODAL FOR PROJECTS
  // ------------------------------------------------------------------------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');

      if (lightbox && lightboxImg && lightboxTitle) {
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title || 'Project Demo';
        lightbox.classList.add('active');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  // ------------------------------------------------------------------------
  // 12. ACCORDION (FAQ / TIMELINE)
  // ------------------------------------------------------------------------
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      parent.classList.toggle('active');
    });
  });

  // ------------------------------------------------------------------------
  // 13. SKILLS PROGRESS BARS ANIMATION
  // ------------------------------------------------------------------------
  const skillFills = document.querySelectorAll('.progress-bar-fill');
  const skillsSection = document.querySelector('.skills-grid');

  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        skillFills.forEach(fill => {
          const percent = fill.getAttribute('data-percent');
          fill.style.width = percent + '%';
        });
      }
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
  }

  // ------------------------------------------------------------------------
  // 14. FORM VALIDATION & TOAST NOTIFICATIONS
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Sanitized success simulation
      showToast('Thank you! Your message has been sent successfully.', 'success');
      contactForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && validateEmail(emailInput.value.trim())) {
        showToast('Subscribed to Anish Yadav Newsletter!', 'success');
        newsletterForm.reset();
      } else {
        showToast('Please enter a valid email address.', 'error');
      }
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Toast Function
  window.showToast = function(msg, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `
      <i class="fas ${icon}" style="font-size: 1.2rem; color: ${type === 'success' ? '#10B981' : '#EF4444'}"></i>
      <span>${msg}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  // ------------------------------------------------------------------------
  // 15. RIPPLE BUTTON EFFECT
  // ------------------------------------------------------------------------
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ------------------------------------------------------------------------
  // 16. SUPPORT MY JOURNEY (FLOATING HEARTS, COPY PHONE, QR HIGHLIGHT, TABS)
  // ------------------------------------------------------------------------
  const supportTabBtns = document.querySelectorAll('.support-tab-btn');
  const supportTabContents = document.querySelectorAll('.support-tab-content');

  supportTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      supportTabBtns.forEach(b => b.classList.remove('active'));
      supportTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const contentEl = document.getElementById(targetTab);
      if (contentEl) {
        contentEl.classList.add('active');
      }
    });
  });

  const heartsContainer = document.getElementById('floating-hearts-container');
  if (heartsContainer) {
    const heartIcons = ['fa-heart', 'fa-sparkles', 'fa-star', 'fa-coffee'];
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('i');
      const randomIcon = heartIcons[Math.floor(Math.random() * heartIcons.length)];
      heart.className = `fas ${randomIcon} floating-heart`;
      heart.style.left = `${Math.random() * 95}%`;
      heart.style.animationDelay = `${Math.random() * 6}s`;
      heart.style.animationDuration = `${5 + Math.random() * 4}s`;
      heart.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;
      heartsContainer.appendChild(heart);
    }
  }

  // Copy eSewa Phone Number
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  const esewaPhoneNum = document.getElementById('esewa-phone-num');
  if (copyPhoneBtn && esewaPhoneNum) {
    copyPhoneBtn.addEventListener('click', () => {
      const textToCopy = esewaPhoneNum.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied eSewa ID (${textToCopy}) to clipboard!`, 'success');
        copyPhoneBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyPhoneBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
      }).catch(() => {
        showToast('eSewa Number: 9845002168', 'success');
      });
    });
  }

  // Copy Bank Account Number
  const copyBankBtn = document.getElementById('copy-bank-btn');
  const bankAccNum = document.getElementById('bank-acc-num');
  if (copyBankBtn && bankAccNum) {
    copyBankBtn.addEventListener('click', () => {
      const textToCopy = bankAccNum.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied Bank Account (${textToCopy}) to clipboard!`, 'success');
        copyBankBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyBankBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
      }).catch(() => {
        showToast(`Account: ${textToCopy}`, 'success');
      });
    });
  }

  // Support Now Trigger Button (Highlight QR Code)
  const supportTrigger = document.getElementById('support-now-trigger');
  const qrCardFrame = document.getElementById('qr-card-frame');
  if (supportTrigger && qrCardFrame) {
    supportTrigger.addEventListener('click', () => {
      qrCardFrame.scrollIntoView({ behavior: 'smooth', block: 'center' });
      qrCardFrame.classList.add('highlighted');
      showToast('Scan the QR code with your eSewa App to support!', 'success');
      setTimeout(() => {
        qrCardFrame.classList.remove('highlighted');
      }, 3000);
    });
  }
});
