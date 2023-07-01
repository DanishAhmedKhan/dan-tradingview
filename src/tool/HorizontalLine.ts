import { Tool, ToolParam } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"

type HorizontalLineData = {
    price: number,
    color: string,
    id?: string,
    lineWidth?: number,
    lineStyle?: string,
    axisLabelVisible?: boolean,
}

class HorizontalLineTool extends Tool {

    public readonly TOOL_CLASS = 'tool_horizontal_line'
    public readonly KEY = 'horizontalLine'
    public readonly toolData = {
        svg: svg.horizontalLine,
        name: 'Horizontal Line',
    }

    constructor(toolParam: ToolParam) {
        super(toolParam)
    }

    public handleChartEvent(event: any): void {
        let chartFrameWrapperHtmlElement = event.target.parentElement.parentElement
        let frameIndex = Number(chartFrameWrapperHtmlElement.getAttribute('data-frame-index'))
        console.log(frameIndex)
        let chartFrame = this.chartFrameManager.getChartFrameAtIndex(frameIndex)
        let drawingManager = chartFrame.getDrawingManager()

        let { chart, candleSeries } = this.getChartAndSeries()
        let rect = event.target.getBoundingClientRect()
        console.log(rect)
        let yPosition = event.clientY - rect.top
        console.log(event.target.offsetTop)
        let price =  candleSeries.coordinateToPrice(yPosition)
        console.log(price)

        drawingManager.add({
            type: DrawingType.HORIZONTAL_LINE,
            price,
            color: 'rgba(0, 0, 255)'
        })

        this.removeChartListener()
    }
}

export { HorizontalLineTool, HorizontalLineData }