import { Point } from "../drawing/point"
import { Color, hexToRgba } from "./color"

export function drawHorizontalLine(ctx: any, point: Point, options: any, bitmapSize: any = {}) {
    ctx.beginPath()
    ctx.strokeStyle = hexToRgba(options.color, options.opacity)
    ctx.lineWidth = options.lineWidth
    ctx.moveTo(0, point.getY())
    ctx.lineTo(bitmapSize.width, point.getY())
    ctx.stroke()
}

export function drawVerticalLine(ctx: any, point: Point, options: any, bitmapSize: any = {}) {
    ctx.beginPath()
    ctx.strokeStyle = hexToRgba(options.color, options.opacity)
    ctx.lineWidth = options.lineWidth
    ctx.moveTo(point.getX(), 0)
    ctx.lineTo(point.getX(), bitmapSize.height)
    ctx.stroke()
}

export function strokeCircle(ctx: any, point: Point, radius: number, options: any) {
    ctx.beginPath()
    ctx.strokeStyle = hexToRgba(options.color, options.opacity)
    ctx.lineWidth = options.lineWidth
    drawCircle(ctx, point, radius)
    ctx.stroke()
}

export function fillCircle(ctx: any, point: Point, radius: number, options: any) {
    ctx.beginPath()
    ctx.fillStyle = hexToRgba(options.color, options.opacity)
    drawCircle(ctx, point, radius)
    ctx.fill()
}

export function drawCircle(ctx: any, point: Point, radius: number) {
    ctx.arc(point.getX(), point.getY(), radius, 0, 2 * Math.PI, false)
}

export function drawCirularHandle(ctx: any, point: Point, options: any) {
    let radius = 6
    strokeCircle(ctx, point, radius, options)
    fillCircle(ctx, point, radius - 1, { ...options, color: Color.WHITE, opacity: 1 })
}

export function drawBoxHandle(ctx: any, point: Point, options: any) {
    let size = 5
    let round = 2
    ctx.beginPath()
    ctx.strokeStyle = hexToRgba(options.color, options.opacity)
    ctx.roundRect(point.getX()! - size + 1, point.getY()! - size + 1, 2 * size, 2 * size, round)
    ctx.stroke()
    size = size - 1
    ctx.fillStyle = Color.WHITE
    ctx.roundRect(point.getX()! - size, point.getY()! - size, 2 * size, 2 * size, round)
    ctx.fill()
}

export function strokePolyon(ctx: any, point: Array<Point>, options: any) {
    ctx.beginPath()
    ctx.lineCap = 'butt'
    ctx.strokeStyle = hexToRgba(options.color, options.opacity)
    ctx.lineWidth = options.lineWidth
    drawPolyon(ctx, point)
    ctx.stroke()
}

export function fillPolyon(ctx: any, point: Array<Point>, options: any) {
    ctx.beginPath()
    ctx.fillStyle = hexToRgba(options.color, options.opacity)
    drawPolyon(ctx, point)
    ctx.fill()
}

export function drawPolyon(ctx: any, point: Array<Point>) {
    ctx.moveTo(point[0].getX(), point[0].getY())
    for (let i = 1; i < point.length; ++i) {
        ctx.lineTo(point[i].getX(), point[i].getY())
    }
    ctx.closePath()
}

export function drawHorizontalHandle(ctx: any, point: Point, options: any, bitmapSize: any) {
    let size = 5
    let round = 2
    ctx.beginPath()
    ctx.strokeStyle = hexToRgba(options.color, options.opacity)
    ctx.roundRect(bitmapSize.width / 2 - size, point.getY()! - size, 2 * size, 2 * size, round)
    ctx.stroke()
    size = size - 1
    ctx.fillStyle = Color.WHITE
    ctx.roundRect(bitmapSize.width / 2 - size, point.getY()! - size, 2 * size, 2 * size, round)
    ctx.fill()
}

export function drawVerticalHandle(ctx: any, point: Point, options: any, bitmapSize: any) {
    let size = 5
    let round = 2
    ctx.beginPath()
    ctx.strokeStyle = hexToRgba(options.color, options.opacity)
    ctx.roundRect(point.getX()! - size, bitmapSize.height / 2 - size, 2 * size, 2 * size, round)
    ctx.stroke()
    ctx.fillStyle = Color.WHITE
    ctx.roundRect(point.getX()! - size, bitmapSize.height / 2 - size, 2 * size, 2 * size, round)
    ctx.fill()
}

export function drawLine(ctx: any, point1: Point, point2: Point, options: any) {
    ctx.beginPath()
    ctx.strokeStyle = options.color || '#000'
    ctx.lineWidth = options.lineWidth || 1
    ctx.moveTo(point1.getX(), point1.getY())
    ctx.lineTo(point2.getX(), point2.getY())
    ctx.stroke()
}

export function drawText(ctx: any, text: string, pointX: number, pointY: number, width: number, height: number, options: any) {
    let radius = 6
    ctx.beginPath()
    ctx.fillStyle = options.boxColor
    ctx.roundRect(pointX, pointY, width, height, radius)
    ctx.fill()

    ctx.font = options.textSize + ' Arial';
    ctx.fillStyle = options.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let textX = pointX + width / 2;
    let textY = pointY + height / 2 + 1;

    ctx.fillText(text, textX, textY);
}

export function drawPNLText(ctx: any, text: string, point: Point, pnlWidth: number, boxWidth: number, options: any, shiftDown: boolean = true) {
    let boxHeight = 26
    let boxX = point.getX()! + pnlWidth / 2 - boxWidth / 2
    let boxY

    if (pnlWidth < boxWidth + 20) {
        boxY = point.getY()! + (shiftDown ? 10 : -36)
    } else {
        boxY = point.getY()! - boxHeight / 2
    }

    drawText(ctx, text, boxX, boxY, boxWidth, boxHeight, options)
}

export function drawLongPosition(ctx: any, point: Array<Point>, options: any) {
    fillPolyon(ctx, [
        point[0],
        point[1],
        point[3],
        point[2],
    ], {
        ...options,
        color: options.targetColor,
        opacity: options.targetOpacity,
    })

    fillPolyon(ctx, [
        point[0],
        point[1],
        point[5],
        point[4],
    ], {
        ...options,
        color: options.stopColor,
        opacity: options.stopOpacity,
    })

    drawLine(ctx, point[0], point[1], {
        color: options.lineColor,
    })
}

export function drawShortPosition(ctx: any, point: Array<Point>, options: any) {
    fillPolyon(ctx, [
        point[0],
        point[1],
        point[3],
        point[2],
    ], {
        ...options,
        color: options.stopColor,
        opacity: options.stopOpacity,
    })

    fillPolyon(ctx, [
        point[0],
        point[1],
        point[5],
        point[4],
    ], {
        ...options,
        color: options.targetColor,
        opacity: options.targetOpacity,
    })

    drawLine(ctx, point[0], point[1], {
        color: options.lineColor,
    })
}