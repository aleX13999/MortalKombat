const player1 = {
  name: 'SUB-ZERO',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: [
    'Холод'
  ],
  attack: function() {
    console.log(`Fight...`)
  },
}

const player2 = {
  name: 'Sonya',
  hp: 90,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: [
    'Меч'
  ],
  attack: function() {
    console.log(`Fight...`)
  },
}

const arenas = document.querySelector('.arenas')

const createPlayer = (playerClass, player) => {
  arenas.innerHTML +=
  `<div class="${playerClass}">
    <div class="progressbar">
      <div class="life" style="width: ${player.hp}%"></div>
      <div class="name">${player.name}</div>
    </div>
    <div class="character">
      <img src="${player.img}" />
    </div>
  </div>`
}

createPlayer('player1', player1)
createPlayer('player2', player2)