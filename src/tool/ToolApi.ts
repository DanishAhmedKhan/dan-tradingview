import { ToolStorage } from "./ToolStorage";

interface ToolApi<T> {
    toolStorage: ToolStorage

    getByIndex(
        index: number
    ): T

    addAllToChart(
        candleSeries: any
    ): void

    removeAllFromChart(
        candleSeries: any
    ): void

    addToChart(
        candleSeries: any, 
        tool: T, 
        shouldUpdtaeData: boolean
    ): void

    removeFromChart(
        candleSeries: any, 
        tool: T, 
        shouldUpdtaeData: boolean
    ): void
}

export { ToolApi }