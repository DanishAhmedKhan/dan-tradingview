import { Tool } from "./Tool"
import { StorageManager } from "./StorageManager"
import { ToolData } from "./TickerStorage"
import { svg } from '../helper/svg'
import { ChartFrameManager } from "../ChartFrameManager"

type HorizontalLineData = {
    price: number,
    color: string,
    id?: string,
    lineWidth?: number,
    lineStyle?: string,
    axisLabelVisible?: boolean,
}

class VerticalLineTool extends Tool {

    public readonly TOOL_CLASS = 'tool_vertical_line'
    public readonly KEY = 'verticalLine'
    public readonly toolData = {
        svg: svg.horizontalLine,
        name: 'Vertical Line',
    }

    constructor(storageManager: StorageManager, chartFrameManager: ChartFrameManager) {
        super(storageManager, chartFrameManager)
        this.toolHtmlElement = null
    }

    public getHtml(): string {
        return (`
            <div class="tool_item ${this.TOOL_CLASS}">
                <div class="tool_logo">${this.toolData.svg}</div>
            </div>
        `)
    }

    public addChartListener(): void {
        let chartFrame = this.chartFrameManager.getActiveChartFrame()
        let chart = chartFrame.getChart().getLightweightChart()
        let candleSeries = chartFrame.getChart().getCandleSeries()

        let chartListener = (event: any) => {
            if (!this.isSelected || !event.point || !event.time) return

            let price = candleSeries.coordinateToPrice(event.point.y)

            const line = {
                id: String(+new Date()),
                price: price,
                color: "#be1238",
                lineWidth: 1,
                lineStyle: window.LightweightCharts.LineStyle.Solid,
                axisLabelVisible: false,
            }
            this.addToChart(line)

            chart.unsubscribeClick(chartListener)
            this.setIsSelected(false)
            this.toolHtmlElement?.classList.remove(`tool_item_selected`)
        }

        chart.subscribeClick(chartListener)
    }

    public override addToChart(
        line: ToolData, 
        shouldUpdtaeData: boolean = true,
    ): void {
        if (shouldUpdtaeData) {
            this.getTickerStorage().addData(this.KEY, line)
        }
        
        let chartFrame = this.chartFrameManager.getActiveChartFrame()
        chartFrame.getChart().getCandleSeries().createPriceLine(line)
    }

    public override removeFromChart(
        line: ToolData,
        shouldUpdtaeData: boolean = true,
    ): void {
        if (shouldUpdtaeData) {
            this.getTickerStorage().removeData(this.KEY, line)
        }

        let chartFrame = this.chartFrameManager.getActiveChartFrame()
        chartFrame.getChart().getCandleSeries().removePriceLine(line)
    }
}

export { VerticalLineTool, HorizontalLineData }