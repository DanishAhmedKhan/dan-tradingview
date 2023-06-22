import { ToolData } from "./ToolData"

interface Toolable {
    readonly key: string
    getHtml(): string,
    getAllData: Function,
}

class ToolStorage {

    private ticker: string
    private data: ToolData

    constructor(ticker: string) {
        this.ticker = ticker
        this.data = this.getData()
    }

    private getStorageKey(): string {
        return `data-${this.ticker}-tool`
    }

    public  getData(): ToolData {
        let key = this.getStorageKey()
        return JSON.parse(localStorage.getItem(key)!)
    }

    public saveData(tool: Toolable): void {
        const toolKey = tool.key as keyof ToolData
        this.data[toolKey] = tool.getAllData()

        let key = this.getStorageKey()
        localStorage.setItem(key, JSON.stringify(this.data))
    }
}

export { ToolStorage, Toolable }