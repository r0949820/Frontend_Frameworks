import styled from 'styled-components'
import {FunctionComponent, useState} from 'react'
import './range.css'
import Slider from './Slider.tsx'

const BmiLabel = styled.div`
  font-family: Verdana, serif;
  font-size: 20px;
`

const calculateBMI = (hoogteInCm: number, massa: number): number => {
    const hoogteInM = hoogteInCm / 100
    return Math.round(massa / (hoogteInM * hoogteInM))
}

const BMIContainer = styled.div`
  padding: 20px 40px;
  border: #333 2px dotted;
  width: 450px;
  border-radius: 10px;
  text-align: left;
  margin-top: 2em;
`

const ExerciseSeven: FunctionComponent = () => {
    const [height, setHeight] = useState<number>(173)
    const [mass, setMass] = useState<number>(80)

    return (
        <>
            <BMIContainer>
                <BmiLabel>Height: {height}</BmiLabel>
                <Slider min={90} max={210} value={height}
                        changeHandler={evt => setHeight(Number(evt.currentTarget.value))}/>

                <BmiLabel>Mass: {mass}</BmiLabel>
                <Slider min={40} max={150} value={mass}
                        changeHandler={evt => setMass(Number(evt.currentTarget.value))}/>

                <BmiLabel>BMI: {calculateBMI(height, mass)}</BmiLabel>
            </BMIContainer>
        </>
    )
}

export default ExerciseSeven
