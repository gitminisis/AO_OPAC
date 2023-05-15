function getCookie(cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length)
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

function deleteCookie(name) {
    document.cookie =
        name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
let checkEmail = async email => {
    //TODO: Change lang depends 145
    const res = await fetch(
        `/scripts/mwimain.dll/145/CLIENT_REGISTRATION/WEB_EMAIL_CHECK/C_EMAIL "${email}"?SESSIONSEARCH&NOMSG=[ao_opac]/145/includes/noEmail.xml`
    )
    const data = await res.text()

    let parser = new DOMParser()
    let doc = parser.parseFromString(data, 'text/html')
    let count = doc.getElementById('email-count').innerText

    if (count === '0') {
        return true
    }

    return false
}

/**
 * Set up language
 */


function setLanguageText() {
    let lang = sessionStorage.getItem('lang')
    let pubSecureText = document.querySelector('#pubSecureText')
    if (lang && lang === 'fr') {
        pubSecureText.innerText = 'Veuillez patienter un instant...'
    } else {
        pubSecureText.innerText = 'Please wait for a moment...'
    }
}


function mwiLogin(id) {
    fetch(
        '/scripts/mwimain.dll?patronlogin&application=UNION_VIEW&language=145&file=[ao_opac]/145/assets/html%5chome.html', {
            method: 'POST',
            body: new URLSearchParams({
                C_CLIENT_NUMBER: id,
                PATRON_PID: dynamicPassword(id)
            })
        }
    ).then(response => {
        console.log(response)
        window.location = '/'
    })
}

function loginRedirect() {
    let lang = sessionStorage.getItem('lang');
    if (lang && lang === 'fr') {
        window.location = '/145/assets/html/publicSecureLoginFr.html'
    } else {
        window.location = '/145/assets/html/publicSecureLogin.html'
    }
}
const authClient = new OktaAuth(conectoptions)

async function login() {
    //alert("Start of login page");
    //debugger;
    let userinfo = null
    let useremail = null
    let usersubscription = null
    let lang = sessionStorage.getItem('lang')
    if (authClient.isLoginRedirect()) {
        // check if this is a redirect

        try {
            // parse tokens from the redirect and store.
            await authClient.storeTokensFromRedirect()
                // get the user info.
            userinfo = await authClient.getUser()
            if (userinfo) {
                // debugger;
                useremail = userinfo.email
                usersubscription = userinfo.sub

                sessionStorage.setItem('useremail', useremail)
                sessionStorage.setItem('usersub', userinfo.sub)
                checkEmail(useremail).then(res => {
                    let HOME_SESSID = getCookie('HOME_SESSID')

                    // Account has not been created
                    if (res) {
                        if (lang && lang === 'fr') {
                            window.location = `/scripts/mwimain.dll?logon&application=UNION_VIEW&language=145&file=[ao_opac]/145/assets/html/publicSignupFr.html`
                        } else {
                            window.location = `/scripts/mwimain.dll?logon&application=UNION_VIEW&language=145&file=[ao_opac]/145/assets/html/publicSignup.html`
                        }

                        // window.location = `${HOME_SESSID}?addsinglerecord&database=client_registration&de_form=[ao_opac]/145/assets/html/registration.html`
                    }
                    // Existing Account
                    else {
                        //   mwiLogin(useremail)
                        loginRedirect();
                    }
                })
            } else {
                // for some reason the user information can not be retrieved error message or redirect to home page.
                // console.log('Could not get the user info');
                // debugger;

                window.location = '/'
            }
        } catch (e) {
            if (
                e.errorCode === 'access_denied' &&
                e.errorSummary ===
                'User is not assigned to the client application.'
            ) {
                window.location =
                    'https://stage.profile.signin.ontario.ca/login?cid=' +
                    conectoptions.clientId
            }
            // the most likely cause of an exception will be an URL with bad parameters that the
            // Okta library could not handle. Should most likely redirect to the home page or display an error.
            // console.log(e);
            // debugger;
        }
    } else if (!(await authClient.isAuthenticated())) {
        // Not logged in. Redirect to the public secure logon page.
        // After the user signs into public secure they will be redirected to this page
        // with tokens in the URL
        //alert("In the sign in with redirect");
        authClient.signInWithRedirect()
    } else {
        if (
            getCookie('M2L_AUDIENCE') &&
            getCookie('M2L_PATRON_ID') &&
            getCookie('M2L_PATRON_NAME')
        ) {
            window.location = '/'
        } else {
            // parse tokens from the redirect and store.
            // await authClient.storeTokensFromRedirect();
            // get the user info.
            let userinfo = await authClient.getUser()
            useremail = userinfo.email
            usersubscription = userinfo.sub
            sessionStorage.setItem('useremail', useremail)
            sessionStorage.setItem('usersub', userinfo.sub)
            checkEmail(useremail).then(res => {
                // console.log(res);
                let HOME_SESSID = getCookie('HOME_SESSID')

                // Account has not been created
                if (res) {
                    if (lang && lang === 'fr') {
                        window.location = `/scripts/mwimain.dll?logon&application=UNION_VIEW&language=145&file=[ao_opac]/145/assets/html/publicSignupFr.html`
                    } else {
                        window.location = `/scripts/mwimain.dll?logon&application=UNION_VIEW&language=145&file=[ao_opac]/145/assets/html/publicSignup.html`
                    }
                }
                // Existing Account
                else {
                    //   mwiLogin(useremail)
                    loginRedirect();
                }
            })
        }
        // user is already logged in - Could add some checks that the user is logged in on the MINISIS
        // side and then redirect back to the home page.
    }
}

function clearStorage() {
    sessionStorage.removeItem('useremail')
    sessionStorage.removeItem('usersub')
    sessionStorage.removeItem('okta-cache-storage')
    sessionStorage.removeItem('okta-token-storage')

    deleteCookie('M2L_AUDIENCE')
    deleteCookie('M2L_PATRON_ID')
    deleteCookie('M2L_PATRON_NAME')
    deleteCookie('ETUDE')
    deleteCookie('okta-oauth-nonce')
    deleteCookie('okta-oauth-redirect-params')
    deleteCookie('okta-oauth-state')
}

function authSignOut() {

    let tokenStorage = sessionStorage.getItem('okta-token-storage');
    let redirectURI = 'https://test.aims.archives.gov.on.ca/assets/html/PubSecureLogout.html'
    if (tokenStorage) {
        let ts = JSON.parse(tokenStorage);
        clearStorage()
        let logoutURL = `${ts.idToken.issuer}/v1/logout?id_token_hint=${ts.idToken.idToken}&post_logout_redirect_uri=${redirectURI}`;
        window.location = logoutURL;
    }

}


async function logout() {
    try {
        if (await authClient.isAuthenticated()) {
            // logged into public secure sign out of public secure.
            // after the signout() call Public secure will then redirect back to this page.


            // authClient.revokeAccessToken();
            authSignOut();


        } else {
            clearStorage()

            window.location = '/'
        }
    } catch (error) {
        clearStorage()
        window.location = '/'
    }
}