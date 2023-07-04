import { Color } from "../helper/color"
import { svg } from "../helper/svg"
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
        let xPosition = this.point[0].getX()!

		ctx.strokeStyle = this.options.color
        ctx.lineWidth = this.options.lineWidth
        ctx.beginPath()
        ctx.moveTo(xPosition, 0)
		ctx.lineTo(xPosition, bitmapSize.height)
		ctx.stroke()
    }

    public override paintHover(ctx: any, bitmapSize: any) {
       let xPosition = this.point[0].getX()!

        ctx.fillStyle = this.options.color
		ctx.roundRect(xPosition - 5, bitmapSize.height / 2 - 5, 10, 10)
        ctx.stroke()
        ctx.fillStyle = Color.WHITE
        ctx.roundRect(xPosition - 5, bitmapSize.height / 2 - 5, 10, 10)
        ctx.fill()
    }

    public override isHover(x: number, y: number): any {
		const xPosition = this.point[0].getX()!
        let lineWidth = 1
        const hitTestThreshold = 7

		return x >= xPosition - lineWidth - hitTestThreshold && 
            x <= xPosition + lineWidth + hitTestThreshold
    }
}

export { VeriticalLineOptions, VerticalLine }