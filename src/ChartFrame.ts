import { Ticker } from './Ticker'
import { Timeframe, TimeframeUnit } from './Timeframe'
import { Datafeed } from './datafeed'
import { Chart } from './Chart'
import { ToolManager } from './tool/ToolManager'
import { DrawingManager } from './drawing/drawing-manager'
import { ToolbarManager } from './drawing/toolbar-manager'
import { CHartHUD } from './chart-hud'

type ChartFrameData = {
    ticker: string,
    timeframe: {
        unit: string,
        value: number,
    }
}

class ChartFrame {
    
    private ticker: Ticker
    private timeframe: Timeframe
    private datafeed: Datafeed
    private chart: Chart
    private date: string

    public readonly chartFrameHtmlElement: HTMLElement
    public readonly drawingPrerenderHtmlElement: HTMLCanvasElement
    public readonly chartInteractionWrapperHtmlElement: HTMLElement

    private chartHUD: CHartHUD
    private drawingManager: DrawingManager
    private toolManager: ToolManager
    private frameIndex: number
    private chartFrameData: ChartFrameData
    private isDataLoaded: boolean

    constructor(
        chartFrameHtmlElement: HTMLElement | string, 
        datafeed: Datafeed, 
        frameIndex: number,
        toolManager: ToolManager,
        toolbarManager: ToolbarManager,
    ) {
        this.chartFrameHtmlElement = typeof chartFrameHtmlElement === "string" ? 
            document.querySelector("." + chartFrameHtmlElement)! : chartFrameHtmlElement

        this.chartFrameHtmlElement.insertAdjacentHTML("beforeend", `
            <div class="chart_frame_wrapper" data-frame-index="${frameIndex}">
                <div class="chart_interaction_wrapper" style="display:none;">
                    <canvas class="drawing_prerender_canvas" width=>
                </div>
                <div class="chart_frame_main_wrapper"></div>
            </div>
        `)

        this.datafeed = datafeed
        this.frameIndex = frameIndex
        this.toolManager = toolManager

        this.date = ''

        this.chartFrameData = this.getChartFrameData()
        if (this.chartFrameData) {
            this.ticker = new Ticker(this.chartFrameData.ticker)
            this.timeframe = new Timeframe(
                <TimeframeUnit>this.chartFrameData.timeframe.unit, 
                this.chartFrameData.timeframe.value
            )
        } else {
            this.ticker = Ticker.DEFAULT_TICKER
            this.timeframe = Timeframe.DEFAULT_TIMEFRAME
            this.chartFrameData = {
                ticker: this.ticker.getTicker(),
                timeframe: this.timeframe.getTimeframe(),
            }
        }

        this.isDataLoaded = false

        let chartFrameWrapperHtmlElement: HTMLElement = 
            this.chartFrameHtmlElement.querySelector(".chart_frame_main_wrapper")!
        this.chart = new Chart(chartFrameWrapperHtmlElement, this)

        this.drawingManager = new DrawingManager(toolManager, toolbarManager)
        this.chart.getCandleSeries().attachPrimitive(this.drawingManager)

        this.chartInteractionWrapperHtmlElement = 
            this.chartFrameHtmlElement.querySelector('.chart_interaction_wrapper')!
        
        this.drawingPrerenderHtmlElement = 
            this.chartInteractionWrapperHtmlElement.querySelector('.drawing_prerender_canvas')!
        
        this.drawingPrerenderHtmlElement.style.width = '100%'
        this.drawingPrerenderHtmlElement.style.height = '100%'

        this.chartHUD = new CHartHUD(chartFrameWrapperHtmlElement)
        this.chartHUD.setTicker(this.ticker)
        this.chartHUD.setTimeframe(this.timeframe)
    }

    private getChartFrameData(): ChartFrameData {
        let key = 'data-chart-frame' + this.frameIndex
        return JSON.parse(localStorage.getItem(key)!)
    }

    private saveChartFrameData(): void {
        let key = 'data-chart-frame' + this.frameIndex
        localStorage.setItem(key, JSON.stringify(this.chartFrameData))
    }

