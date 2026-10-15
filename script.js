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

//List of notes for the right side grid of keyboard --> higher octave for higher notes
let highnotes = ["D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6"];

let knobSettingsNames = ["reverb", "vibrato", "echo"];

let currentIndex = -1;
let knobMode;

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once

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
    //console.log("Key down:", event.key);
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

    if (event.key === exampleKey) {
      synth.triggerAttack(exampleNote, Tone.now()); // keeps sounding until triggerRelease
    }
  }
}

// Runs every time a key comes up.
function keyUp(event) {
  //console.log("Key up:", event.key);

  // Example: replace this with your own instrument.
  if (event.key === exampleKey) {
    synth.triggerRelease(exampleNote, Tone.now());
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
}

setup(); // Always remember to call setup()!
