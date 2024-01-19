import { ChartFrameManager } from "./ChartFrameManager"
import { svg } from "./helper/svg"

class Calendar {

    private calendarLogoHtmlElement: HTMLElement | null = null
    private calendarHTMLInputElement: HTMLInputElement | null = null

    private chartFrameManager: ChartFrameManager

    private currentDate: string = ''

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

        this.calendarLogoHtmlElement =
            htmlElement.querySelector('.go_to_date_calendar .logo')

        if (!this.calendarLogoHtmlElement) {
            htmlElement.insertAdjacentHTML('beforeend', html)
            this.calendarLogoHtmlElement =
                htmlElement.querySelector('.go_to_date_calendar .logo')
            this.calendarHTMLInputElement =
                htmlElement.querySelector('.go_to_date_calendar input')
        }
    }

    public setCalendarDate(ticker: string, date: string): void {
        localStorage.setItem(`date-${ticker}`, date)
    }

    public getCalendarDate(ticker: string): string {
        let date = localStorage.getItem(`date-${ticker}`) || ''
        return date
    }

    public addGoToDateCalendarListener(): void {
        this.calendarLogoHtmlElement!.onclick = (event) => {
            this.calendarHTMLInputElement!.click()
        }

        this.calendarHTMLInputElement!.onchange = (event) => {
            let dateValue = this.calendarHTMLInputElement!.value
            console.log('dv', dateValue)

            let ticker = this.chartFrameManager.getActiveChartFrame().getTicker().getTicker()
            localStorage.setItem(`date-${ticker}`, dateValue)

            this.setChartDate(dateValue)
        }
    }

    public setChartDate(dateValue: string | null = null, isTimestamp: boolean = true): void {
        if (!dateValue) {
            let ticker = this.chartFrameManager.getActiveChartFrame().getTicker().getTicker()
            dateValue = localStorage.getItem(`date-${ticker}`) || ''
            console.log('datevalue', dateValue)

            if (dateValue.includes('+')) {
                dateValue = dateValue.substring(0, dateValue.indexOf('+'))
            }
            this.calendarHTMLInputElement!.value = dateValue
        }

        if (dateValue === '') {
            let today = new Date()
            let dd = String(today.getDate()).padStart(2, '0')
            let mm = String(today.getMonth() + 1).padStart(2, '0')
            let yyyy = today.getFullYear()

            dateValue = yyyy + '-' + mm + '-' + dd
        }

        let date = new Date(dateValue)
        let timestamp = +date / 1000

        let year = new Date(date.getFullYear(), 0, 1)
        let days = Math.floor((+date - +year) / (24 * 60 * 60 * 1000))
        let week = Math.ceil((date.getDay() + 1 + days) / 7)
        let filename = date.getFullYear() + '-' + week
        console.log('filename', filename)

        let activeChartFrame = this.chartFrameManager.getActiveChartFrame()
        activeChartFrame.setIsDataLoaded(false)
        activeChartFrame.setDate(filename)
        if (isTimestamp) {
            activeChartFrame.displayChart(timestamp)
        } else {
            activeChartFrame.displayChart(timestamp)
        }

    }

}

export { Calendar }