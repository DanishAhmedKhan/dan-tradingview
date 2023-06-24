import { Datafeed } from './Datafeed'
import { TimeframeHtml } from './html/TimeframeHtml'
import { TickerHtml } from './html/TickerHtml'
import { ToolManager } from './tool/ToolManager'
import { ChartFrameManager } from './ChartFrameManager'

class ChartMain {
    
    private chartFrameManager: ChartFrameManager
    private toolManager: ToolManager

    private datafeed: Datafeed

    private $chartMain: HTMLDivElement

    constructor(elm: HTMLDivElement) {
        this.datafeed = new Datafeed()

        this.$chartMain = typeof elm === "string" ? 
            document.querySelector("." + elm)! : elm

        this.$chartMain.innerHTML = (`
            <div class="chart_main_wrapper">
                <div class="header">
                </div>
                <div class="chart_main_body">
                    <div class="chart_tool_wrapper">
                    </div>
                    <div class="chart_main_frames">
                    </div>
                <div>
            </div>
        `)

        this.toolManager = new ToolManager()
        this.chartFrameManager = new ChartFrameManager(this.$chartMain, this.datafeed, this.toolManager)

        this.addChartMainHeaderHtml()
    }

    public getChartMainElement(): HTMLDivElement {
        return this.$chartMain
    }

    public getChartFrameManager(): ChartFrameManager {
        return this.chartFrameManager
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

        this.toolManager.addHtml(this.$chartMain.querySelector('.chart_tool_wrapper')!)

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