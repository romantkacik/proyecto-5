import './memory.css'

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

let scoreElement
let attempts = 0 // Variable para contar los intentos

export function initializeMemoryGame() {
  // Limpiar el contenido previo en el área de juego
  const gameArea = document.getElementById('gameArea')
  gameArea.innerHTML = ''

  // Crear el elemento score si no existe en el DOM
  if (!scoreElement) {
    scoreElement = document.createElement('div')
    scoreElement.id = 'score'
    document.body.appendChild(scoreElement) // Añadirlo al final del body
  }

  // Mostrar el elemento de puntaje al cargar el juego
  scoreElement.style.display = 'block'

  const images = [
    './img1.png',
    './img1copy.png',
    './img2.png',
    './img2copy.png',
    './img3.png',
    './img3copy.png',
    './img4.png',
    './img4copy.png',
    './img5.png',
    './img5copy.png',
    './img6.png',
    './img6copy.png',
    './img7.png',
    './img7copy.png',
    './img8.png',
    './img8copy.png',
  ]

  shuffle(images)

  const area1 = document.createElement('div')
  area1.classList.add('area1')
  gameArea.appendChild(area1)

  images.forEach((image) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.name = image.replace(/copy|\.png$/g, '')

    area1.appendChild(card) // Agregar la carta a area1

    const cardFront = document.createElement('div')
    cardFront.classList.add('card-front')
    card.appendChild(cardFront)

    const cardBack = document.createElement('div')
    cardBack.classList.add('card-back')
    cardBack.style.backgroundImage = `url(/memory/${image})`
    card.appendChild(cardBack)
  })

  let hasFlippedCard = false
  let lockBoard = false
  let firstCard, secondCard
  let matchCount = 0

  function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add('flip')

    if (!hasFlippedCard) {
      hasFlippedCard = true
      firstCard = this
      return
    }

    secondCard = this
    checkForMatch()
  }

  function checkForMatch() {
    attempts++ // Incrementar los intentos
    updateScore() // Actualizar el puntaje
    let isMatch = firstCard.dataset.name === secondCard.dataset.name

    if (isMatch) {
      disableCards()
      matchCount++
      if (matchCount === images.length / 2) {
        alert(`¡Felicidades, has completado! Total de intentos: ${attempts}`)
        resetGame()
      }
    } else {
      unflipCards()
    }
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
  }

  function unflipCards() {
    lockBoard = true

    setTimeout(() => {
      firstCard.classList.remove('flip')
      secondCard.classList.remove('flip')
      resetBoard()
    }, 1500)
  }

  function resetBoard() {
    ;[hasFlippedCard, lockBoard] = [false, false]
    ;[firstCard, secondCard] = [null, null]
  }

  function resetGame() {
    attempts = 0 // Reiniciar el contador de intentos
    matchCount = 0
    const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
      card.classList.remove('flip')
      card.addEventListener('click', flipCard)
    })
    shuffle(images)
    updateScore() // Asegurarse de que el puntaje se actualice al reiniciar el juego
  }

  function updateScore() {
    scoreElement.textContent = `Intentos: ${attempts}`
  }

  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => card.addEventListener('click', flipCard))
}

// Función para ocultar el contador de intentos al cambiar de juego
export function hideAttemptsCounter() {
  if (scoreElement) {
    scoreElement.style.display = 'none'
  }
}
