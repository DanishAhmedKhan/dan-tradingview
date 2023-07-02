import { svg } from "../helper/svg"

type Widget = {
    name: string,
    svg: string,
    callback: Function,
}

class Toolbar {
    private x: number
    private y: number

    private widgets: Array<Widget> = []

    private toolbarHtmlElement: HTMLDivElement | null = null

    constructor(x: number, y: number) {
        this.x = x
        this.y = y

        this.add()
        this.setPosition(this.x, this.y)
        this.draggable()
    }

    public setWidget(widgets: Array<Widget>): void {
        this.widgets = widgets
        this.addWidgetHtml()
        this.show()
    }

    public hide(): void {
        if (this.toolbarHtmlElement)
            this.toolbarHtmlElement.style.display = 'none'
    }

    public show(): void {
        if (this.toolbarHtmlElement)
            this.toolbarHtmlElement.style.display = 'block'
    }

    public setPosition(x: number, y: number) {
        if (this.toolbarHtmlElement) {
            this.toolbarHtmlElement.style.left = x + 'px'
            this.toolbarHtmlElement.style.top = y + 'px'
        }
    }

    private getWidgetItemsHtml(): string {
        return this.widgets.reduce((acc, w) => {
            return acc += (`
                <div class="dtv_toolbar_widget_item" data-widget-name="${w.name}">
                    <span>${w.svg}</span>
                </div>
            `)
        }, "")
    }

    public addWidgetHtml(): void {
        let widgetHtml = this.getWidgetItemsHtml()

        if (this.toolbarHtmlElement) {
            this.toolbarHtmlElement.querySelector('.dtv_toolbar_widget_list')!.innerHTML = widgetHtml
            

            let widgetItemsHtmlElement: NodeListOf<HTMLDivElement> = 
                this.toolbarHtmlElement.querySelectorAll('.dtv_toolbar_widget_item')
            widgetItemsHtmlElement.forEach((htmlElement, index) => {
                htmlElement.onclick = (e: any) => {
                    if (this.widgets[index].callback) {
                        this.widgets[index].callback()
                    }
                }
            })
        }
    }

    public add(): void {
        let toolbarHtml = (`
            <div class="dtv_toolbar_item">
                <div class="dtv_toolbar_wrapper">
                    <div class="dtv_toolbar_drag">
                        <span>${svg.drag}</span>
                    </div>
                    <div class="dtv_toolbar_widget_list">
                    </div>
                </div>
            </div>
        `)

        let toolbarCanvasHtmlElement = document.querySelector('.chart_main_wrapper .chart_main_toolbar_canvas')!
        toolbarCanvasHtmlElement.insertAdjacentHTML('beforeend', toolbarHtml)
        this.toolbarHtmlElement = toolbarCanvasHtmlElement.lastElementChild as HTMLDivElement
    }

    public remove(): void {
        if (this.toolbarHtmlElement) {
            this.toolbarHtmlElement.remove()
        }
    }

    private draggable(): void {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const dragMouseDown = (e: any) => {
            e.stopPropagation()
            e.preventDefault()
            
            pos3 = e.clientX
            pos4 = e.clientY

            document.onmouseup = closeDragElement
            document.onmousemove = elementDrag
        }

        const elementDrag = (e: any) => {
            e.stopPropagation()
            e.preventDefault()
            
            pos1 = pos3 - e.clientX
            pos2 = pos4 - e.clientY
            pos3 = e.clientX
            pos4 = e.clientY
            
            if (this.toolbarHtmlElement) {
                this.toolbarHtmlElement.style.top = 
                    (this.toolbarHtmlElement.offsetTop - pos2) + "px";
                this.toolbarHtmlElement.style.left = 
                    (this.toolbarHtmlElement.offsetLeft - pos1) + "px";
            }
        }

        const closeDragElement = (event: any) => {
            document.onmouseup = null
            document.onmousemove = null
        }

        let dragHandleHtmlElement = this.toolbarHtmlElement?.querySelector('.dtv_toolbar_drag') as HTMLDivElement
        dragHandleHtmlElement.onmousedown = dragMouseDown;
    }
}

export { Toolbar }