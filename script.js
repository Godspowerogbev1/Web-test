// ============================================
// THEME TOGGLE - LIGHT/DARK MODE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';

// Apply saved theme on load
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateThemeIcon('light');
} else {
    body.classList.remove('light-mode');
    updateThemeIcon('dark');
}

// Theme toggle handler
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        const theme = isLight ? 'light' : 'dark';
        
        // Save preference
        localStorage.setItem('theme', theme);
        
        // Update icon
        updateThemeIcon(theme);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = theme === 'light' ? '☀️' : '🌙';
    }
}

// ============================================
// FORMSPREE CONFIGURATION
// ============================================
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // Replace with actual Formspree ID

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks) {
        menuToggle?.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ============================================
// CONTACT FORM - FORMSPREE INTEGRATION
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitText = document.getElementById('submitText');
        const loadingText = document.getElementById('loadingText');
        const formMessage = document.getElementById('formMessage');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Validation
        if (FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
            formMessage.textContent = '⚠️ Form not configured yet. Please contact support.';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
            formMessage.style.display = 'block';
            return;
        }
        
        // Show loading state
        submitText.style.display = 'none';
        loadingText.style.display = 'inline';
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success message
                formMessage.textContent = '✓ Message sent successfully! We\'ll get back to you within 24 hours.';
                formMessage.classList.add('success');
                formMessage.classList.remove('error');
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form error:', error);
            formMessage.textContent = '✗ Something went wrong. Please try again or contact us directly.';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
            formMessage.style.display = 'block';
        } finally {
            // Restore button state
            submitText.style.display = 'inline';
            loadingText.style.display = 'none';
            submitButton.disabled = false;
        }
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navLinks?.classList.contains('active')) {
                menuToggle?.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// ============================================
// SCROLL ANIMATIONS - Fade in elements
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll(
    '.featured-card, .service-card, .portfolio-card, .process-step, .pricing-card, .faq-item, .contact-item'
).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================
const heroContent = document.querySelector('.hero-content');
const heroVisual = document.querySelector('.hero-visual');

if (heroContent) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const parallaxSpeed = 0.3;
        
        if (scrollPosition < 1000) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
            }
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrollPosition * parallaxSpeed * 0.5}px)`;
            }
        }
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    
    if (scrollTop > 50) {
        header.style.boxShadow = '0 4px 30px rgba(100, 181, 246, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
const navElements = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navElements.forEach(link => {
        link.style.color = 'var(--text-tertiary)';
        if (link.getAttribute('href').includes('#' + current)) {
            link.style.color = 'var(--accent-light)';
        }
    });
});

// ============================================
// PORTFOLIO CARD HOVER EFFECT
// ============================================
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        portfolioCards.forEach(otherCard => {
            if (otherCard !== this) {
                otherCard.style.opacity = '0.6';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        portfolioCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// ============================================
// SERVICE CARD HOVER EFFECT
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        serviceCards.forEach(otherCard => {
            if (otherCard !== this) {
                otherCard.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        serviceCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// ============================================
// FEATURED CARD HOVER EFFECT
// ============================================
const featuredCards = document.querySelectorAll('.featured-card');

featuredCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        featuredCards.forEach(otherCard => {
            if (otherCard !== this) {
                otherCard.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        featuredCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// ============================================
// BUTTON CLICK ANIMATION
// ============================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mousedown', function(e) {
        if (this.tagName !== 'BUTTON' || this.type !== 'submit') {
            this.style.transform = 'scale(0.95)';
        }
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ============================================
// FORM INPUT FOCUS EFFECTS
// ============================================
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.opacity = '1';
    });
});

// ============================================
// DEBOUNCE UTILITY
// ============================================
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

// ============================================
// LOG INITIALIZATION
// ============================================
console.log('🚀 Site loaded successfully!');
console.log('🎨 Theme:', savedTheme);
if (FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
    console.warn('⚠️ Formspree ID not configured. Contact form will not work.');
    console.log('📋 Set up Formspree at https://formspree.io and update the FORMSPREE_ID constant.');
} else {
    console.log('✓ Formspree configured');
}

// ============================================
// PREFETCH PAGES FOR FASTER NAVIGATION
// ============================================
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        const links = document.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link.href;
            document.head.appendChild(prefetchLink);
        });
    });
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ DOM loaded');
});
