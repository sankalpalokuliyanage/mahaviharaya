document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        // Close menu
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      } else {
        // Open menu
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // 2. Navbar Scroll Effects
  const header = document.getElementById('header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('shadow-lg', 'bg-white/95', 'py-2');
        header.classList.remove('bg-white/80', 'py-5');
      } else {
        header.classList.remove('shadow-lg', 'bg-white/95', 'py-2');
        header.classList.add('bg-white/80', 'py-5');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
  }

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Animates only once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }

  // 4. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform simple validation
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Show loader on the button
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner mr-2"></span> Sending...';

      // Simulate API call and show success modal
      setTimeout(() => {
        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Reset form
        contactForm.reset();

        // Create and show success modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300';
        modal.innerHTML = `
          <div class="bg-white rounded-2xl border-2 border-[#D4AF37] max-w-md w-full p-8 text-center shadow-2xl transform scale-95 transition-transform duration-300 relative overflow-hidden">
            <!-- Decorative corner highlights -->
            <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]"></div>
            <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]"></div>
            <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]"></div>
            <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]"></div>
            
            <div class="w-16 h-16 bg-[#6B1E1E]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/55">
              <svg class="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h3 class="text-2xl font-bold text-[#6B1E1E] mb-2 font-serif">Message Sent Successfully</h3>
            <p class="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
              Thank you for contacting Korea Sri Lanka Maha Viharaya.<br>We will get back to you soon.
            </p>
            
            <button id="close-modal-btn" class="w-full bg-[#6B1E1E] text-white hover:bg-[#D4AF37] hover:text-[#6B1E1E] font-medium py-3 px-6 rounded-xl transition duration-300 shadow-md">
              Okay
            </button>
          </div>
        `;
        
        document.body.appendChild(modal);
        document.body.classList.add('overflow-hidden');

        // Close modal listener
        const closeModal = () => {
          modal.classList.add('opacity-0');
          modal.querySelector('.transform').classList.add('scale-95');
          setTimeout(() => {
            modal.remove();
            document.body.classList.remove('overflow-hidden');
          }, 300);
        };

        document.getElementById('close-modal-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });
      }, 1500);
    });
  }

  // 5. Image Error Fallback Handler
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      // If the image fails to load, replace it with a container representing a fallback
      const parent = this.parentNode;
      if (parent) {
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = (this.className || '') + ' img-fallback flex flex-col items-center justify-center text-[#D4AF37] p-6 text-center';
        fallbackDiv.style.aspectRatio = this.naturalWidth ? (this.naturalWidth / this.naturalHeight) : '16/9';
        fallbackDiv.style.minHeight = '200px';
        
        const altText = this.alt || 'Korea Sri Lanka Maha Viharaya';
        fallbackDiv.innerHTML = `
          <svg class="w-12 h-12 mb-2 text-[#D4AF37]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span class="text-sm font-medium opacity-90">${altText}</span>
        `;
        
        parent.replaceChild(fallbackDiv, this);
      }
    });
  });

  // 6. Language Switcher (EN / KO)
  const setLanguage = (lang) => {
    localStorage.setItem('selectedLanguage', lang);
    
    // Update selectors
    const selectors = document.querySelectorAll('.lang-select');
    selectors.forEach(sel => {
      sel.value = lang;
    });

    if (lang === 'ko') {
      document.querySelectorAll('.lang-en').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.lang-ko').forEach(el => el.classList.remove('hidden'));
      document.documentElement.lang = 'ko';
    } else {
      document.querySelectorAll('.lang-en').forEach(el => el.classList.remove('hidden'));
      document.querySelectorAll('.lang-ko').forEach(el => el.classList.add('hidden'));
      document.documentElement.lang = 'en';
    }
  };

  const savedLang = localStorage.getItem('selectedLanguage') || 'en';
  setLanguage(savedLang);

  document.querySelectorAll('.lang-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  });

  // 7. Lightbox Gallery
  const galleries = document.querySelectorAll('[data-gallery-id]');
  if (galleries.length > 0) {
    let lightbox, lightboxImage, lightboxClose, lightboxPrev, lightboxNext, lightboxCaption;
    let currentGalleryItems = [];
    let currentIndex = 0;

    const createLightbox = () => {
      if (document.getElementById('lightbox')) return;

      lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300';
      
      lightbox.innerHTML = `
        <div class="relative max-w-4xl max-h-full w-full h-auto">
          <img id="lightbox-image" class="w-full h-auto object-contain max-h-[85vh] rounded-lg shadow-2xl">
          <div id="lightbox-caption" class="text-center text-white text-sm mt-2 font-light"></div>
          <button id="lightbox-close" class="absolute -top-2 -right-2 sm:top-0 sm:right-0 m-4 text-white bg-black/50 rounded-full p-2 hover:bg-white hover:text-black transition-all duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <button id="lightbox-prev" class="absolute top-1/2 left-0 -translate-y-1/2 m-4 text-white bg-black/50 rounded-full p-2 hover:bg-white hover:text-black transition-all duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button id="lightbox-next" class="absolute top-1/2 right-0 -translate-y-1/2 m-4 text-white bg-black/50 rounded-full p-2 hover:bg-white hover:text-black transition-all duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      `;
      
      document.body.appendChild(lightbox);
      document.body.classList.add('overflow-hidden');

      lightboxImage = document.getElementById('lightbox-image');
      lightboxCaption = document.getElementById('lightbox-caption');
      lightboxClose = document.getElementById('lightbox-close');
      lightboxPrev = document.getElementById('lightbox-prev');
      lightboxNext = document.getElementById('lightbox-next');

      lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
      lightboxClose.addEventListener('click', closeLightbox);
      lightboxPrev.addEventListener('click', showPrevImage);
      lightboxNext.addEventListener('click', showNextImage);
    };

    const openLightbox = (gallery, index) => {
      currentGalleryItems = Array.from(gallery.querySelectorAll('[data-gallery-item]'));
      currentIndex = index;
      
      if (!lightbox || !document.body.contains(lightbox)) {
        createLightbox();
      }

      lightbox.classList.remove('opacity-0');
      updateLightboxImage();
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.classList.add('opacity-0');
      setTimeout(() => {
        if (lightbox && document.body.contains(lightbox)) {
          document.body.removeChild(lightbox);
          lightbox = null;
        }
        document.body.classList.remove('overflow-hidden');
      }, 300);
    };

    const updateLightboxImage = () => {
      if (!lightbox) return;
      const item = currentGalleryItems[currentIndex];
      lightboxImage.src = item.src;
      lightboxCaption.textContent = item.alt || '';
    };

    const showPrevImage = () => {
      currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
      updateLightboxImage();
    };

    const showNextImage = () => {
      currentIndex = (currentIndex + 1) % currentGalleryItems.length;
      updateLightboxImage();
    };

    galleries.forEach(gallery => {
      const items = gallery.querySelectorAll('[data-gallery-item]');
      items.forEach((item, index) => {
        item.parentElement.addEventListener('click', (e) => {
          e.preventDefault();
          openLightbox(gallery, index);
        });
      });
    });

    document.addEventListener('keydown', e => {
      if (!lightbox || !document.body.contains(lightbox)) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    });
  }
});
