/// <reference types="cypress" />

context('Caesar component', () => {
    beforeEach(() => {
        cy.visit('../../components/caesar/index.html');
    });

    it('A shoud display B', () => {
        cy.get('[data-cy=cypher-key]').clear()
        cy.get('[data-cy=cypher-key]').type('1')
        cy.get('[data-cy=cypher-msg]').type('A')
        cy.get('[data-cy=cypher-btn]').click()

        cy.get('[data-cy=cypher-result]').should('have.text', 'B')
    });

    it('a shoud display b', () => {
        cy.get('[data-cy=cypher-key]').clear()
        cy.get('[data-cy=cypher-key]').type('1')
        cy.get('[data-cy=cypher-msg]').type('a')
        cy.get('[data-cy=cypher-btn]').click()

        cy.get('[data-cy=cypher-result]').should('have.text', 'b')
    });
})