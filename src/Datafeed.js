class Datafeed {
    BASE_FILEPATH = "../data/"
    CSV_SEPARATOR = ","

    data
    dateFilename
    fileCount

    constructor() {
        this.data = {}
        this.fileCount = { M: 0, H: 0, D: 0 }
    }

    getData() {
        return this.data
    }

    getData(ticker) {
        if (!ticker instanceof Ticker)
            return console.log("ticker is not of type Ticker")

        let tk = ticker.getTicker()
        if (this.data.hasOwnProperty(tk)) return this.data[ticker.getTicker()]

        console.log("Data with given ticker not found")
    }

    getData(ticker, timeframe) {
        if (!ticker instanceof Ticker)
            return console.log("ticker is not of type Ticker")
        if (!timeframe instanceof Timeframe)
            return console.log("timeframe is not of type Timeframe")

        let tk = ticker.getTicker()
        let tf = timeframe.getTimeframeString()
        if (this.data.hasOwnProperty(tk) && this.data[tk].hasOwnProperty(tf))
            return this.data[tk][tf]

        console.log("Data with given ticker and timeframe not found")
    }

    async initFilename(ticker) {
        let filepath = this.BASE_FILEPATH + `${ticker}/dates.csv`
        let file = await fetch(filepath)
        let text = await file.text()
        this.dateFilename = text.split("\n")
        this.dateFilename = this.dateFilename.map((f) =>
            f.replace(/(\r\n|\n|\r)/gm, "")
        )
        this.dateFilename.reverse()
    }

    getFilename(unit) {
        if (unit === "D") return "ALL.csv"
        return `${this.dateFilename[this.fileCount[unit]]}.csv`
    }

    async loadData(ticker) {
        let tk = ticker.getTicker()
        if (!this.data[tk]) this.data[tk] = {}

        if (!this.dateFilename) {
            await this.initFilename(tk)
            Timeframe.ALL_TIMEFRAME.forEach(
                (tf) => (this.data[tk][tf.getTimeframeString()] = [])
            )
        }

        let minuteValues = []
        let hourValues = []
        let dayValues = []

        Timeframe.ALL_TIMEFRAME.forEach((tf) => {
            let value = tf.getValue()
            let frame = tf.getFrame()
            if (frame === Timeframe.MINUTE) minuteValues.push(value)
            else if (frame === Timeframe.HOUR) hourValues.push(value)
            else if (frame === Timeframe.DAY) dayValues.push(value)
        })

        if (this.fileCount.M < this.dateFilename.length) {
            await this.loadDataTimeframe(ticker, Timeframe.MINUTE, minuteValues)
            this.fileCount.M++
        }
        for (let i = 0; i < 1; i++) {
            if (this.fileCount.H < this.dateFilename.length) {
                await this.loadDataTimeframe(ticker, Timeframe.HOUR, hourValues)
                this.fileCount.H++
            }
        }
        if (this.fileCount.D === 0) {
            await this.loadDataTimeframe(ticker, Timeframe.DAY, dayValues)
            this.fileCount.D++
        }
    }

    async loadDataTimeframe(ticker, unit, values) {
        let tk = ticker.getTicker()

        let data = {}
        let tempData = {}
        let dataThreshold = {}
        let timeIntervalCycle

        if (unit === Timeframe.MINUTE) timeIntervalCycle = 60
        if (unit === Timeframe.HOUR) timeIntervalCycle = 24

        values.forEach((val) => {
            let timeframe = unit + val
            data[timeframe] = []
            tempData[timeframe] = []
            dataThreshold[timeframe] = val
        })

        let filename = this.getFilename(unit)
        let filepath = this.BASE_FILEPATH + `${tk}/${unit}/${filename}`

        let fileData = await fetch(filepath)
        let dataText = await fileData.text()
        if (dataText.includes("html")) return -1

        let d = dataText.split("\n")

        for (let i = 0; i < d.length; i++) {
            let row = d[i]
            let [datetime, open, high, low, close] = row.split(
                this.CSV_SEPARATOR
            )
            if (!datetime || !open || !high || !low || !close) continue

            let time = datetime.substring(datetime.indexOf(" "))
            let date = datetime.substring(0, datetime.indexOf(" "))

            let i1, i2, i3

            i1 = date.indexOf("-")
            i2 = date.lastIndexOf("-")
            let yy = date.substring(0, i1)
            let mm = date.substring(i1 + 1, i2)
            let dd = date.substring(i2 + 1)

            i1 = time.indexOf(":")
            i2 = time.indexOf(":", i1 + 1)
            i3 = time.indexOf(".")
            let h = time.substring(0, i1)
            let m = time.substring(i1 + 1, i2)
            let s = time.substring(i2 + 1, i3)

            let candleData = {
                time: new Date(datetime).valueOf() / 1000,
                open: +open,
                high: +high,
                low: +low,
                close: +close,
                meta: {
                    datetime,
                    month: mm,
                    day: dd,
                    year: yy,
                    hour: h,
                    minute: m,
                    second: s,
                },
            }

            let timeValue
            if (unit === Timeframe.MINUTE) timeValue = m
            else if (unit === Timeframe.HOUR) timeValue = h

            data[unit + values[0]].push(candleData)

            values.slice(1).forEach((v) => {
                let tf = unit + v

                if (
                    timeValue % dataThreshold[tf] === 0 &&
                    tempData[tf].length > 0
                ) {
                    let combineData = this.combineCandleData(tempData[tf])
                    data[tf].push(combineData)
                    tempData[tf] = []
                }

                // TODO: combine the last tempData after iteration is complete
                tempData[tf].push(candleData)
            })
        }

        values.forEach((v) => {
            let tf = unit + v
            this.data[tk][tf] = data[tf].concat(this.data[tk][tf])
        })
    }

    combineCandleData(data) {
        let high = -1,
            low = 999999

        data.forEach((d) => {
            if (d.high > high) high = d.high
            if (d.low < low) low = d.low
        })

        return {
            time: data[0].time,
            open: data[0].open,
            high: high,
            close: data[data.length - 1].close,
            low: low,
            meta: data[0].meta,
        }
    }
}
