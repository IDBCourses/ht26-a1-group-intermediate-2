/*
 * IDB Programming: A1 Modelling — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — applies the state to make sound every 100ms, if necessary
 *   controls — what happens when a key goes down or comes up
 *   setup    — starts everything
 *
 * There is no loop in this assignment. Nothing happens until the player presses
 * a key, and every key event follows the same two steps:
 *   1. update: change the state, based on which key it was
 *   2. use:    make sound from the state
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

// ---------- Settings ----------
// Settings variables should contain all of the "fixed" parts of your programs
// For example: which key does what, which notes you can play, the tempo.

//List of notes for the left side grid of keyboard --> lower octave for bass
let bassnotes = ["B3", "C4", "D4", "E5", "F4", "G4", "A4", "B4", "C5"];

let bassKeys = ["1", "2", "3", "q", "w", "e", "a", "s", "d"];

//List of notes for the right side grid of keyboard --> higher octave for higher notes
let highnotes = ["D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6"];

let highKeys = ["7", "8", "9", "u", "i", "o", "j", "k", "l"];

// Key to start the loop
let noteKey = "b";

let knobSettingsNames = [
  "distortion",
  "reverb - decay",
  "reverb - wet",
  "vibrato",
  "bitcrusher",
];

let currentIndex = 0;
let knobMode;
// melody for the loop
let melody = [
  "C4",
  "D4",
  "A4",
  "C4",
  "D4",
  "A4",
  "C4",
  "D4",
  "A4",
  "G4",
  "E4",
  "D4",
  "E4",
  "C4",
  "A3",
  "E4",
  "G#4",
  "B4",
  "C5",
  "B4",
  "A4",
  "A4",
  "G4",
  "E4",
];

// Chords to add some spice
let chords = [
  ["A3", "C4", "E4"],
  ["F3", "A3", "C4"],
  ["D3", "F3", "A3"],
  ["G3", "B3", "D4"],
  ["A3", "C4", "E4"],
  ["E3", "G#3", "B3"],
  ["A3", "C4", "E4"],
  ["A3", "C4", "E4"],
];

// Keyboard buttons for the knob
const knob = ["f", "v", "c"];

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.

let bPress = false; // Condition to check if "b" is pressed;
let mute = false; // Mute condtion for "toggle" feature when pressing "b"
// Knob settings value
let knob_floats = [0.0, 0.1, 0.0, 0.0, 16.0];
let previous_knob_button = "";
let distortion_meter = 0;
let reverb_decay = 0.1;
let reverb_wet = 0;
let vibrato_frequency = 1;
let bitcrusher_bits = 16;

let listOfNotes = []; //list of keys pressed during the loop recording
let loopTimes = []; //list of starting times of the key presses
let loopNotes = [];
let startTime = null;

let loopKey = " "; //loop playback activated by spacebar

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const crusher = new Tone.BitCrusher().toDestination();
const vibrato = new Tone.Vibrato().connect(crusher);
const reverb = new Tone.Reverb().connect(vibrato);
const dist = new Tone.Distortion(distortion_meter).connect(reverb);
const synth = new Tone.PolySynth(Tone.Synth).connect(dist); //Default synth for Bass and High

// Monosynth for Melody
const melodySynth = new Tone.PolySynth(Tone.MonoSynth, {
  oscillator: {
    type: "sawtooth",
  },
  envelope: {
    attack: 0.005,
    decay: 0.15,
    sustain: 0.3,
    release: 0.2,
  },
  filterEnvelope: {
    attack: 0.005,
    decay: 0.2,
    sustain: 0.15,
    release: 0.2,
    baseFrequency: 200,
    octaves: 3,
  },
}).connect(dist);

const chordsynth = new Tone.PolySynth(Tone.Synth).connect(dist); // Polysynth for chords

synth.volume.value = -7; // adjust bass and high volume
melodySynth.volume.value = -2; // adjust melody volume
chordsynth.volume.value = -6; // adjust chord volume

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Extra variable unnecessary but clearer
  distortion_meter = knob_floats[0];
  dist.distortion = distortion_meter;

  reverb_decay = knob_floats[1];
  reverb.decay = reverb_decay;

  reverb_wet = knob_floats[2];
  reverb.wet.value = reverb_wet;

  vibrato_frequency = knob_floats[3];
  vibrato.frequency.value = vibrato_frequency;

  bitcrusher_bits = knob_floats[4];
  crusher.bits.value = bitcrusher_bits;
  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use() {
  setTimeout(use, 100); // call use() again in 100 milliseconds
}

//Melody and chord - Author: AS7432 -
function melodyAndChords() {
  const now = Tone.now();

  // Checks if "b" is pressed. The code below will not run if "b" isn't pressed
  if (bPress) {
    return;
  }
  bPress = true;
  // A loop to play the notes through the arrays
  for (let i = 0; i < melody.length; i++) {
    melodySynth.triggerAttackRelease(melody[i], "8n", now + i * 0.5); // plays the melody
  }
  for (let i = 0; i < chords.length; i++) {
    chordsynth.triggerAttackRelease(chords[i], 1, now + i * 1.5); // plays the chord,
  }
  // Timeout "b" for x seconds so that it cannot be pressed again to avoid overlapping audio
  setTimeout(function () {
    bPress = false;
    if (mute == false) {
      melodyAndChords();
    }
  }, 12000); // 12000 because the melody and chords are 12 seconds long
}

//bassAndHigh function - plays the notes connected to the keys on our 2 grids
//author: ar5929
function bassAndHigh(event) {
  const now = Tone.now();
  //left side 3*3 grid keyboard - bass notes
  for (let i = 0; i < bassKeys.length; i++) {
    if (event.key === bassKeys[i]) {
      synth.triggerAttackRelease(bassnotes[i], "8n", now);
      console.log(bassnotes[i]);
    }
  }

  //right side 3*3 grid keyboard - high notes
  for (let i = 0; i < highKeys.length; i++) {
    if (event.key === highKeys[i]) {
      synth.triggerAttackRelease(highnotes[i], "8n", now);
      console.log(highnotes[i]);
    }
  }
}

// Knob
function knob_interact(event) {
  // Checksh if pressed buttons match with the knob arrays buttons
  for (const [i, letter] of knob.entries()) {
    if (event.key === letter) {
      let previous_button_i = knob.indexOf(previous_knob_button);
      console.clear();
      /*console.log(knob_floats[0]);
      console.log(knob_floats[1]);
      console.log(knob_floats[2]);*/

      // turn knob up
      if (
        (i > previous_button_i &&
          (i !== knob.length - 1 || previous_button_i !== 0)) ||
        (i === 0 && previous_button_i === knob.length - 1)
      ) {
        if (currentIndex == 0 || currentIndex == -1) {
          //distortion
          knob_floats[0] += 0.05;
        } else if (currentIndex == 1) {
          //reverb decay
          knob_floats[1] += 0.5;
        } else if (currentIndex == 2) {
          //reverb wet (not allowed to go over 1)
          knob_floats[2] = Math.min(1, knob_floats[2] + 0.1);
        } else if (currentIndex == 3) {
          //vibrato
          knob_floats[3] += 0.5;
        } else if (currentIndex == 4) {
          //BitCrusher must be in between 1 and 16
          knob_floats[4] = Math.min(16, knob_floats[4] + 1);
        }

        // turn knob down
      } else if (
        (i < previous_button_i &&
          (i !== 0 || previous_button_i !== knob.length - 1)) ||
        (i === knob.length - 1 && previous_button_i === 0)
      ) {
        if (currentIndex == 0) {
          //distortion (shouldn't get under 0)
          knob_floats[0] = Math.max(0, knob_floats[0] - 0.05);
        } else if (currentIndex == 1) {
          //reverb decay (not allowed to be <=0)
          knob_floats[1] = Math.max(0.1, knob_floats[1] - 0.5);
        } else if (currentIndex == 2) {
          //reverb wet (not allowed to be under 0)
          knob_floats[2] = Math.max(0, knob_floats[2] - 0.1);
        } else if (currentIndex == 3) {
          //vibrato can't be under 0
          knob_floats[3] = Math.max(0, knob_floats[3] - 0.5);
        } else if (currentIndex == 4) {
          //BitCrusher must be in between 1 and 16 Bits
          knob_floats[4] = Math.max(1, knob_floats[4] - 1);
        }
      }
      previous_knob_button = letter;
    }
  }
}

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.

