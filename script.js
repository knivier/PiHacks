const particlesContainer = document.getElementById('particles');
const particleCount = 60;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    const size = Math.random() * 5 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    const hue = Math.random() * 30 + 250;
    particle.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%) 0%, hsl(${hue + 20}, 70%, 70%) 100%)`;
    particlesContainer.appendChild(particle);
}

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('slide-in');
                entry.target.style.opacity = '1';
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .timeline-item, .prize-card, .info-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
});

