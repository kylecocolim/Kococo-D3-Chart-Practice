import { useEffect, useState } from 'react'

export function useQuery(url: string, payload: any = {}, queryFn: Function | null = null) {
    const [status, setStatus] = useState<string>('pending')
    const [errMsg, setErrMsg] = useState<string>('')
    const [dataset, setDataset] = useState<any>(null)
    async function fetchDataset() {
        let result = await fetch(url, payload)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                }
            })
            .catch((err) => {
                console.error(err)
                setStatus('error')
                setErrMsg(err)
            })
        if (queryFn) {
            result = queryFn(result)
        }
        setStatus('success')
        setDataset(result)
    }
    useEffect(() => {
        fetchDataset()
    }, [])
    return {
        status,
        errMsg,
        dataset,
    }
}
