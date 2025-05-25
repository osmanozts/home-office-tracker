"use client"

import { useEffect, useState } from "react"

interface Props {
    start: string
}

export function ElapsedTimer({ start }: Props) {
    const [seconds, setSeconds] = useState<number>(0)

    useEffect(() => {
        const startDate = new Date(start)

        const update = () => {
            const now = new Date()
            const diff = Math.floor((now.getTime() - startDate.getTime()) / 1000)
            setSeconds(diff)
        }

        update()
        const interval = setInterval(update, 1000)

        return () => clearInterval(interval)
    }, [start])

    const formatTime = (s: number) => {
        const hours = Math.floor(s / 3600)
        const minutes = Math.floor((s % 3600) / 60)
        const seconds = s % 60
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }

    const pad = (n: number) => (n < 10 ? `0${n}` : n)

    return <strong>{formatTime(seconds)}</strong>
}
