/***********************************************************
 * 💖 INTERACTIVE PROPOSAL SITE CONFIGURATION & CORNERSTONE 💖
 * Feel free to customize any of the variables below!
 ***********************************************************/

const CONFIG = {
  HER_NAME: "Hikmah Omolola Owoyemi",
  YOUR_NAME: "phurhard",
  WHATSAPP_NUMBER: "+2348156336247",
  START_DATE: new Date("2026-05-26T13:30:00"),
  
  // Stages configuration
  INTRO_TYPING_TEXT: "From the very first moment we talked, I knew there was something magical about you. We've built sweet memories, shared deep laughs, and stood by each other. Now, I want to take a walk down memory lane with you...",
  
  // Timeline Cards (Stage 3)
  MEMORIES: [
    {
      icon: "✨",
      title: "The First Connection",
      date: "The Spark",
      text: "It started with a simple video, but my heart knew immediately that you were anything but simple. Your energy, your intelligence, and your kindness completely captivated me."
    },
    {
      icon: "🌸",
      title: "Your Smile & Laughter",
      date: "My Favorite View",
      text: "There is no sound in this universe more beautifully romantic than your laughter, and no sight of great romantic view than your smile. I lose myself in your beauty."
    },
    {
      icon: "🛡️",
      title: "Our Quiet Strength",
      date: "The Partnership",
      text: "How you take things head-on, and always trust in my heart has made me feel capable of conquering the world. With you, I know I'll continue to be stronger, kinder, and more complete."
    }
  ],

  // Reason Garden Cards (Stage 4)
  REASONS: [
    {
      title: "Your Warm Kindness",
      desc: "You carry a gentleness that warms everyone around you. The way you care for others and show compassion makes me want to be a better person every single day."
    },
    {
      title: "Your Graceful Strength",
      desc: "No matter what challenges life throws, you meet them with a resilience and elegance that inspires me. I want to be the one who stands by you and supports your weight through every storm."
    },
    {
      title: "Your Beautiful Soul",
      desc: "You shine from within. Your thoughts, your passions, your beautiful eyes, and the quiet moments we share are treasures I intend to guard for the rest of my days."
    },
    {
      title: "Our Shared Future",
      desc: "When I close my eyes and picture my life ten, thirty, or fifty years from now, it is you sitting beside me. I see coffee mornings, quiet evenings, and a lifetime of adventures. This is an important decision for me, and i want you to be in it."
    }
  ],

  // Warm-Up Questions (Stage 5 - before the big proposal)
  QUESTIONS: [
    {
      emoji: "🥰",
      question: "Do you like me?",
      subtext: "Be honest... I need to know before I ask you something really important.",
      yesLabel: "Yes, I do! 💕",
      noLabel: "Hmm, not sure 🤔",
      reaction: "I knew it! My heart is doing backflips right now! 🥹💖"
    },
    {
      emoji: "💭",
      question: "Do you think about me?",
      subtext: "When I'm not around... do I cross your mind the way you always cross mine?",
      yesLabel: "All the time! 🌸",
      noLabel: "Maybe sometimes 😶",
      reaction: "You just made my whole day! I think about you every second! 🦋✨"
    },
    {
      emoji: "💍",
      question: "Do you trust me with your heart?",
      subtext: "Because I have something very important I want to ask you...",
      yesLabel: "With all my heart 💝",
      noLabel: "I'm scared 😰",
      reaction: "Thank you for trusting me... Now, I have one final question... 🌹"
    }
  ]
};

/***********************************************************
 * 🎵 PROCEDURAL WEB AUDIO API SYNTHESIZER (ROMANTIC PIANO) 🎵
 * Plays a gorgeous ambient arpeggio 100% offline!
 ***********************************************************/

let audioCtx = null;
let soundEnabled = false;
let synthTimer = null;
let synthStep = 0;
let synthTempo = 320; // Time in ms between notes
let synthProgression = 'romantic'; // 'romantic' or 'happy'

// Frequency Map (Scientific Pitch Notation)
const NOTES = {
  A2: 110.00, C3: 130.81, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25,
  E5: 659.25, G5: 783.99, A5: 880.00, B5: 987.77, C6: 1046.50
};

