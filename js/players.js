import { changeHP, elHP, renderHP } from './hp.js'

export const player1 = {
    player: 1,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Холод'],
    changeHP,
    elHP,
    renderHP,
}

export const player2 = {
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Меч'],
    changeHP,
    elHP,
    renderHP,
}