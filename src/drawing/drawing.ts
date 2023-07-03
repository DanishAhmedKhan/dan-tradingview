import { Tool } from "../tool/Tool"
import { Drawable } from "./drawable"
import { Toolbar } from "./toolbar"

type Options = {
    id: string,
    visible: boolean,
}

abstract class Drawing<RendererDataType extends Options> implements Drawable {
    protected options: RendererDataType
    public toolbar: Toolbar

    protected visibleInCanvas: boolean = true
    protected hover: boolean = true

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
                let { _context: context, _bitmapSize: bitmapSize } = target

                if (!this.options ||
                    !this.options.visible ||
                    !this.isInView(bitmapSize)) {
                        return
                    }

                this.paint(context, bitmapSize)
                if (this.toolbar.isVisible() || this.hover) {
                    this.paintHover(context, bitmapSize)
                }
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

    public hitTest(x: number, y: number): any {
        this.hover = this.isHover(x, y)

        if (this.hover) {
            return {
                cursorStyle: 'pointer',
				// hitTestData: this.options,
				// externalId: this.options.id,
			};
        } return null
    }

    public abstract update(): void

    public abstract isInView(bitmapSize: any): boolean

    public abstract paint(context: any, bitmapSize: any): void 

    public abstract paintHover(context: any, bitmapSize: any): void 

    public abstract isHover(x: number, y: number): boolean
}

export { Drawing, Options }