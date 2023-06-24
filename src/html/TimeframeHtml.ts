import ChartMain from "../ChartMain"
import { Timeframe, TimeframeUnit } from "../Timeframe"

class TimeframeHtml {

    private readonly TIMEFRAME_ITEM = 'timeframe_item'
    private readonly TIMEFRAME_ITEM_SELECTED = 'timeframe_item_selected'

    private chartMain
    private $chartMain
    private chartFrame

    constructor(chartMain: ChartMain) {
        this.chartMain = chartMain
        this.$chartMain = this.chartMain.getChartMainElement()
        this.chartFrame = this.chartMain.getChartFrameManager().getActiveChartFrame()
    }

    public getHtml(): string {
        return Timeframe.ALL_TIMEFRAME.reduce((acc, timeframe) => {
            let selectedClass =  ""

            let timeframeStr = timeframe.getTimeframeString()
            let unit = timeframe.getUnit()
            let value = timeframe.getValue()

            if (this.chartFrame.getTimeframe().getUnit() === unit &&
                this.chartFrame.getTimeframe().getValue() === value)
                selectedClass = this.TIMEFRAME_ITEM_SELECTED

            return (acc += `
                <div class="${this.TIMEFRAME_ITEM} ${selectedClass}" data-unit="${unit}" data-value="${value}">
                    ${timeframeStr}
                </div>
            `)
        }, "")
    }

    public addChangeListener(): void {
        let $timeframeItem = this.$chartMain.querySelectorAll(
            `.header .${this.TIMEFRAME_ITEM}`
        )

        $timeframeItem.forEach(($tf) => {
            $tf.addEventListener("click", (e) => {
                $timeframeItem.forEach(($t) =>
                    $t.classList.remove(this.TIMEFRAME_ITEM_SELECTED)
                )
                $tf.classList.add(this.TIMEFRAME_ITEM_SELECTED)

                let unit: string = $tf.getAttribute("data-unit")!
                let value: string = $tf.getAttribute("data-value")!
                let timeframe = new Timeframe(
                    <TimeframeUnit>unit, 
                    Number(value)
                )
                this.chartFrame.setTimeframe(timeframe)
            })
        })
    }
}

export { TimeframeHtml }