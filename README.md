
## 🛠️ Setup Instructions

### Prerequisites
- A GitHub account
- A Formspree account (for contact forms)
- Basic knowledge of HTML/CSS (for customization)

### 1. GitHub Repository Setup

1. **Create a new repository** on GitHub named `dbest-mobile-massage-website`
2. **Upload all files** from this project to your repository
3. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Select **Source**: `Deploy from a branch`
   - Select **Branch**: `main` (or your primary branch)
   - Click **Save**

### 2. Formspree Configuration

1. **Create a Formspree account** at [formspree.io](https://formspree.io)
2. **Create a new form** and get your form endpoint URL
3. **Update the contact form**:
   - Open `contact.html`
   - Find the form element: `<form id="booking-form" action="https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT" method="POST" data-validate>`
   - Replace `YOUR_FORMSPREE_ENDPOINT` with your actual Formspree URL

### 3. Customization Guide

#### Business Information
Update the following files with your specific business details:

- **All pages**: Update business name in navigation and footer
- **About page**: Add therapist bio, qualifications, and photo
- **Contact page**: Update service area and business hours
- **Pricing page**: Adjust prices and package deals

#### Images
Replace placeholder images in `/assets/images/` with your actual photos:
- Professional headshot for about page
- Massage therapy demonstration images
- Business logo (if available)

#### Colors and Branding
Update the color scheme in `assets/css/styles.css`:
```css
:root {
    --teal: #0b7a72;        /* Primary brand color */
    --light-gray: #f6f7f8;  /* Background color */
    --dark-gray: #333;      /* Text color */
    --white: #ffffff;       /* White color */
}
