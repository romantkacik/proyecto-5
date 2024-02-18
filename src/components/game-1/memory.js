// game-1.js

import './memory.css'

// Función para cargar imágenes aleatorias
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export default function initializeMemoryGame() {
  const images = [
    '1.png',
    '1.copy.png',
    '2.png',
    '2.copy.png',
    '3.png',
    '3.copy.png',
    '4.png',
    '4.copy.png',
    '5.png',
    '5.copy.png',
    '6.png',
    '6.copy.png',
    '7.png',
    '7.copy.png',
    '8.png',
    '8.copy.png',
  ]

  shuffle(images)

  const gameArea = document.getElementById('gameArea')

  images.forEach((image) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.name = image.split('.')[0] // Establecer el nombre de la carta
    gameArea.appendChild(card)

    const cardFront = document.createElement('div')
    cardFront.classList.add('card-front')
    card.appendChild(cardFront)

    const cardBack = document.createElement('div')
    cardBack.classList.add('card-back')
    cardBack.style.backgroundImage = `url(public/memory/${image})`
    card.appendChild(cardBack)
  })

  let hasFlippedCard = false
  let lockBoard = false
  let firstCard, secondCard
  let matchCount = 0
  let score = 0

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
    let isMatch = firstCard.dataset.name === secondCard.dataset.name

    if (isMatch) {
      disableCards()
      matchCount++
      score++
      updateScore()
      if (matchCount === images.length / 2) {
        alert(`¡Felicidades, has ganado! Tu puntaje es: ${score}`)
        resetGame()
      }
    } else {
      unflipCards()
      resetScore()
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
    const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
      card.classList.remove('flip')
      card.addEventListener('click', flipCard)
    })
    matchCount = 0
    score = 0
    updateScore()
    shuffle(images)
  }

  function resetScore() {
    score = 0
    updateScore()
  }

  function updateScore() {
    const scoreElement = document.getElementById('score')
    scoreElement.textContent = `Score: ${score}`
  }

  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => card.addEventListener('click', flipCard))
}
