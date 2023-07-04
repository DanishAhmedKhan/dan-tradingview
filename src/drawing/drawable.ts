import { Toolbar, Widget } from "./toolbar"

interface Drawable {
    getPaneView(): any
    getWidget(): Array<Widget>
    setWidget(widget: Array<Widget>): void
    update(): void
    isInView(bitmapSize: any): boolean
    paint(context: any, bitmapSize: any): void
    paintHover(context: any, bitmapSize: any): void
    hitTest(x: number, y: number): any
    isHover(x: number, y: number): boolean
}

export { Drawable }