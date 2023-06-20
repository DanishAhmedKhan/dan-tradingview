import { Ticker } from "../Ticker"
import ChartMain from "../ChartMain"

class TickerHtml {

    private readonly TICKER_ITEM = 'ticker_item'

    private chartMain
    private $chartMain
    private chartFrame

    constructor(chartMain: ChartMain) {
        this.chartMain = chartMain
        this.$chartMain = this.chartMain.getChartMainElement()
        this.chartFrame = this.chartMain.getActiveChartFrame()
    }

    public getHtml(): string {
        return Ticker.ALL_TICKERS.reduce((acc, tickerStr) => {

            let selected = tickerStr === this.chartFrame.getTicker().getTicker() ? "selected" : ""
            
            return (acc += `
                <option class="${this.TICKER_ITEM}" ${selected} data-value="${tickerStr}">
                    ${tickerStr}
                </option>
            `)
        }, "")
    }

    public addInputListener(): void {
        let $tickerSelect: HTMLSelectElement = this.$chartMain.querySelector(
            ".header .header_ticker_select select"
        )!

        $tickerSelect.addEventListener("input", (e) => {
            let $option = $tickerSelect.options[$tickerSelect.selectedIndex]
            let tickerStr: string = $option.getAttribute("data-value")!
            let ticker = new Ticker(tickerStr)

            this.chartFrame.setIsDataLoaded(false)
            this.chartFrame.setTicker(ticker)
        })
    }
}

export { TickerHtml }