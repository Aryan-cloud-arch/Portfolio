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

document.querySelectorAll('a, button, .project-card, .expertise-card').forEach(el => {
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
    
    // Here you would typically send to a server
    // For GitHub Pages, you can use Formspree, Netlify Forms, etc.
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Message sent successfully! (Demo - integrate with Formspree for real functionality)');
    contactForm.reset();
});

// ================================
// Smooth Reveal Animation
// ================================
const revealElements = document.querySelectorAll('.expertise-card, .project-card, .insight-card, .highlight');

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
// Typing Effect (Optional Enhancement)
// ================================
const addTypingEffect = () => {
    const codeContent = document.querySelector('.code-content code');
    if (!codeContent) return;
    
    const originalHTML = codeContent.innerHTML;
    codeContent.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalHTML.length) {
            codeContent.innerHTML = originalHTML.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 10);
        }
    };
    
    const codeObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            codeObserver.disconnect();
        }
    });
    
    codeObserver.observe(codeContent);
};

// Uncomment to enable typing effect
// addTypingEffect();

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
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold;');
console.log('%cLooking at the code? Nice! Feel free to reach out.', 'font-size: 14px;');
console.log('%c→ GitHub: https://github.com/yourusername', 'font-size: 12px; color: #6366f1;');
