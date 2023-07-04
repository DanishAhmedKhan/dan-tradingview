import { svg } from "../helper/svg"
import { Drawing, Options } from "./drawing"
import { DrawingManager } from "./drawing-manager"
import { Point } from "./point"

type TrendLineOptions = Options & {
    startPrice: number,
    startTime: number,
    endPrice: number,
    endTime: number,
    color: string,
    lineWidth: number,
}

class TerendLine extends Drawing<TrendLineOptions> {
    private startPoint: Point
    private endPoint: Point

    public hoveredCursorStyle: string = 'pointer'

    constructor(options: TrendLineOptions, drawingManager: DrawingManager) {
        super(options, drawingManager, [])
        this.startPoint =  new Point(options.startTime, options.startPrice, drawingManager.chartReference)
        this.endPoint = new Point(options.endTime, options.endPrice, drawingManager.chartReference)
    }

    public update(): void {
        this.startPoint.update()
        this.endPoint.update()
    }

    public override isInView(bitmapSize: any): boolean {
        let minX, maxX, minY, maxY;

        let x1 = this.startPoint.getX()!
        let y1 = this.startPoint.getY()!
        let x2 = this.endPoint.getX()!
        let y2 = this.endPoint.getY()!

        if (x1 < x2) {
            minX = x1
            maxX = x2
        } else {
            minX = x2
            maxX = x1
        }

        if (y1 < y2) {
            minY = y1
            maxY = y2
        } else {
            minY = y2
            maxY = y1
        }

        return maxX > 0 && minX < bitmapSize.width &&
            maxY > 0 && minY < bitmapSize.height
    }

    public paint(ctx: any, bitmapSize: any): void {
        let { x: x1, y: y1 } = this.startPoint.get()
        let { x: x2, y: y2 } = this.endPoint.get()

		ctx.fillStyle = this.options.color
        ctx.lineWidth = this.options.lineWidth
        ctx.beginPath()
        ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
		ctx.stroke()
    }

    public override paintHover(ctx: any, bitmapSize: any) {
        let { x: x1, y: y1 } = this.startPoint.get()
        let { x: x2, y: y2 } = this.endPoint.get()

        ctx.beginPath()
        ctx.arc(x1, y1, 6, 0, 2 * Math.PI, false)
        ctx.stroke()
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.arc(x1, y1, 6, 0, 2 * Math.PI, false)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x2, y2, 6, 0, 2 * Math.PI, false)
        ctx.stroke()
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.arc(x2, y2, 6, 0, 2 * Math.PI, false)
        ctx.fill()
    }

    public override isHover(x: number, y: number): any {
		return false
    }
}

export { TrendLineOptions, TerendLine }