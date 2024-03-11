/// <reference types="cypress" />

describe('lightbox', () => {

    beforeEach(() => {
        cy.visit('../../components/lightbox.html')
    })

    // 1
    it('should open lightbox, click on image', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').should('be.visible');
    });

    // 2
    it('should close lightbox, click away from image', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.get('body').click(0, 0);
        cy.dataCy('lightbox').should('not.be.visible');
    });

    // 3
    it('should add a like and update counters', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('unliked-svg').click();

        // SVG: Icon switch
        cy.dataCy('unliked-svg').should('not.be.visible');
        cy.dataCy('liked-svg').should('be.visible');

        // Counter
        cy.dataCy('like-count').should('have.text', 1);

        // Overlay counter
        cy.get('body').click(0, 0);
        // cy.dataCy('lightbox-overlay').trigger('mouseover');
        cy.dataCy('overlay-like-count').should('have.text', 1)
    });

    // 4
    it('should add, then delete a like and update counters', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('unliked-svg').click();
        cy.dataCy('liked-svg').click();

        // Checking the switch of SVG icon
        cy.dataCy('liked-svg').should('not.be.visible');
        cy.dataCy('unliked-svg').should('be.visible');

        // Counter
        cy.dataCy('like-count').should('have.text', 0);

        // Overlay counter
        cy.get('body').click(0, 0);
        // cy.dataCy('lightbox-overlay').trigger('mouseover');
        cy.dataCy('overlay-like-count').should('have.text', 0)
    });

    // 5
    it('should add the comment Awesome!', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('comment-input').type('Awesome!');
        cy.dataCy('comment-publish').click();

        // Check added comment
        cy.dataCy('comment-body-0').should('have.text', 'Awesome!');
        cy.dataCy('comment-author-0').should('have.text', 'johndoe');

        // Counter
        cy.dataCy('comment-sentence').should('have.text', 'Hide 1 comment');

        // Overlay counter
        cy.get('body').click(0, 0);
        // cy.dataCy('lightbox-overlay').trigger('mouseover');
        cy.dataCy('overlay-comment-count').should('have.text', 1)
    });
    
    // 6
    it('should not add an empty comment, publish button disabled', () => {
        cy.dataCy('lightbox-overlay').click();
        // cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('comment-publish').should('be.disabled');
    });

    // 7
    it('should hide all comments, comment-sentence', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('comment-input').type('Awesome!');
        cy.dataCy('comment-publish').click();

        // Hide all comments sentence
        cy.dataCy('comment-sentence').click();

        // Comments not visible...
        cy.dataCy('comment-body-0').should('not.be.visible', 'Awesome!');
        cy.dataCy('comment-author-0').should('not.be.visible', 'johndoe');
    });
    
    
    // 8
    it('should add a comment and update counters', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('comment-input').type('Awesome!');
        cy.dataCy('comment-publish').click();

        cy.dataCy('comment-sentence').should('have.text', 'Hide 1 comment');
        
        // Overlay counter
        cy.get('body').click(0, 0);
        // cy.dataCy('lightbox-overlay').trigger('mouseover');
        cy.dataCy('overlay-comment-count').should('have.text', 1)
    });

    // 9
    it('should add multiple comments and check sentence plural', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        
        // Comment 1
        cy.dataCy('comment-input').type('Awesome!');
        cy.dataCy('comment-publish').click();

        cy.dataCy('comment-sentence').should('have.text', 'Hide 1 comment');
        cy.dataCy('comment-sentence').click();
        cy.dataCy('comment-sentence').should('have.text', 'Show 1 comment');

        // Comment 2
        cy.dataCy('comment-input').clear().type('Magic!');
        cy.dataCy('comment-publish').click();

        cy.dataCy('comment-sentence').should('have.text', 'Hide 2 comments');
        cy.dataCy('comment-sentence').click();
        cy.dataCy('comment-sentence').should('have.text', 'Show 2 comments');
        
        // Overlay counter
        cy.get('body').click(0, 0);
        // cy.dataCy('lightbox-overlay').trigger('mouseover');
        cy.dataCy('overlay-comment-count').should('have.text', 2)
    });

    // 10
    it('should add and delete a comment', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        
        // Comment 1
        cy.dataCy('comment-input').type('Awesome!');
        cy.dataCy('comment-publish').click();

        // Comment 2
        cy.dataCy('comment-input').clear().type('Magic!');
        cy.dataCy('comment-publish').click();

        // Comment 3
        cy.dataCy('comment-input').clear().type('Damn!');
        cy.dataCy('comment-publish').click();

        // Delete Comment 2
        cy.dataCy('delete-comment-svg-1').click();
    });

    // --

});