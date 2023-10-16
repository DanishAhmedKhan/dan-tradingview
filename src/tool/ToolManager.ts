import { ChartFrameManager } from "../ChartFrameManager"
import { StorageManager } from "./StorageManager"
import { Tool } from "./Tool"
import { HorizontalLineTool } from "./horizontal-line-tool"
import { RectangleTool } from "./rectangle-tool"
import { VerticalLineTool } from "./vertical-line-tool"
import { TrendLineTool } from "./trend-line-tool"
import { LongPositionTool } from "./long-position-tool"
import { ShortPositionTool } from "./short-position-tool"

class ToolManager {

    private allTools: Array<Tool>
    private storageManager: StorageManager
    private chartFrameManager: ChartFrameManager

    constructor(chartFrameManager: ChartFrameManager) {
        this.storageManager = new StorageManager()
        this.chartFrameManager = chartFrameManager

        let toolParam = {
            toolManager: this,
            storageManager: this.storageManager,
            chartFrameManager: this.chartFrameManager,
        }

        this.allTools = [
            new HorizontalLineTool(toolParam),
            new VerticalLineTool(toolParam),
            new TrendLineTool(toolParam),
            new RectangleTool(toolParam),
            new LongPositionTool(toolParam),
            new ShortPositionTool(toolParam),
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

    public isToolSelected(): boolean {
        return this.allTools.reduce((acc, tool) => acc || tool.getIsSelected(), false)
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
}

export { ToolManager }