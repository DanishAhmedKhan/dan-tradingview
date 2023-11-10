import ChartMain from "../ChartMain"
import { Timeframe, TimeframeUnit } from "../Timeframe"

class TimeframeHtml {

    private readonly TIMEFRAME_WRAPPER_CLASS = 'header_timeframe_select'
    private readonly TIMEFRAME_ITEM = 'timeframe_item'
    private readonly TIMEFRAME_ITEM_SELECTED = 'timeframe_item_selected'

    private chartMain: ChartMain
    private chartMainHtmlElement: HTMLElement

    constructor(chartMain: ChartMain) {
        this.chartMain = chartMain
        this.chartMainHtmlElement = this.chartMain.getChartMainHtmlElement()
    }

    public addHtml(containerHtmlElement: HTMLElement): void {
        let chartFrame = this.chartMain.getChartFrameManager().getActiveChartFrame()

        let timeframeHtml = Timeframe.ALL_TIMEFRAME.reduce((acc, timeframe) => {
            let selectedClass = ""

            let timeframeStr = timeframe.getTimeframeString()
            let unit = timeframe.getUnit()
            let value = timeframe.getValue()

            if (chartFrame.getTimeframe().getUnit() === unit &&
                chartFrame.getTimeframe().getValue() === value)
                selectedClass = this.TIMEFRAME_ITEM_SELECTED

            return (acc += `
                <div class="${this.TIMEFRAME_ITEM} ${selectedClass}" data-unit="${unit}" data-value="${value}">
                    ${timeframeStr}
                </div>
            `)
        }, "")

        let wrapperHtmlElement = document.createElement('div')
        wrapperHtmlElement.innerHTML = timeframeHtml
        wrapperHtmlElement.classList.add(this.TIMEFRAME_WRAPPER_CLASS)

        containerHtmlElement.append(wrapperHtmlElement)
        this.addChangeListener()
    }

    public addChangeListener(): void {
        let chartFrame = this.chartMain.getChartFrameManager().getActiveChartFrame()

        let timeframeItemHtmlElements =
            this.chartMainHtmlElement.querySelectorAll(`.header .${this.TIMEFRAME_ITEM}`)

        timeframeItemHtmlElements.forEach((timeframeItemHtmlElement) => {
            timeframeItemHtmlElement.addEventListener("click", (event: any) => {
                timeframeItemHtmlElements.forEach((tfiHtmlElement) =>
                    tfiHtmlElement.classList.remove(this.TIMEFRAME_ITEM_SELECTED)
                )
                timeframeItemHtmlElement.classList.add(this.TIMEFRAME_ITEM_SELECTED)

                let unit: string = timeframeItemHtmlElement.getAttribute("data-unit")!
                let value: string = timeframeItemHtmlElement.getAttribute("data-value")!
                let timeframe = new Timeframe(
                    <TimeframeUnit>unit,
                    Number(value)
                )
                chartFrame.setTimeframe(timeframe)
            })
        })
    }
}

export { TimeframeHtml }