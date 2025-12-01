import Login from "../Pages/login-page";
import Home from "../Pages/home-page";

const loginPage = new Login();
const homePage = new Home();

Cypress.Commands.add("enterCredentialsLogin", (email, password) => {
  cy.get(loginPage.email).type(email);
  cy.get(loginPage.password).type(password);
});

Cypress.Commands.add("searchInSearchbar", (input) => {
  cy.get(homePage.toggleNavigation).click();
  cy.get(homePage.searchInputContainer).click();
  cy.get(homePage.searchInput).type(`${input}{enter}`);
});

Cypress.Commands.add("clickOnMenuElement", (input) => {
  cy.get(homePage.toggleNavigation).click();
  cy.contains(input).click();
});
