/* ============================================
   REDEMPTION INTERNATIONAL SCHOOL — SCRIPT.JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ──────────────────────────────────────────────
  // 1. AUTO-UPDATE FOOTER YEAR
  // ──────────────────────────────────────────────
  const footerYearEl = document.getElementById('footerYear');
  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }

  // ──────────────────────────────────────────────
  // 2. STICKY HEADER ON SCROLL
  // ──────────────────────────────────────────────
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Run once on load

  // ──────────────────────────────────────────────
  // 3. MOBILE MENU TOGGLE
  // ──────────────────────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMenu() {
    menuToggle.classList.add('active');
    navMenu.classList.add('open');
    mobileOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
    mobileOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Allow keyboard activation of the hamburger
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      menuToggle.click();
    }
  });

  mobileOverlay.addEventListener('click', closeMenu);

  // Close mobile menu on nav link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ──────────────────────────────────────────────
  // 4. SMOOTH SCROLL FOR ANCHOR LINKS
  // ──────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerHeight = header.offsetHeight;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // ──────────────────────────────────────────────
  // 5. WHATSAPP BUTTON TOGGLE & SCROLL REVEAL
  // ──────────────────────────────────────────────
  const whatsappFloat = document.getElementById('whatsappFloat');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const whatsappOptions = document.getElementById('whatsappOptions');

  if (whatsappFloat && whatsappBtn && whatsappOptions) {
    whatsappBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappOptions.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      whatsappOptions.classList.remove('show');
    });

    whatsappOptions.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Show WhatsApp button only after scrolling starts
    const handleWhatsappScroll = () => {
      if (window.scrollY > 50) {
        whatsappFloat.classList.add('scrolled');
      } else {
        whatsappFloat.classList.remove('scrolled');
        whatsappOptions.classList.remove('show');
      }
    };

    window.addEventListener('scroll', handleWhatsappScroll, { passive: true });
    handleWhatsappScroll();
  }

  // ──────────────────────────────────────────────
  // 6. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // ──────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = navMenu.querySelectorAll('a');

  function highlightNavOnScroll() {
    // Only run scroll spy if homepage sections are present on this page
    if (!document.getElementById('hero') && !document.getElementById('about')) return;

    const scrollPos = window.scrollY + header.offsetHeight + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && (href === '#' + sectionId || href.endsWith('#' + sectionId))) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ──────────────────────────────────────────────
  // 6. FAQ ACCORDION
  // ──────────────────────────────────────────────
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const headerEl = item.querySelector('.accordion-header');

    headerEl.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all accordion items
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherHeader = otherItem.querySelector('.accordion-header');
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
      });

      // Toggle the clicked item
      if (!isActive) {
        item.classList.add('active');
        headerEl.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard accessibility
    headerEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        headerEl.click();
      }
    });
  });

  // ──────────────────────────────────────────────
  // 7. SCROLL-TO-TOP BUTTON
  // ──────────────────────────────────────────────
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    function toggleScrollTopBtn() {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleScrollTopBtn, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ──────────────────────────────────────────────
  // 8. SCROLL REVEAL ANIMATIONS
  // ──────────────────────────────────────────────
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .stagger-children'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ──────────────────────────────────────────────
  // 9. INFO BOX HOVER TILT (subtle micro-interaction)
  // ──────────────────────────────────────────────
  const infoBoxes = document.querySelectorAll('.info-box');

  infoBoxes.forEach(box => {
    box.addEventListener('mousemove', (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      box.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    box.addEventListener('mouseleave', () => {
      box.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ──────────────────────────────────────────────
  // 10. PRELOADER (optional — fades out after load)
  // ──────────────────────────────────────────────
  // The page body starts visible immediately.
  // If you want a preloader, you can add one and
  // fade it out here after DOMContentLoaded.

  // ──────────────────────────────────────────────
  // 11. WEB3FORMS AJAX SUBMISSION
  // ──────────────────────────────────────────────
  const web3Forms = document.querySelectorAll('.contact-form-v2');

  web3Forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      const action = form.getAttribute('action');
      if (!action || !action.includes('web3forms.com')) return;

      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      const statusBox = form.querySelector('.form-status');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      }

      if (statusBox) {
        statusBox.className = 'form-status';
        statusBox.style.display = 'none';
        statusBox.innerHTML = '';
      }

      const formData = new FormData(form);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok && data.success) {
          if (statusBox) {
            statusBox.className = 'form-status success';
            statusBox.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. Our team will contact you shortly.';
          } else {
            alert('Thank you! Your message has been sent successfully.');
          }
          form.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        if (statusBox) {
          statusBox.className = 'form-status error';
          statusBox.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Oops! Something went wrong while sending your message. Please try again or reach us at <a href="mailto:info@redemptioninternationalschool.com" style="color: inherit; font-weight: 600; text-decoration: underline;">info@redemptioninternationalschool.com</a>.';
        } else {
          alert('Oops! Something went wrong. Please email us directly at info@redemptioninternationalschool.com.');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  });

});
