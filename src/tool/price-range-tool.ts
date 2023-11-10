import { Tool, ToolParam } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"
import { DrawingManager } from "../drawing/drawing-manager"
import { ChartFrame } from "../ChartFrame"
import { Color, hexToRgba } from "../helper/color"
import { Point } from "../drawing/point"
import { drawDownArrow, fillPolyon } from "../helper/canvas"

class PriceRangeTool extends Tool {

    public readonly TOOL_CLASS = 'tool_price_range'
    public readonly KEY = 'priceRange'
    public readonly toolData = {
        svg: svg.priceRange,
        name: 'Price Range',
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
            ctx.beginPath()
            ctx.fillStyle = hexToRgba('#2962FF', 0.15)
            ctx.fillRect(startX, startY, width, height)

            let arrowStartX = (startX + endX) / 2
            let arrowStartY = startY
            let length = height

            let lineOption = {
                color: '#2962FF',
                lineWidth: 2,
            }

            drawDownArrow(ctx, arrowStartX, arrowStartY, length, lineOption)

            ctx.strokeStyle = '#2962FF'
            ctx.lineWidth = 2

            ctx.beginPath()
            ctx.moveTo(startX, startY)
            ctx.lineTo(endX, startY)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(startX, endY)
            ctx.lineTo(endX, endY)
            ctx.stroke()
        }

        const mouceUpHandle = (event: any) => {
            event.preventDefault()
            event.stopPropagation()

            let { time: endTime, price: endPrice } = this.getTimeAndPrice(event)
            let minTime, maxTime, minPrice, maxPrice;

            if (startTime > endTime) {
                minTime = endTime
                maxTime = startTime
            } else {
                minTime = startTime
                maxTime = endTime
            }

            if (startPrice > endPrice) {
                minPrice = endPrice
                maxPrice = startPrice
            } else {
                minPrice = startPrice
                maxPrice = endPrice
            }

            this.addToChart(drawingManager, {
                type: DrawingType.PRICE_RANGE,
                startTime: minTime,
                startPrice: minPrice,
                endTime: maxTime,
                endPrice: maxPrice,
                fillColor: '#2962FF',
                fillOpacity: 0.15,
                arrowColor: '#2962FF',
            })

            htmlElement.onmousemove = null
            htmlElement.onmouseup = null
            this.removeChartListener()
        }

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
        let bitmapSize = {
            width: canvas.width,
            height: canvas.height,
        }

        let pointCopy = [...point]
        let { x, y } = this.getPoint(mouseEvent)

        let d1 = point[0].distanceSquare(x, y)
        let d2 = point[1].distanceSquare(x, y)
        let d3 = point[2].distanceSquare(x, y)
        let d4 = point[3].distanceSquare(x, y)

        let ctx = canvas.getContext('2d')!
        fillPolyon(ctx, point, drawingOption)

        htmlElement.onmousemove = (event) => {
            let { time, price } = this.getTimeAndPrice(event)
            let newPoint = new Point(time, price, chartReference)

            if (d1 < 25) {
                point[0] = newPoint
                point[1] = new Point(point[1].getTime(), price, chartReference)
                point[3] = new Point(time, point[3].getPrice(), chartReference)
            } else if (d2 < 25) {
                point[1] = newPoint
                point[0] = new Point(point[0].getTime(), price, chartReference)
                point[2] = new Point(time, point[2].getPrice(), chartReference)
            } else if (d3 < 25) {
                point[2] = newPoint
                point[3] = new Point(point[3].getTime(), price, chartReference)
                point[1] = new Point(time, point[1].getPrice(), chartReference)
            } else if (d4 < 25) {
                point[3] = newPoint
                point[2] = new Point(point[2].getTime(), price, chartReference)
                point[0] = new Point(time, point[0].getPrice(), chartReference)
            } else {
                const mouseX = event.clientX - canvas.getBoundingClientRect().left;
                const mouseY = event.clientY - canvas.getBoundingClientRect().top;

                let offsetX = x - mouseX
                let offsetY = y - mouseY

                let getParam = (point: Point) => {
                    return {
                        offset: true,
                        clientX: point.getX()! - offsetX,
                        clientY: point.getY()! - offsetY,
                    }
                }

                let { time: t1, price: p1 } = this.getTimeAndPrice(getParam(pointCopy[0]))
                point[0] = new Point(t1, p1, chartReference)

                let { time: t2, price: p2 } = this.getTimeAndPrice(getParam(pointCopy[1]))
                point[1] = new Point(t2, p2, chartReference)

                let { time: t3, price: p3 } = this.getTimeAndPrice(getParam(pointCopy[2]))
                point[2] = new Point(t3, p3, chartReference)

                let { time: t4, price: p4 } = this.getTimeAndPrice(getParam(pointCopy[3]))
                point[3] = new Point(t4, p4, chartReference)
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            fillPolyon(ctx, point, drawingOption)
        }

        htmlElement.onmouseup = (event) => {
            htmlElement.onmousemove = null
            htmlElement.onmouseup = null

            let bottomLeft = point.reduce((minPoint, p) => {
                if (p.getX()! < minPoint.getX()! || (p.getX() === minPoint.getX() && p.getY()! > minPoint.getY()!)) {
                    return p;
                }
                return minPoint;
            });

            let anticlockwisePoint: any = [bottomLeft, null, null, null];

            for (let i = 0; i < point.length; i++) {
                if (point[i].getX() !== bottomLeft.getX() || point[i].getY() !== bottomLeft.getY()) {
                    if (point[i].getX() === bottomLeft.getX()) {
                        anticlockwisePoint[3] = point[i];
                    } else if (point[i].getY()! < bottomLeft.getY()!) {
                        anticlockwisePoint[2] = point[i];
                    } else {
                        anticlockwisePoint[1] = point[i];
                    }
                }
            }

            point = anticlockwisePoint

            this.addToChart(drawingManager, {
                type: DrawingType.PRICE_RANGE,
                startTime: point[0].getTime(),
                startPrice: point[0].getPrice(),
                endTime: point[2].getTime(),
                endPrice: point[2].getPrice(),
                fillColor: '#2962FF',
                fillOpacity: 0.15,
                arrowColor: '#2962FF',
            })

            chartFrame.chartInteractionWrapperHtmlElement.style.display = 'none'
            chartFrame.getChart().enableScroll()
        }
    }
}

export { PriceRangeTool }