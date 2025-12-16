function preloadImages(array, callback) {
  let loaded = 0;
  const toLoad = array.length;

  array.forEach((src) => {
    const img = new Image();
    img.onload = () => {
      loaded++;
      if (loaded === toLoad) callback();
    };
    img.src = src;
  });
}

const backgrounds = [
  'images/bg1.png',
  'images/bg2.png',
  'images/bg3.png',
  'images/bg4.png',
  'images/bg5.png',
  'images/bg6.png',
  'images/bg7.png',
  'images/bg8.png',
  'images/bg9.png',
  'images/bg10.png',
  'images/bg11.png'
];

let current = 0;
let bg1 = document.getElementById('bg1');
let bg2 = document.getElementById('bg2');
bg1.style.opacity = '1'; // Start first background fully visible
bg2.style.opacity = '0'; // Second background ready but not visible

// Function to handle background change
function changeBackground() {
  const nextIndex = (current + 1) % backgrounds.length;
  const nextBg = backgrounds[nextIndex];

  if (bg1.style.opacity == '1') {
    bg2.style.backgroundImage = `url(${nextBg})`;
    bg2.style.opacity = '1';
    bg1.style.opacity = '0';
  } else {
    bg1.style.backgroundImage = `url(${nextBg})`;
    bg1.style.opacity = '1';
    bg2.style.opacity = '0';
  }

  current = nextIndex;
}

// Preload images and start the background change cycle
preloadImages(backgrounds, () => {
  bg1.style.backgroundImage = `url(${backgrounds[0]})`;
  setInterval(changeBackground, 10000); // Change background every 10 seconds
});
