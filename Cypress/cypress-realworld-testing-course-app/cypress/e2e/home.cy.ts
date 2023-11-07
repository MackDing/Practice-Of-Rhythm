describe('home page', () => {
  beforeEach(function () {
    // runs before each test in this block
     cy.visit('http://localhost:3000')
  });

  context("hero sectione", () => {
    it('the hq contains the correct text', () => {
    // cy.visit('http://localhost:3000')
    // cy.get('h1').contains("Testing Next.js Applications with Cypress")
    cy.get('[data-test="hero-heading"]').contains("Testing Next.js Applications with Cypress")
  })

  it.only('the features on the homepage are correct', () => {
    // cy.visit('http://localhost:3000')
    cy.get('dt').eq(0).contains('4 Courses')
  });
})
  
  context("Courses section", () => {
    it.only('Course: Testing Your First Next.js Application', () => {
      cy.getByData('course-0').find('a').eq(3).click()
      cy.location('pathname').should('eq', '/testing-your-first-application')
    });
  })

})

