const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const endOverlay = document.querySelector('.end');
const pontuationElement = document.querySelector('.pontuation h1');

let isJumping = false; 
let isGameOver = false; 

const jump = () => {
    if (!isJumping && !isGameOver) {
        isJumping = true; 
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
            isJumping = false; 
        }, 500);
    }
};

let pontuation = 0; 
const updatePontuation = () => {
    pontuation++;
    pontuationElement.textContent = `Pontuation: ${pontuation}`;
};

const checkCollision = () => {
    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();
    const cloudsRect = clouds.getBoundingClientRect();

    if (
        marioRect.left + marioRect.width > pipeRect.left &&
        marioRect.left < pipeRect.left + pipeRect.width &&
        marioRect.bottom > pipeRect.top &&
        marioRect.top < pipeRect.bottom
    ) {
        pipe.style.animation = 'none';
        mario.style.animation = 'none';

        pipe.style.left = `${pipeRect.left}px`;

        mario.style.bottom = `${mario.height}px`; 

        mario.src = 'images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '55px';

        clearInterval(loop);
        endOverlay.style.visibility = 'visible';
        document.removeEventListener('keydown', handleKeyPress);
        isGameOver = true; 

        pontuationElement.parentElement.classList.add('blink');
        endOverlay.classList.add('blink');
    }
};

const loop = setInterval(() => {
    if (!isGameOver) {
        checkCollision();
        updatePontuation();
    }
}, 10);

const handleKeyPress = (event) => {
    if (event.keyCode === 32) {
        jump();
    }
};

document.addEventListener('keydown', handleKeyPress);

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32 && isGameOver) {
        location.reload();
    }
});
