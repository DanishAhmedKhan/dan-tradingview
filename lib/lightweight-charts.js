/*!
 * @license
 * TradingView Lightweight Charts™ v4.1.0-dev+202305250802
 * Copyright (c) 2023 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
!(function () {
    "use strict"
    var t, i
    function n(t, i) {
        const n = {
            0: [],
            1: [t.lineWidth, t.lineWidth],
            2: [2 * t.lineWidth, 2 * t.lineWidth],
            3: [6 * t.lineWidth, 6 * t.lineWidth],
            4: [t.lineWidth, 4 * t.lineWidth],
        }[i]
        t.setLineDash(n)
    }
    function s(t, i, n, s) {
        t.beginPath()
        const e = t.lineWidth % 2 ? 0.5 : 0
        t.moveTo(n, i + e), t.lineTo(s, i + e), t.stroke()
    }
    function e(t, i) {
        if (!t) throw new Error("Assertion failed" + (i ? ": " + i : ""))
    }
    function r(t) {
        if (void 0 === t) throw new Error("Value is undefined")
        return t
    }
    function h(t) {
        if (null === t) throw new Error("Value is null")
        return t
    }
    function l(t) {
        return h(r(t))
    }
    !(function (t) {
        ;(t[(t.Simple = 0)] = "Simple"),
            (t[(t.WithSteps = 1)] = "WithSteps"),
            (t[(t.Curved = 2)] = "Curved")
    })(t || (t = {})),
        (function (t) {
            ;(t[(t.Solid = 0)] = "Solid"),
                (t[(t.Dotted = 1)] = "Dotted"),
                (t[(t.Dashed = 2)] = "Dashed"),
                (t[(t.LargeDashed = 3)] = "LargeDashed"),
                (t[(t.SparseDotted = 4)] = "SparseDotted")
        })(i || (i = {}))
    const a = {
        khaki: "#f0e68c",
        azure: "#f0ffff",
        aliceblue: "#f0f8ff",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gainsboro: "#dcdcdc",
        gray: "#808080",
        green: "#008000",
        honeydew: "#f0fff0",
        floralwhite: "#fffaf0",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lemonchiffon: "#fffacd",
        hotpink: "#ff69b4",
        lightyellow: "#ffffe0",
        greenyellow: "#adff2f",
        lightgoldenrodyellow: "#fafad2",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        lightcyan: "#e0ffff",
        magenta: "#f0f",
        maroon: "#800000",
        olive: "#808000",
        orange: "#ffa500",
        oldlace: "#fdf5e6",
        mediumblue: "#0000cd",
        transparent: "#0000",
        lime: "#0f0",
        lightpink: "#ffb6c1",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        midnightblue: "#191970",
        orchid: "#da70d6",
        mediumorchid: "#ba55d3",
        mediumturquoise: "#48d1cc",
        orangered: "#ff4500",
        royalblue: "#4169e1",
        powderblue: "#b0e0e6",
        red: "#f00",
        coral: "#ff7f50",
        turquoise: "#40e0d0",
        white: "#fff",
        whitesmoke: "#f5f5f5",
        wheat: "#f5deb3",
        teal: "#008080",
        steelblue: "#4682b4",
        bisque: "#ffe4c4",
        aquamarine: "#7fffd4",
        aqua: "#0ff",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        springgreen: "#00ff7f",
        antiquewhite: "#faebd7",
        burlywood: "#deb887",
        brown: "#a52a2a",
        beige: "#f5f5dc",
        chocolate: "#d2691e",
        chartreuse: "#7fff00",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cadetblue: "#5f9ea0",
        tomato: "#ff6347",
        fuchsia: "#f0f",
        blue: "#00f",
        salmon: "#fa8072",
        blanchedalmond: "#ffebcd",
        slateblue: "#6a5acd",
        slategray: "#708090",
        thistle: "#d8bfd8",
        tan: "#d2b48c",
        cyan: "#0ff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        blueviolet: "#8a2be2",
        black: "#000",
        darkmagenta: "#8b008b",
        darkslateblue: "#483d8b",
        darkkhaki: "#bdb76b",
        darkorchid: "#9932cc",
        darkorange: "#ff8c00",
        darkgreen: "#006400",
        darkred: "#8b0000",
        dodgerblue: "#1e90ff",
        darkslategray: "#2f4f4f",
        dimgray: "#696969",
        deepskyblue: "#00bfff",
        firebrick: "#b22222",
        forestgreen: "#228b22",
        indigo: "#4b0082",
        ivory: "#fffff0",
        lavenderblush: "#fff0f5",
        feldspar: "#d19275",
        indianred: "#cd5c5c",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightskyblue: "#87cefa",
        lightslategray: "#789",
        lightslateblue: "#8470ff",
        snow: "#fffafa",
        lightseagreen: "#20b2aa",
        lightsalmon: "#ffa07a",
        darksalmon: "#e9967a",
        darkviolet: "#9400d3",
        mediumpurple: "#9370d8",
        mediumaquamarine: "#66cdaa",
        skyblue: "#87ceeb",
        lavender: "#e6e6fa",
        lightsteelblue: "#b0c4de",
        mediumvioletred: "#c71585",
        mintcream: "#f5fffa",
        navajowhite: "#ffdead",
        navy: "#000080",
        olivedrab: "#6b8e23",
        palevioletred: "#d87093",
        violetred: "#d02090",
        yellow: "#ff0",
        yellowgreen: "#9acd32",
        lawngreen: "#7cfc00",
        pink: "#ffc0cb",
        paleturquoise: "#afeeee",
        palegoldenrod: "#eee8aa",
        darkolivegreen: "#556b2f",
        darkseagreen: "#8fbc8f",
        darkturquoise: "#00ced1",
        peachpuff: "#ffdab9",
        deeppink: "#ff1493",
        violet: "#ee82ee",
        palegreen: "#98fb98",
        mediumseagreen: "#3cb371",
        peru: "#cd853f",
        saddlebrown: "#8b4513",
        sandybrown: "#f4a460",
        rosybrown: "#bc8f8f",
        purple: "#800080",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        papayawhip: "#ffefd5",
        mediumslateblue: "#7b68ee",
        plum: "#dda0dd",
        mediumspringgreen: "#00fa9a",
    }
    function o(t) {
        return t < 0 ? 0 : t > 255 ? 255 : Math.round(t) || 0
    }
    function _(t) {
        return t <= 0 || t > 0
            ? t < 0
                ? 0
                : t > 1
                ? 1
                : Math.round(1e4 * t) / 1e4
            : 0
    }
    const u = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i,
        c = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,
        d = /^rgb\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*\)$/,
        f =
            /^rgba\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?[\d]{0,10}(?:\.\d+)?)\s*\)$/
    function p(t) {
        ;(t = t.toLowerCase()) in a && (t = a[t])
        {
            const i = f.exec(t) || d.exec(t)
            if (i)
                return [
                    o(parseInt(i[1], 10)),
                    o(parseInt(i[2], 10)),
                    o(parseInt(i[3], 10)),
                    _(i.length < 5 ? 1 : parseFloat(i[4])),
                ]
        }
        {
            const i = c.exec(t)
            if (i)
                return [
                    o(parseInt(i[1], 16)),
                    o(parseInt(i[2], 16)),
                    o(parseInt(i[3], 16)),
                    1,
                ]
        }
        {
            const i = u.exec(t)
            if (i)
                return [
                    o(17 * parseInt(i[1], 16)),
                    o(17 * parseInt(i[2], 16)),
                    o(17 * parseInt(i[3], 16)),
                    1,
                ]
        }
        throw new Error(`Cannot parse color: ${t}`)
    }
    function v(t) {
        const i = p(t)
        return {
            t: `rgb(${i[0]}, ${i[1]}, ${i[2]})`,
            i:
                ((n = i),
                0.199 * n[0] + 0.687 * n[1] + 0.114 * n[2] > 160
                    ? "black"
                    : "white"),
        }
        var n
    }
    class m {
        constructor() {
            this.h = []
        }
        l(t, i, n) {
            const s = { o: t, _: i, u: !0 === n }
            this.h.push(s)
        }
        p(t) {
            const i = this.h.findIndex((i) => t === i.o)
            i > -1 && this.h.splice(i, 1)
        }
        v(t) {
            this.h = this.h.filter((i) => i._ !== t)
        }
        m(t, i, n) {
            const s = [...this.h]
            ;(this.h = this.h.filter((t) => !t.u)),
                s.forEach((s) => s.o(t, i, n))
        }
        g() {
            return this.h.length > 0
        }
        M() {
            this.h = []
        }
    }
    function b(t, ...i) {
        for (const n of i)
            for (const i in n)
                void 0 !== n[i] &&
                    ("object" != typeof n[i] || void 0 === t[i]
                        ? (t[i] = n[i])
                        : b(t[i], n[i]))
        return t
    }
    function g(t) {
        return "number" == typeof t && isFinite(t)
    }
    function w(t) {
        return "number" == typeof t && t % 1 == 0
    }
    function M(t) {
        return "string" == typeof t
    }
    function x(t) {
        return "boolean" == typeof t
    }
    function S(t) {
        const i = t
        if (!i || "object" != typeof i) return i
        let n, s, e
        for (s in ((n = Array.isArray(i) ? [] : {}), i))
            i.hasOwnProperty(s) &&
                ((e = i[s]), (n[s] = e && "object" == typeof e ? S(e) : e))
        return n
    }
    function y(t) {
        return null !== t
    }
    function k(t) {
        return null === t ? void 0 : t
    }
    const C =
        "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif"
    function T(t, i, n) {
        return (
            void 0 === i && (i = C),
            `${(n = void 0 !== n ? `${n} ` : "")}${t}px ${i}`
        )
    }
    class P {
        constructor(t) {
            ;(this.S = {
                k: 1,
                C: 5,
                T: NaN,
                P: "",
                R: "",
                D: "",
                O: "",
                B: 0,
                L: 0,
                A: 0,
                I: 0,
                V: 0,
            }),
                (this.N = t)
        }
        F() {
            const t = this.S,
                i = this.W(),
                n = this.j()
            return (
                (t.T === i && t.R === n) ||
                    ((t.T = i),
                    (t.R = n),
                    (t.P = T(i, n)),
                    (t.I = (2.5 / 12) * i),
                    (t.B = t.I),
                    (t.L = (i / 12) * t.C),
                    (t.A = (i / 12) * t.C),
                    (t.V = 0)),
                (t.D = this.$()),
                (t.O = this.H()),
                this.S
            )
        }
        $() {
            return this.N.F().layout.textColor
        }
        H() {
            return this.N.U()
        }
        W() {
            return this.N.F().layout.fontSize
        }
        j() {
            return this.N.F().layout.fontFamily
        }
    }
    class R {
        constructor() {
            this.q = []
        }
        Y(t) {
            this.q = t
        }
        X(t, i, n) {
            this.q.forEach((s) => {
                s.X(t, i, n)
            })
        }
    }
    class D {
        X(t, i, n) {
            t.useMediaCoordinateSpace((t) => this.Z(t, i, n))
        }
        K(t, i, n) {
            t.useMediaCoordinateSpace((t) => this.G(t, i, n))
        }
        G(t, i, n) {}
    }
    class O extends D {
        constructor() {
            super(...arguments), (this.J = null)
        }
        tt(t) {
            this.J = t
        }
        Z({ context: t }) {
            if (null === this.J || null === this.J.it) return
            const i = this.J.it,
                n = this.J,
                s = (s) => {
                    t.beginPath()
                    for (let e = i.to - 1; e >= i.from; --e) {
                        const i = n.nt[e]
                        t.moveTo(i.st, i.et),
                            t.arc(i.st, i.et, s, 0, 2 * Math.PI)
                    }
                    t.fill()
                }
            n.rt > 0 && ((t.fillStyle = n.ht), s(n.lt + n.rt)),
                (t.fillStyle = n.ot),
                s(n.lt)
        }
    }
    function B() {
        return {
            nt: [{ st: 0, et: 0, _t: 0, ut: 0 }],
            ot: "",
            ht: "",
            lt: 0,
            rt: 0,
            it: null,
        }
    }
    const L = { from: 0, to: 1 }
    class E {
        constructor(t, i) {
            ;(this.ct = new R()),
                (this.dt = []),
                (this.ft = []),
                (this.vt = !0),
                (this.N = t),
                (this.bt = i),
                this.ct.Y(this.dt)
        }
        gt(t) {
            const i = this.N.wt()
            i.length !== this.dt.length &&
                ((this.ft = i.map(B)),
                (this.dt = this.ft.map((t) => {
                    const i = new O()
                    return i.tt(t), i
                })),
                this.ct.Y(this.dt)),
                (this.vt = !0)
        }
        Mt() {
            return this.vt && (this.xt(), (this.vt = !1)), this.ct
        }
        xt() {
            const t = this.N.wt(),
                i = this.bt.St(),
                n = this.N.yt()
            t.forEach((t, s) => {
                var e
                const r = this.ft[s],
                    l = t.kt(i)
                if (null === l || !t.Ct()) return void (r.it = null)
                const a = h(t.Tt())
                ;(r.ot = l.Pt),
                    (r.lt = l.lt),
                    (r.rt = l.Rt),
                    (r.nt[0].ut = l.ut),
                    (r.nt[0].et = t.Ot().Dt(l.ut, a.Bt)),
                    (r.ht =
                        null !== (e = l.Lt) && void 0 !== e
                            ? e
                            : this.N.Et(r.nt[0].et / t.Ot().zt())),
                    (r.nt[0]._t = i),
                    (r.nt[0].st = n.At(i)),
                    (r.it = L)
            })
        }
    }
    class z {
        X(t, i, n) {
            t.useBitmapCoordinateSpace((t) => this.Z(t, i, n))
        }
    }
    class A extends z {
        constructor(t) {
            super(), (this.It = t)
        }
        Z({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: e,
            verticalPixelRatio: r,
        }) {
            if (null === this.It) return
            const h = this.It.Vt.Ct,
                l = this.It.Nt.Ct
            if (!h && !l) return
            const a = Math.round(this.It.st * e),
                o = Math.round(this.It.et * r)
            ;(t.lineCap = "butt"),
                h &&
                    a >= 0 &&
                    ((t.lineWidth = Math.floor(this.It.Vt.rt * e)),
                    (t.strokeStyle = this.It.Vt.D),
                    (t.fillStyle = this.It.Vt.D),
                    n(t, this.It.Vt.Ft),
                    (function (t, i, n, s) {
                        t.beginPath()
                        const e = t.lineWidth % 2 ? 0.5 : 0
                        t.moveTo(i + e, n), t.lineTo(i + e, s), t.stroke()
                    })(t, a, 0, i.height)),
                l &&
                    o >= 0 &&
                    ((t.lineWidth = Math.floor(this.It.Nt.rt * r)),
                    (t.strokeStyle = this.It.Nt.D),
                    (t.fillStyle = this.It.Nt.D),
                    n(t, this.It.Nt.Ft),
                    s(t, o, 0, i.width))
        }
    }
    class I {
        constructor(t) {
            ;(this.vt = !0),
                (this.Wt = {
                    Vt: { rt: 1, Ft: 0, D: "", Ct: !1 },
                    Nt: { rt: 1, Ft: 0, D: "", Ct: !1 },
                    st: 0,
                    et: 0,
                }),
                (this.jt = new A(this.Wt)),
                (this.$t = t)
        }
        gt() {
            this.vt = !0
        }
        Mt() {
            return this.vt && (this.xt(), (this.vt = !1)), this.jt
        }
        xt() {
            const t = this.$t.Ct(),
                i = h(this.$t.Ht()),
                n = i.Ut().F().crosshair,
                s = this.Wt
            ;(s.Nt.Ct = t && this.$t.qt(i)),
                (s.Vt.Ct = t && this.$t.Yt()),
                (s.Nt.rt = n.horzLine.width),
                (s.Nt.Ft = n.horzLine.style),
                (s.Nt.D = n.horzLine.color),
                (s.Vt.rt = n.vertLine.width),
                (s.Vt.Ft = n.vertLine.style),
                (s.Vt.D = n.vertLine.color),
                (s.st = this.$t.Xt()),
                (s.et = this.$t.Zt())
        }
    }
    function V(t, i, n, s, e, r) {
        t.fillRect(i + r, n, s - 2 * r, r),
            t.fillRect(i + r, n + e - r, s - 2 * r, r),
            t.fillRect(i, n, r, e),
            t.fillRect(i + s - r, n, r, e)
    }
    function N(t, i, n, s, e, r) {
        t.save(),
            (t.globalCompositeOperation = "copy"),
            (t.fillStyle = r),
            t.fillRect(i, n, s, e),
            t.restore()
    }
    function F(t, i) {
        return Array.isArray(t) ? t.map((t) => (0 === t ? t : t + i)) : t + i
    }
    function W(t, i, n, s, e, r) {
        let h, l, a, o
        if (Array.isArray(r))
            if (2 === r.length) {
                const t = Math.max(0, r[0]),
                    i = Math.max(0, r[1])
                ;(h = t), (l = t), (a = i), (o = i)
            } else {
                if (4 !== r.length)
                    throw new Error(
                        "Wrong border radius - it should be like css border radius"
                    )
                ;(h = Math.max(0, r[0])),
                    (l = Math.max(0, r[1])),
                    (a = Math.max(0, r[2])),
                    (o = Math.max(0, r[3]))
            }
        else {
            const t = Math.max(0, r)
            ;(h = t), (l = t), (a = t), (o = t)
        }
        t.beginPath(),
            t.moveTo(i + h, n),
            t.lineTo(i + s - l, n),
            0 !== l && t.arcTo(i + s, n, i + s, n + l, l),
            t.lineTo(i + s, n + e - a),
            0 !== a && t.arcTo(i + s, n + e, i + s - a, n + e, a),
            t.lineTo(i + o, n + e),
            0 !== o && t.arcTo(i, n + e, i, n + e - o, o),
            t.lineTo(i, n + h),
            0 !== h && t.arcTo(i, n, i + h, n, h)
    }
    function j(t, i, n, s, e, r, h = 0, l = 0, a = "") {
        if ((t.save(), !h || !a || a === r))
            return (
                W(t, i, n, s, e, l),
                (t.fillStyle = r),
                t.fill(),
                void t.restore()
            )
        const o = h / 2
        if ("transparent" !== r) {
            W(t, i + h, n + h, s - 2 * h, e - 2 * h, F(l, -h)),
                (t.fillStyle = r),
                t.fill()
        }
        if ("transparent" !== a) {
            W(t, i + o, n + o, s - h, e - h, F(l, -o)),
                (t.lineWidth = h),
                (t.strokeStyle = a),
                t.closePath(),
                t.stroke()
        }
        t.restore()
    }
    function $(t, i, n, s, e, r, h) {
        t.save(), (t.globalCompositeOperation = "copy")
        const l = t.createLinearGradient(0, 0, 0, e)
        l.addColorStop(0, r),
            l.addColorStop(1, h),
            (t.fillStyle = l),
            t.fillRect(i, n, s, e),
            t.restore()
    }
    class H {
        constructor(t, i) {
            this.tt(t, i)
        }
        tt(t, i) {
            ;(this.It = t), (this.Kt = i)
        }
        zt(t, i) {
            return this.It.Ct ? t.T + t.I + t.B : 0
        }
        X(t, i, n, s) {
            if (!this.It.Ct || 0 === this.It.Gt.length) return
            const e = this.It.D,
                r = this.Kt.t,
                h = t.useBitmapCoordinateSpace((t) => {
                    const h = t.context
                    h.font = i.P
                    const l = this.Jt(t, i, n, s),
                        a = l.Qt,
                        o = (t, i) => {
                            l.ti
                                ? j(
                                      h,
                                      a.ii,
                                      a.ni,
                                      a.si,
                                      a.ei,
                                      t,
                                      a.ri,
                                      [a.lt, 0, 0, a.lt],
                                      i
                                  )
                                : j(
                                      h,
                                      a.hi,
                                      a.ni,
                                      a.si,
                                      a.ei,
                                      t,
                                      a.ri,
                                      [0, a.lt, a.lt, 0],
                                      i
                                  )
                        }
                    return (
                        o(r, "transparent"),
                        this.It.li &&
                            ((h.fillStyle = e),
                            h.fillRect(a.hi, a.ai, a.oi - a.hi, a._i)),
                        o("transparent", r),
                        this.It.ui &&
                            ((h.fillStyle = i.O),
                            h.fillRect(
                                l.ti ? a.ci - a.ri : 0,
                                a.ni,
                                a.ri,
                                a.di - a.ni
                            )),
                        l
                    )
                })
            t.useMediaCoordinateSpace(({ context: t }) => {
                const n = h.fi
                ;(t.font = i.P),
                    (t.textAlign = h.ti ? "right" : "left"),
                    (t.textBaseline = "middle"),
                    (t.fillStyle = e),
                    t.fillText(this.It.Gt, n.pi, (n.ni + n.di) / 2 + n.vi)
            })
        }
        Jt(t, i, n, s) {
            var e
            const {
                    context: r,
                    bitmapSize: h,
                    mediaSize: l,
                    horizontalPixelRatio: a,
                    verticalPixelRatio: o,
                } = t,
                _ = this.It.li || !this.It.mi ? i.C : 0,
                u = this.It.bi ? i.k : 0,
                c = i.I + this.Kt.gi,
                d = i.B + this.Kt.wi,
                f = i.L,
                p = i.A,
                v = this.It.Gt,
                m = i.T,
                b = n.Mi(r, v),
                g = Math.ceil(n.xi(r, v)),
                w = m + c + d,
                M = i.k + f + p + g + _,
                x = Math.max(1, Math.floor(o))
            let S = Math.round(w * o)
            S % 2 != x % 2 && (S += 1)
            const y = u > 0 ? Math.max(1, Math.floor(u * a)) : 0,
                k = Math.round(M * a),
                C = Math.round(_ * a),
                T = null !== (e = this.Kt.Si) && void 0 !== e ? e : this.Kt.yi,
                P = Math.round(T * o) - Math.floor(0.5 * o),
                R = Math.floor(P + x / 2 - S / 2),
                D = R + S,
                O = "right" === s,
                B = O ? l.width - u : u,
                L = O ? h.width - y : y
            let E, z, A
            return (
                O
                    ? ((E = L - k), (z = L - C), (A = B - _ - f - u))
                    : ((E = L + k), (z = L + C), (A = B + _ + f)),
                {
                    ti: O,
                    Qt: {
                        ni: R,
                        ai: P,
                        di: D,
                        si: k,
                        ei: S,
                        lt: 2 * a,
                        ri: y,
                        ii: E,
                        hi: L,
                        oi: z,
                        _i: x,
                        ci: h.width,
                    },
                    fi: { ni: R / o, di: D / o, pi: A, vi: b },
                }
            )
        }
    }
    class U {
        constructor(t) {
            ;(this.ki = { yi: 0, t: "#000", wi: 0, gi: 0 }),
                (this.Ci = {
                    Gt: "",
                    Ct: !1,
                    li: !0,
                    mi: !1,
                    Lt: "",
                    D: "#FFF",
                    ui: !1,
                    bi: !1,
                }),
                (this.Ti = {
                    Gt: "",
                    Ct: !1,
                    li: !1,
                    mi: !0,
                    Lt: "",
                    D: "#FFF",
                    ui: !0,
                    bi: !0,
                }),
                (this.vt = !0),
                (this.Pi = new (t || H)(this.Ci, this.ki)),
                (this.Ri = new (t || H)(this.Ti, this.ki))
        }
        Gt() {
            return this.Di(), this.Ci.Gt
        }
        yi() {
            return this.Di(), this.ki.yi
        }
        gt() {
            this.vt = !0
        }
        zt(t, i = !1) {
            return Math.max(this.Pi.zt(t, i), this.Ri.zt(t, i))
        }
        Oi() {
            return this.ki.Si || 0
        }
        Bi(t) {
            this.ki.Si = t
        }
        Li() {
            return this.Di(), this.Ci.Ct || this.Ti.Ct
        }
        Ei() {
            return this.Di(), this.Ci.Ct
        }
        Mt(t) {
            return (
                this.Di(),
                (this.Ci.li = this.Ci.li && t.F().ticksVisible),
                (this.Ti.li = this.Ti.li && t.F().ticksVisible),
                this.Pi.tt(this.Ci, this.ki),
                this.Ri.tt(this.Ti, this.ki),
                this.Pi
            )
        }
        zi() {
            return (
                this.Di(),
                this.Pi.tt(this.Ci, this.ki),
                this.Ri.tt(this.Ti, this.ki),
                this.Ri
            )
        }
        Di() {
            this.vt &&
                ((this.Ci.li = !0),
                (this.Ti.li = !1),
                this.Ai(this.Ci, this.Ti, this.ki))
        }
    }
    class q extends U {
        constructor(t, i, n) {
            super(), (this.$t = t), (this.Ii = i), (this.Vi = n)
        }
        Ai(t, i, n) {
            t.Ct = !1
            const s = this.$t.F().horzLine
            if (!s.labelVisible) return
            const e = this.Ii.Tt()
            if (!this.$t.Ct() || this.Ii.Ni() || null === e) return
            const r = v(s.labelBackgroundColor)
            ;(n.t = r.t), (t.D = r.i)
            const h = (2 / 12) * this.Ii.T()
            ;(n.gi = h), (n.wi = h)
            const l = this.Vi(this.Ii)
            ;(n.yi = l.yi), (t.Gt = this.Ii.Fi(l.ut, e)), (t.Ct = !0)
        }
    }
    const Y = /[1-9]/g
    class X {
        constructor() {
            this.It = null
        }
        tt(t) {
            this.It = t
        }
        X(t, i) {
            if (
                null === this.It ||
                !1 === this.It.Ct ||
                0 === this.It.Gt.length
            )
                return
            const n = t.useMediaCoordinateSpace(
                ({ context: t }) => (
                    (t.font = i.P), Math.round(i.Wi.xi(t, h(this.It).Gt, Y))
                )
            )
            if (n <= 0) return
            const s = i.ji,
                e = n + 2 * s,
                r = e / 2,
                l = this.It.$i
            let a = this.It.yi,
                o = Math.floor(a - r) + 0.5
            o < 0
                ? ((a += Math.abs(0 - o)), (o = Math.floor(a - r) + 0.5))
                : o + e > l &&
                  ((a -= Math.abs(l - (o + e))), (o = Math.floor(a - r) + 0.5))
            const _ = o + e,
                u = Math.ceil(0 + i.k + i.C + i.I + i.T + i.B)
            t.useBitmapCoordinateSpace(
                ({
                    context: t,
                    horizontalPixelRatio: n,
                    verticalPixelRatio: s,
                }) => {
                    const e = h(this.It)
                    t.fillStyle = e.t
                    const r = Math.round(o * n),
                        l = Math.round(0 * s),
                        a = Math.round(_ * n),
                        c = Math.round(u * s),
                        d = Math.round(2 * n)
                    if (
                        (t.beginPath(),
                        t.moveTo(r, l),
                        t.lineTo(r, c - d),
                        t.arcTo(r, c, r + d, c, d),
                        t.lineTo(a - d, c),
                        t.arcTo(a, c, a, c - d, d),
                        t.lineTo(a, l),
                        t.fill(),
                        e.li)
                    ) {
                        const r = Math.round(e.yi * n),
                            h = l,
                            a = Math.round((h + i.C) * s)
                        t.fillStyle = e.D
                        const o = Math.max(1, Math.floor(n)),
                            _ = Math.floor(0.5 * n)
                        t.fillRect(r - _, h, o, a - h)
                    }
                }
            ),
                t.useMediaCoordinateSpace(({ context: t }) => {
                    const n = h(this.It),
                        e = 0 + i.k + i.C + i.I + i.T / 2
                    ;(t.font = i.P),
                        (t.textAlign = "left"),
                        (t.textBaseline = "middle"),
                        (t.fillStyle = n.D)
                    const r = i.Wi.Mi(t, "Apr0")
                    t.translate(o + s, e + r), t.fillText(n.Gt, 0, 0)
                })
        }
    }
    class Z {
        constructor(t, i, n) {
            ;(this.vt = !0),
                (this.jt = new X()),
                (this.Wt = {
                    Ct: !1,
                    t: "#4c525e",
                    D: "white",
                    Gt: "",
                    $i: 0,
                    yi: NaN,
                    li: !0,
                }),
                (this.bt = t),
                (this.Hi = i),
                (this.Vi = n)
        }
        gt() {
            this.vt = !0
        }
        Mt() {
            return (
                this.vt && (this.xt(), (this.vt = !1)),
                this.jt.tt(this.Wt),
                this.jt
            )
        }
        xt() {
            const t = this.Wt
            t.Ct = !1
            const i = this.bt.F().vertLine
            if (!i.labelVisible) return
            const n = this.Hi.yt()
            if (n.Ni()) return
            t.$i = n.$i()
            const s = this.Vi()
            if (null === s) return
            t.yi = s.yi
            const e = n.Ui(this.bt.St())
            ;(t.Gt = n.qi(h(e))), (t.Ct = !0)
            const r = v(i.labelBackgroundColor)
            ;(t.t = r.t), (t.D = r.i), (t.li = n.F().ticksVisible)
        }
    }
    class K {
        constructor() {
            ;(this.Yi = null), (this.Xi = 0)
        }
        Zi() {
            return this.Xi
        }
        Ki(t) {
            this.Xi = t
        }
        Ot() {
            return this.Yi
        }
        Gi(t) {
            this.Yi = t
        }
        Ji(t) {
            return []
        }
        Qi() {
            return []
        }
        Ct() {
            return !0
        }
    }
    var G
    !(function (t) {
        ;(t[(t.Normal = 0)] = "Normal"), (t[(t.Magnet = 1)] = "Magnet")
    })(G || (G = {}))
    class J extends K {
        constructor(t, i) {
            super(),
                (this.tn = null),
                (this.nn = NaN),
                (this.sn = 0),
                (this.en = !0),
                (this.rn = new Map()),
                (this.hn = !1),
                (this.ln = NaN),
                (this.an = NaN),
                (this.on = NaN),
                (this._n = NaN),
                (this.Hi = t),
                (this.un = i),
                (this.cn = new E(t, this))
            this.dn = ((t, i) => (n) => {
                const s = i(),
                    e = t()
                if (n === h(this.tn).fn()) return { ut: e, yi: s }
                {
                    const t = h(n.Tt())
                    return { ut: n.pn(s, t), yi: s }
                }
            })(
                () => this.nn,
                () => this.an
            )
            const n = ((t, i) => () => {
                const n = this.Hi.yt().vn(t()),
                    s = i()
                return n && Number.isFinite(s) ? { _t: n, yi: s } : null
            })(
                () => this.sn,
                () => this.Xt()
            )
            ;(this.mn = new Z(this, t, n)), (this.bn = new I(this))
        }
        F() {
            return this.un
        }
        gn(t, i) {
            ;(this.on = t), (this._n = i)
        }
        wn() {
            ;(this.on = NaN), (this._n = NaN)
        }
        Mn() {
            return this.on
        }
        xn() {
            return this._n
        }
        Sn(t, i, n) {
            this.hn || (this.hn = !0), (this.en = !0), this.yn(t, i, n)
        }
        St() {
            return this.sn
        }
        Xt() {
            return this.ln
        }
        Zt() {
            return this.an
        }
        Ct() {
            return this.en
        }
        kn() {
            ;(this.en = !1),
                this.Cn(),
                (this.nn = NaN),
                (this.ln = NaN),
                (this.an = NaN),
                (this.tn = null),
                this.wn()
        }
        Tn(t) {
            return null !== this.tn ? [this.bn, this.cn] : []
        }
        qt(t) {
            return t === this.tn && this.un.horzLine.visible
        }
        Yt() {
            return this.un.vertLine.visible
        }
        Pn(t, i) {
            ;(this.en && this.tn === t) || this.rn.clear()
            const n = []
            return this.tn === t && n.push(this.Rn(this.rn, i, this.dn)), n
        }
        Qi() {
            return this.en ? [this.mn] : []
        }
        Ht() {
            return this.tn
        }
        Dn() {
            this.bn.gt(),
                this.rn.forEach((t) => t.gt()),
                this.mn.gt(),
                this.cn.gt()
        }
        On(t) {
            return t && !t.fn().Ni() ? t.fn() : null
        }
        yn(t, i, n) {
            this.Bn(t, i, n) && this.Dn()
        }
        Bn(t, i, n) {
            const s = this.ln,
                e = this.an,
                r = this.nn,
                h = this.sn,
                l = this.tn,
                a = this.On(n)
            ;(this.sn = t),
                (this.ln = isNaN(t) ? NaN : this.Hi.yt().At(t)),
                (this.tn = n)
            const o = null !== a ? a.Tt() : null
            return (
                null !== a && null !== o
                    ? ((this.nn = i), (this.an = a.Dt(i, o)))
                    : ((this.nn = NaN), (this.an = NaN)),
                s !== this.ln ||
                    e !== this.an ||
                    h !== this.sn ||
                    r !== this.nn ||
                    l !== this.tn
            )
        }
        Cn() {
            const t = this.Hi.wt()
                    .map((t) => t.En().Ln())
                    .filter(y),
                i = 0 === t.length ? null : Math.max(...t)
            this.sn = null !== i ? i : NaN
        }
        Rn(t, i, n) {
            let s = t.get(i)
            return void 0 === s && ((s = new q(this, i, n)), t.set(i, s)), s
        }
    }
    function Q(t) {
        return "left" === t || "right" === t
    }
    class tt {
        constructor(t) {
            ;(this.zn = new Map()), (this.An = []), (this.In = t)
        }
        Vn(t, i) {
            const n = (function (t, i) {
                return void 0 === t
                    ? i
                    : { Nn: Math.max(t.Nn, i.Nn), Fn: t.Fn || i.Fn }
            })(this.zn.get(t), i)
            this.zn.set(t, n)
        }
        Wn() {
            return this.In
        }
        jn(t) {
            const i = this.zn.get(t)
            return void 0 === i
                ? { Nn: this.In }
                : { Nn: Math.max(this.In, i.Nn), Fn: i.Fn }
        }
        $n() {
            this.Hn(), (this.An = [{ Un: 0 }])
        }
        qn(t) {
            this.Hn(), (this.An = [{ Un: 1, Bt: t }])
        }
        Yn(t) {
            this.Xn(), this.An.push({ Un: 5, Bt: t })
        }
        Hn() {
            this.Xn(), this.An.push({ Un: 6 })
        }
        Zn() {
            this.Hn(), (this.An = [{ Un: 4 }])
        }
        Kn(t) {
            this.Hn(), this.An.push({ Un: 2, Bt: t })
        }
        Gn(t) {
            this.Hn(), this.An.push({ Un: 3, Bt: t })
        }
        Jn() {
            return this.An
        }
        Qn(t) {
            for (const i of t.An) this.ts(i)
            ;(this.In = Math.max(this.In, t.In)),
                t.zn.forEach((t, i) => {
                    this.Vn(i, t)
                })
        }
        static ns() {
            return new tt(2)
        }
        static ss() {
            return new tt(3)
        }
        ts(t) {
            switch (t.Un) {
                case 0:
                    this.$n()
                    break
                case 1:
                    this.qn(t.Bt)
                    break
                case 2:
                    this.Kn(t.Bt)
                    break
                case 3:
                    this.Gn(t.Bt)
                    break
                case 4:
                    this.Zn()
                    break
                case 5:
                    this.Yn(t.Bt)
                    break
                case 6:
                    this.Xn()
            }
        }
        Xn() {
            const t = this.An.findIndex((t) => 5 === t.Un)
            ;-1 !== t && this.An.splice(t, 1)
        }
    }
    const it = "."
    function nt(t, i) {
        if (!g(t)) return "n/a"
        if (!w(i)) throw new TypeError("invalid length")
        if (i < 0 || i > 16) throw new TypeError("invalid length")
        if (0 === i) return t.toString()
        return ("0000000000000000" + t.toString()).slice(-i)
    }
    class st {
        constructor(t, i) {
            if ((i || (i = 1), (g(t) && w(t)) || (t = 100), t < 0))
                throw new TypeError("invalid base")
            ;(this.Ii = t), (this.es = i), this.rs()
        }
        format(t) {
            const i = t < 0 ? "−" : ""
            return (t = Math.abs(t)), i + this.hs(t)
        }
        rs() {
            if (((this.ls = 0), this.Ii > 0 && this.es > 0)) {
                let t = this.Ii
                for (; t > 1; ) (t /= 10), this.ls++
            }
        }
        hs(t) {
            const i = this.Ii / this.es
            let n = Math.floor(t),
                s = ""
            const e = void 0 !== this.ls ? this.ls : NaN
            if (i > 1) {
                let r = +(Math.round(t * i) - n * i).toFixed(this.ls)
                r >= i && ((r -= i), (n += 1)),
                    (s = it + nt(+r.toFixed(this.ls) * this.es, e))
            } else (n = Math.round(n * i) / i), e > 0 && (s = it + nt(0, e))
            return n.toFixed(0) + s
        }
    }
    class et extends st {
        constructor(t = 100) {
            super(t)
        }
        format(t) {
            return `${super.format(t)}%`
        }
    }
    class rt {
        constructor(t) {
            this.os = t
        }
        format(t) {
            let i = ""
            return (
                t < 0 && ((i = "-"), (t = -t)),
                t < 995
                    ? i + this._s(t)
                    : t < 999995
                    ? i + this._s(t / 1e3) + "K"
                    : t < 999999995
                    ? ((t = 1e3 * Math.round(t / 1e3)),
                      i + this._s(t / 1e6) + "M")
                    : ((t = 1e6 * Math.round(t / 1e6)),
                      i + this._s(t / 1e9) + "B")
            )
        }
        _s(t) {
            let i
            const n = Math.pow(10, this.os)
            return (
                (i =
                    (t = Math.round(t * n) / n) >= 1e-15 && t < 1
                        ? t.toFixed(this.os).replace(/\.?0+$/, "")
                        : String(t)),
                i.replace(/(\.[1-9]*)0+$/, (t, i) => i)
            )
        }
    }
    function ht(t, i, n, s, e, r, h) {
        if (0 === i.length || s.from >= i.length || s.to <= 0) return
        const l = t.context,
            a = i[s.from]
        let o = r(t, a),
            _ = a
        if (s.to - s.from < 2) {
            const t = e / 2
            l.beginPath()
            const i = { st: a.st - t, et: a.et },
                n = { st: a.st + t, et: a.et }
            return (
                l.moveTo(i.st, i.et), l.lineTo(n.st, n.et), void h(l, o, i, n)
            )
        }
        const u = (t, i) => {
            h(l, o, _, i), l.beginPath(), (o = t), (_ = i)
        }
        let c = _
        l.beginPath(), l.moveTo(a.st, a.et)
        for (let e = s.from + 1; e < s.to; ++e) {
            c = i[e]
            const s = r(t, c)
            switch (n) {
                case 0:
                    l.lineTo(c.st, c.et)
                    break
                case 1:
                    l.lineTo(c.st, i[e - 1].et),
                        s !== o && (u(s, c), l.lineTo(c.st, i[e - 1].et)),
                        l.lineTo(c.st, c.et)
                    break
                case 2: {
                    const [t, n] = _t(i, e - 1, e)
                    l.bezierCurveTo(t.st, t.et, n.st, n.et, c.st, c.et)
                    break
                }
            }
            1 !== n && s !== o && (u(s, c), l.moveTo(c.st, c.et))
        }
        ;(_ !== c || (_ === c && 1 === n)) && h(l, o, _, c)
    }
    const lt = 6
    function at(t, i) {
        return { st: t.st - i.st, et: t.et - i.et }
    }
    function ot(t, i) {
        return { st: t.st / i, et: t.et / i }
    }
    function _t(t, i, n) {
        const s = Math.max(0, i - 1),
            e = Math.min(t.length - 1, n + 1)
        var r, h
        return [
            ((r = t[i]),
            (h = ot(at(t[n], t[s]), lt)),
            { st: r.st + h.st, et: r.et + h.et }),
            at(t[n], ot(at(t[e], t[i]), lt)),
        ]
    }
    function ut(t, i, n, s, e) {
        i.lineTo(e.st, t),
            i.lineTo(s.st, t),
            i.closePath(),
            (i.fillStyle = n),
            i.fill()
    }
    class ct extends D {
        constructor() {
            super(...arguments), (this.J = null)
        }
        tt(t) {
            this.J = t
        }
        Z(t) {
            var i
            if (null === this.J) return
            const { nt: s, it: e, us: r, rt: h, Ft: l, cs: a } = this.J,
                o =
                    null !== (i = this.J.ds) && void 0 !== i
                        ? i
                        : this.J.fs
                        ? 0
                        : t.mediaSize.height
            if (null === e) return
            const _ = t.context
            ;(_.lineCap = "butt"),
                (_.lineJoin = "round"),
                (_.lineWidth = h),
                n(_, l),
                (_.lineWidth = 1),
                ht(t, s, a, e, r, this.ps.bind(this), ut.bind(null, o))
        }
    }
    class dt extends ct {
        constructor() {
            super(...arguments), (this.vs = null)
        }
        ps(t, i) {
            const { context: n, mediaSize: s } = t,
                { bs: e, gs: r } = i,
                h = s.height
            if (
                null !== this.vs &&
                this.vs.topColor === e &&
                this.vs.bottomColor === r &&
                this.vs.bottom === h
            )
                return this.vs.fillStyle
            const l = n.createLinearGradient(0, 0, 0, h)
            return (
                l.addColorStop(0, e),
                l.addColorStop(1, r),
                (this.vs = {
                    topColor: e,
                    bottomColor: r,
                    fillStyle: l,
                    bottom: h,
                }),
                l
            )
        }
    }
    function ft(t, i) {
        ;(t.strokeStyle = i), t.stroke()
    }
    class pt extends D {
        constructor() {
            super(...arguments), (this.J = null)
        }
        tt(t) {
            this.J = t
        }
        Z(t) {
            if (null === this.J) return
            const { nt: i, it: s, us: e, cs: r, rt: h, Ft: l } = this.J
            if (null === s) return
            const a = t.context
            ;(a.lineCap = "butt"),
                (a.lineWidth = h),
                n(a, l),
                (a.lineJoin = "round"),
                ht(t, i, r, s, e, this.ws.bind(this), ft)
        }
    }
    class vt extends pt {
        ws(t, i) {
            return i.ot
        }
    }
    function mt(t, i, n, s = 0, e = t.length) {
        let r = e - s
        for (; 0 < r; ) {
            const e = r >> 1,
                h = s + e
            n(t[h], i) ? ((s = h + 1), (r -= e + 1)) : (r = e)
        }
        return s
    }
    function bt(t, i, n, s = 0, e = t.length) {
        let r = e - s
        for (; 0 < r; ) {
            const e = r >> 1,
                h = s + e
            n(i, t[h]) ? (r = e) : ((s = h + 1), (r -= e + 1))
        }
        return s
    }
    function gt(t, i) {
        return t._t < i
    }
    function wt(t, i) {
        return t < i._t
    }
    function Mt(t, i, n) {
        const s = i.Ms(),
            e = i.ci(),
            r = mt(t, s, gt),
            h = bt(t, e, wt)
        if (!n) return { from: r, to: h }
        let l = r,
            a = h
        return (
            r > 0 && r < t.length && t[r]._t >= s && (l = r - 1),
            h > 0 && h < t.length && t[h - 1]._t <= e && (a = h + 1),
            { from: l, to: a }
        )
    }
    class xt {
        constructor(t, i, n) {
            ;(this.xs = !0),
                (this.Ss = !0),
                (this.ys = !0),
                (this.ks = []),
                (this.Cs = null),
                (this.Ts = t),
                (this.Ps = i),
                (this.Rs = n)
        }
        gt(t) {
            ;(this.xs = !0),
                "data" === t && (this.Ss = !0),
                "options" === t && (this.ys = !0)
        }
        Mt() {
            return this.Ts.Ct()
                ? (this.Ds(), null === this.Cs ? null : this.Os)
                : null
        }
        Bs() {
            this.ks = this.ks.map((t) =>
                Object.assign(Object.assign({}, t), this.Ts.Es().Ls(t._t))
            )
        }
        zs() {
            this.Cs = null
        }
        Ds() {
            this.Ss && (this.As(), (this.Ss = !1)),
                this.ys && (this.Bs(), (this.ys = !1)),
                this.xs && (this.Is(), (this.xs = !1))
        }
        Is() {
            const t = this.Ts.Ot(),
                i = this.Ps.yt()
            if ((this.zs(), i.Ni() || t.Ni())) return
            const n = i.Vs()
            if (null === n) return
            if (0 === this.Ts.En().Ns()) return
            const s = this.Ts.Tt()
            null !== s &&
                ((this.Cs = Mt(this.ks, n, this.Rs)),
                this.Fs(t, i, s.Bt),
                this.Ws())
        }
    }
    class St extends xt {
        constructor(t, i) {
            super(t, i, !0)
        }
        Fs(t, i, n) {
            i.js(this.ks, k(this.Cs)), t.$s(this.ks, n, k(this.Cs))
        }
        Hs(t, i) {
            return { _t: t, ut: i, st: NaN, et: NaN }
        }
        As() {
            const t = this.Ts.Es()
            this.ks = this.Ts.En()
                .Us()
                .map((i) => {
                    const n = i.Bt[3]
                    return this.qs(i.Ys, n, t)
                })
        }
    }
    class yt extends St {
        constructor(t, i) {
            super(t, i),
                (this.Os = new R()),
                (this.Xs = new dt()),
                (this.Zs = new vt()),
                this.Os.Y([this.Xs, this.Zs])
        }
        qs(t, i, n) {
            return Object.assign(Object.assign({}, this.Hs(t, i)), n.Ls(t))
        }
        Ws() {
            const t = this.Ts.F()
            this.Xs.tt({
                cs: t.lineType,
                nt: this.ks,
                Ft: t.lineStyle,
                rt: t.lineWidth,
                ds: null,
                fs: t.invertFilledArea,
                it: this.Cs,
                us: this.Ps.yt().Ks(),
            }),
                this.Zs.tt({
                    cs: t.lineType,
                    nt: this.ks,
                    Ft: t.lineStyle,
                    rt: t.lineWidth,
                    it: this.Cs,
                    us: this.Ps.yt().Ks(),
                })
        }
    }
    class kt extends z {
        constructor() {
            super(...arguments), (this.It = null), (this.Gs = 0), (this.Js = 0)
        }
        tt(t) {
            this.It = t
        }
        Z({ context: t, horizontalPixelRatio: i, verticalPixelRatio: n }) {
            if (
                null === this.It ||
                0 === this.It.En.length ||
                null === this.It.it
            )
                return
            if (((this.Gs = this.Qs(i)), this.Gs >= 2)) {
                Math.max(1, Math.floor(i)) % 2 != this.Gs % 2 && this.Gs--
            }
            this.Js = this.It.te ? Math.min(this.Gs, Math.floor(i)) : this.Gs
            let s = null
            const e = this.Js <= this.Gs && this.It.Ks >= Math.floor(1.5 * i)
            for (let r = this.It.it.from; r < this.It.it.to; ++r) {
                const h = this.It.En[r]
                s !== h.ie && ((t.fillStyle = h.ie), (s = h.ie))
                const l = Math.floor(0.5 * this.Js),
                    a = Math.round(h.st * i),
                    o = a - l,
                    _ = this.Js,
                    u = o + _ - 1,
                    c = Math.min(h.ne, h.se),
                    d = Math.max(h.ne, h.se),
                    f = Math.round(c * n) - l,
                    p = Math.round(d * n) + l,
                    v = Math.max(p - f, this.Js)
                t.fillRect(o, f, _, v)
                const m = Math.ceil(1.5 * this.Gs)
                if (e) {
                    if (this.It.ee) {
                        const i = a - m
                        let s = Math.max(f, Math.round(h.re * n) - l),
                            e = s + _ - 1
                        e > f + v - 1 && ((e = f + v - 1), (s = e - _ + 1)),
                            t.fillRect(i, s, o - i, e - s + 1)
                    }
                    const i = a + m
                    let s = Math.max(f, Math.round(h.he * n) - l),
                        e = s + _ - 1
                    e > f + v - 1 && ((e = f + v - 1), (s = e - _ + 1)),
                        t.fillRect(u + 1, s, i - u, e - s + 1)
                }
            }
        }
        Qs(t) {
            const i = Math.floor(t)
            return Math.max(
                i,
                Math.floor(
                    (function (t, i) {
                        return Math.floor(0.3 * t * i)
                    })(h(this.It).Ks, t)
                )
            )
        }
    }
    class Ct extends xt {
        constructor(t, i) {
            super(t, i, !1)
        }
        Fs(t, i, n) {
            i.js(this.ks, k(this.Cs)), t.le(this.ks, n, k(this.Cs))
        }
        ae(t, i, n) {
            return {
                _t: t,
                oe: i.Bt[0],
                _e: i.Bt[1],
                ue: i.Bt[2],
                ce: i.Bt[3],
                st: NaN,
                re: NaN,
                ne: NaN,
                se: NaN,
                he: NaN,
            }
        }
        As() {
            const t = this.Ts.Es()
            this.ks = this.Ts.En()
                .Us()
                .map((i) => this.qs(i.Ys, i, t))
        }
    }
    class Tt extends Ct {
        constructor() {
            super(...arguments), (this.Os = new kt())
        }
        qs(t, i, n) {
            return Object.assign(Object.assign({}, this.ae(t, i, n)), n.Ls(t))
        }
        Ws() {
            const t = this.Ts.F()
            this.Os.tt({
                En: this.ks,
                Ks: this.Ps.yt().Ks(),
                ee: t.openVisible,
                te: t.thinBars,
                it: this.Cs,
            })
        }
    }
    function Pt(t, i, n) {
        return Math.min(Math.max(t, i), n)
    }
    function Rt(t, i, n) {
        return i - t <= n
    }
    function Dt(t) {
        return t <= 0 ? NaN : Math.log(t) / Math.log(10)
    }
    function Ot(t) {
        const i = Math.ceil(t)
        return i % 2 == 0 ? i - 1 : i
    }
    class Bt extends ct {
        constructor() {
            super(...arguments), (this.vs = null)
        }
        ps(t, i) {
            var n
            const { context: s, mediaSize: e } = t,
                r = this.J,
                { de: h, fe: l, pe: a, ve: o } = i,
                _ = null !== (n = r.ds) && void 0 !== n ? n : e.height,
                u = e.height
            if (
                null !== this.vs &&
                this.vs.topFillColor1 === h &&
                this.vs.topFillColor2 === l &&
                this.vs.bottomFillColor1 === a &&
                this.vs.bottomFillColor2 === o &&
                this.vs.baseLevelCoordinate === _ &&
                this.vs.bottom === u
            )
                return this.vs.fillStyle
            const c = s.createLinearGradient(0, 0, 0, u),
                d = Pt(_ / u, 0, 1)
            return (
                c.addColorStop(0, h),
                c.addColorStop(d, l),
                c.addColorStop(d, a),
                c.addColorStop(1, o),
                (this.vs = {
                    topFillColor1: h,
                    topFillColor2: l,
                    bottomFillColor1: a,
                    bottomFillColor2: o,
                    fillStyle: c,
                    baseLevelCoordinate: _,
                    bottom: u,
                }),
                c
            )
        }
    }
    class Lt extends pt {
        constructor() {
            super(...arguments), (this.me = null)
        }
        ws(t, i) {
            const { context: n, mediaSize: s } = t,
                e = this.J,
                { be: r, ge: h } = i,
                { ds: l } = e,
                a = s.height
            if (
                null !== this.me &&
                this.me.topLineColor === r &&
                this.me.bottomLineColor === h &&
                this.me.baseLevelCoordinate === l &&
                this.me.bottom === a
            )
                return this.me.strokeStyle
            const o = n.createLinearGradient(0, 0, 0, a),
                _ = Pt(l / a, 0, 1)
            return (
                o.addColorStop(0, r),
                o.addColorStop(_, r),
                o.addColorStop(_, h),
                o.addColorStop(1, h),
                (this.me = {
                    topLineColor: r,
                    bottomLineColor: h,
                    strokeStyle: o,
                    baseLevelCoordinate: l,
                    bottom: a,
                }),
                o
            )
        }
    }
    class Et extends St {
        constructor(t, i) {
            super(t, i),
                (this.Os = new R()),
                (this.we = new Bt()),
                (this.Me = new Lt()),
                this.Os.Y([this.we, this.Me])
        }
        qs(t, i, n) {
            return Object.assign(Object.assign({}, this.Hs(t, i)), n.Ls(t))
        }
        Ws() {
            const t = this.Ts.Tt()
            if (null === t) return
            const i = this.Ts.F(),
                n = this.Ts.Ot().Dt(i.baseValue.price, t.Bt),
                s = this.Ps.yt().Ks()
            this.we.tt({
                nt: this.ks,
                rt: i.lineWidth,
                Ft: i.lineStyle,
                cs: i.lineType,
                ds: n,
                fs: !1,
                it: this.Cs,
                us: s,
            }),
                this.Me.tt({
                    nt: this.ks,
                    rt: i.lineWidth,
                    Ft: i.lineStyle,
                    cs: i.lineType,
                    ds: n,
                    it: this.Cs,
                    us: s,
                })
        }
    }
    class zt extends z {
        constructor() {
            super(...arguments), (this.It = null), (this.Gs = 0)
        }
        tt(t) {
            this.It = t
        }
        Z(t) {
            if (
                null === this.It ||
                0 === this.It.En.length ||
                null === this.It.it
            )
                return
            const { horizontalPixelRatio: i } = t
            if (
                ((this.Gs = (function (t, i) {
                    if (t >= 2.5 && t <= 4) return Math.floor(3 * i)
                    const n =
                            1 -
                            (0.2 * Math.atan(Math.max(4, t) - 4)) /
                                (0.5 * Math.PI),
                        s = Math.floor(t * n * i),
                        e = Math.floor(t * i),
                        r = Math.min(s, e)
                    return Math.max(Math.floor(i), r)
                })(this.It.Ks, i)),
                this.Gs >= 2)
            ) {
                Math.floor(i) % 2 != this.Gs % 2 && this.Gs--
            }
            const n = this.It.En
            this.It.xe && this.Se(t, n, this.It.it),
                this.It.ui && this.ye(t, n, this.It.it)
            const s = this.ke(i)
            ;(!this.It.ui || this.Gs > 2 * s) && this.Ce(t, n, this.It.it)
        }
        Se(t, i, n) {
            if (null === this.It) return
            const {
                context: s,
                horizontalPixelRatio: e,
                verticalPixelRatio: r,
            } = t
            let h = "",
                l = Math.min(Math.floor(e), Math.floor(this.It.Ks * e))
            l = Math.max(Math.floor(e), Math.min(l, this.Gs))
            const a = Math.floor(0.5 * l)
            let o = null
            for (let t = n.from; t < n.to; t++) {
                const n = i[t]
                n.Te !== h && ((s.fillStyle = n.Te), (h = n.Te))
                const _ = Math.round(Math.min(n.re, n.he) * r),
                    u = Math.round(Math.max(n.re, n.he) * r),
                    c = Math.round(n.ne * r),
                    d = Math.round(n.se * r)
                let f = Math.round(e * n.st) - a
                const p = f + l - 1
                null !== o && ((f = Math.max(o + 1, f)), (f = Math.min(f, p)))
                const v = p - f + 1
                s.fillRect(f, c, v, _ - c),
                    s.fillRect(f, u + 1, v, d - u),
                    (o = p)
            }
        }
        ke(t) {
            let i = Math.floor(1 * t)
            this.Gs <= 2 * i && (i = Math.floor(0.5 * (this.Gs - 1)))
            const n = Math.max(Math.floor(t), i)
            return this.Gs <= 2 * n
                ? Math.max(Math.floor(t), Math.floor(1 * t))
                : n
        }
        ye(t, i, n) {
            if (null === this.It) return
            const {
                context: s,
                horizontalPixelRatio: e,
                verticalPixelRatio: r,
            } = t
            let h = ""
            const l = this.ke(e)
            let a = null
            for (let t = n.from; t < n.to; t++) {
                const n = i[t]
                n.Pe !== h && ((s.fillStyle = n.Pe), (h = n.Pe))
                let o = Math.round(n.st * e) - Math.floor(0.5 * this.Gs)
                const _ = o + this.Gs - 1,
                    u = Math.round(Math.min(n.re, n.he) * r),
                    c = Math.round(Math.max(n.re, n.he) * r)
                if (
                    (null !== a &&
                        ((o = Math.max(a + 1, o)), (o = Math.min(o, _))),
                    this.It.Ks * e > 2 * l)
                )
                    V(s, o, u, _ - o + 1, c - u + 1, l)
                else {
                    const t = _ - o + 1
                    s.fillRect(o, u, t, c - u + 1)
                }
                a = _
            }
        }
        Ce(t, i, n) {
            if (null === this.It) return
            const {
                context: s,
                horizontalPixelRatio: e,
                verticalPixelRatio: r,
            } = t
            let h = ""
            const l = this.ke(e)
            for (let t = n.from; t < n.to; t++) {
                const n = i[t]
                let a = Math.round(Math.min(n.re, n.he) * r),
                    o = Math.round(Math.max(n.re, n.he) * r),
                    _ = Math.round(n.st * e) - Math.floor(0.5 * this.Gs),
                    u = _ + this.Gs - 1
                if (n.ie !== h) {
                    const t = n.ie
                    ;(s.fillStyle = t), (h = t)
                }
                this.It.ui && ((_ += l), (a += l), (u -= l), (o -= l)),
                    a > o || s.fillRect(_, a, u - _ + 1, o - a + 1)
            }
        }
    }
    class At extends Ct {
        constructor() {
            super(...arguments), (this.Os = new zt())
        }
        qs(t, i, n) {
            return Object.assign(Object.assign({}, this.ae(t, i, n)), n.Ls(t))
        }
        Ws() {
            const t = this.Ts.F()
            this.Os.tt({
                En: this.ks,
                Ks: this.Ps.yt().Ks(),
                xe: t.wickVisible,
                ui: t.borderVisible,
                it: this.Cs,
            })
        }
    }
    class It extends z {
        constructor() {
            super(...arguments), (this.It = null), (this.Re = [])
        }
        tt(t) {
            ;(this.It = t), (this.Re = [])
        }
        Z({ context: t, horizontalPixelRatio: i, verticalPixelRatio: n }) {
            if (
                null === this.It ||
                0 === this.It.nt.length ||
                null === this.It.it
            )
                return
            this.Re.length || this.De(i)
            const s = Math.max(1, Math.floor(n)),
                e = Math.round(this.It.Oe * n) - Math.floor(s / 2),
                r = e + s
            for (let i = this.It.it.from; i < this.It.it.to; i++) {
                const h = this.It.nt[i],
                    l = this.Re[i - this.It.it.from],
                    a = Math.round(h.et * n)
                let o, _
                ;(t.fillStyle = h.ie),
                    a <= e
                        ? ((o = a), (_ = r))
                        : ((o = e), (_ = a - Math.floor(s / 2) + s)),
                    t.fillRect(l.Ms, o, l.ci - l.Ms + 1, _ - o)
            }
        }
        De(t) {
            if (
                null === this.It ||
                0 === this.It.nt.length ||
                null === this.It.it
            )
                return void (this.Re = [])
            const i =
                    Math.ceil(this.It.Ks * t) <= 1
                        ? 0
                        : Math.max(1, Math.floor(t)),
                n = Math.round(this.It.Ks * t) - i
            this.Re = new Array(this.It.it.to - this.It.it.from)
            for (let i = this.It.it.from; i < this.It.it.to; i++) {
                const s = this.It.nt[i],
                    e = Math.round(s.st * t)
                let r, h
                if (n % 2) {
                    const t = (n - 1) / 2
                    ;(r = e - t), (h = e + t)
                } else {
                    const t = n / 2
                    ;(r = e - t), (h = e + t - 1)
                }
                this.Re[i - this.It.it.from] = {
                    Ms: r,
                    ci: h,
                    Be: e,
                    Le: s.st * t,
                    _t: s._t,
                }
            }
            for (let t = this.It.it.from + 1; t < this.It.it.to; t++) {
                const n = this.Re[t - this.It.it.from],
                    s = this.Re[t - this.It.it.from - 1]
                n._t === s._t + 1 &&
                    n.Ms - s.ci !== i + 1 &&
                    (s.Be > s.Le
                        ? (s.ci = n.Ms - i - 1)
                        : (n.Ms = s.ci + i + 1))
            }
            let s = Math.ceil(this.It.Ks * t)
            for (let t = this.It.it.from; t < this.It.it.to; t++) {
                const i = this.Re[t - this.It.it.from]
                i.ci < i.Ms && (i.ci = i.Ms)
                const n = i.ci - i.Ms + 1
                s = Math.min(n, s)
            }
            if (i > 0 && s < 4)
                for (let t = this.It.it.from; t < this.It.it.to; t++) {
                    const i = this.Re[t - this.It.it.from]
                    i.ci - i.Ms + 1 > s &&
                        (i.Be > i.Le ? (i.ci -= 1) : (i.Ms += 1))
                }
        }
    }
    class Vt extends St {
        constructor() {
            super(...arguments), (this.Os = new It())
        }
        qs(t, i, n) {
            return Object.assign(Object.assign({}, this.Hs(t, i)), n.Ls(t))
        }
        Ws() {
            const t = {
                nt: this.ks,
                Ks: this.Ps.yt().Ks(),
                it: this.Cs,
                Oe: this.Ts.Ot().Dt(this.Ts.F().base, h(this.Ts.Tt()).Bt),
            }
            this.Os.tt(t)
        }
    }
    class Nt extends St {
        constructor() {
            super(...arguments), (this.Os = new vt())
        }
        qs(t, i, n) {
            return Object.assign(Object.assign({}, this.Hs(t, i)), n.Ls(t))
        }
        Ws() {
            const t = this.Ts.F(),
                i = {
                    nt: this.ks,
                    Ft: t.lineStyle,
                    cs: t.lineType,
                    rt: t.lineWidth,
                    it: this.Cs,
                    us: this.Ps.yt().Ks(),
                }
            this.Os.tt(i)
        }
    }
    const Ft = /[2-9]/g
    class Wt {
        constructor(t = 50) {
            ;(this.Ee = 0),
                (this.ze = 1),
                (this.Ae = 1),
                (this.Ie = {}),
                (this.Ve = new Map()),
                (this.Ne = t)
        }
        Fe() {
            ;(this.Ee = 0),
                this.Ve.clear(),
                (this.ze = 1),
                (this.Ae = 1),
                (this.Ie = {})
        }
        xi(t, i, n) {
            return this.We(t, i, n).width
        }
        Mi(t, i, n) {
            const s = this.We(t, i, n)
            return (
                ((s.actualBoundingBoxAscent || 0) -
                    (s.actualBoundingBoxDescent || 0)) /
                2
            )
        }
        We(t, i, n) {
            const s = n || Ft,
                e = String(i).replace(s, "0")
            if (this.Ve.has(e)) return r(this.Ve.get(e)).je
            if (this.Ee === this.Ne) {
                const t = this.Ie[this.Ae]
                delete this.Ie[this.Ae], this.Ve.delete(t), this.Ae++, this.Ee--
            }
            t.save(), (t.textBaseline = "middle")
            const h = t.measureText(e)
            return (
                t.restore(),
                (0 === h.width && i.length) ||
                    (this.Ve.set(e, { je: h, $e: this.ze }),
                    (this.Ie[this.ze] = e),
                    this.Ee++,
                    this.ze++),
                h
            )
        }
    }
    class jt {
        constructor(t) {
            ;(this.He = null),
                (this.S = null),
                (this.Ue = "right"),
                (this.qe = t)
        }
        Ye(t, i, n) {
            ;(this.He = t), (this.S = i), (this.Ue = n)
        }
        X(t) {
            null !== this.S &&
                null !== this.He &&
                this.He.X(t, this.S, this.qe, this.Ue)
        }
    }
    class $t {
        constructor(t, i, n) {
            ;(this.Xe = t),
                (this.qe = new Wt(50)),
                (this.Ze = i),
                (this.N = n),
                (this.W = -1),
                (this.jt = new jt(this.qe))
        }
        Mt() {
            const t = this.N.Ke(this.Ze)
            if (null === t) return null
            const i = t.Ge(this.Ze) ? t.Je() : this.Ze.Ot()
            if (null === i) return null
            const n = t.Qe(i)
            if ("overlay" === n) return null
            const s = this.N.tr()
            return (
                s.T !== this.W && ((this.W = s.T), this.qe.Fe()),
                this.jt.Ye(this.Xe.zi(), s, n),
                this.jt
            )
        }
    }
    class Ht extends z {
        constructor() {
            super(...arguments), (this.It = null)
        }
        tt(t) {
            this.It = t
        }
        ir(t, i) {
            var n
            if (!(null === (n = this.It) || void 0 === n ? void 0 : n.Ct))
                return null
            const { et: s, rt: e, nr: r } = this.It
            return i >= s - e - 7 && i <= s + e + 7
                ? { sr: this.It, nr: r }
                : null
        }
        Z({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: e,
            verticalPixelRatio: r,
        }) {
            if (null === this.It) return
            if (!1 === this.It.Ct) return
            const h = Math.round(this.It.et * r)
            h < 0 ||
                h > i.height ||
                ((t.lineCap = "butt"),
                (t.strokeStyle = this.It.D),
                (t.lineWidth = Math.floor(this.It.rt * e)),
                n(t, this.It.Ft),
                s(t, h, 0, i.width))
        }
    }
    class Ut {
        constructor(t) {
            ;(this.er = { et: 0, D: "rgba(0, 0, 0, 0)", rt: 1, Ft: 0, Ct: !1 }),
                (this.rr = new Ht()),
                (this.vt = !0),
                (this.Ts = t),
                (this.Ps = t.Ut()),
                this.rr.tt(this.er)
        }
        gt() {
            this.vt = !0
        }
        Mt() {
            return this.Ts.Ct()
                ? (this.vt && (this.hr(), (this.vt = !1)), this.rr)
                : null
        }
    }
    class qt extends Ut {
        constructor(t) {
            super(t)
        }
        hr() {
            this.er.Ct = !1
            const t = this.Ts.Ot(),
                i = t.lr().lr
            if (2 !== i && 3 !== i) return
            const n = this.Ts.F()
            if (!n.baseLineVisible || !this.Ts.Ct()) return
            const s = this.Ts.Tt()
            null !== s &&
                ((this.er.Ct = !0),
                (this.er.et = t.Dt(s.Bt, s.Bt)),
                (this.er.D = n.baseLineColor),
                (this.er.rt = n.baseLineWidth),
                (this.er.Ft = n.baseLineStyle))
        }
    }
    class Yt extends z {
        constructor() {
            super(...arguments), (this.It = null)
        }
        tt(t) {
            this.It = t
        }
        ar() {
            return this.It
        }
        Z({ context: t, horizontalPixelRatio: i, verticalPixelRatio: n }) {
            const s = this.It
            if (null === s) return
            const e = Math.max(1, Math.floor(i)),
                r = (e % 2) / 2,
                h = Math.round(s.Le.x * i) + r,
                l = s.Le.y * n
            ;(t.fillStyle = s._r), t.beginPath()
            const a = Math.max(2, 1.5 * s.ur) * i
            t.arc(h, l, a, 0, 2 * Math.PI, !1),
                t.fill(),
                (t.fillStyle = s.cr),
                t.beginPath(),
                t.arc(h, l, s.lt * i, 0, 2 * Math.PI, !1),
                t.fill(),
                (t.lineWidth = e),
                (t.strokeStyle = s.dr),
                t.beginPath(),
                t.arc(h, l, s.lt * i + e / 2, 0, 2 * Math.PI, !1),
                t.stroke()
        }
    }
    const Xt = [
        { pr: 0, vr: 0.25, mr: 4, br: 10, gr: 0.25, wr: 0, Mr: 0.4, Sr: 0.8 },
        { pr: 0.25, vr: 0.525, mr: 10, br: 14, gr: 0, wr: 0, Mr: 0.8, Sr: 0 },
        { pr: 0.525, vr: 1, mr: 14, br: 14, gr: 0, wr: 0, Mr: 0, Sr: 0 },
    ]
    function Zt(t, i, n, s) {
        return (function (t, i) {
            if ("transparent" === t) return t
            const n = p(t),
                s = n[3]
            return `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i * s})`
        })(t, n + (s - n) * i)
    }
    function Kt(t, i) {
        const n = (t % 2600) / 2600
        let s
        for (const t of Xt)
            if (n >= t.pr && n <= t.vr) {
                s = t
                break
            }
        e(void 0 !== s, "Last price animation internal logic error")
        const r = (n - s.pr) / (s.vr - s.pr)
        return {
            cr: Zt(i, r, s.gr, s.wr),
            dr: Zt(i, r, s.Mr, s.Sr),
            lt: ((h = r), (l = s.mr), (a = s.br), l + (a - l) * h),
        }
        var h, l, a
    }
    class Gt {
        constructor(t) {
            ;(this.jt = new Yt()),
                (this.vt = !0),
                (this.yr = !0),
                (this.kr = performance.now()),
                (this.Cr = this.kr - 1),
                (this.Tr = t)
        }
        Pr() {
            ;(this.Cr = this.kr - 1), this.gt()
        }
        Rr() {
            if ((this.gt(), 2 === this.Tr.F().lastPriceAnimation)) {
                const t = performance.now(),
                    i = this.Cr - t
                if (i > 0) return void (i < 650 && (this.Cr += 2600))
                ;(this.kr = t), (this.Cr = t + 2600)
            }
        }
        gt() {
            this.vt = !0
        }
        Dr() {
            this.yr = !0
        }
        Ct() {
            return 0 !== this.Tr.F().lastPriceAnimation
        }
        Or() {
            switch (this.Tr.F().lastPriceAnimation) {
                case 0:
                    return !1
                case 1:
                    return !0
                case 2:
                    return performance.now() <= this.Cr
            }
        }
        Mt() {
            return (
                this.vt
                    ? (this.xt(), (this.vt = !1), (this.yr = !1))
                    : this.yr && (this.Br(), (this.yr = !1)),
                this.jt
            )
        }
        xt() {
            this.jt.tt(null)
            const t = this.Tr.Ut().yt(),
                i = t.Vs(),
                n = this.Tr.Tt()
            if (null === i || null === n) return
            const s = this.Tr.Lr(!0)
            if (s.Er || !i.zr(s.Ys)) return
            const e = { x: t.At(s.Ys), y: this.Tr.Ot().Dt(s.ut, n.Bt) },
                r = s.D,
                h = this.Tr.F().lineWidth,
                l = Kt(this.Ar(), r)
            this.jt.tt({ _r: r, ur: h, cr: l.cr, dr: l.dr, lt: l.lt, Le: e })
        }
        Br() {
            const t = this.jt.ar()
            if (null !== t) {
                const i = Kt(this.Ar(), t._r)
                ;(t.cr = i.cr), (t.dr = i.dr), (t.lt = i.lt)
            }
        }
        Ar() {
            return this.Or() ? performance.now() - this.kr : 2599
        }
    }
    function Jt(t, i) {
        return Ot(Math.min(Math.max(t, 12), 30) * i)
    }
    function Qt(t, i) {
        switch (t) {
            case "arrowDown":
            case "arrowUp":
                return Jt(i, 1)
            case "circle":
                return Jt(i, 0.8)
            case "square":
                return Jt(i, 0.7)
        }
    }
    function ti(t) {
        return (function (t) {
            const i = Math.ceil(t)
            return i % 2 != 0 ? i - 1 : i
        })(Jt(t, 1))
    }
    function ii(t) {
        return Math.max(Jt(t, 0.1), 3)
    }
    function ni(t, i, n, s, e) {
        const r = Qt("square", n),
            h = (r - 1) / 2,
            l = t - h,
            a = i - h
        return s >= l && s <= l + r && e >= a && e <= a + r
    }
    function si(t, i, n, s, e) {
        const r = (Qt("arrowUp", e) - 1) / 2,
            h = (Ot(e / 2) - 1) / 2
        i.beginPath(),
            t
                ? (i.moveTo(n - r, s),
                  i.lineTo(n, s - r),
                  i.lineTo(n + r, s),
                  i.lineTo(n + h, s),
                  i.lineTo(n + h, s + r),
                  i.lineTo(n - h, s + r),
                  i.lineTo(n - h, s))
                : (i.moveTo(n - r, s),
                  i.lineTo(n, s + r),
                  i.lineTo(n + r, s),
                  i.lineTo(n + h, s),
                  i.lineTo(n + h, s - r),
                  i.lineTo(n - h, s - r),
                  i.lineTo(n - h, s)),
            i.fill()
    }
    function ei(t, i, n, s, e, r) {
        return ni(i, n, s, e, r)
    }
    class ri extends D {
        constructor() {
            super(...arguments),
                (this.It = null),
                (this.qe = new Wt()),
                (this.W = -1),
                (this.j = ""),
                (this.Ir = "")
        }
        tt(t) {
            this.It = t
        }
        Ye(t, i) {
            ;(this.W === t && this.j === i) ||
                ((this.W = t), (this.j = i), (this.Ir = T(t, i)), this.qe.Fe())
        }
        ir(t, i) {
            if (null === this.It || null === this.It.it) return null
            for (let n = this.It.it.from; n < this.It.it.to; n++) {
                const s = this.It.nt[n]
                if (li(s, t, i)) return { sr: s.Vr, nr: s.nr }
            }
            return null
        }
        Z({ context: t }, i, n) {
            if (null !== this.It && null !== this.It.it) {
                ;(t.textBaseline = "middle"), (t.font = this.Ir)
                for (let i = this.It.it.from; i < this.It.it.to; i++) {
                    const n = this.It.nt[i]
                    void 0 !== n.Gt &&
                        ((n.Gt.$i = this.qe.xi(t, n.Gt.Nr)),
                        (n.Gt.zt = this.W),
                        (n.Gt.st = n.st - n.Gt.$i / 2)),
                        hi(n, t)
                }
            }
        }
    }
    function hi(t, i) {
        ;(i.fillStyle = t.D),
            void 0 !== t.Gt &&
                (function (t, i, n, s) {
                    t.fillText(i, n, s)
                })(i, t.Gt.Nr, t.Gt.st, t.Gt.et),
            (function (t, i) {
                if (0 === t.Ns) return
                switch (t.Fr) {
                    case "arrowDown":
                        return void si(!1, i, t.st, t.et, t.Ns)
                    case "arrowUp":
                        return void si(!0, i, t.st, t.et, t.Ns)
                    case "circle":
                        return void (function (t, i, n, s) {
                            const e = (Qt("circle", s) - 1) / 2
                            t.beginPath(),
                                t.arc(i, n, e, 0, 2 * Math.PI, !1),
                                t.fill()
                        })(i, t.st, t.et, t.Ns)
                    case "square":
                        return void (function (t, i, n, s) {
                            const e = Qt("square", s),
                                r = (e - 1) / 2,
                                h = i - r,
                                l = n - r
                            t.fillRect(h, l, e, e)
                        })(i, t.st, t.et, t.Ns)
                }
                t.Fr
            })(t, i)
    }
    function li(t, i, n) {
        return (
            !(
                void 0 === t.Gt ||
                !(function (t, i, n, s, e, r) {
                    const h = s / 2
                    return e >= t && e <= t + n && r >= i - h && r <= i + h
                })(t.Gt.st, t.Gt.et, t.Gt.$i, t.Gt.zt, i, n)
            ) ||
            (function (t, i, n) {
                if (0 === t.Ns) return !1
                switch (t.Fr) {
                    case "arrowDown":
                    case "arrowUp":
                        return ei(0, t.st, t.et, t.Ns, i, n)
                    case "circle":
                        return (function (t, i, n, s, e) {
                            const r = 2 + Qt("circle", n) / 2,
                                h = t - s,
                                l = i - e
                            return Math.sqrt(h * h + l * l) <= r
                        })(t.st, t.et, t.Ns, i, n)
                    case "square":
                        return ni(t.st, t.et, t.Ns, i, n)
                }
            })(t, i, n)
        )
    }
    function ai(t, i, n, s, e, r, h, l, a) {
        const o = g(n) ? n : n.ce,
            _ = g(n) ? n : n._e,
            u = g(n) ? n : n.ue,
            c = g(i.size) ? Math.max(i.size, 0) : 1,
            d = ti(l.Ks()) * c,
            f = d / 2
        switch (((t.Ns = d), i.position)) {
            case "inBar":
                return (
                    (t.et = h.Dt(o, a)),
                    void (void 0 !== t.Gt && (t.Gt.et = t.et + f + r + 0.6 * e))
                )
            case "aboveBar":
                return (
                    (t.et = h.Dt(_, a) - f - s.Wr),
                    void 0 !== t.Gt &&
                        ((t.Gt.et = t.et - f - 0.6 * e), (s.Wr += 1.2 * e)),
                    void (s.Wr += d + r)
                )
            case "belowBar":
                return (
                    (t.et = h.Dt(u, a) + f + s.jr),
                    void 0 !== t.Gt &&
                        ((t.Gt.et = t.et + f + r + 0.6 * e), (s.jr += 1.2 * e)),
                    void (s.jr += d + r)
                )
        }
        i.position
    }
    class oi {
        constructor(t, i) {
            ;(this.vt = !0),
                (this.$r = !0),
                (this.Hr = !0),
                (this.Ur = null),
                (this.jt = new ri()),
                (this.Tr = t),
                (this.Hi = i),
                (this.It = { nt: [], it: null })
        }
        gt(t) {
            ;(this.vt = !0), (this.Hr = !0), "data" === t && (this.$r = !0)
        }
        Mt(t) {
            if (!this.Tr.Ct()) return null
            this.vt && this.qr()
            const i = this.Hi.F().layout
            return (
                this.jt.Ye(i.fontSize, i.fontFamily),
                this.jt.tt(this.It),
                this.jt
            )
        }
        Yr() {
            if (this.Hr) {
                if (this.Tr.Xr().length > 0) {
                    const t = this.Hi.yt().Ks(),
                        i = ii(t),
                        n = 1.5 * ti(t) + 2 * i
                    this.Ur = { above: n, below: n }
                } else this.Ur = null
                this.Hr = !1
            }
            return this.Ur
        }
        qr() {
            const t = this.Tr.Ot(),
                i = this.Hi.yt(),
                n = this.Tr.Xr()
            this.$r &&
                ((this.It.nt = n.map((t) => ({
                    _t: t.time,
                    st: 0,
                    et: 0,
                    Ns: 0,
                    Fr: t.shape,
                    D: t.color,
                    Vr: t.internalId,
                    nr: t.id,
                    Gt: void 0,
                }))),
                (this.$r = !1))
            const s = this.Hi.F().layout
            this.It.it = null
            const e = i.Vs()
            if (null === e) return
            const r = this.Tr.Tt()
            if (null === r) return
            if (0 === this.It.nt.length) return
            let h = NaN
            const l = ii(i.Ks()),
                a = { Wr: l, jr: l }
            this.It.it = Mt(this.It.nt, e, !0)
            for (let e = this.It.it.from; e < this.It.it.to; e++) {
                const o = n[e]
                o.time !== h && ((a.Wr = l), (a.jr = l), (h = o.time))
                const _ = this.It.nt[e]
                ;(_.st = i.At(o.time)),
                    void 0 !== o.text &&
                        o.text.length > 0 &&
                        (_.Gt = { Nr: o.text, st: 0, et: 0, $i: 0, zt: 0 })
                const u = this.Tr.Zr(o.time)
                null !== u && ai(_, o, u, a, s.fontSize, l, t, i, r.Bt)
            }
            this.vt = !1
        }
    }
    class _i extends Ut {
        constructor(t) {
            super(t)
        }
        hr() {
            const t = this.er
            t.Ct = !1
            const i = this.Ts.F()
            if (!i.priceLineVisible || !this.Ts.Ct()) return
            const n = this.Ts.Lr(0 === i.priceLineSource)
            n.Er ||
                ((t.Ct = !0),
                (t.et = n.yi),
                (t.D = this.Ts.Kr(n.D)),
                (t.rt = i.priceLineWidth),
                (t.Ft = i.priceLineStyle))
        }
    }
    class ui extends U {
        constructor(t) {
            super(), (this.$t = t)
        }
        Ai(t, i, n) {
            ;(t.Ct = !1), (i.Ct = !1)
            const s = this.$t
            if (!s.Ct()) return
            const e = s.F(),
                r = e.lastValueVisible,
                h = "" !== s.Gr(),
                l = 0 === e.seriesLastValueMode,
                a = s.Lr(!1)
            if (a.Er) return
            r && ((t.Gt = this.Jr(a, r, l)), (t.Ct = 0 !== t.Gt.length)),
                (h || l) &&
                    ((i.Gt = this.Qr(a, r, h, l)), (i.Ct = i.Gt.length > 0))
            const o = s.Kr(a.D),
                _ = v(o)
            ;(n.t = _.t),
                (n.yi = a.yi),
                (i.Lt = s.Ut().Et(a.yi / s.Ot().zt())),
                (t.Lt = o),
                (t.D = _.i),
                (i.D = _.i)
        }
        Qr(t, i, n, s) {
            let e = ""
            const r = this.$t.Gr()
            return (
                n && 0 !== r.length && (e += `${r} `),
                i && s && (e += this.$t.Ot().th() ? t.ih : t.nh),
                e.trim()
            )
        }
        Jr(t, i, n) {
            return i ? (n ? (this.$t.Ot().th() ? t.nh : t.ih) : t.Gt) : ""
        }
    }
    class ci {
        constructor(t, i) {
            ;(this.sh = t), (this.eh = i)
        }
        rh(t) {
            return null !== t && this.sh === t.sh && this.eh === t.eh
        }
        hh() {
            return new ci(this.sh, this.eh)
        }
        lh() {
            return this.sh
        }
        ah() {
            return this.eh
        }
        oh() {
            return this.eh - this.sh
        }
        Ni() {
            return (
                this.eh === this.sh ||
                Number.isNaN(this.eh) ||
                Number.isNaN(this.sh)
            )
        }
        Qn(t) {
            return null === t
                ? this
                : new ci(
                      Math.min(this.lh(), t.lh()),
                      Math.max(this.ah(), t.ah())
                  )
        }
        _h(t) {
            if (!g(t)) return
            if (0 === this.eh - this.sh) return
            const i = 0.5 * (this.eh + this.sh)
            let n = this.eh - i,
                s = this.sh - i
            ;(n *= t), (s *= t), (this.eh = i + n), (this.sh = i + s)
        }
        uh(t) {
            g(t) && ((this.eh += t), (this.sh += t))
        }
        dh() {
            return { minValue: this.sh, maxValue: this.eh }
        }
        static fh(t) {
            return null === t ? null : new ci(t.minValue, t.maxValue)
        }
    }
    class di {
        constructor(t, i) {
            ;(this.ph = t), (this.mh = i || null)
        }
        bh() {
            return this.ph
        }
        gh() {
            return this.mh
        }
        dh() {
            return null === this.ph
                ? null
                : { priceRange: this.ph.dh(), margins: this.mh || void 0 }
        }
        static fh(t) {
            return null === t ? null : new di(ci.fh(t.priceRange), t.margins)
        }
    }
    class fi extends z {
        constructor() {
            super(...arguments), (this.It = null)
        }
        tt(t) {
            this.It = t
        }
        Z({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s,
            verticalPixelRatio: e,
        }) {
            if (null === this.It) return
            if (!1 === this.It.Ct) return
            let r = []
            if (0 === this.It.wh.length) {
                const t = Math.round(this.It.Mh * e)
                if (t > i.height) return
                const n = Math.round(this.It.xh * e)
                if (n < 0) return
                const h = Math.round(this.It.Sh * s)
                if (h > i.width) return
                const l = Math.round(this.It.yh * s)
                if (l < 0) return
                r = [
                    { x: h, y: t },
                    { x: h, y: n },
                    { x: l, y: n },
                    { x: l, y: t },
                ]
            } else
                for (let t = 0; t < this.It.wh.length; ++t)
                    r.push({
                        x: Math.round(this.It.wh[t].x * s),
                        y: Math.round(this.It.wh[t].y * e),
                    })
            t.beginPath(), t.moveTo(r[r.length - 1].x, r[r.length - 1].y)
            for (let i = 0; i < r.length; ++i) t.lineTo(r[i].x, r[i].y)
            ;(t.fillStyle = this.kh(this.It.cr, this.It.Ch)),
                t.fill(),
                this.It.ui
                    ? ((t.strokeStyle = this.It.Lt),
                      (t.lineWidth = this.It.Rt),
                      n(t, this.It.Th))
                    : ((t.lineWidth = 1e-5),
                      (t.strokeStyle = this.kh(this.It.cr, this.It.Ch))),
                t.stroke()
        }
        kh(t, i) {
            3 === (t = t.substring(1)).length &&
                (t = `${t[0]}${t[0]}${t[1]}${t[1]}${t[2]}${t[2]}`)
            return `rgba(${parseInt(t.substring(0, 2), 16)}, ${parseInt(
                t.substring(2, 4),
                16
            )}, ${parseInt(t.substring(4, 6), 16)}, ${i})`
        }
    }
    class pi {
        constructor(t) {
            ;(this.Ph = {
                cr: "#000",
                Ch: 1,
                Lt: "#000",
                Th: 0,
                Rt: 1,
                ui: !1,
                wh: [],
                Sh: 0,
                yh: 0,
                Mh: 0,
                xh: 0,
                Ct: !1,
                $i: 0,
                zt: 0,
            }),
                (this.Rh = new fi()),
                (this.vt = !0),
                (this.Ts = t),
                (this.Ps = t.Ut()),
                this.Rh.tt(this.Ph)
        }
        gt() {
            this.vt = !0
        }
        Mt() {
            return this.Ts.Ct()
                ? (this.vt && (this.hr(), (this.vt = !1)), this.Rh)
                : null
        }
    }
    class vi extends pi {
        constructor(t, i) {
            super(t), (this.Dh = i)
        }
        hr() {
            const t = this.Ph,
                i = this.Dh.F()
            if (((t.Ct = !1), this.Ts.Ct()))
                if (
                    ((t.cr = i.fillColor),
                    (t.Ch = i.fillOpacity),
                    (t.Lt = i.borderColor),
                    (t.Th = i.borderStyle),
                    (t.Rt = i.borderWidth),
                    (t.ui = i.borderVisible),
                    (t.wh = []),
                    (t.Ct = !0),
                    0 === i.corners.length)
                ) {
                    const i = this.Dh.Oh(),
                        n = this.Dh.Bh()
                    if (null === i || null === n) return
                    const s = this.Dh.Lh(),
                        e = this.Dh.Eh()
                    if (null === s || null === e) return
                    ;(t.Sh = s), (t.yh = e), (t.Mh = i), (t.xh = n)
                } else
                    for (let n = 0; n < i.corners.length; ++n) {
                        const s = this.Dh.zh(i.corners[n].time),
                            e = this.Dh.Ah(i.corners[n].price)
                        if (null === s || null === e) return
                        t.wh.push({ x: s, y: e })
                    }
        }
    }
    class mi {
        constructor(t, i) {
            ;(this.Tr = t), (this.un = i), (this.Ih = new vi(t, this))
        }
        Vh(t) {
            b(this.un, t), this.gt(), this.Tr.Ut().Nh()
        }
        F() {
            return this.un
        }
        Fh() {
            return this.Ih
        }
        gt() {
            this.Ih.gt()
        }
        Lh() {
            return this.zh(this.un.earlyTime)
        }
        Eh() {
            return this.zh(this.un.lateTime)
        }
        Oh() {
            return this.Ah(this.un.highPrice)
        }
        Bh() {
            return this.Ah(this.un.lowPrice)
        }
        zh(t) {
            const i = this.Tr.Ut().yt(),
                n = i.Wh({ jh: t }, !0)
            return i.Ni() || null === n ? null : i.At(n)
        }
        Ah(t) {
            const i = this.Tr,
                n = i.Ot()
            if (i.Ut().yt().Ni() || n.Ni()) return null
            const s = i.Tt()
            return null === s ? null : n.Dt(t, s.Bt)
        }
    }
    class bi extends Ut {
        constructor(t, i) {
            super(t), (this.$h = i)
        }
        hr() {
            const t = this.er
            t.Ct = !1
            const i = this.$h.F()
            if (!this.Ts.Ct() || !i.lineVisible) return
            const n = this.$h.Ah()
            null !== n &&
                ((t.Ct = !0),
                (t.et = n),
                (t.D = i.color),
                (t.rt = i.lineWidth),
                (t.Ft = i.lineStyle),
                (t.nr = this.$h.F().id))
        }
    }
    class gi extends U {
        constructor(t, i) {
            super(), (this.Tr = t), (this.$h = i)
        }
        Ai(t, i, n) {
            ;(t.Ct = !1), (i.Ct = !1)
            const s = this.$h.F(),
                e = s.axisLabelVisible,
                r = "" !== s.title,
                h = this.Tr
            if (!e || !h.Ct()) return
            const l = this.$h.Ah()
            if (null === l) return
            r && ((i.Gt = s.title), (i.Ct = !0)),
                (i.Lt = h.Ut().Et(l / h.Ot().zt())),
                (t.Gt = this.Hh(s.price)),
                (t.Ct = !0)
            const a = v(s.axisLabelColor || s.color)
            n.t = a.t
            const o = s.axisLabelTextColor || a.i
            ;(t.D = o), (i.D = o), (n.yi = l)
        }
        Hh(t) {
            const i = this.Tr.Tt()
            return null === i ? "" : this.Tr.Ot().Fi(t, i.Bt)
        }
    }
    class wi {
        constructor(t, i) {
            ;(this.Tr = t),
                (this.un = i),
                (this.Uh = new bi(t, this)),
                (this.Xe = new gi(t, this)),
                (this.qh = new $t(this.Xe, t, t.Ut()))
        }
        Vh(t) {
            b(this.un, t), this.gt(), this.Tr.Ut().Nh()
        }
        F() {
            return this.un
        }
        Fh() {
            return this.Uh
        }
        Yh() {
            return this.qh
        }
        Xh() {
            return this.Xe
        }
        gt() {
            this.Uh.gt(), this.Xe.gt()
        }
        Ah() {
            const t = this.Tr,
                i = t.Ot()
            if (t.Ut().yt().Ni() || i.Ni()) return null
            const n = t.Tt()
            return null === n ? null : i.Dt(this.un.price, n.Bt)
        }
    }
    class Mi extends K {
        constructor(t) {
            super(), (this.Hi = t)
        }
        Ut() {
            return this.Hi
        }
    }
    const xi = {
        Bar: (t, i, n, s) => {
            var e
            const r = i.upColor,
                a = i.downColor,
                o = h(t(n, s)),
                _ = l(o.Bt[0]) <= l(o.Bt[3])
            return { ie: null !== (e = o.D) && void 0 !== e ? e : _ ? r : a }
        },
        Candlestick: (t, i, n, s) => {
            var e, r, a
            const o = i.upColor,
                _ = i.downColor,
                u = i.borderUpColor,
                c = i.borderDownColor,
                d = i.wickUpColor,
                f = i.wickDownColor,
                p = h(t(n, s)),
                v = l(p.Bt[0]) <= l(p.Bt[3])
            return {
                ie: null !== (e = p.D) && void 0 !== e ? e : v ? o : _,
                Pe: null !== (r = p.Lt) && void 0 !== r ? r : v ? u : c,
                Te: null !== (a = p.Zh) && void 0 !== a ? a : v ? d : f,
            }
        },
        Area: (t, i, n, s) => {
            var e, r, l, a
            const o = h(t(n, s))
            return {
                ie: null !== (e = o.ot) && void 0 !== e ? e : i.lineColor,
                ot: null !== (r = o.ot) && void 0 !== r ? r : i.lineColor,
                bs: null !== (l = o.bs) && void 0 !== l ? l : i.topColor,
                gs: null !== (a = o.gs) && void 0 !== a ? a : i.bottomColor,
            }
        },
        Baseline: (t, i, n, s) => {
            var e, r, l, a, o, _
            const u = h(t(n, s))
            return {
                ie:
                    u.Bt[3] >= i.baseValue.price
                        ? i.topLineColor
                        : i.bottomLineColor,
                be: null !== (e = u.be) && void 0 !== e ? e : i.topLineColor,
                ge: null !== (r = u.ge) && void 0 !== r ? r : i.bottomLineColor,
                de: null !== (l = u.de) && void 0 !== l ? l : i.topFillColor1,
                fe: null !== (a = u.fe) && void 0 !== a ? a : i.topFillColor2,
                pe:
                    null !== (o = u.pe) && void 0 !== o
                        ? o
                        : i.bottomFillColor1,
                ve:
                    null !== (_ = u.ve) && void 0 !== _
                        ? _
                        : i.bottomFillColor2,
            }
        },
        Line: (t, i, n, s) => {
            var e, r
            const l = h(t(n, s))
            return {
                ie: null !== (e = l.D) && void 0 !== e ? e : i.color,
                ot: null !== (r = l.D) && void 0 !== r ? r : i.color,
            }
        },
        Histogram: (t, i, n, s) => {
            var e
            return {
                ie: null !== (e = h(t(n, s)).D) && void 0 !== e ? e : i.color,
            }
        },
    }
    class Si {
        constructor(t) {
            ;(this.Kh = (t, i) => (void 0 !== i ? i.Bt : this.Tr.En().Gh(t))),
                (this.Tr = t),
                (this.Jh = xi[t.Qh()])
        }
        Ls(t, i) {
            return this.Jh(this.Kh, this.Tr.F(), t, i)
        }
    }
    var yi
    !(function (t) {
        ;(t[(t.NearestLeft = -1)] = "NearestLeft"),
            (t[(t.None = 0)] = "None"),
            (t[(t.NearestRight = 1)] = "NearestRight")
    })(yi || (yi = {}))
    const ki = 30
    class Ci {
        constructor() {
            ;(this.tl = []), (this.il = new Map()), (this.nl = new Map())
        }
        sl() {
            return this.Ns() > 0 ? this.tl[this.tl.length - 1] : null
        }
        el() {
            return this.Ns() > 0 ? this.rl(0) : null
        }
        Ln() {
            return this.Ns() > 0 ? this.rl(this.tl.length - 1) : null
        }
        Ns() {
            return this.tl.length
        }
        Ni() {
            return 0 === this.Ns()
        }
        zr(t) {
            return null !== this.hl(t, 0)
        }
        Gh(t) {
            return this.ll(t)
        }
        ll(t, i = 0) {
            const n = this.hl(t, i)
            return null === n
                ? null
                : Object.assign(Object.assign({}, this.al(n)), {
                      Ys: this.rl(n),
                  })
        }
        Us() {
            return this.tl
        }
        ol(t, i, n) {
            if (this.Ni()) return null
            let s = null
            for (const e of n) {
                s = Ti(s, this._l(t, i, e))
            }
            return s
        }
        tt(t) {
            this.nl.clear(), this.il.clear(), (this.tl = t)
        }
        rl(t) {
            return this.tl[t].Ys
        }
        al(t) {
            return this.tl[t]
        }
        hl(t, i) {
            const n = this.ul(t)
            if (null === n && 0 !== i)
                switch (i) {
                    case -1:
                        return this.cl(t)
                    case 1:
                        return this.dl(t)
                    default:
                        throw new TypeError("Unknown search mode")
                }
            return n
        }
        cl(t) {
            let i = this.fl(t)
            return (
                i > 0 && (i -= 1),
                i !== this.tl.length && this.rl(i) < t ? i : null
            )
        }
        dl(t) {
            const i = this.pl(t)
            return i !== this.tl.length && t < this.rl(i) ? i : null
        }
        ul(t) {
            const i = this.fl(t)
            return i === this.tl.length || t < this.tl[i].Ys ? null : i
        }
        fl(t) {
            return mt(this.tl, t, (t, i) => t.Ys < i)
        }
        pl(t) {
            return bt(this.tl, t, (t, i) => i.Ys > t)
        }
        vl(t, i, n) {
            let s = null
            for (let e = t; e < i; e++) {
                const t = this.tl[e].Bt[n]
                Number.isNaN(t) ||
                    (null === s
                        ? (s = { ml: t, bl: t })
                        : (t < s.ml && (s.ml = t), t > s.bl && (s.bl = t)))
            }
            return s
        }
        _l(t, i, n) {
            if (this.Ni()) return null
            let s = null
            const e = h(this.el()),
                r = h(this.Ln()),
                l = Math.max(t, e),
                a = Math.min(i, r),
                o = Math.ceil(l / ki) * ki,
                _ = Math.max(o, Math.floor(a / ki) * ki)
            {
                const t = this.fl(l),
                    e = this.pl(Math.min(a, o, i))
                s = Ti(s, this.vl(t, e, n))
            }
            let u = this.il.get(n)
            void 0 === u && ((u = new Map()), this.il.set(n, u))
            for (let t = Math.max(o + 1, l); t < _; t += ki) {
                const i = Math.floor(t / ki)
                let e = u.get(i)
                if (void 0 === e) {
                    const t = this.fl(i * ki),
                        s = this.pl((i + 1) * ki - 1)
                    ;(e = this.vl(t, s, n)), u.set(i, e)
                }
                s = Ti(s, e)
            }
            {
                const t = this.fl(_),
                    i = this.pl(a)
                s = Ti(s, this.vl(t, i, n))
            }
            return s
        }
    }
    function Ti(t, i) {
        if (null === t) return i
        if (null === i) return t
        return { ml: Math.min(t.ml, i.ml), bl: Math.max(t.bl, i.bl) }
    }
    class Pi extends Mi {
        constructor(t, i, n) {
            super(t),
                (this.It = new Ci()),
                (this.Uh = new _i(this)),
                (this.gl = []),
                (this.wl = []),
                (this.Ml = new qt(this)),
                (this.xl = null),
                (this.Sl = null),
                (this.yl = []),
                (this.kl = []),
                (this.Cl = null),
                (this.un = i),
                (this.Tl = n)
            const s = new ui(this)
            ;(this.rn = [s]),
                (this.qh = new $t(s, this, t)),
                ("Area" !== n && "Line" !== n && "Baseline" !== n) ||
                    (this.xl = new Gt(this)),
                this.Pl(),
                this.Rl()
        }
        M() {
            null !== this.Cl && clearTimeout(this.Cl)
        }
        Kr(t) {
            return this.un.priceLineColor || t
        }
        Lr(t) {
            const i = { Er: !0 },
                n = this.Ot()
            if (this.Ut().yt().Ni() || n.Ni() || this.It.Ni()) return i
            const s = this.Ut().yt().Vs(),
                e = this.Tt()
            if (null === s || null === e) return i
            let r, h
            if (t) {
                const t = this.It.sl()
                if (null === t) return i
                ;(r = t), (h = t.Ys)
            } else {
                const t = this.It.ll(s.ci(), -1)
                if (null === t) return i
                if (((r = this.It.Gh(t.Ys)), null === r)) return i
                h = t.Ys
            }
            const l = r.Bt[3],
                a = this.Es().Ls(h, { Bt: r }),
                o = n.Dt(l, e.Bt)
            return {
                Er: !1,
                ut: l,
                Gt: n.Fi(l, e.Bt),
                ih: n.Dl(l),
                nh: n.Ol(l, e.Bt),
                D: a.ie,
                yi: o,
                Ys: h,
            }
        }
        Es() {
            return null !== this.Sl || (this.Sl = new Si(this)), this.Sl
        }
        F() {
            return this.un
        }
        Vh(t) {
            const i = t.priceScaleId
            void 0 !== i && i !== this.un.priceScaleId && this.Ut().Bl(this, i),
                b(this.un, t),
                void 0 !== t.priceFormat && (this.Pl(), this.Ut().Ll()),
                this.Ut().El(this),
                this.Ut().zl(),
                this.bn.gt("options")
        }
        tt(t, i) {
            this.It.tt(t),
                this.Al(),
                this.bn.gt("data"),
                this.cn.gt("data"),
                null !== this.xl &&
                    (i && i.Il ? this.xl.Rr() : 0 === t.length && this.xl.Pr())
            const n = this.Ut().Ke(this)
            this.Ut().Vl(n), this.Ut().El(this), this.Ut().zl(), this.Ut().Nh()
        }
        Nl(t) {
            ;(this.yl = t), this.Al()
            const i = this.Ut().Ke(this)
            this.cn.gt("data"),
                this.Ut().Vl(i),
                this.Ut().El(this),
                this.Ut().zl(),
                this.Ut().Nh()
        }
        Fl() {
            return this.yl
        }
        Xr() {
            return this.kl
        }
        Wl(t) {
            const i = new wi(this, t)
            return this.gl.push(i), this.Ut().El(this), i
        }
        jl(t) {
            const i = this.gl.indexOf(t)
            ;-1 !== i && this.gl.splice(i, 1), this.Ut().El(this)
        }
        $l(t) {
            const i = new mi(this, t)
            return this.wl.push(i), this.Ut().El(this), i
        }
        Hl(t) {
            const i = this.wl.indexOf(t)
            ;-1 !== i && this.wl.splice(i, 1), this.Ut().El(this)
        }
        Qh() {
            return this.Tl
        }
        Tt() {
            const t = this.Ul()
            return null === t ? null : { Bt: t.Bt[3], ql: t._t }
        }
        Ul() {
            const t = this.Ut().yt().Vs()
            if (null === t) return null
            const i = t.Ms()
            return this.It.ll(i, 1)
        }
        En() {
            return this.It
        }
        Zr(t) {
            const i = this.It.Gh(t)
            return null === i
                ? null
                : "Bar" === this.Tl || "Candlestick" === this.Tl
                ? { oe: i.Bt[0], _e: i.Bt[1], ue: i.Bt[2], ce: i.Bt[3] }
                : i.Bt[3]
        }
        Yl(t) {
            const i = this.xl
            return null !== i && i.Ct()
                ? (null === this.Cl &&
                      i.Or() &&
                      (this.Cl = setTimeout(() => {
                          ;(this.Cl = null), this.Ut().Xl()
                      }, 0)),
                  i.Dr(),
                  [i])
                : []
        }
        Tn() {
            const t = []
            this.Zl() || t.push(this.Ml), t.push(this.bn, this.Uh, this.cn)
            const i = this.gl.map((t) => t.Fh())
            t.push(...i)
            const n = this.wl.map((t) => t.Fh())
            return t.push(...n), t
        }
        Ji(t) {
            return [this.qh, ...this.gl.map((t) => t.Yh())]
        }
        Pn(t, i) {
            if (i !== this.Yi && !this.Zl()) return []
            const n = [...this.rn]
            for (const t of this.gl) n.push(t.Xh())
            return n
        }
        Kl(t, i) {
            if (void 0 !== this.un.autoscaleInfoProvider) {
                const n = this.un.autoscaleInfoProvider(() => {
                    const n = this.Gl(t, i)
                    return null === n ? null : n.dh()
                })
                return di.fh(n)
            }
            return this.Gl(t, i)
        }
        Jl() {
            return this.un.priceFormat.minMove
        }
        Ql() {
            return this.ta
        }
        Dn() {
            var t
            this.bn.gt(), this.cn.gt()
            for (const t of this.rn) t.gt()
            for (const t of this.gl) t.gt()
            for (const t of this.wl) t.gt()
            this.Uh.gt(),
                this.Ml.gt(),
                null === (t = this.xl) || void 0 === t || t.gt()
        }
        Ot() {
            return h(super.Ot())
        }
        kt(t) {
            if (
                !(
                    ("Line" === this.Tl ||
                        "Area" === this.Tl ||
                        "Baseline" === this.Tl) &&
                    this.un.crosshairMarkerVisible
                )
            )
                return null
            const i = this.It.Gh(t)
            if (null === i) return null
            return {
                ut: i.Bt[3],
                lt: this.ia(),
                Lt: this.na(),
                Rt: this.sa(),
                Pt: this.ea(t),
            }
        }
        Gr() {
            return this.un.title
        }
        Ct() {
            return this.un.visible
        }
        Zl() {
            return !Q(this.Ot().ra())
        }
        Gl(t, i) {
            if (!w(t) || !w(i) || this.It.Ni()) return null
            const n =
                    "Line" === this.Tl ||
                    "Area" === this.Tl ||
                    "Baseline" === this.Tl ||
                    "Histogram" === this.Tl
                        ? [3]
                        : [2, 1],
                s = this.It.ol(t, i, n)
            let e = null !== s ? new ci(s.ml, s.bl) : null
            if ("Histogram" === this.Qh()) {
                const t = this.un.base,
                    i = new ci(t, t)
                e = null !== e ? e.Qn(i) : i
            }
            return new di(e, this.cn.Yr())
        }
        ia() {
            switch (this.Tl) {
                case "Line":
                case "Area":
                case "Baseline":
                    return this.un.crosshairMarkerRadius
            }
            return 0
        }
        na() {
            switch (this.Tl) {
                case "Line":
                case "Area":
                case "Baseline": {
                    const t = this.un.crosshairMarkerBorderColor
                    if (0 !== t.length) return t
                }
            }
            return null
        }
        sa() {
            switch (this.Tl) {
                case "Line":
                case "Area":
                case "Baseline":
                    return this.un.crosshairMarkerBorderWidth
            }
            return 0
        }
        ea(t) {
            switch (this.Tl) {
                case "Line":
                case "Area":
                case "Baseline": {
                    const t = this.un.crosshairMarkerBackgroundColor
                    if (0 !== t.length) return t
                }
            }
            return this.Es().Ls(t).ie
        }
        Pl() {
            switch (this.un.priceFormat.type) {
                case "custom":
                    this.ta = { format: this.un.priceFormat.formatter }
                    break
                case "volume":
                    this.ta = new rt(this.un.priceFormat.precision)
                    break
                case "percent":
                    this.ta = new et(this.un.priceFormat.precision)
                    break
                default: {
                    const t = Math.pow(10, this.un.priceFormat.precision)
                    this.ta = new st(t, this.un.priceFormat.minMove * t)
                }
            }
            null !== this.Yi && this.Yi.ha()
        }
        Al() {
            const t = this.Ut().yt()
            if (!t.la() || this.It.Ni()) return void (this.kl = [])
            const i = h(this.It.el())
            this.kl = this.yl.map((n, s) => {
                const e = h(t.Wh(n.time, !0)),
                    r = e < i ? 1 : -1
                return {
                    time: h(this.It.ll(e, r)).Ys,
                    position: n.position,
                    shape: n.shape,
                    color: n.color,
                    id: n.id,
                    internalId: s,
                    text: n.text,
                    size: n.size,
                }
            })
        }
        Rl() {
            switch (((this.cn = new oi(this, this.Ut())), this.Tl)) {
                case "Bar":
                    this.bn = new Tt(this, this.Ut())
                    break
                case "Candlestick":
                    this.bn = new At(this, this.Ut())
                    break
                case "Line":
                    this.bn = new Nt(this, this.Ut())
                    break
                case "Area":
                    this.bn = new yt(this, this.Ut())
                    break
                case "Baseline":
                    this.bn = new Et(this, this.Ut())
                    break
                case "Histogram":
                    this.bn = new Vt(this, this.Ut())
                    break
                default:
                    throw Error("Unknown chart style assigned: " + this.Tl)
            }
        }
    }
    class Ri {
        constructor(t) {
            this.un = t
        }
        aa(t, i, n) {
            let s = t
            if (0 === this.un.mode) return s
            const e = n.fn(),
                r = e.Tt()
            if (null === r) return s
            const h = e.Dt(t, r),
                a = n
                    .oa()
                    .filter((t) => t instanceof Pi)
                    .reduce((t, s) => {
                        if (n.Ge(s) || !s.Ct()) return t
                        const e = s.Ot(),
                            r = s.En()
                        if (e.Ni() || !r.zr(i)) return t
                        const h = r.Gh(i)
                        if (null === h) return t
                        const a = l(s.Tt())
                        return t.concat([e.Dt(h.Bt[3], a.Bt)])
                    }, [])
            if (0 === a.length) return s
            a.sort((t, i) => Math.abs(t - h) - Math.abs(i - h))
            const o = a[0]
            return (s = e.pn(o, r)), s
        }
    }
    class Di extends z {
        constructor() {
            super(...arguments), (this.It = null)
        }
        tt(t) {
            this.It = t
        }
        Z({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s,
            verticalPixelRatio: e,
        }) {
            if (null === this.It) return
            const r = Math.max(1, Math.floor(s))
            ;(t.lineWidth = r),
                (function (t, i) {
                    t.save(),
                        t.lineWidth % 2 && t.translate(0.5, 0.5),
                        i(),
                        t.restore()
                })(t, () => {
                    const l = h(this.It)
                    if (l._a) {
                        ;(t.strokeStyle = l.ua), n(t, l.ca), t.beginPath()
                        for (const n of l.da) {
                            const e = Math.round(n.fa * s)
                            t.moveTo(e, -r), t.lineTo(e, i.height + r)
                        }
                        t.stroke()
                    }
                    if (l.pa) {
                        ;(t.strokeStyle = l.va), n(t, l.ma), t.beginPath()
                        for (const n of l.ba) {
                            const s = Math.round(n.fa * e)
                            t.moveTo(-r, s), t.lineTo(i.width + r, s)
                        }
                        t.stroke()
                    }
                })
        }
    }
    class Oi {
        constructor(t) {
            ;(this.jt = new Di()), (this.vt = !0), (this.tn = t)
        }
        gt() {
            this.vt = !0
        }
        Mt() {
            if (this.vt) {
                const t = this.tn.Ut().F().grid,
                    i = {
                        pa: t.horzLines.visible,
                        _a: t.vertLines.visible,
                        va: t.horzLines.color,
                        ua: t.vertLines.color,
                        ma: t.horzLines.style,
                        ca: t.vertLines.style,
                        ba: this.tn.fn().ga(),
                        da: this.tn.Ut().yt().ga() || [],
                    }
                this.jt.tt(i), (this.vt = !1)
            }
            return this.jt
        }
    }
    class Bi {
        constructor(t) {
            this.bn = new Oi(t)
        }
        Fh() {
            return this.bn
        }
    }
    const Li = { wa: 4, Ma: 1e-4 }
    function Ei(t, i) {
        const n = (100 * (t - i)) / i
        return i < 0 ? -n : n
    }
    function zi(t, i) {
        const n = Ei(t.lh(), i),
            s = Ei(t.ah(), i)
        return new ci(n, s)
    }
    function Ai(t, i) {
        const n = (100 * (t - i)) / i + 100
        return i < 0 ? -n : n
    }
    function Ii(t, i) {
        const n = Ai(t.lh(), i),
            s = Ai(t.ah(), i)
        return new ci(n, s)
    }
    function Vi(t, i) {
        const n = Math.abs(t)
        if (n < 1e-15) return 0
        const s = Dt(n + i.Ma) + i.wa
        return t < 0 ? -s : s
    }
    function Ni(t, i) {
        const n = Math.abs(t)
        if (n < 1e-15) return 0
        const s = Math.pow(10, n - i.wa) - i.Ma
        return t < 0 ? -s : s
    }
    function Fi(t, i) {
        if (null === t) return null
        const n = Vi(t.lh(), i),
            s = Vi(t.ah(), i)
        return new ci(n, s)
    }
    function Wi(t, i) {
        if (null === t) return null
        const n = Ni(t.lh(), i),
            s = Ni(t.ah(), i)
        return new ci(n, s)
    }
    function ji(t) {
        if (null === t) return Li
        const i = Math.abs(t.ah() - t.lh())
        if (i >= 1 || i < 1e-15) return Li
        const n = Math.ceil(Math.abs(Math.log10(i))),
            s = Li.wa + n
        return { wa: s, Ma: 1 / Math.pow(10, s) }
    }
    class $i {
        constructor(t, i) {
            if (
                ((this.xa = t),
                (this.Sa = i),
                (function (t) {
                    if (t < 0) return !1
                    for (let i = t; i > 1; i /= 10) if (i % 10 != 0) return !1
                    return !0
                })(this.xa))
            )
                this.ya = [2, 2.5, 2]
            else {
                this.ya = []
                for (let t = this.xa; 1 !== t; ) {
                    if (t % 2 == 0) this.ya.push(2), (t /= 2)
                    else {
                        if (t % 5 != 0) throw new Error("unexpected base")
                        this.ya.push(2, 2.5), (t /= 5)
                    }
                    if (this.ya.length > 100)
                        throw new Error("something wrong with base")
                }
            }
        }
        ka(t, i, n) {
            const s = 0 === this.xa ? 0 : 1 / this.xa
            let e = Math.pow(10, Math.max(0, Math.ceil(Dt(t - i)))),
                r = 0,
                h = this.Sa[0]
            for (;;) {
                const t = Rt(e, s, 1e-14) && e > s + 1e-14,
                    i = Rt(e, n * h, 1e-14),
                    l = Rt(e, 1, 1e-14)
                if (!(t && i && l)) break
                ;(e /= h), (h = this.Sa[++r % this.Sa.length])
            }
            if (
                (e <= s + 1e-14 && (e = s),
                (e = Math.max(1, e)),
                this.ya.length > 0 &&
                    ((l = e), (a = 1), (o = 1e-14), Math.abs(l - a) < o))
            )
                for (
                    r = 0, h = this.ya[0];
                    Rt(e, n * h, 1e-14) && e > s + 1e-14;

                )
                    (e /= h), (h = this.ya[++r % this.ya.length])
            var l, a, o
            return e
        }
    }
    class Hi {
        constructor(t, i, n, s) {
            ;(this.Ca = []),
                (this.Ii = t),
                (this.xa = i),
                (this.Ta = n),
                (this.Pa = s)
        }
        ka(t, i) {
            if (t < i) throw new Error("high < low")
            const n = this.Ii.zt(),
                s = ((t - i) * this.Ra()) / n,
                e = new $i(this.xa, [2, 2.5, 2]),
                r = new $i(this.xa, [2, 2, 2.5]),
                h = new $i(this.xa, [2.5, 2, 2]),
                l = []
            return (
                l.push(e.ka(t, i, s), r.ka(t, i, s), h.ka(t, i, s)),
                (function (t) {
                    if (t.length < 1) throw Error("array is empty")
                    let i = t[0]
                    for (let n = 1; n < t.length; ++n) t[n] < i && (i = t[n])
                    return i
                })(l)
            )
        }
        Da() {
            const t = this.Ii,
                i = t.Tt()
            if (null === i) return void (this.Ca = [])
            const n = t.zt(),
                s = this.Ta(n - 1, i),
                e = this.Ta(0, i),
                r = this.Ii.F().entireTextOnly ? this.Oa() / 2 : 0,
                h = r,
                l = n - 1 - r,
                a = Math.max(s, e),
                o = Math.min(s, e)
            if (a === o) return void (this.Ca = [])
            let _ = this.ka(a, o),
                u = a % _
            u += u < 0 ? _ : 0
            const c = a >= o ? 1 : -1
            let d = null,
                f = 0
            for (let n = a - u; n > o; n -= _) {
                const s = this.Pa(n, i, !0)
                ;(null !== d && Math.abs(s - d) < this.Ra()) ||
                    s < h ||
                    s > l ||
                    (f < this.Ca.length
                        ? ((this.Ca[f].fa = s), (this.Ca[f].Ba = t.La(n)))
                        : this.Ca.push({ fa: s, Ba: t.La(n) }),
                    f++,
                    (d = s),
                    t.Ea() && (_ = this.ka(n * c, o)))
            }
            this.Ca.length = f
        }
        ga() {
            return this.Ca
        }
        Oa() {
            return this.Ii.T()
        }
        Ra() {
            return Math.ceil(2.5 * this.Oa())
        }
    }
    function Ui(t) {
        return t.slice().sort((t, i) => h(t.Zi()) - h(i.Zi()))
    }
    var qi
    !(function (t) {
        ;(t[(t.Normal = 0)] = "Normal"),
            (t[(t.Logarithmic = 1)] = "Logarithmic"),
            (t[(t.Percentage = 2)] = "Percentage"),
            (t[(t.IndexedTo100 = 3)] = "IndexedTo100")
    })(qi || (qi = {}))
    const Yi = new et(),
        Xi = new st(100, 1)
    class Zi {
        constructor(t, i, n, s) {
            ;(this.za = 0),
                (this.Aa = null),
                (this.ph = null),
                (this.Ia = null),
                (this.Va = { Na: !1, Fa: null }),
                (this.Wa = 0),
                (this.ja = 0),
                (this.$a = new m()),
                (this.Ha = new m()),
                (this.Ua = []),
                (this.qa = null),
                (this.Ya = null),
                (this.Xa = null),
                (this.Za = null),
                (this.ta = Xi),
                (this.Ka = ji(null)),
                (this.Ga = t),
                (this.un = i),
                (this.Ja = n),
                (this.Qa = s),
                (this.io = new Hi(
                    this,
                    100,
                    this.no.bind(this),
                    this.so.bind(this)
                ))
        }
        ra() {
            return this.Ga
        }
        F() {
            return this.un
        }
        Vh(t) {
            if (
                (b(this.un, t),
                this.ha(),
                void 0 !== t.mode && this.eo({ lr: t.mode }),
                void 0 !== t.scaleMargins)
            ) {
                const i = r(t.scaleMargins.top),
                    n = r(t.scaleMargins.bottom)
                if (i < 0 || i > 1)
                    throw new Error(
                        `Invalid top margin - expect value between 0 and 1, given=${i}`
                    )
                if (n < 0 || n > 1 || i + n > 1)
                    throw new Error(
                        `Invalid bottom margin - expect value between 0 and 1, given=${n}`
                    )
                if (i + n > 1)
                    throw new Error(
                        `Invalid margins - sum of margins must be less than 1, given=${
                            i + n
                        }`
                    )
                this.ro(), (this.Ya = null)
            }
        }
        ho() {
            return this.un.autoScale
        }
        Ea() {
            return 1 === this.un.mode
        }
        th() {
            return 2 === this.un.mode
        }
        lo() {
            return 3 === this.un.mode
        }
        lr() {
            return {
                Fn: this.un.autoScale,
                ao: this.un.invertScale,
                lr: this.un.mode,
            }
        }
        eo(t) {
            const i = this.lr()
            let n = null
            void 0 !== t.Fn && (this.un.autoScale = t.Fn),
                void 0 !== t.lr &&
                    ((this.un.mode = t.lr),
                    (2 !== t.lr && 3 !== t.lr) || (this.un.autoScale = !0),
                    (this.Va.Na = !1)),
                1 === i.lr &&
                    t.lr !== i.lr &&
                    (!(function (t, i) {
                        if (null === t) return !1
                        const n = Ni(t.lh(), i),
                            s = Ni(t.ah(), i)
                        return isFinite(n) && isFinite(s)
                    })(this.ph, this.Ka)
                        ? (this.un.autoScale = !0)
                        : ((n = Wi(this.ph, this.Ka)),
                          null !== n && this.oo(n))),
                1 === t.lr &&
                    t.lr !== i.lr &&
                    ((n = Fi(this.ph, this.Ka)), null !== n && this.oo(n))
            const s = i.lr !== this.un.mode
            s && (2 === i.lr || this.th()) && this.ha(),
                s && (3 === i.lr || this.lo()) && this.ha(),
                void 0 !== t.ao &&
                    i.ao !== t.ao &&
                    ((this.un.invertScale = t.ao), this._o()),
                this.Ha.m(i, this.lr())
        }
        uo() {
            return this.Ha
        }
        T() {
            return this.Ja.fontSize
        }
        zt() {
            return this.za
        }
        co(t) {
            this.za !== t && ((this.za = t), this.ro(), (this.Ya = null))
        }
        do() {
            if (this.Aa) return this.Aa
            const t = this.zt() - this.fo() - this.po()
            return (this.Aa = t), t
        }
        bh() {
            return this.vo(), this.ph
        }
        oo(t, i) {
            const n = this.ph
            ;(i || (null === n && null !== t) || (null !== n && !n.rh(t))) &&
                ((this.Ya = null), (this.ph = t))
        }
        Ni() {
            return this.vo(), 0 === this.za || !this.ph || this.ph.Ni()
        }
        mo(t) {
            return this.ao() ? t : this.zt() - 1 - t
        }
        Dt(t, i) {
            return (
                this.th() ? (t = Ei(t, i)) : this.lo() && (t = Ai(t, i)),
                this.so(t, i)
            )
        }
        $s(t, i, n) {
            this.vo()
            const s = this.po(),
                e = h(this.bh()),
                r = e.lh(),
                l = e.ah(),
                a = this.do() - 1,
                o = this.ao(),
                _ = a / (l - r),
                u = void 0 === n ? 0 : n.from,
                c = void 0 === n ? t.length : n.to,
                d = this.bo()
            for (let n = u; n < c; n++) {
                const e = t[n],
                    h = e.ut
                if (isNaN(h)) continue
                let l = h
                null !== d && (l = d(e.ut, i))
                const a = s + _ * (l - r),
                    u = o ? a : this.za - 1 - a
                e.et = u
            }
        }
        le(t, i, n) {
            this.vo()
            const s = this.po(),
                e = h(this.bh()),
                r = e.lh(),
                l = e.ah(),
                a = this.do() - 1,
                o = this.ao(),
                _ = a / (l - r),
                u = void 0 === n ? 0 : n.from,
                c = void 0 === n ? t.length : n.to,
                d = this.bo()
            for (let n = u; n < c; n++) {
                const e = t[n]
                let h = e.oe,
                    l = e._e,
                    a = e.ue,
                    u = e.ce
                null !== d &&
                    ((h = d(e.oe, i)),
                    (l = d(e._e, i)),
                    (a = d(e.ue, i)),
                    (u = d(e.ce, i)))
                let c = s + _ * (h - r),
                    f = o ? c : this.za - 1 - c
                ;(e.re = f),
                    (c = s + _ * (l - r)),
                    (f = o ? c : this.za - 1 - c),
                    (e.ne = f),
                    (c = s + _ * (a - r)),
                    (f = o ? c : this.za - 1 - c),
                    (e.se = f),
                    (c = s + _ * (u - r)),
                    (f = o ? c : this.za - 1 - c),
                    (e.he = f)
            }
        }
        pn(t, i) {
            const n = this.no(t, i)
            return this.wo(n, i)
        }
        wo(t, i) {
            let n = t
            return (
                this.th()
                    ? (n = (function (t, i) {
                          return i < 0 && (t = -t), (t / 100) * i + i
                      })(n, i))
                    : this.lo() &&
                      (n = (function (t, i) {
                          return (
                              (t -= 100), i < 0 && (t = -t), (t / 100) * i + i
                          )
                      })(n, i)),
                n
            )
        }
        oa() {
            return this.Ua
        }
        Mo() {
            if (this.qa) return this.qa
            let t = []
            for (let i = 0; i < this.Ua.length; i++) {
                const n = this.Ua[i]
                null === n.Zi() && n.Ki(i + 1), t.push(n)
            }
            return (t = Ui(t)), (this.qa = t), this.qa
        }
        xo(t) {
            ;-1 === this.Ua.indexOf(t) &&
                (this.Ua.push(t), this.ha(), this.So())
        }
        yo(t) {
            const i = this.Ua.indexOf(t)
            if (-1 === i) throw new Error("source is not attached to scale")
            this.Ua.splice(i, 1),
                0 === this.Ua.length && (this.eo({ Fn: !0 }), this.oo(null)),
                this.ha(),
                this.So()
        }
        Tt() {
            let t = null
            for (const i of this.Ua) {
                const n = i.Tt()
                null !== n && (null === t || n.ql < t.ql) && (t = n)
            }
            return null === t ? null : t.Bt
        }
        ao() {
            return this.un.invertScale
        }
        ga() {
            const t = null === this.Tt()
            if (null !== this.Ya && (t || this.Ya.ko === t)) return this.Ya.ga
            this.io.Da()
            const i = this.io.ga()
            return (this.Ya = { ga: i, ko: t }), this.$a.m(), i
        }
        Co() {
            return this.$a
        }
        To(t) {
            this.th() ||
                this.lo() ||
                (null === this.Xa &&
                    null === this.Ia &&
                    (this.Ni() ||
                        ((this.Xa = this.za - t),
                        (this.Ia = h(this.bh()).hh()))))
        }
        Po(t) {
            if (this.th() || this.lo()) return
            if (null === this.Xa) return
            this.eo({ Fn: !1 }), (t = this.za - t) < 0 && (t = 0)
            let i = (this.Xa + 0.2 * (this.za - 1)) / (t + 0.2 * (this.za - 1))
            const n = h(this.Ia).hh()
            ;(i = Math.max(i, 0.1)), n._h(i), this.oo(n)
        }
        Ro() {
            this.th() || this.lo() || ((this.Xa = null), (this.Ia = null))
        }
        Do(t) {
            this.ho() ||
                (null === this.Za &&
                    null === this.Ia &&
                    (this.Ni() ||
                        ((this.Za = t), (this.Ia = h(this.bh()).hh()))))
        }
        Oo(t) {
            if (this.ho()) return
            if (null === this.Za) return
            const i = h(this.bh()).oh() / (this.do() - 1)
            let n = t - this.Za
            this.ao() && (n *= -1)
            const s = n * i,
                e = h(this.Ia).hh()
            e.uh(s), this.oo(e, !0), (this.Ya = null)
        }
        Bo() {
            this.ho() ||
                (null !== this.Za && ((this.Za = null), (this.Ia = null)))
        }
        Ql() {
            return this.ta || this.ha(), this.ta
        }
        Fi(t, i) {
            switch (this.un.mode) {
                case 2:
                    return this.Ql().format(Ei(t, i))
                case 3:
                    return this.Ql().format(Ai(t, i))
                default:
                    return this.Hh(t)
            }
        }
        La(t) {
            switch (this.un.mode) {
                case 2:
                case 3:
                    return this.Ql().format(t)
                default:
                    return this.Hh(t)
            }
        }
        Dl(t) {
            return this.Hh(t, h(this.Lo()).Ql())
        }
        Ol(t, i) {
            return (t = Ei(t, i)), Yi.format(t)
        }
        Eo() {
            return this.Ua
        }
        zo(t) {
            this.Va = { Fa: t, Na: !1 }
        }
        Dn() {
            this.Ua.forEach((t) => t.Dn())
        }
        ha() {
            this.Ya = null
            const t = this.Lo()
            let i = 100
            null !== t && (i = Math.round(1 / t.Jl())),
                (this.ta = Xi),
                this.th()
                    ? ((this.ta = Yi), (i = 100))
                    : this.lo()
                    ? ((this.ta = new st(100, 1)), (i = 100))
                    : null !== t && (this.ta = t.Ql()),
                (this.io = new Hi(
                    this,
                    i,
                    this.no.bind(this),
                    this.so.bind(this)
                )),
                this.io.Da()
        }
        So() {
            this.qa = null
        }
        Lo() {
            return this.Ua[0] || null
        }
        fo() {
            return this.ao()
                ? this.un.scaleMargins.bottom * this.zt() + this.ja
                : this.un.scaleMargins.top * this.zt() + this.Wa
        }
        po() {
            return this.ao()
                ? this.un.scaleMargins.top * this.zt() + this.Wa
                : this.un.scaleMargins.bottom * this.zt() + this.ja
        }
        vo() {
            this.Va.Na || ((this.Va.Na = !0), this.Ao())
        }
        ro() {
            this.Aa = null
        }
        so(t, i) {
            if ((this.vo(), this.Ni())) return 0
            t = this.Ea() && t ? Vi(t, this.Ka) : t
            const n = h(this.bh()),
                s = this.po() + ((this.do() - 1) * (t - n.lh())) / n.oh()
            return this.mo(s)
        }
        no(t, i) {
            if ((this.vo(), this.Ni())) return 0
            const n = this.mo(t),
                s = h(this.bh()),
                e = s.lh() + s.oh() * ((n - this.po()) / (this.do() - 1))
            return this.Ea() ? Ni(e, this.Ka) : e
        }
        _o() {
            ;(this.Ya = null), this.io.Da()
        }
        Ao() {
            const t = this.Va.Fa
            if (null === t) return
            let i = null
            const n = this.Eo()
            let s = 0,
                e = 0
            for (const r of n) {
                if (!r.Ct()) continue
                const n = r.Tt()
                if (null === n) continue
                const l = r.Kl(t.Ms(), t.ci())
                let a = l && l.bh()
                if (null !== a) {
                    switch (this.un.mode) {
                        case 1:
                            a = Fi(a, this.Ka)
                            break
                        case 2:
                            a = zi(a, n.Bt)
                            break
                        case 3:
                            a = Ii(a, n.Bt)
                    }
                    if (((i = null === i ? a : i.Qn(h(a))), null !== l)) {
                        const t = l.gh()
                        null !== t &&
                            ((s = Math.max(s, t.above)),
                            (e = Math.max(s, t.below)))
                    }
                }
            }
            if (
                ((s === this.Wa && e === this.ja) ||
                    ((this.Wa = s), (this.ja = e), (this.Ya = null), this.ro()),
                null !== i)
            ) {
                if (i.lh() === i.ah()) {
                    const t = this.Lo(),
                        n =
                            5 *
                            (null === t || this.th() || this.lo() ? 1 : t.Jl())
                    this.Ea() && (i = Wi(i, this.Ka)),
                        (i = new ci(i.lh() - n, i.ah() + n)),
                        this.Ea() && (i = Fi(i, this.Ka))
                }
                if (this.Ea()) {
                    const t = Wi(i, this.Ka),
                        n = ji(t)
                    if (
                        ((r = n), (l = this.Ka), r.wa !== l.wa || r.Ma !== l.Ma)
                    ) {
                        const s = null !== this.Ia ? Wi(this.Ia, this.Ka) : null
                        ;(this.Ka = n),
                            (i = Fi(t, n)),
                            null !== s && (this.Ia = Fi(s, n))
                    }
                }
                this.oo(i)
            } else
                null === this.ph &&
                    (this.oo(new ci(-0.5, 0.5)), (this.Ka = ji(null)))
            var r, l
            this.Va.Na = !0
        }
        bo() {
            return this.th()
                ? Ei
                : this.lo()
                ? Ai
                : this.Ea()
                ? (t) => Vi(t, this.Ka)
                : null
        }
        Hh(t, i) {
            return void 0 === this.Qa.priceFormatter
                ? (void 0 === i && (i = this.Ql()), i.format(t))
                : this.Qa.priceFormatter(t)
        }
    }
    class Ki {
        constructor(t, i) {
            ;(this.Ua = []),
                (this.Io = new Map()),
                (this.za = 0),
                (this.Vo = 0),
                (this.No = 1e3),
                (this.qa = null),
                (this.Fo = new m()),
                (this.Wo = t),
                (this.Hi = i),
                (this.jo = new Bi(this))
            const n = i.F()
            ;(this.$o = this.Ho("left", n.leftPriceScale)),
                (this.Uo = this.Ho("right", n.rightPriceScale)),
                this.$o.uo().l(this.qo.bind(this, this.$o), this),
                this.Uo.uo().l(this.qo.bind(this, this.Uo), this),
                this.Yo(n)
        }
        Yo(t) {
            if (
                (t.leftPriceScale && this.$o.Vh(t.leftPriceScale),
                t.rightPriceScale && this.Uo.Vh(t.rightPriceScale),
                t.localization && (this.$o.ha(), this.Uo.ha()),
                t.overlayPriceScales)
            ) {
                const i = Array.from(this.Io.values())
                for (const n of i) {
                    const i = h(n[0].Ot())
                    i.Vh(t.overlayPriceScales), t.localization && i.ha()
                }
            }
        }
        Xo(t) {
            switch (t) {
                case "left":
                    return this.$o
                case "right":
                    return this.Uo
            }
            return this.Io.has(t) ? r(this.Io.get(t))[0].Ot() : null
        }
        M() {
            this.Ut().Zo().v(this),
                this.$o.uo().v(this),
                this.Uo.uo().v(this),
                this.Ua.forEach((t) => {
                    t.M && t.M()
                }),
                this.Fo.m()
        }
        Ko() {
            return this.No
        }
        Go(t) {
            this.No = t
        }
        Ut() {
            return this.Hi
        }
        $i() {
            return this.Vo
        }
        zt() {
            return this.za
        }
        Jo(t) {
            ;(this.Vo = t), this.Qo()
        }
        co(t) {
            ;(this.za = t),
                this.$o.co(t),
                this.Uo.co(t),
                this.Ua.forEach((i) => {
                    if (this.Ge(i)) {
                        const n = i.Ot()
                        null !== n && n.co(t)
                    }
                }),
                this.Qo()
        }
        oa() {
            return this.Ua
        }
        Ge(t) {
            const i = t.Ot()
            return null === i || (this.$o !== i && this.Uo !== i)
        }
        xo(t, i, n) {
            const s = void 0 !== n ? n : this.i_().t_ + 1
            this.n_(t, i, s)
        }
        yo(t) {
            const i = this.Ua.indexOf(t)
            e(-1 !== i, "removeDataSource: invalid data source"),
                this.Ua.splice(i, 1)
            const n = h(t.Ot()).ra()
            if (this.Io.has(n)) {
                const i = r(this.Io.get(n)),
                    s = i.indexOf(t)
                ;-1 !== s &&
                    (i.splice(s, 1), 0 === i.length && this.Io.delete(n))
            }
            const s = t.Ot()
            s && s.oa().indexOf(t) >= 0 && s.yo(t),
                null !== s && (s.So(), this.s_(s)),
                (this.qa = null)
        }
        Qe(t) {
            return t === this.$o ? "left" : t === this.Uo ? "right" : "overlay"
        }
        e_() {
            return this.$o
        }
        r_() {
            return this.Uo
        }
        h_(t, i) {
            t.To(i)
        }
        l_(t, i) {
            t.Po(i), this.Qo()
        }
        a_(t) {
            t.Ro()
        }
        o_(t, i) {
            t.Do(i)
        }
        __(t, i) {
            t.Oo(i), this.Qo()
        }
        u_(t) {
            t.Bo()
        }
        Qo() {
            this.Ua.forEach((t) => {
                t.Dn()
            })
        }
        fn() {
            let t = null
            return (
                this.Hi.F().rightPriceScale.visible && 0 !== this.Uo.oa().length
                    ? (t = this.Uo)
                    : this.Hi.F().leftPriceScale.visible &&
                      0 !== this.$o.oa().length
                    ? (t = this.$o)
                    : 0 !== this.Ua.length && (t = this.Ua[0].Ot()),
                null === t && (t = this.Uo),
                t
            )
        }
        Je() {
            let t = null
            return (
                this.Hi.F().rightPriceScale.visible
                    ? (t = this.Uo)
                    : this.Hi.F().leftPriceScale.visible && (t = this.$o),
                t
            )
        }
        s_(t) {
            null !== t && t.ho() && this.c_(t)
        }
        d_(t) {
            const i = this.Wo.Vs()
            t.eo({ Fn: !0 }), null !== i && t.zo(i), this.Qo()
        }
        f_() {
            this.c_(this.$o), this.c_(this.Uo)
        }
        p_() {
            this.s_(this.$o),
                this.s_(this.Uo),
                this.Ua.forEach((t) => {
                    this.Ge(t) && this.s_(t.Ot())
                }),
                this.Qo(),
                this.Hi.Nh()
        }
        Mo() {
            return null === this.qa && (this.qa = Ui(this.Ua)), this.qa
        }
        v_() {
            return this.Fo
        }
        m_() {
            return this.jo
        }
        c_(t) {
            const i = t.Eo()
            if (i && i.length > 0 && !this.Wo.Ni()) {
                const i = this.Wo.Vs()
                null !== i && t.zo(i)
            }
            t.Dn()
        }
        i_() {
            const t = this.Mo()
            if (0 === t.length) return { b_: 0, t_: 0 }
            let i = 0,
                n = 0
            for (let s = 0; s < t.length; s++) {
                const e = t[s].Zi()
                null !== e && (e < i && (i = e), e > n && (n = e))
            }
            return { b_: i, t_: n }
        }
        n_(t, i, n) {
            let s = this.Xo(i)
            if (
                (null === s && (s = this.Ho(i, this.Hi.F().overlayPriceScales)),
                this.Ua.push(t),
                !Q(i))
            ) {
                const n = this.Io.get(i) || []
                n.push(t), this.Io.set(i, n)
            }
            s.xo(t), t.Gi(s), t.Ki(n), this.s_(s), (this.qa = null)
        }
        qo(t, i, n) {
            i.lr !== n.lr && this.c_(t)
        }
        Ho(t, i) {
            const n = Object.assign({ visible: !0, autoScale: !0 }, S(i)),
                s = new Zi(t, n, this.Hi.F().layout, this.Hi.F().localization)
            return s.co(this.zt()), s
        }
    }
    const Gi = (t) => t.getUTCFullYear()
    function Ji(t, i, n) {
        return i
            .replace(/yyyy/g, ((t) => nt(Gi(t), 4))(t))
            .replace(/yy/g, ((t) => nt(Gi(t) % 100, 2))(t))
            .replace(
                /MMMM/g,
                ((t, i) =>
                    new Date(
                        t.getUTCFullYear(),
                        t.getUTCMonth(),
                        1
                    ).toLocaleString(i, { month: "long" }))(t, n)
            )
            .replace(
                /MMM/g,
                ((t, i) =>
                    new Date(
                        t.getUTCFullYear(),
                        t.getUTCMonth(),
                        1
                    ).toLocaleString(i, { month: "short" }))(t, n)
            )
            .replace(/MM/g, ((t) => nt(((t) => t.getUTCMonth() + 1)(t), 2))(t))
            .replace(/dd/g, ((t) => nt(((t) => t.getUTCDate())(t), 2))(t))
    }
    class Qi {
        constructor(t = "yyyy-MM-dd", i = "default") {
            ;(this.g_ = t), (this.w_ = i)
        }
        M_(t) {
            return Ji(t, this.g_, this.w_)
        }
    }
    class tn {
        constructor(t) {
            this.x_ = t || "%h:%m:%s"
        }
        M_(t) {
            return this.x_
                .replace("%h", nt(t.getUTCHours(), 2))
                .replace("%m", nt(t.getUTCMinutes(), 2))
                .replace("%s", nt(t.getUTCSeconds(), 2))
        }
    }
    const nn = { S_: "yyyy-MM-dd", y_: "%h:%m:%s", k_: " ", C_: "default" }
    class sn {
        constructor(t = {}) {
            const i = Object.assign(Object.assign({}, nn), t)
            ;(this.T_ = new Qi(i.S_, i.C_)),
                (this.P_ = new tn(i.y_)),
                (this.R_ = i.k_)
        }
        M_(t) {
            return `${this.T_.M_(t)}${this.R_}${this.P_.M_(t)}`
        }
    }
    class en {
        constructor(t, i = 50) {
            ;(this.Ee = 0),
                (this.ze = 1),
                (this.Ae = 1),
                (this.Ve = new Map()),
                (this.Ie = new Map()),
                (this.D_ = t),
                (this.Ne = i)
        }
        M_(t) {
            const i = t._t,
                n =
                    void 0 === i.O_
                        ? new Date(1e3 * i.jh).getTime()
                        : new Date(
                              Date.UTC(i.O_.year, i.O_.month - 1, i.O_.day)
                          ).getTime(),
                s = this.Ve.get(n)
            if (void 0 !== s) return s.B_
            if (this.Ee === this.Ne) {
                const t = this.Ie.get(this.Ae)
                this.Ie.delete(this.Ae),
                    this.Ve.delete(r(t)),
                    this.Ae++,
                    this.Ee--
            }
            const e = this.D_(t)
            return (
                this.Ve.set(n, { B_: e, $e: this.ze }),
                this.Ie.set(this.ze, n),
                this.Ee++,
                this.ze++,
                e
            )
        }
    }
    class rn {
        constructor(t, i) {
            e(t <= i, "right should be >= left"), (this.L_ = t), (this.E_ = i)
        }
        Ms() {
            return this.L_
        }
        ci() {
            return this.E_
        }
        z_() {
            return this.E_ - this.L_ + 1
        }
        zr(t) {
            return this.L_ <= t && t <= this.E_
        }
        rh(t) {
            return this.L_ === t.Ms() && this.E_ === t.ci()
        }
    }
    function hn(t, i) {
        return null === t || null === i ? t === i : t.rh(i)
    }
    class ln {
        constructor() {
            ;(this.A_ = new Map()), (this.Ve = null)
        }
        I_(t, i) {
            this.V_(i), (this.Ve = null)
            for (let n = i; n < t.length; ++n) {
                const i = t[n]
                let s = this.A_.get(i.N_)
                void 0 === s && ((s = []), this.A_.set(i.N_, s)),
                    s.push({ Ys: n, _t: i._t, F_: i.N_, W_: i.W_ })
            }
        }
        j_(t, i) {
            const n = Math.ceil(i / t)
            return (
                (null !== this.Ve && this.Ve.H_ === n) ||
                    (this.Ve = { ga: this.U_(n), H_: n }),
                this.Ve.ga
            )
        }
        V_(t) {
            if (0 === t) return void this.A_.clear()
            const i = []
            this.A_.forEach((n, s) => {
                t <= n[0].Ys
                    ? i.push(s)
                    : n.splice(
                          mt(n, t, (i) => i.Ys < t),
                          1 / 0
                      )
            })
            for (const t of i) this.A_.delete(t)
        }
        U_(t) {
            let i = []
            for (const n of Array.from(this.A_.keys()).sort((t, i) => i - t)) {
                if (!this.A_.get(n)) continue
                const s = i
                i = []
                const e = s.length
                let h = 0
                const l = r(this.A_.get(n)),
                    a = l.length
                let o = 1 / 0,
                    _ = -1 / 0
                for (let n = 0; n < a; n++) {
                    const r = l[n],
                        a = r.Ys
                    for (; h < e; ) {
                        const t = s[h],
                            n = t.Ys
                        if (!(n < a)) {
                            o = n
                            break
                        }
                        h++, i.push(t), (_ = n), (o = 1 / 0)
                    }
                    o - a >= t && a - _ >= t && (i.push(r), (_ = a))
                }
                for (; h < e; h++) i.push(s[h])
            }
            return i
        }
    }
    class an {
        constructor(t) {
            this.q_ = t
        }
        Y_() {
            return null === this.q_
                ? null
                : new rn(Math.floor(this.q_.Ms()), Math.ceil(this.q_.ci()))
        }
        X_() {
            return this.q_
        }
        static Z_() {
            return new an(null)
        }
    }
    var on, _n, un, cn, dn
    !(function (t) {
        ;(t[(t.Year = 0)] = "Year"),
            (t[(t.Month = 1)] = "Month"),
            (t[(t.DayOfMonth = 2)] = "DayOfMonth"),
            (t[(t.Time = 3)] = "Time"),
            (t[(t.TimeWithSeconds = 4)] = "TimeWithSeconds")
    })(on || (on = {}))
    class fn {
        constructor(t, i, n) {
            ;(this.Vo = 0),
                (this.K_ = null),
                (this.G_ = []),
                (this.Za = null),
                (this.Xa = null),
                (this.J_ = new ln()),
                (this.Q_ = new Map()),
                (this.tu = an.Z_()),
                (this.iu = !0),
                (this.nu = new m()),
                (this.su = new m()),
                (this.eu = new m()),
                (this.ru = null),
                (this.hu = null),
                (this.lu = []),
                (this.un = i),
                (this.Qa = n),
                (this.au = i.rightOffset),
                (this.ou = i.barSpacing),
                (this.Hi = t),
                this._u()
        }
        F() {
            return this.un
        }
        uu(t) {
            b(this.Qa, t), this.cu(), this._u()
        }
        Vh(t, i) {
            var n
            b(this.un, t),
                this.un.fixLeftEdge && this.du(),
                this.un.fixRightEdge && this.fu(),
                void 0 !== t.barSpacing && this.Hi.Kn(t.barSpacing),
                void 0 !== t.rightOffset && this.Hi.Gn(t.rightOffset),
                void 0 !== t.minBarSpacing &&
                    this.Hi.Kn(
                        null !== (n = t.barSpacing) && void 0 !== n
                            ? n
                            : this.ou
                    ),
                this.cu(),
                this._u(),
                this.eu.m()
        }
        vn(t) {
            var i, n
            return null !==
                (n =
                    null === (i = this.G_[t]) || void 0 === i
                        ? void 0
                        : i._t) && void 0 !== n
                ? n
                : null
        }
        Ui(t) {
            var i
            return null !== (i = this.G_[t]) && void 0 !== i ? i : null
        }
        Wh(t, i) {
            if (this.G_.length < 1) return null
            if (t.jh > this.G_[this.G_.length - 1]._t.jh)
                return i ? this.G_.length - 1 : null
            const n = mt(this.G_, t.jh, (t, i) => t._t.jh < i)
            return t.jh < this.G_[n]._t.jh ? (i ? n : null) : n
        }
        Ni() {
            return 0 === this.Vo || 0 === this.G_.length || null === this.K_
        }
        la() {
            return this.G_.length > 0
        }
        Vs() {
            return this.pu(), this.tu.Y_()
        }
        vu() {
            return this.pu(), this.tu.X_()
        }
        mu() {
            const t = this.Vs()
            if (null === t) return null
            const i = { from: t.Ms(), to: t.ci() }
            return this.bu(i)
        }
        bu(t) {
            const i = Math.round(t.from),
                n = Math.round(t.to),
                s = h(this.gu()),
                e = h(this.wu())
            return {
                from: h(this.vn(Math.max(s, i))),
                to: h(this.vn(Math.min(e, n))),
            }
        }
        Mu(t) {
            return { from: h(this.Wh(t.from, !0)), to: h(this.Wh(t.to, !0)) }
        }
        $i() {
            return this.Vo
        }
        Jo(t) {
            if (!isFinite(t) || t <= 0) return
            if (this.Vo === t) return
            const i = this.vu(),
                n = this.Vo
            if (
                ((this.Vo = t),
                (this.iu = !0),
                this.un.lockVisibleTimeRangeOnResize && 0 !== n)
            ) {
                const i = (this.ou * t) / n
                this.ou = i
            }
            if (this.un.fixLeftEdge && null !== i && i.Ms() <= 0) {
                const i = n - t
                ;(this.au -= Math.round(i / this.ou) + 1), (this.iu = !0)
            }
            this.xu(), this.Su()
        }
        At(t) {
            if (this.Ni() || !w(t)) return 0
            const i = this.yu() + this.au - t
            return this.Vo - (i + 0.5) * this.ou - 1
        }
        js(t, i) {
            const n = this.yu(),
                s = void 0 === i ? 0 : i.from,
                e = void 0 === i ? t.length : i.to
            for (let i = s; i < e; i++) {
                const s = t[i]._t,
                    e = n + this.au - s,
                    r = this.Vo - (e + 0.5) * this.ou - 1
                t[i].st = r
            }
        }
        ku(t) {
            return Math.ceil(this.Cu(t))
        }
        Gn(t) {
            ;(this.iu = !0),
                (this.au = t),
                this.Su(),
                this.Hi.Tu(),
                this.Hi.Nh()
        }
        Ks() {
            return this.ou
        }
        Kn(t) {
            this.Pu(t), this.Su(), this.Hi.Tu(), this.Hi.Nh()
        }
        Ru() {
            return this.au
        }
        ga() {
            if (this.Ni()) return null
            if (null !== this.hu) return this.hu
            const t = this.ou,
                i = 5 * (this.Hi.F().layout.fontSize + 4),
                n = Math.round(i / t),
                s = h(this.Vs()),
                e = Math.max(s.Ms(), s.Ms() - n),
                r = Math.max(s.ci(), s.ci() - n),
                l = this.J_.j_(t, i),
                a = this.gu() + n,
                o = this.wu() - n,
                _ = this.Du(),
                u = this.un.fixLeftEdge || _,
                c = this.un.fixRightEdge || _
            let d = 0
            for (const t of l) {
                if (!(e <= t.Ys && t.Ys <= r)) continue
                let n
                d < this.lu.length
                    ? ((n = this.lu[d]),
                      (n.fa = this.At(t.Ys)),
                      (n.Ba = this.Ou(t)),
                      (n.F_ = t.F_))
                    : ((n = {
                          Bu: !1,
                          fa: this.At(t.Ys),
                          Ba: this.Ou(t),
                          F_: t.F_,
                      }),
                      this.lu.push(n)),
                    this.ou > i / 2 && !_
                        ? (n.Bu = !1)
                        : (n.Bu = (u && t.Ys <= a) || (c && t.Ys >= o)),
                    d++
            }
            return (this.lu.length = d), (this.hu = this.lu), this.lu
        }
        Lu() {
            ;(this.iu = !0),
                this.Kn(this.un.barSpacing),
                this.Gn(this.un.rightOffset)
        }
        Eu(t) {
            ;(this.iu = !0), (this.K_ = t), this.Su(), this.du()
        }
        zu(t, i) {
            const n = this.Cu(t),
                s = this.Ks(),
                e = s + i * (s / 10)
            this.Kn(e),
                this.un.rightBarStaysOnScroll ||
                    this.Gn(this.Ru() + (n - this.Cu(t)))
        }
        To(t) {
            this.Za && this.Bo(),
                null === this.Xa &&
                    null === this.ru &&
                    (this.Ni() || ((this.Xa = t), this.Au()))
        }
        Po(t) {
            if (null === this.ru) return
            const i = Pt(this.Vo - t, 0, this.Vo),
                n = Pt(this.Vo - h(this.Xa), 0, this.Vo)
            0 !== i && 0 !== n && this.Kn((this.ru.Ks * i) / n)
        }
        Ro() {
            null !== this.Xa && ((this.Xa = null), this.Iu())
        }
        Do(t) {
            null === this.Za &&
                null === this.ru &&
                (this.Ni() || ((this.Za = t), this.Au()))
        }
        Oo(t) {
            if (null === this.Za) return
            const i = (this.Za - t) / this.Ks()
            ;(this.au = h(this.ru).Ru + i), (this.iu = !0), this.Su()
        }
        Bo() {
            null !== this.Za && ((this.Za = null), this.Iu())
        }
        Vu() {
            this.Nu(this.un.rightOffset)
        }
        Nu(t, i = 400) {
            if (!isFinite(t))
                throw new RangeError(
                    "offset is required and must be finite number"
                )
            if (!isFinite(i) || i <= 0)
                throw new RangeError(
                    "animationDuration (optional) must be finite positive number"
                )
            const n = this.au,
                s = performance.now()
            this.Hi.Yn({
                Fu: (t) => (t - s) / i >= 1,
                Wu: (e) => {
                    const r = (e - s) / i
                    return r >= 1 ? t : n + (t - n) * r
                },
            })
        }
        gt(t, i) {
            ;(this.iu = !0), (this.G_ = t), this.J_.I_(t, i), this.Su()
        }
        ju() {
            return this.nu
        }
        $u() {
            return this.su
        }
        Hu() {
            return this.eu
        }
        yu() {
            return this.K_ || 0
        }
        Uu(t) {
            const i = t.z_()
            this.Pu(this.Vo / i),
                (this.au = t.ci() - this.yu()),
                this.Su(),
                (this.iu = !0),
                this.Hi.Tu(),
                this.Hi.Nh()
        }
        qu() {
            const t = this.gu(),
                i = this.wu()
            null !== t &&
                null !== i &&
                this.Uu(new rn(t, i + this.un.rightOffset))
        }
        Yu(t) {
            const i = new rn(t.from, t.to)
            this.Uu(i)
        }
        qi(t) {
            return void 0 !== this.Qa.timeFormatter
                ? this.Qa.timeFormatter(t.W_)
                : this.Xu.M_(new Date(1e3 * t._t.jh))
        }
        Du() {
            const { handleScroll: t, handleScale: i } = this.Hi.F()
            return !(
                t.horzTouchDrag ||
                t.mouseWheel ||
                t.pressedMouseMove ||
                t.vertTouchDrag ||
                i.axisDoubleClickReset.time ||
                i.axisPressedMouseMove.time ||
                i.mouseWheel ||
                i.pinch
            )
        }
        gu() {
            return 0 === this.G_.length ? null : 0
        }
        wu() {
            return 0 === this.G_.length ? null : this.G_.length - 1
        }
        Zu(t) {
            return (this.Vo - 1 - t) / this.ou
        }
        Cu(t) {
            const i = this.Zu(t),
                n = this.yu() + this.au - i
            return Math.round(1e6 * n) / 1e6
        }
        Pu(t) {
            const i = this.ou
            ;(this.ou = t),
                this.xu(),
                i !== this.ou && ((this.iu = !0), this.Ku())
        }
        pu() {
            if (!this.iu) return
            if (((this.iu = !1), this.Ni())) return void this.Gu(an.Z_())
            const t = this.yu(),
                i = this.Vo / this.ou,
                n = this.au + t,
                s = new rn(n - i + 1, n)
            this.Gu(new an(s))
        }
        xu() {
            const t = this.Ju()
            if (
                (this.ou < t && ((this.ou = t), (this.iu = !0)), 0 !== this.Vo)
            ) {
                const t = 0.5 * this.Vo
                this.ou > t && ((this.ou = t), (this.iu = !0))
            }
        }
        Ju() {
            return this.un.fixLeftEdge &&
                this.un.fixRightEdge &&
                0 !== this.G_.length
                ? this.Vo / this.G_.length
                : this.un.minBarSpacing
        }
        Su() {
            const t = this.Qu()
            this.au > t && ((this.au = t), (this.iu = !0))
            const i = this.tc()
            null !== i && this.au < i && ((this.au = i), (this.iu = !0))
        }
        tc() {
            const t = this.gu(),
                i = this.K_
            if (null === t || null === i) return null
            return (
                t -
                i -
                1 +
                (this.un.fixLeftEdge
                    ? this.Vo / this.ou
                    : Math.min(2, this.G_.length))
            )
        }
        Qu() {
            return this.un.fixRightEdge
                ? 0
                : this.Vo / this.ou - Math.min(2, this.G_.length)
        }
        Au() {
            this.ru = { Ks: this.Ks(), Ru: this.Ru() }
        }
        Iu() {
            this.ru = null
        }
        Ou(t) {
            let i = this.Q_.get(t.F_)
            return (
                void 0 === i &&
                    ((i = new en((t) => this.ic(t))), this.Q_.set(t.F_, i)),
                i.M_(t)
            )
        }
        ic(t) {
            const i = (function (t, i, n) {
                switch (t) {
                    case 0:
                    case 10:
                        return i ? (n ? 4 : 3) : 2
                    case 20:
                    case 21:
                    case 22:
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                        return i ? 3 : 2
                    case 50:
                        return 2
                    case 60:
                        return 1
                    case 70:
                        return 0
                }
            })(t.F_, this.un.timeVisible, this.un.secondsVisible)
            if (void 0 !== this.un.tickMarkFormatter) {
                const n = this.un.tickMarkFormatter(t.W_, i, this.Qa.locale)
                if (null !== n) return n
            }
            return (function (t, i, n) {
                const s = {}
                switch (i) {
                    case 0:
                        s.year = "numeric"
                        break
                    case 1:
                        s.month = "short"
                        break
                    case 2:
                        s.day = "numeric"
                        break
                    case 3:
                        ;(s.hour12 = !1),
                            (s.hour = "2-digit"),
                            (s.minute = "2-digit")
                        break
                    case 4:
                        ;(s.hour12 = !1),
                            (s.hour = "2-digit"),
                            (s.minute = "2-digit"),
                            (s.second = "2-digit")
                }
                const e =
                    void 0 === t.O_
                        ? new Date(1e3 * t.jh)
                        : new Date(
                              Date.UTC(t.O_.year, t.O_.month - 1, t.O_.day)
                          )
                return new Date(
                    e.getUTCFullYear(),
                    e.getUTCMonth(),
                    e.getUTCDate(),
                    e.getUTCHours(),
                    e.getUTCMinutes(),
                    e.getUTCSeconds(),
                    e.getUTCMilliseconds()
                ).toLocaleString(n, s)
            })(t._t, i, this.Qa.locale)
        }
        Gu(t) {
            const i = this.tu
            ;(this.tu = t),
                hn(i.Y_(), this.tu.Y_()) || this.nu.m(),
                hn(i.X_(), this.tu.X_()) || this.su.m(),
                this.Ku()
        }
        Ku() {
            this.hu = null
        }
        cu() {
            this.Ku(), this.Q_.clear()
        }
        _u() {
            const t = this.Qa.dateFormat
            this.un.timeVisible
                ? (this.Xu = new sn({
                      S_: t,
                      y_: this.un.secondsVisible ? "%h:%m:%s" : "%h:%m",
                      k_: "   ",
                      C_: this.Qa.locale,
                  }))
                : (this.Xu = new Qi(t, this.Qa.locale))
        }
        du() {
            if (!this.un.fixLeftEdge) return
            const t = this.gu()
            if (null === t) return
            const i = this.Vs()
            if (null === i) return
            const n = i.Ms() - t
            if (n < 0) {
                const t = this.au - n - 1
                this.Gn(t)
            }
            this.xu()
        }
        fu() {
            this.Su(), this.xu()
        }
    }
    class pn extends D {
        constructor(t) {
            super(), (this.nc = new Map()), (this.It = t)
        }
        Z(t) {}
        G(t) {
            if (!this.It.Ct) return
            const { context: i, mediaSize: n } = t
            let s = 0
            for (const t of this.It.sc) {
                if (0 === t.Gt.length) continue
                i.font = t.P
                const e = this.ec(i, t.Gt)
                e > n.width ? (t.zu = n.width / e) : (t.zu = 1),
                    (s += t.rc * t.zu)
            }
            let e = 0
            switch (this.It.hc) {
                case "top":
                    e = 0
                    break
                case "center":
                    e = Math.max((n.height - s) / 2, 0)
                    break
                case "bottom":
                    e = Math.max(n.height - s, 0)
            }
            i.fillStyle = this.It.D
            for (const t of this.It.sc) {
                i.save()
                let s = 0
                switch (this.It.lc) {
                    case "left":
                        ;(i.textAlign = "left"), (s = t.rc / 2)
                        break
                    case "center":
                        ;(i.textAlign = "center"), (s = n.width / 2)
                        break
                    case "right":
                        ;(i.textAlign = "right"), (s = n.width - 1 - t.rc / 2)
                }
                i.translate(s, e),
                    (i.textBaseline = "top"),
                    (i.font = t.P),
                    i.scale(t.zu, t.zu),
                    i.fillText(t.Gt, 0, t.ac),
                    i.restore(),
                    (e += t.rc * t.zu)
            }
        }
        ec(t, i) {
            const n = this.oc(t.font)
            let s = n.get(i)
            return (
                void 0 === s && ((s = t.measureText(i).width), n.set(i, s)), s
            )
        }
        oc(t) {
            let i = this.nc.get(t)
            return void 0 === i && ((i = new Map()), this.nc.set(t, i)), i
        }
    }
    class vn {
        constructor(t) {
            ;(this.vt = !0),
                (this.Wt = {
                    Ct: !1,
                    D: "",
                    sc: [],
                    hc: "center",
                    lc: "center",
                }),
                (this.jt = new pn(this.Wt)),
                (this.$t = t)
        }
        gt() {
            this.vt = !0
        }
        Mt() {
            return this.vt && (this.xt(), (this.vt = !1)), this.jt
        }
        xt() {
            const t = this.$t.F(),
                i = this.Wt
            ;(i.Ct = t.visible),
                i.Ct &&
                    ((i.D = t.color),
                    (i.lc = t.horzAlign),
                    (i.hc = t.vertAlign),
                    (i.sc = [
                        {
                            Gt: t.text,
                            P: T(t.fontSize, t.fontFamily, t.fontStyle),
                            rc: 1.2 * t.fontSize,
                            ac: 0,
                            zu: 0,
                        },
                    ]))
        }
    }
    class mn extends K {
        constructor(t, i) {
            super(), (this.un = i), (this.bn = new vn(this))
        }
        Pn() {
            return []
        }
        Tn() {
            return [this.bn]
        }
        F() {
            return this.un
        }
        Dn() {
            this.bn.gt()
        }
    }
    !(function (t) {
        ;(t[(t.OnTouchEnd = 0)] = "OnTouchEnd"),
            (t[(t.OnNextTap = 1)] = "OnNextTap")
    })(_n || (_n = {}))
    class bn {
        constructor(t, i) {
            ;(this._c = []),
                (this.uc = []),
                (this.Vo = 0),
                (this.cc = null),
                (this.dc = new m()),
                (this.fc = new m()),
                (this.vc = null),
                (this.mc = t),
                (this.un = i),
                (this.bc = new P(this)),
                (this.Wo = new fn(this, i.timeScale, this.un.localization)),
                (this.bt = new J(this, i.crosshair)),
                (this.gc = new Ri(i.crosshair)),
                (this.wc = new mn(this, i.watermark)),
                this.Mc(),
                this._c[0].Go(2e3),
                (this.xc = this.Sc(0)),
                (this.yc = this.Sc(1))
        }
        Ll() {
            this.kc(tt.ss())
        }
        Nh() {
            this.kc(tt.ns())
        }
        Xl() {
            this.kc(new tt(1))
        }
        El(t) {
            const i = this.Cc(t)
            this.kc(i)
        }
        Tc() {
            return this.cc
        }
        Pc(t) {
            const i = this.cc
            ;(this.cc = t),
                null !== i && this.El(i.Rc),
                null !== t && this.El(t.Rc)
        }
        F() {
            return this.un
        }
        Vh(t) {
            b(this.un, t),
                this._c.forEach((i) => i.Yo(t)),
                void 0 !== t.timeScale && this.Wo.Vh(t.timeScale),
                void 0 !== t.localization && this.Wo.uu(t.localization),
                (t.leftPriceScale || t.rightPriceScale) && this.dc.m(),
                (this.xc = this.Sc(0)),
                (this.yc = this.Sc(1)),
                this.Ll()
        }
        Dc(t, i) {
            if ("left" === t) return void this.Vh({ leftPriceScale: i })
            if ("right" === t) return void this.Vh({ rightPriceScale: i })
            const n = this.Oc(t)
            null !== n && (n.Ot.Vh(i), this.dc.m())
        }
        Oc(t) {
            for (const i of this._c) {
                const n = i.Xo(t)
                if (null !== n) return { Ht: i, Ot: n }
            }
            return null
        }
        yt() {
            return this.Wo
        }
        Bc() {
            return this._c
        }
        Lc() {
            return this.wc
        }
        Ec() {
            return this.bt
        }
        zc() {
            return this.fc
        }
        Ac(t, i) {
            t.co(i), this.Tu()
        }
        Jo(t) {
            ;(this.Vo = t),
                this.Wo.Jo(this.Vo),
                this._c.forEach((i) => i.Jo(t)),
                this.Tu()
        }
        Mc(t) {
            const i = new Ki(this.Wo, this)
            void 0 !== t ? this._c.splice(t, 0, i) : this._c.push(i)
            const n = void 0 === t ? this._c.length - 1 : t,
                s = tt.ss()
            return s.Vn(n, { Nn: 0, Fn: !0 }), this.kc(s), i
        }
        h_(t, i, n) {
            t.h_(i, n)
        }
        l_(t, i, n) {
            t.l_(i, n), this.zl(), this.kc(this.Ic(t, 2))
        }
        a_(t, i) {
            t.a_(i), this.kc(this.Ic(t, 2))
        }
        o_(t, i, n) {
            i.ho() || t.o_(i, n)
        }
        __(t, i, n) {
            i.ho() || (t.__(i, n), this.zl(), this.kc(this.Ic(t, 2)))
        }
        u_(t, i) {
            i.ho() || (t.u_(i), this.kc(this.Ic(t, 2)))
        }
        d_(t, i) {
            t.d_(i), this.kc(this.Ic(t, 2))
        }
        Vc(t) {
            this.Wo.To(t)
        }
        Nc(t, i) {
            const n = this.yt()
            if (n.Ni() || 0 === i) return
            const s = n.$i()
            ;(t = Math.max(1, Math.min(t, s))), n.zu(t, i), this.Tu()
        }
        Fc(t) {
            this.Wc(0), this.jc(t), this.$c()
        }
        Hc(t) {
            this.Wo.Po(t), this.Tu()
        }
        Uc() {
            this.Wo.Ro(), this.Nh()
        }
        Wc(t) {
            this.Wo.Do(t)
        }
        jc(t) {
            this.Wo.Oo(t), this.Tu()
        }
        $c() {
            this.Wo.Bo(), this.Nh()
        }
        wt() {
            return this.uc
        }
        qc(t, i, n, s) {
            this.bt.gn(t, i)
            let e = NaN,
                r = this.Wo.ku(t)
            const h = this.Wo.Vs()
            null !== h && (r = Math.min(Math.max(h.Ms(), r), h.ci()))
            const l = s.fn(),
                a = l.Tt()
            null !== a && (e = l.pn(i, a)),
                (e = this.gc.aa(e, r, s)),
                this.bt.Sn(r, e, s),
                this.Xl(),
                this.fc.m(this.bt.St(), { x: t, y: i }, n)
        }
        Yc() {
            this.Ec().kn(), this.Xl(), this.fc.m(null, null, null)
        }
        zl() {
            const t = this.bt.Ht()
            if (null !== t) {
                const i = this.bt.Mn(),
                    n = this.bt.xn()
                this.qc(i, n, null, t)
            }
            this.bt.Dn()
        }
        Xc(t, i, n) {
            const s = this.Wo.vn(0)
            void 0 !== i && void 0 !== n && this.Wo.gt(i, n)
            const e = this.Wo.vn(0),
                r = this.Wo.yu(),
                h = this.Wo.Vs()
            if (null !== h && null !== s && null !== e) {
                const i = h.zr(r),
                    n = s.jh > e.jh,
                    l = null !== t && t > r && !n,
                    a = i && this.Wo.F().shiftVisibleRangeOnNewBar
                if (l && !a) {
                    const i = t - r
                    this.Wo.Gn(this.Wo.Ru() - i)
                }
            }
            this.Wo.Eu(t)
        }
        Vl(t) {
            null !== t && t.p_()
        }
        Ke(t) {
            const i = this._c.find((i) => i.Mo().includes(t))
            return void 0 === i ? null : i
        }
        Tu() {
            this.wc.Dn(), this._c.forEach((t) => t.p_()), this.zl()
        }
        M() {
            this._c.forEach((t) => t.M()),
                (this._c.length = 0),
                (this.un.localization.priceFormatter = void 0),
                (this.un.localization.timeFormatter = void 0)
        }
        Zc() {
            return this.bc
        }
        tr() {
            return this.bc.F()
        }
        Zo() {
            return this.dc
        }
        Kc(t, i) {
            const n = this._c[0],
                s = this.Gc(i, t, n)
            return (
                this.uc.push(s), 1 === this.uc.length ? this.Ll() : this.Nh(), s
            )
        }
        Jc(t) {
            const i = this.Ke(t),
                n = this.uc.indexOf(t)
            e(-1 !== n, "Series not found"),
                this.uc.splice(n, 1),
                h(i).yo(t),
                t.M && t.M()
        }
        Bl(t, i) {
            const n = h(this.Ke(t))
            n.yo(t)
            const s = this.Oc(i)
            if (null === s) {
                const s = t.Zi()
                n.xo(t, i, s)
            } else {
                const e = s.Ht === n ? t.Zi() : void 0
                s.Ht.xo(t, i, e)
            }
        }
        qu() {
            const t = tt.ns()
            t.$n(), this.kc(t)
        }
        Qc(t) {
            const i = tt.ns()
            i.qn(t), this.kc(i)
        }
        Zn() {
            const t = tt.ns()
            t.Zn(), this.kc(t)
        }
        Kn(t) {
            const i = tt.ns()
            i.Kn(t), this.kc(i)
        }
        Gn(t) {
            const i = tt.ns()
            i.Gn(t), this.kc(i)
        }
        Yn(t) {
            const i = tt.ns()
            i.Yn(t), this.kc(i)
        }
        Hn() {
            const t = tt.ns()
            t.Hn(), this.kc(t)
        }
        td() {
            return this.un.rightPriceScale.visible ? "right" : "left"
        }
        nd() {
            return this.yc
        }
        U() {
            return this.xc
        }
        Et(t) {
            const i = this.yc,
                n = this.xc
            if (i === n) return i
            if (
                ((t = Math.max(0, Math.min(100, Math.round(100 * t)))),
                null === this.vc || this.vc.bs !== n || this.vc.gs !== i)
            )
                this.vc = { bs: n, gs: i, sd: new Map() }
            else {
                const i = this.vc.sd.get(t)
                if (void 0 !== i) return i
            }
            const s = (function (t, i, n) {
                const [s, e, r, h] = p(t),
                    [l, a, u, c] = p(i),
                    d = [
                        o(s + n * (l - s)),
                        o(e + n * (a - e)),
                        o(r + n * (u - r)),
                        _(h + n * (c - h)),
                    ]
                return `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${d[3]})`
            })(n, i, t / 100)
            return this.vc.sd.set(t, s), s
        }
        Ic(t, i) {
            const n = new tt(i)
            if (null !== t) {
                const s = this._c.indexOf(t)
                n.Vn(s, { Nn: i })
            }
            return n
        }
        Cc(t, i) {
            return void 0 === i && (i = 2), this.Ic(this.Ke(t), i)
        }
        kc(t) {
            this.mc && this.mc(t), this._c.forEach((t) => t.m_().Fh().gt())
        }
        Gc(t, i, n) {
            const s = new Pi(this, t, i),
                e = void 0 !== t.priceScaleId ? t.priceScaleId : this.td()
            return n.xo(s, e), Q(e) || s.Vh(t), s
        }
        Sc(t) {
            const i = this.un.layout
            return "gradient" === i.background.type
                ? 0 === t
                    ? i.background.topColor
                    : i.background.bottomColor
                : i.background.color
        }
    }
    function gn(t) {
        return !g(t) && !M(t)
    }
    function wn(t) {
        return g(t)
    }
    function Mn(t) {
        var i = t.width,
            n = t.height
        if (i < 0) throw new Error("Negative width is not allowed for Size")
        if (n < 0) throw new Error("Negative height is not allowed for Size")
        return { width: i, height: n }
    }
    function xn(t, i) {
        return t.width === i.width && t.height === i.height
    }
    !(function (t) {
        ;(t[(t.Disabled = 0)] = "Disabled"),
            (t[(t.Continuous = 1)] = "Continuous"),
            (t[(t.OnDataUpdate = 2)] = "OnDataUpdate")
    })(un || (un = {})),
        (function (t) {
            ;(t[(t.LastBar = 0)] = "LastBar"),
                (t[(t.LastVisible = 1)] = "LastVisible")
        })(cn || (cn = {})),
        (function (t) {
            ;(t.Solid = "solid"), (t.VerticalGradient = "gradient")
        })(dn || (dn = {}))
    var Sn = (function () {
        function t(t) {
            var i = this
            ;(this._resolutionListener = function () {
                return i._onResolutionChanged()
            }),
                (this._resolutionMediaQueryList = null),
                (this._observers = []),
                (this._window = t),
                this._installResolutionListener()
        }
        return (
            (t.prototype.dispose = function () {
                this._uninstallResolutionListener(), (this._window = null)
            }),
            Object.defineProperty(t.prototype, "value", {
                get: function () {
                    return this._window.devicePixelRatio
                },
                enumerable: !1,
                configurable: !0,
            }),
            (t.prototype.subscribe = function (t) {
                var i = this,
                    n = { next: t }
                return (
                    this._observers.push(n),
                    {
                        unsubscribe: function () {
                            i._observers = i._observers.filter(function (t) {
                                return t !== n
                            })
                        },
                    }
                )
            }),
            (t.prototype._installResolutionListener = function () {
                if (null !== this._resolutionMediaQueryList)
                    throw new Error("Resolution listener is already installed")
                var t = this._window.devicePixelRatio
                ;(this._resolutionMediaQueryList = this._window.matchMedia(
                    "all and (resolution: ".concat(t, "dppx)")
                )),
                    this._resolutionMediaQueryList.addListener(
                        this._resolutionListener
                    )
            }),
            (t.prototype._uninstallResolutionListener = function () {
                null !== this._resolutionMediaQueryList &&
                    (this._resolutionMediaQueryList.removeListener(
                        this._resolutionListener
                    ),
                    (this._resolutionMediaQueryList = null))
            }),
            (t.prototype._reinstallResolutionListener = function () {
                this._uninstallResolutionListener(),
                    this._installResolutionListener()
            }),
            (t.prototype._onResolutionChanged = function () {
                var t = this
                this._observers.forEach(function (i) {
                    return i.next(t._window.devicePixelRatio)
                }),
                    this._reinstallResolutionListener()
            }),
            t
        )
    })()
    var yn = (function () {
        function t(t, i, n) {
            var s
            ;(this._canvasElement = null),
                (this._bitmapSizeChangedListeners = []),
                (this._suggestedBitmapSize = null),
                (this._suggestedBitmapSizeChangedListeners = []),
                (this._devicePixelRatioObservable = null),
                (this._canvasElementResizeObserver = null),
                (this._canvasElement = t),
                (this._canvasElementClientSize = Mn({
                    width: this._canvasElement.clientWidth,
                    height: this._canvasElement.clientHeight,
                })),
                (this._transformBitmapSize =
                    null != i
                        ? i
                        : function (t) {
                              return t
                          }),
                (this._allowResizeObserver =
                    null === (s = null == n ? void 0 : n.allowResizeObserver) ||
                    void 0 === s ||
                    s),
                this._chooseAndInitObserver()
        }
        return (
            (t.prototype.dispose = function () {
                var t, i
                if (null === this._canvasElement)
                    throw new Error("Object is disposed")
                null === (t = this._canvasElementResizeObserver) ||
                    void 0 === t ||
                    t.disconnect(),
                    (this._canvasElementResizeObserver = null),
                    null === (i = this._devicePixelRatioObservable) ||
                        void 0 === i ||
                        i.dispose(),
                    (this._devicePixelRatioObservable = null),
                    (this._suggestedBitmapSizeChangedListeners.length = 0),
                    (this._bitmapSizeChangedListeners.length = 0),
                    (this._canvasElement = null)
            }),
            Object.defineProperty(t.prototype, "canvasElement", {
                get: function () {
                    if (null === this._canvasElement)
                        throw new Error("Object is disposed")
                    return this._canvasElement
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(t.prototype, "canvasElementClientSize", {
                get: function () {
                    return this._canvasElementClientSize
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(t.prototype, "bitmapSize", {
                get: function () {
                    return Mn({
                        width: this.canvasElement.width,
                        height: this.canvasElement.height,
                    })
                },
                enumerable: !1,
                configurable: !0,
            }),
            (t.prototype.resizeCanvasElement = function (t) {
                ;(this._canvasElementClientSize = Mn(t)),
                    (this.canvasElement.style.width = "".concat(
                        this._canvasElementClientSize.width,
                        "px"
                    )),
                    (this.canvasElement.style.height = "".concat(
                        this._canvasElementClientSize.height,
                        "px"
                    )),
                    this._invalidateBitmapSize()
            }),
            (t.prototype.subscribeBitmapSizeChanged = function (t) {
                this._bitmapSizeChangedListeners.push(t)
            }),
            (t.prototype.unsubscribeBitmapSizeChanged = function (t) {
                this._bitmapSizeChangedListeners =
                    this._bitmapSizeChangedListeners.filter(function (i) {
                        return i !== t
                    })
            }),
            Object.defineProperty(t.prototype, "suggestedBitmapSize", {
                get: function () {
                    return this._suggestedBitmapSize
                },
                enumerable: !1,
                configurable: !0,
            }),
            (t.prototype.subscribeSuggestedBitmapSizeChanged = function (t) {
                this._suggestedBitmapSizeChangedListeners.push(t)
            }),
            (t.prototype.unsubscribeSuggestedBitmapSizeChanged = function (t) {
                this._suggestedBitmapSizeChangedListeners =
                    this._suggestedBitmapSizeChangedListeners.filter(function (
                        i
                    ) {
                        return i !== t
                    })
            }),
            (t.prototype.applySuggestedBitmapSize = function () {
                if (null !== this._suggestedBitmapSize) {
                    var t = this._suggestedBitmapSize
                    ;(this._suggestedBitmapSize = null),
                        this._resizeBitmap(t),
                        this._emitSuggestedBitmapSizeChanged(
                            t,
                            this._suggestedBitmapSize
                        )
                }
            }),
            (t.prototype._resizeBitmap = function (t) {
                var i = this.bitmapSize
                xn(i, t) ||
                    ((this.canvasElement.width = t.width),
                    (this.canvasElement.height = t.height),
                    this._emitBitmapSizeChanged(i, t))
            }),
            (t.prototype._emitBitmapSizeChanged = function (t, i) {
                var n = this
                this._bitmapSizeChangedListeners.forEach(function (s) {
                    return s.call(n, t, i)
                })
            }),
            (t.prototype._suggestNewBitmapSize = function (t) {
                var i = this._suggestedBitmapSize,
                    n = Mn(
                        this._transformBitmapSize(
                            t,
                            this._canvasElementClientSize
                        )
                    ),
                    s = xn(this.bitmapSize, n) ? null : n
                ;(null === i && null === s) ||
                    (null !== i && null !== s && xn(i, s)) ||
                    ((this._suggestedBitmapSize = s),
                    this._emitSuggestedBitmapSizeChanged(i, s))
            }),
            (t.prototype._emitSuggestedBitmapSizeChanged = function (t, i) {
                var n = this
                this._suggestedBitmapSizeChangedListeners.forEach(function (s) {
                    return s.call(n, t, i)
                })
            }),
            (t.prototype._chooseAndInitObserver = function () {
                var t = this
                this._allowResizeObserver
                    ? new Promise(function (t) {
                          var i = new ResizeObserver(function (n) {
                              t(
                                  n.every(function (t) {
                                      return "devicePixelContentBoxSize" in t
                                  })
                              ),
                                  i.disconnect()
                          })
                          i.observe(document.body, {
                              box: "device-pixel-content-box",
                          })
                      })
                          .catch(function () {
                              return !1
                          })
                          .then(function (i) {
                              return i
                                  ? t._initResizeObserver()
                                  : t._initDevicePixelRatioObservable()
                          })
                    : this._initDevicePixelRatioObservable()
            }),
            (t.prototype._initDevicePixelRatioObservable = function () {
                var t = this
                if (null !== this._canvasElement) {
                    var i = kn(this._canvasElement)
                    if (null === i)
                        throw new Error(
                            "No window is associated with the canvas"
                        )
                    ;(this._devicePixelRatioObservable = (function (t) {
                        return new Sn(t)
                    })(i)),
                        this._devicePixelRatioObservable.subscribe(function () {
                            return t._invalidateBitmapSize()
                        }),
                        this._invalidateBitmapSize()
                }
            }),
            (t.prototype._invalidateBitmapSize = function () {
                var t, i
                if (null !== this._canvasElement) {
                    var n = kn(this._canvasElement)
                    if (null !== n) {
                        var s =
                                null !==
                                    (i =
                                        null ===
                                            (t =
                                                this
                                                    ._devicePixelRatioObservable) ||
                                        void 0 === t
                                            ? void 0
                                            : t.value) && void 0 !== i
                                    ? i
                                    : n.devicePixelRatio,
                            e = this._canvasElement.getClientRects(),
                            r =
                                void 0 !== e[0]
                                    ? (function (t, i) {
                                          return Mn({
                                              width:
                                                  Math.round(
                                                      t.left * i + t.width * i
                                                  ) - Math.round(t.left * i),
                                              height:
                                                  Math.round(
                                                      t.top * i + t.height * i
                                                  ) - Math.round(t.top * i),
                                          })
                                      })(e[0], s)
                                    : Mn({
                                          width:
                                              this._canvasElementClientSize
                                                  .width * s,
                                          height:
                                              this._canvasElementClientSize
                                                  .height * s,
                                      })
                        this._suggestNewBitmapSize(r)
                    }
                }
            }),
            (t.prototype._initResizeObserver = function () {
                var t = this
                null !== this._canvasElement &&
                    ((this._canvasElementResizeObserver = new ResizeObserver(
                        function (i) {
                            var n = i.find(function (i) {
                                return i.target === t._canvasElement
                            })
                            if (
                                n &&
                                n.devicePixelContentBoxSize &&
                                n.devicePixelContentBoxSize[0]
                            ) {
                                var s = n.devicePixelContentBoxSize[0],
                                    e = Mn({
                                        width: s.inlineSize,
                                        height: s.blockSize,
                                    })
                                t._suggestNewBitmapSize(e)
                            }
                        }
                    )),
                    this._canvasElementResizeObserver.observe(
                        this._canvasElement,
                        { box: "device-pixel-content-box" }
                    ))
            }),
            t
        )
    })()
    function kn(t) {
        return t.ownerDocument.defaultView
    }
    var Cn = (function () {
        function t(t, i, n) {
            if (0 === i.width || 0 === i.height)
                throw new TypeError(
                    "Rendering target could only be created on a media with positive width and height"
                )
            if (((this._mediaSize = i), 0 === n.width || 0 === n.height))
                throw new TypeError(
                    "Rendering target could only be created using a bitmap with positive integer width and height"
                )
            ;(this._bitmapSize = n), (this._context = t)
        }
        return (
            (t.prototype.useMediaCoordinateSpace = function (t) {
                try {
                    return (
                        this._context.save(),
                        this._context.setTransform(1, 0, 0, 1, 0, 0),
                        this._context.scale(
                            this._horizontalPixelRatio,
                            this._verticalPixelRatio
                        ),
                        t({
                            context: this._context,
                            mediaSize: this._mediaSize,
                        })
                    )
                } finally {
                    this._context.restore()
                }
            }),
            (t.prototype.useBitmapCoordinateSpace = function (t) {
                try {
                    return (
                        this._context.save(),
                        this._context.setTransform(1, 0, 0, 1, 0, 0),
                        t({
                            context: this._context,
                            mediaSize: this._mediaSize,
                            bitmapSize: this._bitmapSize,
                            horizontalPixelRatio: this._horizontalPixelRatio,
                            verticalPixelRatio: this._verticalPixelRatio,
                        })
                    )
                } finally {
                    this._context.restore()
                }
            }),
            Object.defineProperty(t.prototype, "_horizontalPixelRatio", {
                get: function () {
                    return this._bitmapSize.width / this._mediaSize.width
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(t.prototype, "_verticalPixelRatio", {
                get: function () {
                    return this._bitmapSize.height / this._mediaSize.height
                },
                enumerable: !1,
                configurable: !0,
            }),
            t
        )
    })()
    function Tn(t, i) {
        var n = t.canvasElementClientSize
        if (0 === n.width || 0 === n.height) return null
        var s = t.bitmapSize
        if (0 === s.width || 0 === s.height) return null
        var e = t.canvasElement.getContext("2d", i)
        return null === e ? null : new Cn(e, n, s)
    }
    const Pn = "undefined" != typeof window
    function Rn() {
        return (
            !!Pn &&
            window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1
        )
    }
    function Dn() {
        return !!Pn && /iPhone|iPad|iPod/.test(window.navigator.platform)
    }
    function On(t) {
        return t + (t % 2)
    }
    function Bn(t, i) {
        return t.ed - i.ed
    }
    function Ln(t, i, n) {
        const s = (t.ed - i.ed) / (t._t - i._t)
        return Math.sign(s) * Math.min(Math.abs(s), n)
    }
    class En {
        constructor(t, i, n, s) {
            ;(this.rd = null),
                (this.hd = null),
                (this.ld = null),
                (this.ad = null),
                (this.od = null),
                (this._d = 0),
                (this.ud = 0),
                (this.dd = t),
                (this.fd = i),
                (this.pd = n),
                (this.es = s)
        }
        vd(t, i) {
            if (null !== this.rd) {
                if (this.rd._t === i) return void (this.rd.ed = t)
                if (Math.abs(this.rd.ed - t) < this.es) return
            }
            ;(this.ad = this.ld),
                (this.ld = this.hd),
                (this.hd = this.rd),
                (this.rd = { _t: i, ed: t })
        }
        pr(t, i) {
            if (null === this.rd || null === this.hd) return
            if (i - this.rd._t > 50) return
            let n = 0
            const s = Ln(this.rd, this.hd, this.fd),
                e = Bn(this.rd, this.hd),
                r = [s],
                h = [e]
            if (((n += e), null !== this.ld)) {
                const t = Ln(this.hd, this.ld, this.fd)
                if (Math.sign(t) === Math.sign(s)) {
                    const i = Bn(this.hd, this.ld)
                    if ((r.push(t), h.push(i), (n += i), null !== this.ad)) {
                        const t = Ln(this.ld, this.ad, this.fd)
                        if (Math.sign(t) === Math.sign(s)) {
                            const i = Bn(this.ld, this.ad)
                            r.push(t), h.push(i), (n += i)
                        }
                    }
                }
            }
            let l = 0
            for (let t = 0; t < r.length; ++t) l += (h[t] / n) * r[t]
            Math.abs(l) < this.dd ||
                ((this.od = { ed: t, _t: i }),
                (this.ud = l),
                (this._d = (function (t, i) {
                    const n = Math.log(i)
                    return Math.log((1 * n) / -t) / n
                })(Math.abs(l), this.pd)))
        }
        Wu(t) {
            const i = h(this.od),
                n = t - i._t
            return (
                i.ed +
                (this.ud * (Math.pow(this.pd, n) - 1)) / Math.log(this.pd)
            )
        }
        Fu(t) {
            return null === this.od || this.md(t) === this._d
        }
        md(t) {
            const i = t - h(this.od)._t
            return Math.min(i, this._d)
        }
    }
    function zn(t, i) {
        const n = h(t.ownerDocument).createElement("canvas")
        t.appendChild(n)
        const s = (function (t, i) {
            if ("device-pixel-content-box" === i.type)
                return new yn(t, i.transform, i.options)
            throw new Error("Unsupported binding target")
        })(n, {
            type: "device-pixel-content-box",
            options: { allowResizeObserver: !1 },
            transform: (t, i) => ({
                width: Math.max(t.width, i.width),
                height: Math.max(t.height, i.height),
            }),
        })
        return s.resizeCanvasElement(i), s
    }
    function An(t) {
        Pn &&
            void 0 !== window.chrome &&
            t.addEventListener("mousedown", (t) => {
                if (1 === t.button) return t.preventDefault(), !1
            })
    }
    class In {
        constructor(t, i, n) {
            ;(this.bd = 0),
                (this.gd = null),
                (this.wd = {
                    st: Number.NEGATIVE_INFINITY,
                    et: Number.POSITIVE_INFINITY,
                }),
                (this.Md = 0),
                (this.xd = null),
                (this.Sd = {
                    st: Number.NEGATIVE_INFINITY,
                    et: Number.POSITIVE_INFINITY,
                }),
                (this.yd = null),
                (this.kd = !1),
                (this.Cd = null),
                (this.Td = null),
                (this.Pd = !1),
                (this.Rd = !1),
                (this.Dd = !1),
                (this.Od = null),
                (this.Bd = null),
                (this.Ld = null),
                (this.Ed = null),
                (this.zd = null),
                (this.Ad = null),
                (this.Id = null),
                (this.Vd = 0),
                (this.Nd = !1),
                (this.Fd = !1),
                (this.Wd = !1),
                (this.jd = 0),
                (this.$d = null),
                (this.Hd = !Dn()),
                (this.Ud = (t) => {
                    this.qd(t)
                }),
                (this.Yd = (t) => {
                    if (this.Xd(t)) {
                        const i = this.Zd(t)
                        if ((++this.Md, this.xd && this.Md > 1)) {
                            const { Kd: n } = this.Gd(Fn(t), this.Sd)
                            n < 30 && !this.Dd && this.Jd(i, this.tf.Qd),
                                this.if()
                        }
                    } else {
                        const i = this.Zd(t)
                        if ((++this.bd, this.gd && this.bd > 1)) {
                            const { Kd: n } = this.Gd(Fn(t), this.wd)
                            n < 5 && !this.Rd && this.nf(i, this.tf.sf),
                                this.ef()
                        }
                    }
                }),
                (this.rf = t),
                (this.tf = i),
                (this.un = n),
                this.hf()
        }
        M() {
            null !== this.Od && (this.Od(), (this.Od = null)),
                null !== this.Bd && (this.Bd(), (this.Bd = null)),
                null !== this.Ed && (this.Ed(), (this.Ed = null)),
                null !== this.zd && (this.zd(), (this.zd = null)),
                null !== this.Ad && (this.Ad(), (this.Ad = null)),
                null !== this.Ld && (this.Ld(), (this.Ld = null)),
                this.lf(),
                this.ef()
        }
        af(t) {
            this.Ed && this.Ed()
            const i = this._f.bind(this)
            if (
                ((this.Ed = () => {
                    this.rf.removeEventListener("mousemove", i)
                }),
                this.rf.addEventListener("mousemove", i),
                this.Xd(t))
            )
                return
            const n = this.Zd(t)
            this.nf(n, this.tf.uf), (this.Hd = !0)
        }
        ef() {
            null !== this.gd && clearTimeout(this.gd),
                (this.bd = 0),
                (this.gd = null),
                (this.wd = {
                    st: Number.NEGATIVE_INFINITY,
                    et: Number.POSITIVE_INFINITY,
                })
        }
        if() {
            null !== this.xd && clearTimeout(this.xd),
                (this.Md = 0),
                (this.xd = null),
                (this.Sd = {
                    st: Number.NEGATIVE_INFINITY,
                    et: Number.POSITIVE_INFINITY,
                })
        }
        _f(t) {
            if (this.Wd || null !== this.Td) return
            if (this.Xd(t)) return
            const i = this.Zd(t)
            this.nf(i, this.tf.cf), (this.Hd = !0)
        }
        df(t) {
            const i = jn(t.changedTouches, h(this.$d))
            if (null === i) return
            if (((this.jd = Wn(t)), null !== this.Id)) return
            if (this.Fd) return
            this.Nd = !0
            const n = this.Gd(Fn(i), h(this.Td)),
                { ff: s, pf: e, Kd: r } = n
            if (this.Pd || !(r < 5)) {
                if (!this.Pd) {
                    const t = 0.5 * s,
                        i = e >= t && !this.un.vf(),
                        n = t > e && !this.un.mf()
                    i || n || (this.Fd = !0),
                        (this.Pd = !0),
                        (this.Dd = !0),
                        this.lf(),
                        this.if()
                }
                if (!this.Fd) {
                    const n = this.Zd(t, i)
                    this.Jd(n, this.tf.bf), Nn(t)
                }
            }
        }
        gf(t) {
            if (0 !== t.button) return
            const i = this.Gd(Fn(t), h(this.Cd)),
                { Kd: n } = i
            if ((n >= 5 && ((this.Rd = !0), this.ef()), this.Rd)) {
                const i = this.Zd(t)
                this.nf(i, this.tf.wf)
            }
        }
        Gd(t, i) {
            const n = Math.abs(i.st - t.st),
                s = Math.abs(i.et - t.et)
            return { ff: n, pf: s, Kd: n + s }
        }
        Mf(t) {
            let i = jn(t.changedTouches, h(this.$d))
            if (
                (null === i &&
                    0 === t.touches.length &&
                    (i = t.changedTouches[0]),
                null === i)
            )
                return
            ;(this.$d = null),
                (this.jd = Wn(t)),
                this.lf(),
                (this.Td = null),
                this.Ad && (this.Ad(), (this.Ad = null))
            const n = this.Zd(t, i)
            if ((this.Jd(n, this.tf.xf), ++this.Md, this.xd && this.Md > 1)) {
                const { Kd: t } = this.Gd(Fn(i), this.Sd)
                t < 30 && !this.Dd && this.Jd(n, this.tf.Qd), this.if()
            } else this.Dd || (this.Jd(n, this.tf.Sf), this.tf.Sf && Nn(t))
            0 === this.Md && Nn(t),
                0 === t.touches.length && this.kd && ((this.kd = !1), Nn(t))
        }
        qd(t) {
            if (0 !== t.button) return
            const i = this.Zd(t)
            if (
                ((this.Cd = null),
                (this.Wd = !1),
                this.zd && (this.zd(), (this.zd = null)),
                Rn())
            ) {
                this.rf.ownerDocument.documentElement.removeEventListener(
                    "mouseleave",
                    this.Ud
                )
            }
            if (!this.Xd(t))
                if (
                    (this.nf(i, this.tf.yf), ++this.bd, this.gd && this.bd > 1)
                ) {
                    const { Kd: n } = this.Gd(Fn(t), this.wd)
                    n < 5 && !this.Rd && this.nf(i, this.tf.sf), this.ef()
                } else this.Rd || this.nf(i, this.tf.kf)
        }
        lf() {
            null !== this.yd && (clearTimeout(this.yd), (this.yd = null))
        }
        Cf(t) {
            if (null !== this.$d) return
            const i = t.changedTouches[0]
            ;(this.$d = i.identifier), (this.jd = Wn(t))
            const n = this.rf.ownerDocument.documentElement
            ;(this.Dd = !1),
                (this.Pd = !1),
                (this.Fd = !1),
                (this.Td = Fn(i)),
                this.Ad && (this.Ad(), (this.Ad = null))
            {
                const i = this.df.bind(this),
                    s = this.Mf.bind(this)
                ;(this.Ad = () => {
                    n.removeEventListener("touchmove", i),
                        n.removeEventListener("touchend", s)
                }),
                    n.addEventListener("touchmove", i, { passive: !1 }),
                    n.addEventListener("touchend", s, { passive: !1 }),
                    this.lf(),
                    (this.yd = setTimeout(this.Tf.bind(this, t), 240))
            }
            const s = this.Zd(t, i)
            this.Jd(s, this.tf.Pf),
                this.xd ||
                    ((this.Md = 0),
                    (this.xd = setTimeout(this.if.bind(this), 500)),
                    (this.Sd = Fn(i)))
        }
        Rf(t) {
            if (0 !== t.button) return
            const i = this.rf.ownerDocument.documentElement
            Rn() && i.addEventListener("mouseleave", this.Ud),
                (this.Rd = !1),
                (this.Cd = Fn(t)),
                this.zd && (this.zd(), (this.zd = null))
            {
                const t = this.gf.bind(this),
                    n = this.qd.bind(this)
                ;(this.zd = () => {
                    i.removeEventListener("mousemove", t),
                        i.removeEventListener("mouseup", n)
                }),
                    i.addEventListener("mousemove", t),
                    i.addEventListener("mouseup", n)
            }
            if (((this.Wd = !0), this.Xd(t))) return
            const n = this.Zd(t)
            this.nf(n, this.tf.Df),
                this.gd ||
                    ((this.bd = 0),
                    (this.gd = setTimeout(this.ef.bind(this), 500)),
                    (this.wd = Fn(t)))
        }
        hf() {
            this.rf.addEventListener("mouseenter", this.af.bind(this)),
                this.rf.addEventListener("touchcancel", this.lf.bind(this))
            {
                const t = this.rf.ownerDocument,
                    i = (t) => {
                        this.tf.Of &&
                            ((t.composed &&
                                this.rf.contains(t.composedPath()[0])) ||
                                (t.target && this.rf.contains(t.target)) ||
                                this.tf.Of())
                    }
                ;(this.Bd = () => {
                    t.removeEventListener("touchstart", i)
                }),
                    (this.Od = () => {
                        t.removeEventListener("mousedown", i)
                    }),
                    t.addEventListener("mousedown", i),
                    t.addEventListener("touchstart", i, { passive: !0 })
            }
            Dn() &&
                ((this.Ld = () => {
                    this.rf.removeEventListener("dblclick", this.Yd)
                }),
                this.rf.addEventListener("dblclick", this.Yd)),
                this.rf.addEventListener("mouseleave", this.Bf.bind(this)),
                this.rf.addEventListener("touchstart", this.Cf.bind(this), {
                    passive: !0,
                }),
                An(this.rf),
                this.rf.addEventListener("mousedown", this.Rf.bind(this)),
                this.Lf(),
                this.rf.addEventListener("touchmove", () => {}, { passive: !1 })
        }
        Lf() {
            ;(void 0 === this.tf.Ef &&
                void 0 === this.tf.zf &&
                void 0 === this.tf.Af) ||
                (this.rf.addEventListener(
                    "touchstart",
                    (t) => this.If(t.touches),
                    { passive: !0 }
                ),
                this.rf.addEventListener(
                    "touchmove",
                    (t) => {
                        if (
                            2 === t.touches.length &&
                            null !== this.Id &&
                            void 0 !== this.tf.zf
                        ) {
                            const i = Vn(t.touches[0], t.touches[1]) / this.Vd
                            this.tf.zf(this.Id, i), Nn(t)
                        }
                    },
                    { passive: !1 }
                ),
                this.rf.addEventListener("touchend", (t) => {
                    this.If(t.touches)
                }))
        }
        If(t) {
            1 === t.length && (this.Nd = !1),
                2 !== t.length || this.Nd || this.kd ? this.Vf() : this.Nf(t)
        }
        Nf(t) {
            const i = this.rf.getBoundingClientRect() || { left: 0, top: 0 }
            ;(this.Id = {
                st: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2,
                et: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2,
            }),
                (this.Vd = Vn(t[0], t[1])),
                void 0 !== this.tf.Ef && this.tf.Ef(),
                this.lf()
        }
        Vf() {
            null !== this.Id &&
                ((this.Id = null), void 0 !== this.tf.Af && this.tf.Af())
        }
        Bf(t) {
            if ((this.Ed && this.Ed(), this.Xd(t))) return
            if (!this.Hd) return
            const i = this.Zd(t)
            this.nf(i, this.tf.Ff), (this.Hd = !Dn())
        }
        Tf(t) {
            const i = jn(t.touches, h(this.$d))
            if (null === i) return
            const n = this.Zd(t, i)
            this.Jd(n, this.tf.Wf), (this.Dd = !0), (this.kd = !0)
        }
        Xd(t) {
            return t.sourceCapabilities &&
                void 0 !== t.sourceCapabilities.firesTouchEvents
                ? t.sourceCapabilities.firesTouchEvents
                : Wn(t) < this.jd + 500
        }
        Jd(t, i) {
            i && i.call(this.tf, t)
        }
        nf(t, i) {
            i && i.call(this.tf, t)
        }
        Zd(t, i) {
            const n = i || t,
                s = this.rf.getBoundingClientRect() || { left: 0, top: 0 }
            return {
                clientX: n.clientX,
                clientY: n.clientY,
                pageX: n.pageX,
                pageY: n.pageY,
                screenX: n.screenX,
                screenY: n.screenY,
                localX: n.clientX - s.left,
                localY: n.clientY - s.top,
                ctrlKey: t.ctrlKey,
                altKey: t.altKey,
                shiftKey: t.shiftKey,
                metaKey: t.metaKey,
                jf:
                    !t.type.startsWith("mouse") &&
                    "contextmenu" !== t.type &&
                    "click" !== t.type,
                $f: t.type,
                Hf: n.target,
                Uf: t.view,
                qf: () => {
                    "touchstart" !== t.type && Nn(t)
                },
            }
        }
    }
    function Vn(t, i) {
        const n = t.clientX - i.clientX,
            s = t.clientY - i.clientY
        return Math.sqrt(n * n + s * s)
    }
    function Nn(t) {
        t.cancelable && t.preventDefault()
    }
    function Fn(t) {
        return { st: t.pageX, et: t.pageY }
    }
    function Wn(t) {
        return t.timeStamp || performance.now()
    }
    function jn(t, i) {
        for (let n = 0; n < t.length; ++n)
            if (t[n].identifier === i) return t[n]
        return null
    }
    class $n {
        constructor(t, i, n, s) {
            ;(this.Ii = null),
                (this.Yf = null),
                (this.Xf = !1),
                (this.Zf = new Wt(200)),
                (this.Ir = null),
                (this.Kf = 0),
                (this.Gf = !1),
                (this.Jf = () => {
                    this.Gf || this.tn.Qf().Ut().Nh()
                }),
                (this.tp = () => {
                    this.Gf || this.tn.Qf().Ut().Nh()
                }),
                (this.tn = t),
                (this.un = i),
                (this.Ja = i.layout),
                (this.bc = n),
                (this.ip = "left" === s),
                (this.np = document.createElement("div")),
                (this.np.style.height = "100%"),
                (this.np.style.overflow = "hidden"),
                (this.np.style.width = "25px"),
                (this.np.style.left = "0"),
                (this.np.style.position = "relative"),
                (this.sp = zn(this.np, Mn({ width: 16, height: 16 }))),
                this.sp.subscribeSuggestedBitmapSizeChanged(this.Jf)
            const e = this.sp.canvasElement
            ;(e.style.position = "absolute"),
                (e.style.zIndex = "1"),
                (e.style.left = "0"),
                (e.style.top = "0"),
                (this.ep = zn(this.np, Mn({ width: 16, height: 16 }))),
                this.ep.subscribeSuggestedBitmapSizeChanged(this.tp)
            const r = this.ep.canvasElement
            ;(r.style.position = "absolute"),
                (r.style.zIndex = "2"),
                (r.style.left = "0"),
                (r.style.top = "0")
            const h = {
                Df: this.rp.bind(this),
                Pf: this.rp.bind(this),
                wf: this.hp.bind(this),
                bf: this.hp.bind(this),
                Of: this.lp.bind(this),
                yf: this.ap.bind(this),
                xf: this.ap.bind(this),
                sf: this.op.bind(this),
                Qd: this.op.bind(this),
                uf: this._p.bind(this),
                Ff: this.up.bind(this),
            }
            this.cp = new In(this.ep.canvasElement, h, {
                vf: () => !1,
                mf: () => !0,
            })
        }
        M() {
            this.cp.M(),
                this.ep.unsubscribeSuggestedBitmapSizeChanged(this.tp),
                this.ep.dispose(),
                this.sp.unsubscribeSuggestedBitmapSizeChanged(this.Jf),
                this.sp.dispose(),
                null !== this.Ii && this.Ii.Co().v(this),
                (this.Ii = null)
        }
        dp() {
            return this.np
        }
        T() {
            return this.Ja.fontSize
        }
        fp() {
            const t = this.bc.F()
            return this.Ir !== t.P && (this.Zf.Fe(), (this.Ir = t.P)), t
        }
        pp() {
            if (null === this.Ii) return 0
            let t = 0
            const i = this.fp(),
                n = h(this.sp.canvasElement.getContext("2d"))
            n.save()
            const s = this.Ii.ga()
            ;(n.font = this.vp()),
                s.length > 0 &&
                    (t = Math.max(
                        this.Zf.xi(n, s[0].Ba),
                        this.Zf.xi(n, s[s.length - 1].Ba)
                    ))
            const e = this.mp()
            for (let i = e.length; i--; ) {
                const s = this.Zf.xi(n, e[i].Gt())
                s > t && (t = s)
            }
            const r = this.Ii.Tt()
            if (null !== r && null !== this.Yf) {
                const i = this.Ii.pn(1, r),
                    s = this.Ii.pn(this.Yf.height - 2, r)
                t = Math.max(
                    t,
                    this.Zf.xi(
                        n,
                        this.Ii.Fi(
                            Math.floor(Math.min(i, s)) + 0.11111111111111,
                            r
                        )
                    ),
                    this.Zf.xi(
                        n,
                        this.Ii.Fi(
                            Math.ceil(Math.max(i, s)) - 0.11111111111111,
                            r
                        )
                    )
                )
            }
            n.restore()
            const l = t || 34
            return On(Math.ceil(i.k + i.C + i.L + i.A + 5 + l))
        }
        bp(t) {
            ;(null !== this.Yf && xn(this.Yf, t)) ||
                ((this.Yf = t),
                (this.Gf = !0),
                this.sp.resizeCanvasElement(t),
                this.ep.resizeCanvasElement(t),
                (this.Gf = !1),
                (this.np.style.width = `${t.width}px`),
                (this.np.style.height = `${t.height}px`))
        }
        gp() {
            return h(this.Yf).width
        }
        Gi(t) {
            this.Ii !== t &&
                (null !== this.Ii && this.Ii.Co().v(this),
                (this.Ii = t),
                t.Co().l(this.$a.bind(this), this))
        }
        Ot() {
            return this.Ii
        }
        Fe() {
            const t = this.tn.wp()
            this.tn.Qf().Ut().d_(t, h(this.Ot()))
        }
        Mp(t) {
            if (null === this.Yf) return
            if (1 !== t) {
                this.xp(), this.sp.applySuggestedBitmapSize()
                const t = Tn(this.sp)
                null !== t &&
                    (t.useBitmapCoordinateSpace((t) => {
                        this.Sp(t), this.ye(t)
                    }),
                    this.yp(t),
                    this.kp(t))
            }
            this.ep.applySuggestedBitmapSize()
            const i = Tn(this.ep)
            null !== i &&
                (i.useBitmapCoordinateSpace(({ context: t, bitmapSize: i }) => {
                    t.clearRect(0, 0, i.width, i.height)
                }),
                this.Cp(i))
        }
        Tp() {
            return this.sp.bitmapSize
        }
        Pp(t, i, n) {
            const s = this.Tp()
            s.width > 0 &&
                s.height > 0 &&
                t.drawImage(this.sp.canvasElement, i, n)
        }
        gt() {
            var t
            null === (t = this.Ii) || void 0 === t || t.ga()
        }
        rp(t) {
            if (
                null === this.Ii ||
                this.Ii.Ni() ||
                !this.un.handleScale.axisPressedMouseMove.price
            )
                return
            const i = this.tn.Qf().Ut(),
                n = this.tn.wp()
            ;(this.Xf = !0), i.h_(n, this.Ii, t.localY)
        }
        hp(t) {
            if (
                null === this.Ii ||
                !this.un.handleScale.axisPressedMouseMove.price
            )
                return
            const i = this.tn.Qf().Ut(),
                n = this.tn.wp(),
                s = this.Ii
            i.l_(n, s, t.localY)
        }
        lp() {
            if (
                null === this.Ii ||
                !this.un.handleScale.axisPressedMouseMove.price
            )
                return
            const t = this.tn.Qf().Ut(),
                i = this.tn.wp(),
                n = this.Ii
            this.Xf && ((this.Xf = !1), t.a_(i, n))
        }
        ap(t) {
            if (
                null === this.Ii ||
                !this.un.handleScale.axisPressedMouseMove.price
            )
                return
            const i = this.tn.Qf().Ut(),
                n = this.tn.wp()
            ;(this.Xf = !1), i.a_(n, this.Ii)
        }
        op(t) {
            this.un.handleScale.axisDoubleClickReset.price && this.Fe()
        }
        _p(t) {
            if (null === this.Ii) return
            !this.tn.Qf().Ut().F().handleScale.axisPressedMouseMove.price ||
                this.Ii.th() ||
                this.Ii.lo() ||
                this.Rp(1)
        }
        up(t) {
            this.Rp(0)
        }
        mp() {
            const t = [],
                i = null === this.Ii ? void 0 : this.Ii
            return (
                ((n) => {
                    for (let s = 0; s < n.length; ++s) {
                        const e = n[s].Pn(this.tn.wp(), i)
                        for (let i = 0; i < e.length; i++) t.push(e[i])
                    }
                })(this.tn.wp().Mo()),
                t
            )
        }
        Sp({ context: t, bitmapSize: i }) {
            const { width: n, height: s } = i,
                e = this.tn.wp().Ut(),
                r = e.U(),
                h = e.nd()
            r === h ? N(t, 0, 0, n, s, r) : $(t, 0, 0, n, s, r, h)
        }
        ye({ context: t, bitmapSize: i, horizontalPixelRatio: n }) {
            if (
                null === this.Yf ||
                null === this.Ii ||
                !this.Ii.F().borderVisible
            )
                return
            t.fillStyle = this.Ii.F().borderColor
            const s = Math.max(1, Math.floor(this.fp().k * n))
            let e
            ;(e = this.ip ? i.width - s : 0), t.fillRect(e, 0, s, i.height)
        }
        yp(t) {
            if (null === this.Yf || null === this.Ii) return
            const i = this.Ii.ga(),
                n = this.Ii.F(),
                s = this.fp(),
                e = this.ip ? this.Yf.width - s.C : 0
            n.borderVisible &&
                n.ticksVisible &&
                t.useBitmapCoordinateSpace(
                    ({
                        context: t,
                        horizontalPixelRatio: r,
                        verticalPixelRatio: h,
                    }) => {
                        t.fillStyle = n.borderColor
                        const l = Math.max(1, Math.floor(h)),
                            a = Math.floor(0.5 * h),
                            o = Math.round(s.C * r)
                        t.beginPath()
                        for (const n of i)
                            t.rect(
                                Math.floor(e * r),
                                Math.round(n.fa * h) - a,
                                o,
                                l
                            )
                        t.fill()
                    }
                ),
                t.useMediaCoordinateSpace(({ context: t }) => {
                    var r
                    ;(t.font = this.vp()),
                        (t.fillStyle =
                            null !== (r = n.textColor) && void 0 !== r
                                ? r
                                : this.Ja.textColor),
                        (t.textAlign = this.ip ? "right" : "left"),
                        (t.textBaseline = "middle")
                    const h = this.ip
                            ? Math.round(e - s.L)
                            : Math.round(e + s.C + s.L),
                        l = i.map((i) => this.Zf.Mi(t, i.Ba))
                    for (let n = i.length; n--; ) {
                        const s = i[n]
                        t.fillText(s.Ba, h, s.fa + l[n])
                    }
                })
        }
        xp() {
            if (null === this.Yf || null === this.Ii) return
            let t = this.Yf.height / 2
            const i = [],
                n = this.Ii.Mo().slice(),
                s = this.tn.wp(),
                e = this.fp()
            this.Ii === s.Je() &&
                this.tn
                    .wp()
                    .Mo()
                    .forEach((t) => {
                        s.Ge(t) && n.push(t)
                    })
            const r = this.Ii.oa()[0],
                h = this.Ii
            n.forEach((n) => {
                const e = n.Pn(s, h)
                e.forEach((t) => {
                    t.Bi(null), t.Li() && i.push(t)
                }),
                    r === n && e.length > 0 && (t = e[0].yi())
            }),
                i.forEach((t) => t.Bi(t.yi()))
            this.Ii.F().alignLabels && this.Dp(i, e, t)
        }
        Dp(t, i, n) {
            if (null === this.Yf) return
            const s = t.filter((t) => t.yi() <= n),
                e = t.filter((t) => t.yi() > n)
            s.sort((t, i) => i.yi() - t.yi()),
                s.length && e.length && e.push(s[0]),
                e.sort((t, i) => t.yi() - i.yi())
            for (const n of t) {
                const t = Math.floor(n.zt(i) / 2),
                    s = n.yi()
                s > -t && s < t && n.Bi(t),
                    s > this.Yf.height - t &&
                        s < this.Yf.height + t &&
                        n.Bi(this.Yf.height - t)
            }
            for (let t = 1; t < s.length; t++) {
                const n = s[t],
                    e = s[t - 1],
                    r = e.zt(i, !1),
                    h = n.yi(),
                    l = e.Oi()
                h > l - r && n.Bi(l - r)
            }
            for (let t = 1; t < e.length; t++) {
                const n = e[t],
                    s = e[t - 1],
                    r = s.zt(i, !0),
                    h = n.yi(),
                    l = s.Oi()
                h < l + r && n.Bi(l + r)
            }
        }
        kp(t) {
            if (null === this.Yf) return
            const i = this.mp(),
                n = this.fp(),
                s = this.ip ? "right" : "left"
            i.forEach((i) => {
                if (i.Ei()) {
                    i.Mt(h(this.Ii)).X(t, n, this.Zf, s)
                }
            })
        }
        Cp(t) {
            if (null === this.Yf || null === this.Ii) return
            const i = this.tn.Qf().Ut(),
                n = [],
                s = this.tn.wp(),
                e = i.Ec().Pn(s, this.Ii)
            e.length && n.push(e)
            const r = this.fp(),
                l = this.ip ? "right" : "left"
            n.forEach((i) => {
                i.forEach((i) => {
                    i.Mt(h(this.Ii)).X(t, r, this.Zf, l)
                })
            })
        }
        Rp(t) {
            this.np.style.cursor = 1 === t ? "ns-resize" : "default"
        }
        $a() {
            const t = this.pp()
            this.Kf < t && this.tn.Qf().Ut().Ll(), (this.Kf = t)
        }
        vp() {
            return T(this.Ja.fontSize, this.Ja.fontFamily)
        }
    }
    function Hn(t, i, n, s) {
        t.K && t.K(i, n, s)
    }
    function Un(t, i, n, s) {
        t.X(i, n, s)
    }
    function qn(t, i) {
        return t.Tn(i)
    }
    function Yn(t, i) {
        return t.Ji(i)
    }
    function Xn(t, i) {
        return void 0 !== t.Yl ? t.Yl(i) : []
    }
    class Zn {
        constructor(t, i) {
            ;(this.Yf = Mn({ width: 0, height: 0 })),
                (this.Op = null),
                (this.Bp = null),
                (this.Lp = null),
                (this.Ep = !1),
                (this.zp = new m()),
                (this.Ap = 0),
                (this.Ip = !1),
                (this.Vp = null),
                (this.Np = !1),
                (this.Fp = null),
                (this.Wp = null),
                (this.Gf = !1),
                (this.Jf = () => {
                    this.Gf || null === this.jp || this.Hi().Nh()
                }),
                (this.tp = () => {
                    this.Gf || null === this.jp || this.Hi().Nh()
                }),
                (this.$p = t),
                (this.jp = i),
                this.jp.v_().l(this.Hp.bind(this), this, !0),
                (this.Up = document.createElement("td")),
                (this.Up.style.padding = "0"),
                (this.Up.style.position = "relative")
            const n = document.createElement("div")
            ;(n.style.width = "100%"),
                (n.style.height = "100%"),
                (n.style.position = "relative"),
                (n.style.overflow = "hidden"),
                (this.qp = document.createElement("td")),
                (this.qp.style.padding = "0"),
                (this.Yp = document.createElement("td")),
                (this.Yp.style.padding = "0"),
                this.Up.appendChild(n),
                (this.sp = zn(n, Mn({ width: 16, height: 16 }))),
                this.sp.subscribeSuggestedBitmapSizeChanged(this.Jf)
            const s = this.sp.canvasElement
            ;(s.style.position = "absolute"),
                (s.style.zIndex = "1"),
                (s.style.left = "0"),
                (s.style.top = "0"),
                (this.ep = zn(n, Mn({ width: 16, height: 16 }))),
                this.ep.subscribeSuggestedBitmapSizeChanged(this.tp)
            const e = this.ep.canvasElement
            ;(e.style.position = "absolute"),
                (e.style.zIndex = "2"),
                (e.style.left = "0"),
                (e.style.top = "0"),
                (this.Xp = document.createElement("tr")),
                this.Xp.appendChild(this.qp),
                this.Xp.appendChild(this.Up),
                this.Xp.appendChild(this.Yp),
                this.Zp(),
                (this.cp = new In(this.ep.canvasElement, this, {
                    vf: () =>
                        null === this.Vp &&
                        !this.$p.F().handleScroll.vertTouchDrag,
                    mf: () =>
                        null === this.Vp &&
                        !this.$p.F().handleScroll.horzTouchDrag,
                }))
        }
        M() {
            null !== this.Op && this.Op.M(),
                null !== this.Bp && this.Bp.M(),
                this.ep.unsubscribeSuggestedBitmapSizeChanged(this.tp),
                this.ep.dispose(),
                this.sp.unsubscribeSuggestedBitmapSizeChanged(this.Jf),
                this.sp.dispose(),
                null !== this.jp && this.jp.v_().v(this),
                this.cp.M()
        }
        wp() {
            return h(this.jp)
        }
        Kp(t) {
            null !== this.jp && this.jp.v_().v(this),
                (this.jp = t),
                null !== this.jp &&
                    this.jp.v_().l(Zn.prototype.Hp.bind(this), this, !0),
                this.Zp()
        }
        Qf() {
            return this.$p
        }
        dp() {
            return this.Xp
        }
        Zp() {
            if (null !== this.jp && (this.Gp(), 0 !== this.Hi().wt().length)) {
                if (null !== this.Op) {
                    const t = this.jp.e_()
                    this.Op.Gi(h(t))
                }
                if (null !== this.Bp) {
                    const t = this.jp.r_()
                    this.Bp.Gi(h(t))
                }
            }
        }
        Jp() {
            null !== this.Op && this.Op.gt(), null !== this.Bp && this.Bp.gt()
        }
        Ko() {
            return null !== this.jp ? this.jp.Ko() : 0
        }
        Go(t) {
            this.jp && this.jp.Go(t)
        }
        uf(t) {
            if (!this.jp) return
            this.Qp()
            const i = t.localX,
                n = t.localY
            this.tv(i, n, t)
        }
        Df(t) {
            this.Qp(), this.iv(), this.tv(t.localX, t.localY, t)
        }
        cf(t) {
            if (!this.jp) return
            this.Qp()
            const i = t.localX,
                n = t.localY
            this.tv(i, n, t)
            const s = this.ir(i, n)
            this.Hi().Pc(s && { Rc: s.Rc, nv: s.nv })
        }
        kf(t) {
            null !== this.jp && (this.Qp(), this.sv(t))
        }
        wf(t) {
            this.Qp(), this.ev(t), this.tv(t.localX, t.localY, t)
        }
        yf(t) {
            null !== this.jp && (this.Qp(), (this.Ip = !1), this.rv(t))
        }
        Sf(t) {
            null !== this.jp && this.sv(t)
        }
        Wf(t) {
            if (((this.Ip = !0), null === this.Vp)) {
                const i = { x: t.localX, y: t.localY }
                this.hv(i, i, t)
            }
        }
        Ff(t) {
            null !== this.jp && (this.Qp(), this.jp.Ut().Pc(null), this.lv())
        }
        av() {
            return this.zp
        }
        Ef() {
            ;(this.Ap = 1), this.Hi().Hn()
        }
        zf(t, i) {
            if (!this.$p.F().handleScale.pinch) return
            const n = 5 * (i - this.Ap)
            ;(this.Ap = i), this.Hi().Nc(t.st, n)
        }
        Pf(t) {
            if (
                ((this.Ip = !1),
                (this.Np = null !== this.Vp),
                this.iv(),
                null !== this.Vp)
            ) {
                const i = this.Hi().Ec()
                ;(this.Fp = { x: i.Xt(), y: i.Zt() }),
                    (this.Vp = { x: t.localX, y: t.localY })
            }
        }
        bf(t) {
            if (null === this.jp) return
            const i = t.localX,
                n = t.localY
            if (null === this.Vp) this.ev(t)
            else {
                this.Np = !1
                const s = h(this.Fp),
                    e = s.x + (i - this.Vp.x),
                    r = s.y + (n - this.Vp.y)
                this.tv(e, r, t)
            }
        }
        xf(t) {
            0 === this.Qf().F().trackingMode.exitMode && (this.Np = !0),
                this.ov(),
                this.rv(t)
        }
        ir(t, i) {
            const n = this.jp
            if (null === n) return null
            const s = n.Mo()
            for (const e of s) {
                const s = this._v(e.Tn(n), t, i)
                if (null !== s) return { Rc: e, Uf: s.Uf, nv: s.nv }
            }
            return null
        }
        uv(t, i) {
            h("left" === i ? this.Op : this.Bp).bp(
                Mn({ width: t, height: this.Yf.height })
            )
        }
        cv() {
            return this.Yf
        }
        bp(t) {
            xn(this.Yf, t) ||
                ((this.Yf = t),
                (this.Gf = !0),
                this.sp.resizeCanvasElement(t),
                this.ep.resizeCanvasElement(t),
                (this.Gf = !1),
                (this.Up.style.width = t.width + "px"),
                (this.Up.style.height = t.height + "px"))
        }
        dv() {
            const t = h(this.jp)
            t.s_(t.e_()), t.s_(t.r_())
            for (const i of t.oa())
                if (t.Ge(i)) {
                    const n = i.Ot()
                    null !== n && t.s_(n), i.Dn()
                }
        }
        Tp() {
            return this.sp.bitmapSize
        }
        Pp(t, i, n) {
            const s = this.Tp()
            s.width > 0 &&
                s.height > 0 &&
                t.drawImage(this.sp.canvasElement, i, n)
        }
        Mp(t) {
            if (0 === t) return
            if (null === this.jp) return
            if (
                (t > 1 && this.dv(),
                null !== this.Op && this.Op.Mp(t),
                null !== this.Bp && this.Bp.Mp(t),
                1 !== t)
            ) {
                this.sp.applySuggestedBitmapSize()
                const t = Tn(this.sp)
                null !== t &&
                    (t.useBitmapCoordinateSpace((t) => {
                        this.Sp(t)
                    }),
                    this.jp &&
                        (this.fv(t),
                        this.pv(t),
                        this.vv(t, qn),
                        this.vv(t, Yn)))
            }
            this.ep.applySuggestedBitmapSize()
            const i = Tn(this.ep)
            null !== i &&
                (i.useBitmapCoordinateSpace(({ context: t, bitmapSize: i }) => {
                    t.clearRect(0, 0, i.width, i.height)
                }),
                this.vv(i, Xn),
                this.mv(i))
        }
        bv() {
            return this.Op
        }
        gv() {
            return this.Bp
        }
        Hp() {
            null !== this.jp && this.jp.v_().v(this), (this.jp = null)
        }
        sv(t) {
            const i = t.localX,
                n = t.localY
            this.zp.g() && this.zp.m(this.Hi().yt().ku(i), { x: i, y: n }, t)
        }
        Sp({ context: t, bitmapSize: i }) {
            const { width: n, height: s } = i,
                e = this.Hi(),
                r = e.U(),
                h = e.nd()
            r === h ? N(t, 0, 0, n, s, h) : $(t, 0, 0, n, s, r, h)
        }
        fv(t) {
            const i = h(this.jp).m_().Fh().Mt()
            null !== i && i.X(t, !1)
        }
        pv(t) {
            const i = this.Hi().Lc()
            this.wv(t, qn, Hn, i), this.wv(t, qn, Un, i)
        }
        mv(t) {
            this.wv(t, qn, Un, this.Hi().Ec())
        }
        vv(t, i) {
            const n = h(this.jp).Mo()
            for (const s of n) this.wv(t, i, Hn, s)
            for (const s of n) this.wv(t, i, Un, s)
        }
        wv(t, i, n, s) {
            const e = h(this.jp),
                r = i(s, e),
                l = e.Ut().Tc(),
                a = null !== l && l.Rc === s,
                o = null !== l && a && void 0 !== l.nv ? l.nv.sr : void 0
            for (const i of r) {
                const s = i.Mt()
                null !== s && n(s, t, a, o)
            }
        }
        _v(t, i, n) {
            for (const s of t) {
                const t = s.Mt()
                if (null !== t && t.ir) {
                    const e = t.ir(i, n)
                    if (null !== e) return { Uf: s, nv: e }
                }
            }
            return null
        }
        Gp() {
            if (null === this.jp) return
            const t = this.$p,
                i = this.jp.e_().F().visible,
                n = this.jp.r_().F().visible
            i ||
                null === this.Op ||
                (this.qp.removeChild(this.Op.dp()),
                this.Op.M(),
                (this.Op = null)),
                n ||
                    null === this.Bp ||
                    (this.Yp.removeChild(this.Bp.dp()),
                    this.Bp.M(),
                    (this.Bp = null))
            const s = t.Ut().Zc()
            i &&
                null === this.Op &&
                ((this.Op = new $n(this, t.F(), s, "left")),
                this.qp.appendChild(this.Op.dp())),
                n &&
                    null === this.Bp &&
                    ((this.Bp = new $n(this, t.F(), s, "right")),
                    this.Yp.appendChild(this.Bp.dp()))
        }
        Mv(t) {
            return (t.jf && this.Ip) || null !== this.Vp
        }
        xv(t) {
            return Math.max(0, Math.min(t, this.Yf.width - 1))
        }
        Sv(t) {
            return Math.max(0, Math.min(t, this.Yf.height - 1))
        }
        tv(t, i, n) {
            this.Hi().qc(this.xv(t), this.Sv(i), n, h(this.jp))
        }
        lv() {
            this.Hi().Yc()
        }
        ov() {
            this.Np && ((this.Vp = null), this.lv())
        }
        hv(t, i, n) {
            ;(this.Vp = t), (this.Np = !1), this.tv(i.x, i.y, n)
            const s = this.Hi().Ec()
            this.Fp = { x: s.Xt(), y: s.Zt() }
        }
        Hi() {
            return this.$p.Ut()
        }
        rv(t) {
            if (!this.Ep) return
            const i = this.Hi(),
                n = this.wp()
            if (
                (i.u_(n, n.fn()),
                (this.Lp = null),
                (this.Ep = !1),
                i.$c(),
                null !== this.Wp)
            ) {
                const t = performance.now(),
                    n = i.yt()
                this.Wp.pr(n.Ru(), t), this.Wp.Fu(t) || i.Yn(this.Wp)
            }
        }
        Qp() {
            this.Vp = null
        }
        iv() {
            if (!this.jp) return
            if (
                (this.Hi().Hn(),
                document.activeElement !== document.body &&
                    document.activeElement !== document.documentElement)
            )
                h(document.activeElement).blur()
            else {
                const t = document.getSelection()
                null !== t && t.removeAllRanges()
            }
            !this.jp.fn().Ni() && this.Hi().yt().Ni()
        }
        ev(t) {
            if (null === this.jp) return
            const i = this.Hi(),
                n = i.yt()
            if (n.Ni()) return
            const s = this.$p.F(),
                e = s.handleScroll,
                r = s.kineticScroll
            if (
                (!e.pressedMouseMove || t.jf) &&
                ((!e.horzTouchDrag && !e.vertTouchDrag) || !t.jf)
            )
                return
            const h = this.jp.fn(),
                l = performance.now()
            if (
                (null !== this.Lp ||
                    this.Mv(t) ||
                    (this.Lp = {
                        x: t.clientX,
                        y: t.clientY,
                        jh: l,
                        yv: t.localX,
                        kv: t.localY,
                    }),
                null !== this.Lp &&
                    !this.Ep &&
                    (this.Lp.x !== t.clientX || this.Lp.y !== t.clientY))
            ) {
                if ((t.jf && r.touch) || (!t.jf && r.mouse)) {
                    const t = n.Ks()
                    ;(this.Wp = new En(0.2 / t, 7 / t, 0.997, 15 / t)),
                        this.Wp.vd(n.Ru(), this.Lp.jh)
                } else this.Wp = null
                h.Ni() || i.o_(this.jp, h, t.localY),
                    i.Wc(t.localX),
                    (this.Ep = !0)
            }
            this.Ep &&
                (h.Ni() || i.__(this.jp, h, t.localY),
                i.jc(t.localX),
                null !== this.Wp && this.Wp.vd(n.Ru(), l))
        }
    }
    class Kn {
        constructor(t, i, n, s, e) {
            ;(this.vt = !0),
                (this.Yf = Mn({ width: 0, height: 0 })),
                (this.Jf = () => this.Mp(3)),
                (this.ip = "left" === t),
                (this.bc = n.Zc),
                (this.un = i),
                (this.Cv = s),
                (this.Tv = e),
                (this.np = document.createElement("div")),
                (this.np.style.width = "25px"),
                (this.np.style.height = "100%"),
                (this.np.style.overflow = "hidden"),
                (this.sp = zn(this.np, Mn({ width: 16, height: 16 }))),
                this.sp.subscribeSuggestedBitmapSizeChanged(this.Jf)
        }
        M() {
            this.sp.unsubscribeSuggestedBitmapSizeChanged(this.Jf),
                this.sp.dispose()
        }
        dp() {
            return this.np
        }
        cv() {
            return this.Yf
        }
        bp(t) {
            xn(this.Yf, t) ||
                ((this.Yf = t),
                this.sp.resizeCanvasElement(t),
                (this.np.style.width = `${t.width}px`),
                (this.np.style.height = `${t.height}px`),
                (this.vt = !0))
        }
        Mp(t) {
            if (t < 3 && !this.vt) return
            if (0 === this.Yf.width || 0 === this.Yf.height) return
            ;(this.vt = !1), this.sp.applySuggestedBitmapSize()
            const i = Tn(this.sp)
            null !== i &&
                i.useBitmapCoordinateSpace((t) => {
                    this.Sp(t), this.ye(t)
                })
        }
        Tp() {
            return this.sp.bitmapSize
        }
        Pp(t, i, n) {
            const s = this.Tp()
            s.width > 0 &&
                s.height > 0 &&
                t.drawImage(this.sp.canvasElement, i, n)
        }
        ye({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: n,
            verticalPixelRatio: s,
        }) {
            if (!this.Cv()) return
            t.fillStyle = this.un.timeScale.borderColor
            const e = Math.floor(this.bc.F().k * n),
                r = Math.floor(this.bc.F().k * s),
                h = this.ip ? i.width - e : 0
            t.fillRect(h, 0, e, r)
        }
        Sp({ context: t, bitmapSize: i }) {
            N(t, 0, 0, i.width, i.height, this.Tv())
        }
    }
    function Gn(t, i) {
        return t.F_ > i.F_ ? t : i
    }
    class Jn {
        constructor(t) {
            ;(this.Pv = null),
                (this.Rv = null),
                (this.S = null),
                (this.Dv = !1),
                (this.Yf = Mn({ width: 0, height: 0 })),
                (this.Ov = new m()),
                (this.Zf = new Wt(5)),
                (this.Gf = !1),
                (this.Jf = () => {
                    this.Gf || this.$p.Ut().Nh()
                }),
                (this.tp = () => {
                    this.Gf || this.$p.Ut().Nh()
                }),
                (this.$p = t),
                (this.un = t.F().layout),
                (this.Bv = document.createElement("tr")),
                (this.Lv = document.createElement("td")),
                (this.Lv.style.padding = "0"),
                (this.Ev = document.createElement("td")),
                (this.Ev.style.padding = "0"),
                (this.np = document.createElement("td")),
                (this.np.style.height = "25px"),
                (this.np.style.padding = "0"),
                (this.zv = document.createElement("div")),
                (this.zv.style.width = "100%"),
                (this.zv.style.height = "100%"),
                (this.zv.style.position = "relative"),
                (this.zv.style.overflow = "hidden"),
                this.np.appendChild(this.zv),
                (this.sp = zn(this.zv, Mn({ width: 16, height: 16 }))),
                this.sp.subscribeSuggestedBitmapSizeChanged(this.Jf)
            const i = this.sp.canvasElement
            ;(i.style.position = "absolute"),
                (i.style.zIndex = "1"),
                (i.style.left = "0"),
                (i.style.top = "0"),
                (this.ep = zn(this.zv, Mn({ width: 16, height: 16 }))),
                this.ep.subscribeSuggestedBitmapSizeChanged(this.tp)
            const n = this.ep.canvasElement
            ;(n.style.position = "absolute"),
                (n.style.zIndex = "2"),
                (n.style.left = "0"),
                (n.style.top = "0"),
                this.Bv.appendChild(this.Lv),
                this.Bv.appendChild(this.np),
                this.Bv.appendChild(this.Ev),
                this.Av(),
                this.$p.Ut().Zo().l(this.Av.bind(this), this),
                (this.cp = new In(this.ep.canvasElement, this, {
                    vf: () => !0,
                    mf: () => !1,
                }))
        }
        M() {
            this.cp.M(),
                null !== this.Pv && this.Pv.M(),
                null !== this.Rv && this.Rv.M(),
                this.ep.unsubscribeSuggestedBitmapSizeChanged(this.tp),
                this.ep.dispose(),
                this.sp.unsubscribeSuggestedBitmapSizeChanged(this.Jf),
                this.sp.dispose()
        }
        dp() {
            return this.Bv
        }
        Iv() {
            return this.Pv
        }
        Vv() {
            return this.Rv
        }
        Df(t) {
            if (this.Dv) return
            this.Dv = !0
            const i = this.$p.Ut()
            !i.yt().Ni() &&
                this.$p.F().handleScale.axisPressedMouseMove.time &&
                i.Vc(t.localX)
        }
        Pf(t) {
            this.Df(t)
        }
        Of() {
            const t = this.$p.Ut()
            !t.yt().Ni() &&
                this.Dv &&
                ((this.Dv = !1),
                this.$p.F().handleScale.axisPressedMouseMove.time && t.Uc())
        }
        wf(t) {
            const i = this.$p.Ut()
            !i.yt().Ni() &&
                this.$p.F().handleScale.axisPressedMouseMove.time &&
                i.Hc(t.localX)
        }
        bf(t) {
            this.wf(t)
        }
        yf() {
            this.Dv = !1
            const t = this.$p.Ut()
            ;(t.yt().Ni() &&
                !this.$p.F().handleScale.axisPressedMouseMove.time) ||
                t.Uc()
        }
        xf() {
            this.yf()
        }
        sf() {
            this.$p.F().handleScale.axisDoubleClickReset.time &&
                this.$p.Ut().Zn()
        }
        Qd() {
            this.sf()
        }
        uf() {
            this.$p.Ut().F().handleScale.axisPressedMouseMove.time && this.Rp(1)
        }
        Ff() {
            this.Rp(0)
        }
        cv() {
            return this.Yf
        }
        Nv() {
            return this.Ov
        }
        Fv(t, i, n) {
            xn(this.Yf, t) ||
                ((this.Yf = t),
                (this.Gf = !0),
                this.sp.resizeCanvasElement(t),
                this.ep.resizeCanvasElement(t),
                (this.Gf = !1),
                (this.np.style.width = `${t.width}px`),
                (this.np.style.height = `${t.height}px`),
                this.Ov.m(t)),
                null !== this.Pv &&
                    this.Pv.bp(Mn({ width: i, height: t.height })),
                null !== this.Rv &&
                    this.Rv.bp(Mn({ width: n, height: t.height }))
        }
        Wv() {
            const t = this.jv()
            return Math.ceil(t.k + t.C + t.T + t.I + t.B + t.$v)
        }
        gt() {
            this.$p.Ut().yt().ga()
        }
        Tp() {
            return this.sp.bitmapSize
        }
        Pp(t, i, n) {
            const s = this.Tp()
            s.width > 0 &&
                s.height > 0 &&
                t.drawImage(this.sp.canvasElement, i, n)
        }
        Mp(t) {
            if (0 === t) return
            if (1 !== t) {
                this.sp.applySuggestedBitmapSize()
                const i = Tn(this.sp)
                null !== i &&
                    (i.useBitmapCoordinateSpace((t) => {
                        this.Sp(t), this.ye(t)
                    }),
                    this.yp(i)),
                    null !== this.Pv && this.Pv.Mp(t),
                    null !== this.Rv && this.Rv.Mp(t)
            }
            this.ep.applySuggestedBitmapSize()
            const i = Tn(this.ep)
            null !== i &&
                (i.useBitmapCoordinateSpace(({ context: t, bitmapSize: i }) => {
                    t.clearRect(0, 0, i.width, i.height)
                }),
                this.Hv([this.$p.Ut().Ec()], i))
        }
        Sp({ context: t, bitmapSize: i }) {
            N(t, 0, 0, i.width, i.height, this.$p.Ut().nd())
        }
        ye({ context: t, bitmapSize: i, verticalPixelRatio: n }) {
            if (this.$p.F().timeScale.borderVisible) {
                t.fillStyle = this.Uv()
                const s = Math.max(1, Math.floor(this.jv().k * n))
                t.fillRect(0, 0, i.width, s)
            }
        }
        yp(t) {
            const i = this.$p.Ut().yt(),
                n = i.ga()
            if (!n || 0 === n.length) return
            let s = n.reduce(Gn, n[0]).F_
            s > 30 && s < 50 && (s = 30)
            const e = this.jv(),
                r = i.F()
            r.borderVisible &&
                r.ticksVisible &&
                t.useBitmapCoordinateSpace(
                    ({
                        context: t,
                        horizontalPixelRatio: i,
                        verticalPixelRatio: s,
                    }) => {
                        ;(t.strokeStyle = this.Uv()), (t.fillStyle = this.Uv())
                        const r = Math.max(1, Math.floor(i)),
                            h = Math.floor(0.5 * i)
                        t.beginPath()
                        const l = Math.round(e.C * s)
                        for (let s = n.length; s--; ) {
                            const e = Math.round(n[s].fa * i)
                            t.rect(e - h, 0, r, l)
                        }
                        t.fill()
                    }
                ),
                t.useMediaCoordinateSpace(({ context: t }) => {
                    const i = e.k + e.C + e.I + e.T / 2
                    ;(t.textAlign = "center"),
                        (t.textBaseline = "middle"),
                        (t.fillStyle = this.$()),
                        (t.font = this.vp())
                    for (const e of n)
                        if (e.F_ < s) {
                            const n = e.Bu ? this.qv(t, e.fa, e.Ba) : e.fa
                            t.fillText(e.Ba, n, i)
                        }
                    t.font = this.Yv()
                    for (const e of n)
                        if (e.F_ >= s) {
                            const n = e.Bu ? this.qv(t, e.fa, e.Ba) : e.fa
                            t.fillText(e.Ba, n, i)
                        }
                })
        }
        qv(t, i, n) {
            const s = this.Zf.xi(t, n),
                e = s / 2,
                r = Math.floor(i - e) + 0.5
            return (
                r < 0
                    ? (i += Math.abs(0 - r))
                    : r + s > this.Yf.width &&
                      (i -= Math.abs(this.Yf.width - (r + s))),
                i
            )
        }
        Hv(t, i) {
            const n = this.jv()
            for (const s of t) for (const t of s.Qi()) t.Mt().X(i, n)
        }
        Uv() {
            return this.$p.F().timeScale.borderColor
        }
        $() {
            return this.un.textColor
        }
        W() {
            return this.un.fontSize
        }
        vp() {
            return T(this.W(), this.un.fontFamily)
        }
        Yv() {
            return T(this.W(), this.un.fontFamily, "bold")
        }
        jv() {
            null === this.S &&
                (this.S = {
                    k: 1,
                    V: NaN,
                    I: NaN,
                    B: NaN,
                    ji: NaN,
                    C: 5,
                    T: NaN,
                    P: "",
                    Wi: new Wt(),
                    $v: 0,
                })
            const t = this.S,
                i = this.vp()
            if (t.P !== i) {
                const n = this.W()
                ;(t.T = n),
                    (t.P = i),
                    (t.I = (3 * n) / 12),
                    (t.B = (3 * n) / 12),
                    (t.ji = (9 * n) / 12),
                    (t.V = 0),
                    (t.$v = (4 * n) / 12),
                    t.Wi.Fe()
            }
            return this.S
        }
        Rp(t) {
            this.np.style.cursor = 1 === t ? "ew-resize" : "default"
        }
        Av() {
            const t = this.$p.Ut(),
                i = t.F()
            i.leftPriceScale.visible ||
                null === this.Pv ||
                (this.Lv.removeChild(this.Pv.dp()),
                this.Pv.M(),
                (this.Pv = null)),
                i.rightPriceScale.visible ||
                    null === this.Rv ||
                    (this.Ev.removeChild(this.Rv.dp()),
                    this.Rv.M(),
                    (this.Rv = null))
            const n = { Zc: this.$p.Ut().Zc() },
                s = () =>
                    i.leftPriceScale.borderVisible && t.yt().F().borderVisible,
                e = () => t.nd()
            i.leftPriceScale.visible &&
                null === this.Pv &&
                ((this.Pv = new Kn("left", i, n, s, e)),
                this.Lv.appendChild(this.Pv.dp())),
                i.rightPriceScale.visible &&
                    null === this.Rv &&
                    ((this.Rv = new Kn("right", i, n, s, e)),
                    this.Ev.appendChild(this.Rv.dp()))
        }
    }
    const Qn =
        !!Pn &&
        !!navigator.userAgentData &&
        navigator.userAgentData.brands.some((t) =>
            t.brand.includes("Chromium")
        ) &&
        !!Pn &&
        ((
            null ===
                (ts =
                    null === navigator || void 0 === navigator
                        ? void 0
                        : navigator.userAgentData) || void 0 === ts
                ? void 0
                : ts.platform
        )
            ? "Windows" === navigator.userAgentData.platform
            : navigator.userAgent.toLowerCase().indexOf("win") >= 0)
    var ts
    class is {
        constructor(t, i) {
            var n
            ;(this.Xv = []),
                (this.Zv = 0),
                (this.za = 0),
                (this.Vo = 0),
                (this.Kv = 0),
                (this.Gv = 0),
                (this.Jv = null),
                (this.Qv = !1),
                (this.zp = new m()),
                (this.fc = new m()),
                (this.tm = null),
                (this.im = t),
                (this.un = i),
                (this.Bv = document.createElement("div")),
                this.Bv.classList.add("tv-lightweight-charts"),
                (this.Bv.style.overflow = "hidden"),
                (this.Bv.style.width = "100%"),
                (this.Bv.style.height = "100%"),
                ((n = this.Bv).style.userSelect = "none"),
                (n.style.webkitUserSelect = "none"),
                (n.style.msUserSelect = "none"),
                (n.style.MozUserSelect = "none"),
                (n.style.webkitTapHighlightColor = "transparent"),
                (this.nm = document.createElement("table")),
                this.nm.setAttribute("cellspacing", "0"),
                this.Bv.appendChild(this.nm),
                (this.sm = this.rm.bind(this)),
                ns(this.un) && this.hm(!0),
                (this.Hi = new bn(this.mc.bind(this), this.un)),
                this.Ut().zc().l(this.lm.bind(this), this),
                (this.am = new Jn(this)),
                this.nm.appendChild(this.am.dp())
            const s = i.autoSize && this.om()
            let e = this.un.width,
                r = this.un.height
            if (s || 0 === e || 0 === r) {
                const i = t.getBoundingClientRect()
                ;(e = e || i.width), (r = r || i.height)
            }
            this._m(e, r),
                this.um(),
                t.appendChild(this.Bv),
                this.dm(),
                this.Hi.yt().Hu().l(this.Hi.Ll.bind(this.Hi), this),
                this.Hi.Zo().l(this.Hi.Ll.bind(this.Hi), this)
        }
        Ut() {
            return this.Hi
        }
        F() {
            return this.un
        }
        fm() {
            return this.Xv
        }
        pm() {
            return this.am
        }
        M() {
            this.hm(!1),
                0 !== this.Zv && window.cancelAnimationFrame(this.Zv),
                this.Hi.zc().v(this),
                this.Hi.yt().Hu().v(this),
                this.Hi.Zo().v(this),
                this.Hi.M()
            for (const t of this.Xv)
                this.nm.removeChild(t.dp()), t.av().v(this), t.M()
            ;(this.Xv = []),
                h(this.am).M(),
                null !== this.Bv.parentElement &&
                    this.Bv.parentElement.removeChild(this.Bv),
                this.fc.M(),
                this.zp.M(),
                this.vm()
        }
        _m(t, i, n = !1) {
            if (this.za === i && this.Vo === t) return
            const s = (function (t) {
                const i = Math.floor(t.width),
                    n = Math.floor(t.height)
                return Mn({ width: i - (i % 2), height: n - (n % 2) })
            })(Mn({ width: t, height: i }))
            ;(this.za = s.height), (this.Vo = s.width)
            const e = this.za + "px",
                r = this.Vo + "px"
            ;(h(this.Bv).style.height = e),
                (h(this.Bv).style.width = r),
                (this.nm.style.height = e),
                (this.nm.style.width = r),
                n ? this.bm(tt.ss(), performance.now()) : this.Hi.Ll()
        }
        Mp(t) {
            void 0 === t && (t = tt.ss())
            for (let i = 0; i < this.Xv.length; i++) this.Xv[i].Mp(t.jn(i).Nn)
            this.un.timeScale.visible && this.am.Mp(t.Wn())
        }
        Vh(t) {
            const i = ns(this.un)
            this.Hi.Vh(t)
            const n = ns(this.un)
            n !== i && this.hm(n), this.dm(), this.gm(t)
        }
        av() {
            return this.zp
        }
        zc() {
            return this.fc
        }
        wm() {
            null !== this.Jv &&
                (this.bm(this.Jv, performance.now()), (this.Jv = null))
            const t = this.Mm(null),
                i = document.createElement("canvas")
            ;(i.width = t.width), (i.height = t.height)
            const n = h(i.getContext("2d"))
            return this.Mm(n), i
        }
        xm(t) {
            if ("left" === t && !this.Sm()) return 0
            if ("right" === t && !this.ym()) return 0
            if (0 === this.Xv.length) return 0
            return h("left" === t ? this.Xv[0].bv() : this.Xv[0].gv()).gp()
        }
        km() {
            return this.un.autoSize && null !== this.tm
        }
        gm(t) {
            ;(void 0 !== t.autoSize ||
                !this.tm ||
                (void 0 === t.width && void 0 === t.height)) &&
                (t.autoSize && !this.tm && this.om(),
                !1 === t.autoSize && null !== this.tm && this.vm(),
                t.autoSize ||
                    (void 0 === t.width && void 0 === t.height) ||
                    this._m(t.width || this.Vo, t.height || this.za))
        }
        Mm(t) {
            let i = 0,
                n = 0
            const s = this.Xv[0],
                e = (i, n) => {
                    let s = 0
                    for (let e = 0; e < this.Xv.length; e++) {
                        const r = this.Xv[e],
                            l = h("left" === i ? r.bv() : r.gv()),
                            a = l.Tp()
                        null !== t && l.Pp(t, n, s), (s += a.height)
                    }
                }
            if (this.Sm()) {
                e("left", 0)
                i += h(s.bv()).Tp().width
            }
            for (let s = 0; s < this.Xv.length; s++) {
                const e = this.Xv[s],
                    r = e.Tp()
                null !== t && e.Pp(t, i, n), (n += r.height)
            }
            if (((i += s.Tp().width), this.ym())) {
                e("right", i)
                i += h(s.gv()).Tp().width
            }
            const r = (i, n, s) => {
                h("left" === i ? this.am.Iv() : this.am.Vv()).Pp(h(t), n, s)
            }
            if (this.un.timeScale.visible) {
                const i = this.am.Tp()
                if (null !== t) {
                    let e = 0
                    this.Sm() && (r("left", e, n), (e = h(s.bv()).Tp().width)),
                        this.am.Pp(t, e, n),
                        (e += i.width),
                        this.ym() && r("right", e, n)
                }
                n += i.height
            }
            return Mn({ width: i, height: n })
        }
        Cm() {
            let t = 0,
                i = 0,
                n = 0
            for (const s of this.Xv)
                this.Sm() && (i = Math.max(i, h(s.bv()).pp())),
                    this.ym() && (n = Math.max(n, h(s.gv()).pp())),
                    (t += s.Ko())
            ;(i = On(i)), (n = On(n))
            const s = this.Vo,
                e = this.za,
                r = Math.max(s - i - n, 0),
                l = this.un.timeScale.visible
            let a = l ? this.am.Wv() : 0
            var o
            a = (o = a) + (o % 2)
            const _ = 0 + a,
                u = e < _ ? 0 : e - _,
                c = u / t
            let d = 0
            for (let t = 0; t < this.Xv.length; ++t) {
                const s = this.Xv[t]
                s.Kp(this.Hi.Bc()[t])
                let e = 0,
                    h = 0
                ;(h =
                    t === this.Xv.length - 1 ? u - d : Math.round(s.Ko() * c)),
                    (e = Math.max(h, 2)),
                    (d += e),
                    s.bp(Mn({ width: r, height: e })),
                    this.Sm() && s.uv(i, "left"),
                    this.ym() && s.uv(n, "right"),
                    s.wp() && this.Hi.Ac(s.wp(), e)
            }
            this.am.Fv(
                Mn({ width: l ? r : 0, height: a }),
                l ? i : 0,
                l ? n : 0
            ),
                this.Hi.Jo(r),
                this.Kv !== i && (this.Kv = i),
                this.Gv !== n && (this.Gv = n)
        }
        hm(t) {
            t
                ? this.Bv.addEventListener("wheel", this.sm, { passive: !1 })
                : this.Bv.removeEventListener("wheel", this.sm)
        }
        Tm(t) {
            switch (t.deltaMode) {
                case t.DOM_DELTA_PAGE:
                    return 120
                case t.DOM_DELTA_LINE:
                    return 32
            }
            return Qn ? 1 / window.devicePixelRatio : 1
        }
        rm(t) {
            if (
                !(
                    (0 !== t.deltaX && this.un.handleScroll.mouseWheel) ||
                    (0 !== t.deltaY && this.un.handleScale.mouseWheel)
                )
            )
                return
            const i = this.Tm(t),
                n = (i * t.deltaX) / 100,
                s = (-i * t.deltaY) / 100
            if (
                (t.cancelable && t.preventDefault(),
                0 !== s && this.un.handleScale.mouseWheel)
            ) {
                const i = Math.sign(s) * Math.min(1, Math.abs(s)),
                    n = t.clientX - this.Bv.getBoundingClientRect().left
                this.Ut().Nc(n, i)
            }
            0 !== n && this.un.handleScroll.mouseWheel && this.Ut().Fc(-80 * n)
        }
        bm(t, i) {
            var n
            const s = t.Wn()
            3 === s && this.Pm(),
                (3 !== s && 2 !== s) ||
                    (this.Rm(t),
                    this.Dm(t, i),
                    this.am.gt(),
                    this.Xv.forEach((t) => {
                        t.Jp()
                    }),
                    3 ===
                        (null === (n = this.Jv) || void 0 === n
                            ? void 0
                            : n.Wn()) &&
                        (this.Jv.Qn(t),
                        this.Pm(),
                        this.Rm(this.Jv),
                        this.Dm(this.Jv, i),
                        (t = this.Jv),
                        (this.Jv = null))),
                this.Mp(t)
        }
        Dm(t, i) {
            for (const n of t.Jn()) this.ts(n, i)
        }
        Rm(t) {
            const i = this.Hi.Bc()
            for (let n = 0; n < i.length; n++) t.jn(n).Fn && i[n].f_()
        }
        ts(t, i) {
            const n = this.Hi.yt()
            switch (t.Un) {
                case 0:
                    n.qu()
                    break
                case 1:
                    n.Yu(t.Bt)
                    break
                case 2:
                    n.Kn(t.Bt)
                    break
                case 3:
                    n.Gn(t.Bt)
                    break
                case 4:
                    n.Lu()
                    break
                case 5:
                    t.Bt.Fu(i) || n.Gn(t.Bt.Wu(i))
            }
        }
        mc(t) {
            null !== this.Jv ? this.Jv.Qn(t) : (this.Jv = t),
                this.Qv ||
                    ((this.Qv = !0),
                    (this.Zv = window.requestAnimationFrame((t) => {
                        if (((this.Qv = !1), (this.Zv = 0), null !== this.Jv)) {
                            const i = this.Jv
                            ;(this.Jv = null), this.bm(i, t)
                            for (const n of i.Jn())
                                if (5 === n.Un && !n.Bt.Fu(t)) {
                                    this.Ut().Yn(n.Bt)
                                    break
                                }
                        }
                    })))
        }
        Pm() {
            this.um()
        }
        um() {
            const t = this.Hi.Bc(),
                i = t.length,
                n = this.Xv.length
            for (let t = i; t < n; t++) {
                const t = r(this.Xv.pop())
                this.nm.removeChild(t.dp()), t.av().v(this), t.M()
            }
            for (let s = n; s < i; s++) {
                const i = new Zn(this, t[s])
                i.av().l(this.Om.bind(this), this),
                    this.Xv.push(i),
                    this.nm.insertBefore(i.dp(), this.am.dp())
            }
            for (let n = 0; n < i; n++) {
                const i = t[n],
                    s = this.Xv[n]
                s.wp() !== i ? s.Kp(i) : s.Zp()
            }
            this.dm(), this.Cm()
        }
        Bm(t, i, n) {
            var s
            const e = new Map()
            if (null !== t) {
                this.Hi.wt().forEach((i) => {
                    const n = i.En().ll(t)
                    null !== n && e.set(i, n)
                })
            }
            let r
            if (null !== t) {
                const i =
                    null === (s = this.Hi.yt().Ui(t)) || void 0 === s
                        ? void 0
                        : s.W_
                void 0 !== i && (r = i)
            }
            const h = this.Ut().Tc(),
                l = null !== h && h.Rc instanceof Pi ? h.Rc : void 0,
                a = null !== h && void 0 !== h.nv ? h.nv.nr : void 0
            return {
                _t: r,
                Ys: null != t ? t : void 0,
                Lm: null != i ? i : void 0,
                Em: l,
                zm: e,
                Am: a,
                Im: null != n ? n : void 0,
            }
        }
        Om(t, i, n) {
            this.zp.m(() => this.Bm(t, i, n))
        }
        lm(t, i, n) {
            this.fc.m(() => this.Bm(t, i, n))
        }
        dm() {
            const t = this.un.timeScale.visible ? "" : "none"
            this.am.dp().style.display = t
        }
        Sm() {
            return this.Xv[0].wp().e_().F().visible
        }
        ym() {
            return this.Xv[0].wp().r_().F().visible
        }
        om() {
            return (
                "ResizeObserver" in window &&
                ((this.tm = new ResizeObserver((t) => {
                    const i = t.find((t) => t.target === this.im)
                    i && this._m(i.contentRect.width, i.contentRect.height)
                })),
                this.tm.observe(this.im, { box: "border-box" }),
                !0)
            )
        }
        vm() {
            null !== this.tm && this.tm.disconnect()
        }
    }
    function ns(t) {
        return Boolean(t.handleScroll.mouseWheel || t.handleScale.mouseWheel)
    }
    function ss(t, i, n, s) {
        const e = n.value,
            r = { Ys: i, _t: t, Bt: [e, e, e, e], W_: s }
        return void 0 !== n.color && (r.D = n.color), r
    }
    function es(t) {
        return void 0 !== t.Bt
    }
    function rs(t) {
        return (i, n, s, e) => {
            return void 0 === (r = s).open && void 0 === r.value
                ? { _t: i, Ys: n, W_: e }
                : t(i, n, s, e)
            var r
        }
    }
    const hs = {
        Candlestick: rs(function (t, i, n, s) {
            const e = {
                Ys: i,
                _t: t,
                Bt: [n.open, n.high, n.low, n.close],
                W_: s,
            }
            return (
                void 0 !== n.color && (e.D = n.color),
                void 0 !== n.borderColor && (e.Lt = n.borderColor),
                void 0 !== n.wickColor && (e.Zh = n.wickColor),
                e
            )
        }),
        Bar: rs(function (t, i, n, s) {
            const e = {
                Ys: i,
                _t: t,
                Bt: [n.open, n.high, n.low, n.close],
                W_: s,
            }
            return void 0 !== n.color && (e.D = n.color), e
        }),
        Area: rs(function (t, i, n, s) {
            const e = n.value,
                r = { Ys: i, _t: t, Bt: [e, e, e, e], W_: s }
            return (
                void 0 !== n.lineColor && (r.ot = n.lineColor),
                void 0 !== n.topColor && (r.bs = n.topColor),
                void 0 !== n.bottomColor && (r.gs = n.bottomColor),
                r
            )
        }),
        Baseline: rs(function (t, i, n, s) {
            const e = n.value,
                r = { Ys: i, _t: t, Bt: [e, e, e, e], W_: s }
            return (
                void 0 !== n.topLineColor && (r.be = n.topLineColor),
                void 0 !== n.bottomLineColor && (r.ge = n.bottomLineColor),
                void 0 !== n.topFillColor1 && (r.de = n.topFillColor1),
                void 0 !== n.topFillColor2 && (r.fe = n.topFillColor2),
                void 0 !== n.bottomFillColor1 && (r.pe = n.bottomFillColor1),
                void 0 !== n.bottomFillColor2 && (r.ve = n.bottomFillColor2),
                r
            )
        }),
        Histogram: rs(ss),
        Line: rs(ss),
    }
    function ls(t) {
        return hs[t]
    }
    function as(t) {
        return 60 * t * 60 * 1e3
    }
    function os(t) {
        return 60 * t * 1e3
    }
    const _s = [
        { Vm: ((us = 1), 1e3 * us), F_: 10 },
        { Vm: os(1), F_: 20 },
        { Vm: os(5), F_: 21 },
        { Vm: os(30), F_: 22 },
        { Vm: as(1), F_: 30 },
        { Vm: as(3), F_: 31 },
        { Vm: as(6), F_: 32 },
        { Vm: as(12), F_: 33 },
    ]
    var us
    function cs(t, i) {
        if (t.getUTCFullYear() !== i.getUTCFullYear()) return 70
        if (t.getUTCMonth() !== i.getUTCMonth()) return 60
        if (t.getUTCDate() !== i.getUTCDate()) return 50
        for (let n = _s.length - 1; n >= 0; --n)
            if (
                Math.floor(i.getTime() / _s[n].Vm) !==
                Math.floor(t.getTime() / _s[n].Vm)
            )
                return _s[n].F_
        return 0
    }
    function ds(t, i = 0) {
        if (0 === t.length) return
        let n = 0 === i ? null : t[i - 1]._t.jh,
            s = null !== n ? new Date(1e3 * n) : null,
            e = 0
        for (let r = i; r < t.length; ++r) {
            const i = t[r],
                h = new Date(1e3 * i._t.jh)
            null !== s && (i.N_ = cs(h, s)),
                (e += i._t.jh - (n || i._t.jh)),
                (n = i._t.jh),
                (s = h)
        }
        if (0 === i && t.length > 1) {
            const i = Math.ceil(e / (t.length - 1)),
                n = new Date(1e3 * (t[0]._t.jh - i))
            t[0].N_ = cs(new Date(1e3 * t[0]._t.jh), n)
        }
    }
    function fs(t) {
        if (!gn(t)) throw new Error("time must be of type BusinessDay")
        const i = new Date(Date.UTC(t.year, t.month - 1, t.day, 0, 0, 0, 0))
        return { jh: Math.round(i.getTime() / 1e3), O_: t }
    }
    function ps(t) {
        if (!wn(t)) throw new Error("time must be of type isUTCTimestamp")
        return { jh: t }
    }
    function vs(t) {
        return 0 === t.length ? null : gn(t[0].time) ? fs : ps
    }
    function ms(t) {
        return wn(t) ? ps(t) : gn(t) ? fs(t) : fs(bs(t))
    }
    function bs(t) {
        const i = new Date(t)
        if (isNaN(i.getTime()))
            throw new Error(
                `Invalid date string=${t}, expected format=yyyy-mm-dd`
            )
        return {
            day: i.getUTCDate(),
            month: i.getUTCMonth() + 1,
            year: i.getUTCFullYear(),
        }
    }
    function gs(t) {
        M(t.time) && (t.time = bs(t.time))
    }
    function ws(t) {
        return { Ys: 0, Nm: new Map(), ql: t }
    }
    function Ms(t) {
        if (void 0 !== t && 0 !== t.length)
            return { Fm: t[0]._t.jh, Wm: t[t.length - 1]._t.jh }
    }
    function xs(t) {
        let i
        return (
            t.forEach((t) => {
                void 0 === i && (i = t.W_)
            }),
            r(i)
        )
    }
    function Ss(t) {
        void 0 === t.W_ && (t.W_ = t.time)
    }
    class ys {
        constructor() {
            ;(this.jm = new Map()),
                (this.$m = new Map()),
                (this.Hm = new Map()),
                (this.Um = [])
        }
        M() {
            this.jm.clear(), this.$m.clear(), this.Hm.clear(), (this.Um = [])
        }
        qm(t, i) {
            let n = 0 !== this.jm.size,
                s = !1
            const e = this.$m.get(t)
            if (void 0 !== e)
                if (1 === this.$m.size) (n = !1), (s = !0), this.jm.clear()
                else
                    for (const i of this.Um)
                        i.pointData.Nm.delete(t) && (s = !0)
            let r = []
            if (0 !== i.length) {
                const n = i
                n.forEach((t) => Ss(t)),
                    (function (t) {
                        t.forEach(gs)
                    })(i)
                const e = h(vs(i)),
                    l = ls(t.Qh())
                r = n.map((i) => {
                    const n = e(i.time)
                    let r = this.jm.get(n.jh)
                    void 0 === r &&
                        ((r = ws(n)), this.jm.set(n.jh, r), (s = !0))
                    const h = l(n, r.Ys, i, i.W_)
                    return r.Nm.set(t, h), h
                })
            }
            n && this.Ym(), this.Xm(t, r)
            let l = -1
            if (s) {
                const t = []
                this.jm.forEach((i) => {
                    t.push({ N_: 0, _t: i.ql, pointData: i, W_: xs(i.Nm) })
                }),
                    t.sort((t, i) => t._t.jh - i._t.jh),
                    (l = this.Zm(t))
            }
            return this.Km(
                t,
                l,
                (function (t, i) {
                    const n = Ms(t),
                        s = Ms(i)
                    if (void 0 !== n && void 0 !== s)
                        return { Il: n.Wm >= s.Wm && n.Fm >= s.Fm }
                })(this.$m.get(t), e)
            )
        }
        Jc(t) {
            return this.qm(t, [])
        }
        Gm(t, i) {
            const n = i
            Ss(n), gs(i)
            const s = h(vs([i]))(i.time),
                e = this.Hm.get(t)
            if (void 0 !== e && s.jh < e.jh)
                throw new Error(
                    `Cannot update oldest data, last time=${e.jh}, new time=${s.jh}`
                )
            let r = this.jm.get(s.jh)
            const l = void 0 === r
            void 0 === r && ((r = ws(s)), this.jm.set(s.jh, r))
            const a = ls(t.Qh())(s, r.Ys, i, n.W_)
            r.Nm.set(t, a), this.Jm(t, a)
            const o = { Il: es(a) }
            if (!l) return this.Km(t, -1, o)
            const _ = { N_: 0, _t: r.ql, pointData: r, W_: xs(r.Nm) },
                u = mt(this.Um, _._t.jh, (t, i) => t._t.jh < i)
            this.Um.splice(u, 0, _)
            for (let t = u; t < this.Um.length; ++t) ks(this.Um[t].pointData, t)
            return ds(this.Um, u), this.Km(t, u, o)
        }
        Jm(t, i) {
            let n = this.$m.get(t)
            void 0 === n && ((n = []), this.$m.set(t, n))
            const s = 0 !== n.length ? n[n.length - 1] : null
            null === s || i._t.jh > s._t.jh
                ? es(i) && n.push(i)
                : es(i)
                ? (n[n.length - 1] = i)
                : n.splice(-1, 1),
                this.Hm.set(t, i._t)
        }
        Xm(t, i) {
            0 !== i.length
                ? (this.$m.set(t, i.filter(es)),
                  this.Hm.set(t, i[i.length - 1]._t))
                : (this.$m.delete(t), this.Hm.delete(t))
        }
        Ym() {
            for (const t of this.Um)
                0 === t.pointData.Nm.size && this.jm.delete(t._t.jh)
        }
        Zm(t) {
            let i = -1
            for (let n = 0; n < this.Um.length && n < t.length; ++n) {
                const s = this.Um[n],
                    e = t[n]
                if (s._t.jh !== e._t.jh) {
                    i = n
                    break
                }
                ;(e.N_ = s.N_), ks(e.pointData, n)
            }
            if (
                (-1 === i &&
                    this.Um.length !== t.length &&
                    (i = Math.min(this.Um.length, t.length)),
                -1 === i)
            )
                return -1
            for (let n = i; n < t.length; ++n) ks(t[n].pointData, n)
            return ds(t, i), (this.Um = t), i
        }
        Qm() {
            if (0 === this.$m.size) return null
            let t = 0
            return (
                this.$m.forEach((i) => {
                    0 !== i.length && (t = Math.max(t, i[i.length - 1].Ys))
                }),
                t
            )
        }
        Km(t, i, n) {
            const s = { tb: new Map(), yt: { yu: this.Qm() } }
            if (-1 !== i)
                this.$m.forEach((i, e) => {
                    s.tb.set(e, { ar: i, ib: e === t ? n : void 0 })
                }),
                    this.$m.has(t) || s.tb.set(t, { ar: [], ib: n }),
                    (s.yt.nb = this.Um),
                    (s.yt.sb = i)
            else {
                const i = this.$m.get(t)
                s.tb.set(t, { ar: i || [], ib: n })
            }
            return s
        }
    }
    function ks(t, i) {
        ;(t.Ys = i),
            t.Nm.forEach((t) => {
                t.Ys = i
            })
    }
    function Cs(t) {
        return { value: t.Bt[3], time: t.W_ }
    }
    function Ts(t) {
        const i = Cs(t)
        return void 0 !== t.D && (i.color = t.D), i
    }
    function Ps(t) {
        return {
            open: t.Bt[0],
            high: t.Bt[1],
            low: t.Bt[2],
            close: t.Bt[3],
            time: t.W_,
        }
    }
    const Rs = {
        Area: function (t) {
            const i = Cs(t)
            return (
                void 0 !== t.ot && (i.lineColor = t.ot),
                void 0 !== t.bs && (i.topColor = t.bs),
                void 0 !== t.gs && (i.bottomColor = t.gs),
                i
            )
        },
        Line: Ts,
        Baseline: function (t) {
            const i = Cs(t)
            return (
                void 0 !== t.be && (i.topLineColor = t.be),
                void 0 !== t.ge && (i.bottomLineColor = t.ge),
                void 0 !== t.de && (i.topFillColor1 = t.de),
                void 0 !== t.fe && (i.topFillColor2 = t.fe),
                void 0 !== t.pe && (i.bottomFillColor1 = t.pe),
                void 0 !== t.ve && (i.bottomFillColor2 = t.ve),
                i
            )
        },
        Histogram: Ts,
        Bar: function (t) {
            const i = Ps(t)
            return void 0 !== t.D && (i.color = t.D), i
        },
        Candlestick: function (t) {
            const i = Ps(t),
                { D: n, Lt: s, Zh: e } = t
            return (
                void 0 !== n && (i.color = n),
                void 0 !== s && (i.borderColor = s),
                void 0 !== e && (i.wickColor = e),
                i
            )
        },
    }
    function Ds(t) {
        return Rs[t]
    }
    const Os = {
            autoScale: !0,
            mode: 0,
            invertScale: !1,
            alignLabels: !0,
            borderVisible: !0,
            borderColor: "#2B2B43",
            entireTextOnly: !1,
            visible: !1,
            ticksVisible: !1,
            scaleMargins: { bottom: 0.1, top: 0.2 },
        },
        Bs = {
            color: "rgba(0, 0, 0, 0)",
            visible: !1,
            fontSize: 48,
            fontFamily: C,
            fontStyle: "",
            text: "",
            horzAlign: "center",
            vertAlign: "center",
        },
        Ls = {
            width: 0,
            height: 0,
            autoSize: !1,
            layout: {
                background: { type: "solid", color: "#FFFFFF" },
                textColor: "#191919",
                fontSize: 12,
                fontFamily: C,
            },
            crosshair: {
                vertLine: {
                    color: "#9598A1",
                    width: 1,
                    style: 3,
                    visible: !0,
                    labelVisible: !0,
                    labelBackgroundColor: "#131722",
                },
                horzLine: {
                    color: "#9598A1",
                    width: 1,
                    style: 3,
                    visible: !0,
                    labelVisible: !0,
                    labelBackgroundColor: "#131722",
                },
                mode: 1,
            },
            grid: {
                vertLines: { color: "#D6DCDE", style: 0, visible: !0 },
                horzLines: { color: "#D6DCDE", style: 0, visible: !0 },
            },
            overlayPriceScales: Object.assign({}, Os),
            leftPriceScale: Object.assign(Object.assign({}, Os), {
                visible: !1,
            }),
            rightPriceScale: Object.assign(Object.assign({}, Os), {
                visible: !0,
            }),
            timeScale: {
                rightOffset: 0,
                barSpacing: 6,
                minBarSpacing: 0.5,
                fixLeftEdge: !1,
                fixRightEdge: !1,
                lockVisibleTimeRangeOnResize: !1,
                rightBarStaysOnScroll: !1,
                borderVisible: !0,
                borderColor: "#2B2B43",
                visible: !0,
                timeVisible: !1,
                secondsVisible: !0,
                shiftVisibleRangeOnNewBar: !0,
                ticksVisible: !1,
            },
            watermark: Bs,
            localization: {
                locale: Pn ? navigator.language : "",
                dateFormat: "dd MMM 'yy",
            },
            handleScroll: {
                mouseWheel: !0,
                pressedMouseMove: !0,
                horzTouchDrag: !0,
                vertTouchDrag: !0,
            },
            handleScale: {
                axisPressedMouseMove: { time: !0, price: !0 },
                axisDoubleClickReset: { time: !0, price: !0 },
                mouseWheel: !0,
                pinch: !0,
            },
            kineticScroll: { mouse: !1, touch: !0 },
            trackingMode: { exitMode: 1 },
        },
        Es = {
            upColor: "#26a69a",
            downColor: "#ef5350",
            wickVisible: !0,
            borderVisible: !0,
            borderColor: "#378658",
            borderUpColor: "#26a69a",
            borderDownColor: "#ef5350",
            wickColor: "#737375",
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
        },
        zs = {
            upColor: "#26a69a",
            downColor: "#ef5350",
            openVisible: !0,
            thinBars: !0,
        },
        As = {
            color: "#2196f3",
            lineStyle: 0,
            lineWidth: 3,
            lineType: 0,
            crosshairMarkerVisible: !0,
            crosshairMarkerRadius: 4,
            crosshairMarkerBorderColor: "",
            crosshairMarkerBorderWidth: 2,
            crosshairMarkerBackgroundColor: "",
            lastPriceAnimation: 0,
        },
        Is = {
            topColor: "rgba( 46, 220, 135, 0.4)",
            bottomColor: "rgba( 40, 221, 100, 0)",
            invertFilledArea: !1,
            lineColor: "#33D778",
            lineStyle: 0,
            lineWidth: 3,
            lineType: 0,
            crosshairMarkerVisible: !0,
            crosshairMarkerRadius: 4,
            crosshairMarkerBorderColor: "",
            crosshairMarkerBorderWidth: 2,
            crosshairMarkerBackgroundColor: "",
            lastPriceAnimation: 0,
        },
        Vs = {
            baseValue: { type: "price", price: 0 },
            topFillColor1: "rgba(38, 166, 154, 0.28)",
            topFillColor2: "rgba(38, 166, 154, 0.05)",
            topLineColor: "rgba(38, 166, 154, 1)",
            bottomFillColor1: "rgba(239, 83, 80, 0.05)",
            bottomFillColor2: "rgba(239, 83, 80, 0.28)",
            bottomLineColor: "rgba(239, 83, 80, 1)",
            lineWidth: 3,
            lineStyle: 0,
            lineType: 0,
            crosshairMarkerVisible: !0,
            crosshairMarkerRadius: 4,
            crosshairMarkerBorderColor: "",
            crosshairMarkerBorderWidth: 2,
            crosshairMarkerBackgroundColor: "",
            lastPriceAnimation: 0,
        },
        Ns = { color: "#26a69a", base: 0 },
        Fs = {
            title: "",
            visible: !0,
            lastValueVisible: !0,
            priceLineVisible: !0,
            priceLineSource: 0,
            priceLineWidth: 1,
            priceLineColor: "",
            priceLineStyle: 2,
            baseLineVisible: !0,
            baseLineWidth: 1,
            baseLineColor: "#B2B5BE",
            baseLineStyle: 0,
            priceFormat: { type: "price", precision: 2, minMove: 0.01 },
        }
    class Ws {
        constructor(t, i) {
            ;(this.eb = t), (this.rb = i)
        }
        applyOptions(t) {
            this.eb.Ut().Dc(this.rb, t)
        }
        options() {
            return this.Ii().F()
        }
        width() {
            return Q(this.rb) ? this.eb.xm(this.rb) : 0
        }
        Ii() {
            return h(this.eb.Ut().Oc(this.rb)).Ot
        }
    }
    class js {
        constructor(t) {
            this.Dh = t
        }
        applyOptions(t) {
            this.Dh.Vh(t)
        }
        options() {
            return this.Dh.F()
        }
        hb() {
            return this.Dh
        }
    }
    const $s = {
            corners: [],
            lowPrice: 0,
            highPrice: 0,
            earlyTime: 0,
            lateTime: 0,
            borderColor: "#0FF",
            borderWidth: 1,
            borderStyle: 0,
            fillColor: "#0FF",
            fillOpacity: 1,
            borderVisible: !0,
            axisLabelVisible: !1,
            title: "",
        },
        Hs = {
            color: "#FF0000",
            price: 0,
            lineStyle: 2,
            lineWidth: 1,
            lineVisible: !0,
            axisLabelVisible: !0,
            title: "",
            axisLabelColor: "",
            axisLabelTextColor: "",
        }
    class Us {
        constructor(t) {
            this.$h = t
        }
        applyOptions(t) {
            this.$h.Vh(t)
        }
        options() {
            return this.$h.F()
        }
        lb() {
            return this.$h
        }
    }
    class qs {
        constructor(t, i, n) {
            ;(this.Ts = t), (this.ab = i), (this.ob = n)
        }
        priceFormatter() {
            return this.Ts.Ql()
        }
        priceToCoordinate(t) {
            const i = this.Ts.Tt()
            return null === i ? null : this.Ts.Ot().Dt(t, i.Bt)
        }
        coordinateToPrice(t) {
            const i = this.Ts.Tt()
            return null === i ? null : this.Ts.Ot().pn(t, i.Bt)
        }
        barsInLogicalRange(t) {
            if (null === t) return null
            const i = new an(new rn(t.from, t.to)).Y_(),
                n = this.Ts.En()
            if (n.Ni()) return null
            const s = n.ll(i.Ms(), 1),
                e = n.ll(i.ci(), -1),
                r = h(n.el()),
                l = h(n.Ln())
            if (null !== s && null !== e && s.Ys > e.Ys)
                return { barsBefore: t.from - r, barsAfter: l - t.to }
            const a = {
                barsBefore: null === s || s.Ys === r ? t.from - r : s.Ys - r,
                barsAfter: null === e || e.Ys === l ? l - t.to : l - e.Ys,
            }
            return (
                null !== s &&
                    null !== e &&
                    ((a.from = s._t.O_ || s._t.jh),
                    (a.to = e._t.O_ || e._t.jh)),
                a
            )
        }
        setData(t) {
            this.Ts.Qh(), this.ab._b(this.Ts, t)
        }
        update(t) {
            this.Ts.Qh(), this.ab.ub(this.Ts, t)
        }
        dataByIndex(t, i) {
            const n = this.Ts.En().ll(t, i)
            return null === n ? null : Ds(this.seriesType())(n)
        }
        setMarkers(t) {
            const i = t.map((t) =>
                Object.assign(Object.assign({}, t), {
                    originalTime: t.time,
                    time: ms(t.time),
                })
            )
            this.Ts.Nl(i)
        }
        markers() {
            return this.Ts.Fl().map((t) => {
                const { originalTime: i, time: n } = t,
                    s = (function (t, i) {
                        var n = {}
                        for (var s in t)
                            Object.prototype.hasOwnProperty.call(t, s) &&
                                i.indexOf(s) < 0 &&
                                (n[s] = t[s])
                        if (
                            null != t &&
                            "function" == typeof Object.getOwnPropertySymbols
                        ) {
                            var e = 0
                            for (
                                s = Object.getOwnPropertySymbols(t);
                                e < s.length;
                                e++
                            )
                                i.indexOf(s[e]) < 0 &&
                                    Object.prototype.propertyIsEnumerable.call(
                                        t,
                                        s[e]
                                    ) &&
                                    (n[s[e]] = t[s[e]])
                        }
                        return n
                    })(t, ["originalTime", "time"])
                return Object.assign({ time: i }, s)
            })
        }
        applyOptions(t) {
            this.Ts.Vh(t)
        }
        options() {
            return S(this.Ts.F())
        }
        priceScale() {
            return this.ob.priceScale(this.Ts.Ot().ra())
        }
        createPriceLine(t) {
            const i = b(S(Hs), t),
                n = this.Ts.Wl(i)
            return new Us(n)
        }
        removePriceLine(t) {
            this.Ts.jl(t.lb())
        }
        createBox(t) {
            const i = b(S($s), t),
                n = this.Ts.$l(i)
            return new js(n)
        }
        removeBox(t) {
            this.Ts.Hl(t.hb())
        }
        seriesType() {
            return this.Ts.Qh()
        }
    }
    class Ys {
        constructor(t, i) {
            ;(this.cb = new m()),
                (this.su = new m()),
                (this.Ov = new m()),
                (this.Hi = t),
                (this.Wo = t.yt()),
                (this.am = i),
                this.Wo.ju().l(this.fb.bind(this)),
                this.Wo.$u().l(this.pb.bind(this)),
                this.am.Nv().l(this.vb.bind(this))
        }
        M() {
            this.Wo.ju().v(this),
                this.Wo.$u().v(this),
                this.am.Nv().v(this),
                this.cb.M(),
                this.su.M(),
                this.Ov.M()
        }
        scrollPosition() {
            return this.Wo.Ru()
        }
        scrollToPosition(t, i) {
            i ? this.Wo.Nu(t, 1e3) : this.Hi.Gn(t)
        }
        scrollToRealTime() {
            this.Wo.Vu()
        }
        getVisibleRange() {
            var t, i
            const n = this.Wo.mu()
            return null === n
                ? null
                : {
                      from:
                          null !== (t = n.from.O_) && void 0 !== t
                              ? t
                              : n.from.jh,
                      to: null !== (i = n.to.O_) && void 0 !== i ? i : n.to.jh,
                  }
        }
        setVisibleRange(t) {
            const i = { from: ms(t.from), to: ms(t.to) },
                n = this.Wo.Mu(i)
            this.Hi.Qc(n)
        }
        getVisibleLogicalRange() {
            const t = this.Wo.vu()
            return null === t ? null : { from: t.Ms(), to: t.ci() }
        }
        setVisibleLogicalRange(t) {
            e(t.from <= t.to, "The from index cannot be after the to index."),
                this.Hi.Qc(t)
        }
        resetTimeScale() {
            this.Hi.Zn()
        }
        fitContent() {
            this.Hi.qu()
        }
        logicalToCoordinate(t) {
            const i = this.Hi.yt()
            return i.Ni() ? null : i.At(t)
        }
        coordinateToLogical(t) {
            return this.Wo.Ni() ? null : this.Wo.ku(t)
        }
        timeToCoordinate(t) {
            const i = ms(t),
                n = this.Wo.Wh(i, !1)
            return null === n ? null : this.Wo.At(n)
        }
        coordinateToTime(t) {
            var i
            const n = this.Hi.yt(),
                s = n.ku(t),
                e = n.vn(s)
            return null === e
                ? null
                : null !== (i = e.O_) && void 0 !== i
                ? i
                : e.jh
        }
        width() {
            return this.am.cv().width
        }
        height() {
            return this.am.cv().height
        }
        subscribeVisibleTimeRangeChange(t) {
            this.cb.l(t)
        }
        unsubscribeVisibleTimeRangeChange(t) {
            this.cb.p(t)
        }
        subscribeVisibleLogicalRangeChange(t) {
            this.su.l(t)
        }
        unsubscribeVisibleLogicalRangeChange(t) {
            this.su.p(t)
        }
        subscribeSizeChange(t) {
            this.Ov.l(t)
        }
        unsubscribeSizeChange(t) {
            this.Ov.p(t)
        }
        applyOptions(t) {
            this.Wo.Vh(t)
        }
        options() {
            return S(this.Wo.F())
        }
        fb() {
            this.cb.g() && this.cb.m(this.getVisibleRange())
        }
        pb() {
            this.su.g() && this.su.m(this.getVisibleLogicalRange())
        }
        vb(t) {
            this.Ov.m(t.width, t.height)
        }
    }
    function Xs(t) {
        if (void 0 === t || "custom" === t.type) return
        const i = t
        void 0 !== i.minMove &&
            void 0 === i.precision &&
            (i.precision = (function (t) {
                if (t >= 1) return 0
                let i = 0
                for (; i < 8; i++) {
                    const n = Math.round(t)
                    if (Math.abs(n - t) < 1e-8) return i
                    t *= 10
                }
                return i
            })(i.minMove))
    }
    function Zs(t) {
        return (
            (function (t) {
                if (x(t.handleScale)) {
                    const i = t.handleScale
                    t.handleScale = {
                        axisDoubleClickReset: { time: i, price: i },
                        axisPressedMouseMove: { time: i, price: i },
                        mouseWheel: i,
                        pinch: i,
                    }
                } else if (void 0 !== t.handleScale) {
                    const { axisPressedMouseMove: i, axisDoubleClickReset: n } =
                        t.handleScale
                    x(i) &&
                        (t.handleScale.axisPressedMouseMove = {
                            time: i,
                            price: i,
                        }),
                        x(n) &&
                            (t.handleScale.axisDoubleClickReset = {
                                time: n,
                                price: n,
                            })
                }
                const i = t.handleScroll
                x(i) &&
                    (t.handleScroll = {
                        horzTouchDrag: i,
                        vertTouchDrag: i,
                        mouseWheel: i,
                        pressedMouseMove: i,
                    })
            })(t),
            t
        )
    }
    class Ks {
        constructor(t, i) {
            ;(this.mb = new ys()),
                (this.bb = new Map()),
                (this.gb = new Map()),
                (this.wb = new m()),
                (this.Mb = new m())
            const n = void 0 === i ? S(Ls) : b(S(Ls), Zs(i))
            ;(this.eb = new is(t, n)),
                this.eb.av().l((t) => {
                    this.wb.g() && this.wb.m(this.xb(t()))
                }, this),
                this.eb.zc().l((t) => {
                    this.Mb.g() && this.Mb.m(this.xb(t()))
                }, this)
            const s = this.eb.Ut()
            this.Sb = new Ys(s, this.eb.pm())
        }
        remove() {
            this.eb.av().v(this),
                this.eb.zc().v(this),
                this.Sb.M(),
                this.eb.M(),
                this.bb.clear(),
                this.gb.clear(),
                this.wb.M(),
                this.Mb.M(),
                this.mb.M()
        }
        resize(t, i, n) {
            this.autoSizeActive() || this.eb._m(t, i, n)
        }
        addAreaSeries(t) {
            return this.yb("Area", Is, t)
        }
        addBaselineSeries(t) {
            return this.yb("Baseline", Vs, t)
        }
        addBarSeries(t) {
            return this.yb("Bar", zs, t)
        }
        addCandlestickSeries(t = {}) {
            return (
                (function (t) {
                    void 0 !== t.borderColor &&
                        ((t.borderUpColor = t.borderColor),
                        (t.borderDownColor = t.borderColor)),
                        void 0 !== t.wickColor &&
                            ((t.wickUpColor = t.wickColor),
                            (t.wickDownColor = t.wickColor))
                })(t),
                this.yb("Candlestick", Es, t)
            )
        }
        addHistogramSeries(t) {
            return this.yb("Histogram", Ns, t)
        }
        addLineSeries(t) {
            return this.yb("Line", As, t)
        }
        removeSeries(t) {
            const i = r(this.bb.get(t)),
                n = this.mb.Jc(i)
            this.eb.Ut().Jc(i), this.kb(n), this.bb.delete(t), this.gb.delete(i)
        }
        _b(t, i) {
            this.kb(this.mb.qm(t, i))
        }
        ub(t, i) {
            this.kb(this.mb.Gm(t, i))
        }
        subscribeClick(t) {
            this.wb.l(t)
        }
        unsubscribeClick(t) {
            this.wb.p(t)
        }
        subscribeCrosshairMove(t) {
            this.Mb.l(t)
        }
        unsubscribeCrosshairMove(t) {
            this.Mb.p(t)
        }
        priceScale(t) {
            return new Ws(this.eb, t)
        }
        timeScale() {
            return this.Sb
        }
        applyOptions(t) {
            this.eb.Vh(Zs(t))
        }
        options() {
            return this.eb.F()
        }
        takeScreenshot() {
            return this.eb.wm()
        }
        autoSizeActive() {
            return this.eb.km()
        }
        yb(t, i, n = {}) {
            Xs(n.priceFormat)
            const s = b(S(Fs), S(i), n),
                e = this.eb.Ut().Kc(t, s),
                r = new qs(e, this, this)
            return this.bb.set(r, e), this.gb.set(e, r), r
        }
        kb(t) {
            const i = this.eb.Ut()
            i.Xc(t.yt.yu, t.yt.nb, t.yt.sb),
                t.tb.forEach((t, i) => i.tt(t.ar, t.ib)),
                i.Tu()
        }
        Cb(t) {
            return r(this.gb.get(t))
        }
        xb(t) {
            const i = new Map()
            t.zm.forEach((t, n) => {
                const s = Ds(n.Qh())(t)
                e(
                    (function (t) {
                        return void 0 !== t.open || void 0 !== t.value
                    })(s)
                ),
                    i.set(this.Cb(n), s)
            })
            const n = void 0 === t.Em ? void 0 : this.Cb(t.Em)
            return {
                time: t._t,
                logical: t.Ys,
                point: t.Lm,
                hoveredSeries: n,
                hoveredObjectId: t.Am,
                seriesData: i,
                sourceEvent: t.Im,
            }
        }
    }
    var Gs = Object.freeze({
        __proto__: null,
        get ColorType() {
            return dn
        },
        get CrosshairMode() {
            return G
        },
        get LastPriceAnimationMode() {
            return un
        },
        get LineStyle() {
            return i
        },
        get LineType() {
            return t
        },
        get MismatchDirection() {
            return yi
        },
        get PriceLineSource() {
            return cn
        },
        get PriceScaleMode() {
            return qi
        },
        get TickMarkType() {
            return on
        },
        get TrackingModeExitMode() {
            return _n
        },
        createChart: function (t, i) {
            let n
            if (M(t)) {
                const i = document.getElementById(t)
                e(null !== i, `Cannot find element in DOM with id=${t}`),
                    (n = i)
            } else n = t
            return new Ks(n, i)
        },
        isBusinessDay: gn,
        isUTCTimestamp: wn,
        version: function () {
            return "4.1.0-dev+202305250802"
        },
    })
    window.LightweightCharts = Gs
})()
