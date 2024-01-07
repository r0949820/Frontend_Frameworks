import {ChangeEvent, startTransition, useRef, useState} from 'react'

interface UseIsEditingOptions {
    defaultValue?: string
    debounceTime?: number
}


type UseIsEditingResult = [string, ((newValue: string | ChangeEvent<HTMLInputElement>) => void), boolean]

/**
 * A hook that keeps track of whether a user is editing a form.
 *
 * @param defaultValue The text that should be visible in the form before the user changed anything, defaults to an
 * empty string.
 * @param debounceTime The number of milliseconds to wait before the isEditing variable will be set to false, defaults
 * to 250ms.
 */
const useIsEditing = ({defaultValue, debounceTime}: UseIsEditingOptions): UseIsEditingResult  => {
    const [value, setValue] = useState(defaultValue ?? '')
    const [isEditing, setIsEditing] = useState(false)

    const timeoutId = useRef<number | null>(null)

    const timeoutFinishedHandler = () => {
        startTransition(() => setIsEditing(false))
        timeoutId.current = null
    }

    const updateValue = (param: string | ChangeEvent<HTMLInputElement>): void => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }

        const textValue = typeof(param) === 'string' ? param : (param as ChangeEvent<HTMLInputElement>).currentTarget.value

        setValue(textValue)

        setIsEditing(true)
        timeoutId.current = window.setTimeout(timeoutFinishedHandler, debounceTime ?? 250)
    }

    return [
        value,
        updateValue,
        isEditing,
    ]
}

export default useIsEditing
