// ================================
// Ambient Sound Control
// ================================
const ambientAudio = document.getElementById('ambient-audio');
const soundToggle = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');

let isPlaying = false;

// Set initial volume (very silent - 15%)
ambientAudio.volume = 0.15;

soundToggle.addEventListener('click', () => {
    if (isPlaying) {
        ambientAudio.pause();
        soundToggle.classList.remove('playing');
        soundIcon.className = 'fas fa-volume-mute';
        isPlaying = false;
    } else {
        ambientAudio.play().then(() => {
            soundToggle.classList.add('playing');
            soundIcon.className = 'fas fa-volume-up';
            isPlaying = true;
        }).catch(err => {
            console.log('Audio play failed:', err);
        });
    }
});

// Show hint to enable sound after 3 seconds
setTimeout(() => {
    if (!isPlaying) {
        soundToggle.style.animation = 'pulse-hint 2s ease-in-out 3';
    }
}, 3000);

// Add pulse hint animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse-hint {
        0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
        50% { box-shadow: 0 0 0 15px rgba(99, 102, 241, 0); }
    }
`;
document.head.appendChild(pulseStyle);

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
        // Remove active class from all buttons
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
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    alert('Message sent successfully! (Connect with Formspree for real functionality)');
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
// Add fadeIn keyframe dynamically
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
console.log('%c🚀 Welcome to Aryan\'s Space!', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip: text; color: transparent;');
console.log('%c👀 Curious about the code? Nice!', 'font-size: 14px; color: #a1a1aa;');
console.log('%c→ GitHub: https://github.com/Aryan-cloud-arch', 'font-size: 12px; color: #6366f1;');
console.log('%c→ Telegram: @MaiHuAryan', 'font-size: 12px; color: #6366f1;');
console.log('%c🔊 Click the sound button for ambient space vibes!', 'font-size: 12px; color: #22c55e;');
