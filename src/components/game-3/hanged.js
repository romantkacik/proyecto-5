import './hanged.css'

export function initializeHanged() {
  const gameArea = document.getElementById('gameArea')
  gameArea.innerHTML = '' // Limpia el área de juego para el nuevo juego

  // Crear el área específica para el juego del ahorcado
  const area3 = document.createElement('div')
  area3.id = 'area3'

  // Div para la imagen del ahorcado
  const hangedImageContainer = document.createElement('div')
  hangedImageContainer.className = 'img0'
  const hangedImage = document.createElement('img')
  hangedImage.src = './public/hanged/img0.png'
  hangedImage.alt = 'Imagen del ahorcado'
  hangedImageContainer.appendChild(hangedImage)
  area3.appendChild(hangedImageContainer)

  // Crear el contenedor para la palabra a adivinar
  const palabraContenedor = document.createElement('div')
  const palabraAAdivinar = document.createElement('p')
  palabraAAdivinar.id = 'palabra_a_adivinar'
  const spans = '- - - -'.split(' ').map((caracter) => {
    const span = document.createElement('span')
    span.textContent = caracter
    return span
  })
  spans.forEach((span) => palabraAAdivinar.appendChild(span))
  palabraContenedor.appendChild(palabraAAdivinar)
  area3.appendChild(palabraContenedor)

  // Crear y añadir el botón para iniciar o reiniciar el juego
  const botonJugar = document.createElement('button')
  botonJugar.id = 'jugar'
  botonJugar.textContent = 'Obtener palabra'
  area3.appendChild(botonJugar)

  // Crear y añadir el abecedario como botones
  const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const contenedorAbecedario = document.createElement('div')
  contenedorAbecedario.classList = 'contenedorAbecedario'
  abecedario.forEach((letra) => {
    const botonLetra = document.createElement('button')
    botonLetra.className = 'abecedario'
    botonLetra.textContent = letra
    botonLetra.addEventListener('click', () => {
      // Añadir aquí la lógica para manejar el click en cada letra
    })
    contenedorAbecedario.appendChild(botonLetra)
  })
  area3.appendChild(contenedorAbecedario)

  // Añadir el área del juego del ahorcado al contenedor principal
  gameArea.appendChild(area3)
}
