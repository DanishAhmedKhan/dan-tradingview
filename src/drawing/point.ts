type SimplePoint = {
    x: number | null,
    y: number | null,
}

class Point {
    private time: number | null = null
    private price: number | null = null

    private x: number | null = null
    private y: number | null = null

    private readonly chartRefenrence: any

    constructor(time: number | null, price: number | null, chartRefenrence: any, flag: boolean = false) {
        if (flag) {
            this.x = time
            this.y = price

            if (time != null) {
                this.time = chartRefenrence.chart.timeScale().coordinateToTime(time)
                this.price = chartRefenrence.series.coordinateToPrice(price)
            }
        } else {
            this.time = time
            this.price = price

            if (time !== null)
                this.x = Point.xCoord(time, chartRefenrence) as number
            if (price !== null)
                this.y = Point.yCoord(price, chartRefenrence) as number
        }

        this.chartRefenrence = chartRefenrence
    }

    public getX(): number | null {
        return this.x
    }

    public setX(x: number): void {
        this.x = x
    }

    public getY(): number | null {
        return this.y
    }

    public setY(y: number): void {
        this.y = y
    }

    public get(): SimplePoint {
        return {
            x: this.x,
            y: this.y
        }
    }

    public set(point: SimplePoint) {
        this.x = point.x
        this.y = point.y
    }

    public getTime(): number | null {
        return this.time
    }

    public getPrice(): number | null {
        return this.price
    }

    public update() {
        if (this.time !== null)
            this.x = Point.xCoord(this.time, this.chartRefenrence) as number
        if (this.price !== null)
            this.y = Point.yCoord(this.price, this.chartRefenrence) as number
    }

    public distanceSquare(x: number, y: number): number {
        return (this.x! - x) * (this.x! - x) + (this.y! - y) * (this.y! - y)
    }

    public distance(x: number, y: number): number {
        return Math.sqrt(this.distanceSquare(x, y))
    }

    public static xCoord(time: number, chartReference: any): number | null {
        return chartReference.chart.timeScale().timeToNearestCoordinate(time)
    }

    public static yCoord(price: number, chartReference: any): number | null {
        return chartReference.series.priceToCoordinate(price)
    }
}

export { SimplePoint, Point }