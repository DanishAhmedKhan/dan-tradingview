class Ticker {
    static ALL_TICKERS = [
        // "AUDCAD",
        // "AUDCHF",
        // "AUDJPY",
        // "AUDNZD",
        // "CADCHF",
        // "EURAUD",
        // "EURCHF",
        // "EURGBP",
        // "EURJPY",
        "EURUSD",
        // "GBPCHF",
        // "GBPJPY",
        // "GBPNZD",
        "GBPUSD",
        // "NZDCAD",
        // "NZDCHF",
        // "NZDJPY",
        // "NZDUSD",
        // "USDCAD",
        // "USDCHF",
        "USDJPY",
    ]

    static DEFAULT_TICKER = "EURUSD"

    ticker

    constructor(ticker) {
        this.ticker =
            ticker && this.isValidTicker(ticker)
                ? ticker
                : Ticker.DEFAULT_TICKER
    }

    isValidTicker(tickerStr) {
        return Ticker.ALL_TICKERS.includes(tickerStr)
    }

    getTicker() {
        return this.ticker
    }

    setTicker(ticker) {
        if (this.isValidTicker(ticker)) {
            this.ticker = ticker
        } else {
            console.log("Invalid ticker")
        }
    }
}
