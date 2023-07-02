import { Tool } from "../tool/Tool"
import { Drawable } from "./drawable"
import { Toolbar } from "./toolbar"

abstract class Drawing<RendererDataType> implements Drawable {
    protected options: RendererDataType
    public toolbar: Toolbar

    constructor(options: RendererDataType) {
        this.options = options
        this.toolbar = new Toolbar(200, 200)
    }

    public getOptions(): RendererDataType {
        return this.options
    }

    public setOptions(options: RendererDataType): void {
        this.options = options
    }

    public getPaneView(): any {
        const renderer = {
            draw: (target: any) => {
                this.paint(target)
            }
        }
        const paneView = () => {
            return renderer
        }
        return { renderer: paneView }
    }

    public remove(): void {
        this.toolbar.remove()
    }

    public getToolbar(): Toolbar {
        return this.toolbar
    }

    public abstract update(): void

    public abstract paint(target: any): void 
}

export { Drawing }