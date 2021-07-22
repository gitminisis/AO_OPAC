

// $(document).ready(function () {
//     // document.getElementById('donationForm').style.display = 'none'

// });

if (document.getElementById('donationForm')) {
    document.getElementById('donationForm').style.display = 'none'
}
// if (document.getElementById('requestFormPage')) {
if (patron_id) {
    addRequesLink();
    getClientInfo();
    onDonationRequest();
}
function addRequesLink() {
    // var patron_id = getCookie('M2L_PATRON_ID');
    // var patron_name = getCookie('M2L_PATRON_NAME');
    let requestLink = `<a class='Quick-Links-Item Color-Orange Rale-Med' href='${HOME_SESSID}?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/request.html'><b>Submit a Request</b></a>`

    if (patron_name) {
        $('#Request-Link').append(requestLink)
    }
}

function onDonationRequest() {
    $('#reqTopic').on('change', function (e) {
        console.log(e.target.value)

        if (e.target.value === 'Donations') {
            document.getElementById('donationForm').style.display = 'inherit'
        }

        else {
            document.getElementById('donationForm').style.display = 'none'
        }
    })
}
function getClientInfo() {
    let patron_id = getCookie('M2L_PATRON_ID');

    patron_id = patron_id.split(']')[1];

    // Get the current window.location URI
    let tempString = window.location.href;

    // Split the URI on "/" and take the last element of the array
    let tempUrlCheck = tempString.split("/");

    if (tempUrlCheck[tempUrlCheck.length - 1] == 'request.html') {

        let url = `https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`
        $.ajax(url).done(function (res) {
            console.log(res)
            let x2js = new X2JS();

            let jsonObj = x2js.xml2json(res);
            let first_name = jsonObj.client.name_first;
            let last_name = jsonObj.client.name_last;
            let full_name = jsonObj.client.name_full;
            let email = jsonObj.client.email;

            document.getElementById('reqFullName').value = full_name;
            document.getElementById('enqFirstName').value = first_name;
            document.getElementById('enqFirstName').readOnly = true;
            document.getElementById('enqLastName').value = last_name;
            document.getElementById('enqLastName').readOnly = true;
            document.getElementById('enqEmail').value = email;
            document.getElementById('enqEmail').readOnly = true;

        })
    } else return;

}
