export const createElement = (tag, className) => {
    const newTag = document.createElement(tag)
    if (className) {
        newTag.classList.add(className)
    }

    return newTag
}

export const getRandom = (number) =>
    Math.round(1 + Math.random() * (number - 1))

export const createReloadButton = () => {
    const reloadWrap = createElement('div', 'reloadWrap')
    const reloadBtn = createElement('button', 'button')
    reloadBtn.innerText = 'Reload'
    reloadBtn.addEventListener('click', () => window.location.reload())
    reloadWrap.appendChild(reloadBtn)

    return reloadWrap
}