import { useMemo } from 'react'
import * as d3 from 'd3'
import { defaultMargin } from '../types/DefaultConfig'
export default function useYScale(type: string, dataset: any, height: number) {
    const yScale = useMemo(() => {
        const _height = height - defaultMargin.bottom
        const domain = dataset ? dataset.yDomain : [0, 0]
        return d3.scaleLinear().domain(domain).range([defaultMargin.top, _height])
    }, [dataset, height])
    return {
        yScale,
    }
}
