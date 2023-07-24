const enum TimeframeUnit {
    MINUTE = "M",
    HOUR = "H",
    DAY = "D"
}

class Timeframe {

    public static readonly ALL_TIMEFRAME: Array<Timeframe> = [
        new Timeframe(TimeframeUnit.MINUTE, 1),
        new Timeframe(TimeframeUnit.MINUTE, 2),
        new Timeframe(TimeframeUnit.MINUTE, 3),
        new Timeframe(TimeframeUnit.MINUTE, 5),
        new Timeframe(TimeframeUnit.MINUTE, 10),
        new Timeframe(TimeframeUnit.MINUTE, 15),
        new Timeframe(TimeframeUnit.MINUTE, 20),
        new Timeframe(TimeframeUnit.MINUTE, 30),
        new Timeframe(TimeframeUnit.HOUR, 1),
        new Timeframe(TimeframeUnit.HOUR, 2),
        new Timeframe(TimeframeUnit.HOUR, 4),
        new Timeframe(TimeframeUnit.HOUR, 6),
        new Timeframe(TimeframeUnit.DAY, 1),
    ]

    public static readonly DEFAULT_TIMEFRAME = new Timeframe(TimeframeUnit.MINUTE, 1)

    private unit: TimeframeUnit
    private value: number

    constructor(unit: TimeframeUnit, value: number) {
        this.unit = unit
        this.value = value
    }

    public getUnit(): string {
        return this.unit
    }

    public setUnit(unit: TimeframeUnit): void {
        this.unit = unit
    }

    public getValue(): number {
        return this.value
    }

    public setValue(value: number): void {
        this.value = value
    }

    public getTimeframe(): { unit: string, value: number } {
        return {
            unit: this.unit,
            value: this.value,
        }
    }

    public getReadableTimeframe(): string {
        let unit = this.unit == TimeframeUnit.MINUTE ? '' :
            this.unit.toLowerCase()
        
        return this.value + unit
    }

    public getTimeframeString(): string {
        return `${this.unit}${this.value}`
    }
}

export { Timeframe, TimeframeUnit }