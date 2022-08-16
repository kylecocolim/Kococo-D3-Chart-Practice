import { useEffect, useState } from 'react'
import { StockAPIType, CompanyType } from '../types'

type CompanyInfoProps = {
    dataset: StockAPIType
}
export default function CompanyInfo({ dataset }: CompanyInfoProps) {
    const [companyData, setCompanyData] = useState<CompanyType>()
    useEffect(() => {
        if (dataset && dataset.hasOwnProperty('company')) {
            setCompanyData(dataset.company)
        }
    }, [dataset])
    return (
        <div className="company-info">
            {companyData && (
                <ul>
                    <li>
                        <span className="company-name">{companyData.name}</span>
                        <span className="ticker">{companyData.ticker}</span>
                    </li>
                    <li>
                        {companyData.sector} {companyData.industry}
                    </li>
                    <li>{companyData.country}</li>
                </ul>
            )}
        </div>
    )
}
