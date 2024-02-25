//* THREE IN A ROW
import './three.css'
// script.js

// Constantes para representar los valores de los jugadores
const PLAYER_X = 'X'
const PLAYER_O = 'O'

// Constante para representar el tablero de juego
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

// Variable para seguir el turno actual del jugador
let currentPlayer = ''

// Función para crear el mensaje y agregarlo al DOM
function createMessageElement() {
  const messageElement = document.createElement('div')
  messageElement.id = 'message'
  document.body.appendChild(messageElement)
}

// Función para inicializar el juego de tres en raya
export function inizialiceThreeInARow() {
  // Llama a la función para crear el elemento del mensaje
  createMessageElement()

  const gameBoard = document.getElementById('gameArea')
  gameBoard.innerHTML = ''

  for (let i = 0; i < 3; i++) {
    const row = document.createElement('div')
    row.classList.add('row')

    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('data-row', i)
      cell.setAttribute('data-col', j)
      cell.addEventListener('click', handleCellClick)
      row.appendChild(cell)
    }

    gameBoard.appendChild(row)
  }

  // Inicializar el turno del jugador X
  currentPlayer = PLAYER_X
  displayMessage(`Turno del jugador ${currentPlayer}`)
}

// Función para manejar el clic en una celda del tablero
function handleCellClick(event) {
  const row = event.target.getAttribute('data-row')
  const col = event.target.getAttribute('data-col')

  // Verificar si la celda está vacía
  if (board[row][col] === '') {
    // Marcar la celda con el jugador actual
    event.target.textContent = currentPlayer
    board[row][col] = currentPlayer

    // Verificar si el jugador actual ha ganado
    if (checkWinner(currentPlayer)) {
      displayMessage(`¡El jugador ${currentPlayer} ha ganado!`)
    } else {
      // Cambiar al siguiente jugador
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X
      displayMessage(`Turno del jugador ${currentPlayer}`)
    }
  } else {
    // La celda no está vacía, mostrar mensaje de error
    displayMessage('¡Esta celda ya está ocupada!')
  }
}

// Función para verificar si un jugador ha ganado
function checkWinner(player) {
  // Comprobar filas
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      return true
    }
  }

  // Comprobar columnas
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
      return true
    }
  }

  // Comprobar diagonales
  if (
    (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  ) {
    return true
  }

  return false
}

// Función para mostrar un mensaje en el tablero
function displayMessage(message) {
  const messageElement = document.getElementById('message')
  messageElement.textContent = message
}

// Función para iniciar el juego
function startGame(player) {
  currentPlayer = player
  createGameBoard()
  displayMessage(`Turno del jugador ${currentPlayer}`)
}

// Obtener los botones de inicio del juego
const startButtons = document.querySelectorAll('.start-button')

// Asignar eventos de clic a los botones de inicio del juego
startButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Ocultar los botones de inicio del juego
    document.getElementById('choose').style.display = 'none'

    // Iniciar el juego con el jugador correspondiente
    startGame(button.textContent.trim())
  })
})
