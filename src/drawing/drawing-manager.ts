import { VerticalLine } from "./vertical-line"
import { Rectangle } from "./rectangle"
import { Drawable } from "./drawable"
import { DrawingType } from "./drawing-type"
import { TerendLine } from "./trend-line"
import { HorizontalLine } from "./horizontal-line"

class DrawingManager {
    public chartReference: any | null = null
    private drawings: Array<Drawable> = []

    public add(options: any): Drawable {
        let drawing: Drawable

        switch (options.type) {
            case DrawingType.RECTANGLE: 
                drawing = new Rectangle(options, this)
                break
            case DrawingType.HORIZONTAL_LINE:
                drawing = new HorizontalLine(options, this)
                break
            case DrawingType.VERTICAL_LINE: 
                drawing = new VerticalLine(options, this)
                break
            case DrawingType.TREND_LINE:
                drawing = new TerendLine(options, this)
                break
            default:
                throw Error('options must have a type property')
        }

        this.drawings.push(drawing)
        this.chartReference.requestUpdate()
        return drawing
    }

    public remove(drawing: Drawable): void {
        const index = this.drawings.indexOf(drawing)
		if (index !== -1) {
            this.drawings[index].remove()
			this.drawings.splice(index, 1)
            this.chartReference.requestUpdate()
		}
    }

    public updateAllViews(): void {
        for (const drawing of this.drawings) {
            drawing.update()
        }
    }

    public paneViews() {
        let paneViews = []

        const drawingViews = this.drawings
            .map(drawing => drawing.getPaneView())
        paneViews.push(...drawingViews)

        return paneViews
    }

    public hitTest(x: number, y: number): any {
        // console.log(x, y)
    }

    public attached(chartReference: any): void {
        this.chartReference = chartReference
    }
}

export { DrawingManager }