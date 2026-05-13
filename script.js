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
