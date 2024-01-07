import styled from 'styled-components'
import {FunctionComponent, useState} from 'react'

const Calculator = styled.div`
  padding: 1.5em 2em;
  background-color: #00ace6;
  max-width: 21em;
  border-radius: 10px;
  text-align: left;
  margin-top: 2em;
`

const CalculatorButton = styled.button`
  font-family: Verdana, serif;
  font-size: 2rem;
  margin: .25em;
  font-weight: bold;
  background-color: #CCCCCC;
  color: white;
  border-radius: 5px;
  width: 3em;
  height: 2em;
  display: inline-block;
  text-align: center;
  line-height: 2em;

  &.equals {
    /* Style for the = button */
    width: 6.50em; /* Double the width to span two button sizes */
  }
`

const CalculatorScreen = styled.div`
  font-family: Verdana, serif;
  color: white;
  font-size: 2em;
  min-height: 2em;
`

const buttons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'C', '0', 'Del', '+', '-', '*', '/', '=']

const ExerciseSix: FunctionComponent = () => {
    const [screen, setScreen] = useState<string>('')
    const [operator, setOperator] = useState<string>('')

    const buttonHandler = (button: string) => {
        if (button == 'C') {
            setScreen('')
            setOperator('')
        } else if (button == 'Del') {
            setScreen(old => old.slice(0, old.length - 1))
        } else if (button == '=') {
            if (operator) {
                const result = calculateResult()
                setScreen(result.toString())
                setOperator('')
            }
        } else if (['+', '-', '*', '/'].includes(button)) {
            if (operator) {
                setOperator(button)
            } else {
                setOperator(button)
                setScreen((old) => old + button)
            }
        } else {
            setScreen((old) => old + button)
        }
    }

    const calculateResult = () => {
        const [input1, input2] = screen.split(operator)
        switch (operator) {
            case '+':
                return parseFloat(input1) + parseFloat(input2)
            case '-':
                return parseFloat(input1) - parseFloat(input2)
            case '*':
                return parseFloat(input1) * parseFloat(input2)
            case '/':
                return parseFloat(input1) / parseFloat(input2)
            default:
                return 'Error'
        }
    }

    return (
        <Calculator>
            <CalculatorScreen>
                {screen}
            </CalculatorScreen>
            {buttons.map(b => <CalculatorButton key={b} onClick={() => buttonHandler(b)} className={b === '=' ? 'equals' : ''}>{b}</CalculatorButton>)}
        </Calculator>
    )
}

export default ExerciseSix
