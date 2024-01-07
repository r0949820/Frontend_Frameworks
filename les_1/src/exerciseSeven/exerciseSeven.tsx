import styled from 'styled-components'
import {FunctionComponent} from 'react'

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
    return (
        <>
        </>
    )
}

export default ExerciseSeven
