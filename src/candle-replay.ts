import { ChartFrameManager } from "./ChartFrameManager"
import { Toolbar } from "./drawing/toolbar"
import { svg } from "./helper/svg"

class CandleReplay {

    public isReplayMode: boolean = false
    public isReplayPressed: boolean = false
    public candleIndex: number = -1

    private chartFrameManager: ChartFrameManager

    private parentHtmlElement: HTMLElement
    private candleReplayHtmlElement: HTMLElement | null = null

    private toolbar: Toolbar

    public constructor(parentHtmlElement: HTMLElement, chartFrameManager: ChartFrameManager) {
        this.chartFrameManager = chartFrameManager
        this.parentHtmlElement = parentHtmlElement

        this.toolbar = new Toolbar('candle-replay')
        this.toolbar.setWidget([
            {
                name: 'play',
                svg: svg.play,
                callback: () => {
                    this.showNextCandle()
                }
            },
            {
                name: 'forward',
                svg: svg.forward,
                callback: () => {
                    const SKIP_COUNT = 5
                    for (let i = 0; i < SKIP_COUNT; i++) {
                        this.showNextCandle()
                    }
                }
            },
            {
                name: 'next',
                svg: svg.close,
                callback: () => { }
            },
        ])
        this.toolbar.hide()

        this.addHtml()
        this.addClickListener()
    }

    public addHtml() {
        let html = (`
            <div class="candle_replay_main">
                <div class="container">
                    <div class="icon">${svg.replay}</div>
                    <div class="text">Replay</div>
                </div>
            </div>
        `)

        this.parentHtmlElement.insertAdjacentHTML('afterbegin', html)
        this.candleReplayHtmlElement = this.parentHtmlElement.querySelector('.candle_replay_main')
    }

    public addClickListener(): void {
        this.candleReplayHtmlElement?.addEventListener('click', (event) => {
            this.isReplayPressed = true
        })
    }

    public handleChartMouseClick(event: any): void {
        this.isReplayPressed = false
        this.isReplayMode = true

        this.candleIndex = this.chartFrameManager.getActiveChartFrame().setReplayMode()
        this.addNextCandleKeyListener()
        this.toolbar.show()
    }

    public addNextCandleKeyListener(): void {
        document.onkeydown = (event: any) => {
            if (event.keyCode && event.keyCode === 39) {
                this.showNextCandle()
            }
        }
    }

    public showNextCandle(): void {
        this.chartFrameManager.getActiveChartFrame().displayNextCandle(this.candleIndex++)
    }

}

export { CandleReplay }