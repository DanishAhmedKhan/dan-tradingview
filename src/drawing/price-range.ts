import { Drawing, Options } from "./drawing"
import { Point } from "./point"
import { DrawingManager } from "./drawing-manager"
import { drawCirularHandle, drawPriceRange, drawText } from "../helper/canvas"
import { Tool } from "../tool/Tool"

type PriceRangeeOptions = Options & {
    startPrice: number,
    endPrice: number,
    startTime: number,
    endTime: number,
    fillColor: string,
    fillOpacity: number,
    arrowColor: string,
}

class PriceRange extends Drawing<PriceRangeeOptions> {
    public hoveredCursorStyle: string = 'pointer'

    constructor(tool: Tool, options: PriceRangeeOptions, drawingManager: DrawingManager) {
        super(tool, options, drawingManager, [])

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
        drawPriceRange(ctx, this.point, this.options)

        let priceDiff = +(this.point[0].getPrice()! - this.point[2].getPrice()!).toFixed(5)
        let priceDiffPip = (priceDiff * 10000).toFixed(2)

        let pointX = (this.point[0].getX()! + this.point[1].getX()!) / 2 - 50
        let pointY = this.point[0].getY()! + 20

        let textOptions = {
            boxColor: '#fff',
            shadow: true,
            textSize: 11,
            textColor: '#000',
        }

        let text = `${priceDiff} (${priceDiffPip})`
        drawText(ctx, text, pointX, pointY, 100, 30, textOptions)
    }

    public override paintHover(ctx: any, bitmapSize: any) {
        drawCirularHandle(ctx, this.point[1], this.hoverOption)
        drawCirularHandle(ctx, this.point[3], this.hoverOption)
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

        let d1 = this.point[1].distanceSquare(x, y)
        let d2 = this.point[3].distanceSquare(x, y)

        if (hover) {
            if (d1 < 25) {
                this.hoveredCursorStyle = 'nwse-resize'
            } else if (d2 < 25) {
                this.hoveredCursorStyle = 'nwse-resize'
            }
        }

        return hover
    }
}

export { PriceRangeeOptions, PriceRange }