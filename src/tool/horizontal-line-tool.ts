import { Tool } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"
import { DrawingManager } from "../drawing/drawing-manager"
import { ChartFrame } from "../ChartFrame"
import { drawHorizontalLine } from "../helper/canvas"
import { Point } from "../drawing/point"

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

            this.addToChart(drawingManager, {
                type: DrawingType.HORIZONTAL_LINE,
                price,
                color: 'rgba(0, 0, 0)',
                opacity: 1,
                lineWidth: 1,
            })

            this.removeChartListener()
        }
    }

    public editTool(chartFrame: ChartFrame, drawingManager: DrawingManager, point: Array<Point>, drawingOption: any, mousePosition: any): void {
        let htmlElement = chartFrame.chartInteractionWrapperHtmlElement

        let canvas = chartFrame.drawingPrerenderHtmlElement
        canvas.width = chartFrame.chartInteractionWrapperHtmlElement.offsetWidth
        canvas.height = chartFrame.chartInteractionWrapperHtmlElement.offsetHeight
        let bitmapSize = {
            width: canvas.width,
            height: canvas.height,
        }

        let ctx = canvas.getContext('2d')!
        drawHorizontalLine(ctx, point[0], drawingOption, bitmapSize)

        htmlElement.onmousemove = (event) => {
            let { price } = this.getTimeAndPrice(event)
            point[0] = new Point(null, price, drawingManager.chartReference)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawHorizontalLine(ctx, point[0], drawingOption, bitmapSize)
        }

        htmlElement.onmouseup = (event) => {
            htmlElement.onmousemove = null
            htmlElement.onmouseup = null

            let { price } = this.getTimeAndPrice(event)

            this.addToChart(drawingManager, {
                type: DrawingType.HORIZONTAL_LINE,
                price,
                color: 'rgba(0, 0, 0)',
                opacity: 1,
                lineWidth: 1,
            })

            chartFrame.chartInteractionWrapperHtmlElement.style.display = 'none'
            chartFrame.getChart().enableScroll()
        }
    }
}

export { HorizontalLineTool, HorizontalLineData }