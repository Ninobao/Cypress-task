import Home from "../Pages/home-page";
const homePage = new Home();

Cypress.Commands.add("searchInSearchbar", (input) => {
  cy.get(homePage.toggleNavigation).click();
  cy.get(homePage.searchInputContainer).click();
  cy.get(homePage.searchInput).type(`${input}{enter}`);
});

Cypress.Commands.add("clickOnMenuElement", (input) => {
  cy.get(homePage.toggleNavigation).click();
  cy.contains(input).click();
});
