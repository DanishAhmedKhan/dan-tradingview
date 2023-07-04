import { svg } from "../helper/svg"
import { Drawing, Options } from "./drawing"
import { DrawingManager } from "./drawing-manager"
import { Point } from "./point"

type HorizontalLineOptions = Options & {
    price: number,
    color: string,
    lineWidth: number,
}

class HorizontalLine extends Drawing<HorizontalLineOptions> {
    private point: Point

    public hoveredCursorStyle: string = 'pointer'

    constructor(options: HorizontalLineOptions, drawingManager: DrawingManager) {
        super(options, drawingManager, [])
        this.point = new Point(null, this.options.price, drawingManager.chartReference)
    }

    public override update(): void {
        this.point.update()
    }

    public override isInView(bitmapSize: any): boolean {
        let y = this.point.getY()!
        return y > 0 && y < bitmapSize.height
    }

    public override paint(ctx: any, bitmapSize: any) {
        let yPosition = this.point.getY()!

		ctx.strokeStyle = this.options.color
        ctx.lineWidth = this.options.lineWidth
        ctx.beginPath()
        ctx.moveTo(0, yPosition)
		ctx.lineTo(bitmapSize.width, yPosition)
		ctx.stroke()
    }

    public override paintHover(ctx: any, bitmapSize: any) {
       let yPosition = this.point.getY()!

        ctx.fillStyle = this.options.color
		ctx.roundRect(bitmapSize.width / 2 - 5, yPosition - 5, 10, 10)
        ctx.stroke()
        ctx.fillStyle = 'rgba(255, 255, 255)'
        ctx.roundRect(bitmapSize.width / 2 - 5, yPosition - 5, 10, 10)
        ctx.fill()
    }

    public override isHover(x: number, y: number): any {
		const yPosition = this.point.getY()!
        let lineWidth = 1
        
        const HitTestThreshold = 7

		return y >= yPosition - lineWidth - HitTestThreshold && 
            y <= yPosition + lineWidth + HitTestThreshold
    }
}

export { HorizontalLineOptions, HorizontalLine }