import { ChartFrame } from "../ChartFrame"
import { CandleData } from "../datafeed"
import { SeriesRenderer } from "./series-renderer"

class ExponentialMovingAverage extends SeriesRenderer {

    constructor(lightweightChart: any, chartFrame: ChartFrame, option: any) {
        super(lightweightChart, chartFrame, option)
    }

    public setReplayIndex(time: number): void {
    }

    public processData(candleData: Array<CandleData>): void {
        let emaData = []
        const EMA_INTERVAL = this.seriesOptions.interval || 20
        let priceSum = 0

        for (let i = 0; i < EMA_INTERVAL; i++) {
            priceSum += candleData[i].close!
        }

        let ema = priceSum / EMA_INTERVAL
        let multiplier = 2.0 / (EMA_INTERVAL + 1)

        emaData.push({
            time: candleData[EMA_INTERVAL - 1].time,
            current_time: candleData[EMA_INTERVAL - 1].time,
            price: ema,
        })

        for (let i = EMA_INTERVAL; i < candleData.length; i++) {
            ema = candleData[i].close! * multiplier + ema * (1 - multiplier)

            emaData.push({
                time: candleData[i].time,
                current_time: candleData[i].time,
                price: ema,
            })
        }

        this.data = emaData
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

export { ExponentialMovingAverage }