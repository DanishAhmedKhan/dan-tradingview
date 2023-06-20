import { Ticker } from './Ticker'
import { Timeframe, TimeframeUnit } from './Timeframe'

type Data = {
    time: number,
    open: number,
    high: number,
    low: number,
    close: number,
    meta: {
        datetime: string,
        month: number,
        day: number,
        year: number,
        hour: number,
        minute: number,
        second: number,
    },
}

type TickerData = {
    [key: string]: Array<Data>,
}

type AllData = {
    [key: string]: TickerData
}

type FileCount = {
    [key: string]: {
        M: number,
        H: number,
        D: number,
    }
}

class Datafeed {

    private readonly BASE_FILEPATH: string = "../data/"
    private readonly CSV_SEPARATOR: string = ","

    private data: AllData
    private fileCount: FileCount
    private dateFilename: Array<string>

    constructor() {
        this.data = {}
        this.fileCount = {}
        this.dateFilename = []
    }

    public getAllData(): AllData {
        return this.data
    }

    public getTickerData(ticker: Ticker): TickerData {
        let tk = ticker.getTicker()
        if (this.data.hasOwnProperty(tk)) return this.data[tk]

        throw Error("Data with given ticker not found")
    }

    public getTickerTimeframeData(ticker: Ticker, timeframe: Timeframe): Array<Data> {
        let tk = ticker.getTicker()
        let tf = timeframe.getTimeframeString()
        if (this.data.hasOwnProperty(tk) && this.data[tk].hasOwnProperty(tf))
            return this.data[tk][tf]

        throw Error("Data with given ticker and timeframe not found")
    }

    private async initFilename(ticker: string) {
        let filepath = this.BASE_FILEPATH + `${ticker}/dates.csv`
        let file = await fetch(filepath)
        let text = await file.text()
        this.dateFilename = text.split("\n")
        this.dateFilename = this.dateFilename.map((f) =>
            f.replace(/(\r\n|\n|\r)/gm, "")
        )
        this.dateFilename.reverse()
    }

    private getFilename(ticker: string, unit: TimeframeUnit): string {
        if (unit === TimeframeUnit.DAY) return "ALL.csv"
        return `${this.dateFilename[this.fileCount[ticker][unit]]}.csv`
    }

    async loadData(ticker: Ticker) {
        let tk = ticker.getTicker()

        if (!this.fileCount[tk]) {
            this.fileCount[tk] = { M: 0, H: 0, D: 0 }
        }

        if (!this.data[tk]) {
            this.data[tk] = {}
            Timeframe.ALL_TIMEFRAME.forEach((tf) => {
                let timeframeStr = tf.getTimeframeString()
                this.data[tk][timeframeStr] = []
            })
        }

        if (this.dateFilename.length === 0) {
            await this.initFilename(tk)
            Timeframe.ALL_TIMEFRAME.forEach(
                (tf) => (this.data[tk][tf.getTimeframeString()] = [])
            )
        }

        let minuteValues: Array<number> = []
        let hourValues: Array<number> = []
        let dayValues: Array<number> = []

        Timeframe.ALL_TIMEFRAME.forEach((tf) => {
            let value = tf.getValue()
            let frame = tf.getUnit()
            if (frame === TimeframeUnit.MINUTE) minuteValues.push(value)
            else if (frame === TimeframeUnit.HOUR) hourValues.push(value)
            else if (frame === TimeframeUnit.DAY) dayValues.push(value)
        })

        for (let i = 1; i <= 2; i++) {
            if (this.fileCount[tk].M < this.dateFilename.length) {
                await this.loadDataTimeframe(
                    ticker,
                    TimeframeUnit.MINUTE,
                    minuteValues
                )
                this.fileCount[tk].M++
            }
        }
        for (let i = 1; i <= 5; i++) {
            if (this.fileCount[tk].H < this.dateFilename.length) {
                await this.loadDataTimeframe(ticker, TimeframeUnit.HOUR, hourValues)
                this.fileCount[tk].H++
            }
        }
        if (this.fileCount[tk].D === 0) {
            await this.loadDataTimeframe(ticker, TimeframeUnit.DAY, dayValues)
            this.fileCount[tk].D++
        }
    }

    async loadDataTimeframe(ticker: Ticker, unit: TimeframeUnit, values: Array<number>) {
        let tk = ticker.getTicker()

        let data: TickerData = {}
        let tempData: TickerData = {}
        let dataThreshold: { [key: string]: number } = {}
        let timeIntervalCycle

        if (unit === TimeframeUnit.MINUTE) timeIntervalCycle = 60
        if (unit === TimeframeUnit.HOUR) timeIntervalCycle = 24

        values.forEach((val) => {
            let timeframe: string = unit + val
            data[timeframe] = []
            tempData[timeframe] = []
            dataThreshold[timeframe] = val
        })

        let filename = this.getFilename(tk, unit)
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
            let yy: number = Number(date.substring(0, i1))
            let mm: number = Number(date.substring(i1 + 1, i2))
            let dd: number = Number(date.substring(i2 + 1))

            i1 = time.indexOf(":")
            i2 = time.indexOf(":", i1 + 1)
            i3 = time.indexOf(".")
            let h: number = Number(time.substring(0, i1))
            let m: number = Number(time.substring(i1 + 1, i2))
            let s: number = Number(time.substring(i2 + 1, i3))

            let candleData: Data = {
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

            let timeValue: number
            if (unit === TimeframeUnit.MINUTE) timeValue = m
            else if (unit === TimeframeUnit.HOUR) timeValue = h

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

    private combineCandleData(data: Array<Data>): Data {
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

export { Datafeed }