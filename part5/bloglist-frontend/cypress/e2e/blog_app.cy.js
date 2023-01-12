describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('Login form is show',() => {
    cy.visit('http://localhost:3000')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-btn')
  })

  describe('Login',function() {

    it('login fails with wrong password', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()
      cy.get('.error').should('contain', 'sername or password is incorrect')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

    })

    it('login success with correct password', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-btn').click()

      cy.contains('success')
    })
  })
})