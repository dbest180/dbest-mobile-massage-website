// assets/js/services.js
/**
 * Services page interactions for DBest Mobile Massage
 * Handles service navigation, smooth scrolling, and interactive elements
 */

class DBestServices {
    constructor() {
        this.currentService = 'swedish';
        this.init();
    }

    init() {
        this.setupServiceNavigation();
        this.setupSmoothScrolling();
        this.setupObserver();
        this.setupInteractiveElements();
    }

    // Service navigation system
    setupServiceNavigation() {
        const navItems = document.querySelectorAll('.service-nav-item');
        const serviceSections = document.querySelectorAll('.service-detail');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const service = item.getAttribute('data-service');
                this.switchService(service, item);
            });
        });

        // Handle direct URL anchors
        const hash = window.location.hash.substring(1);
        if (hash && this.isValidService(hash)) {
            this.switchService(hash);
        }
    }

    switchService(service, clickedItem = null) {
        // Update navigation
        document.querySelectorAll('.service-nav-item').forEach(item => {
            item.classList.remove('active');
        });

        if (clickedItem) {
            clickedItem.classList.add('active');
        } else {
            document.querySelector(`[data-service="${service}"]`).classList.add('active');
        }

        // Update content
        document.querySelectorAll('.service-detail').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(service);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentService = service;

            // Update URL without page jump
            history.replaceState(null, null, `#${service}`);

            // Scroll to top of service section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    isValidService(service) {
        const validServices = ['swedish', 'deep-tissue', 'hot-stones', 'sports'];
        return validServices.includes(service);
    }

    // Smooth scrolling for in-page links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Skip if it's a service navigation link (handled separately)
                if (href.includes('swedish') || href.includes('deep-tissue') || 
                    href.includes('hot-stones') || href.includes('sports')) {
                    return;
                }

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Intersection Observer for scroll-based effects
    setupObserver() {
        const sections = document.querySelectorAll('.service-detail');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px 0px -50px 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Interactive elements
    setupInteractiveElements() {
        // Add loading animation to service images
        this.setupImageLoading();
        
        // Add print service description functionality
        this.setupPrintOptions();
    }

    setupImageLoading() {
        const images = document.querySelectorAll('.service-image img');
        
        images.forEach(img => {
            // Add loading state
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            // Initial state
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        });
    }

    setupPrintOptions() {
        // Could add print-friendly service descriptions
        // This is a placeholder for future enhancement
    }

    // Utility method to get current service info
    getCurrentService() {
        return {
            name: this.currentService,
            element: document.getElementById(this.currentService)
        };
    }

    // Method to recommend service based on user needs
    recommendService(needs) {
        const recommendations = {
            'relaxation': 'swedish',
            'stress-relief': 'swedish',
            'chronic-pain': 'deep-tissue',
            'injury': 'deep-tissue',
            'deep-relaxation': 'hot-stones',
            'athletic': 'sports',
            'performance': 'sports'
        };

        return recommendations[needs] || 'swedish';
    }
}

// Initialize services functionality
document.addEventListener('DOMContentLoaded', () => {
    window.dbestServices = new DBestServices();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DBestServices;
}