import { Drawing, Options } from "./drawing"
import { Point } from "./point"
import { DrawingManager } from "./drawing-manager"
import { drawCirulareHandle, fillPolyon, strokePolyon } from "../helper/canvas"
import { Tool } from "../tool/Tool"

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

    constructor(tool: Tool, options: RectangleOptions, drawingManager: DrawingManager) {
        super(tool, options, drawingManager, [])

        let chartReference = drawingManager.chartReference
        console.log(chartReference)
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
        // strokePolyon(ctx, this.point, {...this.options, 
        //     color: this.options.borderColor,
        //     opacity: this.options.borderOpacity,
        //     lineWidth: this.options.borderWidth,
        // })
        fillPolyon(ctx, this.point, {
            ...this.options,
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

        let hover = (xgeminx && xleminx && ygeminy && ylemaxy) ||
            (xgemaxx && xlemaxx && ygeminy && ylemaxy) ||
            (ygeminy && yleminy && xgeminx && xlemaxx) ||
            (ygemaxy && ylemaxy && xgeminx && xlemaxx)

        let d1 = this.point[0].distanceSquare(x, y)
        let d2 = this.point[1].distanceSquare(x, y)
        let d3 = this.point[2].distanceSquare(x, y)
        let d4 = this.point[3].distanceSquare(x, y)

        if (hover) {
            if (d1 < 25) {
                this.hoveredCursorStyle = 'nesw-resize'
            } else if (d2 < 25) {
                this.hoveredCursorStyle = 'nwse-resize'
            } else if (d3 < 25) {
                this.hoveredCursorStyle = 'nesw-resize'
            } else if (d4 < 25) {
                this.hoveredCursorStyle = 'nwse-resize'
            } else {
                this.hoveredCursorStyle = 'default'
            }
        } else {
            this.hoveredCursorStyle = 'default'
        }

        return hover
    }

    public override editPoint(): void {
        console.log('ss')
    }
}

export { RectangleOptions, Rectangle }