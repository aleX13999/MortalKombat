export class Player {
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