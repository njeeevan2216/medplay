let isEqOpen = false;
let blurEq = document.getElementById("blur");
let eqHolder = document.getElementById("eq-holder");
function eqbtn() {
    
    if(isEqOpen){
        blurEq.style.display = "none";
        eqHolder.style.display = "none";
        isEqOpen = false;
    }
    else {
        blurEq.style.display = "block";
        eqHolder.style.display = "flex";
        isEqOpen = true;
    }
}

const audio = document.getElementById('audio-player');
const context = new AudioContext();
const source = context.createMediaElementSource(audio);

// Create filters
const bass = context.createBiquadFilter();
bass.type = 'lowshelf';
bass.frequency.value = 60; // Adjust for bass

const lowMid = context.createBiquadFilter();
lowMid.type = 'peaking';
lowMid.frequency.value = 250; // Low mid frequencies

const mid = context.createBiquadFilter();
mid.type = 'peaking';
mid.frequency.value = 500; // Mid frequencies

const highMid = context.createBiquadFilter();
highMid.type = 'peaking';
highMid.frequency.value = 1000; // High mid frequencies

const treble = context.createBiquadFilter();
treble.type = 'highshelf';
treble.frequency.value = 2000; // Treble

const presence = context.createBiquadFilter();
presence.type = 'peaking';
presence.frequency.value = 4000; // Presence

const brilliance = context.createBiquadFilter();
brilliance.type = 'peaking';
brilliance.frequency.value = 8000; // Brilliance

const air = context.createBiquadFilter();
air.type = 'highshelf';
air.frequency.value = 16000; // Air

// Connect nodes
source.connect(bass);
bass.connect(lowMid);
lowMid.connect(mid);
mid.connect(highMid);
highMid.connect(treble);
treble.connect(presence);
presence.connect(brilliance);
brilliance.connect(air);
air.connect(context.destination);

// Reset EQ
function reset() {
    document.getElementById('bass').value = 0;
    document.getElementById('lowMid').value = 0;
    document.getElementById('mid').value = 0;
    document.getElementById('highMid').value = 0;
    document.getElementById('treble').value = 0;
    document.getElementById('presence').value = 0;
    document.getElementById('brilliance').value = 0;
    document.getElementById('air').value = 0;
    bass.gain.value = 0;
    lowMid.gain.value = 0;
    mid.gain.value = 0;
    highMid.gain.value = 0;
    treble.gain.value = 0;
    presence.gain.value = 0;
    brilliance.gain.value = 0;
    air.gain.value = 0;
}

// EQ Controls
document.getElementById('bass').addEventListener('input', (e) => {
    bass.gain.value = e.target.value;
});

document.getElementById('lowMid').addEventListener('input', (e) => {
    lowMid.gain.value = e.target.value;
});

document.getElementById('mid').addEventListener('input', (e) => {
    mid.gain.value = e.target.value;
});

document.getElementById('highMid').addEventListener('input', (e) => {
    highMid.gain.value = e.target.value;
});

document.getElementById('treble').addEventListener('input', (e) => {
    treble.gain.value = e.target.value;
});

document.getElementById('presence').addEventListener('input', (e) => {
    presence.gain.value = e.target.value;
});

document.getElementById('brilliance').addEventListener('input', (e) => {
    brilliance.gain.value = e.target.value;
});

document.getElementById('air').addEventListener('input', (e) => {
    air.gain.value = e.target.value;
});

// Start AudioContext on user interaction
audio.addEventListener('play', () => {
    if (context.state === 'suspended') {
        context.resume();
    }
});
