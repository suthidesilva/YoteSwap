// Updated script-3.js
const revealableSections = document.querySelectorAll('.revealable');
let reduceMotion = false;

// Enhanced Scroll Animation
function reveal() {
    revealableSections.forEach((section) => {
        const windowHeight = window.innerHeight;
        const revealTop = section.getBoundingClientRect().top;
        const revealPoint = 50;

        if (revealTop < windowHeight - revealPoint) {
            section.classList.add('active');
            // Add stagger effect to child elements
            const children = section.querySelectorAll('.service-card, .stat-card, .news-card, .opinion-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        } else if (!reduceMotion) {
            section.classList.remove('active');
        }
    });
}

// Smooth Scroll Implementation
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

// Enhanced Modal Logic
const signForm = document.getElementById('sign-petition');
const modal = document.getElementById('thanks-modal');
const modalContent = document.getElementById('modal-content');
const closeModalButton = document.getElementById('close-modal');

signForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const hometown = document.getElementById('hometown').value;
    
    // Add animation class before showing
    modal.classList.add('modal-animate');
    modalContent.textContent = `Thank you, ${name} from ${hometown}, for supporting our initiative!`;
    modal.style.display = 'flex';
    
    // Confetti effect
    createConfetti();
    
    setTimeout(() => {
        modal.classList.remove('modal-animate');
        modal.style.display = 'none';
    }, 4000);
});

// Confetti Effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Enhanced Dark Mode Toggle with Animation
const themeButton = document.getElementById('theme-button');
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        document.body.style.transition = 'background-color 0.5s ease';
    }
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    if (!reduceMotion) {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Initialize on Load
window.addEventListener('load', () => {
    // Check saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    // Initial reveal
    reveal();
});

// Scroll event listener
window.addEventListener('scroll', reveal);

// Reduce Motion Toggle with Enhanced Functionality
document.getElementById('reduce-motion').addEventListener('click', () => {
    reduceMotion = !reduceMotion;
    document.body.classList.toggle('reduce-motion');
    
    const buttonText = reduceMotion ? "Enable Motion" : "Reduce Motion";
    document.getElementById('reduce-motion').textContent = buttonText;
    
    // Update all animations based on preference
    document.querySelectorAll('.animated').forEach(element => {
        element.style.animation = reduceMotion ? 'none' : '';
    });
});