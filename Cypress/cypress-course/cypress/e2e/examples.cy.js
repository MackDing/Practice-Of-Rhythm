const { CopyrightRounded } = require("@mui/icons-material");

describe('Various examples', () => {
  beforeEach(() => {
    cy.visit('examples');
  });
  it('multi-page testing', () => {
    cy.getDataTest('nav-why-cypress').click();
    cy.location("pathname").should('equal', '/');

    cy.getDataTest('nav-overview').click();
    cy.location('pathname').should('eq', '/overview');

    cy.getDataTest('nav-fundamentals').click();
    cy.location('pathname').should('eq', '/fundamentals');

    cy.getDataTest('nav-forms').click();
    cy.location('pathname').should('eq', '/forms');

    cy.getDataTest('nav-examples').click();
    cy.location('pathname').should('eq', '/examples');

    cy.getDataTest('nav-component').click();
    cy.location('pathname').should('eq', '/component');

    cy.getDataTest('nav-best-practices').click();
    cy.location('pathname').should('eq', '/best-practices');
  });
  it('intercepts', () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      fixture: 'example.json'
    });
    cy.getDataTest('post-button').click();
  });
  it.only('grudge', () => {
    cy.contains(/add some grudge/i);

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });

    cy.getDataTest("clear-button").should('not.exist');
    cy.getDataTest('grudge-list-title').should('have.text', 'Add Some Grudges');

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('some grudge');
    });
    cy.getDataTest('add-grudge-button').click();

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1);
    });

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('number 2');
    });
    cy.getDataTest('add-grudge-button').click();

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 2);
      cy.get('li').its(0).should('contains.text', 'some grudge');
    });
    // cy.get('[data-test="grudge-list"] > :nth-child(2) > .MuiButtonBase-root').click();
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').its(0).within(() => {
        cy.get('button').click();
      });
    });
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1);

    });

    cy.getDataTest("clear-button").click();
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });



  });
});