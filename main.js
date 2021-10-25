const arenas = document.querySelector('.arenas')
const randomBtn = document.querySelector('.button')
const formControl = document.querySelector('.control')
const chat = document.querySelector('.chat')

const changeHP = function(random) {
    if (this.hp - random < 0) {
        this.hp = 0
    } else {
        this.hp -= random
    }
}

const elHP = function() {
    return document.querySelector(`.player${this.player} .life`)
}

const renderHP = function() {
    this.elHP().style.width = this.hp + '%'
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
}

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    ],
    draw: 'Ничья - это тоже победа!',
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

arenas.appendChild(createPlayer(player1))
arenas.appendChild(createPlayer(player2))

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

const playerAttack = function() {
    const attack = {}

    for (let item of formControl.elements) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value])
            attack.hit = item.value
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value
        }

        item.checked = false
    }

    return attack
}

const showResults = function() {
    if (player1.hp === 0 || player2.hp === 0) {
        randomBtn.disabled = true
        arenas.appendChild(createReloadButton())
    }

    if (player1.hp === 0 && player2.hp === 0) {
        arenas.appendChild(playerWin())
        generateLogs('draw')
    } else if (player1.hp === 0) {
        arenas.appendChild(playerWin(player2.name))
        generateLogs('end', player2, player1)
    } else if (player2.hp === 0) {
        arenas.appendChild(playerWin(player1.name))
        generateLogs('end', player1, player2)
    }
}

const normalizeTime = function(anyTime) {
    return anyTime.toLocaleString('en-US', {
        minimumIntegerDigits: 2, //минимальное кол-во знаков
        useGrouping: false,
    })
}

const generateLogs = function(type, player1, player2, value) {
    let text = ''

    const date = new Date()
    const hours = normalizeTime(date.getHours())
    const minutes = normalizeTime(date.getMinutes())
    const seconds = normalizeTime(date.getSeconds())
    const time = `${hours}:${minutes}:${seconds}`

    switch (type) {
        case 'start':
            text = logs[type]
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name)
                .replace('[time]', time)
            break
        case 'end':
            text = logs[type][getRandom(logs[type].length) - 1]
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name)
            break
        case 'hit':
            text = `${time} - ${logs[type][getRandom(logs[type].length) - 1]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name)} -${value} [${
        player2.hp
      }/100]`
            break
        case 'defence':
            text = `${time} - ${logs[type][getRandom(logs[type].length) - 1]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name)}`
            break
        case 'draw':
            text = logs[type]
    }

    const elem = `<p>${text}</p>`
    chat.insertAdjacentHTML('afterbegin', elem)
}

generateLogs('start', player1, player2)

formControl.addEventListener('submit', function(e) {
    e.preventDefault()

    const enemyAtt = enemyAttack()
    const ourAtt = playerAttack()

    if (ourAtt.hit !== enemyAtt.defence) {
        player2.changeHP(ourAtt.value)
        player2.renderHP()
        generateLogs('hit', player1, player2, ourAtt.value)
    } else {
        generateLogs('defence', player1, player2)
    }

    if (enemyAtt.hit !== ourAtt.defence) {
        player1.changeHP(enemyAtt.value)
        player1.renderHP()
        generateLogs('hit', player2, player1, enemyAtt.value)
    } else {
        generateLogs('defence', player2, player1)
    }

    showResults()
})