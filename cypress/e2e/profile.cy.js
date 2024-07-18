describe("Profile spec", () => {
    beforeEach(() => {
        cy.visit("/profile");
    })

    it('profile test', () => {
        cy.contains(/My Profile/i);
        cy.contains(/Welcome to your personalized profile page/i);
    })
})