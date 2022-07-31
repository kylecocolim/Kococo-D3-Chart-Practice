import * as d3 from 'd3'
export const weeksTicks = (dataset: Date[], stride: number) => {
    const min = d3.min(dataset), max = d3.max(dataset)
    let ticks
    if (min && max) {
        ticks = d3.utcFriday.every(stride)?.range(min, max)
    }
    return ticks
}
export const weekdays = (start: Date, stop: Date) => d3.utcDays(start, stop).filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6);