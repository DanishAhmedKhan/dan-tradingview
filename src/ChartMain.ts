import { Datafeed } from './datafeed'
import { TimeframeHtml } from './html/TimeframeHtml'
import { TickerHtml } from './html/TickerHtml'
import { ToolManager } from './tool/ToolManager'
import { ChartFrameManager } from './ChartFrameManager'
import { ToolbarManager } from './drawing/toolbar-manager'
import { Calendar } from './calendar'

class ChartMain {

    private chartFrameManager: ChartFrameManager
    private toolManager: ToolManager
    private toolbarManager: ToolbarManager

    private datafeed: Datafeed

    private chartMainHtmlElement: HTMLElement
    private calendar: Calendar | null = null

    constructor(chartMainHtmlElement: HTMLElement | string) {
        this.datafeed = new Datafeed()

        this.chartMainHtmlElement = typeof chartMainHtmlElement === "string" ?
            document.querySelector("." + chartMainHtmlElement)! : chartMainHtmlElement

        this.chartMainHtmlElement.innerHTML = (`
            <div class="chart_main_wrapper">
                <div class="header">
                    <div class="header_left">
                    </div>
                    <div class="header_right">
                    </div>
                </div>
                <div class="chart_main_body">
                    <div class="chart_tool_wrapper">
                    </div>
                    <div class="chart_main_frames">
                    </div>
                </div>
                <div class="chart_main_toolbar_canvas"></div>
            </div>
        `)

        this.toolbarManager = new ToolbarManager()
        this.chartFrameManager = new ChartFrameManager(
            this.chartMainHtmlElement,
            this.datafeed,
            this.toolbarManager,
        )
        this.toolManager = new ToolManager(this.chartFrameManager)
        this.chartFrameManager.setToolManager(this.toolManager)

        let headerRightHtmlElement = this.chartMainHtmlElement.querySelector('.header_right')! as HTMLElement
        this.calendar = new Calendar(headerRightHtmlElement, this.chartFrameManager)

        this.chartFrameManager.addChartFrame(this.calendar!)

        this.addChartMainHeaderHtml()
    }

    public getChartMainHtmlElement(): HTMLElement {
        return this.chartMainHtmlElement
    }

    public getChartFrameManager(): ChartFrameManager {
        return this.chartFrameManager
    }

    private async addChartMainHeaderHtml() {
        let timeframeHtml = new TimeframeHtml(this)
        let tickerHtml = new TickerHtml(this)

        let headerLeftHtmlElement = this.chartMainHtmlElement.querySelector('.header_left')! as HTMLElement
        let headerRightHtmlElement = this.chartMainHtmlElement.querySelector('.header_right')! as HTMLElement
        let toolWrapperHtmlElement = this.chartMainHtmlElement.querySelector('.chart_tool_wrapper')! as HTMLElement

        this.toolManager.addHtml(toolWrapperHtmlElement)
        tickerHtml.addHtml(headerLeftHtmlElement)
        timeframeHtml.addHtml(headerLeftHtmlElement)

        // this.calendar = new Calendar(headerRightHtmlElement, this.chartFrameManager)

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
        let cahrtFrameHtmlElements = document.querySelectorAll(".chart_frame_item")

        cahrtFrameHtmlElements.forEach((cahrtFrameHtmlElement) => {
            cahrtFrameHtmlElement.addEventListener("click", (e) => { })
        })
    }
}

export default ChartMain