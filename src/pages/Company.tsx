import Layout from '../components/Layout'
import { useQuery } from '../hooks'
import CandleStickChartDataset from '../lib/CandleStickChartDataset'
import CandleStickChart from '../components/CandleStickChart'
import { useParams } from 'react-router-dom'
import { STOCK_API } from '../types'
import CompanyInfo from '../components/CompanyInfo'
const { VITE_DATA_BASE_URL } = import.meta.env

export default function Company() {
    const { ticker } = useParams()
    const { dataset, status, errMsg } = useQuery(VITE_DATA_BASE_URL + STOCK_API + ticker, null, CandleStickChartDataset)

    return (
        <Layout>
            <CompanyInfo dataset={dataset}></CompanyInfo>
            <CandleStickChart dataset={dataset} status={status}></CandleStickChart>
        </Layout>
    )
}
