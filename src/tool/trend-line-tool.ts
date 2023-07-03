import { Tool, ToolParam } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"
import { DrawingManager } from "../drawing/drawing-manager"
import { ChartFrame } from "../ChartFrame"

class TrendLineTool extends Tool {

    public readonly TOOL_CLASS = 'tool_trend_line'
    public readonly KEY = 'trendLine'
    public readonly toolData = {
        svg: svg.trendLine,
        name: 'Trend Line',
    }

    public handleChartEvent(chartFrame: ChartFrame, htmlElement: HTMLElement, drawingManager: DrawingManager): void {
        let startTime: number, startPrice: number
        let startX: number, startY: number
        let isMouseDown = false

        const mouseDownHandle = (event: any) => {
            let { time, price } = this.getTimeAndPrice(event)
            let { x, y } = this.getPoint(event)

            startTime = time
            startPrice = price
            startX = x
            startY = y

            htmlElement.onmousemove = mouseMoveHandle
            isMouseDown = true
        }
        
        let canvas = chartFrame.drawingPrerenderHtmlElement
        let ctx = canvas.getContext('2d')!

        const mouseMoveHandle = (event: any) => {
            event.preventDefault()
            event.stopPropagation()

            if (isMouseDown) {
                htmlElement.onmousedown = null
                htmlElement.onmouseup = mouceUpHandle
            }

            let { x: endX, y: endY } = this.getPoint(event)
            const width = endX - startX;
            const height = endY - startY;

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeStyle = 'rgba(0, 0, 0)'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(startX, startY)
            ctx.lineTo(endX, endY)
            ctx.stroke()
        }

        const mouceUpHandle = (event: any) => {
            event.preventDefault()
            event.stopPropagation()

            let { time: endTime, price: endPrice } = this.getTimeAndPrice(event)

            drawingManager.add({
                type: DrawingType.TREND_LINE,
                startTime,
                startPrice,
                endTime,
                endPrice,
                color: '#000000',
                lineWidth: 1,
            })
        
            htmlElement.onmousemove = null
            htmlElement.onmouseup = null
            this.removeChartListener()
        }

        htmlElement.onmousedown = mouseDownHandle
    }
}

export { TrendLineTool }