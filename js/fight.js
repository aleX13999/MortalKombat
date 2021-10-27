import { getRandom } from './utils.js'
import { formControl } from './queryElements.js'

export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
export const ATTACK = ['head', 'body', 'foot']

export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1]
    const defence = ATTACK[getRandom(3) - 1]

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

export const playerAttack = () => {
    const attack = {}

    let i = 0

    for (let { name, value, checked }
        of formControl.elements) {
        if (checked && name === 'hit') {
            attack.value = getRandom(HIT[value])
            attack.hit = value
        }
        if (checked && name === 'defence') {
            attack.defence = value
        }

        formControl.elements[i].checked = false
        i++
    }

    return attack
}