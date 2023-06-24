import { ChartFrame } from "../ChartFrame"
import { HorizontalLine } from "./HorizontalLine"
import { StorageManager } from "./StorageManager"
import { Tool } from "./Tool"

class ToolManager {

    private allTools: Array<Tool>
    private storageManager: StorageManager

    constructor() {
        this.storageManager = new StorageManager()

        this.allTools = [
            new HorizontalLine(this.storageManager),
        ]
    }

    public addHtml($toolBox: HTMLDivElement): void {
        let toolItemHtml = this.allTools.reduce((acc, t) => {
            return acc += t.getHtml()
        }, "")

        $toolBox.innerHTML = (`
            <div class="tool_list">
                ${toolItemHtml}
            </div>
        `)

        this.initListener($toolBox)
    }

    public getStorageManager(): StorageManager {
        return this.storageManager
    }

    public initListener($toolDiv: HTMLDivElement): void {
        this.allTools.forEach(tool => tool.addClickListener($toolDiv))
    }

    public displayDrawings(chartFrame: ChartFrame): void {
        this.allTools.forEach(tool => tool.addAllToChart(chartFrame))
    }
}

export { ToolManager }