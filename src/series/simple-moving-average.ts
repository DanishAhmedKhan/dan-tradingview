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
        let lastVisibleIndex = -1

        const bars = this.seriesData.bars.map((bar: any, index: number) => {
            const valueY = priceToCoordinate(bar.originalData.price) ?? 0
            let barData = bar.originalData

            if (
                index < this.seriesData.bars.length - 1 &&
                this.visibleTimeLimit &&
                barData.current_time < this.visibleTimeLimit
            ) {
                lastVisibleIndex = index + 1
            }

            return {
                time: bar.originalData.current_time,
                x: bar.x,
                y: valueY,
            }
        })

        ctx.strokeStyle = this.seriesOptions.color || '#f00'

        let visibleRange = this.seriesData.visibleRange

        console.log('lastVisibleIndex', lastVisibleIndex)

        for (let i = visibleRange.from; i < visibleRange.to; i++) {
            if (lastVisibleIndex >= 0 && i > lastVisibleIndex) break
            if (i - 1 < 0) continue

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