// async function because we want the
function keyDown(event) {
  // Holding a key down sends keydown again and again. Only react to the first one.

  Tone.start(); // Audio starts only when a key is pressed

  //
  if (event.key == noteKey) {
    melodySynth.volume.value = -2;
    chordsynth.volume.value = -6;
    mute = false;
  }

  if (event.repeat == false) {
    bassAndHigh(event);
    knob_interact(event);
    console.clear();
    console.log("Distortion Level: " + distortion_meter);
    console.log("Reverb - Decay Level: " + reverb_decay);
    console.log("Reverb - Wet Level: " + reverb_wet);
    console.log("Vibrato Frequence: " + vibrato_frequency);
    console.log("BitCrusher Bits: " + bitcrusher_bits);
  }

  if (event.key == noteKey && mute == false) {
    melodyAndChords();
  }
}

// Runs every time a key comes up.
function keyUp(event) {
  if (event.key === noteKey) {
    melodySynth.volume.value = -100; // mutes
    chordsynth.volume.value = -100;
    mute = true;
  }
}

//loop function - records a 5 second melody played by user
//author: ar5929
function loop(event) {
  let newLoopNote = "";
  if (event.repeat === false) {
    //going thru the bass keypad
    for (let i = 0; i < bassKeys.length; i++) {
      if (event.key == bassKeys[i]) {
        newLoopNote = bassnotes[i];
        listOfNotes.push(newLoopNote); //list only to ensure the first time is saved correctly
        if (listOfNotes.length === 1) {
          startDate = new Date();
          startTime = startDate.getTime() / 1000;
          loopTimes.push(0); //adding the timing to list of loop times
          loopNotes.push(bassnotes[i]); //adding a note to list of loop notes
          console.log(startTime);
        } else if (listOfNotes.length > 1) {
          let newTime = new Date();
          let timeDiff = newTime / 1000 - startTime; //elapsed time to seconds
          if (timeDiff < 5) {
            loopTimes.push(timeDiff);
            loopNotes.push(bassnotes[i]);
          }
        }
      }
    }

    for (let i = 0; i < highKeys.length; i++) {
      if (event.key == highKeys[i]) {
        newLoopNote = highnotes[i];
        listOfNotes.push(newLoopNote);
        if (listOfNotes.length === 1) {
          startDate = new Date();
          startTime = startDate.getTime() / 1000;
          loopTimes.push(0);
          loopNotes.push(highnotes[i]);
        } else if (listOfNotes.length > 1) {
          let newTime = new Date();
          let timeDiff = newTime / 1000 - startTime; //elapsed time to seconds
          console.log("time diff", timeDiff);
          if (timeDiff < 5) {
            loopTimes.push(timeDiff);
            loopNotes.push(highnotes[i]);
          }
        }
      }
    }
  }
}

