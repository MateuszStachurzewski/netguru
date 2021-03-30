class UserAccountPage {
    constructor() {}

    visit() {
        cy.visit("/customer/account/index/")
    }

    /*
    In such cases as below, I usually add data-cy attributes to frontend app to make selectors more stable.
     */

    getUserCredentials() {
        return cy.get('.box-account').get('.item').first()
    }

    getUserEmail() {
        return cy.get('.box-account').get('.item').last()
    }
}

export default UserAccountPage;