import {ChangeEventHandler, FunctionComponent} from 'react'

interface SliderProps {
    min: number
    max: number
    value: number
    changeHandler: ChangeEventHandler<HTMLInputElement>
}

const Slider: FunctionComponent<SliderProps> = ({min, max, value, changeHandler}) => {
    return (
        <>
            <input type="range" value={value} min={min} max={max} onChange={changeHandler}/>
        </>
    )
}

export default Slider