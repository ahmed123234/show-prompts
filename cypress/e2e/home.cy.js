describe('Home page test', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it.only('navbar test', () => {
    cy.getByDataTest('nav-bar').within(() => {
      cy.location('pathname', '/')
      cy.get('button', {timeout: 4000}).contains(/sign in by google/i).click();
      cy.login();
      // cy.request( 'POST', 
      // 'https://accounts.google.com/v3/signin/identifier'
      // 'https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=171300998083-o6i0ts14gkktr925lbgegqc66a68ggja.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=PiCJeMO9Xu9_wdi6_mFCGxt832OwjcfXvER19xLywlE&code_challenge=jdIpbvRFfjdumZMlHoLFLxnAgNorpo4K1JRdgVe1V4A&code_challenge_method=S256&service=lso&o2v=2&flowName=GeneralOAuthFlow'
      // )
      // cy.location('pathname').should('equal', '/api/auth/signin/google')
    })
  })

  it('passes', () => {
    cy.contains('discover & share', { matchCase: false });
    cy.contains('Promptopia is an open-source AI prompting', { matchCase: false });
    cy.getByDataTest('feed-cont').as('feedCont');
    cy.get('@feedCont').should('exist');
    
    cy.get('@feedCont').within(() => {
      cy.get('input').should('exist').as('input');
      cy.getByDataTest('prompt-cards').should('exist').as('cards');
      // cy.get('@input').type('ahmadghnnam');
      cy.wait(10000);
      cy.get('@cards').within(() => {
        // cy.get('dev', {timeout: 10000}).should('have.length', 2);
        // cy.getByDataTest('card-').should('exist')
      } )
    })
  })
})