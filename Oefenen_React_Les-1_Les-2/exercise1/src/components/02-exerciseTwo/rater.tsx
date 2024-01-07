import {FunctionComponent, ReactNode} from 'react'
import Label from './label.tsx'
import Star from './star.tsx'

interface RaterProps {
    rating: number
    max: number
}

const Rater: FunctionComponent<RaterProps> = ({rating,max}) => {
    const output: ReactNode[] = []
    for (let i = 1; i <= max; i++) {
        output.push(<Star full={i <= rating} key={i}/>)
    }

    return (
        <>
            <div className='rater'>
                <Label score={rating/max}/>
                {output}
            </div>
        </>
    )
}

export default Rater