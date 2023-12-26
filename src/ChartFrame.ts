import { Ticker } from './Ticker'
import { Timeframe, TimeframeUnit } from './Timeframe'
import { CandleData, Datafeed } from './datafeed'
import { Chart } from './Chart'
import { ToolManager } from './tool/ToolManager'
import { DrawingManager } from './drawing/drawing-manager'
import { ToolbarManager } from './drawing/toolbar-manager'
import { CHartHUD } from './chart-hud'
import ChartMain from './ChartMain'
import { ChartFrameManager } from './ChartFrameManager'

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
    private data: Array<CandleData> = []
    private visibleData: Array<CandleData> = []

    public readonly chartFrameHtmlElement: HTMLElement
    public readonly drawingPrerenderHtmlElement: HTMLCanvasElement
    public readonly chartInteractionWrapperHtmlElement: HTMLElement

    private chartHUD: CHartHUD
    private drawingManager: DrawingManager
    private toolManager: ToolManager
    private frameIndex: number
    private chartFrameData: ChartFrameData
    private isDataLoaded: boolean
    private hoverCandleData: any

    private fromTimestamp: number = 0
    private toTimestamp: number = 0

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

    public getVisibleData(): Array<CandleData> {
        return this.visibleData
    }

    public nextDate(): void {
        this.date = this.datafeed.getNextDateFilename(this.date)
        // console.log('next', this.date)
    }

    public previousDate(): void {
        this.date = this.datafeed.getPreviousDateFilename(this.date)
        // console.log('prev', this.date)
    }

    public setTimeframe(timeframe: Timeframe): void {
        let timeScale = this.chart.getLightweightChart().timeScale()
        let logicalRange = timeScale.getVisibleLogicalRange()
        let centerCandleIndex = +((logicalRange.from + logicalRange.to) / 2).toFixed(0)
        let candle = this.data[centerCandleIndex]
        let timestamp = candle.time

        this.chartFrameData.timeframe = timeframe.getTimeframe()
        this.saveChartFrameData()

        let shouldDisplayChart: boolean = this.timeframe.getTimeframeString() !== timeframe.getTimeframeString()
        this.timeframe = timeframe
        if (shouldDisplayChart) this.displayChart(timestamp)

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
        this.hoverCandleData = value
        this.chartHUD.setOHLC(value)
    }

    public handleMouseClick(event: any): void {
        let hoveredDrawing = this.drawingManager.getHoveredDrawing()

        if (hoveredDrawing) {
            this.chart.disableScroll()
            hoveredDrawing.setEdit(true)

            this.chartInteractionWrapperHtmlElement.style.display = 'block'

            let tool = hoveredDrawing.getTool()
            let point = hoveredDrawing.getPoint()
            let drawingOption = hoveredDrawing.getOptions()
            tool.removeFromChart(this.drawingManager, hoveredDrawing)

            tool.editTool(this, this.drawingManager, point, drawingOption, event)
        }
    }

    public findCandleWithTimestamp(timestamp: number) {
        let candle = this.data.find(d => d.time === timestamp)
        // console.log(candle)
        return candle
    }

    public handleScroll(barsInfo: any): void {
        if (barsInfo == null || !this.getIsDataLoaded() || ChartMain.candleReplay?.isReplayMode) return

        // console.log('scrolll')

        const CANDLE_THRESHOLD = 100
        let { barsBefore, barsAfter } = barsInfo

        if (barsBefore < CANDLE_THRESHOLD ||
            barsAfter < CANDLE_THRESHOLD
        ) {
            if (this.getIsDataLoaded()) {
                // console.log('scroll', barsInfo)
                this.fromTimestamp = barsInfo.from
                this.toTimestamp = barsInfo.to
                if (barsAfter < CANDLE_THRESHOLD) {
                    if (this.datafeed.isFirstDate(this.date)) return
                    // this.previousDate()
                    this.nextDate()

                } else if (barsBefore < CANDLE_THRESHOLD) {
                    if (this.datafeed.isLasttDate(this.date)) return
                    // this.nextDate()
                    this.previousDate()
                }
                this.setIsDataLoaded(false)
                this.displayChart()
            }
        }
    }

    public async displayChart(time?: number) {
        if (this.isDataLoaded) return

        let date = await this.datafeed.loadData(this.ticker, this.date)
        if (date != null) this.date = date as string

        let timeScale = this.chart.getLightweightChart().timeScale()
        // timeScale.applyOptions({ shiftVisibleRangeOnNewBar: false })
        let logicalRange: any = timeScale.getVisibleLogicalRange()
        // if (time) {
        //     console.log('timestamp')
        //     logicalRange = timeScale.getVisibleLogicalRange()
        // }

        let data = this.datafeed.getTickerTimeframeData(this.ticker, this.timeframe, this.date)
        // console.log('data length', data.length)
        // console.log(data)
        timeScale.applyOptions({
            shiftVisibleRangeOnNewBar: false,
        })
        this.chart.addDataToCandleSeries(data)
        this.chart.addIndicatorToChart(data)
        // timeScale.applyOptions({ shiftVisibleRangeOnNewBar: false })
        this.data = data
        this.visibleData = data
        // console.log(data)

        if (time && logicalRange) {
            // console.log('timee')
            let closestTime = -1
            let minDiff = Math.abs(data[0].time - time!)
            data.forEach(d => {
                let diff = Math.abs(d.time - time!)
                if (diff < minDiff) {
                    closestTime = d.time
                    minDiff = diff
                }
            })

            let position = timeScale.timeToCoordinate(closestTime)
            let logical = timeScale.coordinateToLogical(position)

            let semirange = (logicalRange.to - logicalRange.from) / 2
            timeScale.setVisibleLogicalRange({
                from: logical - semirange,
                to: logical + semirange
            })

            this.chart.resetChartScale()
        } else {

            // logicalRange = timeScale.getVisibleLogicalRange()
            // if (ChartFrameManager.isChartLoaded && this.fromTimestamp > 0 && this.toTimestamp > 0) {

            //     console.log('elsee')

            //     let positionFrom = timeScale.timeToCoordinate(this.fromTimestamp)
            //     let logicalFrom = timeScale.coordinateToLogical(positionFrom)

            //     let positionTo = timeScale.timeToCoordinate(this.toTimestamp)
            //     let logicalTo = timeScale.coordinateToLogical(positionTo)

            //     console.log(this.fromTimestamp, positionFrom, logicalFrom)
            //     console.log(this.toTimestamp, positionTo, logicalTo)

            //     timeScale.setVisibleLogicalRange({
            //         from: logicalFrom,
            //         to: logicalTo,
            //     })
            // }
        }

        this.removeDrawing()
        this.displayDrawing()

        this.setIsDataLoaded(true)
    }

    public static getChartFrame(chartframes: Array<ChartFrame>, index: number): ChartFrame {
        chartframes.forEach((cf) => {
            if (cf.getFrameIndex() === index) return cf
        })

        throw Error('ChartFrame with the index not found')
    }

    public displayDrawing(): void {
        this.toolManager.getAllTool().forEach(tool => tool.addAllToChart(this.drawingManager))
        setTimeout(() => {
            this.drawingManager.setIsDrawingInitialized(true)
        }, 1000)
    }

    public removeDrawing(): void {
        this.toolManager.getAllTool().forEach(tool => tool.removeAllFromChart(this.drawingManager))
    }

    public setReplayMode(): number {
        let indicator = this.chart.getIndicator()

        let index = this.data.findIndex((candle) => {
            return candle.time === this.hoverCandleData.time
        })

        // this.chart.setIndicatorReplayIndex(this.hoverCandleData.time)
        indicator.forEach(indicator => {
            indicator.renderer.setVisibleTimeLimit(this.hoverCandleData.time)
        })

        let dataCopy = [...this.data]
        let newCandleData = this.data.splice(0, index)
        this.data = [...dataCopy]
        // this.visibleData = [...newCandleData]

        let timeScale = this.chart.getLightweightChart().timeScale()
        let logicalRange = timeScale.getVisibleLogicalRange()

        this.chart.addDataToCandleSeries(newCandleData)
        timeScale.setVisibleLogicalRange({
            from: logicalRange.from,
            to: logicalRange.to,
        })

        // indicator.forEach(indicator => {
        //     indicator.renderer.setVisibleTimeLimit(this.hoverCandleData.time)
        // })


        // this.chart.getIndicator().forEach(inidcator => {
        //     let data = inidcator.renderer.getData()
        //     // console.log('data', data)
        //     let replayIndex = inidcator.renderer.getReplayIndex()
        //     // console.log('replatIndex', replayIndex)

        //     let newData = data.splice(0, replayIndex)
        //     // newData.push({
        //     //     type: 'end',
        //     //     time: newCandleData[newCandleData.length - 1].time,
        //     //     current_time: newCandleData[newCandleData.length - 1].time,
        //     // })
        //     // console.log(newData)

        //     inidcator.chartSeries.setData(newData)
        // })

        return index
    }

    public async displayNextCandle(index: number) {
        if (this.data.length - index < 50) {
            this.date = this.datafeed.getNextDateFilename(this.date)
            let date = await this.datafeed.loadData(this.ticker, this.date)
            if (date != null) this.date = date as string
            this.data = this.datafeed.getTickerTimeframeData(this.ticker, this.timeframe, this.date)

            // this.chart.processIndicator(this.data)
            this.chart.addIndicatorToChart(this.data)
        }

        let candle = this.data[index]
        if (candle != null) {
            this.chart.updateCandle(candle)

            console.log(candle.time)
            this.chart.getIndicator().forEach(indicator => {
                indicator.renderer.setVisibleTimeLimit(candle.time)
            })
        }
    }
}

export { ChartFrame, ChartFrameData }