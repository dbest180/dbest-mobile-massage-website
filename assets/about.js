// assets/js/about.js
/**
 * About page interactions for DBest Mobile Massage
 * Handles animations, interactive elements, and enhanced user experience
 */

class DBestAbout {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupInteractiveElements();
        this.setupValueAnimations();
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe key elements
        const elementsToAnimate = [
            '.practitioner-grid',
            '.value-card',
            '.benefit-item',
            '.approach-step',
            '.safety-item'
        ];

        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                observer.observe(el);
            });
        });
    }

    animateElement(element) {
        element.classList.add('animate-in');
        
        // Stagger animations for grid items
        if (element.classList.contains('value-card') || 
            element.classList.contains('benefit-item') ||
            element.classList.contains('safety-item')) {
            const index = Array.from(element.parentElement.children).indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        }
    }

    // Interactive elements
    setupInteractiveElements() {
        this.setupQualificationHover();
        this.setupStepInteractions();
    }

    setupQualificationHover() {
        const qualItems = document.querySelectorAll('.qualification-item');
        
        qualItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px)';
                item.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });
    }

    setupStepInteractions() {
        const steps = document.querySelectorAll('.approach-step');
        
        steps.forEach(step => {
            step.addEventListener('click', () => {
                this.highlightStep(step);
            });
            
            // Keyboard accessibility
            step.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.highlightStep(step);
                }
            });
        });
    }

    highlightStep(step) {
        // Remove highlight from all steps
        document.querySelectorAll('.approach-step').forEach(s => {
            s.classList.remove('step-highlighted');
        });
        
        // Add highlight to clicked step
        step.classList.add('step-highlighted');
    }

    // Animated value counters (if we had statistics)
    setupValueAnimations() {
        // Placeholder for future statistics animation
        // Could animate years of experience, clients served, etc.
    }

    // Enhanced image loading
    setupImageLoading() {
        const images = document.querySelectorAll('.practitioner-image img, .approach-image img');
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            // Initial state
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        });
    }

    // Print-friendly version
    setupPrintFunctionality() {
        const printButton = document.createElement('button');
        printButton.textContent = 'Print This Page';
        printButton.className = 'btn btn-secondary print-btn';
        printButton.style.margin = '1rem auto';
        printButton.style.display = 'block';
        
        printButton.addEventListener('click', () => {
            window.print();
        });
        
        // Add print button after the main content
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.appendChild(printButton);
        }
    }
}

// Initialize about page functionality
document.addEventListener('DOMContentLoaded', () => {
    window.dbestAbout = new DBestAbout();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .value-card,
    .benefit-item,
    .safety-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .value-card.animate-in,
    .benefit-item.animate-in,
    .safety-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .practitioner-grid,
    .approach-grid {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.8s ease;
    }
    
    .practitioner-grid.animate-in,
    .approach-grid.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .approach-step {
        transition: all 0.3s ease;
    }
    
    .approach-step.step-highlighted {
        background: var(--light-gray);
        padding: 1.5rem;
        border-radius: 10px;
        border-left: 4px solid var(--teal);
    }
    
    @media print {
        .print-btn { display: none !important; }
        header, footer, .about-cta { display: none !important; }
        .page-hero { background: white !important; color: black !important; }
    }
`;
document.head.appendChild(style);