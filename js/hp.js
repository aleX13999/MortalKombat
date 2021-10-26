export const changeHP = function(random) {
    if (this.hp - random < 0) {
        this.hp = 0
    } else {
        this.hp -= random
    }
}

export const elHP = function() {
    return document.querySelector(`.player${this.player} .life`)
}

export const renderHP = function() {
    this.elHP().style.width = this.hp + '%'
}