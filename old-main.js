

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    document.getElementById('timeSession').src='src/AM-img.png';
    //console.log(h,m,s)
    // morning
    // 10%
    if (h >= 6 && h < 15) {
        document.getElementById('timeSession').src='src/AM-img.png';
        document.getElementById("wrapper").classList.add('normal-10');
        document.getElementById("wrapper").classList.remove('racing');
    }

    // noon
    // 25%
    if (h >= 15 && h < 17) {
        document.getElementById('timeSession').src='src/PM-img.png';
        document.getElementById("wrapper").classList.add('normal-25');
        document.getElementById("wrapper").classList.remove('normal-10');
    }

    // afternoon
    // 50%
    if (h >= 17 && h < 20) {
        document.getElementById('timeSession').src='src/PM-img.png';
        document.getElementById("wrapper").classList.add('normal-50');
        document.getElementById("wrapper").classList.remove('normal-25');
    }
    
    // night
    // 75%
    if (h >= 20 && h < 22) {
        document.getElementById('timeSession').src='src/PM-img.png';
        document.getElementById("wrapper").classList.add('normal-75');
        document.getElementById("wrapper").classList.remove('normal-50');
        
    }
    
    // ultranight
    // racing! 100%!!
    if (h >= 22 && h < 6) {
        document.getElementById('timeSession').src='src/PM-img.png';
        document.getElementById("wrapper").classList.add('racing');
        document.getElementById("wrapper").classList.remove('normal-75');
    }
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    
    document.getElementById("clockHour").innerText = h;
    document.getElementById("clockHour").textContent = h;
    document.getElementById("clockMinute").innerText = m;
    document.getElementById("clockMinute").textContent = m;
    document.getElementById("clockSecond").innerText = s;
    document.getElementById("clockSecond").textContent = s;
    setTimeout(showTime, 1000);
}



showTime();

