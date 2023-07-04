import { Drawing, Options } from "./drawing"
import { SimplePoint, Point } from "./point"
import { hexToRgba } from "../helper/color"
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
    private corners: Array<Point>
    private color: string

    public hoveredCursorStyle: string = 'pointer'

    constructor(options: RectangleOptions, drawingManager: DrawingManager) {
        super(options, drawingManager, [])

        let chartReference = drawingManager.chartReference
        this.corners = [
            new Point(options.startTime, options.startPrice, chartReference),
            new Point(options.endTime, options.startPrice, chartReference),     
            new Point(options.endTime, options.endPrice, chartReference),
            new Point(options.startTime, options.endPrice, chartReference),
        ]
        this.color = hexToRgba(this.options.fillColor, this.options.fillOpacity)
    }

    public update(): void {
        this.corners.forEach(point => {
            point.update()
        })
    }

    public override isInView(bitmapSize: any): boolean {
          let corners: Array<SimplePoint> = []
        let cnr = this.corners
        let minX = cnr[0].getX() as number
        let maxX = cnr[0].getX() as number
        let minY = cnr[0].getY() as number
        let maxY = cnr[0].getY() as number

        for (let i = 0; i < cnr.length; i++) {
            let x = cnr[i].getX() as number
            let y = cnr[i].getY() as number

            corners[i] = { x, y }

            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
        }

        return maxX > 0 && minX < bitmapSize.width &&
            maxY > 0 && minY < bitmapSize.height
    }

    public paint(ctx: any, bitmapSize: any): void {
        ctx.beginPath()
        ctx.moveTo(this.corners[0].getX(), this.corners[0].getY())
        for (let i = 1; i < this.corners.length; ++i) {
			ctx.lineTo(this.corners[i].getX(), this.corners[i].getY())
		}

		ctx.fillStyle = this.color
		ctx.fill()
    }

    public override paintHover(ctx: any, bitmapSize: any) {
        for (let i = 0; i < this.corners.length; ++i) {
            let { x, y } = this.corners[i].get()
            ctx.beginPath()
            ctx.arc(x, y, 6, 0, 2 * Math.PI, false)
            ctx.stroke()
            ctx.fillStyle = 'rgb(255, 255, 255)'
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