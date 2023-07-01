import { Tool, ToolParam } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"
import { DrawingManager } from "../drawing/drawing-manager"

class RectangleTool extends Tool {

    public readonly TOOL_CLASS = 'tool_rectangle'
    public readonly KEY = 'rectangle'
    public readonly toolData = {
        svg: svg.rectangle,
        name: 'Rectangle',
    }

    constructor(toolParam: ToolParam) {
        super(toolParam)
    }

    public handleChartEvent(event: any, drawingManager: DrawingManager): void {
        let { chart, candleSeries } = this.getChartAndSeries()
        let rect = event.target.getBoundingClientRect()
        console.log(rect)
        let yPosition = event.clientY - rect.top
        console.log(event.target.offsetTop)
        let price =  candleSeries.coordinateToPrice(yPosition)
        console.log(price)

        document.onmousemove = (event: any) => {

        }

        drawingManager.add({
            type: DrawingType.HORIZONTAL_LINE,
            price,
            color: 'rgba(0, 0, 255, 1)'
        })

        this.removeChartListener()
    }
}

export { RectangleTool }