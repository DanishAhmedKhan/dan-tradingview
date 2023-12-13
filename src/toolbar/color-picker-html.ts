class ColorPickerHtml {

    public readonly PRIMARY_COLORS: Array<string> = [
        'rgb(255, 255, 255)',
        'rgb(209, 212, 220)',
        'rgb(178, 181, 190)',
        'rgb(149, 152, 161)',
        'rgb(120, 123, 134)',
        'rgb(93, 96, 107)',
        'rgb(67, 70, 81)',
        'rgb(42, 46, 57)',
        'rgb(19, 23, 34)',
        'rgb(0, 0, 0)',
        'rgb(242, 54, 69)',
        'rgb(255, 152, 0)',
        'rgb(255, 235, 59)',
        'rgb(76, 175, 80)',
        'rgb(8, 153, 129)',
        'rgb(0, 188, 212)',
        'rgb(41, 98, 255)',
        'rgb(103, 58, 183)',
        'rgb(156, 39, 176)',
        'rgb(233, 30, 99)',
    ]

    public readonly SECONDAY_COLORS = [
        'rgb(252, 203, 205)',
        '',
    ]

    private toolbarHtmlElement: HTMLElement
    private colorPickerHtmlElement: HTMLElement

    public constructor(toolbarHtmlElement: HTMLElement) {
        this.toolbarHtmlElement = toolbarHtmlElement

        this.addHtml()
    }

    public addHtml(): void {
        let colorWrapCount = 0
        let primaryColorHtml = '<div class="swatch_row">' +
            this.PRIMARY_COLORS.reduce((acc, color) => {
                colorWrapCount++
                if (colorWrapCount === 7) {
                    acc += (`
                    </div><div class="swatch_row">
                `)
                }

                acc += (`
                <button class="swatch-item" tabindex="-1" style="color: ${color};">
                </button>
            `)

                return acc
            }, '') + '</div>'

        let html = (`
            <div class="color_picker_main">
                <div class="container">
                    <div class="color_area">
                        <div class="swatch">
                            ${primaryColorHtml}
                        </div>
                    </div>
                    <div class="opacity_controller">
                        <div class="opacity_slider accessible" style="color: rgb(0, 0, 0);">
                            <div class="opacity_slider_gradient" style="background-image: linear-gradient(90deg, transparent, rgb(0, 0, 0));">
                            </div>
                            <div class="opacity_pointer_wrap">
                                <div class="pointer" style="left: 100%;"></div>
                            </div>
                        </div>
                        <div class="opacity_Input_wrap">
                            <input type="text" class="opacity_input" value="100">
                            <span class="opacity_input_percent">%</span>
                        </div>
                    </div>
                </div>
            </div>
        `)

        this.toolbarHtmlElement.innerHTML = html
        this.colorPickerHtmlElement = this.toolbarHtmlElement.querySelector('.color_picker_main')!
    }

}

export { ColorPickerHtml }