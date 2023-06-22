import { HorizontalLine } from "./HorizontalLine"

class HorizontalLineHtml {

    private readonly TOOL_HORIZONTAL_LINE = 'tool-horizontal-line'

    private isActive: boolean
    private $tool: HTMLDListElement | null

    constructor() {
        this.isActive = false
        this.$tool = null
    }

    public getHtml(): string {
        return `
            <div class="tool-item ${this.TOOL_HORIZONTAL_LINE}">
                <div class="tool-logo">-</div>
            </div>
        `
    }

    public addClickListener($toolBox: HTMLDivElement): void {
        this.$tool = $toolBox.querySelector(`.${this.TOOL_HORIZONTAL_LINE}`)!
        
        this.$tool.addEventListener('click', e => {

        })
    }

    private makeSelected() {

    }
}

export { HorizontalLineHtml }