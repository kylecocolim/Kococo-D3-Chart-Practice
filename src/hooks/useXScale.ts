import { useMemo } from 'react'
import * as d3 from 'd3'
import { defaultMargin, defaultPadding } from '../types'

export function useXScale(type: string, dataset: any, width: number, padding: number = 0) {
    const xScale = useMemo(() => {
        const _width = width - defaultMargin.right - defaultPadding.right
        let domain = dataset ? dataset.xDomain : [0, 0]
        const scale = d3
            .scaleBand()
            .domain(domain)
            .range([defaultMargin.left + defaultPadding.left, _width])
            .padding(padding)
        if (type === 'scaleBand') {
            //@ts-ignore
            scale.invert = function (x) {
                const eachBand = xScale.step()
                const index = Math.round(x / eachBand)
                const val = xScale.domain()[index]
                return { val, index }
            }
        }
        return scale
    }, [dataset, width])
    return {
        xScale,
    }
}
