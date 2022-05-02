// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.contains('Login').click()
    cy.url("http://localhost:3000/auth/login").should("exist")
    cy.contains("Sign Up").should("exist")
    cy.contains("Email").should("exist")
    cy.get("input[name=email]").click().type(email)
    cy.contains("Password").should("exist")
    cy.contains("Password").should("exist")
    cy.get("input[name=password]").click().type(password)
    // add name for login button
    cy.get("#login").click()
    cy.wait(3 * 1000).get(`[data-testid="AccountCircleIcon"]`).click()
    cy.get(`.MuiList-root > :nth-child(4) > .MuiButton-root`).click()
})

Cypress.Commands.add('signup', (first_name, last_name, email, password, bio) => {
    cy.contains('Register').click()
    cy.url("http://localhost:3000/auth/register").should("exist")
    cy.contains("Register").should("exist")

    // add a data-set attributes for testing
    cy.contains("First Name").should("exist")
    cy.get("input[name=first_name]").click().type(first_name)

    cy.contains("Last Name").should("exist")
    cy.get("input[name=last_name]").click().type(last_name)

    cy.contains("Email").should("exist")
    cy.get("input[name=email]").click().type("admin@admin.com")

    cy.contains("Password").should("exist")
    cy.get("input[name=password]").click().type("DragonMasterXD18!")

    cy.contains("Renter-Password").should("exist")
    cy.get("input[name=renter_password]").click().type("DragonMasterXD18!")

    cy.contains("Experience").should("exist")
    cy.get(":nth-child(1) > .MuiRadio-root > .PrivateSwitchBase-input").click()
    cy.get(":nth-child(2) > .MuiRadio-root > .PrivateSwitchBase-input").click()
    cy.get(":nth-child(3) > .MuiRadio-root > .PrivateSwitchBase-input").click()

    cy.get("textarea[name=bio]").click().type(bio)
    cy.contains("Sign Up").click()


})


