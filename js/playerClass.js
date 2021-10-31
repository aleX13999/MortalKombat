export class Player {
    constructor(props) {
        this.id = props.id
        this.name = props.name
        this.hp = props.hp
        this.avatar = props.avatar
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