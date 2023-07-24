import { Drawable } from "./drawable"
import { Toolbar, Widget } from "./toolbar"

class ToolbarManager {
    public drawingToolbar: Toolbar
    public activeDrawing: Drawable | null = null

    constructor() {
        this.drawingToolbar = new Toolbar('drawing-tool')
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
}

export { ToolbarManager }