import { initializeMemoryGame, hideAttemptsCounter } from './src/components/game-1/memory'
import { initializeThreeInARow } from './src/components/game-2/three'
import { initializeHanged } from './src/components/game-3/hanged'

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
  // Limpia cualquier contenido previo
  document.getElementById('gameArea').innerHTML = ''

  if (game === 'game1') {
    initializeMemoryGame()
    hideAttemptsCounter() // Oculta el contador de intentos al cambiar al juego 1
  } else if (game === 'game2') {
    initializeThreeInARow()
  } else if (game === 'game3') {
    initializeHanged()
  }
}
