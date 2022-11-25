//global functions

let cronPaused = false;
const getId = function(part) {
    return document.getElementById(part);
}

// sounds

let tickingsecs = new Howl({
    src: ['src/sounds/tic.mp3']
});
let alarm = new Howl({
    src: ['src/sounds/ping.mp3']
});
let theBeast = new Howl({
    src: ['src/sounds/the-beast.mp3']
});

let shutdown = new Howl({
    src: ['src/sounds/NervShutdown.mp3']
});

const nervAudio = function(){
    if (tickingsecs.volume() > 0) {
        tickingsecs.volume(0);
        alarm.volume(0);
        theBeast.volume(0);
        shutdown.volume(0);
    // console.log('mute unmute');

    } else {
        tickingsecs.volume(1);
        alarm.volume(1);
        theBeast.volume(1);
        shutdown.volume(1);
    }
}





// Classes
class Timer {
    constructor() {
        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes();
        this.seconds = new Date().getSeconds();
        this.active = true;
        this.ticker = setInterval(() => {
            let currentDate = new Date();
            let hours = (currentDate.getHours() > 12 ? currentDate.getHours()-12 : currentDate.getHours());
            hours = (hours < 10 ? '0' : '') + hours;
            let minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
            let seconds = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;
            let h = hours;
            let m = minutes;
            let s = seconds;
            let ms = 0;
            if (this.active)
            drawMe.draw(h, m, s, ms);
            
            // console.log(this);
        }, 1000);
    }
    pause() {
        this.active = false;
        // console.log('clock: pause');
    }
    
    start() {
        this.active = true;
        // console.log('clock: start');
    }
}

class GUI extends Timer{
    constructor(hours, minutes, seconds, active){
        super(hours, minutes, seconds, active);
    }
    checkTime(what) {
        let h = new Date().getHours();
        // console.log('hours checktime:', h);
        if (what == 'level') {
            console.log('chequeando nivel');
            let dayLevel = parseInt((h / 22)*100)
            console.log('daylevel:',dayLevel);
            return dayLevel;
        }
        if (what == 'meridian') {
            if (h >= 12) {
                return 'PM';
            } else {
                return 'AM';
            }
        }
        
    }
    setVisuals() {
        this.start();
        let meridian = this.checkTime('meridian');
        getId("timeSession").src = `src/${meridian}-img.png`;
    }
    on(){
        this.setVisuals();
    }
    
    
}

class Cronometer {
    constructor() {
        this.timeUpdate;
        this.duration;
        this.setStopwatch;
        this.counter;
        this.paused;
        this.mode;
        this.berserk = false;
        this.active = false;
    }
    start(duration, mode){
        this.active = true;
        let startTime = new Date();    // fetch current time        
        let prev_hours = crono.hours;
        let prev_minutes = crono.minutes;
        let prev_seconds = crono.seconds;
        let prev_milliseconds = crono.milliseconds;
        nervClock.pause();
        console.log(duration);
        if (mode == 'countdown' && !cronPaused) {
            duration = (duration*60)*1000;
            this.duration = duration;
            this.mode = mode;
        } 
        if (mode == 'countdown' && cronPaused) {
            duration = this.duration;
            this.mode = mode;
        }
        
        if (mode == 'cronometer') {
            this.mode = mode;
        } 
        
        this.timeUpdate = setInterval(function () {
            
            let timeElapsed = new Date().getTime() - startTime.getTime();    // calculate the time elapsed in millisecond
            
            if (mode == 'countdown') {
                if (cronPaused) {
                    cronPaused = false;
                    if (!savedCuntdown) {
                        startDateSaved = startTime;
                        savedCuntdown = true;
                    }
                    console.log('%cChupalpico','font-size:50px', cronPaused);
                    console.log('Data saved', startDateSaved);
                    
                } 
                if (!cronPaused) {
                    // console.warn('caquita', cronPaused, duration, timeElapsed,duration-timeElapsed,'saved?',savedCuntdown);
                    timeElapsed = duration - timeElapsed;
                    
                    // console.warn('caquita2',duration, timeElapsed);
                    
                }
                // if (nervCron.timeElapsed > 0) {
                //     timeElapsed = nervCron.timeElapsed;
                // }
                // nervCron.timeElapsed = timeElapsed;
                // console.log('mode countdown', nervCron.timeElapsed);
                if (timeElapsed <= 0) { // Countdown gets to ZERO! (or below)
                    // console.log(nervCron.reset());
                    // console.log('stopped?');
                    if (nervCron.berserk) {
                        shutdown.play();
                        shutdownAnimation(true);
                    }
                    nervCron.reset();
                    return;
                }
                
                // console.log('Countdown:', timeElapsed, nervCron.timeElapsed);
            }
            
            // console.log(timeElapsed);
            
            // calculate hours                
            this.hours = parseInt(timeElapsed / 1000 / 60 / 60)+prev_hours;
            
            // calculate minutes
            this.minutes = parseInt(timeElapsed / 1000 / 60)+prev_minutes;
            if (this.minutes >= 60) this.minutes %= 60;
            
            // calculate seconds
            this.seconds = parseInt(timeElapsed / 1000)+prev_seconds;
            if (this.seconds >= 60) this.seconds %= 60;
            
            // calculate milliseconds 
            this.milliseconds = timeElapsed+prev_milliseconds;
            if (this.milliseconds >= 1000) this.milliseconds %= 1000;
            
            
            // set the stopwatch
            this.hours = (this.hours < 10 ? '0' : '') + this.hours;
            this.minutes = (this.minutes < 10 ? '0' : '') + this.minutes;
            this.seconds = (this.seconds < 10 ? '0' : '') + this.seconds;
            this.milliseconds = this.milliseconds.toString();
            this.milliseconds = Number(this.milliseconds.slice(0, 2));
            
            crono.hours        = parseInt(this.hours);
            crono.minutes      = parseInt(this.minutes);
            crono.seconds      = parseInt(this.seconds);
            crono.milliseconds = parseInt(this.milliseconds);
            
            setStopwatch(this.hours, this.minutes, this.seconds, this.milliseconds);
            
            
        }, 25); // update time in stopwatch after every 25ms
        
        function setStopwatch(hours, minutes, seconds, milliseconds){
            // Minutes in hours, seconds in the minutes, and milliseconds in the seconds
            let realHours = hours;
            let h = minutes;
            let m = seconds;
            let s = milliseconds;
            let ms = s;
            nervCron.counter = (parseInt(h)*60)+parseInt(m);
            drawMe.draw(h, m, s, ms);
            // document.getElementById('pichula').innerText = `${hours}:${minutes}:${seconds}:${milliseconds}`;
            // this.testPichulo = 'cacota mojona';
        }
    }
    stop(){
        
        this.active = false;
        // console.log(crono.hours, crono.minutes , crono.seconds, crono.milliseconds);
        clearInterval(this.timeUpdate);
    }
    reset(){
        theBeast.stop();
        this.active = false;
        nervCron.berserk = false;
        this.stop();
        crono.hours = crono.minutes = crono.seconds = crono.milliseconds = 0;
        drawMe.draw('00', '00', '00', '00');
    }
}

