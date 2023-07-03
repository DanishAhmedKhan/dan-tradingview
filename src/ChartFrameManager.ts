import { ChartFrame } from "./ChartFrame"
import { Datafeed } from "./Datafeed"
import { DrawingManager } from "./drawing/drawing-manager"
import { ToolManager } from "./tool/ToolManager"

class ChartFrameManager {

    private chartFrame: Array<ChartFrame> = []
    private activeChartFrame: ChartFrame | null = null
    private frameCount = 0

    private chartMainHtmlElement: HTMLElement
    private datafeed: Datafeed
    private toolManager: ToolManager | null = null

    constructor(chartMainHtmlElement: HTMLElement, datafeed: Datafeed) {
        this.chartMainHtmlElement = chartMainHtmlElement
        this.datafeed = datafeed
    }

    public setToolManager(toolManager: ToolManager): void {
        this.toolManager = toolManager
    }

    public getAllChartFrame(): Array<ChartFrame> {
        return this.chartFrame
    }

    public getActiveChartFrame(): ChartFrame {
        return this.activeChartFrame!
    }

    public addChartFrame(): ChartFrame {
        let chartFrame = new ChartFrame(
            this.chartMainHtmlElement.querySelector(".chart_main_frames")! as HTMLElement,
            this.datafeed,
            this.frameCount++,
            this.toolManager!,
        )
        this.activeChartFrame = chartFrame
        this.chartFrame.push(chartFrame)
        chartFrame.displayChart()
        chartFrame.displayDrawing()
        // chartFrame.getChart().getCandleSeries().attachPrimitive(new DrawingManager())

        this.addActiveListener()
        return chartFrame
    }

    public getChartFrameAtIndex(index: number): ChartFrame {
        return this.chartFrame[index]
    }

    public addActiveListener(): void {
        let chartFrameHtmlElements = this.chartMainHtmlElement.querySelectorAll('.chart_frame_wrapper')!
        
        chartFrameHtmlElements.forEach(chartFrameHtmlElement => {
            chartFrameHtmlElement.addEventListener('click', e => {
                let frameIndex = Number(chartFrameHtmlElement.getAttribute('data-frame-index'))
                this.activeChartFrame = this.chartFrame[frameIndex]
            })
        })
    }

    public activateAllFrameInteraction(): void {
        this.chartFrame.forEach(chartFrame => {
            chartFrame.chartInteractionWrapperHtmlElement.style.display = 'block'
        })
    }

    public deactivateAllFrameInteraction(): void {
        this.chartFrame.forEach(chartFrame => {
            chartFrame.chartInteractionWrapperHtmlElement.style.display = 'none'
        })
    }
}

export { ChartFrameManager }