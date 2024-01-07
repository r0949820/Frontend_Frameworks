import Exercise from './components/00-exercise/exercise.tsx'
import ExerciseOne from './components/01-exerciseOne/exerciseOne.tsx'
import ExerciseTwo from './components/02-exerciseTwo/exerciseTwo.tsx'
import ExerciseThree from './components/03-exercixeThree/exerciseThree.tsx'
import ExerciseFour from './components/04-exerciseFour/exerciseFour.tsx'
import ExerciseFive from './components/05-exerciseFive/exerciseFive.tsx'
import ExerciseSix from './components/06-exerciseSix/exerciseSix.tsx'
import ExerciseSeven from './components/07-exerciseSeven/exerciseSeven.tsx'
import ExerciseEight from './components/08-exerciseEight/exerciseEight.tsx'
import ExerciseNine from './components/09-exerciseNine/exerciseNine.tsx'
import OpenCloseBtn from './components/00-exercise/openCloseBtn.tsx'
import {ReactNode, useState} from 'react'

interface ExerciseData {
    title: string
    children: ReactNode
    background ?: string
}

const exercises: ExerciseData[] = [
    {title: 'Exercise 1: Multiplication Table', children: <ExerciseOne/>},
    {title: 'Exercise 2: Rater', children: <ExerciseTwo/>},
    {title: 'Exercise 3: Progressbar', children: <ExerciseThree/>},
    {title: 'Exercise 4: Number grid', children: <ExerciseFour/>},
    {title: 'Exercise 5: Comment Card', children: <ExerciseFive/>},
    {title: 'Exercise 6: Calculator', children: <ExerciseSix/>},
    {title: 'Exercise 7: BMI Calculator', children: <ExerciseSeven/>},
    {title: 'Exercise 8: Carousel', children: <ExerciseEight/>},
    {title: 'Exercise 9: Tabs', children: <ExerciseNine/>},
]

function App() {
    const nbExercises = exercises.length
    const [openExercises, setOpenExercises] = useState<boolean[]>(Array(nbExercises).fill(false))

    const toggleIsOpen = (i: number): void => {
        setOpenExercises(o => {
            const newArray = [...o]
            newArray[i] = !newArray[i]
            return newArray
        })
    }

  return (
    <>
        <OpenCloseBtn onClick={() => setOpenExercises(Array(nbExercises).fill(true))}>
            Open all exercises
        </OpenCloseBtn>
        <OpenCloseBtn  onClick={() => setOpenExercises(Array(nbExercises).fill(false))}>
            Close all exercises
        </OpenCloseBtn>
        {exercises.map(({title, children}, i) => (
            <Exercise title={title} key={i} toggleIsOpen={() => toggleIsOpen(i)}
                      background={i % 2 === 0 ? undefined : '#77EEEE'} isOpen={openExercises[i]}>
                {children}
            </Exercise>
        ))}
    </>
  )
}

export default App
