import { CandleData } from "../datafeed"
import { SeriesData } from "./series"

abstract class SeriesRenderer {

    protected seriesData: any = {}
    protected seriesOptions: any = {}

    protected lightweightChart: any

    constructor(lightweightChart: any) {
        this.lightweightChart = lightweightChart
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

    update(seriesData: any, seriesOptions: any) {
        this.seriesData = seriesData
        this.seriesOptions = seriesOptions
    }

    public abstract getData(data: Array<CandleData>): any

    public abstract drawSeries(ctx: any, priceConverter: any): void
}

export { SeriesRenderer }