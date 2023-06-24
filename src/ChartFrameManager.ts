import { ChartFrame } from "./ChartFrame"
import { Datafeed } from "./Datafeed"
import { ToolManager } from "./tool/ToolManager"

class ChartFrameManager {

    private chartFrames: Array<ChartFrame>
    private activeChartFrame: ChartFrame
    private frameCount

    private $chartMain: HTMLDivElement
    private datafeed: Datafeed
    private toolManager: ToolManager

    constructor($chartMain: HTMLDivElement, datafeed: Datafeed, toolManager: ToolManager) {
        this.$chartMain = $chartMain
        this.datafeed = datafeed
        this.toolManager = toolManager
        this.chartFrames = []
        this.frameCount = 0
        this.activeChartFrame = this.addChartFrame()
    }

    public getAllChartFrames(): Array<ChartFrame> {
        return this.chartFrames
    }

    public getActiveChartFrame(): ChartFrame {
        return this.activeChartFrame
    }

    public addChartFrame(): ChartFrame {
        let chartFrame = new ChartFrame(
            this.$chartMain.querySelector(".chart_main_frames")! as HTMLDivElement,
            this.datafeed,
            this.frameCount++,
            this.toolManager.getStorageManager()
        )
        chartFrame.displayChart()
        chartFrame.displayDrawing()
        this.chartFrames.push(this.activeChartFrame)
        return chartFrame
    }
}

export { ChartFrameManager }