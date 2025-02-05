// Add EmailJS SDK
const emailJsScript = document.createElement('script');
emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
document.head.appendChild(emailJsScript);

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    emailjs.init("w0Ck5MNoq8hlz0A5f");

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

    // Add animation classes to elements
    document.querySelector('.hero-content')?.classList.add('fade-up');
    document.querySelector('.location-card')?.classList.add('fade-up');
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.classList.add('fade-up');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    document.querySelectorAll('.feature-card').forEach((item, index) => {
        item.classList.add('fade-up');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    document.querySelectorAll('.footer-section').forEach((item, index) => {
        item.classList.add('fade-up');
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Remove transition delay when element leaves viewport
            if (!entry.isIntersecting) {
                entry.target.classList.remove('visible');
                // Wait for animation to complete before resetting delay
                setTimeout(() => {
                    if (!entry.target.classList.contains('visible')) {
                        entry.target.style.transitionDelay = '0s';
                    }
                }, 300);
            } else {
                // Restore original transition delay and add visible class
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                if (entry.target.classList.contains('gallery-item') || 
                    entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('footer-section')) {
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2, // More precise trigger point
        rootMargin: '-50px 0px' // Trigger slightly before element enters viewport
    });

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right').forEach(element => {
        observer.observe(element);
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

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
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
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
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

                // Send email using EmailJS
                await emailjs.send(
                    'service_7c56m1r',
                    'template_dp6w1wl',
                    templateParams
                );

                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact us directly at rigertazani@gmail.com');
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
