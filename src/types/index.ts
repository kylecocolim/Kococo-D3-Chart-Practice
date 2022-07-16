export * from './DefaultConfig'

export type LayoutType = {
    children: React.ReactNode
}
export type ChartDataType = {
    dataset: any[]
    xDomain: string[] | number[] | Date[]
    yDomain: string[] | number[] | Date[]
}
export type YFinanceStockDatasetType = {
    Date: string
    Open: number
    High: number
    Low: number
    Close: number
    'Adj Close': number
    Volume: number
}
