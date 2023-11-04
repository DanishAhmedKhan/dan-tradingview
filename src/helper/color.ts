export const Color = {
    WHITE: 'rgb(255, 255, 255)',
    BLACK: 'rgb(0, 0, 0)',
    RED: 'rgb(255, 0, 0)',
    GREEN: 'rgb(0, 255, 0)',
    BLUE: 'rgb(0, 0, 255)',
    CANDLE_GREEN: '#CEEBE6',
    CANDLE_RED: '#FCD7DA',
}

export function hexToRgba(color: string, opacity: number): string {
    if (color.includes('rgba')) return color

    if (color.includes('rgb')) {
        return color.substring(0, color.length - 1) + ', ' + opacity + ')'
    }

    color = color.substring(1)
    if (color.length === 3) {
        color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`
    }

    const r = parseInt(color.substring(0, 2), 16)
    const g = parseInt(color.substring(2, 4), 16)
    const b = parseInt(color.substring(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
}