import { player1, player2 } from './players.js'
import { generateLogs } from './logs.js'
import { arenas, randomBtn } from './queryElements.js'

export const createElement = (tag, className) => {
    const newTag = document.createElement(tag)
    if (className) {
        newTag.classList.add(className)
    }

    return newTag
}

export const getRandom = (number) =>
    Math.round(1 + Math.random() * (number - 1))

export const createReloadButton = () => {
    const reloadWrap = createElement('div', 'reloadWrap')
    const reloadBtn = createElement('button', 'button')
    reloadBtn.innerText = 'Reload'
    reloadBtn.addEventListener('click', () => window.location.reload())
    reloadWrap.appendChild(reloadBtn)

    return reloadWrap
}

const playerWin = (name) => {
    const winTitle = createElement('div', 'winTitle')
    if (name) {
        winTitle.innerText = name + ' win'
    } else {
        winTitle.innerText = 'draw'
    }

    return winTitle
}

export const showResults = () => {
    const { hp: hpPlayer1, name: namePlayer1 } = player1
    const { hp: hpPlayer2, name: namePlayer2 } = player2

    if (hpPlayer1 === 0 || hpPlayer2 === 0) {
        randomBtn.disabled = true
        arenas.appendChild(createReloadButton())
    }

    if (hpPlayer1 === 0 && hpPlayer2 === 0) {
        arenas.appendChild(playerWin())
        generateLogs('draw')
    } else if (hpPlayer1 === 0) {
        arenas.appendChild(playerWin(namePlayer2))
        generateLogs('end', player2, player1)
    } else if (hpPlayer2 === 0) {
        arenas.appendChild(playerWin(namePlayer1))
        generateLogs('end', player1, player2)
    }
}