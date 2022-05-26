describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })

    it('should not work because username is too short', () => {

        cy.get('input[name=username]').type('ab')
        cy.get('input[name=password]').type('MyPassword1')

        cy.get('button').last().click()

        cy.get('div .mantine-TextInput-error').contains('at least 3 characters')
    })

    it('should not work because username is too long', () => {

        cy.get('input[name=username]').type('MyTooLongUsernameForThisTest')
        cy.get('input[name=password]').type('MyPassword1')

        cy.get('button').last().click()

        cy.get('div .mantine-TextInput-error').contains('less than 20 characters')
    })

    it('should not work because username contains invalid characters', () => {
        cy.get('input[name=username]').type('Invalid&Username')
        cy.get('input[name=password]').type('MyPassword1')

        cy.get('button').last().click()

        cy.get('div .mantine-TextInput-error').contains('only contain letters')
    })

    it('should not work because password is too short', () => {

        cy.get('input[name=username]').type('MyUsername')
        cy.get('input[name=password]').type('p1')

        cy.get('button').last().click()

        cy.get('div .mantine-PasswordInput-error').contains('at least 3 characters')
    })

    it('should not work because password is too long', () => {

        cy.get('input[name=username]').type('MyUsername')
        cy.get('input[name=password]').type('MyTooLongPasswordForThisTest11111')

        cy.get('button').last().click()

        cy.get('div .mantine-PasswordInput-error').contains('less than 30 characters')
    })

    it('should not work because password does not contain a number', () => {

        cy.get('input[name=username]').type('MyUsername')
        cy.get('input[name=password]').type('MyPassword')

        cy.get('button').last().click()

        cy.get('div .mantine-PasswordInput-error').contains('at least one number')
    })

    it('should fill out form correctly', () => {
        cy.get('input[name=username]').type('MyName')
        cy.get('input[name=password]').type('MyPassword1')

        cy.get('button').last().click()

        cy.wait(2000)

        cy.get('h1').contains('logged in')
    })
})