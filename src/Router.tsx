import { Routes, Route, BrowserRouter } from 'react-router-dom'
import App from './App'
import Company from './pages/Company'
import NotFound from './pages/NotFound'
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/company/:ticker" element={<Company />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
