const arenas = document.querySelector('.arenas')
const randomBtn = document.querySelector('.button')
const formControl = document.querySelector('.control')

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

const renderHP = function() {
    this.elHP().style.width = this.hp + '%'
}

//Проверяем, если игрок не попал в защиту, тогда отнимаем жизни
const checkedAtt = function(playerAtt1, playerAtt2) {
    if (playerAtt1.hit != playerAtt2.defence) {
        this.changeHP(playerAtt1.value)
        this.renderHP()
    }
}

const attack = function() {}

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot']

const player1 = {
    player: 1,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Холод'],
    attack,
    changeHP,
    elHP,
    renderHP,
    checkedAtt,
}

const player2 = {
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Меч'],
    attack,
    changeHP,
    elHP,
    renderHP,
    checkedAtt,
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
    return Math.round(1 + Math.random() * (number - 1))
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
    reloadBtn.innerText = 'Reload'
    reloadBtn.addEventListener('click', function() {
        window.location.reload()
    })
    reloadWrap.appendChild(reloadBtn)

    return reloadWrap
}

const enemyAttack = function() {
    const hit = ATTACK[getRandom(3) - 1]
    const defence = ATTACK[getRandom(3) - 1]

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

arenas.appendChild(createPlayer(player1))
arenas.appendChild(createPlayer(player2))

formControl.addEventListener('submit', function(e) {
    e.preventDefault()
    const enemyAtt = enemyAttack()
    const ourAtt = {}

    for (let item of formControl.elements) {
        if (item.checked && item.name === 'hit') {
            ourAtt.value = getRandom(HIT[item.value])
            ourAtt.hit = item.value
        }
        if (item.checked && item.name === 'defence') {
            ourAtt.defence = item.value
        }

        item.checked = false
    }

    player1.checkedAtt(enemyAtt, ourAtt)
    player2.checkedAtt(ourAtt, enemyAtt)

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