// Chords definitions (Sequenced indices of NOTES)
const CHORDS = {
  romantic: [
    ['A2', 'E3', 'A3', 'C4', 'E4', 'G4', 'C5', 'E5'], // Am7
    ['F3', 'C4', 'F4', 'A4', 'C5', 'E5', 'A5', 'C6'], // Fmaj7
    ['C3', 'G3', 'C4', 'E4', 'G4', 'B4', 'C5', 'E5'], // Cmaj7
    ['G3', 'D4', 'G4', 'B4', 'D5', 'E5', 'G5', 'B5']  // G6
  ],
  happy: [
    ['C3', 'G3', 'C4', 'E4', 'G4', 'C5', 'E5', 'G5'], // C Major
    ['F3', 'C4', 'F4', 'A4', 'C5', 'F5', 'A5', 'C6'], // F Major
    ['G3', 'D4', 'G4', 'B4', 'D5', 'G5', 'B5', 'D6'], // G Major
    ['A2', 'E3', 'A3', 'C4', 'E4', 'A4', 'C5', 'E5']  // A Minor (resolving)
  ]
};

function initAudio() {
  if (audioCtx) return;
  
  // Create audio context
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  // Custom feedback delay node setup (creates a beautiful, expansive ambient reverb)
  const delay = audioCtx.createDelay(1.0);
  delay.delayTime.value = 0.38;
  
  const feedback = audioCtx.createGain();
  feedback.gain.value = 0.35;
  
  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1000; // Keep delay echoes soft and warm
  
  // delay feedback loop
  delay.connect(feedback);
  feedback.connect(filter);
  filter.connect(delay);
  
  // Connect delay to output
  const delayGain = audioCtx.createGain();
  delayGain.gain.value = 0.25;
  delay.connect(delayGain);
  delayGain.connect(audioCtx.destination);
  
  // Save nodes in context helper
  audioCtx.delayNode = delay;
  audioCtx.delayGain = delayGain;
}

function playNote(freq, startTime, duration = 1.2) {
  if (!audioCtx || audioCtx.state === 'suspended') return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  
  osc.type = "triangle"; // Warm, flute/piano-like waveform
  osc.frequency.value = freq;
  
  filter.type = "lowpass";
  filter.frequency.value = 1200; // Warm roll-off
  
  // Envelope: smooth attack, long ambient decay
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.18, startTime + 0.06); // Soft touch
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Long fade
  
  osc.connect(filter);
  filter.connect(gain);
  
  // Dry output
  gain.connect(audioCtx.destination);
  
  // Send to delay node
  if (audioCtx.delayNode) {
    gain.connect(audioCtx.delayNode);
  }
  
  osc.start(startTime);
  osc.stop(startTime + duration + 0.1);
}

function scheduleNextNotes() {
  if (!soundEnabled || !audioCtx) return;
  
  const chordSet = CHORDS[synthProgression];
  const chordIndex = Math.floor(synthStep / 8) % chordSet.length;
  const noteIndex = synthStep % 8;
  const noteName = chordSet[chordIndex][noteIndex];
  const frequency = NOTES[noteName] || 220;
  
  const scheduledTime = audioCtx.currentTime + 0.05;
  
  // Play main arpeggiated note
  playNote(frequency, scheduledTime, 1.4);
  
  // Add an occasional harmonic sparkling bell (octave higher) in success mode!
  if (synthProgression === 'happy' && Math.random() > 0.6) {
    const sparkFreq = frequency * 2;
    playNote(sparkFreq, scheduledTime + 0.1, 0.8);
  }
  
  synthStep++;
  synthTimer = setTimeout(scheduleNextNotes, synthTempo);
}

function toggleAudio() {
  const btn = document.getElementById('audio-toggle');
  const icon = document.getElementById('audio-icon');
  const text = document.getElementById('audio-text');
  
  if (!audioCtx) initAudio();
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  if (soundEnabled) {
    soundEnabled = false;
    clearTimeout(synthTimer);
    icon.textContent = "🔇";
    text.textContent = "Music Off";
    btn.style.borderColor = "rgba(255, 255, 255, 0.15)";
  } else {
    soundEnabled = true;
    icon.textContent = "🔊";
    text.textContent = "Music On";
    btn.style.borderColor = "var(--primary-rose)";
    scheduleNextNotes();
  }
}


