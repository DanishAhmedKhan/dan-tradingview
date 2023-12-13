import { Ticker } from "../Ticker"
import ChartMain from "../ChartMain"
import { ChartFrame } from '../ChartFrame'

class TickerHtml {

    private readonly TICKER_WRAPPER_CLASS = 'header_ticker_select'
    private readonly TICKER_ITEM = 'ticker_item'

    private chartMain: ChartMain
    private chartMainHtmlElement: HTMLElement

    constructor(chartMain: ChartMain) {
        this.chartMain = chartMain
        this.chartMainHtmlElement = this.chartMain.getChartMainHtmlElement()
    }

    public addHtml(containerHtmlElement: HTMLElement): void {
        let chartFrame = this.chartMain.getChartFrameManager().getActiveChartFrame()

        let optionHtml = Ticker.ALL_TICKERS.reduce((acc, tickerStr) => {
            let selected = tickerStr === chartFrame.getTicker().getTicker() ? "selected" : ""

            return (acc += `
                <option class="${this.TICKER_ITEM}" ${selected} data-value="${tickerStr}">
                    ${tickerStr}
                </option>
            `)
        }, "")

        let selectHtml = (`
            <select>
                ${optionHtml}
            </select>
        `)

        let wrapperHtmlElement = document.createElement('div')
        wrapperHtmlElement.innerHTML = selectHtml
        wrapperHtmlElement.classList.add(this.TICKER_WRAPPER_CLASS)

        containerHtmlElement.append(wrapperHtmlElement)
        this.addInputListener()
    }

    public addInputListener(): void {
        let chartFrame = this.chartMain.getChartFrameManager().getActiveChartFrame()

        let tickerSelectHtmlElement: HTMLSelectElement = this.chartMainHtmlElement.querySelector(
            ".header .header_ticker_select select"
        )!

        tickerSelectHtmlElement.addEventListener("input", (e) => {
            let optionHtmlElement = tickerSelectHtmlElement.options[tickerSelectHtmlElement.selectedIndex]
            let tickerStr: string = optionHtmlElement.getAttribute("data-value")!
            let ticker = new Ticker(tickerStr)

            chartFrame.setIsDataLoaded(false)
            chartFrame.setTicker(ticker)
        })
    }
}

export { TickerHtml }