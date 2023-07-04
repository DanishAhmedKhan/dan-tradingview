import { Tool, ToolParam } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"
import { DrawingManager } from "../drawing/drawing-manager"
import { ChartFrame } from "../ChartFrame"
import { Color } from "../helper/color"

class RectangleTool extends Tool {

    public readonly TOOL_CLASS = 'tool_rectangle'
    public readonly KEY = 'rectangle'
    public readonly toolData = {
        svg: svg.rectangle,
        name: 'Rectangle',
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

            ctx.beginPath()
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillRect(startX, startY, width, height)
            ctx.strokeStyle = 'rgba(0, 0, 0, 1)',
            ctx.lineWidth = 1
            ctx.strokeRect(startX, startY, width, height)
        }

        const mouceUpHandle = (event: any) => {
            event.preventDefault()
            event.stopPropagation()

            let { time: endTime, price: endPrice } = this.getTimeAndPrice(event)

            drawingManager.add({
                type: DrawingType.RECTANGLE,
                startTime,
                startPrice,
                endTime,
                endPrice,
                fillColor: Color.BLACK,
                fillOpacity: 0.1,
                borderColor: Color.BLACK,
                borderOpacity: 1,
                borderWidth: 1,
            })
        
            htmlElement.onmousemove = null
            htmlElement.onmouseup = null
            this.removeChartListener()
        }

        htmlElement.onmousedown = mouseDownHandle
    }
}

export { RectangleTool }