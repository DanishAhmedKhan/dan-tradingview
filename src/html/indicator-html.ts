import ChartMain from "../ChartMain"
import { svg } from "../helper/svg"

class IndicatorHtml {

    private readonly INDICATOR_WRAPPER_CLASS = 'indicator_wrapper'
    private readonly INDICATOR_POPUP_WRAPPER_CLASS = 'indicator_popup_wrapper'

    private chartMain: ChartMain
    private chartMainHtmlElement: HTMLElement

    constructor(chartMain: ChartMain) {
        this.chartMain = chartMain
        this.chartMainHtmlElement = this.chartMain.getChartMainHtmlElement()
    }

    public addHtml(containerHtmlElement: HTMLElement) {
        let indicatorHtml = (`
            <div class="${this.INDICATOR_WRAPPER_CLASS}">
                <div class="indicator">
                    <div class="logo">${svg.indicator}</div>
                    <div class="text">Indicator</div>
                </div>
            </div>
        `)

        containerHtmlElement.insertAdjacentHTML('afterbegin', indicatorHtml)

        let indicatorPopupHtml = (`
            <div class="${this.INDICATOR_POPUP_WRAPPER_CLASS}">
                <div class="indicator_popup">
                    <div class="header">
                        <div class="header_left">
                            <div class="title">Indicator</div>
                        </div>
                        <div class="header_right">
                            <div class="close">${svg.close}</div>
                        </div>
                    </div>
                    <div class="search">
                        <div class="logo">${svg.search}</div>
                        <input type="text" placeholder="Search">
                    </div>
                    <div class="main">
                        <div class="main_left">
                            <div class="">
                            </div>
                        </div>
                        <div class="main_right">
                        </div>
                    </div>
                </div>
            </div>
        `)

        document.querySelector('body')!.insertAdjacentHTML('afterbegin', indicatorPopupHtml)

        this.addClickListener()
    }

    public addClickListener(): void {
        let indicatorHtmlElement: HTMLElement = this.chartMainHtmlElement.querySelector('.indicator_wrapper .indicator')!
        let indicatorPopupHtmlElement: HTMLElement = document.querySelector('.indicator_popup_wrapper')!
        let closeIndicatorHtmlElement: HTMLElement = indicatorPopupHtmlElement.querySelector('.close')!

        indicatorHtmlElement.addEventListener('click', event => {
            indicatorPopupHtmlElement.style.display = 'block'
        })

        closeIndicatorHtmlElement.addEventListener('click', event => {
            indicatorPopupHtmlElement.style.display = 'none'
        })

        indicatorPopupHtmlElement.addEventListener('click', event => {
            event.stopPropagation()
            console.log('asdasdasd')

            // if (event.target!.classList.contains())
        })
    }
}

export { IndicatorHtml }