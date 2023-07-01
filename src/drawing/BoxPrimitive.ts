import { hexToRgba } from "../helper/color"

class Point {
    private time: number | null
    private price: number | null

    private x: number | null = null
    private y: number | null = null

    private readonly chartRefenrence: any

    constructor(time: number | null, price: number | null, chartRefenrence: any) {
        this.time = time
        this.price = price

        if (time !== null)
            this.x = Point.xCoord(time, chartRefenrence) as number
        if (price !== null)
            this.y = Point.yCoord(price, chartRefenrence) as number

        this.chartRefenrence = chartRefenrence
    }

    public getX(): number | null {
        return this.x
    }

    public getY(): number | null {
        return this.y
    }

    public get(): { x: number | null, y: number | null } {
        return {
            x: this.x,
            y: this.y
        }
    }

    public update() {
        if (this.time !== null)
            this.x = Point.xCoord(this.time, this.chartRefenrence) as number
        if (this.price !== null)
            this.y = Point.yCoord(this.price, this.chartRefenrence) as number
    }

    public static xCoord(time: number, chartReference: any): number | null {
        return chartReference.chart.timeScale().timeToCoordinate(time)
    }

    public static yCoord(price: number, chartReference: any): number | null {
        return chartReference.series.priceToCoordinate(price)
	}
}

abstract class DrawingRenderer<RendererDataType> {
    protected data: RendererDataType | null = null

    public setData(data: RendererDataType): void {
        this.data = data
    }

    public abstract draw(target: any): void 
}

abstract class DrawingPaneView<RendererDataType> {
    protected abstract drawingRenderer: DrawingRenderer<RendererDataType>

    public renderer(): DrawingRenderer<RendererDataType> | null {
        return this.drawingRenderer
    }    
}

abstract class Drawing<RendererDataType> {
    protected options: RendererDataType
    // protected abstract readonly paneView: DrawingPaneView<RendererDataType>
    // protected abstract readonly drawingRenderer: DrawingRenderer<RendererDataType>

    constructor(options: RendererDataType) {
        this.options = options
    }

    public getOptions(): RendererDataType {
        return this.options
    }

    public setOptions(options: RendererDataType): void {
        this.options = options
    }

    // public getPaneView(): DrawingPaneView<RendererDataType> {
    //     return this.paneView
    // }

    public getPaneView() {
        const renderer = {
            draw: (target: any) => {
                this.paint(target)
            }
        }
        const paneView = () => {
            return renderer
        }
        return { renderer: paneView }
    }

    public abstract update(): void

    public abstract paint(target: any): void 
}

class Box {
    private corners: Array<Point>
    private options: BoxRendererData

    private readonly boxPaneView: BoxPaneView

    constructor(options: any, chartReference: any) {
        this.options = options
        this.boxPaneView = new BoxPaneView(this)

        this.corners = [
            new Point(options.startTime, options.startPrice, chartReference),
            new Point(options.endTime, options.startPrice, chartReference),     
            new Point(options.endTime, options.endPrice, chartReference),
            new Point(options.startTime, options.endPrice, chartReference),
        ]
        console.log('corners', this.corners)

        this.options.corners = this.corners
    }

    public getCorners(): Array<Point> {
        return this.corners
    }

    public setCorners(corners: Array<Point>): void {
        this.corners = corners
    }

    public getOptions(): BoxRendererData {
        return this.options
    }

    public paneView() {
        return this.boxPaneView
    }

    // public update() {
    //     this.boxPaneView.update()
    // }
}

type VeriticalLineRendererData = {
    time: number,
    color: string,
    visible?: boolean,
    point?: Point
}

class VerticalLine extends Drawing<VeriticalLineRendererData> {
    // protected drawingRenderer: DrawingRenderer<VeriticalLineRendererData>

    constructor(options: VeriticalLineRendererData, chartReference: any) {
        super(options)
        // this.drawingRenderer = new VerticalLineRenderer()
        // this.drawingRenderer.setData(options)

        this.options.point = new Point(this.options.time, null, chartReference)
        // console.log(this.options)
    }

    public update(): void {
        this.options.point?.update()
        // console.log(this.options)
    }

