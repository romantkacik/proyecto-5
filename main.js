//main.js

import './style.css'
import { startMemoryGame } from './components/game-1/game'
import { startTrheeInARow } from './components/game-2/game'
import { startHanged } from './components/game-3/game'
import { startToPlay } from './components/startToPlay/start'

const games = {
  'Memory game': startMemoryGame,
  'Three in a Row': startTrheeInARow,
  'Hanged Country': startHanged,
}

const pageContainer = document.querySelector('.page-container')
const startButton = document.getElementById('start-btn')
const gameSelectContainer = document.getElementById('game-select-container')
const gameContainer = document.getElementById('game-deployment-container')

startButton.addEventListener('click', () => {
  gameSelectContainer.innerHTML = ''
  const buttons = createGameButtons(Object.keys(games), startToPlay)
  gameSelectContainer.appendChild(buttons)
})

function createGameButtons(gameNames, onClickHandler) {
  const buttonsContainer = document.createElement('div')

  gameNames.forEach((gameName) => {
    const button = document.createElement('button')
    button.textContent = gameName
    button.addEventListener('click', () => onClickHandler(gameName))
    buttonsContainer.appendChild(button)
  })

  return buttonsContainer
}
