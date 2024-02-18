// main.js

import initializeMemoryGame from './src/components/game-1/memory'

document.getElementById('startButton').addEventListener('click', function () {
  this.style.display = 'none' // Oculta el botón "Comenzar"
  document.getElementById('gamesContainer').style.display = 'flex' // Muestra los botones de juego
})

document.querySelectorAll('.gameButton').forEach((button) => {
  button.addEventListener('click', function () {
    const selectedGame = this.dataset.game
    loadGame(selectedGame)
  })
})

function loadGame(game) {
  // Carga el juego correspondiente
  document.getElementById('gameArea').innerHTML = '' // Limpia cualquier contenido previo
  if (game === 'game1') {
    initializeMemoryGame() // Inicializa el juego de memoria
  }
  // Agrega más casos para otros juegos si los tienes
}