    public paint(target: any) {
        // console.log('drawing',target, this.options)

        if (!this.options) return
        if (this.options.visible === false) return

        let ctx = target._context
        let bitmapSize = target._bitmapSize
        
        let x = this.options.point?.getX()!

        if (x < 0 || x > bitmapSize.width) return

        ctx.beginPath()
        ctx.moveTo(x, 0)
		ctx.lineTo(x, bitmapSize.height)

		ctx.fillStyle = this.options.color
		ctx.stroke()
    }
}

class VertivalLinePaneView extends DrawingPaneView<VeriticalLineRendererData> {
    public drawingRenderer: VerticalLineRenderer    

    constructor(verticalLine: VerticalLine) {
        super()
        this.drawingRenderer = new VerticalLineRenderer()
        this.drawingRenderer.setData(verticalLine.getOptions())
    }
}

class VerticalLineRenderer extends DrawingRenderer<VeriticalLineRendererData> {
    public draw(target: any) {

        if (this.data === null) return
        if (this.data.visible === false) return

        let ctx = target._context
        let bitmapSize = target._bitmapSize
        
        let x = this.data.point?.getX()!

        if (x < 0 || x > bitmapSize.width) return

        ctx.beginPath()
        ctx.moveTo(x, 0)
		ctx.lineTo(x, bitmapSize.height)

		ctx.fillStyle = this.data.color
		ctx.stroke()
    }
}

type BoxRendererData = {
    corners: Array<Point>
    fillColor: string,
    fillOpacity: number,
    visible?: boolean,
}

class BoxRenderer {
    private data: BoxRendererData | null = null

    public setData(data: BoxRendererData): void {
        this.data = data
    }

    public draw(target: any): void {
        if (this.data === null) return
        if (this.data.visible === false) return

        let corners: Array<{x: number, y: number}> = []
        let cnr = this.data.corners
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

        if (maxX < 0 || minX > bitmapSize.width || maxY < 0 || minY > bitmapSize.height) {
            return
        }

        let ctx = target._context
        ctx.moveTo(corners[corners.length - 1].x, corners[corners.length - 1].y)
        for (let i = 0; i < corners.length; ++i) {
			ctx.lineTo(corners[i].x, corners[i].y)
		}

		ctx.fillStyle = hexToRgba(this.data.fillColor, this.data.fillOpacity)
		ctx.fill()
    }
}

class BoxPaneView {
    private boxRenderer: BoxRenderer = new BoxRenderer()

    // private box: Box

    // private invalidated = false

    constructor(box: Box) {
        // this.box = box
        this.boxRenderer.setData(box.getOptions())
    }

    // public update(): void {
	// 	this.invalidated = true;
	// }

    public renderer(): BoxRenderer | null {
        // if (this.invalidated) {
        //     this.updateImpl();
        //     this.invalidated = false
        // }

        return this.boxRenderer
    }

    // public updateImpl(): void {
    //     let corners = this.box.getCorners()

    //     corners.forEach(point => {
    //         point.update()
    //     })
    // }
}

class BoxPrimitive {

    private chartReference: any | null = null
    private boxes: Array<Box> = []
    private verticalLines: Array<VerticalLine> = []

    public addBox(options: object): Box {
        let box = new Box(options, this.chartReference)
        this.boxes.push(box)
        return box
    }

    public removeBox(box: Box): void {
        const index = this.boxes.indexOf(box);
		if (index !== -1) {
			this.boxes.splice(index, 1)
		}
    }

    public addVerticalLine(options: VeriticalLineRendererData) {
        let verticalLine = new VerticalLine(options, this.chartReference)
        this.verticalLines.push(verticalLine)
        return verticalLine
    }

    public updateAllViews(): void {
        // for (const box of this.boxes) {
		// 	box.update();
		// }
        for (const box of this.boxes) {
			let corners = box.getCorners()

            corners.forEach(point => {
                point.update()
            })
		}

        for (const verticalLine of this.verticalLines) {
			verticalLine.update()
		}
    }

    public paneViews() {
        let paneViews = []
        
        const boxViews = this.boxes.map((box: Box) => box.paneView())
		paneViews.push(...boxViews)

         const verticalLineViews = this.verticalLines
            .map((verticalLine: VerticalLine) => verticalLine.getPaneView())
		paneViews.push(...verticalLineViews)

        return paneViews
    }

    public attached(chartReference: any): void {
        this.chartReference = chartReference
    }
}

export { BoxPaneView, BoxPrimitive }