/***********************************************************
 * 🎨 CANVAS PARTICLE ENGINE (FLOATING HEARTS & SPARKLES) 🎨
 * Dynamic rose petal, heart and sparkle physics canvas
 ***********************************************************/

const canvasBg = document.getElementById('canvas-bg');
const ctxBg = canvasBg.getContext('2d');

let particles = [];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

class Particle {
  constructor(x, y, type = null) {
    this.x = x || Math.random() * windowWidth;
    this.y = y || windowHeight + 20;
    this.type = type || (Math.random() > 0.45 ? 'heart' : 'sparkle');
    this.size = Math.random() * 12 + 6;
    this.speedY = -(Math.random() * 1.5 + 0.6);
    this.speedX = Math.random() * 0.8 - 0.4;
    this.angle = Math.random() * 360;
    this.spinSpeed = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.5 + 0.4;
    
    // Colorful hues (reds, pinks, golds)
    this.hue = this.type === 'heart' ? (Math.random() > 0.5 ? 340 : 325) : 45;
  }
  
  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.2; // Sinuous breeze effect
    this.angle += this.spinSpeed;
    this.opacity -= 0.001; // Fade out slowly as they float up
  }
  
  draw() {
    ctxBg.save();
    ctxBg.translate(this.x, this.y);
    ctxBg.rotate((this.angle * Math.PI) / 180);
    ctxBg.globalAlpha = this.opacity;
    
    if (this.type === 'heart') {
      // Draw a perfect vector love heart
      ctxBg.fillStyle = `hsl(${this.hue}, 85%, 68%)`;
      ctxBg.beginPath();
      ctxBg.moveTo(0, 0);
      ctxBg.bezierCurveTo(-this.size/2, -this.size/2, -this.size, 0, 0, this.size);
      ctxBg.bezierCurveTo(this.size, 0, this.size/2, -this.size/2, 0, 0);
      ctxBg.fill();
    } else {
      // Draw a gold shining sparkle
      ctxBg.fillStyle = `hsl(45, 95%, 65%)`;
      ctxBg.beginPath();
      for (let i = 0; i < 4; i++) {
        ctxBg.lineTo(0, -this.size);
        ctxBg.lineTo(this.size * 0.25, -this.size * 0.25);
        ctxBg.rotate(Math.PI / 2);
      }
      ctxBg.closePath();
      ctxBg.fill();
    }
    
    ctxBg.restore();
  }
}

function resizeCanvas() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  canvasBg.width = windowWidth;
  canvasBg.height = windowHeight;
}

function spawnParticles() {
  if (particles.length < 50) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctxBg.clearRect(0, 0, windowWidth, windowHeight);
  
  spawnParticles();
  
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    
    // Remove out-of-screen or fully transparent particles
    if (particles[i].y < -30 || particles[i].opacity <= 0) {
      particles.splice(i, 1);
    }
  }
  
  requestAnimationFrame(animateParticles);
}

// Touch/Mouse tap explosion effect
window.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.classList.contains('petal')) return;
  for (let i = 0; i < 8; i++) {
    const p = new Particle(e.clientX, e.clientY);
    p.speedY = Math.random() * 4 - 2;
    p.speedX = Math.random() * 4 - 2;
    p.opacity = 0.9;
    particles.push(p);
  }
});


/***********************************************************
 * 📑 STATE CONTROLLER (MULTI-STAGE SPA) 📑
 * Manages the transitions between interactive card panels
 ***********************************************************/

const STAGE_IDS = {
  1: 'stage-prelude',
  2: 'stage-heartbeat',
  3: 'stage-memory',
  4: 'stage-garden',
  5: 'stage-questions',
  6: 'stage-proposal',
  7: 'stage-celebration'
};

let currentStageIndex = 1;

