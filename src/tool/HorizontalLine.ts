import { Ticker } from "../Ticker"
import { ToolStorage, Toolable } from "./ToolStorage"
import { ToolApi } from "./ToolApi"

type HorizontalLineData = {
    price: number,
    color: string,
    id?: string,
    lineWidth?: number,
    lineStyle?: string,
    axisLabelVisible?: boolean,
}

class HorizontalLine implements ToolApi<HorizontalLineData>, Toolable {

    private readonly TOOL_HORIZONTAL_LINE = 'tool-horizontal-line'

    public readonly key = 'horizontalLine'

    public  storageManager: StorageManager
    private line: Array<HorizontalLineData>

    private $tool: HTMLDivElement | null
    private isSelected: boolean

    constructor(storageManager: StorageManager) {
        this.storageManager = storageManager
        this.line = this.toolStorage.getData().horizontalLine
        this.$tool = null
        this.isSelected = false
    }

    public getHtml(): string {
        return `
            <div class="tool-item ${this.TOOL_HORIZONTAL_LINE}">
                <div class="tool-logo">-</div>
            </div>
        `
    }

    public addClickListener($toolBox: HTMLDivElement): void {
        this.$tool = $toolBox.querySelector(`.${this.TOOL_HORIZONTAL_LINE}`)!
        
        this.$tool.addEventListener('click', e => {
            this.isSelected = true
        })
    }

    public addChartInterationListener(chart: any, candleSeries: any): void {
        chart.subscribeClick((event: any) => {
            if (!event.point) return

            if (event.time) {
                let price = candleSeries.coordinateToPrice(event.point.y)

                const line = {
                    price: price,
                    color: "#be1238",
                    lineWidth: 1,
                    lineStyle: window.LightweightCharts.LineStyle.Solid,
                    axisLabelVisible: false,
                }
                candleSeries.createPriceLine(line)
            }
        })
    }

    public getAllData(): Array<HorizontalLineData> {
        return this.line
    }

    public getByIndex(index: number): HorizontalLineData {
        if (index > this.line.length) throw Error("HorizontalLine at the given index not found")
        return this.line[index]
    }

    public getLineByPrice(price: number): HorizontalLineData {
        let line = this.line.find(line => {
            return line.price === price
        })

        if (!line) throw Error("HorizontalLine with the given price not found")
        return line
    }

    public addAllToChart(candleSeries: any): void {
        this.line.forEach(l => this.addToChart(candleSeries, l, false))
    }

    public removeAllFromChart(candleSeries: any): void {
        this.line.forEach(l => this.removeFromChart(candleSeries, l, false))
    }

    public addToChart(
        candleSeries: any, 
        line: HorizontalLineData, 
        shouldUpdtaeData: boolean = true,
    ): void {
        if (shouldUpdtaeData) {
            this.line.push(line)
            // TODO: save to ToolData
        }
        
        candleSeries.createPriceLine(line)
    }

    public removeFromChart(
        candleSeries: any, 
        line: HorizontalLineData,
        shouldUpdtaeData: boolean = true,
    ): void {
        if (shouldUpdtaeData) {
            let index = this.line.findIndex(l => {
                return l.price === line.price
            })
            
            if (index > -1) this.line.splice(index, 1)
        }

        candleSeries.removePriceLine(line)
    }
}

export { HorizontalLine, HorizontalLineData }