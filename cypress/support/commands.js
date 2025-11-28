Cypress.Commands.add("enterCredentialsLogin", (email, password) => {
  cy.get("input#login_field").type(email);
  cy.get("input#password").type(password);
});

Cypress.Commands.add("searchInSearchbar", (input) => {
  cy.get('button[aria-label="Toggle navigation"] span.Button-content').click();
  cy.get(".search-input-container").click();
  cy.get('[data-target="query-builder.input"]').type(`${input}{enter}`);
});

Cypress.Commands.add("clickOnMenuElement", (input) => {
  cy.get('button[aria-label="Toggle navigation"] span.Button-content').click();
  cy.contains(input).click();
});
