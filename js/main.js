// ================================
// Ambient Sound Control - AUTO PLAY
// ================================
const ambientAudio = document.getElementById('ambient-audio');
const soundToggle = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');

// Set volume (very silent - 15%)
ambientAudio.volume = 0.15;

let isPlaying = false;
let hasStarted = false;

// Function to start audio
function startAmbientSound() {
    if (hasStarted) return;
    
    ambientAudio.play().then(() => {
        isPlaying = true;
        hasStarted = true;
        soundToggle.classList.add('playing');
        soundIcon.className = 'fas fa-volume-up';
        
        // Remove all the listeners once started
        document.removeEventListener('scroll', startAmbientSound);
        document.removeEventListener('click', startAmbientSound);
        document.removeEventListener('mousemove', startAmbientSound);
        document.removeEventListener('keydown', startAmbientSound);
        document.removeEventListener('touchstart', startAmbientSound);
    }).catch(err => {
        console.log('Waiting for user interaction to play audio...');
    });
}

// Try to play immediately (will work if user has interacted before)
startAmbientSound();

// If autoplay blocked, start on ANY user interaction
document.addEventListener('scroll', startAmbientSound, { once: true });
document.addEventListener('click', startAmbientSound, { once: true });
document.addEventListener('mousemove', startAmbientSound, { once: true });
document.addEventListener('keydown', startAmbientSound, { once: true });
document.addEventListener('touchstart', startAmbientSound, { once: true });

// Toggle button now acts as mute/unmute
soundToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (isPlaying) {
        ambientAudio.pause();
        soundToggle.classList.remove('playing');
        soundIcon.className = 'fas fa-volume-mute';
        isPlaying = false;
    } else {
        ambientAudio.play();
        soundToggle.classList.add('playing');
        soundIcon.className = 'fas fa-volume-up';
        isPlaying = true;
    }
});

// ================================
// Create Floating Particles
// ================================
const particlesContainer = document.getElementById('particles');

function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ================================
// Loader
// ================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// ================================
// Custom Cursor
// ================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.querySelectorAll('a, button, .project-card, .expertise-card, .sound-toggle').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hovering');
    });
});

// ================================
// Navigation
// ================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ================================
// Stats Counter Animation
// ================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target >= 1000 ? target.toLocaleString() + '+' : target + '+';
        }
    };
    
    updateCounter();
};

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ================================
// Project Filter
// ================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ================================
// Contact Form
// ================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    alert('Message sent successfully!');
    contactForm.reset();
});

// ================================
// Smooth Reveal Animation
// ================================
const revealElements = document.querySelectorAll('.expertise-card, .project-card, .insight-card, .highlight, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ================================
// Add fadeIn keyframe
// ================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// ================================
// Console Easter Egg
// ================================
console.log('%c🚀 Welcome to Aryan\'s Space!', 'font-size: 24px; font-weight: bold;');
console.log('%c🔊 Ambient sound auto-plays on interaction', 'font-size: 12px; color: #22c55e;');
console.log('%c→ GitHub: https://github.com/Aryan-cloud-arch', 'font-size: 12px; color: #6366f1;');
console.log('%c→ Telegram: @MaiHuAryan', 'font-size: 12px; color: #6366f1;');
