interface Drawable {
    getPaneView(): any
    update(): void
    paint(target: any): void
    remove(): void
}

export { Drawable }