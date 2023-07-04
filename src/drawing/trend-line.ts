import { Color } from "../helper/color"
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
    public hoveredCursorStyle: string = 'pointer'

    constructor(options: TrendLineOptions, drawingManager: DrawingManager) {
        super(options, drawingManager, [])
        this.point = [
            new Point(options.startTime, options.startPrice, drawingManager.chartReference),
            new Point(options.endTime, options.endPrice, drawingManager.chartReference)
        ]
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
        let { x: x1, y: y1 } = this.point[0].get()
        let { x: x2, y: y2 } = this.point[1].get()

		ctx.fillStyle = this.options.color
        ctx.lineWidth = this.options.lineWidth
        ctx.beginPath()
        ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
		ctx.stroke()
    }

    public override paintHover(ctx: any, bitmapSize: any) {
        let { x: x1, y: y1 } = this.point[0].get()
        let { x: x2, y: y2 } = this.point[1].get()

        ctx.beginPath()
        ctx.arc(x1, y1, 6, 0, 2 * Math.PI, false)
        ctx.stroke()
        ctx.fillStyle = Color.WHITE
        ctx.arc(x1, y1, 6, 0, 2 * Math.PI, false)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x2, y2, 6, 0, 2 * Math.PI, false)
        ctx.stroke()
        ctx.fillStyle = Color.WHITE
        ctx.arc(x2, y2, 6, 0, 2 * Math.PI, false)
        ctx.fill()
    }

    public override isHover(x: number, y: number): any {
		return false
    }
}

export { TrendLineOptions, TerendLine }