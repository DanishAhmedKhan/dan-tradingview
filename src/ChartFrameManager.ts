import { ChartFrame } from './ChartFrame'
import { Calendar } from "./calendar"
import { Datafeed } from "./datafeed"
import { ToolbarManager } from "./drawing/toolbar-manager"
import { ToolManager } from "./tool/ToolManager"

class ChartFrameManager {

    public static isChartLoaded: boolean = false

    private chartFrame: Array<ChartFrame> = []
    private activeChartFrame: ChartFrame | null = null
    private frameCount = 0

    private chartMainHtmlElement: HTMLElement
    private datafeed: Datafeed
    private toolManager: ToolManager | null = null
    private toolbarManager: ToolbarManager

    constructor(
        chartMainHtmlElement: HTMLElement,
        datafeed: Datafeed,
        toolbarManager: ToolbarManager
    ) {
        this.chartMainHtmlElement = chartMainHtmlElement
        this.datafeed = datafeed
        this.toolbarManager = toolbarManager
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

    public addChartFrame(calendar: Calendar): ChartFrame {
        let chartFrame = new ChartFrame(
            this.chartMainHtmlElement.querySelector(".chart_main_frames")! as HTMLElement,
            this.datafeed,
            this.frameCount++,
            this.toolManager!,
            this.toolbarManager,
        )
        this.activeChartFrame = chartFrame
        this.chartFrame.push(chartFrame)


        // chartFrame.displayChart()

        calendar.setChartDate(null, false)
        calendar.setChartDate()
        ChartFrameManager.isChartLoaded = true

        // chartFrame.displayDrawing()

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