import {Dispatch, FunctionComponent, PropsWithChildren, SetStateAction} from 'react'
import styled from 'styled-components'
import ScrollWrapper from './scrollWrapper.tsx'
import {Pagination} from 'react-bootstrap'

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const DataContainer = styled.div`
    flex-grow: 1;
    flex-direction: row;
    width: 100%;
    justify-content: center;

    .row {
        justify-content: center;
    }
`

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1em;
`
const StyledPageItem: typeof Pagination.Item = styled(Pagination.Item)`
  width: 2.5em;
  text-align: center;
`



interface PaginationWrapperProps extends PropsWithChildren{
    height?: number
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
    numberOfPages: number
}

const PaginationWrapper: FunctionComponent<PaginationWrapperProps> = ({
                                                                          height,
                                                                          setCurrentPage,
                                                                          currentPage,
                                                                          children,
                                                                          numberOfPages
                                                                      }) => {
    let paginationButtons: number[] = []

    for (let i = 0; i <= 4 && paginationButtons.length < 5; i++) {
        if (i === 0) {
            paginationButtons.push(currentPage)
            continue
        }

        if (currentPage - i >= 0) {
            paginationButtons = [currentPage - i, ...paginationButtons]
        }

        if (currentPage + i < numberOfPages) {
            paginationButtons.push(currentPage + i)
        }
    }

    const pagination = (
        <PaginationContainer>
            <Pagination>
                <Pagination.First onClick={() => setCurrentPage(0)}/>
                <Pagination.Prev onClick={() => setCurrentPage(x => Math.max(x - 1, 0))}/>

                {paginationButtons.map(i => (
                    <StyledPageItem active={i === currentPage}
                                    onClick={() => setCurrentPage(i)}
                                    key={i}>
                        {i + 1}
                    </StyledPageItem>
                ))}

                <Pagination.Next onClick={() => setCurrentPage(x => Math.min(x + 1, numberOfPages - 1))}/>
                <Pagination.Last onClick={() => setCurrentPage(numberOfPages - 1)}/>
            </Pagination>
        </PaginationContainer>
    )

    return (
        <FlexContainer>
            <DataContainer>
                <ScrollWrapper height={height}>
                    {children}
                </ScrollWrapper>
            </DataContainer>
            {numberOfPages > 1 && pagination}
        </FlexContainer>
    )
}

export default PaginationWrapper