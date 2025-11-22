// assets/js/faq.js
/**
 * FAQ page interactions for DBest Mobile Massage
 * Handles search, category navigation, and interactive FAQ elements
 */

class DBestFAQ {
    constructor() {
        this.currentCategory = 'booking';
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.setupCategoryNavigation();
        this.setupSearchFunctionality();
        this.setupFAQInteractions();
        this.setupSmoothScrolling();
        this.setupURLHandling();
    }

    // Category navigation
    setupCategoryNavigation() {
        const categoryLinks = document.querySelectorAll('.faq-category');
        
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const category = link.getAttribute('href').substring(1);
                this.switchCategory(category, link);
            });
        });

        // Handle URL hash on page load
        const hash = window.location.hash.substring(1);
        if (hash && this.isValidCategory(hash)) {
            this.switchCategory(hash);
        }
    }

    switchCategory(category, clickedLink = null) {
        // Update navigation
        document.querySelectorAll('.faq-category').forEach(link => {
            link.classList.remove('active');
        });

        if (clickedLink) {
            clickedLink.classList.add('active');
        } else {
            document.querySelector(`[href="#${category}"]`).classList.add('active');
        }

        // Update content
        document.querySelectorAll('.faq-section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(category);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentCategory = category;

            // Update URL without page jump
            history.replaceState(null, null, `#${category}`);

            // Scroll to top of section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    isValidCategory(category) {
        const validCategories = ['booking', 'preparation', 'session', 'policies', 'general'];
        return validCategories.includes(category);
    }

    // Search functionality
    setupSearchFunctionality() {
        const searchInput = document.getElementById('faq-search');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.trim().toLowerCase();
                this.performSearch();
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
    }

    performSearch() {
        const allFAQItems = document.querySelectorAll('.faq-item');
        let hasResults = false;

        // Remove previous highlights
        this.removeHighlights();

        if (this.searchTerm === '') {
            // Show all items if search is empty
            allFAQItems.forEach(item => {
                item.style.display = 'block';
                const details = item.querySelector('details');
                if (details) details.open = false;
            });
            this.hideNoResults();
            return;
        }

        allFAQItems.forEach(item => {
            const question = item.querySelector('summary').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(this.searchTerm) || answer.includes(this.searchTerm)) {
                item.style.display = 'block';
                hasResults = true;
                
                // Open matching items and highlight text
                const details = item.querySelector('details');
                if (details) details.open = true;
                
                this.highlightText(item, this.searchTerm);
            } else {
                item.style.display = 'none';
            }
        });

        if (hasResults) {
            this.hideNoResults();
        } else {
            this.showNoResults();
        }
    }

    highlightText(element, searchTerm) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const nodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.toLowerCase().includes(searchTerm)) {
                nodes.push(node);
            }
        }

        nodes.forEach(node => {
            const span = document.createElement('span');
            span.className = 'search-highlight';
            span.textContent = node.textContent;
            node.parentNode.replaceChild(span, node);
        });
    }

    removeHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const text = highlight.textContent;
            highlight.parentNode.replaceChild(document.createTextNode(text), highlight);
        });
    }

    showNoResults() {
        let noResults = document.querySelector('.no-results');
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <h3>No results found</h3>
                <p>We couldn't find any questions matching "${this.searchTerm}". Try different keywords or <a href="contact.html">contact us directly</a>.</p>
            `;
            document.querySelector('.faq-grid').appendChild(noResults);
        }
    }

    hideNoResults() {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.remove();
        }
    }

    // FAQ interactions
    setupFAQInteractions() {
        // Auto-close other details when one is opened (optional)
        const allDetails = document.querySelectorAll('.faq-item details');
        
        allDetails.forEach(details => {
            details.addEventListener('toggle', () => {
                if (details.open && this.searchTerm === '') {
                    // You could add logic to close other details here
                    // This is optional as some users prefer multiple open
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Skip if it's a category navigation link (handled separately)
                if (this.classList.contains('faq-category')) {
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

    // Handle URL parameters and deep linking
    setupURLHandling() {
        // Handle direct links to specific questions
        const urlParams = new URLSearchParams(window.location.search);
        const questionId = urlParams.get('question');
        
        if (questionId) {
            const questionElement = document.getElementById(questionId);
            if (questionElement) {
                const details = questionElement.querySelector('details');
                if (details) {
                    details.open = true;
                    questionElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }

    // Utility method to get FAQ statistics
    getFAQStats() {
        const totalQuestions = document.querySelectorAll('.faq-item').length;
        const categories = document.querySelectorAll('.faq-section').length;
        
        return {
            totalQuestions,
            categories
        };
    }

    // Method to suggest questions based on search
    suggestQuestions(searchTerm) {
        // This could be enhanced with a more sophisticated algorithm
        const suggestions = [];
        const allQuestions = document.querySelectorAll('.faq-item summary');
        
        allQuestions.forEach(question => {
            if (question.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                suggestions.push(question.textContent);
            }
        });
        
        return suggestions.slice(0, 3); // Return top 3 suggestions
    }
}

// Initialize FAQ functionality
document.addEventListener('DOMContentLoaded', () => {
    window.dbestFAQ = new DBestFAQ();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .faq-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .faq-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .faq-section {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .search-highlight {
        background: #fff3cd;
        padding: 0.1rem 0.3rem;
        border-radius: 3px;
        font-weight: 600;
    }
`;
document.head.appendChild(style);