function showStage(stageNum) {
  const currentStage = document.querySelector('.stage.active');
  const stageId = STAGE_IDS[stageNum];
  const nextStage = document.getElementById(stageId);
  
  if (currentStage) {
    currentStage.classList.remove('active');
    currentStage.classList.add('hidden');
  }
  
  if (nextStage) {
    nextStage.classList.remove('hidden');
    // Short timeout to guarantee DOM repaint for elegant CSS scale animations
    setTimeout(() => {
      nextStage.classList.add('active');
    }, 50);
  }
  
  currentStageIndex = stageNum;
  
  // Custom stage initialization hooks
  if (stageNum === 2) {
    startTypingAnimation();
  } else if (stageNum === 3) {
    renderStoryCard();
  } else if (stageNum === 4) {
    renderGardenPetals();
  } else if (stageNum === 5) {
    renderQuestion();
  }
}

function nextStage() {
  showStage(currentStageIndex + 1);
}

function initiateJourney(enableSound) {
  if (enableSound) {
    toggleAudio();
  }
  nextStage();
}


/***********************************************************
 * ✍️ STAGE 2: HEARTBEAT TYPING ANIMATION ✍️
 * Types a beautiful love message to set the stage
 ***********************************************************/

let typingIndex = 0;
const typingTextElement = document.getElementById('typing-text');
const heartbeatNextBtn = document.getElementById('heartbeat-next-btn');

function startTypingAnimation() {
  typingTextElement.textContent = "";
  typingIndex = 0;
  typeChar();
}

function typeChar() {
  if (typingIndex < CONFIG.INTRO_TYPING_TEXT.length) {
    typingTextElement.textContent += CONFIG.INTRO_TYPING_TEXT.charAt(typingIndex);
    typingIndex++;
    // Elegant natural typing speed randomness
    const delay = CONFIG.INTRO_TYPING_TEXT.charAt(typingIndex - 1) === '.' ? 500 : Math.random() * 30 + 20;
    setTimeout(typeChar, delay);
  } else {
    // Show the button with a glowing fade transition once text typing is done
    heartbeatNextBtn.classList.remove('hidden');
  }
}


/***********************************************************
 * 📚 STAGE 3: INTERACTIVE RELATIONSHIP STORYBOOK 📚
 * Multi-page timeline slider showing key relationship card highlights
 ***********************************************************/

let currentStoryIndex = 0;
let miniChoiceTriggered = false;

function renderStoryCard() {
  const card = CONFIG.MEMORIES[currentStoryIndex];
  const storyView = document.getElementById('story-view');
  const progressFill = document.getElementById('story-progress');
  
  // Update progress bar
  const progressPercent = ((currentStoryIndex + 1) / CONFIG.MEMORIES.length) * 100;
  progressFill.style.width = `${progressPercent}%`;
  
  // Load content with smooth CSS animations
  storyView.innerHTML = `
    <div class="story-icon">${card.icon}</div>
    <span class="story-date">${card.date}</span>
    <h3 class="story-title">${card.title}</h3>
    <p class="story-text">${card.text}</p>
  `;
  
  // Handle button disabling
  document.getElementById('story-prev-btn').disabled = (currentStoryIndex === 0);
  
  // If it's the last page, change text of next button
  const nextBtn = document.getElementById('story-next-btn-nav');
  if (currentStoryIndex === CONFIG.MEMORIES.length - 1) {
    nextBtn.textContent = "Finish Timeline ✨";
  } else {
    nextBtn.textContent = "Next Card →";
  }
}

function nextStoryCard() {
  if (currentStoryIndex < CONFIG.MEMORIES.length - 1) {
    currentStoryIndex++;
    renderStoryCard();
  } else {
    // Before moving to Stage 4, trigger the intermediate Mini-Choice card!
    if (!miniChoiceTriggered) {
      document.getElementById('mini-choice-container').classList.remove('hidden');
    } else {
      nextStage();
    }
  }
}

function prevStoryCard() {
  if (currentStoryIndex > 0) {
    currentStoryIndex--;
    renderStoryCard();
  }
}

function handleMiniChoice(answer) {
  const container = document.getElementById('mini-choice-container');
  
  if (answer === 'yes') {
    // Visual explosion of joy!
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const p = new Particle(windowWidth / 2, windowHeight / 2);
        p.speedY = Math.random() * 8 - 4;
        p.speedX = Math.random() * 8 - 4;
        p.opacity = 1.0;
        particles.push(p);
      }, i * 50);
    }
    
    container.classList.add('hidden');
    miniChoiceTriggered = true;
    nextStage();
  } else if (answer === 'maybe') {
    // Playful redirect to continue convincing her
    const title = container.querySelector('.mini-choice-title');
    title.textContent = "Let me show you a garden of reasons, then! 😉🌸";
    
    setTimeout(() => {
      container.classList.add('hidden');
      miniChoiceTriggered = true;
      nextStage();
    }, 2000);
  }
}

