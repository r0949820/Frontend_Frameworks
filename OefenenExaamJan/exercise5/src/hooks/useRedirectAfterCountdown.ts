import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

interface UseRedirectAfterCountdownParams {
    destination: string
    timeout?: number
    enabled: boolean
}

const useRedirectAfterCountdown = ({destination, timeout, enabled}: UseRedirectAfterCountdownParams): void => {
    // Use the default value when the user didn't specify a specific timeout.
    timeout = timeout ?? 2000
    const navigate = useNavigate()

    useEffect(
        () => {
            if (enabled) {
                const timeoutId = setTimeout(() => navigate(destination), timeout)
                // Any asynchronous operation that is performed in the useEffect hook must be
                // canceled through a clean-up function otherwise the user might encounter unwanted behavior or
                // weird bugs.
                return () => clearTimeout(timeoutId)
            }
        },
        // The function (first parameter) will be called after the first render and each time one of the values in the
        // dependency array changes.
        // Each variable that is used in useEffect, and isn't instantiated therein, must be added to the dependencies.
        // When no dependency array is supplied, the function will run after each render.
        // When and empty array is supplied, the function will only run after the first render.
        [enabled, navigate, timeout, destination],
    )
}

export default useRedirectAfterCountdown
