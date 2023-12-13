import { Tool, ToolParam } from "./Tool"
import { svg } from '../helper/svg'
import { DrawingType } from "../drawing/drawing-type"
import { DrawingManager } from "../drawing/drawing-manager"
import { ChartFrame } from '../ChartFrame'
import { Point } from "../drawing/point"
import { drawLongPosition } from "../helper/canvas"

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
                stopColor: '#F23645',
                stopOpacity: 0.2,
                targetColor: '#089981',
                targetOpacity: 0.2,
                lineColor: '#444',
            })

            this.removeChartListener()
        }
    }

    public editTool(chartFrame: ChartFrame, drawingManager: DrawingManager, point: Array<Point>, drawingOption: any, mouseEvent: any): void {
        let htmlElement = chartFrame.chartInteractionWrapperHtmlElement
        let chartReference = drawingManager.chartReference

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
        let d4 = point[4].distanceSquare(x, y)

        let ctx = canvas.getContext('2d')!
        drawLongPosition(ctx, point, drawingOption)

        htmlElement.onmousemove = (event) => {
            let { time, price } = this.getTimeAndPrice(event)
            let newPoint = new Point(time, price, chartReference)

            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;

            if (d1 < 25) {
                let pointY = mouseY;

                if (mouseY < point[2].getY()!) pointY = point[2].getY()! + 1
                else if (mouseY > point[4].getY()!) pointY = point[4].getY()! - 1

                point[0] = new Point(mouseX, pointY, chartReference, true)
                point[1] = new Point(point[1].getX(), pointY, chartReference, true)
                point[2] = new Point(mouseX, point[2].getY(), chartReference, true)
                point[4] = new Point(mouseX, point[4].getY(), chartReference, true)
            } else if (d2 < 25) {
                point[1] = new Point(mouseX, point[1].getY(), chartReference, true)
                point[3] = new Point(mouseX, point[3].getY(), chartReference, true)
                point[5] = new Point(mouseX, point[5].getY(), chartReference, true)
            } else if (d3 < 25) {
                let pointY = mouseY;
                if (mouseY >= point[0].getY()!) pointY = point[0].getY()!

                point[2] = new Point(point[2].getX(), pointY, chartReference, true)
                point[3] = new Point(point[3].getX(), pointY, chartReference, true)
            } else if (d4 < 25) {
                let pointY = mouseY;
                if (mouseY <= point[0].getY()!) pointY = point[0].getY()!

                point[4] = new Point(point[4].getX(), pointY, chartReference, true)
                point[5] = new Point(point[5].getX(), pointY, chartReference, true)
            } else {
                let offsetX = x - mouseX
                let offsetY = y - mouseY

                pointCopy.forEach((p, index) => {
                    let { time, price } = this.getTimeAndPrice({
                        offset: true,
                        clientX: p.getX()! - offsetX,
                        clientY: p.getY()! - offsetY,
                    })

                    point[index] = new Point(time, price, chartReference, false)
                })
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawLongPosition(ctx, point, drawingOption)
        }

        htmlElement.onmouseup = (event) => {
            htmlElement.onmousemove = null
            htmlElement.onmouseup = null

            let pointObj: any = []
            point.forEach(p => {
                pointObj.push({
                    time: p.getTime(),
                    price: p.getPrice(),
                })
            })

            this.addToChart(drawingManager, {
                type: DrawingType.LONG_POSITION,
                point: pointObj,
                stopColor: '#F23645',
                stopOpacity: 0.2,
                targetColor: '#089981',
                targetOpacity: 0.2,
                lineColor: '#444',
            })

            chartFrame.chartInteractionWrapperHtmlElement.style.display = 'none'
            chartFrame.getChart().enableScroll()
        }
    }
}

export { LongPositionTool }