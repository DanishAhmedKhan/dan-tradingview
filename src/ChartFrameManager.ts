import { ChartFrame } from "./ChartFrame"
import { Datafeed } from "./Datafeed"
import { ToolManager } from "./tool/ToolManager"

class ChartFrameManager {

    private chartFrames: Array<ChartFrame>
    private activeChartFrame: ChartFrame | null
    private frameCount

    private chartMainHtmlElement: HTMLElement
    private datafeed: Datafeed
    private toolManager: ToolManager | null

    constructor(chartMainHtmlElement: HTMLElement, datafeed: Datafeed) {
        this.chartMainHtmlElement = chartMainHtmlElement
        this.datafeed = datafeed
        this.toolManager = null
        this.chartFrames = []
        this.frameCount = 0
        this.activeChartFrame = null
    }

    public setToolManager(toolManager: ToolManager): void {
        this.toolManager = toolManager
    }

    public getAllChartFrames(): Array<ChartFrame> {
        return this.chartFrames
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
        this.chartFrames.push(chartFrame)
        chartFrame.displayChart()
        chartFrame.displayDrawing()

        this.addActiveListener()
        return chartFrame
    }

    public addActiveListener(): void {
        let chartFrameHtmlElements = this.chartMainHtmlElement.querySelectorAll('.chart_frame_wrapper')!
        
        chartFrameHtmlElements.forEach(chartFrameHtmlElement => {
            chartFrameHtmlElement.addEventListener('click', e => {
                let frameIndex = Number(chartFrameHtmlElement.getAttribute('data-frame-index'))
                this.activeChartFrame = this.chartFrames[frameIndex]
            })
        })
    }
}

export { ChartFrameManager }