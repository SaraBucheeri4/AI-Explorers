
// Create stars
const space = document.getElementById('space');

function createStars() {
    // Clear existing stars
    const existingStars = space.querySelectorAll('.star:not(.spaceship)');
    existingStars.forEach(star => star.remove());
    
    // Create new stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`;
        space.appendChild(star);
    }
}

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    createStars();
}

function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
}

// Event listeners for theme
themeToggle.addEventListener('click', toggleTheme);
window.addEventListener('load', initTheme);
window.addEventListener('load', createStars);

const ship = document.getElementById('ship');
const initialMessage = document.getElementById('initialMessage');
const clickMessage = document.getElementById('clickMessage');
const caseImages = document.querySelectorAll('.case-image');
const audioPlayer = document.getElementById("audioPlayer");
   // Initial animation sequence
   function startSequence() {
       // Show initial message and spaceship
       setTimeout(() => {
           initialMessage.classList.add('visible');
           ship.classList.add('initial-entry');
       }, 500);

       // Fly away sequence
       setTimeout(() => {
           initialMessage.classList.remove('visible');
           ship.classList.add('fly-away');
       }, 3500);

       // Show click message and reveal astronauts
       setTimeout(() => {
           clickMessage.classList.add('visible');
           caseImages.forEach((image, index) => {
               setTimeout(() => {
                   image.classList.add('reveal');
               }, index * 200);
           });
           ship.style.top = '35%';
           ship.style.left = '50%';
           ship.classList.remove('fly-away');
       }, 5000);
   }

   // Start the sequence when page loads
   window.onload = startSequence;

   // Case data
   const cases = [
       {
           id: 1,
           title: "Your Super Smart Study Buddy!",
           color: "#4CAF50",
           position: 20,
           story: "Hey space cadet! I'm Samir, and I love using AI to help me learn about history. It's like having a friendly robot teacher! When I get homework, I ask AI to explain things in a fun way, but I always make sure to write my answers in my own special way.",
           lesson: "Remember: AI is your helper, but YOUR brain does the real work! 🌟",
           audio: "samir.mp3"
       },
       {
           id: 2,
           title: "Art Adventures with AI!",
           color: "#9C27B0",
           position: 40,
           story: "Hi space friend! I'm Abdulla, and I love making cool art with AI! It's like having a magical art buddy. I always make sure to use AI tools that play fair with other artists' work. Being creative is super fun when everyone gets to smile!",
           lesson: "Be a space hero - respect other artists when creating with AI! 🎨",
           audio: "abdullanew.mp3"
       },
       {
           id: 3,
           title: "Fact-Finding Space Mission",
           color: "#2196F3",
           position: 60,
           story: "Greetings, fellow explorer! I'm Hamad, and I'm on a mission to discover amazing facts! When AI tells me something incredible, I put on my detective hat and check it in my trusty science books or ask my wise teacher.",
           lesson: "Even AI astronauts can make mistakes - always double-check your facts! 🔍",
           audio: "hamadnew.mp3"
       },
       {
           id: 4,
           title: "Space Safety Protocol",
           color: "#F44336",
           position: 80,
           story: "Hello space cadet! I'm Maher, and I know all about staying safe in the AI galaxy! Just like how astronauts wear their special suits in space, I keep my personal information safely tucked away when talking to AI!",
           lesson: "Keep your secret space codes to yourself - never share personal info with AI! 🛡️",
           audio: "mahernew.mp3"
       }
   ];

   function showCase(caseId) {
       // Stop any currently playing audio
       audioPlayer.pause();
       audioPlayer.currentTime = 0;

       const caseData = cases.find(c => c.id === parseInt(caseId));
       if (caseData) {
           clickMessage.classList.remove('visible');
           const ship = document.getElementById("ship");
           const modal = document.getElementById("modal");
           const modalTitle = document.getElementById("modalTitle");
           const modalStory = document.getElementById("modalStory");
           const modalLesson = document.getElementById("modalLesson");
           const playButton = document.getElementById("playButton");

           ship.style.left = caseData.position + "%";
           ship.style.top = "50%";
           
           setTimeout(() => {
               modalTitle.textContent = caseData.title;
               modalStory.textContent = caseData.story;
               modalLesson.textContent = caseData.lesson;
               modal.style.borderColor = caseData.color;
               modalTitle.style.color = caseData.color;
               modal.classList.add('active');
               playButton.onclick = () => playAudio(caseData.audio);
           }, 1500);
       }
   }

   function playAudio(audioSrc) {
       audioPlayer.src = audioSrc;
       audioPlayer.play();
   }

   function closeModal() {
       const modal = document.getElementById("modal");
       const ship = document.getElementById("ship");
       
       modal.classList.remove('active');
       ship.style.left = "50%";
       ship.style.top = "35%";
       ship.style.transform = "translate(-50%, -50%)";
       
       // Stop audio when modal is closed
       audioPlayer.pause();
       audioPlayer.currentTime = 0;
       
       setTimeout(() => {
           clickMessage.classList.add('visible');
       }, 1000);
   }

   // Add click listeners to case images
   document.querySelectorAll('.case-image').forEach(image => {
       image.addEventListener('click', () => {
           const caseId = image.getAttribute('data-case');
           showCase(caseId);
       });
   });