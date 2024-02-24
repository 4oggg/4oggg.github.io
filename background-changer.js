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
  'https://i.ibb.co/SxC4wcC/background.png',
  'https://i.ibb.co/RYq1nnt/background2.png',
  'https://i.ibb.co/ZHz8dxY/background1.png',
  'https://i.ibb.co/3NZRjwv/background3.png',
  'https://i.ibb.co/vhNWtQD/background4.png'
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
