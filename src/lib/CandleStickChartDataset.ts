import { StockAPIType, YFinanceStockDatasetType } from '../types'
import { weeksTicks } from './datetime'
export default function CandleStickChartDataset(dataset: StockAPIType) {
    const { company, history } = dataset
    const PriceMargin = 10
    let yMin = Infinity,
        yMax = -Infinity
    let xDomain: Date[] = []
    history.forEach((data: YFinanceStockDatasetType) => {
        data.date = new Date(data.date)
        xDomain.push(data.date)
        yMin = Math.min(data.low, yMin)
        yMax = Math.max(data.high, yMax)
    })
    const datetimes = history.map((data: YFinanceStockDatasetType) => data.date)
    const xTicks = weeksTicks(datetimes, 4)

    return {
        company,
        history,
        xDomain: xDomain,
        yDomain: [0, yMax + PriceMargin],
        xTicks: xTicks
    }
}
