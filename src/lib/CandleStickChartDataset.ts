import { YFinanceStockDatasetType } from '../types'
export default function CandleStickChartDataset(dataset: YFinanceStockDatasetType[]) {
    let yMin = Infinity,
        yMax = -Infinity
    let xDomain = []
    dataset.forEach((data: YFinanceStockDatasetType) => {
        xDomain.push(data.Date)
        yMin = Math.min(data.Low, yMin)
        yMax = Math.max(data.High, yMax)
    })
    return {
        dataset: dataset,
        xDomain: xDomain,
        yDomain: [yMin, yMax],
    }
}
