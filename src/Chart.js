class Chart {
    $chart
    chart
    chartOption
    candleSeries
    candleSeriesOption

    chartWidth
    chartHeight
    chartGridColor

    constructor($chart) {
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
        this.chartGridColor = "#eee"

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
                    labelBackgroundColor: "#9B7DFF",
                },
                horzLine: {
                    width: 1,
                    color: "#9B7DFF",
                    labelBackgroundColor: "#9B7DFF",
                },
            },
        }

        this.chart = LightweightCharts.createChart(
            this.$chart,
            this.chartOption
        )
        this.candleSeries = this.chart.addCandlestickSeries()

        this.candleSeriesOption = {
            priceFormat: {
                type: "price",
                precision: 5,
                minMove: 0.00001,
            },
        }

        this.candleSeries.applyOptions(this.candleSeriesOption)
    }

    setCandleSeriesOption(option) {
        this.candleSeries.applyOptions(option)
    }

    displayData(data) {
        this.candleSeries.setData(data)
    }
}
