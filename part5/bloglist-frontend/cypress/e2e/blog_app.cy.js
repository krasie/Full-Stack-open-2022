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

  it('login fails with wrong password', function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-btn').click()

    cy.contains('username or password is incorrect')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-btn').click()

    cy.contains('success')
  })
})