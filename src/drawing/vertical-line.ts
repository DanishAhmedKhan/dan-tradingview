import { svg } from "../helper/svg"
import { Drawing } from "./drawing"
import { DrawingManager } from "./drawing-manager"
import { Point } from "./point"

type VeriticalLineOptions = {
    time: number,
    color: string,
    visible?: boolean,
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

    public paint(target: any) {
        if (!this.options) return
        if (this.options.visible === false) return

        let bitmapSize = target._bitmapSize
        
        let x = this.point.getX()!

        if (x < 0 || x > bitmapSize.width) return

        let ctx = target._context
        ctx.beginPath()
        ctx.moveTo(x, 0)
		ctx.lineTo(x, bitmapSize.height)

		ctx.fillStyle = this.options.color
		ctx.stroke()
    }
}

export { VeriticalLineOptions, VerticalLine }