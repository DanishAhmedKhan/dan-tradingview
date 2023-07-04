import { drawVerticalHandle, drawVerticalLine } from "../helper/canvas"
import { Drawing, Options } from "./drawing"
import { DrawingManager } from "./drawing-manager"
import { Point } from "./point"

type VeriticalLineOptions = Options & {
    time: number,
    color: string,
    lineWidth: number,
}

class VerticalLine extends Drawing<VeriticalLineOptions> {
    public hoveredCursorStyle: string = 'pointer'

    constructor(options: VeriticalLineOptions, drawingManager: DrawingManager) {
        super(options, drawingManager, [])
        this.point = [
            new Point(this.options.time, null, drawingManager.chartReference),
        ]
    }

    public update(): void {
        this.updatePoint()
    }

    public override isInView(bitmapSize: any): boolean {
        let x = this.point[0].getX()!
        return x > 0 && x < bitmapSize.width
    }

    public paint(ctx: any, bitmapSize: any) {
        drawVerticalLine(ctx, this.point[0], this.options, bitmapSize)
    }

    public override paintHover(ctx: any, bitmapSize: any) {
        drawVerticalHandle(ctx, this.point[0], this.hoverOption, bitmapSize)
    }

    public override isHover(x: number, y: number): any {
		const xPosition = this.point[0].getX()!
        const lineWidth = this.options.lineWidth
        const hitTestThreshold = lineWidth / 2 + 7

		return x >= xPosition - hitTestThreshold && 
            x <= xPosition + hitTestThreshold
    }
}

export { VeriticalLineOptions, VerticalLine }