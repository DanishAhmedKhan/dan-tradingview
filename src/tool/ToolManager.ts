import { ChartFrame } from "../ChartFrame"
import { ChartFrameManager } from "../ChartFrameManager"
import { HorizontalLine } from "./HorizontalLine"
import { StorageManager } from "./StorageManager"
import { Tool } from "./Tool"

class ToolManager {

    private allTools: Array<Tool>
    private storageManager: StorageManager
    private chartFrameManager: ChartFrameManager

    constructor(chartFrameManager: ChartFrameManager) {
        this.storageManager = new StorageManager()
        this.chartFrameManager = chartFrameManager

        this.allTools = [
            new HorizontalLine(this.storageManager, this.chartFrameManager),
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