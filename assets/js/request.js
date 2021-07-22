// $(document).ready(function () {
//     // document.getElementById('donationForm').style.display = 'none'

// });
if (document.getElementById('donationForm')) {
    document.getElementById('donationForm').style.display = 'none'
}
if (document.getElementById('requestFormPage')) {
addRequesLink();
getClientInfo();
onDonationRequest();
}
function addRequesLink() {
    var patron_id   = getCookie('M2L_PATRON_ID');
    var patron_name = getCookie('M2L_PATRON_NAME');
    // let requestLink = `<a class='Quick-Links-Item Color-Orange Rale-Med' href='${HOME_SESSID}?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/request.html'><b>Submit a Request</b></a>`
    let reqArr      = document.getElementsByClassName('Req-Topic');

    for (let i = 0; i < reqArr.length; i++) 
    {
        reqArr[i].setAttribute('href', `${HOME_SESSID}?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/${reqArr[i].name}.html`)
        reqArr[i].hidden=false
    }

    // if (patron_name) {
    //     $('#Request-Link').append(requestLink)
    // }
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
    console.log('test')
    var patron_id = getCookie('M2L_PATRON_ID');
    patron_id = patron_id.split(']')[1];
    let url = `https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`
    $.ajax(url).done(function (res) {
        console.log(res)
        var x2js = new X2JS();

        var jsonObj = x2js.xml2json(res);
        let first_name = jsonObj.client.name_first;
        let last_name = jsonObj.client.name_last;
        let full_name = jsonObj.client.name_full;
        let email = jsonObj.client.email;
        console.log(jsonObj)

        document.getElementById('reqFullName').value = full_name;
        document.getElementById('enqFirstName').value = first_name;
        document.getElementById('enqFirstName').readOnly = true;
        document.getElementById('enqLastName').value = last_name;
        document.getElementById('enqLastName').readOnly = true;
        document.getElementById('enqEmail').value = email;
        document.getElementById('enqEmail').readOnly = true;

    })

}