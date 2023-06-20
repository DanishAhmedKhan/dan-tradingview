import { Ticker } from './Ticker'
import { Timeframe } from './Timeframe'
import { Datafeed } from './Datafeed'
import { Chart } from './Chart'

class ChartFrame {
    
    private ticker: Ticker
    private timeframe: Timeframe
    private datafeed: Datafeed
    private chart: Chart

    private $chartFrame: HTMLDivElement
    private frameIndex: number

    private isDataLoaded: boolean

    constructor(elm: HTMLDivElement | string, ticker: Ticker, timeframe: Timeframe, datafeed: Datafeed, frameIndex: number) {
        if (typeof elm === "string") {
            this.$chartFrame = document.querySelector("." + elm)!
        } else {
            this.$chartFrame = elm
        }

        let html = `
            <div class="chart_frame_wrapper" data-frame-index="${frameIndex}">
            </div>
        `
        this.$chartFrame.insertAdjacentHTML("beforeend", html)

        this.ticker = ticker
        this.timeframe = timeframe
        this.datafeed = datafeed
        this.frameIndex = frameIndex

        this.isDataLoaded = false

        let $chart: HTMLDivElement = this.$chartFrame.querySelector(".chart_frame_wrapper")!
        this.chart = new Chart($chart, this)
    }

    public getFrameIndex(): number {
        return this.frameIndex
    }

    public setFrameIndex(frameIndex: number): void {
        this.frameIndex = frameIndex
    }

    public getIsDataLoaded(): boolean {
        return this.isDataLoaded
    }

    public setIsDataLoaded(isDataLoaded: boolean): void {
        this.isDataLoaded = isDataLoaded
    }

    public setTimeframe(timeframe: Timeframe): void {
        this.timeframe = timeframe
        this.displayChart()
    }

    public setTicker(ticker: Ticker): void {
        this.ticker = ticker
        this.displayChart()
    }

    public async displayChart() {
        if (!this.isDataLoaded) {
            await this.datafeed.loadData(this.ticker)
            this.isDataLoaded = true
        }

        let data = this.datafeed.getTickerTimeframeData(this.ticker, this.timeframe)
        // this.chart.resetChartScale()
        this.chart.addDataToCandleSeries(data)
    }

    public static getChartFrame(chartframes: Array<ChartFrame>, index: number): ChartFrame {
        chartframes.forEach((cf) => {
            if (cf.getFrameIndex() === index) return cf
        })

        throw Error('ChartFrame with the index nlot found')
    }
}

export { ChartFrame }