    public getDrawingManager(): DrawingManager {
        return this.drawingManager
    }

    public getFrameIndex(): number {
        return this.frameIndex
    }

    public setFrameIndex(frameIndex: number): void {
        this.frameIndex = frameIndex
        this.saveChartFrameData()
    }

    public getIsDataLoaded(): boolean {
        return this.isDataLoaded
    }

    public setIsDataLoaded(isDataLoaded: boolean): void {
        this.isDataLoaded = isDataLoaded
    }

    public getTimeframe(): Timeframe {
        return this.timeframe
    }

    public getTicker(): Ticker {
        return this.ticker
    }

    public getChart(): Chart {
        return this.chart
    }

    public getDate(): string {
        return this.date
    }

    public setDate(date: string): void {
        this.date = date
    }

    public nextDate(): void {
        this.date = this.datafeed.getNextDateFilename(this.date)
    }

    public previousDate(): void {
        this.date = this.datafeed.getPreviousDateFilename(this.date)
    }

    public setTimeframe(timeframe: Timeframe): void {
        console.log('setTimeframe')
        this.chartFrameData.timeframe = timeframe.getTimeframe()
        this.saveChartFrameData()

        let shouldDisplayChart: boolean = this.timeframe.getTimeframeString() !== timeframe.getTimeframeString()
        this.timeframe = timeframe
        if (shouldDisplayChart) this.displayChart()

        this.chartHUD.setTimeframe(timeframe)
    }

    public setTicker(ticker: Ticker): void {
        this.chartFrameData.ticker = ticker.getTicker()
        this.saveChartFrameData()

        let shouldDisplayChart: boolean = this.ticker.getTicker() !== ticker.getTicker()
        this.ticker = ticker
        if (shouldDisplayChart) this.displayChart()

        document.title = ticker.getTicker()
        this.chartHUD.setTicker(ticker)
    }

    public handleCrosshairMove(value: any): void {
        this.chartHUD.setOHLC(value)
    }

    public handleScroll(barsInfo: any): void {
        if (barsInfo == null) return

        const CANDLE_THRESHOLD = 300
        let { barsBefore, barsAfter } = barsInfo

        if (barsBefore < CANDLE_THRESHOLD || 
            barsAfter < CANDLE_THRESHOLD
        ) {
            if (this.getIsDataLoaded()) {
                if (barsBefore < CANDLE_THRESHOLD) {
                    if (this.datafeed.isLasttDate(this.date)) return
                    this.nextDate()
                } else if (barsAfter < CANDLE_THRESHOLD) {
                    if (this.datafeed.isFirstDate(this.date)) return
                    this.previousDate()
                }

                this.setIsDataLoaded(false)
                this.displayChart()
            }
        }
    }

    public async displayChart(timePosition?: number) {
        if (!this.isDataLoaded) {
            let date = await this.datafeed.loadData(this.ticker, this.date)
            if (date != null) this.date = date as string
            this.isDataLoaded = true
        }
        let timeScale = this.chart.getLightweightChart().timeScale()
        
        let logicalRange: any = {}
        if (timePosition) {
            logicalRange = timeScale.getVisibleLogicalRange()
        }

        let data = this.datafeed.getTickerTimeframeData(this.ticker, this.timeframe, this.date)
        // this.chart.resetChartScale()
        this.chart.addDataToCandleSeries(data)

        if (timePosition) {
            let position = timeScale.timeToCoordinate(timePosition)
            let logical = timeScale.coordinateToLogical(position)

            let semirange = (logicalRange.to - logicalRange.from) / 2
            timeScale.setVisibleLogicalRange({
                from: logical - semirange,
                to: logical + semirange
            })
        }
    }

    public static getChartFrame(chartframes: Array<ChartFrame>, index: number): ChartFrame {
        chartframes.forEach((cf) => {
            if (cf.getFrameIndex() === index) return cf
        })

        throw Error('ChartFrame with the index nlot found')
    }

    public displayDrawing(): void {
        this.toolManager.getAllTool().forEach(tool => tool.addAllToChart(this.drawingManager))
    }
}

export { ChartFrame }