import { Drawing, Options } from "./drawing"
import { SimplePoint, Point } from "./point"
import { Color, hexToRgba } from "../helper/color"
import { DrawingManager } from "./drawing-manager"
import { svg } from "../helper/svg"
import { drawCirulareHandle, fillPolyon, strokePolyon } from "../helper/canvas"

type RectangleOptions = Options & {
    startPrice: number,
    endPrice: number,
    startTime: number,
    endTime: number,
    fillColor: string,
    fillOpacity: number,
    borderColor: string,
    borderOpacity: number,
    borderWidth: number,
}

class Rectangle extends Drawing<RectangleOptions> {
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
        strokePolyon(ctx, this.point, {...this.options, 
            color: this.options.borderColor,
            opacity: this.options.borderOpacity,
            lineWidth: this.options.borderWidth,
        })
        fillPolyon(ctx, this.point, {...this.options, 
            color: this.options.fillColor,
            opacity: this.options.fillOpacity,
        })
    }

    public override paintHover(ctx: any, bitmapSize: any) {
        for (let i = 0; i < this.point.length; ++i) {
            drawCirulareHandle(ctx, this.point[i], this.hoverOption)
		}
    }

    public override isHover(x: number, y: number): boolean {
        let lineWidth = 1
        const hitTestThreshold = lineWidth / 2 + 7

        let xgeminx = x >= this.minX - hitTestThreshold
        let xleminx = x <= this.minX + hitTestThreshold
        let xgemaxx = x >= this.maxX - hitTestThreshold
        let xlemaxx = x <= this.maxX + hitTestThreshold

        let ygeminy = y >= this.minY - hitTestThreshold
        let yleminy = y <= this.minY + hitTestThreshold
        let ygemaxy = y >= this.maxY - hitTestThreshold
        let ylemaxy = y <= this.maxY + hitTestThreshold

        return (xgeminx && xleminx && ygeminy && ylemaxy) || 
            (xgemaxx && xlemaxx && ygeminy && ylemaxy) || 
            (ygeminy && yleminy && xgeminx && xlemaxx) || 
            (ygemaxy && ylemaxy && xgeminx && xlemaxx)
    }
}

export { RectangleOptions, Rectangle }