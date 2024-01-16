import {FunctionComponent, Suspense, useState} from 'react'
import Navigation from './navigation/navigation.tsx'
import Routing from './navigation/routing.tsx'
import LoadingPage from './utils/loadingPage.tsx'
import ViewModeContext from './context/viewModeContext.tsx'
const App: FunctionComponent = () => {
    const [viewMode, setViewMode] = useState<'user' | 'admin'>('user')


    return (
        <ViewModeContext.Provider value={{viewMode, setViewMode}}>
            <Navigation/>
            <div className="container">
                <Suspense fallback={<LoadingPage/>}>
                    <Routing/>
                </Suspense>
            </div>
        </ViewModeContext.Provider>
    )
}

export default App