//playLoop function - plays back the recorded melody when spacebar is pressed
//author: ar5929
function playLoop(event) {
  let now = Tone.now();
  if (event.key === loopKey) {
    console.log(event.key);
    for (let i = 0; i < loopNotes.length; i++) {
      if (i == 0) {
        synth.triggerAttackRelease(loopNotes[i], "8n", now); //loop will start playing right when you press spacebar
      } else {
        synth.triggerAttackRelease(loopNotes[i], "8n", now + loopTimes[i]);
      }
      console.log("loop is ", loopTimes[i]);
    }
  }
}

//knobSettings function - cycles between the settings that are changed by the knob with the left and right arrow keys
//author: ar5929
function knobSettings(event) {
  if (event.key === "ArrowRight") {
    currentIndex = currentIndex + 1;
    if (currentIndex > knobSettingsNames.length - 1) {
      currentIndex = 0;
    }
    console.log(knobSettingsNames[currentIndex]);
  }

  if (event.key === "ArrowLeft") {
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {
      currentIndex = knobSettingsNames.length - 1;
    }
    console.log(knobSettingsNames[currentIndex]);
  }
  knobMode.textContent = knobSettingsNames[currentIndex];
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!

function setup() {
  //THIS TEXT ELEMENT SHOWS WHAT KNOBMODE YOU ARE CURRENTLY IN
  //ONLY STARTS SHOWING THE MODE AFTER YOU PRESSED ONE OF THE ARROW KEYS
  knobMode = document.createElement("p");
  knobMode.textContent = knobSettingsNames[currentIndex];
  document.body.appendChild(knobMode);
  knobMode.style.position = "fixed";
  knobMode.style.fontWeight = "bold";

  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
  window.addEventListener("keydown", knobSettings);
  window.addEventListener("keyup", loop);
  window.addEventListener("keydown", playLoop);
}

setup(); // Always remember to call setup()!
