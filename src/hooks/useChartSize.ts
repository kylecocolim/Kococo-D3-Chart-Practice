import React, { useEffect, useState } from "react";

export default function useChartSize(svgRef: React.RefObject<SVGSVGElement>) {
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    function computeSVGSize() {
        if (svgRef.current) {
            const { width, height } = svgRef.current.getBoundingClientRect()
            setWidth(width)
            setHeight(height)
        }
    }
    useEffect(() => {
        if (svgRef.current) {
            computeSVGSize()
            window.addEventListener('resize', () => {
                computeSVGSize()
            })
            return window.removeEventListener('resize', () => {
                computeSVGSize()
            })
        }
    }, [svgRef])
    return {
        width, height
    }
}