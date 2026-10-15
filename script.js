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
let bassnotes = ["B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];

//List of notes for the right side grid of keyboard --> higher octave for higher notes
let highnotes = ["B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6"];

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
  "C4",
  "D4",
  "A4",
];
let chords = [
  ["A3", "C4", "E4"],
  ["F3", "A3", "C4"],
  ["C3", "E3", "G3"],
  ["G3", "B3", "D4"],
];
let noteKey = " "; // Key to start the loop;

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once
const chordsynth = new Tone.PolySynth(Tone.Synth).toDestination();

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

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
function keyDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something
  const now = Tone.now();
  // Holding a key down sends keydown again and again. Only react to the first one.
  if (event.repeat === false) {
    //LEFT SIDE 3*3 GRID KEYBOARD --> BASS NOTES
    if (event.key === "1") synth.triggerAttackRelease(bassnotes[0], "8n", now);
    else if (event.key === "2")
      synth.triggerAttackRelease(bassnotes[1], "8n", now);
    else if (event.key === "3")
      synth.triggerAttackRelease(bassnotes[2], "8n", now);
    else if (event.key === "q")
      synth.triggerAttackRelease(bassnotes[3], "8n", now);
    else if (event.key === "w")
      synth.triggerAttackRelease(bassnotes[4], "8n", now);
    else if (event.key === "e")
      synth.triggerAttackRelease(bassnotes[5], "8n", now);
    else if (event.key === "a")
      synth.triggerAttackRelease(bassnotes[6], "8n", now);
    else if (event.key === "s")
      synth.triggerAttackRelease(bassnotes[7], "8n", now);
    else if (event.key === "d")
      synth.triggerAttackRelease(bassnotes[8], "8n", now);
    //^END OF BASS NOTES

    //RIGHT SIDE 3*3 GRID KEYBOARD --> HIGH NOTES
    if (event.key === "7") synth.triggerAttackRelease(highnotes[0], "8n", now);
    else if (event.key === "8")
      synth.triggerAttackRelease(highnotes[1], "8n", now);
    else if (event.key === "9")
      synth.triggerAttackRelease(highnotes[2], "8n", now);
    else if (event.key === "u")
      synth.triggerAttackRelease(highnotes[3], "8n", now);
    else if (event.key === "i")
      synth.triggerAttackRelease(highnotes[4], "8n", now);
    else if (event.key === "o")
      synth.triggerAttackRelease(highnotes[5], "8n", now);
    else if (event.key === "j")
      synth.triggerAttackRelease(highnotes[6], "8n", now);
    else if (event.key === "k")
      synth.triggerAttackRelease(highnotes[7], "8n", now);
    else if (event.key === "l")
      synth.triggerAttackRelease(highnotes[8], "8n", now);
    //^END OF HIGH NOTES

    //LOOP
    if (event.key === noteKey) {
      for (let i = 0; i < melody.length; i++) {
        synth.triggerAttackRelease(melody[i], "4n", now + i * 0.5); // plays the melody
      }
      for (let i = 0; i < chords.length; i++) {git 
        chordsynth.triggerAttackRelease(chords[i], 1.4, now + i * 1.5); // plays the chord
      }
    }
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
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
}

setup(); // Always remember to call setup()!
