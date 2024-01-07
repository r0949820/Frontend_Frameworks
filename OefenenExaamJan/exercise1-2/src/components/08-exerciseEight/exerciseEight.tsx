import {FunctionComponent} from 'react'
import Carousel from './carousel.tsx'
import getRandomImage from './images.ts'

interface ExerciseEightProps {

}

const ExerciseEight: FunctionComponent<ExerciseEightProps> = () => {
    return (
        <>
            <Carousel>
                <img src={getRandomImage()} alt="image1"/>
                <img src={getRandomImage()} alt="image2"/>
                <img src={getRandomImage()} alt="image3"/>
            </Carousel>
        </>
    )
}

export default ExerciseEight