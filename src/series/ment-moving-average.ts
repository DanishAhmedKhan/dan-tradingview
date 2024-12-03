import { ChartFrame } from "../ChartFrame"
import { ChartFrameManager } from "../ChartFrameManager"
import { CandleData } from "../datafeed"
import { ExponentialMovingAverage } from "./exponential-moving-average"
import { Series } from "./series"
import { SeriesRenderer } from "./series-renderer"
import { SimpleMovingAverage } from "./simple-moving-average"

class MentMovingAverage extends SeriesRenderer {

    private indicator: any;

    private simpleMovingAverageRenderer1: SimpleMovingAverage
    private simpleMovingAverageRenderer2: SimpleMovingAverage
    private simpleMovingAverageRenderer3: SimpleMovingAverage

    private exponentialMovingAverageRenderer1: SimpleMovingAverage
    private exponentialMovingAverageRenderer2: SimpleMovingAverage
    private exponentialMovingAverageRenderer3: SimpleMovingAverage


    constructor(lightweightChart: any, chartFrame: ChartFrame, option: any) {
        super(lightweightChart, chartFrame, option)

        this.indicator = option.indicator

        this.simpleMovingAverageRenderer1 = new SimpleMovingAverage(this.lightweightChart, this.chartFrame, { color: 'red', interval: 10, visible: true })
        this.simpleMovingAverageRenderer2 = new SimpleMovingAverage(this.lightweightChart, this.chartFrame, { color: 'green', interval: 20, visible: true })
        this.simpleMovingAverageRenderer3 = new SimpleMovingAverage(this.lightweightChart, this.chartFrame, { color: 'blue', interval: 50, visible: true })

        this.exponentialMovingAverageRenderer1 = new ExponentialMovingAverage(this.lightweightChart, this.chartFrame, { color: 'red', interval: 10, visible: true })
        this.exponentialMovingAverageRenderer2 = new ExponentialMovingAverage(this.lightweightChart, this.chartFrame, { color: 'green', interval: 20, visible: true })
        this.exponentialMovingAverageRenderer3 = new ExponentialMovingAverage(this.lightweightChart, this.chartFrame, { color: 'blue', interval: 50, visible: true })

        this.addIndicatorSeries(this.simpleMovingAverageRenderer1)
        this.addIndicatorSeries(this.simpleMovingAverageRenderer2)
        this.addIndicatorSeries(this.simpleMovingAverageRenderer3)

        this.addIndicatorSeries(this.exponentialMovingAverageRenderer1)
        this.addIndicatorSeries(this.exponentialMovingAverageRenderer2)
        this.addIndicatorSeries(this.exponentialMovingAverageRenderer3)
    }

    public setReplayIndex(time: number): void {
    }

    public addIndicatorSeries(renderer: SeriesRenderer): void {
        let series = new Series(renderer)
        let chartSeries = this.lightweightChart.addCustomSeries(series)

        this.indicator.push({
            renderer,
            series,
            chartSeries,
        })
    }

    public processData(candleData: Array<CandleData>): void {
        let smaVisibility: boolean
        let emaVisibility: boolean

        console.log('FRRRRR', this.chartFrame.getTimeframe().getValue())

        if (this.chartFrame.getTimeframe().getValue() === 1) {
            smaVisibility = false
            emaVisibility = true
        } else {
            smaVisibility = true
            emaVisibility = false
        }

        const setVisibility = (renderer: SeriesRenderer, visibility: boolean): void => {
            console.log(renderer.getOption())
            renderer.setOption({ ...renderer.getOption(), visible: visibility })
        }

        console.log(smaVisibility, emaVisibility)

        setVisibility(this.simpleMovingAverageRenderer1, smaVisibility)
        setVisibility(this.simpleMovingAverageRenderer2, smaVisibility)
        setVisibility(this.simpleMovingAverageRenderer3, smaVisibility)

        setVisibility(this.exponentialMovingAverageRenderer1, emaVisibility)
        setVisibility(this.exponentialMovingAverageRenderer2, emaVisibility)
        setVisibility(this.exponentialMovingAverageRenderer3, emaVisibility)
    }

    public drawSeries(ctx: any, priceToCoordinate: any): void {

    }

    public priceBuilder(plotRow: any): Array<number> {
        return [plotRow.price]
    }

}

export { MentMovingAverage }