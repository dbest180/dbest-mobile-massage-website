// assets/js/main.js
/**
 * DBest Mobile Massage - Main JavaScript
 * Handles mobile navigation, form validation, and UI interactions
 */

class DBestMobileMassage {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileNavigation();
        this.setupSmoothScrolling();
        this.setupFormValidation();
        this.setupAccessibility();
    }

    // Mobile Navigation Toggle
    setupMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                // Animate hamburger to X
                const spans = hamburger.querySelectorAll('span');
                if (navLinks.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    this.resetHamburger();
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    this.resetHamburger();
                }
            });
        }
    }

    resetHamburger() {
        const spans = document.querySelectorAll('.hamburger span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Form Validation System
    setupFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                    this.showFormMessage(form, 'Please fix the errors above.', 'error');
                }
            });

            // Real-time validation
            form.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('blur', () => {
                    this.validateField(field);
                });
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name') || field.getAttribute('type');
        
        // Clear previous error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, `${this.getFieldLabel(field)} is required.`);
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address.');
                return false;
            }
        }

        // Phone validation (basic)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const digits = value.replace(/\D/g, '');
            if (!phoneRegex.test(digits)) {
                this.showFieldError(field, 'Please enter a valid phone number.');
                return false;
            }
        }

        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    getFieldLabel(field) {
        return field.getAttribute('placeholder') || 
               field.previousElementSibling?.textContent || 
               field.getAttribute('name') || 'This field';
    }

    showFormMessage(form, message, type = 'info') {
        let messageElement = form.querySelector('.form-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = `form-message form-message-${type}`;
            form.prepend(messageElement);
        }
        
        messageElement.textContent = message;
        messageElement.className = `form-message form-message-${type} visible`;
        
        setTimeout(() => {
            messageElement.classList.remove('visible');
        }, 5000);
    }

    // Accessibility enhancements
    setupAccessibility() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Trap focus in mobile menu
        this.setupFocusTrap();
    }

    setupFocusTrap() {
        // Implementation for trapping focus in mobile menu
        // This ensures keyboard users don't get lost when menu is open
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DBestMobileMassage();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DBestMobileMassage;
}
