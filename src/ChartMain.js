class ChartMain {
    // TODO: Implement multi chart frame
    chartFrames
    activeChartFrame
    frameCount

    datafeed

    $chartMain

    constructor(elm) {
        this.chartFrames = []
        this.datafeed = new Datafeed()
        this.frameCount = 0

        this.addChartMain(elm)
        this.addChartFrame()
    }

    addChartMain(elm) {
        if (typeof elm === "string") {
            this.$chartMain = document.querySelector("." + elm)
        } else {
            this.$chartMain = elm
        }

        let html = `
            <div class="chart_main_wrapper">
                <div class="header">
                    <div class="header_left">
                        <div class="header_ticker_select">
                            <select>${this.getTickerHtml()}</select>
                        </div>
                        <div class="header_timeframe_select">
                            ${this.getTimeframeHtml()}
                        </div>
                    </div>
                    <div class="header_right">
                        <div class="header_chart_frame_select">
                            ${this.getChartFrameSelectHtml()}
                        </div>
                    </div>
                    
                </div>
                <div class="chart_main_frames">
                </div>
            </div>
        `

        this.$chartMain.innerHTML = html

        this.addTickerListener()
        this.addTimeframeListener()
    }

    addChartFrame() {
        let $chartFrame = this.$chartMain.querySelector(".chart_main_frames")
        let chartFrame = new ChartFrame(
            $chartFrame,
            this.datafeed,
            this.frameCount++
        )
        chartFrame.displayChart()
        this.chartFrames.push(chartFrame)
        this.activeChartFrame = chartFrame
    }

    getTimeframeHtml() {
        return Timeframe.ALL_TIMEFRAME.reduce((acc, timeframe) => {
            let timeframeStr = timeframe.getTimeframeString()
            let frame = timeframe.getFrame()
            let value = timeframe.getValue()
            return (acc += `
                <div class="timeframe_item" data-frame="${frame}" data-value="${value}">
                    ${timeframeStr}
                </div>
            `)
        }, "")
    }

    getTickerHtml() {
        return Ticker.ALL_TICKERS.reduce((acc, tickerStr) => {
            let selected = tickerStr === Ticker.DEFAULT_TICKER ? "selected" : ""
            return (acc += `
                <option class="ticker_item" ${selected} data-value="${tickerStr}">
                    ${tickerStr}
                </option>
            `)
        }, "")
    }

    getChartFrameSelectHtml() {
        return [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }].reduce(
            (acc, v) => {
                let val = v.value
                return (acc += `
                    <div class="chart_frame_item" data-value="${val}">${val}</div>
                `)
            },
            ""
        )
    }

    addChartFrameListener() {
        let $cahrtFrame = document.querySelectorAll(".chart_frame_item")

        $cahrtFrame.forEach(($cf) => {
            $cf.addEventListener("click", (e) => {})
        })
    }

    addTimeframeListener() {
        let $timeframe = this.$chartMain.querySelectorAll(
            ".header .timeframe_item"
        )

        $timeframe.forEach(($tf) => {
            $tf.addEventListener("click", (e) => {
                let frame = $tf.getAttribute("data-frame")
                let value = $tf.getAttribute("data-value")
                let timeframe = new Timeframe(frame, value)
                this.activeChartFrame.setTimeframe(timeframe)
            })
        })
    }

    addTickerListener() {
        let $tickerSelect = this.$chartMain.querySelector(
            ".header .header_ticker_select select"
        )

        $tickerSelect.addEventListener("input", (e) => {
            let $option = $tickerSelect.options[$tickerSelect.selectedIndex]
            let tickerStr = $option.getAttribute("data-value")
            let ticker = new Ticker(tickerStr)
            this.activeChartFrame.setDataLoaded(false)
            this.activeChartFrame.setTicker(ticker)
        })
    }
}
