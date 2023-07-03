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

class VerticalLineTool extends Tool {

    public readonly TOOL_CLASS = 'tool_vertical_line'
    public readonly KEY = 'verticalLine'
    public readonly toolData = {
        svg: svg.verticalLine,
        name: 'Vertical Line',
    }

    public handleChartEvent(chartFrame: ChartFrame, htmlElement: HTMLElement, drawingManager: DrawingManager): void {
        htmlElement.onmousedown = (event: any) => {
            event.preventDefault()
            event.stopPropagation()

            let { time } = this.getTimeAndPrice(event)

            drawingManager.add({
                type: DrawingType.VERTICAL_LINE,
                time,
                color: 'rgba(0, 0, 255)'
            })
            
            this.removeChartListener()
        }
    }
}

export { VerticalLineTool, HorizontalLineData }