(function () {
  'use strict';

  // ── Header scroll effect ──
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu ──
  var hamburger = document.querySelector('.header__hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileClose = document.querySelector('.mobile-nav__close');
  if (hamburger && mobileNav) {
    var openMenu = function () {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    };
    var closeMenu = function () {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    };
    hamburger.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    mobileNav.addEventListener('click', function (e) {
      if (e.target === mobileNav) closeMenu();
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) closeMenu();
    });
  }

  // ── Gallery lightbox ──
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var galleryItems = document.querySelectorAll('.gallery__item');
  if (lightbox && lightboxImg && galleryItems.length) {
    galleryItems.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    var closeLightbox = function () {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };
    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }

  // ── Scroll-to-top ──
  var scrollBtn = document.querySelector('.scroll-top');
  var progressCircle = scrollBtn ? scrollBtn.querySelector('.scroll-top__circle') : null;
  if (scrollBtn) {
    var totalLength = progressCircle ? progressCircle.getTotalLength() : 0;
    if (progressCircle) {
      progressCircle.style.strokeDasharray = totalLength;
      progressCircle.style.strokeDashoffset = totalLength;
    }
    var updateScroll = function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollBtn.classList.toggle('visible', scrollTop > 400);
      if (progressCircle && docHeight > 0) {
        var progress = scrollTop / docHeight;
        progressCircle.style.strokeDashoffset = totalLength * (1 - progress);
      }
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Scroll animations (fade-up, fade-left, fade-right, scale-in) ──
  var animElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');
  if (animElements.length && 'IntersectionObserver' in window) {
    var animObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay');
          if (delay) {
            entry.target.style.transitionDelay = delay + 'ms';
          }
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    animElements.forEach(function (el) { animObserver.observe(el); });
  }

  // ── Animated counters ──
  var statValues = document.querySelectorAll('.stats__value');
  if (statValues.length && 'IntersectionObserver' in window) {
    var counterDone = false;
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counterDone) {
          counterDone = true;
          statValues.forEach(function (el) {
            var text = el.textContent.trim();
            var match = text.match(/^(\d+)/);
            if (!match) return;
            var target = parseInt(match[1], 10);
            var suffix = text.replace(match[1], '');
            var duration = 1600;
            var start = 0;
            var startTime = null;
            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 3);
              var current = Math.round(eased * target);
              el.textContent = current + suffix;
              if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    var statsSection = document.querySelector('.stats');
    if (statsSection) counterObserver.observe(statsSection);
  }

  // ── Hero slideshow ──
  var slides = document.querySelectorAll('.hero__slide');
  var dots = document.querySelectorAll('.hero__dot');
  if (slides.length > 1) {
    var currentSlide = 0;
    var slideInterval = 5000;
    var slideTimer;

    var heroTyped = document.getElementById('hero-typed');
    var heroTexts = ['les lieux saints', 'La Mecque', 'Médine', 'en toute sérénité', 'avec Al Ihsan Travel'];
    var typeTimer = null;

    function typeText(text, el, cb) {
      var i = 0;
      el.textContent = '';
      function tick() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          typeTimer = setTimeout(tick, 55);
        } else if (cb) {
          typeTimer = setTimeout(cb, 1800);
        }
      }
      tick();
    }

    function eraseText(el, cb) {
      var txt = el.textContent;
      function tick() {
        if (txt.length > 0) {
          txt = txt.slice(0, -1);
          el.textContent = txt;
          typeTimer = setTimeout(tick, 30);
        } else if (cb) {
          cb();
        }
      }
      tick();
    }

    function animateHeroText(index) {
      if (!heroTyped) return;
      var text = heroTexts[index % heroTexts.length];
      eraseText(heroTyped, function () {
        typeText(text, heroTyped);
      });
    }

    function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
      currentSlide = n;
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
      animateHeroText(n);
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    function startSlideTimer() {
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        clearInterval(slideTimer);
        goToSlide(parseInt(this.getAttribute('data-slide'), 10));
        startSlideTimer();
      });
    });

    var heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', function () { clearInterval(slideTimer); });
      heroSection.addEventListener('mouseleave', startSlideTimer);
    }

    startSlideTimer();
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerH = header ? header.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── Contact form (WhatsApp) ──
  var form = document.querySelector('#devis-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nom = form.querySelector('#f-name').value.trim();
      var tel = form.querySelector('#f-tel').value.trim();
      var formule = form.querySelector('#f-formule').value;
      var places = form.querySelector('#f-places').value;
      var msg = form.querySelector('#f-msg').value.trim();

      var text = 'Assalamu alaikum,\n\n';
      text += 'Je souhaite demander un devis.\n\n';
      text += '*Nom :* ' + nom + '\n';
      text += '*Téléphone :* ' + tel + '\n';
      text += '*Formule :* ' + formule + '\n';
      text += '*Nombre de places :* ' + places + '\n';
      if (msg) text += '*Message :* ' + msg + '\n';
      text += '\nMerci !';

      var url = 'https://wa.me/22670138989?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  }

  // ── Active nav link highlighting ──
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.header__nav a');
  if (sections.length && navLinks.length) {
    var highlightNav = function () {
      var scrollY = window.scrollY + 120;
      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
  }
})();
