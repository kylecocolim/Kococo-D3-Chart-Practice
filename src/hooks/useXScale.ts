import { useMemo } from 'react'
import * as d3 from 'd3'
import { defaultMargin, ChartDataType } from '../types'
export default function useXScale(type: string, dataset: any, width: number) {
    const xScale = useMemo(() => {
        const _width = width - defaultMargin.right
        let domain = dataset ? dataset.xDomain : [0, 0]
        return d3.scaleBand().domain(domain).range([defaultMargin.left, _width])
    }, [dataset, width])
    return {
        xScale,
    }
}
