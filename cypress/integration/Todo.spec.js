describe('Todo Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/todo')
    })

    // ===== LOGIN ======
    it('login should not work because username is too short', () => {

        cy.get('input[name=username]').type('ab')
        cy.get('input[name=password]').type('MyPassword1')

        cy.get('button').last().click()

        cy.get('div .mantine-TextInput-error').contains('at least 3 characters')
    })

    it('login should not work because username is too long', () => {

        cy.get('input[name=username]').type('MyTooLongUsernameForThisTest')
        cy.get('input[name=password]').type('MyPassword1')

        cy.get('button').last().click()

        cy.get('div .mantine-TextInput-error').contains('less than 20 characters')
    })

    it('login should not work because username contains invalid characters', () => {
        cy.get('input[name=username]').type('Invalid&Username')
        cy.get('input[name=password]').type('MyPassword1')

        cy.get('button').last().click()

        cy.get('div .mantine-TextInput-error').contains('only contain letters')
    })

    it('login should not work because password is too short', () => {

        cy.get('input[name=username]').type('MyUsername')
        cy.get('input[name=password]').type('p1')

        cy.get('button').last().click()

        cy.get('div .mantine-PasswordInput-error').contains('at least 3 characters')
    })

    it('login should not work because password is too long', () => {

        cy.get('input[name=username]').type('MyUsername')
        cy.get('input[name=password]').type('MyTooLongPasswordForThisTest11111')

        cy.get('button').last().click()

        cy.get('div .mantine-PasswordInput-error').contains('less than 30 characters')
    })

    it('login should not work because password does not contain a number', () => {

        cy.get('input[name=username]').type('MyUsername')
        cy.get('input[name=password]').type('MyPassword')

        cy.get('button').last().click()

        cy.get('div .mantine-PasswordInput-error').contains('at least one number')
    })

    it('login should fill out form correctly', () => {
        cy.get('input[name=username]').type('MyName')
        cy.get('input[name=password]').type('MyPassword1')

        cy.get('button').last().click()

        cy.wait(2000)

        cy.get('h1').contains('TODO')
    })

    // ===== TODO ======

    it('todo should be empty', () => {
        cy.get('h1').contains('TODO')

        cy.get('.mantine-Stack-root').children().should('have.length', 0)
    })

    it('todo should add a new item', () => {
        cy.get('button').first().click()

        cy.get('.mantine-Stack-root').children().should('have.length', 1)

        cy.get('input').first().clear().type('MyFirstTodo{enter}')
    })

    it('todo should have one item', () => {
        cy.get('.mantine-Stack-root').children().should('have.length', 1)
    })

    it('todo should remove item', () => {
        cy.get('input').first().clear().type('{enter}')

        cy.get('.mantine-Stack-root').children().should('have.length', 0)
    })
})