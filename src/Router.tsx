import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import CandleStickChart from './pages/CandleStickChart'
import NotFound from './pages/NotFound'
export default function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/candle" element={<CandleStickChart />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </HashRouter>
    )
}
