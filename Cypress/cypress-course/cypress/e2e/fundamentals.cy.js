describe('Fundamentals test', () => {
  beforeEach(() => {
    cy.visit('/fundamentals');
    // cy.wait(1000);
  });
  it('Contains correct head test', () => {
    cy.getDataTest('fundamentals-header').should('contain.text', 'Testing Fundamentals');
    // console.log(cy.getDataTest('fundamentals-header'));
    // cy.get('[data-set="fundamentals-header"]').should('contain.text', 'Testing Fundamentals');
    // cy.getDataTest('fundamentals-header').should('be.visible');
    // cy.visit('https://example.cypress.io');
    // cy.visit('/fundamentals');
    //Testing Fundamentals  data-set="fundamentals-header"
    // cy.get('[data-set="fundamentals-header"]').should('be.visible').contains(/Testing FundamentalS/i); // 大小写不敏感 Case insensitive
  });
  it('Accordion works correctly', () => {
    // cy.visit('https://example.cypress.io');
    // cy.visit('/fundamentals');
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible');
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
    cy.contains(/Your tests will exist in a describe block/i).should('be.visible');
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible');
  });
});
