import RegistrationPage from "../pageObjects/registartionPage"
import UserAccountPage from "../pageObjects/userAccountPage"

const registrationPage = new RegistrationPage();
const userAccountPage = new UserAccountPage();

const faker = require("faker");

describe("Registration", () => {
    it("allows a user to create a new account", () => {
        registrationPage.visit();

        registrationPage.giveTrackingConsent();

        const randomName = faker.name.firstName();
        registrationPage.enterName(randomName);

        const randomLastName = faker.name.lastName()
        registrationPage.enterLastName(randomLastName);

        const randomEmail = faker.internet.email();
        registrationPage.enterEmail(randomEmail);

        const password = faker.internet.password();
        registrationPage.enterPassword(password);
        registrationPage.enterConfirmedPassword(password);

        registrationPage.giveConsentToReceivingBusinessOffers();
        registrationPage.confirmReadingTermsOfUse();

        registrationPage.submitForm();

        cy.url().should('include', '/customer/account/index/');

        const welcome_message = "Dziękujemy za rejestrację w www.eobuwie.com.pl";
        cy.contains(welcome_message);

        userAccountPage.getUserCredentials().then(credentialsEl => {
            cy.get(credentialsEl).invoke('text').should('contain',`${randomName} ${randomLastName}`)
        });

        userAccountPage.getUserEmail().then(emailEl => {
            cy.get(emailEl).invoke('text').should('contain', randomEmail)
        })
    });

    it('does not allow a user to create a new account with invalid email', () => {
        registrationPage.visit();

        registrationPage.giveTrackingConsent();

        const randomName = faker.name.firstName();
        registrationPage.enterName(randomName);

        const randomLastName = faker.name.lastName()
        registrationPage.enterLastName(randomLastName);

        const invalidEmail = "test@domain..com";
        registrationPage.enterEmail(invalidEmail);

        const password = faker.internet.password();
        registrationPage.enterPassword(password);
        registrationPage.enterConfirmedPassword(password);

        registrationPage.giveConsentToReceivingBusinessOffers();
        registrationPage.confirmReadingTermsOfUse();

        registrationPage.submitForm();

        cy.url().should('include', '/customer/account/create/');
        registrationPage.getEmailValidationMsg().then(emailEl => {
            cy.get(emailEl).invoke('text').should('contain', 'Wprowadzono niepoprawny adres e-mail')
        })
    })
});