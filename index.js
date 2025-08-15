// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
  const animatedElements = document.querySelectorAll('.work-card, .about-card, .contact-item');

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission

      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Submit to Netlify using fetch
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      })
        .then(response => {
          if (response.ok) {
            // Success - hide form and show success message
            this.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';

            // Show notification
            showNotification('Message sent successfully!', 'success');

            // Scroll to top of contact section
            document.getElementById('contact').scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(error => {
          console.error('Form submission error:', error);
          showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        })
        .finally(() => {
          // Reset button state
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    max-width: 400px;
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
  `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 10000);
}

// Add notification styles to CSS
const notificationStyles = `
  .notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }

  .notification-close:hover {
    opacity: 0.8;
  }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});

// Parallax effect for hero section
window.addEventListener('scroll', function () {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image img');

  if (heroImage) {
    // Reduce parallax effect on mobile to prevent overlap issues
    const isMobile = window.innerWidth <= 768;
    const rate = isMobile ? scrolled * -0.2 : scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

// Add loading animation for work cards
document.addEventListener('DOMContentLoaded', function () {
  const workCards = document.querySelectorAll('.work-card');

  workCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});

// Add hover effects for tech tags
document.addEventListener('DOMContentLoaded', function () {
  const techTags = document.querySelectorAll('.tech-tag');

  techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });

    tag.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
  });
});

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
  // Escape key closes mobile menu
  if (e.key === 'Escape') {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  }

  // Tab key navigation improvements
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function () {
  document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyles = `
  .keyboard-navigation *:focus {
    outline: 3px solid #0B5F75 !important;
    outline-offset: 2px !important;
  }
`;

const keyboardStyleSheet = document.createElement('style');
keyboardStyleSheet.textContent = keyboardStyles;
document.head.appendChild(keyboardStyleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(function () {
  // Navbar background change
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }

  // Parallax effect
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image img');

  if (heroImage) {
    // Reduce parallax effect on mobile to prevent overlap issues
    const isMobile = window.innerWidth <= 768;
    const rate = isMobile ? scrolled * -0.2 : scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);


// =================== MOBILE NAV: toggle + close on link ===================
(function () {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const links = menu?.querySelectorAll(".nav-link") || [];

  // Toggle open/close
  toggle?.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggle.classList.toggle("open");
    document.body.classList.toggle("no-scroll", menu.classList.contains("open"));
  });

  // Close the menu when any nav link is clicked
  links.forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle?.classList.remove("open");
      document.body.classList.remove("no-scroll");
    })
  );

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu?.classList.contains("open")) {
      menu.classList.remove("open");
      toggle?.classList.remove("open");
      document.body.classList.remove("no-scroll");
    }
  });
})();

// =================== TRAINER MODAL: open/close + ESC + focus trap ===================
(function () {
  const modal = document.getElementById("trainerModal");
  if (!modal) return;

  const openBtns = document.querySelectorAll("[data-open-trainer]");
  const closeEls = modal.querySelectorAll("[data-close]");
  const backdrop = modal.querySelector(".trainer-backdrop");
  const sheet = modal.querySelector(".trainer-sheet");
  const focusableSel = 'a,button,input,textarea,select,details,[tabindex]:not([tabindex="-1"])';
  let lastFocus = null;

  function getFocusable() {
    return [...modal.querySelectorAll(focusableSel)]
      .filter(el => !el.disabled && el.offsetParent !== null);
  }

  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    document.body.classList.add("no-scroll");
    // focus first thing inside modal (the sheet)
    sheet && sheet.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    lastFocus && lastFocus.focus();
  }

  // Open
  openBtns.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  }));

  // Close buttons (X) and backdrop
  closeEls.forEach(el => el.addEventListener("click", closeModal));
  backdrop?.addEventListener("click", closeModal);

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  // Focus trap
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !modal.classList.contains("is-open")) return;
    const focusables = getFocusable();
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  });
})();