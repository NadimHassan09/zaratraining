/**
 * AI Courses Platform - Main JavaScript
 * HTML, CSS, Bootstrap Version
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ========================================
    // Countdown Timer for Foundation Day Offer
    // ========================================
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    // Set initial time (3 days, 12 hours, 45 minutes, 30 seconds)
    let timeLeft = {
        days: 3,
        hours: 12,
        minutes: 45,
        seconds: 30
    };
    
    function updateCountdown() {
        if (timeLeft.seconds > 0) {
            timeLeft.seconds--;
        } else {
            if (timeLeft.minutes > 0) {
                timeLeft.minutes--;
                timeLeft.seconds = 59;
            } else {
                if (timeLeft.hours > 0) {
                    timeLeft.hours--;
                    timeLeft.minutes = 59;
                    timeLeft.seconds = 59;
                } else {
                    if (timeLeft.days > 0) {
                        timeLeft.days--;
                        timeLeft.hours = 23;
                        timeLeft.minutes = 59;
                        timeLeft.seconds = 59;
                    }
                }
            }
        }
        
        // Update DOM
        if (countdownElements.days) {
            countdownElements.days.textContent = String(timeLeft.days).padStart(2, '0');
        }
        if (countdownElements.hours) {
            countdownElements.hours.textContent = String(timeLeft.hours).padStart(2, '0');
        }
        if (countdownElements.minutes) {
            countdownElements.minutes.textContent = String(timeLeft.minutes).padStart(2, '0');
        }
        if (countdownElements.seconds) {
            countdownElements.seconds.textContent = String(timeLeft.seconds).padStart(2, '0');
        }
    }
    
    // Start countdown
    setInterval(updateCountdown, 1000);
    
    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .accordion-item, .offer-content, .golden-content, .offer-image-wrapper, .golden-image-wrapper'
    );
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
    
    // Add revealed class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // Stagger Animation for Cards
    // ========================================
    const staggerContainers = document.querySelectorAll('.row');
    
    staggerContainers.forEach(container => {
        const cards = container.querySelectorAll('.feature-card, .testimonial-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
        });
    });
    
    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
                
                // Calculate offset for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Parallax Effect for Hero Orbs
    // ========================================
    const orbs = document.querySelectorAll('.gradient-orb');
    
    function handleParallax() {
        const scrolled = window.scrollY;
        
        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Use requestAnimationFrame for smooth parallax
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ========================================
    // Card Hover Effects Enhancement
    // ========================================
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .hero-image-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ========================================
    // Button Click Feedback
    // ========================================
    const buttons = document.querySelectorAll('.btn-primary-custom, .btn-gold');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ========================================
    // Image Lazy Loading
    // ========================================
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // FAQ Accordion Enhancement
    // ========================================
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a subtle animation to the icon
            const icon = this.querySelector('::after');
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ========================================
    // Preloader (Optional)
    // ========================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ========================================
    // Reduced Motion Support
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations
        orbs.forEach(orb => {
            orb.style.animation = 'none';
        });
        
        document.querySelectorAll('.floating-badge, .scroll-indicator').forEach(el => {
            el.style.animation = 'none';
        });
    }
    
    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%cمعهد Zara للتدريب', 'font-size: 24px; font-weight: bold; color: #4f46e5;');
    console.log('%cتعلم مهارات المستقبل مع الذكاء الاصطناعي', 'font-size: 14px; color: #94a3b8;');
});
