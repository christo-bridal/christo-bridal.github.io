/* ============================================
   CHRISTO BRIDAL ACCESSORIES & EVENT PLANNING
   Premium JavaScript Functionality
   ============================================ */

// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Debounce function for performance
const debounce = (func, wait = 20) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ===== DOM LOADED EVENT =====
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

// ===== INITIALIZE APP =====
function initializeApp() {
  // Update year in footer
  updateYear();
  
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize counter animations
  initCounterAnimations();
  
  // Initialize portfolio filters
  initPortfolioFilters();
  
  // Initialize testimonial carousel
  initTestimonialCarousel();
  
  // Initialize scroll to top button
  initScrollToTop();
  
  // Initialize active navigation
  initActiveNav();
}

// ===== UPDATE YEAR =====
function updateYear() {
  const yearElement = $('#year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
  const header = $('#header');
  let lastScroll = 0;
  
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolled down
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  };
  
  window.addEventListener('scroll', debounce(handleScroll, 10));
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const menuToggle = $('#mobileMenuToggle');
  const navMenu = $('#navMenu');
  const navLinks = $$('.nav-link');
  
  if (!menuToggle || !navMenu) return;
  
  // Toggle menu
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  const links = $$('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip empty anchors
      if (href === '#' || href === '#!') return;
      
      const target = $(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = $('#header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const elements = $$('.service-card, .portfolio-item, .testimonial-card, .feature-item, .about-image, .about-text');
  
  // Options for Intersection Observer
  const options = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        
        // Add stagger effect for grids
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.children);
        const index = siblings.indexOf(entry.target);
        
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 100);
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  // Observe all elements
  elements.forEach(element => {
    observer.observe(element);
  });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
  const counters = $$('.stat-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  // Observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// ===== PORTFOLIO FILTERS =====
function initPortfolioFilters() {
  const filterBtns = $$('.filter-btn');
  const portfolioItems = $$('.portfolio-item');
  
  if (!filterBtns.length || !portfolioItems.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get filter value
      const filter = btn.getAttribute('data-filter');
      
      // Filter items with animation
      portfolioItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        
        // Hide all items first
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.display = 'none';
          }
        }, index * 50);
      });
    });
  });
}

// ===== TESTIMONIAL CAROUSEL =====
function initTestimonialCarousel() {
  const track = $('.testimonial-track');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  
  if (!track || !prevBtn || !nextBtn) return;
  
  const cards = $$('.testimonial-card');
  let currentIndex = 0;
  
  const getCardWidth = () => {
    return cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
  };
  
  const updateCarousel = () => {
    const cardWidth = getCardWidth();
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  };
  
  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
  });
  
  nextBtn.addEventListener('click', () => {
    const maxIndex = cards.length - 2; // Show 2 cards at a time
    currentIndex = Math.min(maxIndex, currentIndex + 1);
    updateCarousel();
  });
  
  // Auto-scroll carousel
  let autoScroll = setInterval(() => {
    const maxIndex = cards.length - 2;
    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateCarousel();
  }, 5000);
  
  // Pause auto-scroll on hover
  track.addEventListener('mouseenter', () => {
    clearInterval(autoScroll);
  });
  
  track.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      const maxIndex = cards.length - 2;
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    }, 5000);
  });
  
  // Handle window resize
  window.addEventListener('resize', debounce(updateCarousel, 100));
  
  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      nextBtn.click();
    }
    
    if (touchEndX - touchStartX > 50) {
      // Swipe right
      prevBtn.click();
    }
  };
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
  const scrollToTopBtn = $('#scrollToTop');
  
  if (!scrollToTopBtn) return;
  
  // Show/hide button based on scroll position
  const handleScroll = () => {
    if (window.pageYOffset > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  };
  
  window.addEventListener('scroll', debounce(handleScroll, 100));
  
  // Scroll to top on click
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== ACTIVE NAVIGATION =====
function initActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  
  const highlightNav = () => {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', debounce(highlightNav, 100));
  highlightNav(); // Call once on load
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  const parallaxElements = $$('.hero, .about-image');
  
  const handleParallax = () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  };
  
  window.addEventListener('scroll', debounce(handleParallax, 10));
}

// ===== LOADING ANIMATION =====
function showLoadingAnimation() {
  // Add entrance animations to hero content
  const heroElements = $$('.hero-text > *');
  
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Call loading animation after DOM is loaded
window.addEventListener('load', showLoadingAnimation);

// ===== FORM VALIDATION (If form is added later) =====
function initFormValidation() {
  const forms = $$('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      
      // Basic validation
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'red';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // Handle form submission
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Show success message
        showNotification('Thank you! We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
      } else {
        showNotification('Please fill in all required fields.', 'error');
      }
    });
  });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
function initLazyLoading() {
  const images = $$('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
  // Add keyboard navigation support
  const focusableElements = $$('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
  
  focusableElements.forEach(element => {
    element.addEventListener('keydown', (e) => {
      // Enter key acts as click
      if (e.key === 'Enter' && element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA') {
        element.click();
      }
    });
  });
  
  // Announce page navigation for screen readers
  const sections = $$('section[id]');
  sections.forEach(section => {
    section.setAttribute('role', 'region');
    
    const heading = section.querySelector('h2');
    if (heading) {
      section.setAttribute('aria-labelledby', heading.id || heading.textContent);
    }
  });
}

// Initialize accessibility features
initAccessibility();

// ===== EASTER EGG - Fun interaction =====
let clickCount = 0;
const logo = $('.logo');

if (logo) {
  logo.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5) {
      logo.style.animation = 'spin 1s ease';
      showNotification('You found the secret! 🎉 Thank you for exploring!', 'success');
      clickCount = 0;
      
      setTimeout(() => {
        logo.style.animation = '';
      }, 1000);
    }
  });
}

// Add spin animation
const spinStyle = document.createElement('style');
spinStyle.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.2); }
    100% { transform: rotate(360deg) scale(1); }
  }
`;
document.head.appendChild(spinStyle);

// ===== CONSOLE MESSAGE =====
console.log('%c🎉 Christo Bridal Accessories & Event Planning', 
  'color: #FFD700; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cCreating Magical Moments ✨', 
  'color: #FDB94E; font-size: 14px; font-style: italic;');
console.log('%cWebsite crafted with love 💛 | Contact: +234 706 4353 245', 
  'color: #6b7280; font-size: 12px;');

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.error);
  // In production, you might want to send this to an error tracking service
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeApp,
    showNotification
  };
}
