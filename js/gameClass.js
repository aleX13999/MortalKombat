import { Player } from './playerClass.js'
import { arenas, formControl, randomBtn } from './queryElements.js'
import { createElement, createReloadButton, getRandom } from './utils.js'
import { generateLogs } from './logs.js'

export class Game {
    constructor(props) {
        //console.log(this)
    }

    player1
    player2

    HIT = {
        head: 30,
        body: 25,
        foot: 20,
    }

    ATTACK = ['head', 'body', 'foot']

    getPlayers = async() =>
        fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(
            (res) => res.json()
        )

    createPlayer({ id, hp, name, avatar }) {
        const playerNew = createElement('div', `player${id}`)
        const progressbar = createElement('div', 'progressbar')
        const character = createElement('div', 'character')
        const life = createElement('div', 'life')
        const nameNew = createElement('div', 'name')
        const imgNew = createElement('img')

        life.style.width = hp + '%'
        nameNew.innerText = name
        imgNew.src = avatar

        progressbar.appendChild(nameNew)
        progressbar.appendChild(life)

        character.appendChild(imgNew)

        playerNew.appendChild(progressbar)
        playerNew.appendChild(character)

        return playerNew
    }

    start = async() => {
        const players = await this.getPlayers()

        const p1 = players[getRandom(players.length) - 1]
        const p2 = players[getRandom(players.length) - 1]

        this.player1 = new Player(p1)
        this.player2 = new Player(p2)

        console.log(this.player1)
        console.log(this.player2)

        formControl.addEventListener('submit', (e) => {
            e.preventDefault()
            this.fight()
        })
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