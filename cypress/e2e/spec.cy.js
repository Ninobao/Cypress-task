describe("GitHub web page basic test cases", () => {
  it("Should send the correct data when the user logins", () => {
    cy.visit("/login");
    cy.intercept("POST", "https://github.com/session").as("loginRequest");

    cy.get("input#login_field").type("fakeuser@example.com");
    cy.get("input#password").type("123_password");
    cy.get('[data-signin-label="Sign in"]').click();

    cy.wait("@loginRequest").then((interception) => {
      const params = new URLSearchParams(interception.request.body);

      expect(params.get("login")).to.equal("fakeuser@example.com");
      expect(params.get("password")).to.equal("123_password");
    });
  });
});
