import { Ticker } from "./Ticker"
import { Timeframe } from "./Timeframe"

class CHartHUD {

    private hudHtmlElement: HTMLElement | null = null

    constructor(htmlElement: HTMLElement) {
        this.addHUDHtml(htmlElement)
    }

    public addHUDHtml(htmlElement: HTMLElement): void {
        let html = (`
            <div class="hud_main">
                <div class="hud_wrapper">
                    <div class="hud_row">
                        <div class="hud_row_content">
                            <div class="hud_element hud_text hud_ticker"></div>
                            <div class="hud_element hud_text hud_separator">-</div>
                            <div class="hud_element hud_text hud_timeframe"></div>
                            <div class="hud_element hud_text hud_text_small hud_ohlc">
                                <div class="hud_ohlc_value">
                                    <div class="">O</div>
                                    <div class="hud_open"></div>
                                </div>
                                <div class="hud_ohlc_value">
                                    <div class="">H</div>
                                    <div class="hud_high"></div>
                                </div>
                                <div class="hud_ohlc_value">
                                    <div class="">L</div>
                                    <div class="hud_low"></div>
                                </div>
                                <div class="hud_ohlc_value">
                                    <div class="">C</div>
                                    <div class="hud_close"></div>
                                </div>
                                <div class="hud_ohlc_value">
                                    <div class="hud_change"></div>
                                    <div class="hud_percent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)

        htmlElement.insertAdjacentHTML('beforeend', html)

        this.hudHtmlElement = htmlElement.querySelector('.hud_main')!
    }

    public setTicker(ticker: Ticker): void {
        let tk = ticker.getTicker()
        let tickerHtmlElement = this.hudHtmlElement?.querySelector('.hud_ticker')!
        tickerHtmlElement.innerHTML = tk
    }

    public setTimeframe(timeframe: Timeframe): void {
        let tf = timeframe.getReadableTimeframe()
        let timeframeHtmlElement = this.hudHtmlElement?.querySelector('.hud_timeframe')!
        timeframeHtmlElement.innerHTML = tf
    }

    public setOHLC(value: any): void {
        if (!value || !value.low || !value.high || !value.low || !value.close) return

        let openHtmlElement = this.hudHtmlElement?.querySelector('.hud_open')!
        let highHtmlElement = this.hudHtmlElement?.querySelector('.hud_high')!
        let lowHtmlElement = this.hudHtmlElement?.querySelector('.hud_low')!
        let closeHtmlElement = this.hudHtmlElement?.querySelector('.hud_close')!
        let changeHtmlElement = this.hudHtmlElement?.querySelector('.hud_change')!
        let percentHtmlElement = this.hudHtmlElement?.querySelector('.hud_percent')!

        openHtmlElement.innerHTML = value.open.toFixed(5)
        highHtmlElement.innerHTML = value.high.toFixed(5)
        lowHtmlElement.innerHTML = value.low.toFixed(5)
        closeHtmlElement.innerHTML = value.close.toFixed(5)

        let change = value.close - value.open.toFixed(5)
        let percent = change / value.open * 100

        changeHtmlElement.innerHTML = change.toFixed(5)
        percentHtmlElement.innerHTML = '(' + percent.toFixed(2) + '%)'
    }
}

export { CHartHUD }