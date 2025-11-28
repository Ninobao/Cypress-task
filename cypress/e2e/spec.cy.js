describe("GitHub web page basic test cases", () => {
  it("Should send the correct credentials when the user logins", () => {
    cy.visit("/login");

    Cypress.Commands.add("enterCredentialsLogin", (email, password) => {
      cy.get("input#login_field").type(email);
      cy.get("input#password").type(password);
    });

    cy.intercept("POST", "https://github.com/session").as("loginRequest");

    cy.enterCredentialsLogin("fakeuser@example.com", "123_password");
    cy.get('[data-signin-label="Sign in"]').click();

    cy.wait("@loginRequest").then((interception) => {
      const params = new URLSearchParams(interception.request.body);

      expect(params.get("login")).to.equal("fakeuser@example.com");
      expect(params.get("password")).to.equal("123_password");
    });
  });

  it("Should correctly query the search input in the URL", () => {
    cy.visit("/");

    cy.intercept("GET", "/search*").as("searchInput");

    Cypress.Commands.add("searchInSearchBar", (input) => {
      cy.get('button[aria-label="Toggle navigation"] span.Button-content').click();
      cy.get(".search-input-container").click();
      cy.get('[data-target="query-builder.input"]').type(`${input}{enter}`);
    });

    cy.searchInSearchBar("gitignore");

    cy.wait("@searchInput").then((intercept) => {
      expect(intercept.request.url).to.include("q=gitignore");
    });
  });

  it("Should correctly navigate to the Pricing page", () => {
    cy.visit("/");

    cy.intercept("GET", "https://github.com/pricing").as("navigateToPricing");

    Cypress.Commands.add("clickOnMenuElement", (input) => {
      cy.get('button[aria-label="Toggle navigation"] span.Button-content').click();
      cy.contains(input).click();
    });

    cy.clickOnMenuElement("Pricing");

    cy.wait("@navigateToPricing").then((intercept) => {
      expect(intercept.request.url).to.equal("https://github.com/pricing");
    });
  });

  it("Should retrieve the branches count from a repository", () => {
    cy.visit("/github/gitignore");

    cy.intercept("GET", "https://github.com/github/gitignore/branch-and-tag-count").as(
      "getBranches"
    );

    cy.wait("@getBranches").then((intercept) => {
      expect(intercept.response.body).to.have.property("branches");
    });
  });

  it("The repository page should contain a README file", () => {
    cy.visit("/github/gitignore");
    cy.get('[data-content="README"]').should("exist");
  });
});
