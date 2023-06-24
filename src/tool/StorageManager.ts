import { Ticker } from "../Ticker"
import { TickerStorage } from "./TickerStorage"

class StorageManager {
    
    private tickerStorage: {
        [key: string]: TickerStorage
    }
    
    constructor() {
        let toolStorage: any = {}
        Ticker.ALL_TICKERS.forEach(ticker => {
            toolStorage[ticker] = new TickerStorage(ticker)
        })

        this.tickerStorage = toolStorage
    }

    public getTickerStorage(ticker: Ticker): TickerStorage {
        return this.tickerStorage[ticker.getTicker()]
    }
}

export { StorageManager }