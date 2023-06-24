type ToolData = {
    id: string,
}

type TickerData = {
    [key: string]: Array<ToolData>,
}

class TickerStorage {

    private ticker: string
    public data: TickerData

    constructor(ticker: string) {
        this.ticker = ticker
        this.data = this.getData()
    }

    private getStorageKey(): string {
        return `data-${this.ticker}-tool`
    }

    public  getData(): TickerData {
        let key = this.getStorageKey()
        let data = JSON.parse(localStorage.getItem(key)!)
        if (!data) data = {}
        return data
    }

    public saveData(): void {
        let key = this.getStorageKey()
        localStorage.setItem(key, JSON.stringify(this.data))
    }

    public addData(toolName: string, tool: ToolData): void {
        if (!this.data[toolName]) this.data[toolName] = []
        this.data[toolName].push(tool)
        this.saveData()
    }

    public removeData(toolName: string, toolData: ToolData): void {
        let index = this.data[toolName].findIndex(d => d.id === toolData.id )
        if (index > -1) this.data[toolName].splice(index, 1)
        this.saveData()
    }
}

export { ToolData, TickerData, TickerStorage }