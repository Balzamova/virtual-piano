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


btnNotes.addEventListener('click', switchOnNotes);

btnLetters.addEventListener('click', switchOnLetters);

fullScreenBtn.addEventListener('click', () => {
    requestFullScreen(document.body);
})

fullScreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
});