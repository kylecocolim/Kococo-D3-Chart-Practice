import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import ChartContainer from '../components/ChartContainer'
import Layout from '../components/Layout'
import XAxis from '../components/XAxis'
import YAxis from '../components/YAxis'
import useChartSize from '../hooks/useChartSize'
import useQuery from '../hooks/useQuery'
import useXScale from '../hooks/useXScale'
import useYScale from '../hooks/useYScale'
import CandleStickChartDataset from '../lib/CandleStickChartDataset'
import { weeksTicks } from '../lib/datetime'
import * as d3 from 'd3'
import { YFinanceStockDatasetType } from '../types'
const { VITE_DATA_BASE_URL } = import.meta.env
export default function CandleStickChart() {
    const { dataset, status, errMsg } = useQuery(VITE_DATA_BASE_URL + 'storage/dataset/amd_stock_price.json', null, CandleStickChartDataset)
    const [xTicks, setXTicks] = useState<any>()
    const svgRef = useRef<SVGSVGElement>(null)
    const { width, height } = useChartSize(svgRef)
    const { xScale } = useXScale('scaleBand', dataset, width, 0.3)
    const { yScale } = useYScale('scaleLinear', dataset, height)
    const colors = ['#4daf4a', '#999999', '#e41a1c']

    const color = (open: number, close: number) => colors[1 + Math.sign(open - close)]
    useLayoutEffect(() => {
        if (dataset) {
            const datetimes = dataset.dataset.map((data: YFinanceStockDatasetType) => data.Date)
            const ticks = weeksTicks(datetimes, 4)
            if (ticks) {
                setXTicks(ticks)
            }
        }
    }, [dataset])

    return (
        <Layout>
            <ChartContainer title={'CandleStickChart'}>
                <svg ref={svgRef} width="100%" height="100%">
                    <XAxis scale={xScale} height={height} tickFormat={d3.timeFormat('%Y-%m-%d')} ticks={xTicks}></XAxis>
                    <YAxis scale={yScale} width={width} tickFormat={null} ticks={10}></YAxis>
                    {dataset &&
                        dataset.dataset.map((data: YFinanceStockDatasetType | any) => {
                            const { Date, Low, High, Open, Close } = data
                            return <rect key={Date} x={`${xScale(Date)}px`} y={`${yScale(Low)}px`} width={`${xScale.bandwidth()}px`} height={yScale(Low) - yScale(High)} fill={color(Open, Close)}></rect>
                        })}
                </svg>
            </ChartContainer>
        </Layout>
    )
}
