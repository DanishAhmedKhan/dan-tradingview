import { Drawing } from "./drawing"
import { DrawingManager } from "./drawing-manager"
import { Point } from "./point"

type TrendLineOptions = {
    startPrice: number,
    startTime: number,
    endPrice: number,
    endTime: number,
    color: string,
    visible?: boolean,
}

class TerendLine extends Drawing<TrendLineOptions> {
    private startPoint: Point
    private endPoint: Point

    constructor(options: TrendLineOptions, drawingManager: DrawingManager) {
        super(options)
        this.startPoint =  new Point(options.startTime, options.startPrice, drawingManager.chartReference)
        this.endPoint = new Point(options.endTime, options.endPrice, drawingManager.chartReference)
    }

    public update(): void {
        this.startPoint.update()
        this.endPoint.update()
    }

    public paint(target: any): void {
        if (this.options === null) return
        if (this.options.visible === false) return

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

        let bitmapSize = target._bitmapSize

        if (maxX < 0 || minX > bitmapSize.width ||
            maxY < 0 || minY > bitmapSize.height) {
            return
        }

        let ctx = target._context
        ctx.beginPath()
        ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
		ctx.fillStyle = this.options.color
		ctx.stroke()
    }
}

export { TrendLineOptions, TerendLine }