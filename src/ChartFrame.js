class ChartFrame {
    ticker
    timeframe
    datafeed
    chart

    $chartFrame

    constructor(elm, datafeed, frameIndex) {
        this.addChart(elm, frameIndex)

        this.ticker = new Ticker()
        this.timeframe = new Timeframe()
        this.datafeed = datafeed

        let $chart = this.$chartFrame.querySelector(".chart_frame_wrapper")
        this.chart = new Chart($chart)
    }

    addChart(elm, frameIndex) {
        if (elm instanceof String) {
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

    async displayChart() {
        await this.datafeed.loadData(this.ticker)
        let data = this.datafeed.getData(this.ticker, this.timeframe)
        this.chart.displayData(data)
    }
}
