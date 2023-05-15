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
        body += "<br /><strong>« Selon le Portail en ligne, votre adresse de courriel a été utilisée pour créer un compte pour les Archives publiques de l'Ontario. »</strong>";
        body += "<br /><strong>« Une fois votre compte approuvé par le bureau de service des Archives, vous recevrez un message de bienvenue vous demandant d'accéder au Portail avec les renseignements fournis dans les 24 heures. En attendant, n'hésitez pas à faire une recherche sur le site pour trouver les documents qui vous intéressent. »   </strong>"
        body += "<br /><strong>« Si vous n'avez pas créé de compte, veuillez ne pas tenir compte de ce courriel. Vous pouvez également communiquer avec les Archives publiques de l'Ontario. Nous répondrons à votre appel avant la troisième sonnerie, et vous aurez la possibilité de parler à quelqu'un. Votre appel ne sera pas redirigé plus d'une fois. Nous retournons tous les appels dans un délai d'un jour ouvrable. Numéro sans frais : 1-800-668-9933 (Ontario seulement) ou numéro local : 1-416-327-1600</strong>"
        body += "<br /><strong>Merci de votre intérêt pour le plus important dépôt de documents publics et gouvernementaux de l'Ontario :</strong>"
        body += "<br/> <a href='https://webmail.telushosting.com/archives.gov.on.ca'><strong>Archives publiques de l'Ontario</strong></a>"

        let url = `${SESSID}?save_mail_form&TEMPLATE=[ao_opac]/145/assets/html/mailBody.txt&async=y&xml=y&subject_default=${subject}&from_default=noreply@minisisinc.com&to_default=${client_email}`;
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