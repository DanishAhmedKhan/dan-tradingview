import { ToolStorage } from "./tool/ToolStorage";

class Ticker {
    public static readonly ALL_TICKERS: Array<string> = [
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

    public static readonly DEFAULT_TICKER_STRING = "EURUSD"
    public static readonly DEFAULT_TICKER: Ticker = new Ticker(this.DEFAULT_TICKER_STRING)

    private ticker

    constructor(ticker: string) {
        this.ticker =
            ticker && this.isValidTicker(ticker)
                ? ticker
                : Ticker.DEFAULT_TICKER.getTicker()
    }

    public isValidTicker(ticker: string): boolean {
        return Ticker.ALL_TICKERS.includes(ticker)
    }

    public getTicker(): string {
        return this.ticker
    }

    public setTicker(ticker: string): void {
        if (this.isValidTicker(ticker)) {
            this.ticker = ticker
        } else {
            throw Error("Invalid ticker")
        }
    }
}

export { Ticker }