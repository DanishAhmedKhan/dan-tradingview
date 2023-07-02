import { Toolbar } from "./toolbar"

interface Drawable {
    toolbar: Toolbar
    getToolbar(): Toolbar
    getPaneView(): any
    update(): void
    paint(target: any): void
    remove(): void
}

export { Drawable }