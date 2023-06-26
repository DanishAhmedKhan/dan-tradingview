import { ChartFrameManager } from "../ChartFrameManager"
import { StorageManager } from "./StorageManager"
import { TickerStorage, ToolData } from "./TickerStorage"

abstract class Tool {

    public abstract readonly TOOL_CLASS: string
    public abstract readonly KEY: string

    protected storageManager: StorageManager
    protected chartFrameManager: ChartFrameManager
    protected isSelected: boolean

    protected toolHtmlElement: HTMLElement | null

    constructor(storageManager: StorageManager, chartFrameManager:ChartFrameManager) {
        this.storageManager = storageManager
        this.chartFrameManager = chartFrameManager
        this.isSelected = false
        this.toolHtmlElement = null
    }

    public getIsSelected(): boolean {
        return this.isSelected
    }

    public setIsSelected(isSelected: boolean): void {
        this.isSelected = isSelected
    }

    public addClickListener(toolBoxHtmlElement: HTMLElement): void {
        this.toolHtmlElement = toolBoxHtmlElement.querySelector(`.${this.TOOL_CLASS}`)!
        
        this.toolHtmlElement.addEventListener('click', e => {
            if (!this.isSelected) {
                this.isSelected = true
                this.toolHtmlElement?.classList.add(`tool_item_selected`)
                this.addChartListener()
            }
        })
    }

    protected getTickerStorage(): TickerStorage {
        let chartFrame = this.chartFrameManager.getActiveChartFrame()
        let ticker = chartFrame.getTicker()
        let tickerStorage = this.storageManager.getTickerStorage(ticker)
        return tickerStorage
    }

    protected getData() {
        let tickerStorage = this.getTickerStorage()
        let data = tickerStorage.data[this.KEY]
        if (!data) data = []
        return data
    }

    public addAllToChart(): void {
        this.getData().forEach(line => 
            this.addToChart(line, false)
        )
    }

    public removeAllFromChart(): void {
        this.getData().forEach(line => 
            this.removeFromChart(line, false)
        )
    }

    abstract getHtml(): string

    abstract addChartListener(): void

    abstract addToChart(
        tool: ToolData, 
        shouldUpdtaeData: boolean
    ): void

    abstract removeFromChart(
        tool: ToolData, 
        shouldUpdtaeData: boolean
    ): void
}

export { Tool }