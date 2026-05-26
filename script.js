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
  // 5. WHATSAPP BUTTON TOGGLE
  // ──────────────────────────────────────────────
  const whatsappBtn = document.getElementById('whatsappBtn');
  const whatsappOptions = document.getElementById('whatsappOptions');

  if (whatsappBtn && whatsappOptions) {
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

});
