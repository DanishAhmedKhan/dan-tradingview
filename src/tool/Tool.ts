import { ChartFrame } from "../ChartFrame"
import { ChartFrameManager } from "../ChartFrameManager"
import { Drawing } from "../drawing/drawing"
import { DrawingManager } from "../drawing/drawing-manager"
import { Point } from "../drawing/point"
import { StorageManager } from "./StorageManager"
import { TickerStorage, ToolData } from "./TickerStorage"
import { ToolManager } from "./ToolManager"

type ToolParam = {
    toolManager: ToolManager,
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

    protected toolManager: ToolManager
    protected storageManager: StorageManager
    protected chartFrameManager: ChartFrameManager

    protected isSelected: boolean
    protected toolHtmlElement: HTMLElement | null

    constructor({
        toolManager,
        storageManager,
        chartFrameManager,
    }: ToolParam) {
        this.toolManager = toolManager
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

    public select(): void {
        this.isSelected = true
        this.toolHtmlElement?.classList.add(`tool_item_selected`)
    }

    public unselect(): void {
        this.isSelected = false
        this.toolHtmlElement?.classList.remove(`tool_item_selected`)
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
                this.toolManager.getAllTool().forEach(tool => {
                    tool.unselect()
                })

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
        this.select()
        this.chartFrameManager.activateAllFrameInteraction()

        this.chartFrameManager.getAllChartFrame().forEach(chartFrame => {
            chartFrame.drawingPrerenderHtmlElement.width =
                chartFrame.chartInteractionWrapperHtmlElement.offsetWidth
            chartFrame.drawingPrerenderHtmlElement.height =
                chartFrame.chartInteractionWrapperHtmlElement.offsetHeight

            let drawingManager = chartFrame.getDrawingManager()
            this.handleChartEvent(chartFrame, chartFrame.chartInteractionWrapperHtmlElement, drawingManager)
        })
    }

    public removeChartListener(): void {
        console.log('ssusjh')
        this.unselect()
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

    public getTimeAndPrice(e: any) {
        let x, y
        if (e.offset) {
            x = e.clientX
            y = e.clientY
        } else {
            let p = this.getPoint(e)
            x = p.x
            y = p.y
        }
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
        toolData: any,
        shouldUpdtaeData: boolean = true
    ): void {
        if (shouldUpdtaeData) {
            this.getTickerStorage().addData(this.KEY, toolData)
        }

        drawingManager.add(toolData)
    }

    public removeFromChart(
        drawingManager: DrawingManager,
        toolData: any,
        shouldUpdtaeData: boolean = true
    ): void {
        if (shouldUpdtaeData) {
            if (toolData instanceof Drawing) {
                this.getTickerStorage().removeData(this.KEY, toolData.getOptions())
            } else {
                this.getTickerStorage().removeData(this.KEY, toolData)
            }
        }

        if (toolData instanceof Drawing) {
            console.log('instance')
            drawingManager.remove(toolData)
        } else {
            let drawing = drawingManager.getDrawing(toolData)
            drawingManager.remove(drawing)
        }
    }

    abstract handleChartEvent(
        chartFrame: ChartFrame,
        htmlElement: HTMLElement,
        drawingManager: DrawingManager
    ): void

    abstract editTool(
        chartFrame: ChartFrame,
        drawingManager: DrawingManager,
        point: Array<Point>,
        drawingOption: any,
        mousePosition: any
    ): void
}

export { Tool, ToolParam }