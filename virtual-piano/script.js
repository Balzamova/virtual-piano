const buttons = document.querySelectorAll('.btn');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const keysSharp = document.querySelector('.keys-sharp');
const sharp = document.querySelectorAll('.sharp');

const fullScreenBtn = document.querySelector('.fullscreen');

const dataLetters = ['D', 'F', 'G', 'H', 'J', 'K', 'L', 'R', 'T', 'U', 'I', 'O'];
const dataNotes = ['c', 'd', 'e', 'f', 'g', 'a', 'b', 'c♯', 'd♯', 'f♯', 'g♯', 'a♯'];

let clickPianoKey = false;

const switchOnNotes = () => {
    btnNotes.classList.add('btn-active');
    btnLetters.classList.remove('btn-active');

    pianoКeys.forEach((el) => {
        el.classList.remove('piano-key-letter');
    });
}

const switchOnLetters = () => {
    btnNotes.classList.remove('btn-active');
    btnLetters.classList.add('btn-active');

    pianoКeys.forEach((el) => {
        el.classList.add('piano-key-letter');
    });
}

const playAudio = (src) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

const requestFullScreen = (element) => {
    var requestMethod = element.requestFullScreen
        || element.webkitRequestFullScreen
        || element.mozRequestFullScreen
        || element.msRequestFullScreen;

    if (requestMethod) {
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

const addClassesForKeysOnMouse = (event) => {
    if (event.target.classList.contains('piano-key')) {
        pianoКeys.forEach((el) => {
            if (el.classList.contains('piano-key-active')) {
                el.classList.remove('piano-key-active');
            }
        });
        event.target.classList.add('piano-key-active');
    }

    if (event.target.classList.contains('piano-key')) {
        const note = event.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
    }
}


btnNotes.addEventListener('click', switchOnNotes);

btnLetters.addEventListener('click', switchOnLetters);

fullScreenBtn.addEventListener('click', () => {
    requestFullScreen(document.body);
})

fullScreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
});

piano.addEventListener('mousedown', (event) => {
    clickPianoKey = true;

    addClassesForKeysOnMouse(event);
});

window.addEventListener('mouseup', (event) => {
    clickPianoKey = false;

    if (event.target.classList.contains('piano-key')) {
        pianoКeys.forEach((el) => {
            el.classList.remove('piano-key-active');
        });
    }
})

piano.addEventListener('mouseover', (event) => {
    if (!clickPianoKey) return;
    addClassesForKeysOnMouse(event);
});

window.addEventListener('keydown', (event) => {    
    let repeat = event.repeat; 

    if (!repeat) {
            const eventCode = event.code; 
            const eventLetter = eventCode.split('').slice(eventCode.length - 1).join(''); 
            const someKey = document.querySelector(`.piano-key[data-letter='${eventLetter}']`); 
        
            const indexLetter = dataLetters.indexOf(eventLetter);
            const note = dataNotes[indexLetter];
            const src = `assets/audio/${note}.mp3`;

            if (dataLetters[indexLetter] !== eventLetter) return; 

            someKey.classList.add('piano-key-active'); 
            
            playAudio(src);
    }
});

window.addEventListener('keyup', () => {
    pianoКeys.forEach((el) => { 
        el.classList.remove('piano-key-active');
    });

    clickPianoKey = false;
});