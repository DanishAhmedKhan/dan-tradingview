import { Drawing } from "./drawing"
import { SimplePoint, Point } from "./point"
import { hexToRgba } from "../helper/color"
import { DrawingManager } from "./drawing-manager"

type RectangleOptions = {
    startPrice: number,
    endPrice: number,
    startTime: number,
    endTime: number,
    fillColor: string,
    fillOpacity: number,
    visible?: boolean,
}

class Rectangle extends Drawing<RectangleOptions> {
    private corners: Array<Point>

    constructor(options: RectangleOptions, drawingManager: DrawingManager) {
        super(options)

        let chartReference = drawingManager.chartReference
        this.corners = [
            new Point(options.startTime, options.startPrice, chartReference),
            new Point(options.endTime, options.startPrice, chartReference),     
            new Point(options.endTime, options.endPrice, chartReference),
            new Point(options.startTime, options.endPrice, chartReference),
        ]
    }

    public update(): void {
        this.corners.forEach(point => {
            point.update()
        })
    }

    public paint(target: any): void {
        if (this.options === null) return
        if (this.options.visible === false) return

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

        let bitmapSize = target._bitmapSize

        if (maxX < 0 || minX > bitmapSize.width ||
            maxY < 0 || minY > bitmapSize.height) {
            return
        }

        let ctx = target._context
        ctx.beginPath()
        ctx.moveTo(corners[corners.length - 1].x, corners[corners.length - 1].y)
        for (let i = 0; i < corners.length; ++i) {
			ctx.lineTo(corners[i].x, corners[i].y)
		}

		ctx.fillStyle = hexToRgba(this.options.fillColor, this.options.fillOpacity)
		ctx.fill()
    }
}

export { RectangleOptions, Rectangle }