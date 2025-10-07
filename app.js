// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const galleryFilters = document.querySelectorAll('.gallery__filter');
const galleryItems = document.querySelectorAll('.gallery__item');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxImage = document.getElementById('lightbox-image');

// Mobile Navigation
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active');
        } else {
            sectionsClass?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Back to top button
function scrollTop() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    
    if (scrollTop > 560) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

window.addEventListener('scroll', scrollTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animated Counters
function animateCounters() {
    const counters = document.querySelectorAll('.stats__number');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            const time = value / speed;
            
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value + '+';
            }
        };
        animate();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.stats, .team__grid, .services__grid, .gallery__grid, .contact__content');
animatedElements.forEach(el => observer.observe(el));

// Gallery Filtering
galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        galleryFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');
        
        const filterValue = filter.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });
    });
});

// Gallery Lightbox
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        const placeholder = item.querySelector('.gallery__placeholder').innerHTML;
        
        lightboxImage.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">${getIconForCategory(category)}</div>
            <h3 style="color: var(--color-farm-green); margin-bottom: 1rem;">${getCategoryTitle(category)}</h3>
            <p style="color: var(--color-text-secondary);">This would show a full-size image of our ${category.replace('-', ' ')} in a real implementation.</p>
        `;
        
        lightbox.classList.remove('hidden');
    });
});

function getIconForCategory(category) {
    const icons = {
        'crops': '🌱',
        'farm-life': '🏡',
        'harvest': '🌾',
        'equipment': '🚜',
        'animals': '🐄',
        'facilities': '🏪'
    };
    return icons[category] || '🌱';
}

function getCategoryTitle(category) {
    const titles = {
        'crops': 'Fresh Crops',
        'farm-life': 'Farm Life',
        'harvest': 'Harvest Time',
        'equipment': 'Farm Equipment',
        'animals': 'Farm Animals',
        'facilities': 'Farm Facilities'
    };
    return titles[category] || 'Farm Gallery';
}

// Close lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});

// Escape key to close lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        lightbox.classList.add('hidden');
    }
});

// Contact Form Validation
const formFields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};

const formErrors = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    message: document.getElementById('message-error')
};

function validateField(fieldName, value) {
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'name':
            if (!value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your full name';
            } else if (value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your email address';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        
        case 'message':
            if (!value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your message';
            } else if (value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }

    return { isValid, errorMessage };
}

function updateFieldValidation(fieldName, isValid, errorMessage = '') {
    const field = formFields[fieldName];
    const errorElement = formErrors[fieldName];

    if (field && errorElement) {
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.textContent = '';
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            errorElement.textContent = errorMessage;
        }
    }
}

// Real-time validation
Object.keys(formFields).forEach(fieldName => {
    if (formFields[fieldName] && formErrors[fieldName]) {
        formFields[fieldName].addEventListener('blur', (e) => {
            const { isValid, errorMessage } = validateField(fieldName, e.target.value);
            updateFieldValidation(fieldName, isValid, errorMessage);
        });

        formFields[fieldName].addEventListener('input', (e) => {
            // Clear error styling on input
            if (e.target.classList.contains('error')) {
                e.target.classList.remove('error');
                if (formErrors[fieldName]) {
                    formErrors[fieldName].textContent = '';
                }
            }
        });
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Validate all required fields
    ['name', 'email', 'message'].forEach(fieldName => {
        const { isValid, errorMessage } = validateField(fieldName, data[fieldName] || '');
        updateFieldValidation(fieldName, isValid, errorMessage);
        
        if (!isValid) {
            isFormValid = false;
        }
    });

    // Validate subject
    if (!data.subject) {
        formFields.subject.classList.add('error');
        isFormValid = false;
    } else {
        formFields.subject.classList.remove('error');
        formFields.subject.classList.add('success');
    }

    if (isFormValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            
            // Reset field styles
            Object.values(formFields).forEach(field => {
                field.classList.remove('error', 'success');
            });
            
            Object.values(formErrors).forEach(error => {
                if (error) error.textContent = '';
            });
            
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    } else {
        // Scroll to first error
        const firstError = contactForm.querySelector('.form-control.error');
        if (firstError) {
            firstError.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            firstError.focus();
        }
    }
});

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Service card hover effects
const serviceCards = document.querySelectorAll('.service__card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Team member card effects
const teamMembers = document.querySelectorAll('.team__member');
teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    member.addEventListener('mouseleave', () => {
        member.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation for page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        heroContent.classList.add('fade-in-up');
    }
});

// Lazy loading for gallery items
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    galleryObserver.observe(item);
});

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            // In a real implementation, this would navigate between gallery images
            e.preventDefault();
        }
    }
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Form field focus effects
Object.values(formFields).forEach(field => {
    if (field) {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentElement.classList.remove('focused');
            }
        });
    }
});

// Console message for developers
console.log(`
🌱 Green Valley Farm Website
Built with modern web technologies
- Responsive Design
- Smooth Animations  
- Form Validation
- Accessibility Features
`);

// Error handling for missing elements
function handleMissingElement(elementName) {
    console.warn(`Element ${elementName} not found. Some functionality may be limited.`);
}

// Check for required elements
const requiredElements = {
    'nav-toggle': navToggle,
    'nav-menu': navMenu,
    'contact-form': contactForm,
    'back-to-top': backToTop
};

Object.entries(requiredElements).forEach(([name, element]) => {
    if (!element) {
        handleMissingElement(name);
    }
});

// Performance monitoring (simple)
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});