// Runaway Mini "No" Button dodging logic
function dodgeMiniNo() {
  const noBtn = document.getElementById('mini-no');
  const x = Math.random() * 120 - 60;
  const y = Math.random() * 120 - 60;
  noBtn.style.transform = `translate(${x}px, ${y}px) scale(0.8)`;
  
  // Switch up text tags
  const container = document.getElementById('mini-choice-container');
  const title = container.querySelector('.mini-choice-title');
  title.textContent = "Access Denied! The universe insists on magic! 😂💖";
}


/***********************************************************
 * 🌹 STAGE 4: INTERACTIVE REASON GARDEN 🌹
 * A grid of beautiful floating cards revealing reasons to cherish her
 ***********************************************************/

let clickedPetalsCount = 0;
const clickedPetalsSet = new Set();

function renderGardenPetals() {
  const container = document.getElementById('garden-petals');
  container.innerHTML = "";
  
  CONFIG.REASONS.forEach((reason, index) => {
    const cardHtml = `
      <div class="petal" id="petal-${index}" onclick="openPetal(${index})">
        <span class="petal-heart">💝</span>
        <span class="petal-label">Reason 0${index + 1}</span>
      </div>
    `;
    container.innerHTML += cardHtml;
  });
}

function openPetal(index) {
  const reason = CONFIG.REASONS[index];
  const detailCard = document.getElementById('petal-detail');
  
  document.getElementById('petal-title').textContent = reason.title;
  document.getElementById('petal-desc').textContent = reason.desc;
  detailCard.classList.remove('hidden');
  
  // Track unique clicks
  if (!clickedPetalsSet.has(index)) {
    clickedPetalsSet.add(index);
    document.getElementById(`petal-${index}`).classList.add('clicked');
    
    // Sparkle particles when a petal is opened
    for (let i = 0; i < 8; i++) {
      const p = new Particle(windowWidth / 2, windowHeight / 2, 'sparkle');
      p.speedY = Math.random() * 4 - 2;
      p.speedX = Math.random() * 4 - 2;
      particles.push(p);
    }
  }
  
  // Check if all reasons are unlocked
  if (clickedPetalsSet.size === CONFIG.REASONS.length) {
    document.getElementById('garden-next-btn').classList.remove('hidden');
  }
}

function closePetalDetail() {
  document.getElementById('petal-detail').classList.add('hidden');
}


/***********************************************************
 * 💕 STAGE 5: WARM-UP QUESTIONS (3 Playful Questions) 💕
 * Builds anticipation with sweet interactive questions
 ***********************************************************/

let currentQuestionIndex = 0;
let questionAnswering = false;

function renderQuestion() {
  const q = CONFIG.QUESTIONS[currentQuestionIndex];
  const view = document.getElementById('question-view');
  const reactionEl = document.getElementById('question-reaction');
  
  // Reset reaction
  reactionEl.classList.remove('visible');
  reactionEl.textContent = '';
  
  // Update progress dots
  CONFIG.QUESTIONS.forEach((_, i) => {
    const dot = document.getElementById(`q-dot-${i}`);
    dot.classList.remove('active', 'completed');
    if (i < currentQuestionIndex) dot.classList.add('completed');
    if (i === currentQuestionIndex) dot.classList.add('active');
  });
  
  // Render question content
  view.innerHTML = `
    <span class="question-number">Question ${currentQuestionIndex + 1} of ${CONFIG.QUESTIONS.length}</span>
    <div class="question-emoji">${q.emoji}</div>
    <h2 class="question-text">${q.question}</h2>
    <p class="question-subtext">${q.subtext}</p>
    <div class="question-answer-group">
      <button class="btn-question-yes" onclick="answerQuestion('yes')">${q.yesLabel}</button>
      <button class="btn-question-no-dodge" id="q-no-btn" onmouseover="dodgeQuestionNo()" onclick="dodgeQuestionNo()">${q.noLabel}</button>
    </div>
  `;
}

