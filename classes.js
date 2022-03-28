//global functions

const getId = function(part) {
    return document.getElementById(part);
}

let theDate = new Date();

// Classes
class Timer {
    constructor() {
        this.hours = theDate.getHours();
        this.minutes = theDate.getMinutes();
        this.seconds = theDate.getSeconds();
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
    }
    
    start() {
        this.active = true;
    }
}

class GUI extends Timer{
    constructor(hours, minutes, seconds){
        super(hours, minutes, seconds);
    }
    checkTime(what) {
        let h = new Date().getHours();
        // console.log('hours checktime:', h);
        // morning - 06:00 to 14:59
        if (what == 'level') {
            if (h >= 6 && h < 15) {
                return 'normal-10';
            }
    
            // noon 25% - 15:00 to 16:59
            if (h >= 15 && h < 17) {
                return 'normal-25';
            }
    
            // afternoon 50% - 17:00 to 19:59
            if (h >= 17 && h < 20) {
                return 'normal-50';
            }
            
            // night 75% - 20:00 to 21:59
            if (h >= 20 && h < 22) {
                return 'normal-75';
            }
            
            // ultranight racing! 100%!!
            if (h >= 22 && h < 6) {
                return 'racing';
            }
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
        let level = this.checkTime('level');
        let meridian = this.checkTime('meridian');
        getId("wrapper").className = '';
        getId("wrapper").classList.add(level);
        getId("timeSession").src = `src/${meridian}-img.png`;
        // console.log(level, meridian);
        // drawMe(this.clockTicking.h)
    }
    on(){
        this.setVisuals();
    }
    

}

class Cronometer {
    constructor() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.timeUpdate;
        this.setStopwatch;
    }
	start(){
        let startTime = new Date();    // fetch current time        
        let prev_hours = crono.hours;
        let prev_minutes = crono.minutes;
        let prev_seconds = crono.seconds;
        let prev_milliseconds = crono.milliseconds;
        nervClock.pause();
        this.timeUpdate = setInterval(function () {
            var timeElapsed = new Date().getTime() - startTime.getTime();    // calculate the time elapsed in millisecond
            
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
            drawMe.draw(h, m, s, ms);
            // document.getElementById('pichula').innerText = `${hours}:${minutes}:${seconds}:${milliseconds}`;
            // this.testPichulo = 'cacota mojona';
        }
    }
    stop(){
        console.log(crono.hours, crono.minutes , crono.seconds, crono.milliseconds);
        clearInterval(this.timeUpdate);
    }
    reset(){
        this.stop();
        crono.hours = crono.minutes = crono.seconds = crono.milliseconds = 0;
        drawMe.draw('00', '00', '00', '00');
    }
}

class drawClock {
    // constructor(){
    //     this.level = level;
    //     this.meridian = meridian;
    //     this.hours = h;
    //     this.minutes = m;
    //     this.seconds = s;
    //     this.milliseconds = ms;

    // }
    draw(h, m, s, ms) {
        getId("clockHour").innerText = h;
        getId("clockMinute").innerText = m;
        getId("clockSecond").innerText = s;
        // console.log('TIME:', h, m, s, ms);

    }
}
