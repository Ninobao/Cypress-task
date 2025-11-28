import Login from "../Pages/login-page";
import Dashboard from "../Pages/dashboard-page";

const loginPage = new Login();
const dashboardPage = new Dashboard();

Cypress.Commands.add("enterCredentialsLogin", (email, password) => {
  cy.get(loginPage.email).type(email);
  cy.get(loginPage.password).type(password);
});

Cypress.Commands.add("searchInSearchbar", (input) => {
  cy.get(dashboardPage.toggleNavigation).click();
  cy.get(dashboardPage.searchInputContainer).click();
  cy.get(dashboardPage.searchInput).type(`${input}{enter}`);
});

Cypress.Commands.add("clickOnMenuElement", (input) => {
  cy.get(dashboardPage.toggleNavigation).click();
  cy.contains(input).click();
});
