# Nixfolio - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing the work and skills of **Nikko E. Calumpiano**, a passionate web developer with expertise in full-stack development.

![Nixfolio Preview](Nixfolio/assets/images/hero/me.jpg)

## 🌟 Features

- **Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Sections** - Dynamic content with engaging user experience
- **Contact Form** - Functional contact form with PHP backend
- **Project Showcase** - Portfolio gallery with detailed project information
- **Skills Display** - Visual representation of technical skills
- **Client Testimonials** - Feedback from satisfied clients
- **Blog Section** - Content management for articles and updates
- **SEO Optimized** - Search engine friendly structure

## 🚀 Live Demo

Visit the live website: [nikkocalumpiano.website](https://nikkocalumpiano.website)

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Customization](#-customization)
- [Featured Projects](#-featured-projects)
- [Contact](#-contact)
- [License](#-license)

## 🛠 Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript** - Interactive functionality
- **Bootstrap 5** - Responsive framework
- **SASS** - CSS preprocessor
- **jQuery** - DOM manipulation and effects

### Libraries & Plugins
- **Slick Carousel** - Image and content sliders
- **WOW.js** - Scroll animations
- **Isotope** - Portfolio filtering
- **Font Awesome** - Icon library
- **Flaticon** - Custom icons
- **Magnific Popup** - Lightbox functionality

### Backend
- **PHP** - Server-side processing
- **MySQL** - Database management
- **Contact Form Processing** - Email functionality

## 📁 Project Structure

```
Nixfolio/
├── assets/
│   ├── css/                 # Stylesheets
│   ├── js/                  # JavaScript files
│   ├── images/              # Image assets
│   ├── fonts/               # Font files
│   ├── files/               # Documents (resume, etc.)
│   ├── php/                 # PHP backend files
│   └── sass/                # SASS source files
├── database/                # Database schema
├── Documentation/           # Project documentation
├── *.html                   # HTML pages
└── README.md               # This file
```

### Key Pages
- `index.html` - Homepage with hero section, about, skills, projects
- `about.html` - Detailed about page
- `projects.html` - Portfolio showcase
- `services.html` - Services offered
- `blog.html` - Blog/articles section
- `contact.html` - Contact information and form
- `404.html` - Custom error page

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nixthephdev/nixfolio.git
   cd nixfolio
   ```

2. **Set up local server**
   - Use XAMPP, WAMP, or any local server environment
   - Place files in your server's document root (e.g., `htdocs/`)

3. **Database Setup**
   - Import `database/nikkocal_nixfolio.sql` into your MySQL database
   - Update database connection settings in PHP files

4. **Configure Contact Form**
   - Edit `assets/php/form-process.php`
   - Update email settings and SMTP configuration

## 🎯 Usage

### Development
1. Start your local server (Apache + MySQL)
2. Navigate to `http://localhost/nixfolio/Nixfolio/`
3. Make changes to HTML, CSS, or JavaScript files
4. For SASS development, compile using your preferred method

### Customization
- **Colors**: Modify `assets/sass/_variables.sass`
- **Content**: Update HTML files with your information
- **Images**: Replace images in `assets/images/` directory
- **Contact Form**: Configure `assets/php/form-process.php`

## 🎨 Customization Guide

### Changing Colors
Edit the color variables in `assets/sass/_variables.sass`:
```sass
$colors: (
  base-color: rgba(255, 255, 255, 0.65),
  heading-color: #FFFFFF,
  primary-color: #C9F31D,
  lighter-color: #1F1F1F,
  black-color: #070707,
  border-color: rgba(255, 255, 255, 0.10)
)
```

### Updating Contact Information
Modify the contact form destination in `assets/php/form-process.php`:
```php
$EmailTo = "your-email@domain.com";
$bodySubject = "New Message Received";
```

### Adding New Projects
1. Add project images to `assets/images/projects/`
2. Update the portfolio section in `index.html`
3. Create detailed project pages as needed

## 🏆 Featured Projects

### 1. Philippine Cambridge International School Website
- **Technology**: Web Development
- **Description**: Comprehensive website for educational institution
- **Live**: [pcis.edu.ph](https://pcis.edu.ph)

### 2. M7 IT Solutions Company Website
- **Technology**: Web Development
- **Description**: Dynamic company website with modern design
- **Live**: [m7techsolutions.com](https://m7techsolutions.com/)

### 3. St. Lawrence Water Works Billing System
- **Technology**: Web Application
- **Features**: SMS notifications, receipt printing, billing management

### 4. ACLC College AI-Integrated CMS
- **Technology**: Web Development + AI
- **Features**: Content management with AI integration

### 5. BGI Electrical Store Management System
- **Technology**: Web Application
- **Features**: Inventory management, POS system integration

## 📊 Skills & Expertise

- **Frontend**: HTML5 (95%), CSS3 (90%), JavaScript (85%)
- **Backend**: PHP, Laravel (80%), MySQL
- **Frameworks**: Bootstrap, React
- **Tools**: Git, SASS, jQuery
- **Design**: Responsive Design, UI/UX

## 📞 Contact

**Nikko E. Calumpiano**
- **Email**: [nickocalumpiano@gmail.com](mailto:nickocalumpiano@gmail.com)
- **Phone**: +63 931 991 4266
- **Location**: Brgy. Diamante, Prieto Diaz, Sorsogon, Philippines
- **Website**: [nikkocalumpiano.website](https://nikkocalumpiano.website)

### Social Media
- **Facebook Messenger**: [m.me/nikolovincent](https://m.me/nikolovincent)
- **Instagram**: [@nikokololo](https://www.instagram.com/nikokololo)
- **Telegram**: [@Nixlopez](https://web.telegram.org/k/#@Nixlopez)
- **Viber**: +639319914266

## 🎓 Education & Achievements

- **BS Information Technology** - ACLC College Sorsogon (2020-2024)
- **Best Programmer Award** - ACLC College Sorsogon (2024)
- **2+ Years Experience** in Web Development
- **5+ Completed Projects** with 100% Client Satisfaction

## 💼 Services Offered

### 🌐 Website Construction
Custom-built websites tailored to your specific needs and requirements.

### 🔧 Website Maintenance
Ongoing support to keep your website updated, secure, and running smoothly.

### 🔒 Website Security (SSL)
Implementation of SSL certificates and security measures to protect your site.

### 📈 Search Engine Optimization (SEO)
Optimization strategies to improve your website's visibility in search engines.

## 💰 Pricing

### Basic Plan - Starting at ₱15,000
- Simple Website Design
- Mobile Responsive
- Up to 5 Pages
- Basic Support

### Standard Plan - Starting at ₱25,000
- Advanced Website Design
- Mobile App Integration
- Up to 10 Pages
- Basic SEO Optimization

### Premium Plan - Custom Pricing
- Custom Website Design
- Advanced Features
- Unlimited Pages
- Comprehensive SEO Strategy

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with your improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bootstrap** - For the responsive framework
- **Font Awesome** - For the icon library
- **Flaticon** - For custom icons
- **jQuery** - For DOM manipulation
- **All Clients** - For their trust and collaboration

---

**© 2024 Nixfolio - Nikko E. Calumpiano. All Rights Reserved.**

*Built with ❤️ and lots of ☕ in the Philippines*
