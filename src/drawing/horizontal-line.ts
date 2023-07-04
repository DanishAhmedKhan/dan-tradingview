import { drawHorizontalHandle, drawHorizontalLine } from "../helper/canvas"
import { svg } from "../helper/svg"
import { Drawing, Options } from "./drawing"
import { DrawingManager } from "./drawing-manager"
import { Point } from "./point"

type HorizontalLineOptions = Options & {
    price: number,
    color: string,
    opacity: number, 
    lineWidth: number,
}

class HorizontalLine extends Drawing<HorizontalLineOptions> {
    public hoveredCursorStyle: string = 'pointer'

    constructor(options: HorizontalLineOptions, drawingManager: DrawingManager) {
        super(options, drawingManager, [])
        this.point = [
            new Point(null, this.options.price, drawingManager.chartReference),
        ]
    }

    public override update(): void {
        this.updatePoint()
    }

    public override isInView(bitmapSize: any): boolean {
        let y = this.point[0].getY()!
        return y > 0 && y < bitmapSize.height
    }

    public override paint(ctx: any, bitmapSize: any) {
        drawHorizontalLine(ctx, this.point[0], this.options, bitmapSize)
    }

    public override paintHover(ctx: any, bitmapSize: any) {
       drawHorizontalHandle(ctx, this.point[0], this.hoverOption, bitmapSize)
    }

    public override isHover(x: number, y: number): any {
		const yPosition = this.point[0].getY()!
        const lineWidth = this.options.lineWidth ?? 1
        const hitTestThreshold = lineWidth / 2 + 7

		return y >= yPosition - hitTestThreshold && 
            y <= yPosition + hitTestThreshold
    }
}

export { HorizontalLineOptions, HorizontalLine }