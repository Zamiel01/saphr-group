document.addEventListener('DOMContentLoaded', () => {
    const revealText = document.querySelector('.reveal-text');
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Trigger entrance animations
    setTimeout(() => {
        revealText.classList.add('active');
    }, 200);

    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, 400 + (index * 200));
    });

    // Subtle parallax effect on floating images
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        document.querySelector('.top-right').style.transform = 
            `translate(${moveX}px, ${moveY}px)`;
        
        document.querySelector('.bottom-left').style.transform = 
            `translate(${-moveX}px, ${-moveY}px)`;
    });
});