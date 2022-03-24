// Init Global Vars

let nervClock;

// Classes
class Timer {
    constructor() {
        this.clockTicking = setInterval(() => {
            let currentDate = new Date();
            let hours = (currentDate.getHours() > 12 ? currentDate.getHours()-12 : currentDate.getHours());
            hours = (hours < 10 ? '0' : '') + hours;
            let minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
            let seconds = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
            let time = hours+':'+minutes+':'+seconds;
            //console.log(time);
            if (!this.paused) {
                document.getElementById("clockHour").innerText = hours;
                document.getElementById("clockMinute").innerText = minutes;
                document.getElementById("clockSecond").innerText = seconds;
            }
        }, 1000);
        this.paused = false;
    }
    
    pause() {
        this.paused = true;
    }
    
    start() {
        this.paused = false;
    }
}

class GUI extends Timer{
    constructor() {
        super();
        this.level = 'normal-10';
        this.meridian = 'AM';
        this.mode = 'clock';
    }
    checkTime(what) {
        let h = new Date();
        h = h.getHours();
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
    drawClock(level, meridian) {
        let wrapper = document.getElementById("wrapper");
        let timeSession = document.getElementById("timeSession");
        wrapper.className = '';
        wrapper.classList.add(level);
        timeSession.src = `src/${meridian}-img.png`;
        console.log(this.checkTime());
    }

}

// Initialized after window loaded
window.onload = function() {
    nervClock = new GUI();
    nervClock.drawClock(nervClock.checkTime('level'),nervClock.checkTime('meridian'));
}