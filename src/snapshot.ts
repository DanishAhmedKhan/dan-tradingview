import { svg } from "./helper/svg"

declare global {
    interface Window {
        html2canvas: any;
    }
}

class Snapshot {

    private parentHtmlElement: HTMLElement
    private snapshotHtmlElement: HTMLElement | null = null

    constructor(parentHtmlElement: HTMLElement) {
        this.parentHtmlElement = parentHtmlElement
        this.addHtml()
        this.addClickListener()
    }

    public addHtml() {
        let html = (`
            <div class="header_right_item snapshot_main">
                <div class="container">
                    <div class="icon">${svg.snapshot}</div>
                    <div class="text"></div>
                </div>
            </div>
        `)

        this.parentHtmlElement.insertAdjacentHTML('afterbegin', html)
        this.snapshotHtmlElement = this.parentHtmlElement.querySelector('.snapshot_main')
    }

    public addClickListener() {
        this.snapshotHtmlElement?.addEventListener('click', async (event) => {
            const div = document.querySelector(".chart_frame_main_wrapper")

            const canvas = await html2canvas(div, { backgroundColor: null })

            canvas.toBlob(async function (blob: any) {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ "image/png": blob })
                    ])
                } catch (err) {
                    console.error("Clipboard write failed:", err)
                    alert("Failed to copy image. Make sure you're in a secure context (HTTPS) and using a supported browser.")
                }
            }, "image/png")
        })
    }

}

export { Snapshot }