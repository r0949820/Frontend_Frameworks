import Exercise from './exercise/exercise.tsx'
import ExerciseOne from './exerciseOne/exerciseOne.tsx'
import ExerciseTwo from './exerciseTwo/exerciseTwo.tsx'
import ExerciseThree from './exerciseThree/exerciseThree.tsx'
import ExerciseFour from './exerciseFour/exerciseFour.tsx'
import ExerciseFive from './exerciseFive/exerciseFive.tsx'
import ExerciseSix from './exerciseSix/exerciseSix.tsx'
import ExerciseSeven from './exerciseSeven/exerciseSeven.tsx'
//import ExerciseEight from './exerciseEight/exerciseEight.tsx'
//import ExerciseNine from './exerciseNine/exerciseNine.tsx'
import {FunctionComponent, ReactNode, useState} from 'react'
import OpenCloseBtn from './exercise/openCloseBtn.tsx'

interface ExerciseData {
    title: string
    children: ReactNode
}

const exercises: ExerciseData[] = [
    {title: 'Exercise 1: Multiplication Table', children: <ExerciseOne/>},
    {title: 'Exercise 2: Rater', children: <ExerciseTwo/>},
    {title: 'Exercise 3: Progressbar', children: <ExerciseThree/>},
    {title: 'Exercise 4: Number grid', children: <ExerciseFour/>},
    {title: 'Exercise 5: Comment Card', children: <ExerciseFive/>},
    {title: 'Exercise 6: Calculator', children: <ExerciseSix/>},
    {title: 'Exercise 7: BMI Calculator', children: <ExerciseSeven/>},
    //{title: 'Exercise 8: Carousel', children: <ExerciseEight/>},
    //{title: 'Exercise 9: Tabs', children: <ExerciseNine/>},
]

const App: FunctionComponent = () => {
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
