import ChartContainer from '../components/ChartContainer'
import Layout from '../components/Layout'
import useQuery from '../hooks/useQuery'
const { VITE_DATA_BASE_URL } = import.meta.env
export default function CandleStickChart() {
    const { data, status, errMsg } = useQuery(VITE_DATA_BASE_URL + 'amd_stock_price.json')

    return (
        <Layout>
            <ChartContainer title={'CandleStickChart'}>
                <svg></svg>
            </ChartContainer>
        </Layout>
    )
}
