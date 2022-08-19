const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const rangeElems = [...document.querySelectorAll('[type = "range"]')];

msg.text = document.querySelector('[name = "text"]').value;

console.log(msg.text);

function populateVoices(){
    voices = this.getVoices().slice(0,10);
    console.log(voices);

    const voiceOptions = voices
        .map(voice => `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`)
        .join('');
    
    voicesDropdown.innerHTML = voiceOptions;
    
}

function setVoice() {
    // The msg's voice would be a speechSynthesisVoice object
    msg.voice = voices.find(voice => voice.name === this.value);
    // When voice is changed we cancel the current speech and speak with the new voice
    toggle();
}

function toggle(startOver = true){
    speechSynthesis.cancel();
    if (startOver){
        speechSynthesis.speak(msg);
    }
}

function pauseSpeech() {
    speechSynthesis.pause();
}

function changeRange() {
    console.log(this);
    msg[this.name] = document.querySelector(`[name = ${this.name}]`).value;
    toggle();
}

function setText(){
    console.log(this);
    msg.text = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change',setVoice);
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', pauseSpeech);

// For rate and pitch
rangeElems.forEach(range => {
    range.addEventListener('change', changeRange);
});

options[2].addEventListener('change', setText);