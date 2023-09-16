import { Drawing, Options } from "./drawing"
import { Point } from "./point"
import { DrawingManager } from "./drawing-manager"
import { drawCirulareHandle, fillPolyon, strokePolyon } from "../helper/canvas"
import { Tool } from "../tool/Tool"

type LongPositionOptions = Options & {
    time: number,
    price: number,
}

class LongPosition extends Drawing<LongPositionOptions> {
    public hoveredCursorStyle: string = 'pointer'

    constructor(tool: Tool, options: LongPositionOptions, drawingManager: DrawingManager) {
        super(tool, options, drawingManager, [])

        let chartReference = drawingManager.chartReference
        this.point = [
            new Point(options.time, options.price, chartReference),
            new Point(options.endTime, options.startPrice, chartReference),
            new Point(options.endTime, options.endPrice, chartReference),
            new Point(options.startTime, options.endPrice, chartReference),
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
    }

    public override paintHover(ctx: any, bitmapSize: any) {
        for (let i = 0; i < this.point.length; ++i) {
            drawCirulareHandle(ctx, this.point[i], this.hoverOption)
        }
    }

    public override isHover(x: number, y: number): boolean {
        let hover = true

        return hover
    }

    public override editPoint(): void {
        console.log('ss')
    }
}

export { LongPositionOptions, LongPosition }