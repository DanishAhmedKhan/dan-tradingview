import { Tool, ToolParam } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"
import { DrawingManager } from "../drawing/drawing-manager"
import { ChartFrame } from "../ChartFrame"

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

    public override handleChartEvent(chartFrame: ChartFrame, htmlElement: HTMLElement, drawingManager: DrawingManager): void {
        htmlElement.onmousedown = (event: any) => {
            event.preventDefault()
            event.stopPropagation()

            let { price } = this.getTimeAndPrice(event)

            drawingManager.add({
                type: DrawingType.HORIZONTAL_LINE,
                price,
                color: 'rgba(0, 0, 0)',
                lineWidth: 1,
            })

            this.removeChartListener()
        }
    }
}

export { HorizontalLineTool, HorizontalLineData }