export function getId(length: number = 24): string {
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let id = ''

    for (let i = 0; i < length; i++) {
        let random = Math.floor(Math.random() * (CHARACTERS.length + 1))
        let char = CHARACTERS.charAt(random)
        if ((Math.floor(Math.random() * 2) == 0)) {
            char = char.toLowerCase()
        }

        id += char
    }

    return id
}

export function getDate(timestamp: number): string {
    let date = new Date(timestamp * 1000)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let monthStr = month < 10 ? '0' + month : month + ''
    let dayStr = day < 10 ? '0' + day : day + ''

    let dateValue = year + '-' + monthStr + '-' + dayStr

    return dateValue
}

export function getYearWeek(timestamp: number) {
    let date = new Date(timestamp * 1000)

    let year = new Date(date.getFullYear(), 0, 1)
    let days = Math.floor((+date - +year) / (24 * 60 * 60 * 1000))
    let week = Math.ceil((date.getDay() + 1 + days) / 7)
    let yearWeek = date.getFullYear() + '-' + week

    return yearWeek
}