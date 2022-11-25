const audioButton = document.querySelector('.audio_control');

const startCronometer = document.getElementById('start-cron');
const startCountdown = document.getElementById('start-count');
const reset = document.getElementById('reset');
const beast = document.getElementById('beast');
const clock = document.getElementById('bigClock');


const resetButtons = function(){
    shutdownAnimation(false);
    tickingsecs.play();
    (document.querySelectorAll(".bottombox")).forEach((el) => el.classList.remove("active"));
    startCronometer.innerText = 'START';
    startCountdown.innerText = 'COUNT';
    reset.innerText = 'RESET';
    beast.innerText = 'RACING';
}
let cronActive = false;


// Controls


audioButton.addEventListener('click', function(){
    nervAudio();
    let buttonImg = document.querySelector('.audio_control img');
    if (tickingsecs.volume() == 0) {
        buttonImg.src = 'images/audio-off.svg';
    } else {
        buttonImg.src = 'images/audio-on.svg';
    }
    audioButton.classList.toggle('active');
}, false);


startCronometer.addEventListener('click', function(){
    resetButtons();
    if (!cronActive || nervCron.berserk) {
        nervCron.reset();
        nervClock.active = false;
        console.log(nervClock.active,' inactivo?')
        nervCron.start(0, 'cronometer');
        cronActive = true;
        this.innerText = 'PAUSE';
        startCountdown.innerText = 'COUNT';
    } else {
        nervCron.stop();
        this.innerText = 'START';
        cronActive = false;
    }
    this.classList.add('active');
    
}, false);

// Controls

beast.addEventListener('click', function(){
    resetButtons();
    this.classList.add('glitch');
    console.error(`
    .,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, *  . ,,,.,,.,,.......................                               
    .,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,./.   .,,,,,,,,,.....................                                
    ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, *              ...,,,...,..........                                  
    ,*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                         ,.,,,,,,,..                                    
    ,******,,*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,./*******//*/**.////         ,,,,,,,                                      
    ,,**,******,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*******/*****  .     */       .,,,                                        
    ,***************,**,,,*,,,,,,,,,,,,,,,,,,,,,,,,              @@@@@@@@.  /                                                 
    ,*******************,,,,**,,,,,,,,,,,,,,,,,,,. .//*.         ./&@@@@@@  *//                                               
    ,*********/%%%#.***************,,,,,*,,,,,,,, /*/******//*    .     .            .                                        
    ,**********%%%%%%%%( ,********,,,,,,,,*,*,,,****,////*,*/*****//*.             .    .                                     
    ,*********,%%%%%%%%%     .*************,,*,,*/.,,.///*,**,.//***/****/ */, .     .   .                                    
    ,/********,%%%%%%%%/        .*********,***.///.,,.,*,,,,,,    ,*/.*/**////*.///.    */.                                   
    ,/********,%%%%%%%%           ***********./****,,////.,,,      //,,,*//,./****/*//.                                       
    *///////*/,%%%%%%%(          ..************,,*/**.   %/#%..*%, ///// ,//,.%%%.(%%%%#,.    ...  .                          
    */////////*%%%%%%%             ****************,/.,@@@@@@@@@%#///,    /*,,#...,,,,....%% ,.  ....                         
    /((((//////%%%%%%%             ************,(%%(..*#@#@@@( @@@%@&#%%%*///,*%           (  ./**// ..                       
    /((((((((((%%%%%%,            . ***//***.%%%...,,..  ,%#%%(## /@@*@@&/%%# /*///////////*   .*////**/...                   
    /((((((((((%%%%%%               ///   .%%*.,,.      . ... .&        *.&   // //***///*//,   ./*///***/*/          ..  ... 
    /##((((((((%%%%%*               * .....#%#     */*****/,.,.(@.%*,&%,@%       *//***,       . .*////////**,      ..........
    /#######(((%%%%%               ,/**///*//.//,./**////**%%%#%@#&@&&//,*/,.        /,       ....*////////     . ............
    (##########%%%%,              ///////////////////*///.@%@@@%@@@@@,.//*/,,             ........./,//,    ........... ......
    (###########%%%               //*//////////////////.,.@@@@@**&/,, ///,/,*,**  *      ....  ....,//, ....................,,
    (########/*#%%                   ////////*/.. ////,/,,,. ,,,  //**.,,,*,*,**  **,       *...   .*/ .............,.....,.,,
    */*********(%.                   .,***. .******,   /,/,/.   , ////,,,./,****  ****.      */*...   ..............,,,,..,,,,
    ,**********                      . **********,     ,/,**,.*,,*.//*,,/.******  *****,      .///*... .....,,,,,,,,,,,,.,,,**
    ,********,*                       .*******,,         /*/.,,*,,,,,,,.,*******, *******       //*//...  ...     .,,,,,. ****
    ,**********                       ..*****,          ,*******,*,****(********  ********       //////*... .... .  . ,*, *,  
    ,**********                       . ****            ///******//*/.*********  **********       .////  **....  .    ..      
    .,,,*******.                       .**              ##//////*/,***********  ************.         * .//////,...  .....    
    .,*********.                       .                %%///////**********  .******************/.       ///////////,..  ...  
    .,*****,,,..                       .               .%%(////(**********  *************************                  ,  ....
    .,,*,.....                          .             ,%%%%///*,********** ,***********************,  *******    *////////////
     .....                              .            /*%%%%*/*.**********, **********************  .************  /*//////////
    ....                                ..          //%%%%%#*.. *********  ***********           *****************, ,/////////
                                         .         */,%%%%/** ** ******** ********/               *******************   ,*////
                         ............    .     ./    #%%,****. * ,******. ******       ..               .***************      
                      ////,.......        .  .//  **********,  *. *****, ,**/      /////*//*,.......           ***********.
    `);
    nervCron.reset();
    nervClock.active = false;
    theBeast.play();
    nervCron.start(5, 'countdown');
    cronActive = true;
    nervCron.berserk = true;
    this.classList.add('active');
    
}, false);

startCountdown.addEventListener('click', function(){
    
    resetButtons();
    nervCron.reset();
    cronActive = false;
    duration = window.prompt('Set minutes: ', 5);
    console.log('duration',duration);
    
    if (duration < 1) {
        window.alert('Default to 1 minute');
        duration = 1;
    }
    if (isNaN(duration)  || duration === null ) {
        if (!cronPaused) {
            window.alert(`Incorrect number format, "${duration}" is not acceptable.`);
            nervCron.reset();
            nervClock.start();
            return;

        }
    } 
    if (duration > 60) {
        window.alert('More than an hour visuals not yet implemented.');
        nervCron.reset();
        nervClock.start();
        return;
    }
    nervCron.reset();
    nervCron.start(duration, 'countdown');
    this.classList.add('active');

}, false);

reset.addEventListener('click', function(){
    if (nervClock.active) {
        return;
    }
    nervCron.reset();

    resetButtons();
    this.classList.add('active');

    cronActive = false;
    setTimeout(() => {
        this.classList.remove('active');
    }, 1000);
}, false);

clock.addEventListener('click', function(){
    nervCron.reset();
    nervClock.start();
    savedCuntdown = false;
    resetButtons();
    cronActive = false;
}, false);

