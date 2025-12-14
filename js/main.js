// ================================
// Space Ambient Sound Generator
// ================================
let audioContext;
let isPlaying = false;
let hasStarted = false;
let masterGain;
let oscillators = [];

const soundToggle = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');

// Create space ambient sound
function createSpaceAmbient() {
    // Create audio context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Master volume (very low - soothing)
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.08; // Very silent
    masterGain.connect(audioContext.destination);
    
    // Deep space drone - Base frequency
    const drone1 = audioContext.createOscillator();
    drone1.type = 'sine';
    drone1.frequency.value = 60; // Deep hum
    
    const drone1Gain = audioContext.createGain();
    drone1Gain.gain.value = 0.3;
    drone1.connect(drone1Gain);
    drone1Gain.connect(masterGain);
    drone1.start();
    oscillators.push(drone1);
    
    // Second harmonic
    const drone2 = audioContext.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 90;
    
    const drone2Gain = audioContext.createGain();
    drone2Gain.gain.value = 0.15;
    drone2.connect(drone2Gain);
    drone2Gain.connect(masterGain);
    drone2.start();
    oscillators.push(drone2);
    
    // High ethereal tone
    const highTone = audioContext.createOscillator();
    highTone.type = 'sine';
    highTone.frequency.value = 220;
    
    const highToneGain = audioContext.createGain();
    highToneGain.gain.value = 0.05;
    highTone.connect(highToneGain);
    highToneGain.connect(masterGain);
    highTone.start();
    oscillators.push(highTone);
    
    // Subtle frequency modulation for movement
    const lfo = audioContext.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // Very slow
    
    const lfoGain = audioContext.createGain();
    lfoGain.gain.value = 5;
    lfo.connect(lfoGain);
    lfoGain.connect(drone1.frequency);
    lfo.start();
    oscillators.push(lfo);
    
    // White noise for cosmic texture
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * 0.02;
    }
    
    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    
    // Filter the noise to make it smoother
    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 500;
    
    const noiseGain = audioContext.createGain();
    noiseGain.gain.value = 0.5;
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start();
    
    // Gentle pulsing effect
    const pulseSpeed = 0.05;
    function pulse() {
        if (!isPlaying) return;
        const time = audioContext.currentTime;
        const pulseValue = 0.06 + Math.sin(time * pulseSpeed * Math.PI * 2) * 0.02;
        masterGain.gain.setTargetAtTime(pulseValue, time, 0.5);
        requestAnimationFrame(pulse);
    }
    pulse();
    
    console.log('🔊 Space ambient sound initialized');
}

// Start the ambient sound
function startAmbientSound() {
    if (hasStarted) return;
    
    try {
        createSpaceAmbient();
        isPlaying = true;
        hasStarted = true;
        soundToggle.classList.add('playing');
        soundIcon.className = 'fas fa-volume-up';
        
        // Remove listeners
        document.removeEventListener('scroll', startAmbientSound);
        document.removeEventListener('click', startAmbientSound);
        document.removeEventListener('mousemove', startAmbientSound);
        document.removeEventListener('keydown', startAmbientSound);
        document.removeEventListener('touchstart', startAmbientSound);
        
        console.log('🚀 Ambient sound started!');
    } catch (err) {
        console.log('Audio error:', err);
    }
}

// Start on ANY user interaction
document.addEventListener('scroll', startAmbientSound, { once: true });
document.addEventListener('click', startAmbientSound, { once: true });
document.addEventListener('mousemove', startAmbientSound, { once: true });
document.addEventListener('keydown', startAmbientSound, { once: true });
document.addEventListener('touchstart', startAmbientSound, { once: true });

// Mute/Unmute toggle
soundToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!hasStarted) {
        startAmbientSound();
        return;
    }
    
    if (isPlaying) {
        // Mute
        masterGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.1);
        soundToggle.classList.remove('playing');
        soundIcon.className = 'fas fa-volume-mute';
        isPlaying = false;
    } else {
        // Unmute
        masterGain.gain.setTargetAtTime(0.08, audioContext.currentTime, 0.1);
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
    if (!particlesContainer) return;
    
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
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1500);
});

// ================================
// Custom Cursor
// ================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower) {
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
}

// ================================
// Navigation
// ================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

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
console.log('%c🔊 Move your mouse to start ambient sound', 'font-size: 12px; color: #22c55e;');
console.log('%c→ GitHub: https://github.com/Aryan-cloud-arch', 'font-size: 12px; color: #6366f1;');
console.log('%c→ Telegram: @MaiHuAryan', 'font-size: 12px; color: #6366f1;');