function answerQuestion(answer) {
  if (answer !== 'yes') return;
  if (questionAnswering) return;
  questionAnswering = true;

  const q = CONFIG.QUESTIONS[currentQuestionIndex];
  const reactionEl = document.getElementById('question-reaction');

  // Show reaction
  reactionEl.textContent = q.reaction;
  reactionEl.classList.add('visible');

  // Sparkle burst
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const p = new Particle(windowWidth / 2, windowHeight / 2);
      p.speedY = Math.random() * 6 - 3;
      p.speedX = Math.random() * 6 - 3;
      p.opacity = 1.0;
      particles.push(p);
    }, i * 40);
  }

  // Mark current dot as completed
  const dot = document.getElementById(`q-dot-${currentQuestionIndex}`);
  dot.classList.remove('active');
  dot.classList.add('completed');

  // Advance after showing reaction
  setTimeout(() => {
    questionAnswering = false;
    currentQuestionIndex++;
    if (currentQuestionIndex < CONFIG.QUESTIONS.length) {
      renderQuestion();
    } else {
      // All questions answered — proceed to the big proposal!
      nextStage();
    }
  }, 2200);
}

function dodgeQuestionNo() {
  const noBtn = document.getElementById('q-no-btn');
  if (!noBtn) return;
  
  const x = Math.random() * 140 - 70;
  const y = Math.random() * 80 - 40;
  noBtn.style.transform = `translate(${x}px, ${y}px) scale(0.85)`;
  
  // Tease messages
  const teases = [
    "Nice try! 😂",
    "Not an option! 💖",
    "You can't escape love! 🥰",
    "Try the other button! 😉",
    "Denied! 💕",
    "Love always wins! ✨"
  ];
  noBtn.textContent = teases[Math.floor(Math.random() * teases.length)];
}


/***********************************************************
 * 💍 STAGE 5: THE ULTIMATE PROPOSAL & RUNAWAY NO BUTTON 💍
 * The climax! Handles envelope folding, runaway buttons and logic
 ***********************************************************/

function openEnvelope() {
  const env = document.getElementById('love-envelope');
  env.classList.add('open');
  
  // Wait for envelope unfolding transition, then hide envelope and slide letter up
  setTimeout(() => {
    env.classList.add('hidden');
    const letter = document.getElementById('proposal-letter');
    letter.classList.remove('hidden');

    // Ensure card is scrolled to top so letter header is never clipped
    const card = document.querySelector('.proposal-card');
    if (card) card.scrollTop = 0;

    // Reposition the No button dynamically in the actions block initially
    resetNoButton();
  }, 1200);
}

const btnNo = document.getElementById('btn-no');

function resetNoButton() {
  // Position NO button below YES button initially (stacked layout for mobile)
  btnNo.style.position = 'relative';
  btnNo.style.left = 'auto';
  btnNo.style.top = 'auto';
  btnNo.style.transform = 'scale(1)';
  btnNo.style.opacity = '1';
}

// Highly sophisticated runaway button algorithm staying cleanly within card/window bounds
function dodgeNo() {
  const actionsContainer = document.querySelector('.proposal-actions');
  const containerRect = actionsContainer.getBoundingClientRect();
  const btnWidth = btnNo.offsetWidth;
  const btnHeight = btnNo.offsetHeight;
  const padding = 10;
  
  // Switch to absolute positioning for dodging
  btnNo.style.position = 'absolute';
  
  // Constrain within the proposal-actions container
  const maxX = containerRect.width - btnWidth - padding;
  const maxY = containerRect.height - btnHeight - padding;
  
  let newX = Math.random() * Math.max(maxX, 0) + padding;
  let newY = Math.random() * Math.max(maxY, 0) + padding;
  
  // Clamp to ensure visibility
  newX = Math.max(padding, Math.min(newX, maxX));
  newY = Math.max(padding, Math.min(newY, maxY));
  
  // Assign absolute styles
  btnNo.style.left = `${newX}px`;
  btnNo.style.top = `${newY}px`;
  
  // Scale down the No button slightly each dodge to make it progressively funnier!
  const currentScale = parseFloat(btnNo.style.transform.replace('scale(', '').replace(')', '')) || 1;
  const newScale = Math.max(currentScale - 0.15, 0.4);
  btnNo.style.transform = `scale(${newScale})`;
  
  // Dynamic teasing comments
  const questions = [
    "Are you sure? 🥺",
    "Try again! 😉",
    "Error 404: Option not found! 💖",
    "I'll make you very happy, promise! 🌹",
    "Still trying? No way! 😂",
    "Choose YES! ❤️"
  ];
  btnNo.textContent = questions[Math.floor(Math.random() * questions.length)];
}

