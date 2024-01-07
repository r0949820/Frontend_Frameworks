import Exercise from './components/00-exercise/exercise.tsx'
import ExerciseOne from './components/01-exerciseOne/exerciseOne.tsx'
import ExerciseTwo from './components/02-exerciseTwo/exerciseTwo.tsx'
import ExerciseThree from './components/03-exerciseThree/exerciseThree.tsx'
import ExerciseFour from './components/04-exerciseFour/exerciseFour.tsx'
import ExerciseFive from './components/05-exerciseFive/exerciseFive.tsx'
import ExerciseSix from './components/06-exerciseSix/exerciseSix.tsx'
import ExerciseSeven from './components/07-exerciseSeven/exerciseSeven.tsx'

function App() {

  return (
    <>
        <Exercise title='Exercise 1: Multiplication Table'>
            <ExerciseOne/>
        </Exercise>
        <Exercise title='Exercise 2: Rater' background={'#77EEEE'}>
            <ExerciseTwo/>
        </Exercise>
        <Exercise title='Exercise 3: Progressbar'>
            <ExerciseThree/>
        </Exercise>
        <Exercise title='Exercise 4: Number grid' background= {'#77EEEE'}>
            <ExerciseFour/>
        </Exercise>
        <Exercise title='Exercise 5: Comment card'>
            <ExerciseFive/>
        </Exercise>
        <Exercise title='Exercise 6: Calculator'>
            <ExerciseSix/>
        </Exercise>
        <Exercise title='Exercise 7: BMI Calculator'>
            <ExerciseSeven/>
        </Exercise>
    </>
  )
}

export default App
