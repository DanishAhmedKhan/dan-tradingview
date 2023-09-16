import { Tool, ToolParam } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"
import { DrawingManager } from "../drawing/drawing-manager"
import { ChartFrame } from "../ChartFrame"
import { drawVerticalLine } from "../helper/canvas"
import { Point } from "../drawing/point"

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

            this.addToChart(drawingManager, {
                type: DrawingType.VERTICAL_LINE,
                time,
                color: 'rgba(0, 0, 0)',
                lineWidth: 1,
            })

            this.removeChartListener()
        }
    }

    public editTool(chartFrame: ChartFrame, drawingManager: DrawingManager, point: Array<Point>, drawingOption: any): void {
        let htmlElement = chartFrame.chartInteractionWrapperHtmlElement

        let canvas = chartFrame.drawingPrerenderHtmlElement
        canvas.width = chartFrame.chartInteractionWrapperHtmlElement.offsetWidth
        canvas.height = chartFrame.chartInteractionWrapperHtmlElement.offsetHeight
        let bitmapSize = {
            width: canvas.width,
            height: canvas.height,
        }

        let ctx = canvas.getContext('2d')!
        drawVerticalLine(ctx, point[0], drawingOption, bitmapSize)

        htmlElement.onmousemove = (event) => {
            let { time } = this.getTimeAndPrice(event)
            point[0] = new Point(time, null, drawingManager.chartReference)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawVerticalLine(ctx, point[0], drawingOption, bitmapSize)
        }

        htmlElement.onmouseup = (event) => {
            htmlElement.onmousemove = null
            htmlElement.onmouseup = null

            let { time } = this.getTimeAndPrice(event)

            this.addToChart(drawingManager, {
                type: DrawingType.VERTICAL_LINE,
                time,
                color: 'rgba(0, 0, 0)',
                opacity: 1,
                lineWidth: 1,
            })

            chartFrame.chartInteractionWrapperHtmlElement.style.display = 'none'
            chartFrame.getChart().enableScroll()
        }
    }
}

export { VerticalLineTool, HorizontalLineData }