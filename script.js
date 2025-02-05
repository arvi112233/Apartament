document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    const emailJsScript = document.createElement('script');
    emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    document.head.appendChild(emailJsScript);
    emailJsScript.onload = () => {
        emailjs.init("w0Ck5MNoq8hlz0A5f");
    };

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Add animation classes to elements
    const animatedElements = [
        { selector: '.hero-content', delay: 0 },
        { selector: '.location-card', delay: 0.2 },
        { selector: '.gallery-item', delay: 0.1, multiple: true },
        { selector: '.feature-card', delay: 0.1, multiple: true },
        { selector: '.footer-section', delay: 0.1, multiple: true }
    ];

    animatedElements.forEach(({ selector, delay, multiple }) => {
        const elements = multiple 
            ? document.querySelectorAll(selector)
            : [document.querySelector(selector)];

        elements.forEach((element, index) => {
            if (element) {
                element.classList.add('fade-up');
                element.style.transitionDelay = `${delay * (multiple ? index + 1 : 1)}s`;
            }
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.classList.remove('visible');
            } else {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const templateParams = {
                    to_email: 'rigertazani@gmail.com',
                    from_name: document.getElementById('name').value,
                    from_email: document.getElementById('email').value,
                    phone: document.getElementById('phone')?.value || 'Not provided',
                    message: document.getElementById('message').value
                };

                await emailjs.send(
                    'service_7c56m1r',
                    'template_dp6w1wl',
                    templateParams
                );

                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact us directly at rigertazani@gmail.com');
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
