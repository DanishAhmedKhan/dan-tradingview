import { ChartFrame } from "../ChartFrame"
import { CandleData } from "../datafeed"
import { SeriesData } from "./series"

abstract class SeriesRenderer {

    protected data: Array<any> = []
    protected replayIndex: number = -1

    protected seriesData: any = {}
    protected seriesOptions: any = {}

    protected chartFrame: ChartFrame
    protected lightweightChart: any

    protected visibleTimeLimit: number | null = null
    protected visibleTimeIndex: number | null = null

    constructor(lightweightChart: any, chartFrame: ChartFrame) {
        this.lightweightChart = lightweightChart
        this.chartFrame = chartFrame
    }

    public getReplayIndex(): number {
        return this.replayIndex
    }

    public setVisibleLimit(timeLimit: number, timeIndex: number): void {
        this.visibleTimeLimit = timeLimit
        this.visibleTimeIndex = timeIndex
    }

    public setVisibleTimeLimit(timeLimit: number): void {
        if (timeLimit && timeLimit >= 0) {
            this.visibleTimeLimit = timeLimit
        }
    }

    protected draw(target: any, priceConverter: any): void {
        target.useBitmapCoordinateSpace((scope: any) => {
            if (
                this.seriesData === null ||
                this.seriesData.bars.length === 0 ||
                this.seriesData.visibleRange === null ||
                this.seriesData === null
            ) {
                return
            }

            const {
                context: ctx,
                horizontalPixelRatio,
                verticalPixelRatio,
            } = scope

            this.drawSeries(ctx, priceConverter)
        })
    }

    public update(seriesData: any, seriesOptions: any): void {
        this.seriesData = seriesData
        this.seriesOptions = seriesOptions
    }

    public getData(): Array<any> {
        return this.data
    }

    public abstract setReplayIndex(time: number): void

    public abstract processData(data: Array<CandleData>): void

    public abstract drawSeries(ctx: any, priceConverter: any): void
}

export { SeriesRenderer }