import { ChartFrameManager } from "./ChartFrameManager"
import { svg } from "./helper/svg"

class Calendar {

    private calendarLogoHtmlElement: HTMLElement | null = null
    private calendarHTMLInputElement: HTMLInputElement | null = null

    private chartFrameManager: ChartFrameManager

    constructor(htmlElement: HTMLElement, chartFrameManager: ChartFrameManager) {
        this.addGoToDateCalendarHtml(htmlElement)
        this.addGoToDateCalendarListener()
        this.chartFrameManager = chartFrameManager
    }

    public addGoToDateCalendarHtml(htmlElement: HTMLElement): void {
        let todayDate = new Date()

        let month = todayDate.getMonth() + 1
        let day = todayDate.getDate()
        let year = todayDate.getFullYear()

        let m = month < 10 ? '0' + month.toString() : month
        let d = day < 10 ? '0' + day.toString() : day

        let maxDate = year + '-' + m + '-' + d;

        let html: string = (`
            <div class="go_to_date_calendar">
                <div class="logo">${svg.calendar}</div>
                <input type="date" max="${maxDate}">
            </div>
        `)

        htmlElement.insertAdjacentHTML('beforeend', html)
        this.calendarLogoHtmlElement = 
            htmlElement.querySelector('.go_to_date_calendar .logo') as HTMLElement
        this.calendarHTMLInputElement = 
            htmlElement.querySelector('.go_to_date_calendar input') as HTMLInputElement
    }

    public addGoToDateCalendarListener(): void {
        this.calendarLogoHtmlElement!.onclick = (event) => {
            this.calendarHTMLInputElement!.click()

        }

        this.calendarHTMLInputElement!.onchange = (event) => {
            let dateValue = this.calendarHTMLInputElement!.value
            let date = new Date(dateValue)
            let timestamp = +date / 1000

            let year = new Date(date.getFullYear(), 0, 1)
            let days = Math.floor((+date - +year) / (24 * 60 * 60 * 1000))
            let week = Math.ceil((date.getDay() + 1 + days) / 7)
            let filename = date.getFullYear() + '-' + week

            let activeChartFrame = this.chartFrameManager.getActiveChartFrame()
            activeChartFrame.setIsDataLoaded(false)
            activeChartFrame.setDate(filename)
            activeChartFrame.displayChart(timestamp)

            console.log(date, filename, timestamp)
        }
    }

}

export { Calendar }