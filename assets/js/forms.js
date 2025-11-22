// assets/js/forms.js
/**
 * Form-specific enhancements for DBest Mobile Massage
 * Handles Formspree integration, form states, and advanced validation
 */

class DBestForms {
    constructor() {
        this.forms = new Map();
        this.init();
    }

    init() {
        this.setupFormspreeIntegration();
        this.setupDynamicFormBehavior();
        this.setupDateRestrictions();
    }

    // Formspree AJAX Integration
    setupFormspreeIntegration() {
        const forms = document.querySelectorAll('form[action*="formspree.io"]');
        
        forms.forEach(form => {
            this.forms.set(form, {
                isSubmitting: false,
                originalAction: form.action
            });

            form.addEventListener('submit', async (e) => {
                await this.handleFormspreeSubmit(e, form);
            });
        });
    }

    async handleFormspreeSubmit(e, form) {
        e.preventDefault();
        
        const formData = this.forms.get(form);
        if (formData.isSubmitting) return;

        // Validate form before submission
        if (!this.validateForm(form)) {
            this.showFormMessage(form, 'Please fix the errors above before submitting.', 'error');
            return;
        }

        formData.isSubmitting = true;
        this.setFormState(form, 'submitting');

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.handleFormSuccess(form);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            this.handleFormError(form, error);
        } finally {
            formData.isSubmitting = false;
            this.setFormState(form, 'idle');
        }
    }

    handleFormSuccess(form) {
        this.showFormMessage(form, 'Thank you! Your booking request has been sent. We\'ll contact you within 24 hours to confirm.', 'success');
        form.reset();
        form.classList.add('form-success');
        
        // Scroll to success message
        const messageElement = form.querySelector('.form-messages');
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    handleFormError(form, error) {
        console.error('Form submission error:', error);
        this.showFormMessage(form, 'Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        form.classList.add('form-error');
    }

    setFormState(form, state) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;

        form.classList.remove('form-submitting', 'form-success', 'form-error');
        
        switch (state) {
            case 'submitting':
                form.classList.add('form-submitting');
                submitButton.disabled = true;
                break;
            case 'idle':
                submitButton.disabled = false;
                break;
            case 'success':
                form.classList.add('form-success');
                break;
            case 'error':
                form.classList.add('form-error');
                break;
        }
    }

    showFormMessage(form, message, type = 'info') {
        let messageContainer = form.querySelector('.form-messages');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'form-messages';
            form.insertBefore(messageContainer, form.firstChild);
        }

        messageContainer.innerHTML = `
            <div class="form-message form-message-${type} visible">
                ${message}
            </div>
        `;

        // Auto-hide success messages after 10 seconds
        if (type === 'success') {
            setTimeout(() => {
                const messageEl = messageContainer.querySelector('.form-message');
                if (messageEl) {
                    messageEl.classList.remove('visible');
                    setTimeout(() => messageEl.remove(), 300);
                }
            }, 10000);
        }
    }

    // Dynamic form behavior
    setupDynamicFormBehavior() {
        // Service type changes
        const serviceSelect = document.getElementById('service-type');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', (e) => {
                this.updateServiceDetails(e.target.value);
            });
        }

        // Real-time phone formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                this.formatPhoneNumber(e.target);
            });
        }
    }

    updateServiceDetails(serviceValue) {
        // Could add dynamic pricing display or service descriptions
        console.log('Service selected:', serviceValue);
        // Implementation for dynamic service details
    }

    formatPhoneNumber(input) {
        let numbers = input.value.replace(/\D/g, '');
        let formatted = '';
        
        if (numbers.length > 0) {
            formatted = '(' + numbers.substring(0, 3);
        }
        if (numbers.length > 3) {
            formatted += ') ' + numbers.substring(3, 6);
        }
        if (numbers.length > 6) {
            formatted += '-' + numbers.substring(6, 10);
        }
        
        input.value = formatted;
    }

    // Date restrictions
    setupDateRestrictions() {
        const dateInput = document.getElementById('session-date');
        if (dateInput) {
            // Set min date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.min = tomorrow.toISOString().split('T')[0];

            // Set max date to 3 months from now
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 3);
            dateInput.max = maxDate.toISOString().split('T')[0];
        }
    }

    // Enhanced validation
    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Custom validation for consent checkbox
        const consentCheckbox = form.querySelector('#consent');
        if (consentCheckbox && !consentCheckbox.checked) {
            this.showFieldError(consentCheckbox, 'You must agree to the terms to continue.');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        // Use the validation from main.js or extend here
        return true; // Base validation handled in main.js
    }

    showFieldError(field, message) {
        // Use the error display from main.js or extend here
    }
}

// Initialize form enhancements
document.addEventListener('DOMContentLoaded', () => {
    new DBestForms();
});
