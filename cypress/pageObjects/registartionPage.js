class RegistrationPage {
    constructor() {}

    visit() {
        cy.visit("/customer/account/create/")
    }

    enterName(name) {
        cy.log('Name', name);
        cy._type("#firstname", name);
    }

    enterLastName(lastName) {
        cy.log('LastName', lastName);
        cy._type("#lastname", lastName);
    }

    enterEmail(email) {
        cy.log('Email', email);
        cy._type("#email_address", email);
    }

    enterPassword(password) {
        cy.log('Password', password);
        cy._type("#password", password);
    }

    enterConfirmedPassword(confirmedPassword) {
        cy.log('ConfirmedPassword', confirmedPassword);
        cy._type("#confirmation", confirmedPassword);
    }

    giveConsentToReceivingBusinessOffers() {
        cy.get("#is_subscribed").click({force: true})
    }

    confirmReadingTermsOfUse() {
        cy.get("#statement").click({force: true})
    }

    giveTrackingConsent() {
        cy.get("body").then(($el) => {
            if ($el.find(".permissions-form").length === 1) {
                cy.get('button[data-testid="permission-popup-accept"]').click()
            }
        });
    }

    submitForm() {
        cy.get("#create-account").click()
    }

    getEmailValidationMsg() {
        return cy.get("#email_address").siblings('span')
    }

}

export default RegistrationPage;