// Double security fallback: if touched/hovered, dodge immediately
btnNo.addEventListener('mouseenter', dodgeNo);
btnNo.addEventListener('touchmove', dodgeNo);
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  dodgeNo();
});

// If they somehow managed to tap it (keyboard navigation or click bypass)
btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  alert("System Overload: Heart error! Only 'YES' is permitted to access my future! ❤️");
  resetNoButton();
});


/***********************************************************
 * 🎉 STAGE 6: CELEBRATION, WEBRTC PHOTO & TIMER 🎉
 * Triggered on YES! Celebrates love, takes reaction picture
 ***********************************************************/

let confettiCanvas = document.getElementById('canvas-confetti');
let ctxConfetti = confettiCanvas.getContext('2d');
let confettiPieces = [];
let celebrationActive = false;

class Confetti {
  constructor() {
    this.x = Math.random() * windowWidth;
    this.y = Math.random() * -40 - 20;
    this.size = Math.random() * 10 + 6;
    this.color = `hsl(${Math.random() * 360}, 85%, 65%)`;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.angle = Math.random() * 360;
    this.spin = Math.random() * 4 - 2;
    this.type = Math.random() > 0.4 ? 'strip' : 'heart';
  }
  
  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.02) * 0.5;
    this.angle += this.spin;
  }
  
  draw() {
    ctxConfetti.save();
    ctxConfetti.translate(this.x, this.y);
    ctxConfetti.rotate((this.angle * Math.PI) / 180);
    ctxConfetti.fillStyle = this.color;
    
    if (this.type === 'heart') {
      ctxConfetti.beginPath();
      ctxConfetti.moveTo(0, 0);
      ctxConfetti.bezierCurveTo(-this.size/2, -this.size/2, -this.size, 0, 0, this.size);
      ctxConfetti.bezierCurveTo(this.size, 0, this.size/2, -this.size/2, 0, 0);
      ctxConfetti.fill();
    } else {
      ctxConfetti.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.4);
    }
    ctxConfetti.restore();
  }
}

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function animateConfetti() {
  if (!celebrationActive) return;
  
  ctxConfetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  // Continuously spawn celebration confetti
  if (confettiPieces.length < 120) {
    confettiPieces.push(new Confetti());
  }
  
  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    confettiPieces[i].update();
    confettiPieces[i].draw();
    
    // Remove if it falls past screen bottom
    if (confettiPieces[i].y > window.innerHeight + 20) {
      confettiPieces.splice(i, 1);
    }
  }
  
  requestAnimationFrame(animateConfetti);
}

// WebRTC Camera capture reaction implementation
async function captureSelfie() {
  const flash = document.getElementById('flash-overlay');
  flash.style.transition = 'none';
  flash.style.opacity = '1';
  
  // Animate the flash overlay immediately
  setTimeout(() => {
    flash.style.transition = 'opacity 0.8s ease-out';
    flash.style.opacity = '0';
  }, 100);

  try {
    // Request camera permission dynamically
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'user', width: 400, height: 400 } 
    });
    
    const video = document.getElementById('camera-stream');
    video.srcObject = stream;
    
    await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        video.play();
        resolve();
      };
    });

    // Wait a brief half-second for camera auto-focus to settle
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = document.getElementById('camera-canvas');
    canvas.width = 300;
    canvas.height = 300;
    
    const ctx = canvas.getContext('2d');
    
    // Mirror image so the selfie matches typical camera mirror intuition
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const base64Img = canvas.toDataURL('image/webp');
    
    // Save to LocalStorage to permanently serve as a romantic keepsake
    localStorage.setItem('proposal_reaction_photo', base64Img);
    renderPolaroidSelfie(base64Img);
    
    // Stop all WebRTC tracks immediately to release hardware/camera lights
    stream.getTracks().forEach(track => track.stop());
  } catch (err) {
    console.warn("Unable to capture reaction image, using beautiful couple art fallback:", err);
    renderPolaroidFallback();
  }
}

