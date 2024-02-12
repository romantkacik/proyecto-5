//start.js

import './start.css'

export function startToPlay(gameNames, onClickHandler) {
  const gamesContainer = document.createElement('div')
  gamesContainer.className = 'gameContainer'

  gameNames.forEach((gameName) => {
    const gameButton = document.createElement('button')
    gameButton.textContent = gameName
    gameButton.addEventListener('click', () => onClickHandler(gameName))
    gamesContainer.appendChild(gameButton)
  })

  return gamesContainer
}
