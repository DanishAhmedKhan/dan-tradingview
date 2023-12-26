import { ChartFrame } from "../ChartFrame"
import { CandleData } from "../datafeed"
import { SeriesRenderer } from "./series-renderer"

class MentStructure extends SeriesRenderer {

    constructor(lightweightChart: any, chartFrame: ChartFrame) {
        super(lightweightChart, chartFrame)
    }

    public setReplayIndex(time: number): void {
        for (let i = 0; i < this.data.length; i++) {
            let data = this.data[i]

            if (
                i !== this.data.length &&
                time > data.time &&
                time < this.data[i + 1].time
            ) {
                this.replayIndex = i
                break
            }
        }
    }

    public processData(candleData: Array<CandleData>): void {
        let mentStructureData: any = []

        const BREAK_UP = 1
        const BREAK_DOWN = 0

        let state = 0
        let temp_low = candleData[0].low
        let temp_high = candleData[0].high
        let temp_break = -1
        let temp_high_index = 0, temp_low_index = 0

        let bos = 0, prev_phl = 0, bull_phl = 0, bear_phl = 0
        let pullback = false
        let bos_index = 0, prev_phl_index = 0, bull_phl_index = 0, bear_phl_index = 0

        let index = 0

        for (let i = 1; i < candleData.length; i++) {
            let candle = candleData[i]

            if (state === 0) {
                if (candle.close < temp_low) {
                    temp_break = BREAK_DOWN
                    state = 1

                    bos = candle.low
                    bos_index = i
                    bear_phl = bos
                    bear_phl_index = i

                    prev_phl = temp_high
                    prev_phl_index = temp_high_index

                    mentStructureData[index++] = {
                        time: candleData[prev_phl_index].time,
                        current_time: candleData[prev_phl_index].time,
                        type: 'phl',
                        index: prev_phl_index,
                        price: prev_phl,
                    }
                } else if (candle.close > temp_high) {
                    temp_break = BREAK_UP
                    state = 1

                    bos = candle.high
                    bos_index = i
                    bull_phl = bos
                    bull_phl_index = i

                    prev_phl = temp_low
                    prev_phl_index = temp_low_index

                    mentStructureData[index++] = {
                        // time: candle.time,
                        time: candleData[prev_phl_index].time,
                        current_time: candleData[prev_phl_index].time,
                        type: 'phl',
                        index: prev_phl_index,
                        price: prev_phl,
                    }
                } else {
                    if (candle.high > temp_high) {
                        temp_high = candle.high
                        temp_high_index = i
                    }
                    if (candle.low < temp_low) {
                        temp_low = candle.low
                        temp_low_index = i
                    }
                }
            } else if (state === 1) {
                let prev_candle = candleData[i - 1]

                if (temp_break === BREAK_DOWN) {
                    if (!pullback) {
                        if (bos && candle.low < bos) {
                            bos = candle.low
                            bear_phl = bos
                            bos_index = i
                            bear_phl_index = i
                        }
                    }

                    if (candle.close < prev_candle.low) {
                        bear_phl = candle.low
                        bear_phl_index = i
                    }
                    if (candle.low < bear_phl) {
                        bear_phl = candle.low
                        bear_phl_index = i
                    }

                    if (candle.close > prev_candle.high ||
                        (pullback && candle.high > bull_phl)) {
                        pullback = true
                        bull_phl = candle.high
                        bull_phl_index = i
                    }

                    if (pullback && candle.close < bos) {
                        if (bos_index === bull_phl_index) {
                            mentStructureData[index++] = {
                                time: candleData[bos_index].time,
                                current_time: candleData[bos_index].time,
                                type: 'bos_phl',
                                index: bos_index,
                                price_bos: candleData[bos_index].low,
                                price_phl: candleData[bull_phl_index].high,
                                time_to: candle.time,
                                protected: 'high',
                            }
                        } else {
                            if (bos_index === mentStructureData[index - 1].index) {
                                mentStructureData[index - 1].type = 'bos_phl'
                                mentStructureData[index - 1].price_bos = candleData[bos_index].low
                                mentStructureData[index - 1].price_phl = mentStructureData[index - 1].price
                                mentStructureData[index - 1].price = null
                                mentStructureData[index - 1].time_to = candle.time
                            } else {
                                mentStructureData[index++] = {
                                    time: candleData[bos_index].time,
                                    current_time: candleData[bos_index].time,
                                    type: 'bos',
                                    index: bos_index,
                                    price: candleData[bos_index].low,
                                    time_to: candle.time,
                                }
                            }


                            mentStructureData[index++] = {
                                time: candleData[bull_phl_index].time,
                                current_time: candleData[bull_phl_index].time,
                                type: 'phl',
                                index: bull_phl_index,
                                price: candleData[bull_phl_index].high,
                                protected: 'high'
                            }
                        }

                        temp_break = BREAK_DOWN
                        pullback = false
                        prev_phl = bull_phl
                        prev_phl_index = bull_phl_index

                        bos = candle.low
                        bos_index = i
                        bear_phl = bos
                        bear_phl_index = i
                    } else if (candle.close > prev_phl) {
                        if (mentStructureData[index - 1].type === 'phl_bos') {
                            mentStructureData[index - 1].phl_time_to = candleData[i].time
                        } else {
                            mentStructureData[index - 1].time_to = candle.time
                        }

                        if (bear_phl_index === mentStructureData[index - 1].index) {
                            mentStructureData[index - 1].type = 'phl_bos'
                            mentStructureData[index - 1].price_bos = mentStructureData[index - 1].price
                            mentStructureData[index - 1].price_phl = candleData[bear_phl_index].low
                            mentStructureData[index - 1].price = null
                            mentStructureData[index - 1].protected = 'low'
                            mentStructureData[index - 1].bos_time_to = candle.time
                        } else {
                            mentStructureData[index++] = {
                                time: candleData[bear_phl_index].time,
                                current_time: candleData[bear_phl_index].time,
                                type: 'phl',
                                index: bear_phl_index,
                                price: candleData[bear_phl_index].low,
                                protected: 'low'
                            }
                        }

                        temp_break = BREAK_UP
                        pullback = false
                        prev_phl = bear_phl
                        prev_phl_index = bear_phl_index
                        bos = candle.high
                        bos_index = i
                        bull_phl = bos
                        bull_phl_index = i
                    }
                } else if (temp_break === BREAK_UP) {
                    if (!pullback) {
                        if (bos && candle.high > bos) {
                            bos = candle.high
                            bos_index = i
                            bull_phl = bos
                            bull_phl_index = i
                        }
                    }

                    if (candle.close > prev_candle.high) {
                        bull_phl = candle.high
                        bull_phl_index = i
                    }
                    if (candle.high > bull_phl) {
                        bull_phl = candle.high
                        bull_phl_index = i
                    }

                    if (candle.close < prev_candle.low ||
                        (pullback && candle.low < bear_phl)) {
                        pullback = true
                        bear_phl = candle.low
                        bear_phl_index = i
                    }

                    if (pullback && candle.close > bos) {
                        if (bos_index === bear_phl_index) {
                            mentStructureData[index++] = {
                                time: candleData[bos_index].time,
                                current_time: candleData[bos_index].time,
                                type: 'bos_phl',
                                inddex: bos_index,
                                price_bos: candleData[bos_index].high,
                                price_phl: candleData[bear_phl_index].low,
                                time_to: candle.time,
                                protected: 'low',
                            }
                        } else {
                            if (bos_index === mentStructureData[index - 1].index) {
                                mentStructureData[index - 1].type = 'bos_phl'
                                mentStructureData[index - 1].price_bos = candleData[bos_index].low
                                mentStructureData[index - 1].price_phl = mentStructureData[index - 1].price
                                mentStructureData[index - 1].price = null
                                mentStructureData[index - 1].time_to = candle.time
                            } else {
                                mentStructureData[index++] = {
                                    time: candleData[bos_index].time,
                                    current_time: candleData[bos_index].time,
                                    type: 'bos',
                                    inddex: bos_index,
                                    price: candleData[bos_index].high,
                                    time_to: candle.time,
                                }
                            }

                            mentStructureData[index++] = {
                                time: candleData[bear_phl_index].time,
                                current_time: candleData[bear_phl_index].time,
                                type: 'phl',
                                index: bear_phl_index,
                                price: candleData[bear_phl_index].low,
                                protected: 'low'
                            }
                        }

                        temp_break = BREAK_UP
                        pullback = false
                        prev_phl = bear_phl
                        prev_phl_index = bear_phl_index

                        bos = candle.high
                        bos_index = i
                        bull_phl = bos
                        bull_phl_index = i
                    } else if (candle.close < prev_phl) {
                        if (mentStructureData[index - 1].type === 'phl_bos') {
                            mentStructureData[index - 1].phl_time_to = candleData[i].time
                        } else {
                            mentStructureData[index - 1].time_to = candle.time
                        }

                        if (bull_phl_index === mentStructureData[index - 1].index) {
                            mentStructureData[index - 1].type = 'phl_bos'
                            mentStructureData[index - 1].price_bos = mentStructureData[index - 1].price
                            mentStructureData[index - 1].price_phl = candleData[bull_phl_index].high
                            mentStructureData[index - 1].price = null
                            mentStructureData[index - 1].protected = 'high'
                            mentStructureData[index - 1].bos_time_to = candleData[i].time
                        } else {
                            mentStructureData[index++] = {
                                time: candleData[bull_phl_index].time,
                                current_time: candleData[bull_phl_index].time,
                                type: 'phl',
                                index: bull_phl_index,
                                price: candleData[bull_phl_index].high,
                                protected: 'high'
                            }
                        }

                        temp_break = BREAK_DOWN
                        pullback = false
                        prev_phl = bull_phl
                        prev_phl_index = bull_phl_index
                        bos = candle.low
                        bos_index = i
                        bear_phl = bos
                        bear_phl_index = i
                    }
                }
            }
        }

        this.data = mentStructureData
    }

