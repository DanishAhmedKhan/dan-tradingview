class Chart {
    $chart
    chart
    chartOption
    candleSeries
    candleSeriesOption

    chartFrame

    chartWidth
    chartHeight
    chartGridColor

    constructor($chart, chartFrame) {
        this.chartFrame = chartFrame

        if ($chart instanceof HTMLElement) this.$chart = $chart
        else {
            let $div = document.createElement("div")
            $div.classList.add("chart")
            $div.style.cssText = "width: 1500px; height: 900px;"
            document.body.appendChild($div)
            $chart = document.querySelector(".chart")
        }
        this.initChart()
    }

    initChart() {
        this.chartWidth = 1500
        this.chartHeight = 880
        this.chartGridColor = "#eeeeee"

        let theme = "theme1"
        let themeOption

        // TODO: Implement tempelate style select
        if (theme === "theme1") {
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
            width: this.chartWidth,
            height: this.chartHeight,
            grid: {
                vertLines: { color: this.chartGridColor },
                horzLines: { color: this.chartGridColor },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
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

        this.chart = LightweightCharts.createChart(
            this.$chart,
            this.chartOption
        )
        this.candleSeries = this.chart.addCandlestickSeries()

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

    setCandleSeriesOption(option) {
        this.candleSeries.applyOptions(option)
    }

    resetChartScale() {
        this.chart.priceScale("right").applyOptions({
            autoScale: true,
        })
    }

    addDataToCandleSeries(data) {
        this.candleSeries.setData(data)
    }

    addChartScrollListener() {
        const LOAD_THRESHOLD = 300
        const onVisibleLogicalRangeChanged = (newVisibleLogicalRange) => {
            const barsInfo = this.candleSeries.barsInLogicalRange(
                newVisibleLogicalRange
            )
            if (barsInfo != null && barsInfo.barsBefore < LOAD_THRESHOLD) {
                console.log("loadoing data...")
                this.chartFrame.setDataLoaded(false)
                this.chartFrame.displayChart()
            }
        }

        this.chart
            .timeScale()
            .subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged)
    }
}
