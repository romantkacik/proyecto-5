import { initializeMemoryGame, hideAttemptsCounter } from './src/components/game-1/memory'
import { initializeThreeInARow } from './src/components/game-2/three'

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
    initializeMemoryGame()
    // Inicializa el juego de memoria
    hideAttemptsCounter() // Oculta el contador de intentos al cambiar al juego 1
  } else if (game === 'game2') {
    initializeThreeInARow() // Inicializa el juego de tres en raya
  }
  // Agrega más casos para otros juegos si los tienes
}
