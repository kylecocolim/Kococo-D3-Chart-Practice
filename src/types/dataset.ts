
export type YFinanceStockDatasetType = {
    date: Date
    open: number
    high: number
    low: number
    close: number
    'Adj Close': number
    volume: number
}
export type CompanyType = {
    country: string
    id: number
    industry: string
    ipo_year: number
    logo: string
    name: string
    sector: string
    ticker: string
    timestamp: Date
}
export type StockAPIType = {
    history: YFinanceStockDatasetType[],
    company: CompanyType,
    xDomain: any,
    yDomain: any,
    xTicks: any,
    xTickFormat: string
}