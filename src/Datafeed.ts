import { Ticker } from './Ticker'
import { Timeframe, TimeframeUnit } from './Timeframe'

type CandleData = {
    time: number,
    open?: number,
    high?: number,
    low?: number,
    close?: number,
    meta?: {
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
    [timeInterval: string]: Array<CandleData>,
}

type FullData = {
    [ticker: string]: {
        [filename: string]: TickerData
    }
}

type LoadedFilename = {
    [key: string]: {
        M: Array<string>,
        H: Array<string>,
        D: Array<string>,
    }
}

type Edge = {
    left: number,
    right: number,
}

class Datafeed {

    private readonly BASE_FILEPATH: string = "../data/"
    private readonly CSV_SEPARATOR: string = ","

    private data: FullData
    private dateFilename: Array<string>
    private loadedFilename: LoadedFilename
    private filenameEdge: any

    private readonly offset = {
        M: 1,
        H: 2,
        D: 1,
    }

    private minuteInterval: Array<number> = []
    private hourInterval: Array<number> = []
    private dayInterval: Array<number> = []

    constructor() {
        this.data = {}
        this.dateFilename = []
        this.loadedFilename = {}
        this.filenameEdge = {}

        Timeframe.ALL_TIMEFRAME.forEach((tf) => {
            let value = tf.getValue()
            let frame = tf.getUnit()
            if (frame === TimeframeUnit.MINUTE) this.minuteInterval.push(value)
            else if (frame === TimeframeUnit.HOUR) this.hourInterval.push(value)
            else if (frame === TimeframeUnit.DAY) this.dayInterval.push(value)
        })
    }

    public getAllData(): FullData {
        return this.data
    }

    public isDateInFilename(date: string): boolean {
        return this.dateFilename.length > 0 && this.dateFilename.includes(date)
    }

    public getDefaultDateFilename(): string {
        return this.dateFilename[0]
    }

    public getTickerTimeframeData(ticker: Ticker, timeframe: Timeframe, date: string): Array<CandleData> {
        let timeUnit = timeframe.getUnit() as TimeframeUnit
        let tf = timeframe.getTimeframeString()
        let tk = ticker.getTicker()

        if (timeframe.getUnit() === TimeframeUnit.DAY) {
            return this.data[tk].ALL[tf]
        }

        let data: Array<CandleData> = []
        if (this.data.hasOwnProperty(tk) && this.data[tk].hasOwnProperty(date)) {
            let left = this.filenameEdge[tk][timeUnit].left
            let right = this.filenameEdge[tk][timeUnit].right

            let str = ''
            for (let i = left; i <= right; i++) {
                let filename = this.dateFilename[i]
                str = filename + ' ' + str
                data = this.data[tk][filename][tf].concat(data)
            }
            // console.log('dates', str)
            // console.log(new Date(data[0].time * 1000), new Date(data[data.length - 1].time * 1000))
        } else {
            console.log('data', this.data)
            throw Error("Data with given ticker and timeframe not found")
        }

        // console.log('data.length', data.length)
        return data
    }

    public async loadYearWeekFilename() {
        let filepath = this.BASE_FILEPATH + `/dates.csv`
        try {
            let file = await fetch(filepath)
            let text = await file.text()
            this.dateFilename = text.split("\n")
            this.dateFilename = this.dateFilename.map((f) =>
                f.replace(/(\r\n|\n|\r)/gm, "")
            )
            this.dateFilename.reverse()
        } catch (e) {
            throw Error('dates.csv not found in data folder')
        }
    }

    public isFirstDate(date: string): boolean {
        return date === this.dateFilename[0]
    }

    public isLasttDate(date: string): boolean {
        return date === this.dateFilename[this.dateFilename.length - 1]
    }

    public getNextDateFilename(date: string): string {
        let index = this.dateFilename.indexOf(date)
        if (index < 0) throw Error('date not valid')

        if (index - 1 < 0)
            return date

        return this.dateFilename[index - 1]
    }

    public getPreviousDateFilename(date: string): string {
        let index = this.dateFilename.indexOf(date)
        if (index < 0) throw Error('date not valid')

        if (index + 1 >= this.dateFilename.length)
            return date

        return this.dateFilename[index + 1]
    }

    private calculateFileEdge(ticker: string, date: string, timeUnit: TimeframeUnit): void {
        let index = this.dateFilename.indexOf(date)

        let leftEdge = 0;
        let rightEdge = this.dateFilename.length - 1

        for (let i = index; i >= 0; i--) {
            let filename = this.dateFilename[i]
            if (!this.loadedFilename[ticker][timeUnit].includes(filename)) {
                leftEdge = i + 1 // + 1
                break
            }
        }

        for (let i = index; i < this.dateFilename.length; i++) {
            let filename = this.dateFilename[i]
            if (!this.loadedFilename[ticker][timeUnit].includes(filename)) {
                rightEdge = i - 1 // - 1
                break
            }
        }

        if (!this.filenameEdge.hasOwnProperty(ticker)) {
            this.filenameEdge[ticker] = {}
        }
        this.filenameEdge[ticker][timeUnit] = {
            left: leftEdge,
            right: rightEdge,
        }
    }

    async loadFileFromInterval(ticker: Ticker, date: string, timeUnit: TimeframeUnit) {
        let offset = this.offset[timeUnit]
        let index = this.dateFilename.indexOf(date)
        let tk = ticker.getTicker()

        for (let i = index - offset; i <= index + offset; i++) {
            if (i >= this.dateFilename.length || i < 0) continue

            let filename = this.dateFilename[i]
            if (!this.loadedFilename[tk][timeUnit].includes(filename)) {
                await this.loadDataTimeframe(ticker, filename, timeUnit)
                this.loadedFilename[tk][timeUnit].push(filename)
            }
        }
    }

    async loadData(ticker: Ticker, date: string) {
        if (this.dateFilename.length === 0) {
            await this.loadYearWeekFilename()
        }

        if (!date || date === '' || !this.dateFilename.includes(date)) {
            date = this.dateFilename[0]
        }

        let tk = ticker.getTicker()
        let firstLoad = false
        if (!this.loadedFilename.hasOwnProperty(tk)) {
            firstLoad = true
            this.loadedFilename[tk] = {
                M: [],
                H: [],
                D: [],
            }
        }

        await this.loadFileFromInterval(ticker, date, TimeframeUnit.MINUTE)
        await this.loadFileFromInterval(ticker, date, TimeframeUnit.HOUR)

        let dayFilename = 'ALL'
        if (!this.loadedFilename[tk].D.includes(dayFilename)) {
            await this.loadDataTimeframe(ticker, dayFilename, TimeframeUnit.DAY)
            this.loadedFilename[tk].D.push(dayFilename)
        }

        // console.log('data length in darafeed', this.data[tk])

        this.calculateFileEdge(tk, date, TimeframeUnit.MINUTE)
        this.calculateFileEdge(tk, date, TimeframeUnit.HOUR)
        this.calculateFileEdge(tk, date, TimeframeUnit.DAY)

        return firstLoad ? date : null
    }

    async loadDataTimeframe(ticker: Ticker, filename: string, timeUnit: TimeframeUnit,) {
        let tk = ticker.getTicker()

        let data: TickerData = {}
        let tempData: TickerData = {}
        let dataThreshold: { [key: string]: number } = {}

        let interval: Array<number> = []
        if (timeUnit === TimeframeUnit.MINUTE) interval = this.minuteInterval
        else if (timeUnit === TimeframeUnit.HOUR) interval = this.hourInterval
        else if (timeUnit === TimeframeUnit.DAY) interval = this.dayInterval

        interval.forEach((interval) => {
            let timeframe: string = timeUnit + interval
            data[timeframe] = []
            tempData[timeframe] = []
            dataThreshold[timeframe] = interval
        })

        let filepath = this.BASE_FILEPATH + `${tk}/${timeUnit}/${filename}`
        if (!filename.includes('.csv')) filepath += '.csv'

        let fileData = await fetch(filepath)
        let fileDataText = await fileData.text()
        if (fileDataText.includes("html")) return -1

        let d = fileDataText.split("\n")

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

            let candleData: CandleData = {
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
            if (timeUnit === TimeframeUnit.MINUTE) timeValue = m
            else if (timeUnit === TimeframeUnit.HOUR) timeValue = h

            data[timeUnit + interval[0]].push(candleData)

            interval.slice(1).forEach((interval) => {
                let tf = timeUnit + interval

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

        if (!this.data.hasOwnProperty(tk)) {
            this.data[tk] = {}
        }

        this.data[tk][filename] = { ...this.data[tk][filename], ...data }
    }

    private combineCandleData(data: Array<CandleData>): CandleData {
        let high = -1
        let low = 999999

        data.forEach((d) => {
            if (d.high! > high) high = d.high!
            if (d.low! < low) low = d.low!
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

export { Datafeed, CandleData }