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
import TooltipLayout from '../components/TooltipLayout'
import { YFinanceStockDatasetType } from '../types'
const { VITE_DATA_BASE_URL } = import.meta.env
export default function CandleStickChart() {
    const { dataset, status, errMsg } = useQuery(VITE_DATA_BASE_URL + 'api/stock/history/aapl', null, CandleStickChartDataset)
    const [xTicks, setXTicks] = useState<any>()
    const svgRef = useRef<SVGSVGElement>(null)
    const { width, height } = useChartSize(svgRef)
    const { xScale } = useXScale('scaleBand', dataset, width, 0.3)
    const { yScale } = useYScale('scaleLinear', dataset, height)
    const colors = ['#4daf4a', '#999999', '#e41a1c']
    const color = (open: number, close: number) => colors[1 + Math.sign(open - close)]
    useLayoutEffect(() => {
        if (dataset) {
            const datetimes = dataset.history.map((data: YFinanceStockDatasetType) => data.date)
            const ticks = weeksTicks(datetimes, 4)
            if (ticks) {
                setXTicks(ticks)
            }
        }
    }, [dataset])

    return (
        <Layout>
            <ChartContainer fetchStatus={status}>
                <TooltipLayout svg={svgRef} xScale={xScale} yScale={yScale} dataset={dataset}>
                    <svg ref={svgRef} width="100%" height="100%">
                        <XAxis scale={xScale} height={height} tickFormat={d3.timeFormat('%Y-%m-%d')} ticks={xTicks}></XAxis>
                        <YAxis scale={yScale} width={width} tickFormat={null} ticks={10}></YAxis>
                        {dataset &&
                            dataset.history.map((data: YFinanceStockDatasetType | any) => {
                                if (width === 0 || height === 0) return
                                const { date, low, high, open, close } = data
                                return <rect key={date} x={`${xScale(date)}px`} y={`${yScale(high)}px`} width={`${xScale.bandwidth()}px`} height={yScale(low) - yScale(high)} fill={color(open, close)}></rect>
                            })}
                    </svg>
                </TooltipLayout>
            </ChartContainer>
        </Layout>
    )
}
