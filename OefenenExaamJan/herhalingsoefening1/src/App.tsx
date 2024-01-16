import {BrowserRouter} from 'react-router-dom'
import Navigation from './navigation/navigation.tsx'
import Routing from './navigation/routing.tsx'


function App() {


  return (
    <BrowserRouter>
        <Navigation/>
        <Routing/>
    </BrowserRouter>
  )
}

export default App
