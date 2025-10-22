// Floating background script
const texts = [
  // Chinese characters
  "你好",
  "世界",
  "爱",
  "梦想",
  "希望",
  "美丽",
  "和平",
  "快乐",
  "星星",
  "月亮",
  "太阳",
  "花",
  "心",
  "友谊",
  "自由",
  "澹泊",
  "艺术",
  "诗歌",
  "故事",
  "时光",
  "青春",
  "未来",
  "记忆",
  "沁欢",
  // English words
  "hello",
  "world",
  "love",
  "dream",
  "hope",
  "beautiful",
  "peace",
  "happy",
  "star",
  "moon",
  "sun",
  "flower",
  "heart",
  "friend",
  "free",
  "music",
  "art",
  "poetry",
  "story",
  "time",
  "youth",
  "future",
  "memory",
  "smile",
  // Russian words
  "привет",
  "мир",
  "любовь",
  "мечта",
  "надежда",
  "красота",
  "мир",
  "счастье",
  "звезда",
  "луна",
  "солнце",
  "цветок",
  "сердце",
  "друг",
  "свобода",
  "музыка",
  "искусство",
  "поэзия",
  "история",
  "время",
  "молодость",
  "будущее",
  "память",
  "улыбка",
  // Mongolian script
  "ᠮᠤᠩᠭᠤᠯ",
  "ᠬᠡᠯᠡ",
  "ᠤᠷᠠᠨ",
  "ᠰᠠᠢᠬᠠᠨ",
  "ᠮᠤᠩᠭᠤᠯ",
  "ᠳᠤᠷᠠᠰᠤᠮᠵᠢ",
  "ᠮᠦᠩᠬᠡ",
  "ᠭᠡᠷ",
  "ᠨᠤᠲᠤᠭ",
  "ᠡᠵᠢ",
  "ᠠᠪᠤ",
  "ᠨᠦᠬᠦᠷᠯᠡᠯ",
  "ᠬᠠᠷᠭᠤᠢ",
  "ᠤᠷᠳᠤᠰ",
  "ᠡᠩᠬᠡ",
  "ᠲᠠᠢᠪᠤᠩ",
  "ᠲᠠᠩᠰᠤᠭ",
  "ᠬᠦᠰᠡᠯ",
  "ᠮᠦᠷᠦᠭᠡᠳᠦᠯ",
  "ᠠᠨᠳᠠ",
  "ᠨᠠᠢᠢᠵᠠ",
  // French words
  "amour",
  "rêve",
  "espoir",
  "belle",
  "étoile",
  "lune",
  "soleil",
  "fleur",
  "cœur",
  "liberté",
  "musique",
  "poésie",
  "lumière",
  "bonheur",
  "doux",
  "âme",
  "ciel",
  "mer",
  "vent",
  "nuit",
  "aube",
  "printemps",
  "souvenir",
  "sourire",
  "tendresse",
];

// Function to detect if text contains Mongolian script
function isMongolianScript(text) {
  // Mongolian Unicode range: U+1800 to U+18AF
  const mongolianRegex = /[\u1800-\u18AF]/;
  return mongolianRegex.test(text);
}

// Function to detect if text is English or French (Latin alphabet)
function isLatinScript(text) {
  // Check if text contains primarily Latin characters (English/French)
  // Exclude Chinese, Russian (Cyrillic), and Mongolian
  const latinRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  return latinRegex.test(text);
}

// Function to detect if text is Russian (Cyrillic alphabet)
function isRussianScript(text) {
  // Cyrillic Unicode range
  const cyrillicRegex = /[\u0400-\u04FF]/;
  return cyrillicRegex.test(text);
}

function createFloatingText(initialLoad = false) {
  const container = document.getElementById("floatingBg");
  const text = texts[Math.floor(Math.random() * texts.length)];
  const span = document.createElement("span");

  span.textContent = text;
  span.className = "floating-text";

  // Add vertical class for Mongolian script
  if (isMongolianScript(text)) {
    span.classList.add("mongolian");
  }
  // Add handwriting class for English and French
  else if (isLatinScript(text)) {
    span.classList.add("handwriting");
  }
  // Add Pacifico font for Russian
  else if (isRussianScript(text)) {
    span.classList.add("russian");
  }

  // Random position across entire screen
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  span.style.left = `${startX}%`;
  span.style.top = `${startY}%`;

  // Random animation duration (slower = more peaceful)
  const duration = 18 + Math.random() * 22; // 18-40 seconds (slower = more words on screen)
  span.style.animationDuration = `${duration}s`;

  // Random horizontal drift (more variation)
  const drift = -100 + Math.random() * 200; // -100px to +100px drift
  span.style.setProperty("--float-x", `${drift}px`);

  // Random size variation (but not for Mongolian - it has fixed size in CSS)
  if (!isMongolianScript(text)) {
    const size = 14 + Math.random() * 12; // 14-26px
    span.style.fontSize = `${size}px`;
  }

  // Random rotation amount
  const rotationAmount = -180 + Math.random() * 360;
  span.style.setProperty("--float-rotate-amount", `${rotationAmount}deg`);

  // Randomly choose animation style
  const animationType = Math.random();
  if (animationType > 0.6) {
    span.classList.add("sideways");
    const endX = -100 + Math.random() * window.innerWidth;
    span.style.setProperty("--float-end-x", `${endX}px`);
  } else if (animationType > 0.3) {
    span.classList.add("diagonal");
  }

  // For initial load, use a random starting scale
  if (initialLoad) {
    // Random starting scale between 0.3 and 0.8
    const startScale = 0.3 + Math.random() * 0.5;
    span.style.setProperty("--start-scale", startScale);

    span.classList.add("initial");
  }

  // Random delay before starting
  const delay = initialLoad ? 0 : Math.random() * 5;
  span.style.animationDelay = `${delay}s`;

  container.appendChild(span);

  // Remove element after animation completes
  setTimeout(() => {
    span.remove();
  }, (duration + delay) * 1000);
}

// Create initial floating texts distributed across screen
function initFloatingTexts() {
  const initialCount = 50; // Number of texts to start with (increased from 30)
  for (let i = 0; i < initialCount; i++) {
    setTimeout(() => {
      createFloatingText(true); // Pass true for initial load
    }, i * 80); // Stagger the initial creation (faster)
  }
}

// Continuously create new floating texts
function startFloatingAnimation() {
  initFloatingTexts();

  // Add new text every 1-2.5 seconds (increased frequency)
  setInterval(() => {
    createFloatingText();
  }, 1000 + Math.random() * 1500);
}

// Start when page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startFloatingAnimation);
} else {
  startFloatingAnimation();
}

// Adjust animation on window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Refresh floating texts on resize
    const container = document.getElementById("floatingBg");
    const existingTexts = container.querySelectorAll(".floating-text");
    existingTexts.forEach((text) => text.remove());
    initFloatingTexts();
  }, 250);
});
