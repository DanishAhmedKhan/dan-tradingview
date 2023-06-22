import { Ticker } from './Ticker'
import { Timeframe, TimeframeUnit } from './Timeframe'
import { Datafeed } from './Datafeed'
import { Chart } from './Chart'

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

    private $chartFrame: HTMLDivElement
    private frameIndex: number
    private chartFrameData: ChartFrameData

    private isDataLoaded: boolean

    constructor(elm: HTMLDivElement | string, datafeed: Datafeed, frameIndex: number) {
        this.$chartFrame = typeof elm === "string" ? 
            document.querySelector("." + elm)! : elm

        this.$chartFrame.insertAdjacentHTML("beforeend", `
            <div class="chart_frame_wrapper" data-frame-index="${frameIndex}">
            </div>
        `)

        this.datafeed = datafeed
        this.frameIndex = frameIndex

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

        let $chart: HTMLDivElement = this.$chartFrame.querySelector(".chart_frame_wrapper")!
        this.chart = new Chart($chart, this)
    }

    private getChartFrameData(): ChartFrameData {
        let key = 'data-chart-frame' + this.frameIndex
        return JSON.parse(localStorage.getItem(key)!)
    }

    private saveChartFrameData(): void {
        let key = 'data-chart-frame' + this.frameIndex
        localStorage.setItem(key, JSON.stringify(this.chartFrameData))
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

    public setTimeframe(timeframe: Timeframe): void {
        console.log(timeframe.getTimeframe(), this.chartFrameData)
        this.chartFrameData.timeframe = timeframe.getTimeframe()
        this.saveChartFrameData()

        let shouldDisplayChart: boolean = this.timeframe.getTimeframeString() !== timeframe.getTimeframeString()
        this.timeframe = timeframe
        if (shouldDisplayChart) this.displayChart()
    }

    public setTicker(ticker: Ticker): void {
        this.chartFrameData.ticker = ticker.getTicker()
        this.saveChartFrameData()

        let shouldDisplayChart: boolean = this.ticker.getTicker() !== ticker.getTicker()
        this.ticker = ticker
        if (shouldDisplayChart) this.displayChart()
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