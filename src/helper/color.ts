export const Color = {
    WHITE: 'rgb(255, 255, 255)',
    BLACK: 'rgb(0, 0. 0)',
}

export function hexToRgba(hex: string, opacity: number): string {
    hex = hex.substring(1);

    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}