const arenas = document.querySelector('.arenas')
const randomBtn = document.querySelector('.button')

const changeHP = function(random) {
    if (this.hp - random < 0) {
        this.hp = 0
    } else {
        this.hp -= random
    }
}

const elHP = function() {
    return document.querySelector('.player' + this.player + ' .life')
}

const renderHP = function(playerLife) {
    playerLife.style.width = this.hp + '%'
}

const player1 = {
    player: 1,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Холод'],
    attack: function() {
        console.log(`${this.name} Fight...`)
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
}

const createElement = (tag, className) => {
    const newTag = document.createElement(tag)
    if (className) {
        newTag.classList.add(className)
    }

    return newTag
}

const createPlayer = function(playerObj) {
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

const getRandom = (number) => {
    const random = Math.round(1 + Math.random() * number)
    return random
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

const createReloadButton = function() {
    const reloadWrap = createElement('div', 'reloadWrap')
    const reloadBtn = createElement('button', 'button')
    reloadBtn.innerText = 'Restart'
    reloadBtn.addEventListener('click', function() {
        window.location.reload()
    })
    reloadWrap.appendChild(reloadBtn)

    return reloadWrap
}

arenas.appendChild(createPlayer(player1))
arenas.appendChild(createPlayer(player2))

randomBtn.addEventListener('click', () => {
    player1.changeHP(getRandom(20))
    player1.renderHP(player1.elHP())

    player2.changeHP(getRandom(20))
    player2.renderHP(player2.elHP())

    if (player1.hp === 0 || player2.hp === 0) {
        randomBtn.disabled = true
        arenas.appendChild(createReloadButton())
    }

    if (player1.hp === 0 && player2.hp === 0) {
        arenas.appendChild(playerWin())
    } else if (player1.hp === 0) {
        arenas.appendChild(playerWin(player2.name))
    } else if (player2.hp === 0) {
        arenas.appendChild(playerWin(player1.name))
    }
})