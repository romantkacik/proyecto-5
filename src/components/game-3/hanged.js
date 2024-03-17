import './hanged.css'

const arrayPaises = [
  'Alemania',
  'Austria',
  'Bélgica',
  'Bulgaria',
  'Chipre',
  'Croacia',
  'Dinamarca',
  'Eslovaquia',
  'Eslovenia',
  'España',
  'Estonia',
  'Finlandia',
  'Francia',
  'Grecia',
  'Hungría',
  'Irlanda',
  'Italia',
  'Letonia',
  'Lituania',
  'Luxemburgo',
  'Malta',
  'Países Bajos',
  'Polonia',
  'Portugal',
  'Reino Unido',
  'República Checa',
  'Rumanía',
  'Suecia',
  'Noruega',
  'Suiza',
  'Islandia',
  'Serbia',
  'Montenegro',
  'Macedonia del Norte',
  'Albania',
  'Bosnia y Herzegovina',
]
const imagenesAhorcado = [
  './public/hanged/img0.png', // Estado inicial
  './public/hanged/img1.png', // Primer error
  './public/hanged/img2.png', // Segundo error
  './public/hanged/img3.png',
  './public/hanged/img4.png',
  './public/hanged/img5.png',
  './public/hanged/img6.png',
  './public/hanged/img7.png',
]

let palabraSeleccionada = ''
let errores = 0
let aciertos = 0

export function initializeHanged() {
  const gameArea = document.getElementById('gameArea')
  gameArea.innerHTML = ''

  const area3 = document.createElement('div')
  area3.id = 'area3'
  gameArea.appendChild(area3)

  // Div para la imagen del ahorcado
  const hangedImageContainer = document.createElement('div')
  hangedImageContainer.className = 'hanged-image-container'
  const hangedImage = document.createElement('img')
  hangedImage.src = imagenesAhorcado[0]
  hangedImage.alt = 'Imagen del ahorcado'
  hangedImageContainer.appendChild(hangedImage)
  area3.appendChild(hangedImageContainer)

  const selectContainer = document.createElement('div')
  selectContainer.id = 'selectContainer'
  area3.appendChild(selectContainer)

  const palabraAAdivinar = document.createElement('p')
  palabraAAdivinar.id = 'palabra_a_adivinar'
  selectContainer.appendChild(palabraAAdivinar)

  const botonJugar = document.createElement('button')
  botonJugar.id = 'jugar'
  botonJugar.textContent = 'Obtener palabra'
  botonJugar.addEventListener('click', obtenerPalabra)
  selectContainer.appendChild(botonJugar)

  // Reinicia el tablero de letras y obtiene una nueva palabra
  function obtenerPalabra() {
    errores = 0
    aciertos = 0
    hangedImage.src = imagenesAhorcado[errores]
    const indiceAleatorio = Math.floor(Math.random() * arrayPaises.length)
    palabraSeleccionada = arrayPaises[indiceAleatorio].toUpperCase()
    actualizarGuiones()
    reiniciarBotones()
  }

  function actualizarGuiones() {
    palabraAAdivinar.innerHTML = ''
    palabraSeleccionada.split('').forEach(() => {
      const span = document.createElement('span')
      span.textContent = '-'
      palabraAAdivinar.appendChild(span)
    })
  }

  // Reinicia los botones del abecedario para una nueva partida
  function reiniciarBotones() {
    document.querySelectorAll('.letra').forEach((boton) => {
      boton.disabled = false
    })
  }

  const contenedorAbecedario = document.createElement('div')
  contenedorAbecedario.className = 'contenedorAbecedario'
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letra) => {
    const botonLetra = document.createElement('button')
    botonLetra.className = 'letra'
    botonLetra.textContent = letra
    botonLetra.addEventListener('click', function () {
      this.disabled = true // Deshabilita el botón luego de ser presionado
      verificarLetra(letra)
    })
    contenedorAbecedario.appendChild(botonLetra)
  })
  selectContainer.appendChild(contenedorAbecedario)

  function verificarLetra(letra) {
    let acierto = false
    palabraSeleccionada.split('').forEach((car, index) => {
      if (car === letra) {
        acierto = true
        aciertos++
        palabraAAdivinar.childNodes[index].textContent = letra
      }
    })

    if (!acierto) {
      errores++
      hangedImage.src = imagenesAhorcado[errores]
      if (errores >= imagenesAhorcado.length - 1) {
        alert('¡Fin del juego! Has sido ahorcado.')
        // Opción para reiniciar el juego aquí
      }
    } else if (aciertos === palabraSeleccionada.length) {
      alert('¡Felicidades! Has adivinado la palabra correctamente.')
      // Opción para reiniciar el juego aquí
    }
  }
}
