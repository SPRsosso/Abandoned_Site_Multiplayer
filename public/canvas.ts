export let canvas: HTMLCanvasElement;
export let c: CanvasRenderingContext2D;

export function setCanvas(className: string) {
    const tmpCanvas = document.querySelector<HTMLCanvasElement>("." + className)
    if (tmpCanvas) {
        canvas = tmpCanvas;
        c = canvas.getContext("2d") as CanvasRenderingContext2D;
    }
}