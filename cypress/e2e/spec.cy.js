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

    Cypress.Commands.add("searchInSearchBar", (input) => {
      cy.get('button[aria-label="Toggle navigation"] span.Button-content').click();
      cy.get(".search-input-container").click();
      cy.get('[data-target="query-builder.input"]').type(`${input}{enter}`);
    });

    cy.searchInSearchBar("gitignore");

    cy.url().should("include", "search?q=gitignore");
  });
});
