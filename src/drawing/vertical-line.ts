import { svg } from "../helper/svg"
import { Drawing, Options } from "./drawing"
import { DrawingManager } from "./drawing-manager"
import { Point } from "./point"

type VeriticalLineOptions = Options & {
    time: number,
    color: string,
}

class VerticalLine extends Drawing<VeriticalLineOptions> {
    private point: Point

    constructor(options: VeriticalLineOptions, drawingManager: DrawingManager) {
        super(options)
        this.point = new Point(this.options.time, null, drawingManager.chartReference)
        this.toolbar.setWidget([
            {
                name: 'Delete',
                svg: svg.delete,
                callback: () => {
                    drawingManager.remove(this)
                }
            }
        ])
    }

    public update(): void {
        this.point.update()
    }

     public override isInView(bitmapSize: any): boolean {
        let x = this.point.getX()!
        return x > 0 && x < bitmapSize.width
    }

    public paint(ctx: any, bitmapSize: any) {
        let xPosition = this.point.getX()!

		ctx.fillStyle = this.options.color
        ctx.beginPath()
        ctx.moveTo(xPosition, 0)
		ctx.lineTo(xPosition, bitmapSize.height)
		ctx.stroke()
    }

    public override paintHover(ctx: any, bitmapSize: any) {
       let xPosition = this.point.getX()!

        ctx.fillStyle = this.options.color
		ctx.roundRect(xPosition - 5, bitmapSize.height / 2 - 5, 10, 10)
        ctx.stroke()
        ctx.fillStyle = 'rgba(255, 255, 255)'
        ctx.roundRect(xPosition - 5, bitmapSize.height / 2 - 5, 10, 10)
        ctx.fill()
    }

    public override isHover(x: number, y: number): any {
		const xPosition = this.point.getX()!
        let lineWidth = 1
        
        const HitTestThreshold = 7

		return x >= xPosition - lineWidth - HitTestThreshold && 
            x <= xPosition + lineWidth + HitTestThreshold
    }
}

export { VeriticalLineOptions, VerticalLine }