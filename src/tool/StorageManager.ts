import { Ticker } from "../Ticker"
import { ToolStorage } from "./ToolStorage"

class StorageManager {
    
    private toolStorage: {
        [key: string]: ToolStorage
    }
    
    constructor() {
        let toolStorage: any = {}
        Ticker.ALL_TICKERS.forEach(ticker => {
            toolStorage[ticker] = new ToolStorage(ticker)
        })

        this.toolStorage = toolStorage
    }

    public getToolStorage(token: string): ToolStorage {
        return this.toolStorage[token]
    }
}

export { StorageManager }