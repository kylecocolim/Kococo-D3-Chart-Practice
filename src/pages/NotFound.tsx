import { useNavigate } from 'react-router-dom'
export default function NotFound() {
    const navigate = useNavigate()
    return (
        <main className="page-not-found">
            <h1>Page Not Found</h1>
            <a
                onClick={() => {
                    navigate(-1)
                }}
            >
                Turn back ⬅️
            </a>
        </main>
    )
}
