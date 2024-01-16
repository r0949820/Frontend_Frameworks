import {FunctionComponent} from 'react'
import ICategory from '../../../models/ICategory.ts'
import Filter from './filter.tsx'

interface FilterBarProps {
    categories: ICategory[]
    toggleOption: (categoryId: string, optionId: string) => void
}

const FilterBar: FunctionComponent<FilterBarProps> = ({categories,toggleOption}) => {

    return (
        <>
            {categories.map(c => <Filter { ... c} key={c.id} toggleOption={toggleOption}/>)}
        </>
    )
}

export default FilterBar