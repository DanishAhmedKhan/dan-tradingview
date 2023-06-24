interface ToolApi<T> {
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