import { JWT } from "next-auth/jwt"
import * as jwt from 'jsonwebtoken'
Cypress.Commands.add('getByDataTest', (title) => {
    cy.get(`[data-test=${title}]`)
})

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url:'https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=171300998083-o6i0ts14gkktr925lbgegqc66a68ggja.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=PiCJeMO9Xu9_wdi6_mFCGxt832OwjcfXvER19xLywlE&code_challenge=jdIpbvRFfjdumZMlHoLFLxnAgNorpo4K1JRdgVe1V4A&code_challenge_method=S256&service=lso&o2v=2&flowName=GeneralOAuthFlow',
        body: {
            username: 'ahmadghnnam60',
            password : '201712455@Asg',
            client_id: '',
            client_secret: ''
        }

    }).then(({ body }) => {
        const claims = jwt.decode('body.id_token');
        const {nickname, name, picture, updated_at, email, email_verified, sub, exp} = claims;

        const auth0Token = {
            body: {
                ...body,
                decodedToken: {
                    claims,
                    client_id: '',
                    user: {
                        nickname,
                        name, 
                        email,
                        email_verified,
                        sub,
                        picture,
                        updated_at
                    },
                }
            },
            expiresAt: exp 
        }

        window.localStorage.setItem('auth0Cypress', JSON.stringify(auth0Token));
    })
   
})