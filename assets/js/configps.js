/* eslint-disable no-unused-vars */
// configps.js

/*
const conectoptions = {
	issuer: 'https://dev-99611549.okta.com/oauth2/default',
	clientId: '0oa1masb8aMGvH7SH5d7',
	redirectUri: 'https://uataoopac.minisisinc.com/assets/html/PubSecureLogin.html',
	scopes: ['openid', 'profile', 'email'],
	postLogoutRedirectUri: 'https://uataoopac.minisisinc.com/assets/html/PubSecureLogout.html',
	pkce: true,
	disableHttpsCheck: true,
};
*/
/*
const conectoptions = {
	issuer: 'https://dev2.signin.ontario.ca/oauth2/ausuccif1VwZ0aYKW5d6',
	clientId: '0oauih0hx8dlYsozp5d6',
	redirectUri: 'https://uataoopac.minisisinc.com/assets/html/PubSecureLogin.html',
	scopes: ['openid', 'profile', 'email'],
	postLogoutRedirectUri: 'https://uataoopac.minisisinc.com/assets/html/PubSecureLogout.html',
	pkce: true,
	disableHttpsCheck: true,
};

*/

const conectoptions = {
    lang: 'en',
    issuer: 'https://stage.signin.ontario.ca/oauth2/aus187zrqyTXcJAHA5d7',
    clientId: '0oa472jfxf2ixcXK55d7',
    redirectUri: 'https://uataoopac.minisisinc.com/assets/html/PubSecureLogin.html',
    scopes: ['openid', 'profile', 'email'],
    postLogoutRedirectUri: 'https://uataoopac.minisisinc.com',
    pkce: true,
    storageManager: {
        token: {
            storageTypes: [
                'localStorage',
                'sessionStorage',
                'cookie'
            ],
        },
        cache: {
            storageTypes: [
                'localStorage',
                'sessionStorage',
                'cookie'
            ]
        },
        transaction: {
            storageTypes: [
                'sessionStorage',
                'localStorage',
                'cookie'
            ]
        }
    }
}