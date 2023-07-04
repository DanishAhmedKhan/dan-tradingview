import { svg } from "../helper/svg"
import { Drawable } from "./drawable"
import { DrawingManager } from "./drawing-manager"
import { Point } from "./point"
import { Widget } from "./toolbar"

type Options = {
    id: string,
    visible: boolean,
}

abstract class Drawing<RendererDataType extends Options> implements Drawable {
    protected options: RendererDataType
    protected widget: Array<Widget>

    protected visibleInCanvas: boolean = true
    protected hover: boolean = true

    private drawingManager: DrawingManager

    protected abstract hoveredCursorStyle: string

    constructor(options: RendererDataType,
        drawingManager: DrawingManager,
        widget: Array<Widget>
    ) {
        this.options = options
        this.widget = [...widget, {
            name: 'Delete',
            svg: svg.delete,
            callback: () => {
                drawingManager.remove(this)
                drawingManager.toolbarManager.drawingToolbar.hide()
            }
        }]
        this.drawingManager = drawingManager
        drawingManager.toolbarManager.addDrawingWidget(this.widget, this)
    }

    public getOptions(): RendererDataType {
        return this.options
    }

    public setOptions(options: RendererDataType): void {
        this.options = options
    }

    public getWidget(): Array<Widget> {
        return this.widget
    }

    public setWidget(widget: Array<Widget>): void {
        this.widget = widget
    }

    public getPaneView(): any {
        const renderer = {
            draw: (target: any) => {
                let { _context: context, _bitmapSize: bitmapSize } = target

                if (!this.options ||
                    !this.options.visible ||
                    !this.isInView(bitmapSize)) {
                    return
                }
                
                this.paint(context, bitmapSize)
                let toolbarManager = this.drawingManager.toolbarManager
                if ((toolbarManager.drawingToolbar.isVisible() && 
                    toolbarManager.activeDrawing == this) || this.hover) {
                    this.paintHover(context, bitmapSize)
                }
            }
        }
        const paneView = () => {
            return renderer
        }
        return { renderer: paneView }
    }

    public hitTest(x: number, y: number): any {
        this.hover = this.isHover(x, y)

        if (this.hover) {
            return {
                cursorStyle: this.hoveredCursorStyle,
				// hitTestData: this.options,
				// externalId: this.options.id,
			}
        }
        
        return null
    }

    public abstract update(): void

    public abstract isInView(bitmapSize: any): boolean

    public abstract paint(context: any, bitmapSize: any): void 

    public abstract paintHover(context: any, bitmapSize: any): void 

    public abstract isHover(x: number, y: number): boolean
}

export { Drawing, Options }