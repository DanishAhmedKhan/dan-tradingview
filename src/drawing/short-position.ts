import { Drawing, Options } from "./drawing"
import { Point } from "./point"
import { DrawingManager } from "./drawing-manager"
import { drawBoxHandle, drawCirularHandle, drawShortPosition } from "../helper/canvas"
import { Tool } from "../tool/Tool"

type ShortPositionOptions = Options & {
    x: number,
    y: number,
    time: number,
    price: number,
    point: any,
    stopColor: string,
    stopOpacity: number,
    targetColor: string,
    targetOpacity: number,
    lineColor: string,
}

class ShortPosition extends Drawing<ShortPositionOptions> {
    public hoveredCursorStyle: string = 'pointer'

    constructor(tool: Tool, options: ShortPositionOptions, drawingManager: DrawingManager) {
        super(tool, options, drawingManager, [])

        let chartReference = drawingManager.chartReference

        if (options.point) {
            options.point.forEach((p: { time: number | null; price: number | null }) => {
                this.point.push(new Point(p.time, p.price, chartReference, false))
            })
        } else {
            let point = new Point(options.time, options.price, chartReference, false)
            let x = point.getX()!
            let y = point.getY()!

            this.point = [
                point,
                new Point(x + 200, y, chartReference, true),
                new Point(x, y - 100, chartReference, true),
                new Point(x + 200, y - 100, chartReference, true),
                new Point(x, y + 200, chartReference, true),
                new Point(x + 200, y + 200, chartReference, true),
            ]
        }
    }

    public update(): void {
        this.updatePoint()
    }

    public override isInView(bitmapSize: any): boolean {
        this.updateMinMaxPoint()

        return this.maxX > 0 && this.minX < bitmapSize.width &&
            this.maxY > 0 && this.minY < bitmapSize.height
    }

    public paint(ctx: any, bitmapSize: any): void {
        drawShortPosition(ctx, this.point, this.options)
    }

    public override paintHover(ctx: any, bitmapSize: any) {
        drawCirularHandle(ctx, this.point[0], this.hoverOption)
        drawBoxHandle(ctx, this.point[1], this.hoverOption)
        drawBoxHandle(ctx, this.point[2], this.hoverOption)
        drawBoxHandle(ctx, this.point[4], this.hoverOption)
    }

    public override isHover(x: number, y: number): boolean {
        let d1 = this.point[0].distanceSquare(x, y)
        let d2 = this.point[1].distanceSquare(x, y)
        let d3 = this.point[2].distanceSquare(x, y)
        let d4 = this.point[4].distanceSquare(x, y)

        let hover = x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY ||
            d1 < 25 || d2 < 25 || d3 < 25 || d4 < 25

        if (hover) {
            if (d1 < 25) {
                this.hoveredCursorStyle = 'default'
            } else if (d2 < 25) {
                this.hoveredCursorStyle = 'e-resize'
            } else if (d3 < 25 || d4 < 25) {
                this.hoveredCursorStyle = 'n-resize'
            } else {
                this.hoveredCursorStyle = 'pointer'
            }
        }

        return hover
    }
}

export { ShortPositionOptions, ShortPosition }