import './App.css'
import {BrowserRouter} from 'react-router-dom'
import Routing from './routing/routing.tsx'
import Navigation from './routing/navigation.tsx'
import {Container} from 'react-bootstrap'

function App() {


  return (
    <BrowserRouter>
      <Navigation/>
      <Container className="mt-5">
        <Routing/>
      </Container>
    </BrowserRouter>
  )
}

export default App
