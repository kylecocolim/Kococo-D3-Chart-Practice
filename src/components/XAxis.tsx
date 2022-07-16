import { useEffect, useLayoutEffect, useRef } from 'react'
import * as d3 from 'd3'
import { defaultMargin } from '../types'
type AxisType = {
    scale: d3.ScaleBand<any> | d3.ScaleLinear<any, any, any> | any
    height: number
    ticks: Date[] | number[] | string[]
    tickFormat: null | any
}

export default function XAxis({ scale, height, ticks, tickFormat }: AxisType) {
    const xAxisRef = useRef<SVGGElement>(null)
    useLayoutEffect(() => {
        if (xAxisRef.current && scale && ticks) {
            console.log(ticks)
            const axisBottom = d3.axisBottom(scale).tickFormat(tickFormat).tickValues(ticks)
            d3.select(xAxisRef.current).call(axisBottom)
        }
    }, [xAxisRef, scale, ticks])

    return <g ref={xAxisRef} transform={`translate(0,${height - defaultMargin.bottom})`}></g>
}
