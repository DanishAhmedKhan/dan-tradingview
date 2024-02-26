import { ChartFrame } from './ChartFrame';
import ChartMain from './ChartMain';
import { MentStructure } from './series/ment-structure';
import { Series } from './series/series';
import { SeriesRenderer } from './series/series-renderer';
import { SimpleMovingAverage } from './series/simple-moving-average';

declare global {
    interface Window {
        LightweightCharts: any;
    }
}

enum ChartTheme {
    THEME_1,
    LIGHT,
    DARK
}

type ChartThemeOption = {
    upColor: string,
    downColor: string,
    borderUpColor: string,
    borderDownColor: string,
    wickUpColor: string,
    wickDownColor: string,
}

type Indicator = {
    renderer: SeriesRenderer,
    series: Series,
    chartSeries: any,
}

class Chart {
    private lightweightChartHtmlElement: HTMLElement

    private lightweightChart
    private chartOption
    private candleSeries
    private candleSeriesOption

    private chartFrame: ChartFrame

    private chartWidth: number
    private chartHeight: number
    private chartGridColor: string

    private indicator: Array<Indicator> = []

    constructor(
        lightweightChartHtmlElement: HTMLElement,
        chartFrame: ChartFrame
    ) {
        this.chartFrame = chartFrame

        if (lightweightChartHtmlElement instanceof HTMLElement)
            this.lightweightChartHtmlElement = lightweightChartHtmlElement
        else {
            let element = document.createElement("div")
            element.classList.add("chart")
            element.style.cssText = "width: 1500px; height: 900px;"
            document.body.appendChild(element)
            this.lightweightChartHtmlElement = document.querySelector(".chart")!
        }

        this.chartWidth = 1500
        this.chartHeight = 900
        this.chartGridColor = "#eeeeee"

        let theme: ChartTheme = ChartTheme.THEME_1
        let themeOption: ChartThemeOption

        // TODO: Implement tempelate style select
        if (theme === ChartTheme.THEME_1) {
            themeOption = {
                upColor: "#ffffff",
                downColor: "#000000",
                borderUpColor: "#000000",
                borderDownColor: "#000000",
                wickUpColor: "#000000",
                wickDownColor: "#000000",
            }
        } else {
            themeOption = {
                upColor: "#ffffff",
                downColor: "#000000",
                borderUpColor: "#000000",
                borderDownColor: "#000000",
                wickUpColor: "#000000",
                wickDownColor: "#000000",
            }
        }

        this.chartOption = {
            // shiftVisibleRangeOnNewBar: false,
            autoSize: true,
            // width: screen.width - 200,
            // height: screen.height - 200,

            grid: {
                vertLines: { color: this.chartGridColor },
                horzLines: { color: this.chartGridColor },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
            },
            priceScale: {
                autoScale: true,
            },
            leftPriceScale: {
                borderColor: '#ff0000'
            },
            crosshair: {
                mode: window.LightweightCharts.CrosshairMode.Normal,
                vertLine: {
                    width: 1,
                    color: "#9B7DFF",
                    labelBackgroundColor: "#000",
                },
                horzLine: {
                    width: 1,
                    color: "#9B7DFF",
                    labelBackgroundColor: "#000",
                },
            },
        }

        this.lightweightChart = window.LightweightCharts.createChart(
            this.lightweightChartHtmlElement,
            this.chartOption,
        )
        this.candleSeries = this.lightweightChart.addCandlestickSeries()

        this.candleSeriesOption = {
            upColor: themeOption.upColor,
            downColor: themeOption.downColor,
            borderUpColor: themeOption.borderUpColor,
            borderDownColor: themeOption.borderDownColor,
            wickUpColor: themeOption.wickUpColor,
            wickDownColor: themeOption.wickDownColor,
            priceFormat: {
                type: "price",
                precision: 5,
                minMove: 0.00001,
            },
        }

        this.candleSeries.applyOptions(this.candleSeriesOption)

        let mentStrustureRenderer = new MentStructure(this.lightweightChart, this.chartFrame, { color: '#aaa' })
        let simpleMovingAverageRenderer1 = new SimpleMovingAverage(this.lightweightChart, this.chartFrame, { color: '#e3665d', interval: 20 })
        let simpleMovingAverageRenderer2 = new SimpleMovingAverage(this.lightweightChart, this.chartFrame, { color: '#5377ed', interval: 50 })

        this.addIndicatorSeries(mentStrustureRenderer)
        this.addIndicatorSeries(simpleMovingAverageRenderer1)
        this.addIndicatorSeries(simpleMovingAverageRenderer2)

        this.lightweightChart.timeScale().applyOptions({ shiftVisibleRangeOnNewBar: false })
        this.addChartScrollListener()
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

    public getLightweightChart(): any {
        return this.lightweightChart
    }

    public getLightweightChartHtmlElement() {
        return this.lightweightChartHtmlElement
    }

    public getCandleSeries(): any {
        return this.candleSeries
    }

    public getIndicator(): Array<Indicator> {
        return this.indicator
    }

    public setCandleSeriesOption(option: object) {
        this.candleSeries.applyOptions(option)
    }

    public resetChartScale() {
        this.lightweightChart.priceScale("right").applyOptions({
            autoScale: true,
        })
    }

    public addDataToCandleSeries(data: any) {
        this.candleSeries.setData(data)
    }

    public addIndicatorToChart(data: any): void {
        if (!data) return

        this.indicator.forEach(indicator => {
            indicator.renderer.processData(data)
            indicator.chartSeries.setData(indicator.renderer.getData())
        })
    }

    public processIndicator(data: any) {
        this.indicator.forEach(inidcator => {
            inidcator.renderer.processData(data)
        })
    }

    public setIndicatorReplayIndex(time: number): void {
        this.indicator.forEach(inidcator => {
            inidcator.renderer.setReplayIndex(time)
        })
    }

    public updateCandle(candle: any) {
        this.candleSeries.update(candle)
    }

    public disableScroll(): void {
        this.lightweightChart.applyOptions({
            handleScroll: false,
            handleScale: false,
        })
    }

    public enableScroll(): void {
        this.lightweightChart.applyOptions({
            handleScroll: true,
            handleScale: true,
        })
    }

    private addChartScrollListener() {
        const onVisibleLogicalRangeChanged = (newVisibleLogicalRange: any) => {
            const barsInfo = this.candleSeries.barsInLogicalRange(
                newVisibleLogicalRange
            )
            this.chartFrame.handleScroll(barsInfo)
        }

        this.lightweightChart
            .timeScale()
            .subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged)

        this.lightweightChart.subscribeCrosshairMove((data: any) => {
            // console.log(data)
            if (data.seriesData != null && data.seriesData.size === 1) {
                let value = data.seriesData.values().next().value
                this.chartFrame.handleCrosshairMove(value)

                this.chartFrame.setCalendarDate()
            }
        })

        this.lightweightChartHtmlElement.onmousedown = (event) => {
            this.chartFrame.handleMouseClick(event)
            if (ChartMain.candleReplay?.isReplayPressed) {
                ChartMain.candleReplay!.handleChartMouseClick(event)
            }

            this.lightweightChartHtmlElement.addEventListener("mousemove", (event) => {
                event.preventDefault();
            });

            this.lightweightChartHtmlElement.addEventListener("mouseup", (event) => {
                event.preventDefault();
            });
        }
    }
}

export { Chart }