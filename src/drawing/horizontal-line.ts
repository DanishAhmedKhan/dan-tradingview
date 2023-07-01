import { svg } from "../helper/svg"
import { Drawing } from "./drawing"
import { DrawingManager } from "./drawing-manager"
import { Point } from "./point"

type HorizontalLineOptions = {
    price: number,
    color: string,
    visible?: boolean,
}

class HorizontalLine extends Drawing<HorizontalLineOptions> {
    private point: Point

    constructor(options: HorizontalLineOptions, drawingManager: DrawingManager) {
        super(options)
        this.point = new Point(null, this.options.price, drawingManager.chartReference)
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
        
        let y = this.point.getY()!

        if (y < 0 || y > bitmapSize.height) return

        let ctx = target._context
        ctx.beginPath()
        ctx.moveTo(0, y)
		ctx.lineTo(bitmapSize.width, y)

		ctx.fillStyle = this.options.color
		ctx.stroke()
    }
}

export { HorizontalLineOptions, HorizontalLine }