// Star creation function with theme-aware colors
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numStars = 100;

    // Clear existing stars
    starsContainer.innerHTML = '';

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 2;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.animationDelay = `${delay}s`;

        starsContainer.appendChild(star);
    }
}

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Recreate stars with new theme colors
    createStars();
}

function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
}

// Astronaut and planets interaction
const astronaut = document.querySelector('.astronaut');
const planets = document.querySelectorAll('.planet');

planets.forEach((planet) => {
    planet.addEventListener('mouseenter', () => {
        const planetRect = planet.getBoundingClientRect();
        const planetCenterX = planetRect.left + planetRect.width / 2;
        const planetCenterY = planetRect.top + planetRect.height / 2;

        astronaut.style.transition = 'transform 0.5s ease-in-out';
        astronaut.style.transform = `translate(${planetCenterX - window.innerWidth / 2}px, ${planetCenterY - window.innerHeight / 2}px)`;
    });

    planet.addEventListener('mouseleave', () => {
        astronaut.style.transform = 'translate(0, 0)';
    });
});


// Event listeners
themeToggle.addEventListener('click', toggleTheme);
window.addEventListener('load', initTheme);
window.addEventListener('load', createStars);

document.getElementById('planet1').addEventListener('click', function() {
    window.location.href = 'quiz.html';
});

document.getElementById('planet3').addEventListener('click', function() {
    window.location.href = 'aboutUS.html';
});
document.getElementById('planet4').addEventListener('click', function() {
    window.location.href = 'guidlines.html';
});

document.getElementById('planet2').addEventListener('click', function() {
    window.location.href = 'stories.html';
});
