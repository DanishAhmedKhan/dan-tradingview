import { ChartFrameManager } from "../ChartFrameManager"
import { DrawingManager } from "../drawing/drawing-manager"
import { StorageManager } from "./StorageManager"
import { TickerStorage, ToolData } from "./TickerStorage"

type ToolParam = {
    storageManager: StorageManager,
    chartFrameManager: ChartFrameManager,
    drawingManager: DrawingManager
}

abstract class Tool {
    public abstract readonly TOOL_CLASS: string
    public abstract readonly KEY: string
    public abstract readonly toolData: {
        name: string,
        svg: string,
    } 

    protected storageManager: StorageManager
    protected chartFrameManager: ChartFrameManager
    protected drawingManager: DrawingManager

    protected isSelected: boolean
    protected toolHtmlElement: HTMLElement | null

    constructor({
        storageManager,
        chartFrameManager,
        drawingManager
    }: ToolParam) {
        this.storageManager = storageManager
        this.chartFrameManager = chartFrameManager
        this.drawingManager = drawingManager
        this.isSelected = false
        this.toolHtmlElement = null
    }

    public getIsSelected(): boolean {
        return this.isSelected
    }

    public setIsSelected(isSelected: boolean): void {
        this.isSelected = isSelected
    }

    public getHtml(): string {
        return (`
            <div class="tool_item ${this.TOOL_CLASS}" data-tool-name="${this.toolData.name}">
                <div class="tool_logo">${this.toolData.svg}</div>
            </div>
        `)
    }

    public addClickListener(toolBoxHtmlElement: HTMLElement): void {
        this.toolHtmlElement = toolBoxHtmlElement.querySelector(`.${this.TOOL_CLASS}`)!

        this.toolHtmlElement.addEventListener('click', e => {
            if (!this.isSelected) {
                this.addChartListener()
            } 
        })
    }

    public addChartListener(): void {
        this.isSelected = true
        this.toolHtmlElement?.classList.add(`tool_item_selected`)
        this.chartFrameManager.activateAllFrameInteraction()
        this.chartFrameManager.getAllChartFrame().forEach(chartFrame => {
            chartFrame.chartInteractionWrapperHtmlElement.onclick = (event: any) => {
                let chartFrameWrapperHtmlElement = event.target.parentElement.parentElement
                let frameIndex = Number(chartFrameWrapperHtmlElement.getAttribute('data-frame-index'))
                let chartFrame = this.chartFrameManager.getChartFrameAtIndex(frameIndex)
                let drawingManager = chartFrame.getDrawingManager()
                
                this.handleChartEvent(event, drawingManager)
            }
        })
    }

    public removeChartListener(): void {
        this.isSelected = false
        this.toolHtmlElement?.classList.remove(`tool_item_selected`)
        this.chartFrameManager.deactivateAllFrameInteraction()
        this.chartFrameManager.getAllChartFrame().forEach(chartFrame => {
            chartFrame.chartInteractionWrapperHtmlElement.onclick = null
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

    protected getChartAndSeries() {
        let chartFrame = this.chartFrameManager.getActiveChartFrame()
        let chart = chartFrame.getChart().getLightweightChart()
        let candleSeries = chartFrame.getChart().getCandleSeries()
        return { chart, candleSeries }
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

    public addToChart(
        tool: ToolData, 
        shouldUpdtaeData: boolean = true
    ): void {
        if (shouldUpdtaeData) {
            this.getTickerStorage().addData(this.KEY, tool)
        }
        
        this.drawingManager.add(tool)
    }

    public removeFromChart(
        tool: ToolData, 
        shouldUpdtaeData: boolean = true
    ): void {
        if (shouldUpdtaeData) {
            this.getTickerStorage().removeData(this.KEY, tool)
        }

        this.drawingManager.add(tool)
    }

    abstract handleChartEvent(event: any, drawingManager: DrawingManager): void
}

export { Tool, ToolParam }