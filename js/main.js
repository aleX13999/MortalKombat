import { player1, player2 } from './players.js'
import { arenas, formControl } from './queryElements.js'
import { enemyAttack, playerAttack } from './fight.js'
import { createElement, showResults } from './utils.js'
import { generateLogs } from './logs.js'

const createPlayer = (playerObj) => {
    const player = createElement('div', `player${playerObj.player}`)
    const progressbar = createElement('div', 'progressbar')
    const character = createElement('div', 'character')
    const life = createElement('div', 'life')
    const name = createElement('div', 'name')
    const img = createElement('img')

    life.style.width = playerObj.hp + '%'
    name.innerText = playerObj.name
    img.src = playerObj.img

    progressbar.appendChild(name)
    progressbar.appendChild(life)

    character.appendChild(img)

    player.appendChild(progressbar)
    player.appendChild(character)

    return player
}

arenas.appendChild(createPlayer(player1))
arenas.appendChild(createPlayer(player2))

generateLogs('start', player1, player2)

formControl.addEventListener('submit', (e) => {
    e.preventDefault()

    const enemyAtt = enemyAttack()
    const ourAtt = playerAttack()

    const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = enemyAtt
    const { hit: hitOur, defence: defenceOur, value: valueOur } = ourAtt

    if (hitOur !== defenceEnemy) {
        player2.changeHP(valueOur)
        player2.renderHP()
        generateLogs('hit', player1, player2, valueOur)
    } else {
        generateLogs('defence', player1, player2)
    }

    if (hitEnemy !== defenceOur) {
        player1.changeHP(valueEnemy)
        player1.renderHP()
        generateLogs('hit', player2, player1, valueEnemy)
    } else {
        generateLogs('defence', player2, player1)
    }

    showResults()
})