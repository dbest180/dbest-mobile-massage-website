// assets/js/main.js - Updated with better error handling
class DBestMobileMassage {
    constructor() {
        this.modules = new Map();
        this.init();
    }

    init() {
        this.setupErrorHandling();
        this.setupMobileNavigation();
        this.setupSmoothScrolling();
        this.setupFormValidation();
        this.setupAccessibility();
        this.initializeModules();
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Site error:', e.error);
            // Could send to analytics service in production
        });
    }

    initializeModules() {
        // Auto-initialize modules based on page
        const pageModules = {
            'services': 'DBestServices',
            'pricing': 'DBestPricing',
            'about': 'DBestAbout',
            'faq': 'DBestFAQ',
            'contact': 'DBestForms'
        };

        const currentPage = this.getCurrentPage();
        if (pageModules[currentPage] && window[pageModules[currentPage]]) {
            try {
                this.modules.set(currentPage, new window[pageModules[currentPage]]());
            } catch (error) {
                console.warn(`Could not initialize ${pageModules[currentPage]}:`, error);
            }
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('services')) return 'services';
        if (path.includes('pricing')) return 'pricing';
        if (path.includes('about')) return 'about';
        if (path.includes('faq')) return 'faq';
        if (path.includes('contact')) return 'contact';
        return 'home';
    }

    // ... rest of your existing main.js code ...
}
