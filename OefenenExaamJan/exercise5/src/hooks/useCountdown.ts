import {useEffect, useState} from 'react'

const getCountdownString = (countdownDate: Date): string => {
    let delta = (countdownDate.getTime() - Date.now()) / 1000

    if (delta < 0) {
        return 'DEADLINE HAS PASSED!'
    }

    const days = Math.floor(delta / (60 * 60 * 24))
    delta -= days * 60 * 60 * 24

    const hours = Math.floor(delta / (60 * 60))
    delta -= hours * 60 * 60

    const minutes = Math.floor(delta / 60)
    delta -= minutes * 60

    return `${days} Days, ${hours} Hours, ${minutes} Minutes, ${Math.round(delta)} Seconds`
}

const useCountdown = (countdownDate: Date) => {
    const [countdown, setCountdown] = useState<string>(getCountdownString(countdownDate))

    useEffect(() => {
        const intervalCountdownId = setTimeout(() => setCountdown(getCountdownString(countdownDate)), 1000)
        return () => clearInterval(intervalCountdownId)
    }, [countdownDate, countdown])

    return countdown
}

export default useCountdown
