describe("Newletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it('allows users to subscribe to the email list', () => {
    cy.getByData('email-input').type('tom@aol.com')
    cy.getByData("submit-button").click()
    cy.getByData('success-message').should("exist").contains("tom@aol.com")
  });
})