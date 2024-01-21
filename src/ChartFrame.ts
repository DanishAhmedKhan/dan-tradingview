import { Ticker } from './Ticker'
import { Timeframe, TimeframeUnit } from './Timeframe'
import { CandleData, Datafeed } from './datafeed'
import { Chart } from './Chart'
import { ToolManager } from './tool/ToolManager'
import { DrawingManager } from './drawing/drawing-manager'
import { ToolbarManager } from './drawing/toolbar-manager'
import { CHartHUD } from './chart-hud'
import ChartMain from './ChartMain'
import { getDate } from './helper/util'

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
        if (this.datafeed.isDateInFilename(date)) {
            this.date = date
        } else {
            this.date = this.datafeed.getDefaultDateFilename()
        }
    }

    public getVisibleData(): Array<CandleData> {
        return this.visibleData
    }

    public getData() {
        return this.data
    }

    public nextDate(): void {
        this.date = this.datafeed.getNextDateFilename(this.date)
    }

    public previousDate(): void {
        this.date = this.datafeed.getPreviousDateFilename(this.date)
    }

    public setCalendarDate(): void {
        let timeScale = this.chart.getLightweightChart().timeScale()
        let logicalRange = timeScale.getVisibleLogicalRange()

        let middleCandleIndex = Math.floor((logicalRange.from + logicalRange.to) / 2)

        if (middleCandleIndex < this.data.length - 1 && this.data[middleCandleIndex]) {
            let middleCandleTime = this.data[middleCandleIndex].time
            let dateValue = getDate(middleCandleTime)
            ChartMain.calendar?.setCalendarDate(this.ticker.getTicker(), dateValue)
        }
    }

    public setTimeframe(timeframe: Timeframe): void {
        let timeScale = this.chart.getLightweightChart().timeScale()
        let logicalRange = timeScale.getVisibleLogicalRange()
        let centerCandleIndex = +((logicalRange.from + logicalRange.to) / 2).toFixed(0)
        let candle = this.data[centerCandleIndex]
        let timestamp
        if (candle) timestamp = candle.time

        this.chartFrameData.timeframe = timeframe.getTimeframe()
        this.saveChartFrameData()


        let shouldDisplayChart: boolean = this.timeframe.getTimeframeString() !== timeframe.getTimeframeString()
        this.timeframe = timeframe
        this.isDataLoaded = false
        if (shouldDisplayChart) {
            this.displayChart(timestamp)
        }

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
        return candle
    }

    public handleScroll(barsInfo: any): void {
        if (barsInfo == null || !this.getIsDataLoaded() || ChartMain.candleReplay?.isReplayMode) return

        const CANDLE_THRESHOLD = 100
        let { barsBefore, barsAfter } = barsInfo

        if (barsBefore < CANDLE_THRESHOLD || barsAfter < CANDLE_THRESHOLD) {
            if (this.getIsDataLoaded()) {
                this.fromTimestamp = barsInfo.from
                this.toTimestamp = barsInfo.to

                if (barsAfter < CANDLE_THRESHOLD) {
                    if (!this.datafeed.isFirstDate(this.date)) {
                        // console.log('after', barsAfter)
                        this.nextDate()
                    }
                }
                if (barsBefore < CANDLE_THRESHOLD) {
                    if (!this.datafeed.isLasttDate(this.date)) {
                        // console.log('before', barsBefore)
                        this.previousDate()
                    }
                }
                this.setIsDataLoaded(false)
                this.displayChart()
            }
        }
    }

    private getEmptyData(count?: number) {
        let lastTimefrane = this.data[this.data.length - 1].time
        let emptyData = []
        let EMPTY_DATA_COUNT = count || 3000

        let timeframeInteval = 0
        if (this.timeframe.getUnit() === 'M') {
            timeframeInteval = 60
        } else if (this.timeframe.getUnit() === 'H') {
            timeframeInteval = 3600
        } else if (this.timeframe.getUnit() === 'D') {
            timeframeInteval = 86400
        }


        for (let i = 1; i < EMPTY_DATA_COUNT; i++) {
            let newTimeframe = lastTimefrane + timeframeInteval * this.timeframe.getValue() * i;
            emptyData.push({ time: newTimeframe })
        }

        return emptyData
    }

    public async displayChart(time?: number) {
        if (this.isDataLoaded) return

        let replayLastTime
        if (ChartMain.candleReplay?.isReplayMode) {
            replayLastTime = this.data[ChartMain.candleReplay?.getCandleIndex()].time
        }

        let date = await this.datafeed.loadData(this.ticker, this.date)
        if (date != null) this.date = date as string

        let timeScale = this.chart.getLightweightChart().timeScale()
        let logicalRange: any = timeScale.getVisibleLogicalRange()

        let data = this.datafeed.getTickerTimeframeData(this.ticker, this.timeframe, this.date)
        this.data = data

        let newData = [...this.data]
        if (this.timeframe.getUnit() !== 'D') {
            let emptyData = this.getEmptyData()
            newData = this.data.concat(emptyData)
        }

        timeScale.applyOptions({ shiftVisibleRangeOnNewBar: false })

        if (ChartMain.candleReplay?.isReplayMode && replayLastTime) {
            this.setReplayMode(replayLastTime)
        } else {
            this.chart.addDataToCandleSeries(newData)
            this.chart.addIndicatorToChart(data)
            this.visibleData = data

            if (time && logicalRange) {
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
            }

            this.removeDrawing()
            this.displayDrawing()

            this.setIsDataLoaded(true)
        }
    }

    public static getChartFrame(chartframes: Array<ChartFrame>, index: number): ChartFrame {
        chartframes.forEach((cf) => {
            if (cf.getFrameIndex() === index) return cf
        })

        throw Error('ChartFrame with the index not found')
    }

    // https://github.com/tradingview/lightweight-charts/issues/1498

    public displayDrawing(): void {
        this.toolManager.getAllTool().forEach(tool => tool.addAllToChart(this.drawingManager))
        setTimeout(() => {
            this.drawingManager.setIsDrawingInitialized(true)
        }, 1000)
    }

    public removeDrawing(): void {
        this.toolManager.getAllTool().forEach(tool => tool.removeAllFromChart(this.drawingManager))
    }

    public setReplayMode(time?: number): number {
        let indicator = this.chart.getIndicator()

        let index = this.data.findIndex((candle, i) => {
            if (time) {
                if (i !== this.data.length) return candle.time < time && this.data[i + 1].time >= time
            } else {
                return candle.time === this.hoverCandleData.time
            }
        })

        if (time) {
            indicator.forEach(indicator => {
                indicator.renderer.setVisibleLimit(time, index)
            })
        } else {
            indicator.forEach(indicator => {
                indicator.renderer.setVisibleLimit(this.hoverCandleData.time, index)
            })
        }

        let dataCopy = [...this.data]
        let newCandleData = this.data.splice(0, index)
        this.data = [...dataCopy]

        let timeScale = this.chart.getLightweightChart().timeScale()
        let logicalRange = timeScale.getVisibleLogicalRange()

        this.displayNextCandle(index)

        if (time) {
            this.chart.addIndicatorToChart(this.data)
            timeScale.setVisibleLogicalRange({
                from: newCandleData.length - 100,
                to: newCandleData.length + 100,
            })
        } else {
            timeScale.setVisibleLogicalRange({
                from: logicalRange.from,
                to: logicalRange.to,
            })
        }

        return index
    }

    public async displayNextCandle(index: number) {
        if (this.timeframe.getUnit() !== 'D' && this.data.length - index < 300) {
            this.date = this.datafeed.getNextDateFilename(this.date)
            let date = await this.datafeed.loadData(this.ticker, this.date)
            if (date != null) this.date = date as string
            this.data = this.datafeed.getTickerTimeframeData(this.ticker, this.timeframe, this.date)

            this.chart.addIndicatorToChart(this.data)
        }

        let candle = this.data[index]
        let dateValue = getDate(candle.time)
        dateValue = dateValue + '+' + candle.time
        ChartMain.calendar?.setCalendarDate(this.ticker.getTicker(), dateValue)

        if (candle != null) {
            // this.chart.updateCandle(candle)
            let dataCopy = [...this.data]
            let newCandleData = dataCopy.splice(0, index)
            let emptyData = this.getEmptyData()
            newCandleData = newCandleData.concat(emptyData)

            this.chart.addDataToCandleSeries(newCandleData)

            this.chart.getIndicator().forEach(indicator => {
                indicator.renderer.setVisibleLimit(candle.time, index)
            })
        }
    }
}

export { ChartFrame, ChartFrameData }