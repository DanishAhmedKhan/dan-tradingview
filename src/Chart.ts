import { ChartFrame } from './ChartFrame'

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
            autoSize: true,
            // width: this.chartWidth,
            // height: this.chartHeight,
            grid: {
                vertLines: { color: this.chartGridColor },
                horzLines: { color: this.chartGridColor },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
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
            this.chartOption
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
        this.addChartScrollListener()
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
            if (data.seriesData != null && data.seriesData.size === 1) {
                let value = data.seriesData.values().next().value
                this.chartFrame.handleCrosshairMove(value)
            }


        })

        this.lightweightChartHtmlElement.onmousedown = (event) => {
            this.chartFrame.handleMouseClick(event)

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