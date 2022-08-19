const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name = "text"]').value;

console.log(msg.text);

function populateVoices(){
    voices = this.getVoices().slice(0,5);
    console.log(voices);

    const voiceOptions = voices
        .map(voice => `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`)
        .join('');
    
    voicesDropdown.innerHTML = voiceOptions;
    
}

function speakUp(){
    // speechSynthesis.paused = false;
    console.log(msg);
    speechSynthesis.speak(msg);
    console.log(speechSynthesis);
}


function setVoice() {
    console.log(`Changing voices`, this.children[0].value, msg.voice);
    // The msg's voice would be a speechSynthesisVoice object
    msg.voice = voices.find(voice => voice.name === this.value);
    console.log(msg.voice);
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change',setVoice);
speakButton.addEventListener('click', speakUp);
stopButton.addEventListener('click', speechSynthesis.pause());