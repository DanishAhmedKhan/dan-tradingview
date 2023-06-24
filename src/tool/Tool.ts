import { ChartFrame } from "../ChartFrame"
import { StorageManager } from "./StorageManager"
import { TickerStorage, ToolData } from "./TickerStorage"

abstract class Tool {

    public abstract readonly TOOL_CLASS: string
    public abstract readonly KEY: string

    protected storageManager: StorageManager
    protected isSelected: boolean

    protected $tool: HTMLDivElement | null

    constructor(storageManager: StorageManager) {
        this.storageManager = storageManager
        this.isSelected = false
        this.$tool = null
    }

    public getIsSelected(): boolean {
        return this.isSelected
    }

    public setIsSelected(isSelected: boolean): void {
        this.isSelected = isSelected
    }

    public addClickListener($toolBox: HTMLDivElement): void {
        this.$tool = $toolBox.querySelector(`.${this.TOOL_CLASS}`)!
        
        this.$tool.addEventListener('click', e => {
            if (!this.isSelected) {
                this.isSelected = true
                this.$tool?.classList.add(`tool_item_selected`)
                this.addChartListener()
            }
        })
    }

    protected getTickerStorage(chartFrame: ChartFrame): TickerStorage {
        let ticker = chartFrame.getTicker()
        let tickerStorage = this.storageManager.getTickerStorage(ticker)
        return tickerStorage
    }

    protected getData(chartFrame: ChartFrame) {
        let tickerStorage = this.getTickerStorage(chartFrame)
        let data = tickerStorage.data[this.KEY]
        if (!data) data = []
        return data
    }

    public addAllToChart(chartFrame: ChartFrame): void {
        this.getData(chartFrame).forEach(line => 
            this.addToChart(chartFrame.getChart().getCandleSeries(), line, false)
        )
    }

    public removeAllFromChart(chartFrame: any): void {
        this.getData(chartFrame).forEach(line => 
            this.removeFromChart(chartFrame.getChart().getCandleSeries(), line, false)
        )
    }

    abstract getHtml(): string

    abstract addChartListener(chartFrame: ChartFrame): void

    abstract addToChart(
        candleSeries: any, 
        tool: ToolData, 
        shouldUpdtaeData: boolean
    ): void

    abstract removeFromChart(
        candleSeries: any, 
        tool: ToolData, 
        shouldUpdtaeData: boolean
    ): void
}

export { Tool }