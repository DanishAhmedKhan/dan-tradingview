import { Ticker } from './Ticker'
import { Timeframe, TimeframeUnit } from './Timeframe'
import { CandleData, Datafeed } from './datafeed'
import { Chart } from './Chart'
import { ToolManager } from './tool/ToolManager'
import { DrawingManager } from './drawing/drawing-manager'
import { ToolbarManager } from './drawing/toolbar-manager'
import { CHartHUD } from './chart-hud'
import ChartMain from './ChartMain'
import { displayDate, getDate, getYearWeek } from './helper/util'
import { CandleReplay } from './candle-replay'

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
    private replayData: Array<CandleData> = []
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

    private replayTimeframe: Record<string, {
        start: number,
        stop: number,
    }> = {}
    private lastTimeframeString: string | null = null
    private fromTimestamp: number = 0
    private toTimestamp: number = 0
    private subTimeframeCandle: any = {}
    private hasMovedToNextCandle = false

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

        this.lastTimeframeString = this.timeframe.getTimeframeString()

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
        this.lastTimeframeString = this.timeframe.getTimeframeString()

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

        if (!ChartMain.candleReplay?.isReplayMode) {
            this.lastTimeframeString = this.timeframe.getTimeframeString()
        }

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
                        this.nextDate()
                    }
                }
                if (barsBefore < CANDLE_THRESHOLD) {
                    if (!this.datafeed.isLasttDate(this.date)) {
                        this.previousDate()
                    }
                }
                this.setIsDataLoaded(false)
                this.displayChart()
            }
        }
    }

    private getEmptyData(index?: number, count?: number) {
        let startIndex = index ? index : this.data.length - 1
        let lastTimefrane = this.data[startIndex].time
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

    private compareTimeframe() {

    }

    public async displayChart(time?: number) {
        if (this.isDataLoaded) return

        let replayLastTime
        if (ChartMain.candleReplay?.isReplayMode) {
            replayLastTime = this.data[ChartMain.candleReplay?.getCandleIndex() - 1].time
            this.setReplayMode(replayLastTime)
            return
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

    public displayDrawing(): void {
        this.toolManager.getAllTool().forEach(tool => tool.addAllToChart(this.drawingManager))
        setTimeout(() => {
            this.drawingManager.setIsDrawingInitialized(true)
        }, 1000)
    }

    public removeDrawing(): void {
        this.toolManager.getAllTool().forEach(tool => tool.removeAllFromChart(this.drawingManager))
    }

    public async setReplayMode(time?: number) {
        this.hasMovedToNextCandle = false
        let timestamp = time ? time : this.hoverCandleData.time

        let tfm = ['M1', 'M2', 'M3', 'M5', 'M10', 'M15', 'M30']
        let tfh = ['H1', 'H2', 'H4', 'H6']
        let tf = tfm.concat(tfh)

        let i1 = tf.findIndex(tf => tf === this.lastTimeframeString)
        let i2 = tf.findIndex(tf => tf === this.timeframe.getTimeframeString())

        let nextTimestamp = 0

        if (time) {
            timestamp = this.replayTimeframe[this.lastTimeframeString!]?.start
            if (!timestamp) timestamp = time

            let index = this.data.findIndex(candle => candle.time == timestamp)
            nextTimestamp = this.data[index + 1].time

            if (i1 >= 0 && i2 >= 0 && i1 > i2) {
                timestamp = Object.values(this.replayTimeframe)[0].stop
                this.subTimeframeCandle = {}
            } else if (i1 >= 0 && i2 >= 0 && i2 > i1) {
                timestamp = Object.values(this.replayTimeframe)[0].start
            }
        } else {
            timestamp = this.hoverCandleData.time
            let index = this.data.findIndex(candle => candle.time === timestamp)
            this.replayTimeframe[this.timeframe.getTimeframeString()] = {
                start: timestamp,
                stop: this.data[index + 1].time,
            }
        }


        let yearWeek = getYearWeek(timestamp)
        let yearWeekCopy = yearWeek

        let data: Array<CandleData> = []
        const REPLAY_CANLD_THRESHHOLD = 1000
        let dataFileLoaded = []

        while (data.length < REPLAY_CANLD_THRESHHOLD) {
            let prevData = await this.datafeed.getDataFromDate(this.ticker, this.timeframe, yearWeek)
            data = prevData.concat(data)
            dataFileLoaded.push(yearWeek)
            yearWeek = this.datafeed.getPreviousDateFilename(yearWeek)
        }

        let index = data.findIndex(candle => candle.time === timestamp)

        if (index > 0 && index < 1000) {
            let prevData = await this.datafeed.getDataFromDate(this.ticker, this.timeframe, yearWeek)
            data = prevData.concat(data)
        }

        index = data.findIndex(candle => candle.time === timestamp)

        if (index < 0) {
            let date1 = this.datafeed.getNextDateFilename(yearWeekCopy)
            let date2 = this.datafeed.getNextDateFilename(date1)
            dataFileLoaded.unshift(date1)
            dataFileLoaded.unshift(date2)

            let data1 = await this.datafeed.getDataFromDate(this.ticker, this.timeframe, date1)
            let data2 = await this.datafeed.getDataFromDate(this.ticker, this.timeframe, date2)

            data = data.concat(data1)
            data = data.concat(data2)

            yearWeekCopy = date2

            index = data.findIndex(candle => candle.time === timestamp)
        }

        let lastCandle
        let lastCandleIndex = 0
        if (time && (index < 0 || (i1 >= 0 && i2 >= 0 && i2 > i1) && Object.keys(this.replayTimeframe)[0] !== this.timeframe.getTimeframeString())) {
            for (let i = 0; i < data.length - 1; i++) {
                if (data[i].time <= timestamp && data[i + 1].time > timestamp) {
                    index = i
                    break
                }
            }

            let startTime = data[index].time
            let stopTime = Object.values(this.replayTimeframe)[0].stop
            let startIndex = -1
            let stopIndex = -1

            let subTimeframe = Timeframe.ALL_TIMEFRAME[0]

            let isMinuteInReplayTimeframe
            for (let key in this.replayTimeframe) {
                if (key.includes('M')) {
                    isMinuteInReplayTimeframe = true
                    break
                }
            }

            if (this.lastTimeframeString?.includes('M') || isMinuteInReplayTimeframe) {
                subTimeframe = Timeframe.ALL_TIMEFRAME[0]
            } else if (this.lastTimeframeString?.includes('H') && (this.timeframe.getUnit() === 'H' || this.timeframe.getUnit() === 'D')) {
                subTimeframe = Timeframe.ALL_TIMEFRAME[8]
            }

            let minuteData: Array<CandleData> = []

            for (let i = 0; i < dataFileLoaded.length; i++) {
                let filename = dataFileLoaded[i]

                minuteData = await this.datafeed.getDataFromDate(this.ticker, subTimeframe, filename)
                startIndex = minuteData.findIndex(candle => candle.time === startTime)
                stopIndex = minuteData.findIndex(candle => candle.time === stopTime)

                if (startIndex >= 0 && stopIndex >= 0) break
            }

            if (startIndex >= 0 && stopIndex >= 0) {
                stopIndex--

                let candleOpen = minuteData[startIndex].open
                let candleClose = minuteData[stopIndex].close
                let candleHigh = minuteData[startIndex].high!
                let candleLow = minuteData[startIndex].low!

                for (let i = startIndex; i <= stopIndex; i++) {
                    if (minuteData[i].high! > candleHigh) candleHigh = minuteData[i].high!
                    if (minuteData[i].low! < candleLow) candleLow = minuteData[i].low!
                }

                lastCandleIndex = data.findIndex(candle => candle.time === minuteData[stopIndex + 1].time)

                if (lastCandleIndex == -1) {
                    lastCandle = {
                        time: startTime,
                        open: candleOpen,
                        close: candleClose,
                        high: candleHigh,
                        low: candleLow,
                    }
                }
            }
        }

        let startIndex = index < 0 ? 1000 : index
        startIndex = index - REPLAY_CANLD_THRESHHOLD
        startIndex = startIndex < 0 ? 0 : startIndex

        this.data = [...data].slice(startIndex, data.length)
        if (!time || lastCandleIndex > 0) index = index + 1
        this.replayData = [...data].slice(startIndex, index)

        if (lastCandle) {
            this.replayData.push(lastCandle)
            startIndex = index < 1000 ? index : 1000
            this.subTimeframeCandle = this.data[startIndex]
        }

        startIndex = index < 1000 ? index : 1000
        this.date = yearWeekCopy
        let emptyData = this.getEmptyData(startIndex)
        let newCandleData = [...this.replayData].concat(emptyData)
        this.chart.addDataToCandleSeries(newCandleData)
        ChartMain.candleReplay?.setCandleIndex(startIndex)
        this.chart.getIndicator().forEach(indicator => {
            indicator.renderer.setVisibleLimit(this.replayData[this.replayData.length - 1].time, startIndex)
        })

        let timeScale = this.chart.getLightweightChart().timeScale()
        let logicalRange = timeScale.getVisibleLogicalRange()

        let rangeGap = logicalRange.to - logicalRange.from
        let rangeGapMid = rangeGap / 2

        timeScale.setVisibleLogicalRange({
            from: 1000 - rangeGapMid,
            to: 1000 + rangeGapMid,
        })

        this.chart.addIndicatorToChart(this.data)
    }

    public async displayNextCandle(index: number) {
        this.hasMovedToNextCandle = true

        if (this.timeframe.getUnit() !== 'D' && this.data.length - index < 300) {
            let nextDate = this.datafeed.getNextDateFilename(this.date)
            this.date = nextDate

            let data = await this.datafeed.getDataFromDate(this.ticker, this.timeframe, nextDate)
            this.data = this.data.concat(data)
            this.chart.addIndicatorToChart(this.data)
        }

        let candle = this.data[index]
        if (candle != null) {
            if (JSON.stringify(this.subTimeframeCandle) !== JSON.stringify({})) {
                this.replayData.pop()
                this.replayData.push(this.subTimeframeCandle)
                this.subTimeframeCandle = {}
                ChartMain.candleReplay?.setCandleIndex(index)
            } else {
                if (this.replayData[this.replayData.length - 1].time === candle.time) {
                    index++
                    candle = this.data[index]
                    ChartMain.candleReplay?.setCandleIndex(index + 1)
                }

                this.replayData.push(candle)
            }

            this.replayTimeframe = {}
            this.replayTimeframe[this.timeframe.getTimeframeString()] = {
                start: candle.time,
                stop: this.data[index + 1].time,
            }

            let emptyData = this.getEmptyData(index)
            if (this.replayData[this.replayData.length - 1].time === emptyData[0].time) {
                emptyData.shift()
            }

            let newCandleData = [...this.replayData].concat(emptyData)
            this.chart.addDataToCandleSeries(newCandleData)
            this.chart.getIndicator().forEach(indicator => {
                indicator.renderer.setVisibleLimit(candle.time, index)
            })
        }
    }
}

export { ChartFrame, ChartFrameData }