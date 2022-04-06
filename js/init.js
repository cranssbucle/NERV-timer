// Init Global Vars

let nervClock;
let nervCron;
let drawMe;
let hourlyRefresh;
let init;
let crono = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
}
let theTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    meridian: 'AM'
}

// Initialized after window loaded
window.onload = function() {
    init = function() {
        nervClock = new GUI();
        nervClock.on();
    }
    nervCron = new Cronometer();
    drawMe = new drawClock();
    levelStatus = new powerLevel();
    init();
}
