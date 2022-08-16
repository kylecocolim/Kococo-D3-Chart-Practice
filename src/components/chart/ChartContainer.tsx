import React from 'react'

type ChartContainerType = {
    fetchStatus?: string
    validation?: boolean
    children: React.ReactNode
}

export default function ChartContainer({ fetchStatus, validation, children }: ChartContainerType) {
    return (
        <>
            <section className="chart-container">
                {fetchStatus === 'pending' && <div>로딩중입니다.. </div>}
                {!validation && fetchStatus === 'success' && <>차트데이터가 없습니다.</>}
                {validation && fetchStatus === 'success' && <>{children}</>}
            </section>
        </>
    )
}
