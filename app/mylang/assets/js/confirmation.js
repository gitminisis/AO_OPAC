/**
 * Function to generate the email sending after the 
 * a successful account registration
 */

$(document).ready(function() {
    if (document.getElementById('confirmationPage')) {
        var SESSID = getCookie("HOME_SESSID");
        let subject = "Registration Confirmation";
        let client_email = document.getElementById('client_email').innerText;

        let body = "<h2>DO NOT REPLY TO THIS EMAIL</h2>"
        body += "<br /><strong>[--According to the Online Portal, your email was utilised to set up an account for the Archives of Ontario.--]</strong>";
        body += "<br /><strong>[--Once your account is approved by the Archives Service Desk, you will receive a welcome message to access the Portal with details posted to your account within 24 hours.  In the interim, please feel free to search the site and find the records you are interested in.--]   </strong>"
        body += "<br /><strong>[--If you did not create an account, please ignore this email.  Or, you can contact the Archives.  Your call  will be answered by the third ring, and you will have the option of reaching a person. Your call will not be redirected more than once. All calls will be returned within one working day. 1-800-668-9933 Toll-Free Number (Ontario only) or direct dial, 1-416-327-1600 .--]</strong>"
        body += "<br /><strong>[--Thank you for you interest and usage of Ontario’s largest repository of public and government records:--]</strong>"
        body += "<br/> <a href='https://webmail.telushosting.com/archives.gov.on.ca'><strong>[--The Archives of Ontario--]</strong></a>"

        let url = `${SESSID}?save_mail_form&TEMPLATE=[AO_ASSETS]html/mailBody.txt&async=y&xml=y&subject_default=${subject}&from_default=noreply@minisisinc.com&to_default=${client_email}`;
        console.log(url)
        $.ajax({
            type: "POST",
            url: url,
            data: `sender=noreply@minisisinc.com&receiver=${client_email}&subject=${subject}`,

        }).done(function(res) {
            let time = 10;
            let interval = setInterval(function() {
                $('#confirmTime').text(time)
                if (time === 0) {
                    clearInterval(interval)
                    window.location = `https://test.aims.archives.gov.on.ca/assets/html/PubSecureLogin.html`

                } else {
                    time--;
                }
            }, 1000)
        });
    }

})