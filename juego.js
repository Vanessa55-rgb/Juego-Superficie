let vida = 5;
let miembros = 3;
let mochila = [];

const vidaEl = document.getElementById("vida");
const miembrosEl = document.getElementById("miembros");
const mochilaEl = document.getElementById("mochila");
const descripcionEl = document.getElementById("descripcion");
const opcionesEl = document.getElementById("opciones");
const resultadoEl = document.getElementById("resultado");

const escenas = [
  {
    texto: "Te despiertas entre escombros. El cielo es rojo, y la ciudad está en ruinas. ¿Dónde buscar recursos?",
    opciones: [
      { texto: "Ir al supermercado", efecto: () => { mochila.push("comida", "agua"); vida--; } },
      { texto: "Robar mochila a un sobreviviente", efecto: () => { mochila.push("linterna"); miembros--; } }
    ]
  },
  {
    texto: "Debes encontrar refugio seguro antes del anochecer.",
    opciones: [
      { texto: "Esconderse en una farmacia", efecto: () => { mochila.push("botiquin"); vida++; } },
      { texto: "Ir a estación de buses", efecto: () => { vida--; } },
      { texto: "Tienda de campaña abandonada", efecto: () => { mochila.push("bateria"); vida--; } }
    ]
  },
  {
    texto: "Escuchas gritos de auxilio. ¿Qué harás?",
    opciones: [
      { texto: "Ayudar a la familia", efecto: () => { miembros++; mochila.push("mapa"); } },
      { texto: "Ignorar y seguir", efecto: () => { miembros--; } },
      { texto: "Distraer enemigos", efecto: () => { mochila.push("linterna"); vida--; } },
      { texto: "Robar recursos", efecto: () => { mochila.push("comida"); miembros -= 2; } }
    ]
  },
  {
    texto: "Desde lo alto, ves una señal de humo.",
    opciones: [
      { texto: "Investigar", efecto: () => { mochila.push("llave", "gasolina"); } },
      { texto: "Evitar la zona", efecto: () => { } }
    ]
  },
  {
    texto: "¿Cómo moverte con seguridad?",
    opciones: [
      { texto: "Subir a edificio", efecto: () => { mochila.push("intel"); } },
      { texto: "Moverse por callejones", efecto: () => { vida--; } },
      { texto: "Usar alcantarilla al metro", efecto: () => { mochila.push("tarjeta-acceso"); } }
    ]
  },
  {
    texto: "Debes moverte rápido antes que anochezca.",
    opciones: [
      { texto: "Reparar bicicleta", efecto: () => { mochila.push("medicinas", "bateria"); } },
      { texto: "Ir a pie", efecto: () => { vida--; } }
    ]
  }
];

let paso = 0;

function mostrarEstado() {
  vidaEl.textContent = vida;
  miembrosEl.textContent = miembros;
  mochilaEl.textContent = JSON.stringify(mochila);
}

function siguienteEscena() {
  resultadoEl.textContent = "";
  mostrarEstado();

  if (paso < escenas.length) {
    const escena = escenas[paso];
    descripcionEl.textContent = escena.texto;
    opcionesEl.innerHTML = "";

    escena.opciones.forEach(op => {
      const btn = document.createElement("button");
      btn.textContent = op.texto;
      btn.onclick = () => {
        op.efecto();
        paso++;
        setTimeout(siguienteEscena, 1000);
      };
      opcionesEl.appendChild(btn);
    });
  } else {
    verificarFinal();
  }
}

function verificarFinal() {
  descripcionEl.textContent = "🚪 Llegas a la compuerta del metro...";
  opcionesEl.innerHTML = "";

  if (vida >= 3 && mochila.includes("mapa") && mochila.length >= 2) {
    resultadoEl.innerHTML = "<strong>✅ Has sobrevivido y puedes entrar al metro. ¡Buena suerte!</strong>";
  } else {
    resultadoEl.innerHTML = "<strong>❌ No tienes lo necesario. Te quedas atrapado en la ciudad.</strong>";
  }
  mostrarEstado();
}

siguienteEscena();