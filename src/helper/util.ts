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