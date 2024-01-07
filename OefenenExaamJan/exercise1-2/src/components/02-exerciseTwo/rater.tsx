import {FunctionComponent, ReactNode} from 'react'
import Star from './star.tsx'
import Label from './label.tsx'

interface RaterProps {
    rating: number;
    max:number;
}



const Rater: FunctionComponent<RaterProps> = ({rating, max}) => {
    const output: ReactNode[] = []
    for (let i = 0; i <= max; i++) {
        output.push(<Star key={i} full={i <= rating}/>)
    }

    return (
        <div className="rater">
            <Label score={rating/max}/>
            {output}
        </div>
    )
}

export default Rater