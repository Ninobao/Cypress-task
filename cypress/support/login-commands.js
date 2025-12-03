import Login from "../Pages/login-page";
const loginPage = new Login();

Cypress.Commands.add("enterCredentialsLogin", (email, password) => {
  cy.get(loginPage.email).type(email);
  cy.get(loginPage.password).type(password);
});
