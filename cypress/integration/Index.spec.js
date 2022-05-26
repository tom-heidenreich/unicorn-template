describe('Welcome Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should have a title', () => {
        cy.get('#welcome-title').contains('Welcome')
    })

    it('should have link to mantine', () => {
        cy.get('a').first().should('have.attr', 'href', 'https://mantine.dev/theming/next/')
    })

    it('should have link to login example page', () => {
        cy.get('a').eq(1).should('have.attr', 'href', '/login')
    })

    it('should have link to api docs page', () => {
        cy.get('a').last().should('have.attr', 'href', '/docs/api')
    })
})