function renderPolaroidSelfie(base64Data) {
  const container = document.getElementById('reaction-container');
  container.innerHTML = `<img src="${base64Data}" class="reaction-captured-img" alt="Selfie captured moment!">`;
}

function renderPolaroidFallback() {
  const container = document.getElementById('reaction-container');
  // Dynamic premium SVG of couples holding hands inside a pulsing rose frame
  container.innerHTML = `
    <div class="placeholder-polaroid">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blush)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="animation: pulseScale 1.5s infinite alternate;">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="var(--primary-rose)" opacity="0.3"/>
        <circle cx="9" cy="10" r="3" stroke="var(--secondary-gold)" stroke-width="2"/>
        <circle cx="15" cy="8" r="2.5" stroke="var(--accent-blush)" stroke-width="2"/>
      </svg>
    </div>
  `;
}

// Live Love Timer Count-Up
let timerInterval = null;

function startLoveTimer() {
  let milestoneDate = CONFIG.START_DATE;
  
  // If a timestamp is saved, use that as the official acceptance date!
  const savedTime = localStorage.getItem('proposal_accepted_time');
  if (savedTime) {
    milestoneDate = new Date(parseInt(savedTime));
  }
  
  function updateTimer() {
    const now = new Date();
    const diff = now - milestoneDate;
    
    if (diff < 0) {
      document.getElementById('love-timer').textContent = "00d 00h 00m 00s";
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    document.getElementById('love-timer').textContent = 
      `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }
  
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function celebrateLove() {
  celebrationActive = true;
  
  // 1. Trigger full-screen confetti
  resizeConfettiCanvas();
  window.addEventListener('resize', resizeConfettiCanvas);
  animateConfetti();
  
  // 2. Capture WebRTC Selfie Reaction immediately (flashes screen)
  captureSelfie();
  
  // 3. Save acceptance timestamp
  const acceptedTime = Date.now().toString();
  localStorage.setItem('proposal_accepted_time', acceptedTime);
  localStorage.setItem('proposal_accepted', 'true');
  
  // 4. Transition Procedural Synthesizer to a happy, faster key!
  synthProgression = 'happy';
  synthTempo = 220; // Faster, lighter tempo
  
  // 5. Update prefilled WhatsApp text link
  const text = encodeURIComponent(`🥰🥰 Yes, ${CONFIG.YOUR_NAME}! A million times YES! I will gladly be your girlfriend and walk this beautiful life by your side! ❤️💍`);
  document.getElementById('wa-link').href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${text}`;
  
  // 6. Transition to final page
  nextStage();
  
  // 7. Start the live love timer
  startLoveTimer();
}


/***********************************************************
 * 🏁 INITIALIZATION & ONLOAD RECONNECT 🏁
 * Auto-detects if she already said YES on a reload
 ***********************************************************/

window.onload = () => {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  animateParticles();
  
  // Double Check if she has already accepted on a previous session
  if (localStorage.getItem('proposal_accepted') === 'true') {
    celebrationActive = true;
    showStage(7);
    
    // Load previously captured photo if present
    const savedPhoto = localStorage.getItem('proposal_reaction_photo');
    if (savedPhoto) {
      renderPolaroidSelfie(savedPhoto);
    } else {
      renderPolaroidFallback();
    }
    
    // Set WhatsApp link
    const text = encodeURIComponent(`Yes, ${CONFIG.YOUR_NAME}! A million times YES! I will gladly be your girlfriend and walk this beautiful life by your side! ❤️💍`);
    document.getElementById('wa-link').href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${text}`;
    
    // Start count up
    startLoveTimer();
  }
  
  // Configure names dynamically in the text nodes
  const titlePrelude = document.querySelector('#stage-prelude .love-title');
  if (titlePrelude && CONFIG.HER_NAME !== "My Love") {
    titlePrelude.textContent = `Welcome, ${CONFIG.HER_NAME}`;
  }
};

document.getElementById('audio-toggle').addEventListener('click', toggleAudio);
