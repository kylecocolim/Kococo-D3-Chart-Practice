import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { defaultMargin, defaultPadding } from '../types'
type AxisType = {
    scale: d3.ScaleBand<any> | d3.ScaleLinear<any, any, any> | any
    width: number
    ticks: Date[] | number[] | string[] | number | string | Date
    tickFormat: null | any
}

export default function YAxis({ scale, width, ticks, tickFormat }: AxisType) {
    const yAxisRef = useRef<SVGGElement>(null)
    useEffect(() => {
        if (yAxisRef.current && scale && ticks) {
            console.log(ticks)
            const axisLeft = d3.axisLeft(scale).tickFormat(tickFormat).ticks(ticks)
            d3.select(yAxisRef.current).call(axisLeft)
        }
    }, [yAxisRef, scale, ticks])

    return <g ref={yAxisRef} transform={`translate(${defaultMargin.left + defaultPadding.left},0)`}></g>
}
