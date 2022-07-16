import { useMemo } from 'react'
import * as d3 from 'd3'
import { defaultMargin, defaultPadding } from '../types'
export default function useXScale(type: string, dataset: any, width: number, padding: number = 0) {
    const xScale = useMemo(() => {
        const _width = width - defaultMargin.right - defaultPadding.right
        let domain = dataset ? dataset.xDomain : [0, 0]
        return d3.scaleBand().domain(domain).range([defaultMargin.left + defaultPadding.left, _width]).padding(padding)
    }, [dataset, width])
    return {
        xScale,
    }
}
