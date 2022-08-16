import '../styles/ChartContainer.css'
import React from 'react'

type ChartContainerType = {
    fetchStatus?: string
    children: React.ReactNode
}

export default function ChartContainer({ fetchStatus, children }: ChartContainerType) {
    return (
        <section className="chart-container">
            {fetchStatus === 'pending' && <div>로딩중입니다.. </div>}
            {fetchStatus === 'success' && <>{children}</>}
        </section>
    )
}
