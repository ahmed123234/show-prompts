describe('craete prompt spec', () => {

  beforeEach(() => {
    cy.visit('/create-prompt');
    cy.getByDataTest('create-cont').as('create-cont');
    cy.get('@create-cont').within(() => {
      cy.get('h1').should('have.text', 'Create post')
      cy.contains(/Create and share an amazing prompts with the world, amd let your imagination run wild with any AI-powered platform./i)
      cy.get('form').within(() => {
        cy.get('label').its(0).should('have.text', 'Your AI Prompt').within(() => {
          cy.get('textarea').as('AI-prompt');
        });
        cy.get('label').its(1).should('have.text', 'Tag(#product, #webdevelopment, #idea)').within(() => {
          cy.get('input').as('tag')
        })
      })
    })
  })
  it('Create app page test structure ', () => {   
  })

  it('create prompt happy path test', () => {
    cy.get('@AI-prompt').type('This is a test, to be able to generate clean code app');
    cy.get('@tag').type('#software engineering');
    cy.getByDataTest('submit').click();
    
    cy.location('pathname').should('eq', '/');
  })

  it.only('create prompt unhappy path test', () => {

    cy.intercept('POST', '/api/prompt/new', {
      statusCode: 403,
      fixture: 'prompt-err',

    })
    cy.request({
      url: '/api/prompt/new',
      method: 'POST',
      body: {
        "prompt": '',
        "tags":'',
        "userId": ''  
      },
      failOnStatusCode: false
      
    })
    // cy.request('POST', '/api/prompt/new', {
    //   "prompt": '',
    //   "tags":'',
    //   "userId": ''
    // })
    cy.get('@AI-prompt');
    cy.get('@tag');
    // cy.getByDataTest('submit').click();
    cy.get('form').submit();
    cy.location('pathname').should('eq', '/create-prompt');

    // cy.get('@tag').type('#software engineering');
    // cy.getByDataTest('submit').click();
    // cy.location('pathname').should('eq', '/create-prompt');    
  })


  it('cancel prompt creation test', () => {
    cy.get('@AI-prompt').type('This is a test, to be able to generate clean code app');
    cy.get('@tag').type('#software engineering');
    cy.getByDataTest('cancel-btn').click();
    cy.location('pathname').should('eq', '/');
  })
})