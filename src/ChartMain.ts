import { Ticker } from './Ticker'
import { Timeframe, TimeframeUnit } from './Timeframe'
import { Datafeed } from './Datafeed'
import { ChartFrame } from './ChartFrame'

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
        this.addChartMain()

        let $chartFrame: HTMLDivElement = this.$chartMain.querySelector(".chart_main_frames")!
        let chartFrame = new ChartFrame(
            $chartFrame,
            Ticker.DEFAULT_TICKER,
            Timeframe.DEFAULT_TIMEFRAME,
            this.datafeed,
            this.frameCount++
        )
        chartFrame.displayChart()
        this.chartFrames.push(chartFrame)
        this.activeChartFrame = chartFrame
    }

    private addChartMain() {
        let html = `
            <div class="chart_main_wrapper">
                <div class="header">
                    <div class="header_left">
                        <div class="header_ticker_select">
                            <select>${this.getTickerHtml()}</select>
                        </div>
                        <div class="header_timeframe_select">
                            ${this.getTimeframeHtml()}
                        </div>
                    </div>
                    <div class="header_right">
                        <div class="header_chart_frame_select">
                            ${this.getChartFrameSelectHtml()}
                        </div>
                    </div>
                    
                </div>
                <div class="chart_main_frames">
                </div>
            </div>
        `

        this.$chartMain.innerHTML = html

        this.addTickerListener()
        this.addTimeframeListener()
    }

    private getTimeframeHtml(): string {
        return Timeframe.ALL_TIMEFRAME.reduce((acc, timeframe, index) => {
            let selectedClass = index === 0 ? "timeframe_item_selected" : ""
            let timeframeStr = timeframe.getTimeframeString()
            let unit = timeframe.getUnit()
            let value = timeframe.getValue()
            return (acc += `
                <div class="timeframe_item ${selectedClass}" data-unit="${unit}" data-value="${value}">
                    ${timeframeStr}
                </div>
            `)
        }, "")
    }

    private getTickerHtml(): string {
        return Ticker.ALL_TICKERS.reduce((acc, tickerStr) => {
            let selected = tickerStr === Ticker.DEFAULT_TICKER.getTicker() ? "selected" : ""
            return (acc += `
                <option class="ticker_item" ${selected} data-value="${tickerStr}">
                    ${tickerStr}
                </option>
            `)
        }, "")
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

    private addTimeframeListener(): void {
        let $timeframeItem = this.$chartMain.querySelectorAll(
            ".header .timeframe_item"
        )

        $timeframeItem.forEach(($tf) => {
            $tf.addEventListener("click", (e) => {
                $timeframeItem.forEach(($t) =>
                    $t.classList.remove("timeframe_item_selected")
                )
                $tf.classList.add("timeframe_item_selected")

                let unit: string = $tf.getAttribute("data-unit")!
                let value: string = $tf.getAttribute("data-value")!
                let timeframe = new Timeframe(
                    TimeframeUnit[unit as keyof typeof TimeframeUnit], 
                    Number(value)
                )
                this.activeChartFrame.setTimeframe(timeframe)
            })
        })
    }

    private addTickerListener(): void {
        let $tickerSelect: HTMLSelectElement = this.$chartMain.querySelector(
            ".header .header_ticker_select select"
        )!

        $tickerSelect.addEventListener("input", (e) => {
            let $option = $tickerSelect.options[$tickerSelect.selectedIndex]
            let tickerStr: string = $option.getAttribute("data-value")!
            let ticker = new Ticker(tickerStr)
            this.activeChartFrame.setIsDataLoaded(false)
            this.activeChartFrame.setTicker(ticker)
        })
    }
}

export default ChartMain