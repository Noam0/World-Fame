const playButton = document.getElementById('Play');
const howToPlay = document.getElementById('howToPlayButton');
const ranking = document.getElementById('rankingButton');

playButton.addEventListener('click' , showGamePlate);

function showGamePlate() {
    const menuOverlay = document.getElementsByClassName('overlay');
    for (let i = 0; i < menuOverlay.length; i++) {
        menuOverlay[i].style.display = 'none';
    }

    const menuContainr = document.getElementsByClassName('menu-container');
    for (let i = 0; i < menuContainr.length; i++) {
        menuContainr[i].style.display = 'none';
    }

    const gamePlate = document.getElementById('gamePlate');
gamePlate.style.display = 'grid'

    
}