
import ErrorMessage from './errorMessage.tsx'

describe('<ErrorMessage>', () => {

    it('Mounts', () => {
        cy.mount(<ErrorMessage />)
    })

    it('Should render its children', () => {
        const errorMessage = 'An error message'
        cy.mount(<ErrorMessage>{errorMessage}</ErrorMessage>)
        cy.get('[data-cy="error-message"]').should('have.text', errorMessage)
    })

    it('Should render nothing when there are no children', () => {
        cy.mount(<ErrorMessage></ErrorMessage>)
        cy.getByData('error-message').should('not.exist')
    })

})