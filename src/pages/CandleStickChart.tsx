import { useEffect, useRef } from 'react'
import ChartContainer from '../components/ChartContainer'
import Layout from '../components/Layout'
import useChartSize from '../hooks/useChartSize'
import useQuery from '../hooks/useQuery'
const { VITE_DATA_BASE_URL } = import.meta.env
export default function CandleStickChart() {
    const { data, status, errMsg } = useQuery(VITE_DATA_BASE_URL + 'amd_stock_price.json')
    const svgRef = useRef<SVGSVGElement>(null)
    const { width, height } = useChartSize(svgRef)
    useEffect(() => {
        console.log(width, height)
    }, [width, height])
    return (
        <Layout>
            <ChartContainer title={'CandleStickChart'}>
                {width}, {height}
                <svg ref={svgRef} width="100%" height="100%"></svg>
            </ChartContainer>
        </Layout>
    )
}
