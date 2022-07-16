import { useEffect, useCallback, useRef } from 'react'
import ChartContainer from '../components/ChartContainer'
import Layout from '../components/Layout'
import useChartSize from '../hooks/useChartSize'
import useQuery from '../hooks/useQuery'
import useXScale from '../hooks/useXScale'
import useYScale from '../hooks/useYScale'
import * as d3 from 'd3'
import CandleStickChartDataset from '../lib/CandleStickChartDataset'
const { VITE_DATA_BASE_URL } = import.meta.env
export default function CandleStickChart() {
    const { dataset, status, errMsg } = useQuery(VITE_DATA_BASE_URL + 'storage/dataset/amd_stock_price.json', null, CandleStickChartDataset)
    const svgRef = useRef<SVGSVGElement>(null)
    const { width, height } = useChartSize(svgRef)
    const { xScale } = useXScale('scaleBand', dataset, width)
    const { yScale } = useYScale('scaleLinear', dataset, height)

    return (
        <Layout>
            <ChartContainer title={'CandleStickChart'}>
                <svg ref={svgRef} width="100%" height="100%">
                    {dataset &&
                        dataset.dataset.map((data) => {
                            return <rect key={data.Date} z-index={100} x={`${xScale(data.Date)}px`} y={`${yScale(data.Low)}px`} width={`${xScale.bandwidth()}px`} height={yScale(data.High) - yScale(data.Low)} stroke="black" fill="black"></rect>
                        })}
                </svg>
            </ChartContainer>
        </Layout>
    )
}
