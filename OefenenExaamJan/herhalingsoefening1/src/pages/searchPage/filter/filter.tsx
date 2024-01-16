import {FunctionComponent, useState} from 'react'
import ICategory from '../../../models/ICategory.ts'
import FilterItem from './filterItem.tsx'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'

const FilterContainer = styled.div`
    margin-bottom: 1em;
`

const TitleBtn = styled.button`
    background: unset;
    border: unset;
`


interface FilterProps extends ICategory{
    toggleOption: (categoryId: string, optionId: string) => void
}

const Filter: FunctionComponent<FilterProps> = ({id, name, options, toggleOption}) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <FilterContainer>
            <TitleBtn onClick={() => setIsOpen(x => !x)}>
                <FontAwesomeIcon icon={isOpen ? faCaretDown: faCaretUp}/>{name}
            </TitleBtn>
            {isOpen && options.map(o => <FilterItem {...o} key={o.id} toggleIsChecked={() => toggleOption(id, o.id)}/>)}
        </FilterContainer>
    )
}

export default Filter