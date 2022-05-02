/// <reference types="cypress" />

import Chance from "chance"
const chance = new Chance;

const first_name = chance.first()
const last_name = chance.last()
const email = chance.email()
const password = "Password123!"
const bio = "Trying to get into shape"

// describe - holds test
// it - tes
describe('Front End Tests', () => {

    // Runs before every single test 
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it("Login Page", () => {
        // Login Test
        cy.login("admin@admin.com", "DragonMasterXD18!")
    })
    it("Sign Up ", () => {
        cy.signup(first_name, last_name, email, password, bio)
    })
})