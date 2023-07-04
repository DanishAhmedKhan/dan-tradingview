import { Drawing, Options } from "./drawing"
import { SimplePoint, Point } from "./point"
import { Color, hexToRgba } from "../helper/color"
import { DrawingManager } from "./drawing-manager"
import { svg } from "../helper/svg"

type RectangleOptions = Options & {
    startPrice: number,
    endPrice: number,
    startTime: number,
    endTime: number,
    fillColor: string,
    fillOpacity: number,
}

class Rectangle extends Drawing<RectangleOptions> {
    private color: string

    public hoveredCursorStyle: string = 'pointer'

    constructor(options: RectangleOptions, drawingManager: DrawingManager) {
        super(options, drawingManager, [])

        let chartReference = drawingManager.chartReference
        this.point = [
            new Point(options.startTime, options.startPrice, chartReference),
            new Point(options.endTime, options.startPrice, chartReference),     
            new Point(options.endTime, options.endPrice, chartReference),
            new Point(options.startTime, options.endPrice, chartReference),
        ]
        this.color = hexToRgba(this.options.fillColor, this.options.fillOpacity)
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
        ctx.beginPath()
        ctx.moveTo(this.point[0].getX(), this.point[0].getY())
        for (let i = 1; i < this.point.length; ++i) {
			ctx.lineTo(this.point[i].getX(), this.point[i].getY())
		}

		ctx.fillStyle = this.color
		ctx.fill()
    }

    public override paintHover(ctx: any, bitmapSize: any) {
        for (let i = 0; i < this.point.length; ++i) {
            let { x, y } = this.point[i].get()
            ctx.beginPath()
            ctx.arc(x, y, 6, 0, 2 * Math.PI, false)
            ctx.stroke()
            ctx.fillStyle = Color.WHITE
            ctx.arc(x, y, 6, 0, 2 * Math.PI, false)
            ctx.fill()
		}
    }

    public override isHover(x: number, y: number): boolean {
		// const yPosition = this.point.getY()!
        // let lineWidth = 1
        
        // const HitTestThreshold = 7

		// return y >= yPosition - lineWidth - HitTestThreshold && 
        //     y <= yPosition + lineWidth + HitTestThreshold

        return true
    }
}

export { RectangleOptions, Rectangle }