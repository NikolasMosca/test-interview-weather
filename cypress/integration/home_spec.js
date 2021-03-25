import moment from "moment"

Cypress.config("defaultCommandTimeout", 10000)

describe("The Home Page", () => {
    it("successfully loads", () => {
        cy.visit("/")
    })

    it("should be visible the london city at the start", () => {
        cy.get('[cypress-ref="city-name"]').should("contain", "London")
        cy.get('[cypress-ref="city-date"]').should("contain", moment().format("dddd DD, MMMM"))
        cy.get('[cypress-ref="city-description"]').should("be.not.empty")
        cy.get('[cypress-ref="city-temperature"]').should("be.not.empty")
        cy.get('[cypress-ref="city-weather-image"]').should("be.visible")
    })

    it("should be visible the current temperature in the bottom left of the screen", () => {
        cy.get('[cypress-ref="temperature-item"]').should("be.visible")
    })

    it("should be visible week tab content", () => {
        cy.get('[cypress-ref="week-item"]').should("be.visible")
    })

    it("should be visible month tab content", () => {
        cy.get('[cypress-ref="month-tab"]').click()
        cy.get('[cypress-ref="month-item"]').should("be.visible")
    })

    it("when I click Add Localization then it should be visible my city", () => {
        cy.get('[cypress-ref="localization-button"]').click()
        cy.get('[cypress-ref="city-name"]').should("not.contain", "London")
    })

    it("when I search a city then the interface will be display this city's data", () => {
        cy.get('[cypress-ref="search-input"]').type("Thailand")
        cy.get('[cypress-ref="search-button"]').click()
        cy.get('[cypress-ref="city-name"]').should("contain", "Thailand")
    })

    it("when I save a city then the interface will be display the element saved in the list", () => {
        cy.get('[cypress-ref="add-city"]').click()
        cy.get('[cypress-ref="city-item"] h3').should("contain", "Thailand")
    })
})
