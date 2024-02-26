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
        this.snapshotHtmlElement?.addEventListener('click', event => {
            window.html2canvas(document.body).then((canvas: any) => {

                canvas.toBlob(async function (blob: any) {
                    const formData = new FormData()
                    formData.append('file', blob, 'trading.png')
                    formData.append('upload_preset', 'danish_trading')
                    formData.append('cloud_name', 'dp0kx2htu')

                    const res = await fetch('https://api.cloudinary.com/v1_1/dp0kx2htu/image/upload', {
                        method: 'POST',
                        body: formData
                    })

                    let cloudData = await res.json()
                    navigator.clipboard.writeText(cloudData.url)
                })
            })
        })
    }

}

export { Snapshot }