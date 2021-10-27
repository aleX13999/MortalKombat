const normalizeTime = (anyTime) =>
    anyTime.toLocaleString('en-US', {
        minimumIntegerDigits: 2, //минимальное кол-во знаков
        useGrouping: false,
    })

export const getTime = () => {
    const date = new Date()
    const hours = normalizeTime(date.getHours())
    const minutes = normalizeTime(date.getMinutes())
    const seconds = normalizeTime(date.getSeconds())
    return `${hours}:${minutes}:${seconds}`
}