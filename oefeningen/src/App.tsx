import Exercise from './exercise/exercise.tsx'
import ExerciseOne from './01-exerciseOne/ExerciseOne.tsx'
import ExerciseTwo from './02-exerciseTwo/exerciseTwo.tsx'
import ExerciseThree from './03-exerciseThree/exerciseThree.tsx'
import ExerciseFour from './04-exerciseFour/exerciseFour.tsx'
import ExerciseFive from './05-exerciseFive/exerciseFive.tsx'
import ExerciseSix from './06-exerciseSix/exerciseSix.tsx'
import ExerciseSeven from './07-exerciseSeven/exerciseSeven.tsx'

function App() {


    return (
        <>
            <Exercise title={'Exercise 1: Multiplication Table'}>
                <ExerciseOne/>
            </Exercise>
            <Exercise title={'Exercise 2: Rater'} background={'#77EEEE'}>
                <ExerciseTwo/>
            </Exercise>
            <Exercise title={'Exercise 3: Progressbar'}>
                <ExerciseThree/>
            </Exercise>
            <Exercise title={'Exercise 4: Number grid'} background={'#77EEEE'}>
                <ExerciseFour/>
            </Exercise>
            <Exercise title={'Exercise 5: Comment card'}>
                <ExerciseFive/>
            </Exercise>
            <Exercise title={'Exercise 6: Calculator'} background={'#77EEEE'}>
                <ExerciseSix/>
            </Exercise>
            <Exercise title={'Exercise 7: BMI Calculator'}>
                <ExerciseSeven/>
            </Exercise>
            <Exercise title={'Exercise 8: Image carousel'}>
                
            </Exercise>
        </>
    )
}

export default App
