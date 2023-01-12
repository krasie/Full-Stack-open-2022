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

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })

      it('A blog can be created', function() {
        cy.get('#new-blog').click()
        cy.get('#title').type('new title')
        cy.get('#url').type('http://localhost:1334')
        cy.get('#author').type('Ben')
        cy.get('#create-blog').click()

        cy.contains('new title')
        cy.contains('show').click()
        cy.contains('Ben')
        cy.contains('http://localhost:1334')
      })

      it('like click', function() {
        cy.createBlog({ title:'title1',author:'Ben',url:'http://localhost:1334' })
        cy.createBlog({ title:'title2',author:'Ben',url:'http://localhost:1334' })
        cy.createBlog({ title:'title3',author:'Ben',url:'http://localhost:1334' })

        cy.contains('title1').find('button').click().as('theButton')
        cy.get('@theButton').parent().parent().find('.like').click()
        cy.get('.like-num').should('contain','1')
      })

      it('delete blog', function() {
        cy.createBlog({ title:'title1',author:'Ben',url:'http://localhost:1334' })
        cy.createBlog({ title:'title2',author:'Ben',url:'http://localhost:1334' })
        cy.createBlog({ title:'title3',author:'Ben',url:'http://localhost:1334' })

        cy.visit('http://localhost:3000')

        cy.contains('title1').find('button').click().as('theButton')
        cy.get('@theButton').parent().parent().find('.del').click()
      })

    })

    
  })
})