import { ChartFrame } from "../ChartFrame"
import { CandleData } from "../datafeed"
import { displayDate } from "../helper/util"
import { SeriesRenderer } from "./series-renderer"

class AverageTrueRange extends SeriesRenderer {

    constructor(lightweightChart: any, chartFrame: ChartFrame, option: any) {
        super(lightweightChart, chartFrame, option)
    }

    public setReplayIndex(time: number): void {
    }

    public processData(candleData: Array<CandleData>): void {
        let shortCandleData = candleData

        let atrData = []
        let ATR_INTERVAL = this.seriesOptions.interval || 14
        let atrSum = 0

        for (let i = 0; i < ATR_INTERVAL; i++) {
            let val
            let d = shortCandleData[i]

            if (i === 0) {
                val = d.high! - d.low!
            } else {
                let pd = shortCandleData[i - 1]
                val = Math.max(d.high! - d.low!, Math.abs(d.high! - pd.close!), Math.abs(d.low! - pd.close!))
            }

            atrSum += val
        }

        let atr = +(atrSum / ATR_INTERVAL).toFixed(6)

        atrData.push({
            time: shortCandleData[ATR_INTERVAL - 1].time,
            current_time: shortCandleData[ATR_INTERVAL - 1].time,
            atr: atr,
        })

        for (let i = ATR_INTERVAL; i < shortCandleData.length; i++) {
            let d = shortCandleData[i]
            let pd = shortCandleData[i - 1]

            let val = Math.max(d.high! - d.low!, Math.abs(d.high! - pd.close!), Math.max(d.low! - pd.close!))
            let atr: number = (atrData[atrData.length - 1].atr * (ATR_INTERVAL - 1) + val) / ATR_INTERVAL
            atr = +atr.toFixed(6)

            atrData.push({
                time: shortCandleData[i].time,
                current_time: shortCandleData[i].time,
                atr: atr,
            })
        }

        this.data = atrData
    }

    public drawSeries(ctx: any, priceToCoordinate: any): void {
        let lastVisibleIndex = -1

        this.seriesData.bars.forEach((bar: any, index: number) => {
            let barData = bar.originalData

            if (
                index < this.seriesData.bars.length - 1 &&
                this.visibleTimeLimit &&
                barData.current_time < this.visibleTimeLimit
            ) {
                lastVisibleIndex = index + 1
            }
        })

        let width = ctx.canvas.width
        let height = ctx.canvas.height

        if (lastVisibleIndex > 0) {
            ctx.beginPath()
            ctx.font = '30px Arial'
            ctx.fillStyle = 'red'
            let atr = this.data[lastVisibleIndex - 1].atr * 10000 + ''
            atr = atr.substring(0, 5)
            ctx.fillText(atr, width - 90, height - 20)
        }
    }

    public priceBuilder(plotRow: any): Array<number> {
        return [plotRow.price]
    }

}

export { AverageTrueRange }