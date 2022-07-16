import { YFinanceStockDatasetType } from '../types'
import { weeksTicks } from './datetime'
export default function CandleStickChartDataset(dataset: YFinanceStockDatasetType[]) {
    const PriceMargin = 10
    let yMin = Infinity,
        yMax = -Infinity
    let xDomain: Date[] = []
    dataset.forEach((data: YFinanceStockDatasetType) => {
        Object.assign(data, {
            Date: new Date(data.Date)
        })
        xDomain.push(data.Date)
        yMin = Math.min(data.Low, yMin)
        yMax = Math.max(data.High, yMax)
    })
    const datetimes = dataset.map((data: YFinanceStockDatasetType) => data.Date)
    const xTicks = weeksTicks(datetimes, 4)
    return {
        dataset: dataset,
        xDomain: xDomain,
        yDomain: [0, yMax + PriceMargin],
        xTicks: xTicks
    }
}
