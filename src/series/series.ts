import { CandleData } from "../datafeed";
import { SeriesRenderer } from "./series-renderer";

type SeriesData = {
    time: number
}

class Series {
    private seriesRenderer: SeriesRenderer | null = null

    constructor(seriesRenderer: SeriesRenderer | null) {
        this.seriesRenderer = seriesRenderer
    }

    public renderer(): SeriesRenderer | null {
        return this.seriesRenderer
    }

    public update(data: Array<SeriesData>, seriesOptions: any): void {
        this.seriesRenderer!.update(data, seriesOptions)
    }

    public priceValueBuilder(plotRow: any) {
        return this.seriesRenderer!.priceBuilder(plotRow)
    }

    public isWhitespace(data: SeriesData): boolean {
        return data.time === undefined
    }

    public defaultOptions(): any {
        return {}
    }
}

export { Series, SeriesData }