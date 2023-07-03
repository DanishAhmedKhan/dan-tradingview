import { ChartFrame } from "../ChartFrame"
import { ChartFrameManager } from "../ChartFrameManager"
import { DrawingManager } from "../drawing/drawing-manager"
import { StorageManager } from "./StorageManager"
import { TickerStorage, ToolData } from "./TickerStorage"

type ToolParam = {
    storageManager: StorageManager,
    chartFrameManager: ChartFrameManager,
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

    protected isSelected: boolean
    protected toolHtmlElement: HTMLElement | null

    constructor({
        storageManager,
        chartFrameManager,
    }: ToolParam) {
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

    protected getInteractionChartFrame(event: any): ChartFrame {
        let chartFrameWrapperHtmlElement = event.target.parentElement.parentElement
        let frameIndex = Number(chartFrameWrapperHtmlElement.getAttribute('data-frame-index'))
        let chartFrame = this.chartFrameManager.getChartFrameAtIndex(frameIndex)
        return chartFrame
    }

    public addChartListener(): void {
        this.isSelected = true
        this.toolHtmlElement?.classList.add(`tool_item_selected`)
        this.chartFrameManager.activateAllFrameInteraction()
        this.chartFrameManager.getAllChartFrame().forEach(chartFrame => {
            chartFrame.drawingPrerenderHtmlElement.width  = 
                chartFrame.chartInteractionWrapperHtmlElement.offsetWidth
            chartFrame.drawingPrerenderHtmlElement.height = 
                chartFrame.chartInteractionWrapperHtmlElement.offsetHeight

            let drawingManager = chartFrame.getDrawingManager()
            this.handleChartEvent(chartFrame, chartFrame.chartInteractionWrapperHtmlElement, drawingManager)
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

    protected getPoint(e: any): { x: number, y: number } {
        const rect = e.target.getBoundingClientRect()
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        return { x, y }
    }

    protected getTimeAndPrice(e: any) {
        let { x, y } = this.getPoint(e)
        let { chart, candleSeries } = this.getChartAndSeries()
        let time = chart.timeScale().coordinateToTime(x)
        let price = candleSeries.coordinateToPrice(y)
        return { time, price }
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

    public addAllToChart(drawingManager: DrawingManager): void {
        this.getData().forEach(toolData =>
            this.addToChart(drawingManager, toolData, false)
        )
    }

    public removeAllFromChart(drawingManager: DrawingManager): void {
        this.getData().forEach(toolData => 
            this.removeFromChart(drawingManager, toolData, false)
        )
    }

    public addToChart(
        drawingManager: DrawingManager,
        toolData: ToolData, 
        shouldUpdtaeData: boolean = true
    ): void {
        if (shouldUpdtaeData) {
            this.getTickerStorage().addData(this.KEY, toolData)
        }
        
        drawingManager.add(toolData)
    }

    public removeFromChart(
        drawingManager: DrawingManager,
        toolData: ToolData, 
        shouldUpdtaeData: boolean = true
    ): void {
        if (shouldUpdtaeData) {
            this.getTickerStorage().removeData(this.KEY, toolData)
        }

        drawingManager.add(toolData)
    }

    abstract handleChartEvent(chartFrame: ChartFrame, htmlElement: HTMLElement, drawingManager: DrawingManager): void
}

export { Tool, ToolParam }