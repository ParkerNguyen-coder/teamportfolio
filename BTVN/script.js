// ===== MAIN JAVASCRIPT FILE =====

// DOM Elements
const preloader = document.getElementById('preloader');
const loadingText = document.getElementById('loadingText');
const mainContent = document.getElementById('mainContent');
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        loadingText.style.opacity = '0';
        
        setTimeout(() => {
            preloader.classList.add('hidden');
            mainContent.style.opacity = '1';
            initializePage();
        }, 500);
    }, 2000);
});

// ===== INITIALIZE PAGE =====
function initializePage() {
    // Initialize all components
    initializeMobileMenu();
    initializeThemeToggle();
    initializeSmoothScroll();
    initializeScrollEffects();
    initializeAnimations();
    initializeForm();
    initializeBackToTop();
    initializeCounters();
    initializeSkillBars();
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
        });
    }, 1000);
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        
        // Animate hamburger icon
        if (isOpen) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            mobileMenuBtn.style.transform = 'rotate(180deg)';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.style.transform = 'rotate(0)';
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.style.transform = 'rotate(0)';
            document.body.style.overflow = '';
        });
    });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Update icon
        themeToggle.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        
        // Add animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        // Update navbar background
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'all';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
        
        // Parallax effect for hero image
        const heroImage = document.querySelector('.image-wrapper');
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        if (heroImage) {
            heroImage.style.transform = `perspective(1000px) rotateY(-10deg) rotateX(5deg) translateY(${rate}px)`;
        }
    });
}

// ===== UPDATE ACTIVE NAV LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navAnchors = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href') === `#${current}`) {
            anchor.classList.add('active');
        }
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes based on element type
                if (element.classList.contains('timeline-item')) {
                    element.classList.add('animate');
                }
                
                if (element.classList.contains('stat-number')) {
                    const target = parseInt(element.getAttribute('data-count'));
                    if (!element.classList.contains('animated')) {
                        animateCounter(element, target);
                        element.classList.add('animated');
                    }
                }
                
                if (element.classList.contains('skill-bar')) {
                    const width = element.getAttribute('data-width');
                    setTimeout(() => {
                        element.style.width = `${width}%`;
                    }, 300);
                }
                
                // Add general animation
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
   // Observe elements
document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
document.querySelectorAll('.stat-card .stat-number').forEach(el => observer.observe(el));
document.querySelectorAll('.skill-bar').forEach(el => observer.observe(el));
document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
document.querySelectorAll('.architecture-card').forEach(el => observer.observe(el));
document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));

    
    // Set initial styles for animation
    document.querySelectorAll('.project-card, .architecture-card, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// ===== COUNTER ANIMATION =====
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const count = +counter.innerText.replace(/,/g, '');
            const increment = target / 200;
            
            if (count < target) {
                counter.innerText = target < 10 ? 
                    (count + increment).toFixed(2) : 
                    Math.ceil(count + increment).toLocaleString();
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target < 10 ? 
                    target.toFixed(2) : 
                    target.toLocaleString();
            }
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                counterObserver.unobserve(counter);
            }
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 20);
}

// ===== SKILL BARS =====
function initializeSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = '0%';
    });
}

// ===== FORM HANDLING =====
function initializeForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.innerHTML;
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// ===== BACK TO TOP =====
function initializeBackToTop() {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== TYPING EFFECT =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    setTimeout(() => typeWriter(heroSubtitle, text, 50), 1000);
}

// ===== 3D CARD EFFECT =====
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.project-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;
        
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

document.addEventListener('mouseout', () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.transform = 'translateY(-10px) rotateX(0) rotateY(0)';
    });
});

// ===== INITIALIZE ON DOM LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity for main content
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 0.5s ease';
    
    // Initialize Intersection Observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all sections for fade-in
    document.querySelectorAll('section').forEach(section => {
        fadeObserver.observe(section);
        section.classList.add('fade-observed');
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimize scroll events
window.addEventListener('scroll', debounce(updateActiveNavLink, 10));

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.message);
});

// ===== PERFORMANCE METRICS =====
window.addEventListener('load', () => {
    // Log performance metrics
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ===== PROGRESSIVE ENHANCEMENT =====
// Check for modern features

if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    console.warn('IntersectionObserver not supported');
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = `${width}%`;
    });
    // Hiển thị tất cả các phần tử bị ẩn do IntersectionObserver
    document.querySelectorAll('.project-card, .architecture-card, .skill-category').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        if (!emailInput.value) return;
        
        // Show loading state
        const originalHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate API call
        setTimeout(() => {
            // Show success
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
            emailInput.value = '';
            
            // Reset after 2 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalHtml;
            }, 2000);
        }, 1000);
    });
}

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const icon = e.currentTarget.querySelector('i');
        icon.style.transform = 'scale(1.2)';
    });
    
    link.addEventListener('mouseleave', (e) => {
        const icon = e.currentTarget.querySelector('i');
        icon.style.transform = 'scale(1)';
    });
});

// Project card click effect
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectCard = e.currentTarget.closest('.project-card');
        
        // Add pulse animation
        projectCard.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            projectCard.style.animation = '';
        }, 500);
        
        // Simulate opening case study
        alert('Case study would open in a new tab. This is a demo.');
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);