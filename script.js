/* ============================================================
   NOMA — Apartment Hotel
   script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Header: transparent → white on scroll ─── */
  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();


  /* ─── Mobile nav toggle ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    mobileNav.style.display = isOpen ? 'flex' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      setTimeout(() => { mobileNav.style.display = 'none'; }, 300);
      document.body.style.overflow = '';
    });
  });


  /* ─── Scroll reveal ─── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -48px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─── FAQ accordion ─── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = question.classList.contains('active');

      // Close all
      faqItems.forEach(i => {
        i.querySelector('.faq-question').classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked (if not already open)
      if (!isActive) {
        question.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });


  /* ─── Language switcher ─── */
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });


  /* ─── Gallery lightbox (minimal) ─── */
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Create lightbox overlay
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(28,25,22,0.95);
    z-index: 9999;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
  `;
  const lbImg = document.createElement('img');
  lbImg.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 6px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
  `;
  const lbClose = document.createElement('button');
  lbClose.innerHTML = '✕';
  lbClose.style.cssText = `
    position: absolute;
    top: 24px;
    right: 32px;
    color: rgba(255,255,255,0.7);
    font-size: 22px;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
    font-family: sans-serif;
  `;
  lbClose.addEventListener('mouseenter', () => lbClose.style.color = '#fff');
  lbClose.addEventListener('mouseleave', () => lbClose.style.color = 'rgba(255,255,255,0.7)');
  lightbox.appendChild(lbImg);
  lightbox.appendChild(lbClose);
  document.body.appendChild(lightbox);

  function openLightbox(src) {
    lbImg.src = src;
    lightbox.style.display = 'flex';
    requestAnimationFrame(() => {
      lightbox.style.opacity = '1';
    });
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      openLightbox(img.src);
    });
  });
  lightbox.addEventListener('click', closeLightbox);
  lbClose.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });


  /* ─── Smooth parallax on hero image (subtle) ─── */
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      if (scrolled < vh) {
        heroImage.style.transform = `translateY(${scrolled * 0.25}px)`;
      }
    }, { passive: true });
  }


  /* ─── CTA form (demo behavior) ─── */
  const ctaBtn = document.querySelector('.btn-cta-primary');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      const original = ctaBtn.innerHTML;
      ctaBtn.innerHTML = '✓ &nbsp; Redirecting to booking...';
      ctaBtn.style.background = '#059669';
      setTimeout(() => {
        ctaBtn.innerHTML = original;
        ctaBtn.style.background = '';
      }, 2000);
    });
  }

}); // end DOMContentLoaded
