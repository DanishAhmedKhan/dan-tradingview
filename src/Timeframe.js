class Timeframe {
    static MINUTE = "M"
    static HOUR = "H"
    static DAY = "D"

    static ALL_TIMEFRAME = [
        new Timeframe(Timeframe.MINUTE, 1),
        new Timeframe(Timeframe.MINUTE, 2),
        new Timeframe(Timeframe.MINUTE, 3),
        new Timeframe(Timeframe.MINUTE, 5),
        new Timeframe(Timeframe.MINUTE, 10),
        new Timeframe(Timeframe.MINUTE, 15),
        new Timeframe(Timeframe.MINUTE, 20),
        new Timeframe(Timeframe.MINUTE, 30),
        new Timeframe(Timeframe.HOUR, 1),
        new Timeframe(Timeframe.HOUR, 2),
        new Timeframe(Timeframe.HOUR, 4),
        new Timeframe(Timeframe.HOUR, 6),
        new Timeframe(Timeframe.DAY, 1),
        new Timeframe(Timeframe.DAY, 3),
    ]

    frame
    value

    constructor(frame, value) {
        if (!frame && !value) {
            this.frame = "M"
            this.value = 1
        } else if (
            frame instanceof Object &&
            frame.hasOwbProperty("frame") &&
            frame.hasOwbProperty("value")
        ) {
            this.frame = frame.frame
            this.value = frame.value
        } else {
            this.frame = frame
            this.value = value
        }
    }

    printTimeframe() {
        console.log(`${value}${frame}`)
    }

    getFrame() {
        return this.frame
    }

    setFrame(frame) {
        this.frame = frame
    }

    getValue() {
        return this.value
    }

    setValue(value) {
        this.value = value
    }

    getTimeframe() {
        return {
            frame: this.frame,
            value: this.value,
        }
    }

    getTimeframeString() {
        return `${this.frame}${this.value}`
    }
}
