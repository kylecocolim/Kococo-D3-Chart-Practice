import * as d3 from 'd3'
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
    const xTickFormat = d3.timeFormat('%Y-%m-%d')
    const xTicks = weeksTicks(datetimes, 4)
    yMin = yMin < 30 ? 0 : yMin - PriceMargin
    return {
        company,
        history,
        xDomain: xDomain,
        yDomain: [yMin, yMax + PriceMargin],
        xTicks: xTicks,
        xTickFormat
    }
}
