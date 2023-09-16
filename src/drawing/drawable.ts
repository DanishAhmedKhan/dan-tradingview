import { Tool } from "../tool/Tool"
import { Point } from "./point"
import { Toolbar, Widget } from "./toolbar"

interface Drawable {
    edit: boolean,
    getPoint(): Array<Point>
    getTool(): Tool
    isEdit(): boolean
    setEdit(edit: boolean): void
    getOptions(): any
    getPaneView(): any
    getWidget(): Array<Widget>
    setWidget(widget: Array<Widget>): void
    update(): void
    isInView(bitmapSize: any): boolean
    paint(context: any, bitmapSize: any): void
    paintHover(context: any, bitmapSize: any): void
    hitTest(x: number, y: number): any
    isHover(x: number, y: number): boolean
    editPoint(x: number, y: number): void
}

export { Drawable }