class Player {
    constructor(props) {
        this.player = props.player
        this.name = props.name
        this.hp = props.hp
        this.img = props.img
    }

    changeHP = (random) => {
        if (this.hp - random < 0) {
            this.hp = 0
        } else {
            this.hp -= random
        }
    }

    elHP = () => document.querySelector(`.player${this.player} .life`)

    renderHP = () => (this.elHP().style.width = this.hp + '%')
}

export const player1 = new Player({
    player: 1,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
})

export const player2 = new Player({
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
})