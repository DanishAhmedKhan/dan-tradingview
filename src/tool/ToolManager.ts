import { ChartFrame } from "../ChartFrame"
import { ChartFrameManager } from "../ChartFrameManager"
import { DrawingManager } from "../drawing/drawing-manager"
import { HorizontalLineTool } from "./HorizontalLine"
import { StorageManager } from "./StorageManager"
import { Tool } from "./Tool"
import { RectangleTool } from "./rectangle-tool"

class ToolManager {

    private allTools: Array<Tool>
    private storageManager: StorageManager
    private chartFrameManager: ChartFrameManager
    private drawingManger: DrawingManager

    constructor(chartFrameManager: ChartFrameManager, drawingManager: DrawingManager) {
        this.storageManager = new StorageManager()
        this.chartFrameManager = chartFrameManager
        this.drawingManger = drawingManager

        let toolParam = {
            storageManager: this.storageManager,
            chartFrameManager: this.chartFrameManager,
            drawingManager: this.drawingManger
        }

        this.allTools = [
            new HorizontalLineTool(toolParam),
            new RectangleTool(toolParam)
        ]
    }

    public addHtml(toolBoxHtmlElement: HTMLElement): void {
        let toolItemHtml = this.allTools.reduce((acc, t) => {
            return acc += t.getHtml()
        }, "")

        toolBoxHtmlElement.innerHTML = (`
            <div class="tool_list">
                ${toolItemHtml}
            </div>
        `)

        this.initListener(toolBoxHtmlElement)
    }

    public getAllTool(): Array<Tool> {
        return this.allTools
    }
 
    public getStorageManager(): StorageManager {
        return this.storageManager
    }

    public initListener(toolBoxHtmlElement: HTMLElement): void {
        this.allTools.forEach(tool => tool.addClickListener(toolBoxHtmlElement))
    }

    public displayDrawings(chartFrame: ChartFrame): void {
        this.allTools.forEach(tool => tool.addAllToChart())
    }
}

export { ToolManager }