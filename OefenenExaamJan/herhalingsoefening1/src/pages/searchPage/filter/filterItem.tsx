import {FunctionComponent} from 'react'
import IOption from '../../../models/IOption.ts'

interface FilterItemProps extends IOption{
    toggleIsChecked: () => void
}

const FilterItem: FunctionComponent<FilterItemProps> = ({name, isChecked, isRecommended, id, toggleIsChecked}) => {
    return (
        <>
                <div className="">
                    <input type="checkbox" className="" checked={isChecked} id={id} onChange={toggleIsChecked}/>
                    <label className="text-sm" htmlFor={id}>{name}</label>
                    {isRecommended && <span className="text-success">&nbsp; Aanbevolen</span>}
                </div>
        </>
    )
}

export default FilterItem