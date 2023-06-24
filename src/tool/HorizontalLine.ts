import { Tool } from "./Tool"
import { StorageManager } from "./StorageManager"
import { ChartFrame } from "../ChartFrame"
import { ToolData } from "./TickerStorage"
import { svg } from '../helper/svg'

type HorizontalLineData = {
    price: number,
    color: string,
    id?: string,
    lineWidth?: number,
    lineStyle?: string,
    axisLabelVisible?: boolean,
}

class HorizontalLine extends Tool {

    public readonly TOOL_CLASS = 'tool_horizontal_line'
    public readonly KEY = 'horizontalLine'
    public readonly toolData = {
        svg: svg.horizontalLine,
        name: 'Horizontal Line',
    }

    constructor(storageManager: StorageManager) {
        super(storageManager)
        this.$tool = null
    }

    public getHtml(): string {
        return `
            <div class="tool_item ${this.TOOL_CLASS}">
                <div class="tool_logo">${this.toolData.svg}</div>
            </div>
        `
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

    public addChartListener(chartFrame: ChartFrame): void {
        let chart = chartFrame.getChart().getLightweightChart()
        let candleSeries = chartFrame.getChart().getCandleSeries()

        let chartListener = (event: any) => {
            if (!this.isSelected || !event.point || !event.time) return

            let price = candleSeries.coordinateToPrice(event.point.y)

            const line = {
                price: price,

                color: "#be1238",
                lineWidth: 1,
                lineStyle: window.LightweightCharts.LineStyle.Solid,
                axisLabelVisible: false,
            }

            candleSeries.createPriceLine(line)
            chart.unsubscribeClick(chartListener)
        }

        chart.subscribeClick(chartListener)
    }

    public addToChart(
        chartFrame: ChartFrame, 
        line: ToolData, 
        shouldUpdtaeData: boolean = true,
    ): void {
        if (shouldUpdtaeData) {
            this.getTickerStorage(chartFrame).addData(this.KEY, line)
        }
        
        chartFrame.getChart().getCandleSeries().createPriceLine(line)
    }

    public removeFromChart(
        chartFrame: ChartFrame, 
        line: ToolData,
        shouldUpdtaeData: boolean = true,
    ): void {
        if (shouldUpdtaeData) {
            this.getTickerStorage(chartFrame).removeData(this.KEY, line)
        }

        chartFrame.getChart().getCandleSeries().removePriceLine(line)
    }
}

export { HorizontalLine, HorizontalLineData }