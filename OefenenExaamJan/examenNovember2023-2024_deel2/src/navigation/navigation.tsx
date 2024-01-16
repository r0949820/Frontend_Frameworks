import {FunctionComponent, useContext, useState} from 'react'
import LanguageContext from '../context/languageContext.tsx'
import {NavLink} from 'react-router-dom'
import {useGetUser, useLogin, useLogout} from '../api/userApi.ts'

interface NavigationProps {

}

const Navigation: FunctionComponent<NavigationProps> = () => {
    const {language, setLanguage} = useContext(LanguageContext)
    const {data: user} = useGetUser()
    const {mutate: login} = useLogin()
    const {mutate: logout} = useLogout()
    const [email, setEmail] = useState<string>('')

    const loginForm = (
        <div>
            <input value={email} onChange={evt => setEmail(evt.target.value)} placeholder="Username"/>
            <button onClick={() => login({email, password: ''})}>login</button>
        </div>
    )

    const welcome = (
        <div>
            Welcome {user?.email} (<button onClick={() => logout()}>logout</button>)
        </div>
    )

    return (
        <div className={'navbar'}>
            <ul>
                <li>
                    <NavLink to="/">{language === 'en' ? 'My surveys' : 'Mijn vragenlijsten'}</NavLink>
                </li>
                <li>
                    {user ? welcome : loginForm}
                    <button onClick={() => setLanguage('en')} data-cy="english"
                            className={language === 'en' ? 'selected language' : 'language'}>
                        English
                    </button>
                    |
                    <button onClick={() => setLanguage('nl')} data-cy="dutch"
                            className={language === 'nl' ? 'selected language' : 'language'}>
                        Nederlands
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Navigation
