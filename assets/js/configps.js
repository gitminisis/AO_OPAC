/* eslint-disable no-unused-vars */
// configps.js

/*
const conectoptions = {
	issuer: 'https://dev-99611549.okta.com/oauth2/default',
	clientId: '0oa1masb8aMGvH7SH5d7',
	redirectUri: 'https://aoopac.minisisinc.com/assets/html/PubSecureLogin.html',
	scopes: ['openid', 'profile', 'email'],
	postLogoutRedirectUri: 'https://aoopac.minisisinc.com/assets/html/PubSecureLogout.html',
	pkce: true,
	disableHttpsCheck: true,
};
*/
/*
const conectoptions = {
	issuer: 'https://dev2.signin.ontario.ca/oauth2/ausuccif1VwZ0aYKW5d6',
	clientId: '0oauih0hx8dlYsozp5d6',
	redirectUri: 'https://aoopac.minisisinc.com/assets/html/PubSecureLogin.html',
	scopes: ['openid', 'profile', 'email'],
	postLogoutRedirectUri: 'https://aoopac.minisisinc.com/assets/html/PubSecureLogout.html',
	pkce: true,
	disableHttpsCheck: true,
};

*/

const conectoptions = {
    issuer: 'https://test1.signin.ontario.ca/oauth2/aus184uex4Ryfr3uH5d7',
    clientId: 'pa-AIMS-dev',
    redirectUri: 'https://aoopac.minisisinc.com/assets/html/PubSecureLogin.html',
    scopes: ['openid', 'profile', 'email'],
    postLogoutRedirectUri: 'https://aoopac.minisisinc.com/assets/html/PubSecureLogout.html',
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