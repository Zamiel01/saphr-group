// Trigger animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after page loads
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
    
    const revealElements = document.querySelectorAll('.reveal-text, .fade-in');
    
    revealElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 150);
    });
});

// Gallery Lightbox Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentIndex = 0;

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox(index);
    });
});

function openLightbox(index) {
    const img = galleryItems[index].querySelector('img');
    const alt = img.getAttribute('alt');
    
    lightboxImg.src = img.src;
    lightboxCaption.textContent = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();
}

function updateLightbox() {
    const img = galleryItems[currentIndex].querySelector('img');
    const alt = img.getAttribute('alt');
    
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = alt;
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
    }, 200);
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
});
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
});

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

// Gallery Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            galleryObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

galleryItems.forEach(item => {
    galleryObserver.observe(item);
});

// Pricing Cards Scroll Reveal
const pricingCards = document.querySelectorAll('.pricing-card');

const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            pricingObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

pricingCards.forEach(card => {
    pricingObserver.observe(card);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Booking Form Functionality
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = bookingForm.querySelector('.booking-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Hide form and show success
            bookingForm.style.display = 'none';
            bookingSuccess.style.display = 'block';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log data (in real app, send to server)
            console.log('Booking Request:', data);
        }, 1500);
    });
}

// Reset form function
function resetForm() {
    if (bookingForm) {
        bookingForm.reset();
        bookingForm.style.display = 'flex';
        bookingSuccess.style.display = 'none';
    }
}

// Set minimum date to today
const eventDateInput = document.getElementById('eventDate');
if (eventDateInput) {
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.setAttribute('min', today);
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('mobile-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// View Packages Button - Scroll to Pricing Section
const viewPackagesBtn = document.querySelector('.btn-outline');
if (viewPackagesBtn) {
    viewPackagesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Social Media Links - Open in new tab
document.querySelectorAll('.footer-social a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.getAttribute('aria-label');
        let url = '#';
        
        switch(platform) {
            case 'Facebook':
                url = 'https://facebook.com/saphirgroup';
                break;
            case 'Instagram':
                url = 'https://instagram.com/saphirgroup';
                break;
            case 'WhatsApp':
                url = 'https://wa.me/237694658769';
                break;
        }
        
        if (url !== '#') {
            window.open(url, '_blank');
        } else {
            alert('Social media link coming soon!');
        }
    });
});

// Get Directions Button - Open Google Maps
const directionsBtn = document.querySelector('.map-directions');
if (directionsBtn) {
    directionsBtn.addEventListener('click', (e) => {
        // The link already has href, but let's make sure it opens properly
        const href = directionsBtn.getAttribute('href');
        if (href && href !== '#') {
            window.open(href, '_blank');
        }
    });
}

// Footer Quick Links - Ensure smooth scroll
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Home Button - Scroll to top
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const text = link.textContent.trim();
        if (text === 'Home' || text === 'Accueil') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to all buttons for better UX
document.querySelectorAll('button, .btn-filled, .btn-outline, .pricing-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});
