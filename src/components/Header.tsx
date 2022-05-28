import { useNavigate } from 'react-router-dom'
export default function Header() {
    const navigator = useNavigate()
    return (
        <header className="main-layout-header">
            <a
                className="header-title"
                onClick={() => {
                    navigator('/')
                }}
            >
                Kococo D3 Practice
            </a>
        </header>
    )
}
