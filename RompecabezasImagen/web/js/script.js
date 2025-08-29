let puzzleContainer = document.getElementById("puzzle");
let mensaje = document.getElementById("mensaje");
let timerElement = document.getElementById("timer");
let emojiContainer = document.getElementById("estado-emoji");

let piezas = [
  "Image/split-1.jpeg", "Image/split-2.jpeg", "Image/split-3.jpeg", "Image/split-4.jpeg",
  "Image/split-5.jpeg", "Image/split-6.jpeg", "Image/split-7.jpeg", "Image/split-8.jpeg",
  "Image/split-9.jpeg", "Image/split-10.jpeg", "Image/split-11.jpeg", "Image/split-12.jpeg",
  "Image/split-13.jpeg", "Image/split-14.jpeg", "Image/split-15.jpeg", ""
];

let estado = [];
let intervalo;

// Mezclar piezas
function mezclar(array) {
  let copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Dibujar puzzle
function dibujar() {
  puzzleContainer.innerHTML = "";
  estado.forEach((valor, i) => {
    let celda = document.createElement("div");
    celda.classList.add("celda");

    if (valor === "") {
      celda.classList.add("vacio");
    } else {
      celda.style.backgroundImage = `url(${valor})`;
      celda.addEventListener("click", () => mover(i));
    }
    puzzleContainer.appendChild(celda);
  });
}

// Mover pieza
function mover(indice) {
  let vacio = estado.indexOf("");
  let filas = 4;
  let col = indice % filas;
  let fila = Math.floor(indice / filas);
  let colVacio = vacio % filas;
  let filaVacio = Math.floor(vacio / filas);

  if ((Math.abs(col - colVacio) === 1 && fila === filaVacio) ||
    (Math.abs(fila - filaVacio) === 1 && col === colVacio)) {
    [estado[indice], estado[vacio]] = [estado[vacio], estado[indice]];
    dibujar();
    verificar();
  }
}

// Verificar si ganó
function verificar(){
  if(JSON.stringify(estado) === JSON.stringify(piezas)){
    clearInterval(intervalo);
    document.body.classList.add("feliz");
    emojiContainer.innerHTML = `<img src="Image/feliz.png" alt="Feliz" style="opacity:1;">`;
    let opcion = confirm("¡Felicidades! Completaste el rompecabezas.\n\n¿Quieres jugar otra vez?");
    if(opcion) reiniciar();
  }
}

// Timer
function iniciarTimer(){
  clearInterval(intervalo);
  tiempo = 600;
  actualizarTimer();

  intervalo = setInterval(() => {
    tiempo--;
    actualizarTimer();

    if(tiempo <= 0){
      clearInterval(intervalo);
      document.body.classList.add("triste");
      emojiContainer.innerHTML = `<img src="Image/triste.png" alt="Triste" style="opacity:1;">`;
      let opcion = confirm(" Perdiste...\n\n ¿Quieres intentarlo de nuevo?");
      if(opcion) reiniciar();
    }
  }, 1000);
}

function actualizarTimer(){
  let min = Math.floor(tiempo / 60);
  let sec = tiempo % 60;
  timerElement.innerText = `Tiempo restante: ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function reiniciar(){
  estado = mezclar(piezas);
  mensaje.innerText = "";
  document.body.classList.remove("feliz", "triste");
  emojiContainer.innerHTML = "";
  dibujar();
  iniciarTimer();
}

// Iniciar al cargar
reiniciar();
