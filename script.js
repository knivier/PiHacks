(function() {
    'use strict';
    
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 25 : 40;
    
    if (particlesContainer) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 12 + 's';
            fragment.appendChild(particle);
        }
        particlesContainer.appendChild(fragment);
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const guideViewLink = document.getElementById('guide-view-link');
    const guidePreviewWrap = document.getElementById('guide-preview-wrap');
    const guidePreviewIframe = document.getElementById('guide-preview-iframe');
    const guideViewUnavailableNote = document.getElementById('guide-view-unavailable-note');
    const guidePreviewHint = document.querySelector('.guide-preview-hint');
    const guideDocPath = 'PiHacks Enhanced Competition Guide.docx';

    if (guideViewLink) {
        const docUrl = new URL(guideDocPath, document.baseURI).href;
        if (docUrl.startsWith('file:')) {
            guideViewLink.style.display = 'none';
            if (guidePreviewWrap) guidePreviewWrap.hidden = true;
            if (guidePreviewHint) guidePreviewHint.style.display = 'none';
            if (guideViewUnavailableNote) guideViewUnavailableNote.hidden = false;
        } else {
            const encoded = encodeURIComponent(docUrl);
            guideViewLink.href = 'https://view.officeapps.live.com/op/view.aspx?src=' + encoded;
            if (guidePreviewIframe) {
                guidePreviewIframe.src = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encoded;
            }
            if (guidePreviewWrap) guidePreviewWrap.hidden = false;
        }
    }

    const animatedElements = document.querySelectorAll('.card, .timeline-item, .prize-card, .info-item, .guide-box');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
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
})();

