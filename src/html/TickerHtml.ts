import { Ticker } from "../Ticker"
import ChartMain from "../ChartMain"
import { ChartFrame } from "../ChartFrame"

class TickerHtml {

    private readonly TICKER_ITEM = 'ticker_item'

    private chartMain: ChartMain
    private chartMainHtmlElement: HTMLElement

    constructor(chartMain: ChartMain) {
        this.chartMain = chartMain
        this.chartMainHtmlElement = this.chartMain.getChartMainHtmlElement()
    }

    public getHtml(): string {
        let chartFrame = this.chartMain.getChartFrameManager().getActiveChartFrame()

        return Ticker.ALL_TICKERS.reduce((acc, tickerStr) => {

            let selected = tickerStr === chartFrame.getTicker().getTicker() ? "selected" : ""
            
            return (acc += `
                <option class="${this.TICKER_ITEM}" ${selected} data-value="${tickerStr}">
                    ${tickerStr}
                </option>
            `)
        }, "")
    }

    public addInputListener(): void {
        let chartFrame = this.chartMain.getChartFrameManager().getActiveChartFrame()

        let $tickerSelect: HTMLSelectElement = this.chartMainHtmlElement.querySelector(
            ".header .header_ticker_select select"
        )!

        $tickerSelect.addEventListener("input", (e) => {
            let $option = $tickerSelect.options[$tickerSelect.selectedIndex]
            let tickerStr: string = $option.getAttribute("data-value")!
            let ticker = new Ticker(tickerStr)

            chartFrame.setIsDataLoaded(false)
            chartFrame.setTicker(ticker)
        })
    }
}

export { TickerHtml }