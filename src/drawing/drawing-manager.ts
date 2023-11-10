import { VerticalLine } from "./vertical-line"
import { Rectangle } from "./rectangle"
import { Drawable } from "./drawable"
import { DrawingType } from "./drawing-type"
import { TerendLine } from "./trend-line"
import { HorizontalLine } from "./horizontal-line"
import { ToolManager } from "../tool/ToolManager"
import { ToolbarManager } from "./toolbar-manager"
import { LongPosition } from "./long-position"
import { ShortPosition } from "./short-position"
import { PriceRange } from "./price-range"

class DrawingManager {
    public chartReference: any | null = null
    private drawings: Array<Drawable> = []

    private toolManager: ToolManager
    public toolbarManager: ToolbarManager

    private hoveredDrawing: Drawable | null = null
    private isDrawingInitialized: boolean = false

    public broadcast = new BroadcastChannel('drawing_channel')

    constructor(toolManager: ToolManager, toolbarManager: ToolbarManager) {
        this.toolManager = toolManager
        this.toolbarManager = toolbarManager

        this.handleDrawingMessage()
    }

    public handleDrawingMessage(): void {
        this.broadcast.onmessage = (message) => {
            let data = message.data
            let action = data.action

            if (action === 'ADD') {
                let toolData = data.toolData
                this.removeById(toolData.id)
                this.add(toolData)
            } else if (action === 'REMOVE') {
                this.removeById(data.toolData.id)
            }

            this.toolbarManager.drawingToolbar.hide()
        }
    }

    public getIsDrawingInitialized(): boolean {
        return this.isDrawingInitialized
    }

    public setIsDrawingInitialized(isDrawingInitialized: boolean): void {
        this.isDrawingInitialized = isDrawingInitialized
    }

    public getDrawing(toolData: any): Drawable {
        let drawing = this.drawings.find(drawing => {
            return drawing.getOptions() === toolData
        })!

        return drawing
    }

    public getHoveredDrawing(): Drawable | null {
        return this.hoveredDrawing
    }

    public add(options: any): Drawable {
        let drawing: Drawable

        if (!options.id) options.id = String(+new Date())
        if (!options.visible) options.visible = true

        let allTool = this.toolManager.getAllTool()

        switch (options.type) {
            case DrawingType.RECTANGLE:
                drawing = new Rectangle(allTool[3], options, this)
                break
            case DrawingType.HORIZONTAL_LINE:
                drawing = new HorizontalLine(allTool[0], options, this)
                break
            case DrawingType.VERTICAL_LINE:
                drawing = new VerticalLine(allTool[1], options, this)
                break
            case DrawingType.TREND_LINE:
                drawing = new TerendLine(allTool[2], options, this)
                break
            case DrawingType.LONG_POSITION:
                drawing = new LongPosition(allTool[4], options, this)
                break
            case DrawingType.SHORT_POSITION:
                drawing = new ShortPosition(allTool[5], options, this)
                break
            case DrawingType.PRICE_RANGE:
                drawing = new PriceRange(allTool[6], options, this)
                break
            default:
                throw Error('Drawing not found of type')
        }

        this.drawings.push(drawing)
        this.chartReference.requestUpdate()
        return drawing
    }

    public remove(drawing: Drawable): void {
        const index = this.drawings.indexOf(drawing)
        if (index !== -1) {
            this.drawings.splice(index, 1)
            this.chartReference.requestUpdate()

        }
    }

    public removeById(id: string): void {
        let drawing = this.drawings.find(d => d.getOptions().id == id)
        if (drawing) {
            const index = this.drawings.indexOf(drawing)
            if (index >= 0) {
                this.drawings.splice(index, 1)
                this.chartReference.requestUpdate()
            }
        }
    }

    public updateAllViews(): void {
        for (const drawing of this.drawings) {
            drawing.update()
        }
    }

    public paneViews() {
        let paneViews = []

        const drawingViews = this.drawings
            .map(drawing => drawing.getPaneView())
        paneViews.push(...drawingViews)

        return paneViews
    }

    public hitTest(x: number, y: number): any {
        let hoveredData = null
        let hoveredDrawing = null

        this.drawings.forEach(drawing => {
            let hovered = drawing.hitTest(x, y)
            if (hovered !== null) {
                hoveredDrawing = drawing
                hoveredData = hovered
            }
        })

        this.hoveredDrawing = hoveredDrawing
        return hoveredData
    }

    public hideToolbar(): void {
        document.onmousedown = (e) => {
            let target = e.target as HTMLElement
            if (!target.classList.contains('dtv_toolbar_widget_item')) {
                if (!this.toolManager.isToolSelected()) {
                    this.toolbarManager.hideDrawingToolbar()
                    this.chartReference.requestUpdate()
                }

            }

            if (this.hoveredDrawing !== null) {
                this.toolbarManager.addDrawingWidget(
                    this.hoveredDrawing.getWidget(),
                    this.hoveredDrawing,
                )
            }
        }
    }

    public attached(chartReference: any): void {
        this.chartReference = chartReference
        this.hideToolbar()
    }
}

export { DrawingManager }