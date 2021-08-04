// Definición de variables
const btnStartReset = document.querySelector(".btnStartReset");
const yellow = document.querySelector("#yellow");
const red = document.querySelector("#red");
const blue = document.querySelector("#blue");
const green = document.querySelector("#green");
const circles = document.querySelector(".circles");
const btnEasy = document.querySelector("#btnEasy");
const btnMedium = document.querySelector("#btnMedium");
const btnHard = document.querySelector("#btnHard");
const message = document.querySelector(".message");

let level = 1;
let sequence = [];
let select = [];
let index = 0;
let timer = 500;
let setTimer = 500;

// Eventos iniciales
btnStartReset.addEventListener("click", startResetGame);
btnEasy.addEventListener("click", easyMode);
btnMedium.addEventListener("click", mediumMode);
btnHard.addEventListener("click", hardMode);

// Funciones para agregar y eliminar los eventos
function addEvents() {
  btnStartReset.addEventListener("click", startResetGame);
  circles.addEventListener("click", pick);
  btnEasy.addEventListener("click", easyMode);
  btnMedium.addEventListener("click", mediumMode);
  btnHard.addEventListener("click", hardMode);
}
function removeEvents() {
  btnStartReset.removeEventListener("click", startResetGame);
  circles.removeEventListener("click", pick);
  btnEasy.removeEventListener("click", easyMode);
  btnMedium.removeEventListener("click", mediumMode);
  btnHard.removeEventListener("click", hardMode);
}

// Función para gener la secuencia de colores
function sequenceGenerator() {
  const blinks = level + 2;

  while (sequence.length < blinks) {
    sequence.push((variable = Math.ceil(Math.random() * 4)));
  }
  return sequence;
}

// Función para iniciar el juego
function startGame() {
  index = 0;
  message.textContent = `LEVEL ${level}`;
  switch (timer) {
    case 250:
      setTimer = 250;
      break;
    case 500:
      setTimer = 500;
      break;
    case 750:
      setTimer = 750;
      break;
    default:
      // No hay default
      break;
  }
  sequenceGenerator();
  showSequence();
}

// Función para resetear el juego
function startResetGame() {
  level = 1;
  sequence = [];
  select = [];
  startGame();
}

// Función para mostrar secunencia
function showSequence() {
  removeEvents();
  btnStartReset.textContent = "SHOW SEQUENCE";
  sequence.map((c, i) => {
    switch (c) {
      case 1:
        showDiv(yellow);
        hideDiv(yellow, i);
        break;
      case 2:
        showDiv(blue);
        hideDiv(blue, i);
        break;
      case 3:
        showDiv(green);
        hideDiv(green, i);
        break;
      case 4:
        showDiv(red);
        hideDiv(red, i);
        break;
      default:
        // No hay default
        break;
    }
  });
}

// Función para mostrar div
function showDiv(div) {
  setTimeout(() => {
    div.style.opacity = 1;
  }, (setTimer += timer));
}

// Función para ocultar div
function hideDiv(div, i) {
  setTimeout(() => {
    div.style.opacity = 0.05;
    if (i === sequence.length - 1) {
      btnStartReset.textContent = "RESET GAME";
      addEvents();
    }
  }, (setTimer += timer));
}

// Función para detectar y comparar los clicks con la secuencia
function pick(e) {
  e.target.style.opacity = 1;
  setTimeout(() => {
    e.target.style.opacity = 0.05;
  }, 100);
  select = Number(e.target.accessKey);
  if (select === sequence[index]) {
    index++;
    if (index - 1 === sequence.length - 1) {
      if (select === sequence[index - 1]) {
        level++;
        startGame();
      }
    }
  } else {
    defeat();
  }
}

// Funciones para los modos de juego
function easyMode() {
  this.classList.add("modoOn");
  btnStartReset.textContent = "START";
  btnMedium.classList.remove("modoOn");
  btnHard.classList.remove("modoOn");
  level = 1;
  sequence = [];
  select = [];
  index = 0;
  timer = 750;
  setTimer = 750;
}
function mediumMode() {
  this.classList.add("modoOn");
  btnStartReset.textContent = "START";
  btnHard.classList.remove("modoOn");
  btnEasy.classList.remove("modoOn");
  level = 1;
  sequence = [];
  select = [];
  index = 0;
  timer = 500;
  setTimer = 500;
}
function hardMode() {
  this.classList.add("modoOn");
  btnStartReset.textContent = "START";
  btnMedium.classList.remove("modoOn");
  btnEasy.classList.remove("modoOn");
  level = 1;
  sequence = [];
  select = [];
  index = 0;
  timer = 250;
  setTimer = 250;
}

// Función de derrota
function defeat() {
  const defeatLevel = level;
  level = 1;
  sequence = [];
  select = [];
  btnStartReset.textContent = "START";
  if (defeatLevel === 1) {
    message.textContent = `DEFEAT, YOU DID NOT PASS LEVEL 1`;
  } else {
    message.textContent = `DEFEAT, YOU HAVE REACHED THE LEVEL ${defeatLevel}`;
  }
  circles.removeEventListener("click", pick);
}
