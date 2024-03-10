import './three.css'

// Constantes para representar los valores de los jugadores
const PLAYER_X = 'X'
const PLAYER_O = 'O'

// Constante para representar el tablero de juego
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

// Variable para seguir el turno actual del jugador
let currentPlayer = ''

// Variable para el área de juego
let area2

// Elemento del botón de reinicio
let restartButton

// Variable para verificar si el juego ha terminado
let gameEnded = false

// Función para crear el mensaje y agregarlo al DOM
function createMessageElement() {
  const messageElement = document.createElement('div')
  messageElement.id = 'message'
  area2.appendChild(messageElement)

  // Botón para reiniciar el juego
  restartButton = document.createElement('button')
  restartButton.textContent = 'Reiniciar Juego'
  restartButton.addEventListener('click', resetGame)
}

// Función para inicializar el juego de tres en raya
export function initializeThreeInARow() {
  const gameArea = document.getElementById('gameArea')

  // Limpiar cualquier contenido previo en el área de juego
  gameArea.innerHTML = ''

  // Crear el área de juego
  area2 = document.createElement('div')
  area2.classList.add('area2')
  gameArea.appendChild(area2)

  // Llama a la función para crear el elemento del mensaje y el botón de reinicio
  createMessageElement()

  // Crear el tablero de juego
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

    area2.appendChild(row)
  }

  // Inicializar el turno del jugador X
  currentPlayer = PLAYER_X
  displayMessage(`Turno del jugador ${currentPlayer}`)
}

// Función para manejar el clic en una celda del tablero
function handleCellClick(event) {
  if (gameEnded) return // Si el juego ha terminado, no hacer nada

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
      area2.appendChild(restartButton) // Mostrar el botón de reinicio
      gameEnded = true // El juego ha terminado
      return // Detener la ejecución después de mostrar el mensaje
    } else {
      // Verificar si hay empate
      if (checkDraw()) {
        displayMessage('¡Empate!')
        area2.appendChild(restartButton) // Mostrar el botón de reinicio
        gameEnded = true // El juego ha terminado
        return
      }

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

// Función para verificar si hay un empate
function checkDraw() {
  for (let row of board) {
    for (let cell of row) {
      if (cell === '') {
        return false // Todavía hay celdas vacías, no hay empate
      }
    }
  }
  return true // Todas las celdas están ocupadas, hay empate
}

// Función para mostrar un mensaje en el tablero
function displayMessage(message) {
  const messageElement = document.getElementById('message')
  messageElement.textContent = message
}

// Función para limpiar el tablero y reiniciar el juego
function resetGame() {
  area2.removeChild(restartButton) // Eliminar el botón de reinicio
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
  currentPlayer = PLAYER_X
  gameEnded = false // Restablecer el estado del juego
  initializeThreeInARow()
  displayMessage(`Turno del jugador ${currentPlayer}`)
}

// Función para iniciar el juego
function startGame(player) {
  currentPlayer = player
  initializeThreeInARow()
  displayMessage(`Turno del jugador ${currentPlayer}`)
}
