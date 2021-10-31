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

    start = async() => {
        const players = await this.getPlayers()

        this.player1 = new Player({
            ...players[getRandom(players.length) - 1],
            player: 1,
        })
        this.player2 = new Player({
            ...players[getRandom(players.length) - 1],
            player: 2,
        })

        arenas.appendChild(this.createPlayer(this.player1))
        arenas.appendChild(this.createPlayer(this.player2))

        formControl.addEventListener('submit', (e) => {
            e.preventDefault()
            this.fight()
        })
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

    fight = async() => {
        const playerAtt = this.playerAttack()

        const attacks = await fetch(
            'http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                method: 'POST',
                body: JSON.stringify({
                    hit: playerAtt.hit,
                    defence: playerAtt.defence,
                }),
            }
        ).then((response) => response.json())

        const {
            value: valueOur,
            hit: hitOur,
            defence: defenceOur,
        } = attacks.player1
        const {
            value: valueEnemy,
            hit: hitEnemy,
            defence: defenceEnemy,
        } = attacks.player2

        if (hitOur !== defenceEnemy) {
            this.player2.changeHP(valueOur)
            this.player2.renderHP()
            generateLogs('hit', this.player1, this.player2, valueOur)
        } else {
            generateLogs('defence', this.player1, this.player2)
        }

        if (hitEnemy !== defenceOur) {
            this.player1.changeHP(valueEnemy)
            this.player1.renderHP()
            generateLogs('hit', this.player2, this.player1, valueEnemy)
        } else {
            generateLogs('defence', this.player2, this.player1)
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
        const { hp: hpPlayer1, name: namePlayer1 } = this.player1
        const { hp: hpPlayer2, name: namePlayer2 } = this.player2

        if (hpPlayer1 === 0 || hpPlayer2 === 0) {
            randomBtn.disabled = true
            arenas.appendChild(createReloadButton())
        }

        if (hpPlayer1 === 0 && hpPlayer2 === 0) {
            arenas.appendChild(this.playerWin())
            generateLogs('draw')
        } else if (hpPlayer1 === 0) {
            arenas.appendChild(this.playerWin(namePlayer2))
            generateLogs('end', this.player2, this.player1)
        } else if (hpPlayer2 === 0) {
            arenas.appendChild(this.playerWin(namePlayer1))
            generateLogs('end', this.player1, this.player2)
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