import { drawCirularHandle, drawLine } from "../helper/canvas"
import { Tool } from "../tool/Tool"
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

    constructor(tool: Tool, options: TrendLineOptions, drawingManager: DrawingManager) {
        super(tool, options, drawingManager, [])
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
        drawLine(ctx, this.point[0], this.point[1], this.options)
    }

    public override paintHover(ctx: any, bitmapSize: any) {
        drawCirularHandle(ctx, this.point[0], this.hoverOption)
        drawCirularHandle(ctx, this.point[1], this.hoverOption)

    }

    public override isHover(x: number, y: number): any {
        let x1 = this.point[0].getX()!
        let y1 = this.point[0].getY()!
        let x2 = this.point[1].getX()!
        let y2 = this.point[1].getY()!

        const threshold = 5
        const dx = x2 - x1
        const dy = y2 - y1

        const lineLengthSquared = dx * dx + dy * dy

        if (lineLengthSquared === 0) {
            const distanceSquared = (x - x1) ** 2 + (y - y1) ** 2
            return distanceSquared <= threshold ** 2
        }

        const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / lineLengthSquared))

        const closestX = x1 + t * dx
        const closestY = y1 + t * dy

        const distanceSquared = (x - closestX) ** 2 + (y - closestY) ** 2
        return distanceSquared <= threshold ** 2
    }
}

export { TrendLineOptions, TerendLine }