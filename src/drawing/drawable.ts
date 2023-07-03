import { Toolbar } from "./toolbar"

interface Drawable {
    toolbar: Toolbar
    getToolbar(): Toolbar
    getPaneView(): any
    update(): void
    isInView(bitmapSize: any): boolean
    paint(context: any, bitmapSize: any): void
    paintHover(context: any, bitmapSize: any): void
    hitTest(x: number, y: number): any
    isHover(x: number, y: number): boolean
    remove(): void
}

export { Drawable }