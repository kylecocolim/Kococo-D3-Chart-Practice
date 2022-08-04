import { useState, useRef } from 'react'
type TooltipLayoutType = {
    svg: React.RefObject<SVGSVGElement>
    xScale: any
    yScale: any
    dataset: any
    children: React.ChildNode
}

export default function TooltipLayout({ svg, xScale, yScale, dataset, children }: TooltipLayoutType) {
    const [displayData, setDisplayData] = useState<any>()
    const toolTipRef = useRef<HTMLDivElement>(null)
    function handleMouseMove(event: React.MouseMove) {
        if (!svg.current) return
        const startX = xScale(xScale.domain()[0])
        const startY = yScale(yScale.domain()[0])
        const { clientX, clientY } = event
        const { left, top } = svg.current.getBoundingClientRect()
        const x = clientX - left - startX
        if (x > 0) {
            const { val, index } = xScale.invert(x)
            const { Low, High } = dataset.dataset[index]
            Object.assign(toolTipRef.current.style, {
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate(${xScale(val)}px, ${yScale(Low)}px)`,
            })
            setDisplayData(JSON.stringify(dataset.dataset[index]))
        }
    }
    return (
        <section onMouseMove={handleMouseMove}>
            {children}
            <div ref={toolTipRef} className="tooltip">
                {displayData}
            </div>
        </section>
    )
}
