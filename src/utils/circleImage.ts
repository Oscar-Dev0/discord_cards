import { CanvasRenderingContext2D } from 'canvas';

export const circleImage = (ctx: CanvasRenderingContext2D, x: number, y: number, height: number, width: number, f?: boolean, s?: boolean): void => {
    ctx.beginPath();
    ctx.arc(x + 0.5 * width, y + 0.5 * height, 0.5 * width, 0, 2 * Math.PI);
    if (f) ctx.fill();
    if (s) ctx.stroke();
    ctx.closePath();
};