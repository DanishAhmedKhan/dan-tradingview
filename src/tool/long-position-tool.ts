import { Tool, ToolParam } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"
import { DrawingManager } from "../drawing/drawing-manager"
import { ChartFrame } from "../ChartFrame"
import { Point } from "../drawing/point"

class LongPositionTool extends Tool {

    public readonly TOOL_CLASS = 'tool_long_position'
    public readonly KEY = 'longPosition'
    public readonly toolData = {
        svg: svg.longPosition,
        name: 'Long Position',
    }

    public handleChartEvent(chartFrame: ChartFrame, htmlElement: HTMLElement, drawingManager: DrawingManager): void {
        htmlElement.onmousedown = (event: any) => {
            event.preventDefault()
            event.stopPropagation()

            let { time, price } = this.getTimeAndPrice(event)

            this.addToChart(drawingManager, {
                type: DrawingType.LONG_POSITION,
                time,
                price,
            })
        }
    }

    public editTool(chartFrame: ChartFrame, drawingManager: DrawingManager, point: Array<Point>, drawingOption: any, mouseEvent: any): void {

    }
}

export { LongPositionTool }