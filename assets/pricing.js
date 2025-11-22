// assets/js/pricing.js
/**
 * Pricing page interactions for DBest Mobile Massage
 * Handles package comparisons, value calculations, and interactive elements
 */

class DBestPricing {
    constructor() {
        this.init();
    }

    init() {
        this.setupPackageComparisons();
        this.setupValueCalculators();
        this.setupInteractiveElements();
        this.setupBookingLinks();
    }

    // Package comparison functionality
    setupPackageComparisons() {
        const packageCards = document.querySelectorAll('.package-card');
        
        packageCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    this.highlightPackage(card);
                }
            });
            
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.target.closest('a')) {
                    this.highlightPackage(card);
                }
            });
        });
    }

    highlightPackage(packageCard) {
        // Remove highlight from all packages
        document.querySelectorAll('.package-card').forEach(card => {
            card.classList.remove('featured-package');
        });
        
        // Add highlight to selected package
        packageCard.classList.add('featured-package');
        
        // Scroll package into view if needed
        packageCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    // Value calculator for package savings
    setupValueCalculators() {
        this.calculatePackageSavings();
        this.setupSessionCalculator();
    }

    calculatePackageSavings() {
        const packages = {
            'wellness': {
                sessions: 3,
                duration: 60,
                individualPrice: 100,
                packagePrice: 270
            },
            'premium': {
                sessions: 5,
                duration: 90,
                individualPrice: 140,
                packagePrice: 520
            },
            'monthly': {
                sessions: 3,
                duration: 60,
                individualPrice: 100,
                packagePrice: 285
            }
        };

        // This could be expanded to show dynamic calculations
        // based on user input or current promotions
    }

    setupSessionCalculator() {
        // Placeholder for future session cost calculator
        // Could let users calculate cost based on their needs
    }

    // Interactive elements
    setupInteractiveElements() {
        this.setupHoverEffects();
        this.setupScrollAnimations();
    }

    setupHoverEffects() {
        const pricingCards = document.querySelectorAll('.pricing-card, .addon-card, .package-card');
        
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.3s ease';
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.pricing-section, .guarantee-card, .included-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Enhanced booking links with service pre-selection
    setupBookingLinks() {
        const bookingLinks = document.querySelectorAll('a[href*="contact.html"]');
        
        bookingLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Could add analytics tracking here
                this.trackBookingIntent(link);
            });
        });
    }

    trackBookingIntent(link) {
        const service = link.getAttribute('href').split('=')[1];
        console.log('Booking intent:', service);
        
        // In a real implementation, this would send to analytics
        // gtag('event', 'booking_intent', { service: service });
    }

    // Utility method to format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat