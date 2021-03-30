
function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    document.getElementById('timeSession').src='src/AM-img.png';
    document.getElementById("wrapper").classList.add('racing');
    document.getElementById("wrapper").classList.remove('normal');
    
    // morning
    if (h > 6) {
        document.getElementById('timeSession').src='src/AM-img.png';
        document.getElementById("wrapper").classList.add('normal-10');
        document.getElementById("wrapper").classList.remove('racing');
    }

// noon
    if (h >= 12) {
        document.getElementById('timeSession').src='src/PM-img.png';
        document.getElementById("wrapper").classList.add('normal-25');
        document.getElementById("wrapper").classList.remove('racing');
    }

// afternoon
if (h > 15) {
    document.getElementById('timeSession').src='src/PM-img.png';
    document.getElementById("wrapper").classList.add('normal-50');
    document.getElementById("wrapper").classList.remove('racing');
}
// night
    if (h > 17) {
        document.getElementById('timeSession').src='src/PM-img.png';
        document.getElementById("wrapper").classList.add('normal-75');
        document.getElementById("wrapper").classList.remove('racing');
    }
// ultranight
    if (h > 22) {
        document.getElementById('timeSession').src='src/PM-img.png';
        document.getElementById("wrapper").classList.add('racing');
        document.getElementById("wrapper").classList.remove('normal');
    }
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
    }

    if(h > 6 && h < 12 ) {
        
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    
    // document.getElementById("bigClock").innerText = time;
    // document.getElementById("bigClock").textContent = time;
    document.getElementById("clockHour").innerText = h;
    document.getElementById("clockHour").textContent = h;
    document.getElementById("clockMinute").innerText = m;
    document.getElementById("clockMinute").textContent = m;
    document.getElementById("clockSecond").innerText = s;
    document.getElementById("clockSecond").textContent = s;
    
    setTimeout(showTime, 1000);
    
}

showTime();
