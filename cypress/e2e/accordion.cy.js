/// <reference types="cypress" />

context('Component accordion', () => {
    beforeEach(() => {
        cy.visit('../../components/accordion.html');
    })

    it('shows then hides first lesson on click', () => {
        // Show content
        cy.dataCy('first-lesson').click()

        cy.get('[data-cy=first-lesson-content]').should('be.visible')
        cy.get('[data-cy=first-lesson-arrow]').should('have.class', 'rotate-90')

        // Hide content
        cy.get('[data-cy=first-lesson]')
            .click()

        cy.get('[data-cy=first-lesson-content]').should('not.visible')
        cy.get('[data-cy=first-lesson-arrow]').should('not.have.class', 'rotate-90')
    })
})