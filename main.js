const arenas = document.querySelector('.arenas')
const randomBtn = document.querySelector('.button')

const player1 = {
    player: 1,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Холод'],
    attack: function() {
        console.log(`${this.name} Fight...`)
    },
}

const player2 = {
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Меч'],
    attack: function() {
        console.log(`${this.name} Fight...`)
    },
}

const createElement = (tag, className) => {
    const newTag = document.createElement(tag)
    if (className) {
        newTag.classList.add(className)
    }

    return newTag
}

const createPlayer1 = (playerObj) => {
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

const changeHP = (player) => {
    const playerLife = document.querySelector(
        '.player' + player.player + ' .life'
    )

    const random = getRandom()
    if (player.hp - random < 0) {
        player.hp = 0
    } else {
        player.hp -= random
    }

    playerLife.style.width = player.hp + '%'
}

const getRandom = () => {
    const random = 1 + Math.random() * 20
    return random
}

const playerWin = (name) => {
    const winTitle = createElement('div', 'loseTitle')
    winTitle.innerText = name + ' win'

    return winTitle
}

arenas.appendChild(createPlayer1(player1))
arenas.appendChild(createPlayer1(player2))

randomBtn.addEventListener('click', () => {
    changeHP(player1)
    changeHP(player2)

    if (player1.hp <= 0 || player2.hp <= 0) {
        if (player1.hp <= 0) {
            arenas.appendChild(playerWin(player2.name))
        } else if (player2.hp <= 0) {
            arenas.appendChild(playerWin(player1.name))
        }

        randomBtn.disabled = true
    }
})