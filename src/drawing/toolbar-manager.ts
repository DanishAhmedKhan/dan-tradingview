import { Drawable } from "./drawable"
import { Toolbar, Widget } from "./toolbar"

class ToolbarManager {
    public drawingToolbar: Toolbar
    public activeDrawing: Drawable | null = null
    public hoveredDrawing: Drawable | null = null

    constructor() {
        this.drawingToolbar = new Toolbar()
        this.drawingToolbar.hide()
    }

    public addDrawingWidget(widget: Array<Widget>, drawable: Drawable): void {
        this.drawingToolbar.setWidget(widget)
        this.activeDrawing = drawable
    }

    public getActiveDrawing(): Drawable | null {
        return this.activeDrawing
    }

    public hideDrawingToolbar() {
        this.drawingToolbar.hide()
        this.activeDrawing = null
    }

    public getHoveredDrawing(): Drawable | null {
        return this.hoveredDrawing
    }

    public setHoveredDrawing(drawing: Drawable | null): void {
        console.log('setHoveredDrawing', drawing)
        this.hoveredDrawing = drawing
    }
}

export { ToolbarManager }