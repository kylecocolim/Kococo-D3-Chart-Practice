import { useRef } from 'react'
import { XAxis, YAxis, ChartContainer } from './chart'
import { useChartSize, useXScale, useYScale } from '../hooks'
import TooltipLayout from '../components/TooltipLayout'
import { YFinanceStockDatasetType, colors, StockAPIType } from '../types'

type CandleStickChartProps = {
    dataset: StockAPIType
    status: string
}
export default function CandleStickChart({ dataset, status }: CandleStickChartProps) {
    const svgRef = useRef<SVGSVGElement>(null)
    const { width, height } = useChartSize(svgRef)
    const { xScale } = useXScale('scaleBand', dataset, width, 0.3)
    const { yScale } = useYScale('scaleLinear', dataset, height)
    const color = (open: number, close: number) => colors[1 + Math.sign(open - close)]

    return (
        <ChartContainer fetchStatus={status} validation={dataset && dataset.history.length > 0}>
            <TooltipLayout svg={svgRef} xScale={xScale} yScale={yScale} dataset={dataset}>
                <svg ref={svgRef} width="100%" height="100%">
                    <XAxis scale={xScale} height={height} tickFormat={dataset?.xTickFormat} ticks={dataset?.xTicks}></XAxis>
                    <YAxis scale={yScale} width={width} tickFormat={null} ticks={10}></YAxis>
                    {dataset &&
                        dataset.history.map((data: YFinanceStockDatasetType | any) => {
                            if (width === 0 || height === 0) return
                            const { date, low, high, open, close } = data
                            return (
                                <g key={date} transform={`translate(${xScale(date)},0)`}>
                                    <line y1={yScale(low)} y2={yScale(high)} strokeWidth={1} stroke="black"></line>
                                    <line y1={yScale(open)} y2={yScale(close)} strokeWidth={xScale.bandwidth()} stroke={color(open, close)}></line>
                                </g>
                            )
                        })}
                </svg>
            </TooltipLayout>
        </ChartContainer>
    )
}
