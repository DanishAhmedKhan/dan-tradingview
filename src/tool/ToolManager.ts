import { Ticker } from "../Ticker"
import { HorizontalLine } from "./HorizontalLine"
import { ToolStorage, Toolable } from "./ToolStorage"

class ToolManager {

    private allTools: Array<Toolable>
    private storageManager: StorageManager

    constructor(ticker: Ticker) {
        this.storageManager = new StorageManager()

        this.allTools = [
            new HorizontalLine(this.storageManager),
        ]
    }

    public getHtml(): string {
        let toolItemHtml = this.allTools.reduce((acc, t) => {
            return acc += t.getHtml()
        }, "")

        let html = (`
            <div class="tool_list">
                ${toolItemHtml}
            </div>        
        `)

        return html
    }
}

export { ToolManager }