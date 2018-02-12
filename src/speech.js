const synth = window.speechSynthesis;

let voice = null;
function initVoices() {
  // iOS
  voice = synth.getVoices().find((voice) => voice.name === 'Arthur');

  if (!voice) {
    // Chrome / OSX
    voice = synth.getVoices().find((voice) => voice.name === 'Daniel');
  }
  
  if (!voice) {
    // default to first
    voice = synth.getVoices()[0];
  }
}

let currentMsg;
const speak = (text) => {
  const msg = new SpeechSynthesisUtterance(text);
  currentMsg = msg;
  msg.voice = voice;
  msg.pitch = 0.9;
  msg.rate = 0.9;
  synth.speak(msg);
}

function pause(seconds) {
  currentMsg.onend = function () {
    // iOS hack: pause on next tick, otherwise it doesn't pause
    setTimeout(() => {
      synth.pause();
  
      setTimeout(() => {
        synth.resume();
      }, seconds * 1000);
    });
  }
}

const pick = (strings) => {
  const i = Math.floor(Math.random() * strings.length);
  return strings[i];
}

const intro = () => pick([
  `Everyone, close your eyes and put your fists on the table!`,
  `Everyone, be so kind to close your eyes and put your fist upon the table.`
]);

const badGuysRevealEachOther = (numPlayers) => {
  let characters;
  let pairsOfEyes;

  if (numPlayers === 10) {
    characters = 'Darth Sidius, Asaj the Assassin, and Jango Fat';
    pairsOfEyes = 'two pairs';
  } else {
    characters = 'Darth Sidius and Asaj the Assassin'
    pairsOfEyes = 'one pair'
  }

  return `${characters}, open your eyes and look around to see the agents of evil.
You should see ${pairsOfEyes} of eyes. If not, then the game is broken, please let the group know.`;
};


const badGuysRevealToYoda = (numPlayers) => {
  let characters;
  let numHands;

  if (numPlayers === 10) {
    characters = 'Asaj the Assassin, Jango Fat and Bad Anakin';
    numHands = 'three';
  } else {
    characters = 'Asaj the Assassin and Bad Anakin'
    numHands = 'two'
  }

  return `${characters}, open your hands and wiggle your fingers.
    Yoda, open your eyes and see ${numHands} open hands. These are all the bad guys except for Darth Sidius who you cannot see.`;
};

const badAnakinReveal = () => `Bad Anakin open your hand and wiggle your fingers so that the bad guys can see you.`;

const closeEverything = () => pick([
  `Everyone, close your eyes and hands.`,
  `Everyone, close everything.`
]);

const anakinsReveal = () => `Bad Anakin and good Anakin, open your hands. Padmé open your eyes and see the two Anakins.`

const obiwanReveal = () => `Darth Sidius and Yoda, open your hands. Obi Wahn, open your eyes and see two open hands.
One of them is Yoda, the other one is Darth Sidius.`;

const openEyes = () => `Everyone, please open your eyes.`;

export function start(numPlayers) {
  speak(obiwanReveal());
  initVoices();

  speak(intro());
  pause(2);

  speak(badGuysRevealEachOther(numPlayers));
  pause(4);
  speak(badAnakinReveal());
  pause(3);
  speak(closeEverything());
  pause(1);

  speak(badGuysRevealToYoda(numPlayers));
  pause(3);
  speak(closeEverything());
  pause(1);

  speak(anakinsReveal());
  pause(3);
  speak(closeEverything());
  pause(1);

  speak(obiwanReveal());
  pause(3);
  speak(closeEverything());
  pause(2);

  speak(openEyes());
}

export function stop() {
  synth.pause();
  synth.cancel();
}
