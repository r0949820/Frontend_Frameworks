import {FunctionComponent} from 'react'

const translate: Record<number, string> = {
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
}


interface HeaderProps {
table: number
}

const Header: FunctionComponent<HeaderProps> = ({table}) => {
    return (
        <div className="header">
            {translate[table]}
        </div>
    )
}

export default Header