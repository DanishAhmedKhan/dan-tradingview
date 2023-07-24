import { drawCirulareHandle, drawLine } from "../helper/canvas"
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
        drawCirulareHandle(ctx, this.point[0], this.hoverOption)
        drawCirulareHandle(ctx, this.point[1], this.hoverOption)

    }

    public override isHover(x: number, y: number): any {

        return this.point[0].distanceSquare(x, y) < 5 * 5 ||
            this.point[1].distanceSquare(x, y) < 5 * 5
    }
}

export { TrendLineOptions, TerendLine }