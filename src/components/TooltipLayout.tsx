import { useState, useRef, useCallback } from 'react'
import _ from 'lodash'
type TooltipLayoutType = {
    svg: React.RefObject<SVGSVGElement>
    xScale: any
    yScale: any
    dataset: any
    children: React.ReactNode
}

export default function TooltipLayout({ svg, xScale, yScale, dataset, children }: TooltipLayoutType) {
    //@TODO Development Using React.Portal and Responsive Tooltip and Custom ToolTip Position and DataSelector
    const [displayData, setDisplayData] = useState<any>()
    const toolTipRef = useRef<HTMLDivElement>(null)
    function getCurrentPosition(event: React.MouseEvent<HTMLElement>): { x: number; y: number } {
        let x = 0,
            y = 0
        if (!svg.current) return { x, y }
        const startX = xScale(xScale.domain()[0])
        const startY = yScale(yScale.domain()[0])
        const { clientX, clientY } = event
        const { left, top } = svg.current.getBoundingClientRect()
        x = clientX - left - startX
        y = clientY - top
        return { x, y }
    }
    function tooltipStyle() {
        if (toolTipRef.current) {
            Object.assign(toolTipRef.current.style, {
                position: 'absolute',
                top: 0,
                left: 0,
                visibility: 'hidden',
                transition: 'transform .1s',
            })
        }
    }
    function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
        if (!svg.current || !toolTipRef.current) return
        const { x, y } = getCurrentPosition(event)
        if (x > 0) {
            const { val, index } = xScale.invert(x)
            if (index >= dataset.length - 1) {
                setDisplayData(null)
                return
            }
            const { high } = dataset.history[index]
            const left = window.innerWidth - x > 300 ? x + 60 : x - 220
            Object.assign(toolTipRef.current.style, {
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate(${left}px, ${yScale(high)}px)`,
                visibility: 'visible',
                transition: 'transform .1s',
            })
            setDisplayData(dataset.history[index])
        } else {
            Object.assign(toolTipRef.current.style, {
                position: 'absolute',
                top: 0,
                left: 0,
                visibility: 'hidden',
                transition: 'transform .1s',
            })
            setDisplayData(null)
        }
    }
    return (
        <section
            onMouseMove={_.throttle((event) => {
                handleMouseMove(event)
            }, 100)}
            onMouseLeave={(event) => {
                tooltipStyle()
            }}
        >
            <div ref={toolTipRef} className="tooltip">
                {displayData &&
                    Object.keys(displayData).map((key) => {
                        let value = displayData[key]
                        if (key === 'date') {
                            value = value.toLocaleDateString('kr-ke')
                        }
                        return (
                            <div key={key}>
                                {key} : {value}
                            </div>
                        )
                    })}
            </div>
            {children}
        </section>
    )
}
