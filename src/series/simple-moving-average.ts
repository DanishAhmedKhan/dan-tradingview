import { ChartFrame } from "../ChartFrame"
import { CandleData } from "../datafeed"
import { SeriesRenderer } from "./series-renderer"

class SimpleMovingAverage extends SeriesRenderer {

    constructor(lightweightChart: any, chartFrame: ChartFrame, option: any) {
        super(lightweightChart, chartFrame, option)
    }

    public setReplayIndex(time: number): void {
    }

    public processData(candleData: Array<CandleData>): void {
        let smaData = []
        const SMA_INTERVAL = this.seriesOptions.interval || 20


        for (let i = SMA_INTERVAL; i < candleData.length; i++) {
            let closeValueSum = 0

            for (let j = i - SMA_INTERVAL; j < i; j++) {
                closeValueSum += candleData[j].close!
            }

            let average = closeValueSum / SMA_INTERVAL
            average = +(parseFloat(average + '').toPrecision(6))

            smaData.push({
                time: candleData[i].time,
                current_time: candleData[i].time,
                price: average,
            })
        }

        this.data = smaData

    }

    public drawSeries(ctx: any, priceToCoordinate: any): void {
        const bars = this.seriesData.bars.map((bar: any, index: number) => {
            const valueY = priceToCoordinate(bar.originalData.price) ?? 0
            let barData = bar.originalData

            return {
                time: bar.originalData.current_time,
                x: bar.x,
                y: valueY,
            }
        })

        let timeScale = this.lightweightChart.timeScale()

        ctx.strokeStyle = this.seriesOptions.color || '#f00'

        let visibleRange = this.seriesData.visibleRange

        for (let i = visibleRange.from; i < visibleRange.to; i++) {
            if (i - 1 < 0) continue

            let x1 = timeScale.timeToNearestCoordinate(this.seriesData.bars[i - 1].originalData.current_time)
            let y1 = priceToCoordinate(this.seriesData.bars[i - 1].originalData.value)

            let x2 = timeScale.timeToNearestCoordinate(this.seriesData.bars[i].originalData.current_time)
            let y2 = priceToCoordinate(this.seriesData.bars[i].originalData.value)

            ctx.beginPath()
            ctx.moveTo(bars[i].x, bars[i].y)
            ctx.lineTo(bars[i - 1].x, bars[i - 1].y)
            ctx.stroke()
        }
    }

    public priceBuilder(plotRow: any): Array<number> {
        return [plotRow.price]
    }

}

export { SimpleMovingAverage }