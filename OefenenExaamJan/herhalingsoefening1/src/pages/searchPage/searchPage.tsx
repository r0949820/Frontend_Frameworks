import {FunctionComponent, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import FilterBar from './filter/filterBar.tsx'
import ComputerList from './computerList/computerList.tsx'
import ICategory from '../../models/ICategory.ts'
import {getCategories, getFilteredComputersWithPagination, toggleOptionSelected} from '../../api/dataApi.ts'
import PaginationWrapper from '../../utils/paginationWrapper.tsx'
import ScrollWrapper from '../../utils/scrollWrapper.tsx'



const pageSize = 6

const SearchPage: FunctionComponent = () => {
    const [categories, setCategories] = useState<ICategory[]>(getCategories())
    const [currentPage, setCurrentPage] = useState<number>(0)

    const computers = getFilteredComputersWithPagination(pageSize, currentPage)

    const toggleOption = (categoryId: string, optionId: string): void => {
        toggleOptionSelected(categoryId, optionId)
        setCategories(getCategories())
        setCurrentPage(0)
    }

    return (
            <Row className="mt-5">
                <Col xs={3}>
                    <ScrollWrapper height={85}>
                    <FilterBar categories={categories} toggleOption={toggleOption}/>
                    </ScrollWrapper>
                </Col>
                <Col xs={9}>
                    <PaginationWrapper height={75} currentPage={currentPage}
                                       setCurrentPage={setCurrentPage}
                                       numberOfPages={computers.pages}>
                        <ComputerList computers={computers.data}/>
                    </PaginationWrapper>
                </Col>
            </Row>
    )
}

export default SearchPage