import { player1, player2 } from './playerClass.js'
import { arenas, formControl, randomBtn } from './queryElements.js'
import { createElement, createReloadButton, getRandom } from './utils.js'
import { generateLogs } from './logs.js'

export class Game {
    constructor(props) {
        //console.log(this)
    }

    HIT = {
        head: 30,
        body: 25,
        foot: 20,
    }

    ATTACK = ['head', 'body', 'foot']

    start = () => {
        arenas.appendChild(this.createPlayer(player1))
        arenas.appendChild(this.createPlayer(player2))

        generateLogs('start', player1, player2)
    }

    createPlayer({ player, hp, name, img }) {
        const playerNew = createElement('div', `player${player}`)
        const progressbar = createElement('div', 'progressbar')
        const character = createElement('div', 'character')
        const life = createElement('div', 'life')
        const nameNew = createElement('div', 'name')
        const imgNew = createElement('img')

        life.style.width = hp + '%'
        nameNew.innerText = name
        imgNew.src = img

        progressbar.appendChild(nameNew)
        progressbar.appendChild(life)

        character.appendChild(imgNew)

        playerNew.appendChild(progressbar)
        playerNew.appendChild(character)

        return playerNew
    }

    fight() {
        const {
            hit: hitEnemy,
            defence: defenceEnemy,
            value: valueEnemy,
        } = this.enemyAttack()
        const {
            hit: hitOur,
            defence: defenceOur,
            value: valueOur,
        } = this.playerAttack()

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

        this.showResults()
    }

    enemyAttack() {
        const hit = this.ATTACK[getRandom(3) - 1]
        const defence = this.ATTACK[getRandom(3) - 1]

        return {
            value: getRandom(this.HIT[hit]),
            hit,
            defence,
        }
    }

    playerAttack() {
        const attack = {}
        let i = 0

        for (let { name, value, checked }
            of formControl.elements) {
            if (checked && name === 'hit') {
                attack.value = getRandom(this.HIT[value])
                attack.hit = value
            }
            if (checked && name === 'defence') {
                attack.defence = value
            }

            formControl.elements[i].checked = false
            i++
        }

        return attack
    }

    showResults() {
        const { hp: hpPlayer1, name: namePlayer1 } = player1
        const { hp: hpPlayer2, name: namePlayer2 } = player2

        if (hpPlayer1 === 0 || hpPlayer2 === 0) {
            randomBtn.disabled = true
            arenas.appendChild(createReloadButton())
        }

        if (hpPlayer1 === 0 && hpPlayer2 === 0) {
            arenas.appendChild(this.playerWin())
            generateLogs('draw')
        } else if (hpPlayer1 === 0) {
            arenas.appendChild(this.playerWin(namePlayer2))
            generateLogs('end', player2, player1)
        } else if (hpPlayer2 === 0) {
            arenas.appendChild(this.playerWin(namePlayer1))
            generateLogs('end', player1, player2)
        }
    }

    playerWin(name) {
        const winTitle = createElement('div', 'winTitle')
        if (name) {
            winTitle.innerText = name + ' win'
        } else {
            winTitle.innerText = 'draw'
        }

        return winTitle
    }
}

formControl.addEventListener('submit', (e) => {
    e.preventDefault()

    const game = new Game()
    game.fight()
})