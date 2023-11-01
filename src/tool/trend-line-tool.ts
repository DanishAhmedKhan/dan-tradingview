import { Tool, ToolParam } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"
import { DrawingManager } from "../drawing/drawing-manager"
import { ChartFrame } from "../ChartFrame"
import { Point } from "../drawing/point"
import { drawLine } from "../helper/canvas"
import { Color } from "../helper/color"

class TrendLineTool extends Tool {

    public readonly TOOL_CLASS = 'tool_trend_line'
    public readonly KEY = 'trendLine'
    public readonly toolData = {
        svg: svg.trendLine,
        name: 'Trend Line',
    }

    public handleChartEvent(chartFrame: ChartFrame, htmlElement: HTMLElement, drawingManager: DrawingManager): void {
        let startTime: number, startPrice: number
        let startX: number, startY: number, endX: number, endY: number
        let isMouseDown = false
        let isShiftPressed = false
        let mousePosition: any

        const setMousePosition = (event: any) => {
            mousePosition = {
                x: event.clientX,
                y: event.clientY,
            }
        }

        const mouseDownHandle = (event: any) => {
            setMousePosition(event)
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

            setMousePosition(event)

            if (isMouseDown) {
                htmlElement.onmousedown = null
                htmlElement.onmouseup = mouceUpHandle
            }

            let { x, y } = this.getPoint(event)
            endX = x
            endY = y

            if (isShiftPressed) {
                const deltaX = Math.abs(endX - startX)
                const deltaY = Math.abs(endY - startY)

                if (deltaX > deltaY) {
                    endY = startY
                } else {
                    endX = startX
                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeStyle = 'rgba(0, 0, 0)'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(startX, startY)
            ctx.lineTo(endX, endY)
            ctx.stroke()
        }

        const triggerMouseMoveEvent = () => {
            const event = new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: mousePosition.x,
                clientY: mousePosition.y,
            })

            htmlElement.dispatchEvent(event)
        }

        const shiftKeyHandle = (event: any) => {
            if (event.shiftKey && !isShiftPressed) {
                isShiftPressed = true
                triggerMouseMoveEvent()
            }
        }

        document.onkeyup = (event: any) => {
            if (!event.shiftKey && isShiftPressed) {
                isShiftPressed = false
                triggerMouseMoveEvent()
            }
        }

        const mouceUpHandle = (event: any) => {
            event.preventDefault()
            event.stopPropagation()

            let { time: endTime, price: endPrice } = this.getTimeAndPrice({
                clientX: endX,
                clientY: endY,
                target: event.target,
                offset: true,
            })

            this.addToChart(drawingManager, {
                type: DrawingType.TREND_LINE,
                startTime,
                startPrice,
                endTime,
                endPrice,
                color: Color.BLACK,
                lineWidth: 1,
            })

            htmlElement.onmousemove = null
            htmlElement.onmouseup = null
            this.removeChartListener()
        }

        document.onkeydown = shiftKeyHandle
        htmlElement.onmousedown = mouseDownHandle
    }

    public editTool(chartFrame: ChartFrame, drawingManager: DrawingManager, point: Array<Point>, drawingOption: any, mouseEvent: any): void {
        let htmlElement = chartFrame.chartInteractionWrapperHtmlElement
        let chartReference = drawingManager.chartReference

        drawingOption = {
            ...drawingOption,
            color: drawingOption.fillColor,
            opacity: drawingOption.fillOpacity,
        }

        let canvas = chartFrame.drawingPrerenderHtmlElement
        canvas.width = chartFrame.chartInteractionWrapperHtmlElement.offsetWidth
        canvas.height = chartFrame.chartInteractionWrapperHtmlElement.offsetHeight

        let ctx = canvas.getContext('2d')!
        drawLine(ctx, point[0], point[1], drawingOption)

        let { x, y } = this.getPoint(mouseEvent)
        let isShiftPressed = false
        let mousePosition: any

        let d1 = point[0].distance(x, y)
        let d2 = point[1].distance(x, y)
        console.log(d1, d2)

        const triggerMouseMoveEvent = () => {
            const event = new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: mousePosition.x,
                clientY: mousePosition.y,
            })

            htmlElement.dispatchEvent(event)
        }

        document.onkeydown = (event: any) => {
            if (event.shiftKey && !isShiftPressed) {
                isShiftPressed = true
                triggerMouseMoveEvent()
            }
        }

        document.onkeyup = (event: any) => {
            if (!event.shiftKey && isShiftPressed) {
                isShiftPressed = false
                triggerMouseMoveEvent()
            }
        }

        const setMousePosition = (event: any) => {
            mousePosition = {
                x: event.clientX,
                y: event.clientY,
            }
        }

        htmlElement.onmousemove = (event) => {
            setMousePosition(event)

            let { x, y } = this.getPoint(event)
            let { time, price } = this.getTimeAndPrice(event)
            let newPoint: Point

            if (isShiftPressed) {
                let endX = x
                let endY = y
                let deltaX, deltaY
                let startX, startY

                if (d2 < 6) {
                    let p = point[0].get()
                    startX = p.x
                    startY = p.y

                    deltaX = Math.abs(point[0].getX()! - x)!
                    deltaY = Math.abs(point[0].getY()! - y)!
                } else if (d1 < 6) {
                    let p = point[1].get()
                    startX = p.x
                    startY = p.y

                    deltaX = Math.abs(point[1].getX()! - x)!
                    deltaY = Math.abs(point[1].getY()! - y)!
                }

                if (deltaX! > deltaY!) {
                    endY = startY!
                } else {
                    endX = startX!
                }

                newPoint = new Point(endX, endY, chartReference, true)
            } else {
                newPoint = new Point(time, price, chartReference)
            }

            if (d1 < 6) {
                point[0] = newPoint!
            } else if (d2 < 6) {
                point[1] = newPoint!
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawLine(ctx, point[0], point[1], drawingOption)
        }

        htmlElement.onmouseup = (event: any) => {
            htmlElement.onmousemove = null
            htmlElement.onmouseup = null

            this.addToChart(drawingManager, {
                type: DrawingType.TREND_LINE,
                startTime: point[0].getTime(),
                startPrice: point[0].getPrice(),
                endTime: point[1].getTime(),
                endPrice: point[1].getPrice(),
                color: Color.BLACK,
                lineWidth: 1,
            })

            chartFrame.chartInteractionWrapperHtmlElement.style.display = 'none'
            chartFrame.getChart().enableScroll()
        }

    }
}

export { TrendLineTool }