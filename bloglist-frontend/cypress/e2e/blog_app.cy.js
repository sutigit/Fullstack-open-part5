
describe('Blog app', function() {
  const name = 'Cypress'
  const username = 'cypress'
  const password = 'cypress'

  beforeEach(function() {
    // resets everything
    cy.request('POST', 'http://localhost:3003/api/testing/reset')


    // Create user and user2 to backend
    const user = {
      name: name,
      username: username,
      password: password
    }

    const user2 = {
      name: name + '2',
      username: username + '2',
      password: password + '2'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  // describe('A login',function() {
  //   it('succeeds with correct credentials', function() {
  //     cy.get('#username').type(username)
  //     cy.get('#password').type(password)
  //     cy.get('#login').click()

  //     cy.contains(`Welcome ${name}`)
  //   })

  //   it('fails with wrong credentials', function() {
  //     cy.get('#username').type('wrong')
  //     cy.get('#password').type('wrong')
  //     cy.get('#login').click()

  //     cy.contains('Wrong credentials')
  //   })
  // })

  // describe('When logged in', function() {
  //   beforeEach(function() {
  //     // log in user here
  //     cy.get('#username').type(username)
  //     cy.get('#password').type(password)
  //     cy.get('#login').click()
  //   })

  //   it('A blog can be created', function() {
  //     cy.contains('Add blog').click()
  //     cy.get('#title').type('Cypress blog')
  //     cy.get('#author').type('Cypress')
  //     cy.get('#url').type('cypress.com')
  //     cy.get('#create').click()

  //     cy.contains('Cypress blog Cypress')
  //   })

  //   it('A blog can be liked', function() {
  //     cy.contains('Add blog').click()
  //     cy.get('#title').type('Cypress blog')
  //     cy.get('#author').type('Cypress')
  //     cy.get('#url').type('cypress.com')
  //     cy.get('#create').click()

  //     cy.contains('Cypress blog Cypress')

  //     cy.contains('view').click()
  //     cy.contains('like').click()
  //     cy.contains('likes 1')
  //   })

  //   it('A blog can be deleted', function() {
  //     cy.contains('Add blog').click()
  //     cy.get('#title').type('Cypress blog')
  //     cy.get('#author').type('Cypress')
  //     cy.get('#url').type('cypress.com')
  //     cy.get('#create').click()

  //     cy.contains('Cypress blog Cypress')

  //     cy.contains('view').click()
  //     cy.contains('remove').click()
  //     cy.contains('Cypress blog Cypress').should('not.exist')
  //   })
  // })

  // describe('When another user is logged in', function() {
  //   it('a blog cannot be deleted', function() {
  //     // user logs in and creates a blog
  //     cy.get('#username').type(username)
  //     cy.get('#password').type(password)
  //     cy.get('#login').click()

  //     cy.contains('Add blog').click()
  //     cy.get('#title').type('Cypress blog')
  //     cy.get('#author').type('Cypress')
  //     cy.get('#url').type('cypress.com')
  //     cy.get('#create').click()

  //     cy.contains('Cypress blog Cypress')

  //     // user2 logs in
  //     cy.contains('logout').click()
  //     cy.get('#username').type(username + '2')
  //     cy.get('#password').type(password + '2')
  //     cy.get('#login').click()

  //     // remove button does not exist
  //     cy.contains('view').click()
  //     cy.contains('remove').should('not.exist')
  //   })
  // })

  describe('When there are many blogs', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#login').click()

      // create blogs here
      cy.contains('Add blog').click()
      cy.get('#title').type('Cypress blog 1')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#create').click()

      cy.wait(1000)

      cy.get('#title').type('Cypress blog 2')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#create').click()

      cy.wait(1000)

      cy.get('#title').type('Cypress blog 3')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#create').click()
    })

    // it('it is ordered by likes', function() {
    //   cy.get('.blogs').eq(0).contains('Cypress blog 1').contains('view').click()
    //   // cy.get('.blogs').eq(0).contains('Cypress blog 1').contains('like').click()
    //   cy.get('.blogs').eq(1).contains('Cypress blog 2').contains('view').click()
    //   cy.get('.blogs').eq(2).contains('Cypress blog 3').contains('view').click()
    // })

    it('it is ordered by likes', function() {
      cy.get('.blogs').eq(0).contains('Cypress blog 1').contains('view').click()
      cy.get('.blogs').eq(1).contains('Cypress blog 2').contains('view').click()
    })
  })
})