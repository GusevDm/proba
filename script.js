var dom = {
    play: document.querySelector(".play"),
    pause: document.querySelector(".pause"),
    repeat: document.querySelector(".repeat"),
    check1: document.querySelector("#check1"),
    check2: document.querySelector("#check2"),
    check3: document.querySelector("#check3"),
    check4: document.querySelector("#check4")
};

let sound1 = document.querySelector(".sound1");
let sound2 = document.querySelector(".sound2");
let sound3 = document.querySelector(".sound3");
let sound4 = document.querySelector(".sound4");
let range = document.querySelector(".range");
let timeStart = document.querySelector(".time-start");
let timeEnd = document.querySelector(".time-end");
let back = document.querySelector(".back");
let forward = document.querySelector(".forward");
let sopranoVolume = document.querySelector(".soprano__volume");
let altVolume = document.querySelector(".alt__volume");
let tenorVolume = document.querySelector(".tenor__volume");
let basVolume = document.querySelector(".bas__volume");


// партии
function partVolume(part, sound) {
    part.addEventListener('input', function() {
        sound.volume = this.value / 100;
    });
}
partVolume(sopranoVolume, sound1);
partVolume(altVolume, sound2);
partVolume(tenorVolume, sound3);
partVolume(basVolume, sound4);

sopranoVolume.addEventListener('input', function() {
    sound1.volume = this.value / 100;
});

altVolume.addEventListener('input', function() {
    sound2.volume = this.value / 100;
});

tenorVolume.addEventListener('input', function() {
    sound3.volume = this.value / 100;
});

basVolume.addEventListener('input', function() {
    sound4.volume = this.value / 100;
});


// 5 секунд
back.addEventListener("click", function() {
    sound1.currentTime = sound1.currentTime - 5;
    synchr();
});

forward.addEventListener("click", function() {
    sound1.currentTime = sound1.currentTime + 5;
    synchr();
});

// громкость
let volume = 0.3;
sound1.volume = volume;
sound2.volume = volume;
sound3.volume = volume;
sound4.volume = volume;


// синхронизация
function synchr() {
    let sin = Math.round(sound1.currentTime);

    sound1.currentTime = sin;
    sound2.currentTime = sin;
    sound3.currentTime = sin;
    sound4.currentTime = sin;
}

// включение воспроизведения
function playAudio() {
    sound1.play();
    sound2.play();
    sound3.play();
    sound4.play();
}

// пауза
function pauseAudio() {
    sound1.pause();
    sound2.pause();
    sound3.pause();
    sound4.pause();
}

// полоса перемотки
range.addEventListener('change', function() {
    rangePosition = Math.round(sound1.duration) / 100 * this.value;
    sound1.currentTime = rangePosition;
    sound2.currentTime = rangePosition;
    sound3.currentTime = rangePosition;
    sound4.currentTime = rangePosition;
});

range.addEventListener('input', function() {
    timeStart.innerHTML = (formatTime(Math.round(sound1.duration) / 100 * this.value));
});

var mouseDown = 0;
range.onmousedown = function() { 
  ++mouseDown;
}
range.onmouseup = function() {
  --mouseDown;
}
range.touchstart= function() { 
  ++mouseDown;
}
range.touchend  = function() {
  --mouseDown;
}

sound1.addEventListener('timeupdate', function() {
    
    if(mouseDown === 0) {
        range.value = 100 /sound1.duration * this.currentTime;
   
        timeEnd.innerHTML = (formatTime(sound1.duration));
      timeStart.innerHTML = (formatTime(sound1.currentTime));
    }
    
});



//время
////форматирование времени
const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);
    
    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);
    
    function addZero(num) {
      return num < 10 ? `0${num}` : num;
    }
    
    return `${minutes}:${seconds}`;
   };

////текущее время
const onPlayerReady = () => {
    let interval;
    const durationSec = sound1.duration;
    
    timeEnd.innerHTML = (formatTime(sound1.duration));

    if (typeof interval !== "undefined") {
      clearInterval(interval);
    }
    
    interval = setInterval(() => {
      
    }, 1000);
};

// общая
function eventPlayPause(sound) {

    sound.loop = true;

    sound.addEventListener('play', function () {
        synchr();
        playAudio();
    });
    
    sound.addEventListener('pause', function () {
        pauseAudio();
        synchr();
    });

    sound.onended = function() {
        synchr();
    };

}


// запуск общ. функции
eventPlayPause(sound1);
eventPlayPause(sound2);
eventPlayPause(sound3);
eventPlayPause(sound4);


// контроллер
dom.play.addEventListener('click', function(){
    dom.play.style.display = "none";
    dom.pause.style.display = "block";

    synchr();
    playAudio();
});

dom.pause.addEventListener('click', function(){
    dom.pause.style.display = "none";
    dom.play.style.display = "block";

    pauseAudio();
    synchr();
});

