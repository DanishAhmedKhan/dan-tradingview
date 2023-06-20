import { Ticker } from './Ticker'
import { Timeframe, TimeframeUnit } from './Timeframe'
import { Datafeed } from './Datafeed'
import { ChartFrame } from './ChartFrame'
import { TimeframeHtml } from './html/TimeframeHtml'
import { TickerHtml } from './html/TickerHtml'

class ChartMain {
    // TODO: Implement multi chart frame
    private chartFrames: Array<ChartFrame>
    private activeChartFrame: ChartFrame
    private frameCount: number

    private datafeed: Datafeed

    private $chartMain: HTMLDivElement

    constructor(elm: HTMLDivElement) {
        this.chartFrames = []
        this.datafeed = new Datafeed()
        this.frameCount = 0

        if (typeof elm === "string") {
            this.$chartMain = document.querySelector("." + elm)!
        } else {
            this.$chartMain = elm
        }

        let chartMainHtml = `
            <div class="chart_main_wrapper">
                <div class="header">
                </div>
                <div class="chart_main_frames">
                </div>
            </div>
        `

        this.$chartMain.innerHTML = chartMainHtml

        let $chartFrame: HTMLDivElement = this.$chartMain.querySelector(".chart_main_frames")!
        let chartFrame = new ChartFrame(
            $chartFrame,
            this.datafeed,
            this.frameCount++
        )
        chartFrame.displayChart()
        this.chartFrames.push(chartFrame)
        this.activeChartFrame = chartFrame

        this.addChartMainHeaderHtml()
    }

    public getChartMainElement(): HTMLDivElement {
        return this.$chartMain
    }

    public getActiveChartFrame(): ChartFrame {
        return this.activeChartFrame
    }

    private addChartMainHeaderHtml() {
        let timeframeHtml = new TimeframeHtml(this)
        let tickerHtml = new TickerHtml(this)

        let $chartMainHeader = this.$chartMain.querySelector('.header')!;
        $chartMainHeader.innerHTML = `
            <div class="header_left">
                <div class="header_ticker_select">
                    <select>${tickerHtml.getHtml()}</select>
                </div>
                <div class="header_timeframe_select">
                    ${timeframeHtml.getHtml()}
                </div>
            </div>
            <div class="header_right">
                <div class="header_chart_frame_select">
                    ${this.getChartFrameSelectHtml()}
                </div>
            </div>
        `

        tickerHtml.addInputListener()
        timeframeHtml.addChangeListener()
    }

    private getChartFrameSelectHtml(): string {
        return [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }].reduce(
            (acc, v) => {
                let val = v.value
                return (acc += `
                    <div class="chart_frame_item" data-value="${val}">${val}</div>
                `)
            },
            ""
        )
    }

    private addChartFrameListener(): void {
        let $cahrtFrame = document.querySelectorAll(".chart_frame_item")

        $cahrtFrame.forEach(($cf) => {
            $cf.addEventListener("click", (e) => {})
        })
    }
}

export default ChartMain