    public drawSeries(ctx: any, priceToCoordinate: any): void {
        const bars = this.seriesData.bars.map((bar: any) => {
            const valueY = priceToCoordinate(bar.originalData.price) ?? 0

            return {
                time: bar.originalData.current_time,
                x: bar.x,
                y: valueY,
                type: bar.originalData.type,
                protected: bar.originalData.protected,
            }
        })

        let visibleRange = this.seriesData.visibleRange
        let visibleRangeFrom = visibleRange.from - 2 < 0 ? 0 : visibleRange.from - 2

        let visibleCandle = []
        for (let i = visibleRangeFrom; i < visibleRange.to; i++) {
            const bar = bars[i]
            if (this.visibleTimeLimit && bar.time > this.visibleTimeLimit!) break
            visibleCandle.push(bar)

            if (bar) {
                ctx.strokeStyle = this.seriesOptions.color || '#000'

                if (i === bars.length - 2) {
                    let time = bars[bars.length - 1].time
                    let x2 = this.lightweightChart.timeScale().timeToNearestCoordinate(time)

                    ctx.beginPath()
                    ctx.moveTo(bar.x, bar.y)
                    ctx.lineTo(x2, bar.y)
                    ctx.stroke()
                }

                let timeTo = this.seriesData.bars[i].originalData.time_to

                if (bar.type === 'phl_bos') {
                    let y1 = priceToCoordinate(this.seriesData.bars[i].originalData.price_bos)
                    let y2 = priceToCoordinate(this.seriesData.bars[i].originalData.price_phl)

                    let timeScale = this.lightweightChart.timeScale()
                    let bosTimeToX = timeScale.timeToNearestCoordinate(this.seriesData.bars[i].originalData.bos_time_to)
                    let phlTimeToX
                    if (this.seriesData.bars[i].originalData.phl_time_to) {
                        phlTimeToX = timeScale.timeToNearestCoordinate(this.seriesData.bars[i].originalData.phl_time_to)
                    } else if (i < bars.length - 3) {
                        phlTimeToX = timeScale.timeToNearestCoordinate(this.seriesData.bars[i + 2].originalData.current_time)
                    } else { }

                    ctx.beginPath()
                    ctx.moveTo(bar.x, y1)
                    ctx.lineTo(bosTimeToX, y1)
                    ctx.stroke()

                    ctx.beginPath()
                    ctx.moveTo(bar.x, y2)
                    ctx.lineTo(phlTimeToX, y2)
                    ctx.stroke()

                    if (!this.seriesData.bars[i].originalData.phl_time_to) {
                        ctx.beginPath()
                        ctx.moveTo(phlTimeToX, y2)
                        ctx.lineTo(phlTimeToX, bars[i + 2].y)
                        ctx.stroke()
                    }
                }

                if (bar.type === 'bos_phl') {

                    let y1 = priceToCoordinate(this.seriesData.bars[i].originalData.price_bos)
                    let y2 = priceToCoordinate(this.seriesData.bars[i].originalData.price_phl)

                    if (timeTo) {
                        let x2 = this.lightweightChart.timeScale().timeToNearestCoordinate(this.seriesData.bars[i].originalData.time_to)

                        ctx.beginPath()
                        ctx.moveTo(bar.x, y1)
                        ctx.lineTo(x2, y1)
                        ctx.stroke()
                    } else {
                        ctx.beginPath()
                        ctx.moveTo(bar.x, y1)
                        ctx.lineTo(bar.x + 50, y1)
                        ctx.stroke()
                    }

                    let nextBar
                    let protection = bar.protected
                    if (i < bars.length - 2 && bars[i + 1].type === 'bos' &&
                        bars[i + 2].type === 'phl' &&
                        bars[i + 2].protected === protection) {
                        nextBar = bars[i + 2]
                    }

                    if (i < bars.length - 1 && bars[i + 1].type === 'bos_phl' &&
                        bars[i + 1].protected === protection) {
                        nextBar = bars[i + 1]
                    }

                    if (i < bars.length - 1 && bars[i + 1].type === 'phl' &&
                        bars[i + 1].protected === protection) {
                        nextBar = bars[i + 1]
                    }

                    if (nextBar) {
                        let nextBarTime = nextBar.time
                        let nextBarX = this.lightweightChart.timeScale().timeToNearestCoordinate(nextBarTime)

                        let nextBarY
                        if (nextBar.type === 'bos_phl') {
                            nextBarY = priceToCoordinate(this.seriesData.bars[i + 1].originalData.price_phl)
                        }

                        ctx.beginPath()
                        ctx.moveTo(bar.x, y2)
                        ctx.lineTo(nextBarX, y2)
                        ctx.stroke()

                        ctx.beginPath()
                        ctx.moveTo(nextBarX, y2)
                        if (nextBarY) {
                            ctx.lineTo(nextBarX, nextBarY)
                        } else {
                            ctx.lineTo(nextBarX, nextBar.y)
                        }
                        ctx.stroke()
                    } else {
                        ctx.beginPath()
                        ctx.moveTo(bar.x, y2)
                        ctx.lineTo(bar.x + 50, y2)
                        ctx.stroke()
                    }

                    continue
                }

                if (timeTo && bar.type !== 'bos_phl') {
                    if (this.visibleTimeLimit && timeTo >= this.visibleTimeLimit) timeTo = this.visibleTimeLimit
                    let x2 = this.lightweightChart.timeScale().timeToNearestCoordinate(timeTo)

                    let startBarX = isNaN(bar.x) || bar.x == null || bar.x < 0 ? 0 : bar.x

                    ctx.beginPath()
                    ctx.moveTo(startBarX, bar.y)
                    ctx.lineTo(x2, bar.y)
                    ctx.stroke()
                } else if (bar.type == 'phl' || bar.type === 'bos_phl') {

                    let nextBar

                    let protection = bar.protected
                    if (i <= bars.length - 3 && bars[i + 1].type === 'bos' &&
                        bars[i + 2].type === 'phl' && bars[i + 2].protected === protection) {
                        nextBar = bars[i + 2]
                    }

                    let bosPhlType = -1
                    if (i < bars.length - 3 && bars[i + 1].type === 'bos' &&
                        bars[i + 2].type === 'phl_bos' && bars[i + 2].protected !== protection) {
                        bosPhlType = 3
                        nextBar = bars[i + 2]
                    }

                    if (i < bars.length - 2 && (bars[i + 1].type === 'bos_phl') &&
                        bars[i + 1].protected === protection) {
                        nextBar = bars[i + 1]
                        bosPhlType = 1
                    }

                    if (i < bars.length - 3 && bars[i + 1].type === 'bos' &&
                        bars[i + 2].type === 'bos_phl') {
                        nextBar = bars[i + 2]
                        bosPhlType = 2
                    }

                    if (nextBar) {
                        let nextBarTime = nextBar.time
                        if (this.visibleTimeLimit && nextBarTime >= this.visibleTimeLimit) {
                            nextBarTime = this.visibleTimeLimit
                        }
                        let nextBarX = this.lightweightChart.timeScale().timeToNearestCoordinate(nextBarTime)

                        let nextBarY
                        if (bosPhlType === 1) {
                            nextBarY = priceToCoordinate(this.seriesData.bars[i + 1].originalData.price_phl)
                        } else if (bosPhlType === 2) {
                            nextBarY = priceToCoordinate(this.seriesData.bars[i + 2].originalData.price_phl)
                        } else if (bosPhlType === 3) {
                            nextBarY = priceToCoordinate(this.seriesData.bars[i + 2].originalData.price_bos)
                        }


                        let startBarX = isNaN(bar.x) || bar.x == null || bar.x < 0 ? 0 : bar.x

                        ctx.beginPath()
                        ctx.moveTo(startBarX, bar.y)
                        ctx.lineTo(nextBarX, bar.y)
                        ctx.stroke()

                        if (!(this.visibleTimeLimit && nextBarTime >= this.visibleTimeLimit)) {
                            ctx.beginPath()
                            ctx.moveTo(nextBarX, bar.y)
                            if (nextBarY) {
                                ctx.lineTo(nextBarX, nextBarY)
                            } else {
                                ctx.lineTo(nextBarX, nextBar.y)
                            }
                            ctx.stroke()
                        }
                    } else {
                        ctx.beginPath()
                        ctx.moveTo(bar.x, bar.y)
                        ctx.lineTo(bar.x + 50, bar.y)
                        ctx.stroke()
                    }
                }
            }

            if (i >= visibleRange.from && i <= visibleRange.to && false) {
                let candleData = this.chartFrame.getVisibleData()

                // ctx.strokeStyle = '#f00'
                let timeScale = this.lightweightChart.timeScale()
                let lastCandle = candleData[candleData.length - 1]
                let lastCandleX = timeScale.timeToNearestCoordinate(lastCandle.time)

                let lastBarOriginal = this.seriesData.bars[this.seriesData.bars.length - 1].originalData
                let lastBar = bars[bars.length - 1]
                ctx.beginPath()
                ctx.moveTo(lastBar.x, lastBar.y)
                ctx.lineTo(lastCandleX, lastBar.y)
                ctx.stroke()

                let highestCandle = candleData[lastBarOriginal.index]
                let lowestCandle = candleData[lastBarOriginal.index]

                for (let i = lastBarOriginal.index + 1; i < candleData.length; i++) {
                    let candle = candleData[i]
                    if (candle.high >= highestCandle.high) highestCandle = candle
                    if (candle.low <= lowestCandle.low) lowestCandle = candle
                }

                let highestCandleX = timeScale.timeToNearestCoordinate(highestCandle.time)
                let highestCandleY = priceToCoordinate(highestCandle.high)

                let lowestCandleX = timeScale.timeToNearestCoordinate(lowestCandle.time)
                let lowsatCandleY = priceToCoordinate(lowestCandle.low)

                if (lastBar.y != highestCandleY) {
                    ctx.beginPath()
                    ctx.moveTo(highestCandleX, highestCandleY)
                    ctx.lineTo(lastCandleX, highestCandleY)
                    ctx.stroke()
                }

                if (lastBar.y != lowsatCandleY) {
                    ctx.beginPath()
                    ctx.moveTo(lowestCandleX, lowsatCandleY)
                    ctx.lineTo(lastCandleX, lowsatCandleY)
                    ctx.stroke()
                }

            }
        }
    }
}

export { MentStructure }