class drawClock {
    constructor(){
        this.count = 0;
        this.countdown = 0;
        
    }
    draw(h, m, s, ms) {
        // console.log(parseInt(h)+parseInt(m)+parseInt(s));
        if (parseInt(h)+parseInt(m)+parseInt(s) == 0) {
            alarm.play();
        }

        let level;
        let duration = nervCron.duration;
        
        let thisHour = document.getElementById('clockHour').innerText;
        if (getId("clockSecond").innerText !== s) {
            // console.log('ping',m);
            // tickingsecs.play();
            if (parseInt(thisHour) <= 0 && nervCron.berserk) {
                randomFX('hard');
            }
                
        }
        if (getId("clockMinute").innerText !== m) {
            // console.log('ping',m);
            let rndrate = 1;

            if (parseInt(thisHour) >= 2 && nervCron.berserk) {
                randomFX('clear');
            }

            if (parseInt(thisHour) <= 2 && nervCron.berserk) {
                randomFX();
            }
            
            if (parseInt(thisHour) <= 0 && nervCron.berserk) {
                rndrate = Math.random(1.5)+0.8;
            }
            // console.log(rndrate,thisHour);
            tickingsecs.rate(rndrate);
            // tickingsecs.play();
            dateTXT.innerText = theDate();
            console.log('Datetxt:', dateTXT.innerText);
            console.log('Date:', theDate());

        }
        if (getId("clockHour").innerText !== h) {
            // console.log('pong',h);
            tickingsecs.play();
        }
        if (nervClock.active && !nervCron.active) {
            level = parseInt((new Date().getHours() / 24)*100);
            // console.log('clock:', nervClock.active);
        } 
        if (nervCron.active && !nervClock.active) {
            if (nervCron.mode == 'cronometer') {
                level = parseInt((nervCron.counter/3600)*100);
            }
            if (nervCron.mode == 'countdown') {
                duration = duration/1000;
                level = parseInt((nervCron.counter/duration)*100);
                // console.log('counter:',nervCron.counter);
                // console.log('level countdown:',level);
            }
            // console.log(nervCron.minutes);
            // console.log('cronometer:', nervCron.active, level);
        }
        if (this.count != parseInt(m)) {
            this.count = parseInt(m);
            // console.log(nervCron.counter);
        }
        
        levelStatus.levelHUD(level);
        getId("clockHour").innerText = h;
        getId("clockMinute").innerText = m;
        getId("clockSecond").innerText = s;
        
    }
}

class powerLevel {
    levelHUD(level){ // 75 is the width in vw for the background.
        let position;
        if (nervCron.active) {
            position = 75 - parseInt(75*(level/100));
        } else {
            position = parseInt(75*(level/100));
        }
        if (position == undefined || isNaN(position)) {
            position = 75;
        }
        getId("wrapper").style = `background-position-x: ${position}vw`;
    }
}
