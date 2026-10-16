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

let knobSettingsNames = ["reverb", "vibrato", "echo"];

let currentIndex = -1;
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
const knob = ["f" ,"v", "c"]

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.

let bPress = false; // Condition to check if "b" is pressed;
let mute = false; // Mute condtion for "toggle" feature when pressing "b"
// Knob settings value
let knob_floats = [0.0]
let previous_knob_button = ""

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); //Default synth for Bass and High

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
}).toDestination();

const chordsynth = new Tone.PolySynth(Tone.Synth).toDestination(); // Polysynth for chords

synth.volume.value = -7; // adjust bass and high volume
melodySynth.volume.value = -2; // adjust melody volume
chordsynth.volume.value = -6; // adjust chord volume

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Example: replace this with your own instrument.
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

function bassAndHigh(event) {
  const now = Tone.now();
  //LEFT SIDE 3*3 GRID KEYBOARD --> BASS NOTES
  for (let i = 0; i < bassKeys.length; i++) {
      if (event.key === bassKeys[i]) {
        synth.triggerAttackRelease(bassnotes[i], now);
        console.log(bassnotes[i]);
      }
    } //^END OF BASS NOTES

  //RIGHT SIDE 3*3 GRID KEYBOARD --> HIGH NOTES
  for (let i = 0; i < highKeys.length; i++) {
      if (event.key === highKeys[i]) {
        synth.triggerAttackRelease(highnotes[i], now);
        console.log(highnotes[i]);
      }
    }
  //^END OF HIGH NOTES
}
// Knob
function knob_interact(){
    // Checksh if pressed buttons match with the knob arrays buttons
    for (const [i, letter] of knob.entries()){
      if (event.key === letter){
        let previous_button_i = knob.indexOf(previous_knob_button)
        console.clear();
        console.log(knob_floats[0])

        // turn knob up
        if ((i > previous_button_i && (i !== knob.length-1 || previous_button_i !== 0)) || (i === 0 && previous_button_i === knob.length-1)){
          knob_floats[0] += 1

        // turn knob down
        } else if ((i < previous_button_i && (i !== 0 || previous_button_i !== knob.length-1)) || (i ===  knob.length-1 && previous_button_i === 0)){
          knob_floats[0] -= 1

        }
      previous_knob_button = letter
      }
    }
  }


// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.

// async function because we want the
function keyDown(event) {
  // Holding a key down sends keydown again and again. Only react to the first one.

  //if (event.repeat === event.key){
  //console.log("Key down:", event.key);
  //}

  //if (event.key == noteKey) {
  //  bassAndHigh();
  //}

  Tone.start(); // Audio starts only when a key is pressed

  //
  if (event.key == noteKey) {
    melodySynth.volume.value = -2;
    chordsynth.volume.value = -6;
    mute = false;
  }

  bassAndHigh(event);

  if (event.key == noteKey && mute == false) {
    melodyAndChords();
  }
}

// Runs every time a key comes up.
function keyUp(event) {
  //console.log("Key up:", event.key);
  //Tone.now();
  // Example: replace this with your own instrument.
  //if (event.key === exampleKey) {
  //  synth.triggerRelease(exampleNote, Tone.now());
  //}
  if (event.key === noteKey) {
    melodySynth.volume.value = -100; // mutes
    chordsynth.volume.value = -100;
    mute = true;
  }
}



// LOOP FUNCTION
let listOfNotes = []; //list of keys pressed during the recording
let loopTimes = []; //list of starting times of the key presses //starts counting at first boot
let loopNotes = [];
let startTime = null;

//if loopnotes length is only one start the timer

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
          loopTimes.push(startTime);  //adding the timing to list of loop times
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
          startTime = startDate.getTime();
          loopTimes.push(startTime);
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

let loopKey = " ";

function playLoop(event) {
  let now = Tone.now();
  if (event.key === loopKey) {
    console.log(event.key);
    for (let i = 0; i < loopNotes.length; i++) {
      if (loopNotes[i] === loopNotes[0]) {
        synth.triggerAttackRelease(loopNotes[i], "8n", now); //loop will start playing right when you press spacebar
      } else {
        synth.triggerAttackRelease(loopNotes[i], "8n", now + loopTimes[i]);
      }
      console.log("loop is ", loopTimes[i]);
    }
  }
}




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
