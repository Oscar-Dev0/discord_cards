import { CanvasRenderingContext2D } from 'canvas';

export const fillRoundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | { tl: number, tr: number, br: number, bl: number },
  f?: boolean,
  s?: boolean
): void => {
  if (typeof r === "number") r = { tl: r, tr: r, br: r, bl: r };
  else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var va  in defaultRadius) {
      const side: "tl" | "tr" | "br" | "bl" = va as any;
      r[side] = r[side] || defaultRadius[side];
    }
  }

  ctx.beginPath();
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + w - r.tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
  ctx.lineTo(x + w, y + h - r.br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
  ctx.lineTo(x + r.bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
  ctx.lineTo(x, y + r.tl);
  ctx.quadraticCurveTo(x, y, x + r.tl, y);
  ctx.closePath();

  if (f) ctx.fill();
  if (s) ctx.stroke();
};

/** Source by Zeew -KamerEzz- */
