import Login from "../Pages/login-page";
import Repository from "../Pages/repository-page";

describe("GitHub web page basic test cases", () => {
  let loginPage;
  let repositoryPage;

  beforeEach(() => {
    loginPage = new Login();
    repositoryPage = new Repository();
  });

  it("Should send the correct credentials when the user logins", () => {
    cy.visit("/login");

    cy.intercept("POST", "https://github.com/session").as("loginRequest");

    cy.enterCredentialsLogin(Cypress.env("fakeuser"), Cypress.env("fakepassword"));

    cy.get(loginPage.signIn).click();

    cy.wait("@loginRequest").then((interception) => {
      const params = new URLSearchParams(interception.request.body);

      expect(params.get("login")).to.equal("fakeuser@example.com");
      expect(params.get("password")).to.equal("123_password");
    });
  });

  it("Should correctly query the search input in the URL", () => {
    cy.visit("/");

    cy.intercept("GET", "/search*").as("searchInput");

    cy.searchInSearchbar("gitignore");

    cy.wait("@searchInput").then((intercept) => {
      const url = new URL(intercept.request.url);

      expect(url.pathname).to.equal("/search");
      expect(url.searchParams.get("q")).to.equal("gitignore");
    });
  });

  it("Should correctly navigate to the Pricing page", () => {
    cy.visit("/");

    cy.intercept("GET", "https://github.com/pricing").as("navigateToPricing");

    cy.clickOnMenuElement("Pricing");

    cy.wait("@navigateToPricing").then((intercept) => {
      const url = new URL(intercept.request.url);

      expect(intercept.request.method).to.equal("GET");
      expect(url.pathname).to.equal("/pricing");
    });
  });

  it("Should retrieve the branches count from a repository", () => {
    cy.visit("/github/gitignore");

    cy.intercept("GET", "https://github.com/github/gitignore/branch-and-tag-count").as(
      "getBranches"
    );

    cy.wait("@getBranches").then((intercept) => {
      expect(intercept.response.body).to.have.property("branches");
      expect(intercept.response.body.branches).to.be.a("number");
    });
  });

  it("The repository page should contain a README file", () => {
    cy.visit("/github/gitignore");
    cy.get(repositoryPage.readme).should("exist").and("be.visible");
  });
});
