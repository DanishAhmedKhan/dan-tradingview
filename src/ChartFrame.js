class ChartFrame {
    ticker
    timeframe
    datafeed
    chart

    $chartFrame
    frameIndex

    isDataLoaded = false

    constructor(elm, datafeed, frameIndex) {
        this.addChart(elm, frameIndex)

        this.ticker = new Ticker()
        this.timeframe = new Timeframe()
        this.datafeed = datafeed
        this.frameIndex = frameIndex

        let $chart = this.$chartFrame.querySelector(".chart_frame_wrapper")
        this.chart = new Chart($chart, this)
    }

    getFrameIndex() {
        return this.frameIndex
    }

    setFrameIndex(frameIndex) {
        this.frameIndex = frameIndex
    }

    getIsDataLoaded() {
        return this.isDataLoaded
    }

    setIsDataLoaded(isDataLoaded) {
        this.isDataLoaded = isDataLoaded
    }

    addChart(elm, frameIndex) {
        if (typeof elm === "string") {
            this.$chartFrame = document.querySelector("." + elm)
        } else {
            this.$chartFrame = elm
        }

        let html = `
            <div class="chart_frame_wrapper" data-frame-index="${frameIndex}">
            </div>
        `
        this.$chartFrame.insertAdjacentHTML("beforeend", html)
    }

    setTimeframe(timeframe) {
        this.timeframe = timeframe
        this.displayChart()
    }

    setTicker(ticker) {
        this.ticker = ticker
        this.displayChart()
    }

    async displayChart() {
        if (!this.isDataLoaded) {
            await this.datafeed.loadData(this.ticker)
            this.isDataLoaded = true
        }

        let data = this.datafeed.getData(this.ticker, this.timeframe)
        // this.chart.resetChartScale()
        this.chart.addDataToCandleSeries(data)
    }

    static getChartFrame(chartframes, index) {
        chartframes.forEach((cf) => {
            if (cf.getFrameIndex() === index) return cf
        })
    }
}
