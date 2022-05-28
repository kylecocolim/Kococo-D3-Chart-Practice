import '../styles/ChartContainer.css'
import React, { useEffect } from 'react'

type ChartContainerType = {
    title: string
    children: React.ReactNode
}

export default function ChartContainer({ title, children }: ChartContainerType) {
    return (
        <section className="chart-container">
            <h1 className="chart-title">{title}</h1>
            {children}
        </section>
    )
}
