let firstCall = true;

function shutdownAnimation(active){
    if (active) {
        document.getElementById('wrapper').classList.add('shutdown');
        document.getElementById('bigClock').classList.add('glitch');
        document.getElementById('nervClockBody').classList.add('heavy_glitch');
        document.querySelector('#beast').classList.remove('glitch');
        document.getElementById('framing').classList.add('death');
    } else {
        document.getElementById('wrapper').classList.remove('shutdown');
        document.querySelector('#beast').classList.remove('glitch');
        document.getElementById('bigClock').classList.remove('glitch');
        document.getElementById('nervClockBody').classList.remove('heavy_glitch');
        document.getElementById('framing').classList.remove('death');

    }
    
}

function randomFX(mode) {
    if (firstCall) {
        firstCall = false;
        return;
    }
    let randomNum = Math.floor(Math.random() * 4) + 1;
    let extraRandom = Math.floor(Math.random() * 20) + 1;
    if (randomNum == 1 && extraRandom == 20 && mode == 'hard') {
        document.getElementById('wrapper').classList.toggle('inverted');
    }
    if (randomNum == 2) {
        document.getElementById('wrapper').classList.remove('inverted');
        document.getElementById('session').classList.toggle('glitch');
    }
    if (randomNum == 3) {
        document.getElementById('wrapper').classList.remove('inverted');
        document.querySelector('.clocktitleimg').classList.toggle('glitch');
    }
    if (randomNum == 4) {
        document.getElementById('wrapper').classList.remove('inverted');
        document.getElementById('bigClock').classList.toggle('glitch');
        
    }
    if (mode == 'clear') {
        document.getElementById('wrapper').classList.remove('inverted');
        document.getElementById('session').classList.remove('glitch');
        document.querySelector('.clocktitleimg').classList.remove('glitch');
        document.getElementById('bigClock').classList.remove('glitch');
    }

}