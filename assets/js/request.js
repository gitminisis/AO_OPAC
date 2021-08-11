

// $(document).ready(function () {
//     // document.getElementById('donationForm').style.display = 'none'

// const { link } = require("fs");

// });

// Creates a dictionary/hashmap of the key (id of <h1> which is in class Page-Heading) and the value which is the reqTopic drowdown <option>
// const requestDict = new Map()
// requestDict.set('General', 'General');
// requestDict.set('Vital', 'Vital -active collections');
// requestDict.set('Retrieval', 'Retrievstatistics');
// requestDict.set('Semi-Holding', 'Semial Services');
// requestDict.set('Restricted', 'Restricted');
// requestDict.set('Reproduction', 'Reproduction/Certification Services');
// requestDict.set('Loan', 'Loan/Exhibitions');
// requestDict.set('Copyright', 'Copyright Services');


const requestLinks = ["retrieval.html", 
    "request.html",
                      
                      "reproductionCertification.html", 
                      "copyright.html", 
                      "restrictedHolding.html", 
                      "loan.html", 
                      "semiHolding.html", 
                      "vitalStats.html"];

// Look for class Page-Heading in page. If found grab the id of the <h1> tag (it's first direct child)
let pageHeading = document.getElementsByClassName('Page-Heading')[0]

if (document.getElementById('donationForm')) {
    document.getElementById('donationForm').style.display = 'none'
}

// if (document.getElementById('requestFormPage')) {
if (patron_id) {
    // addRequesLink();
    displayAccountLinks(false);  
    removePatronLoginLink();
    getClientInfo();
    onDonationRequest();
}
else
{
    displayAccountLinks(true);
}

// if (pageHeading) 
// {
//     let pageForm = pageHeading.children[0].getAttribute('id');
//     selectElement('reqTopic', requestDict.get(pageForm));
// }



function addRequesLink() {
    var patron_id   = getCookie('M2L_PATRON_ID');
    var patron_name = getCookie('M2L_PATRON_NAME');
    // let requestLink = `<a class='Quick-Links-Item Color-Orange Rale-Med' href='${HOME_SESSID}?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/request.html'><b>Submit a Request</b></a>`
    let reqArr      = document.getElementsByClassName('Req-Topic');

    for (let i = 0; i < reqArr.length; i++) 
    {
        reqArr[i].setAttribute('href', `${HOME_SESSID}?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/${reqArr[i].name}.html`);
        reqArr[i].hidden=false;
    }
}

function displayAccountLinks(bool) {
    let clientProfile = document.getElementsByClassName('Client-Profile');
    for (let i = 0; i < clientProfile.length; i++) 
        clientProfile[i].hidden = bool;
}

function removePatronLoginLink() {
    let regLink = document.getElementById('Patron-Reg');
    let regLogin = document.getElementById('Patron-Login');

    regLink.hidden  = true;
    regLogin.hidden = true;
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
    for (i = 0; i < requestLinks.length; i++) {
        if (tempUrlCheck[tempUrlCheck.length - 1] == requestLinks[i]) {

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
                document.getElementById('reqFirstName').value = first_name;
                document.getElementById('reqFirstName').readOnly = true;
                document.getElementById('reqLastName').value = last_name;
                document.getElementById('reqLastName').readOnly = true;
                document.getElementById('reqEmail').value = email;
                document.getElementById('reqEmail').readOnly = true;

            })
        } 
    } 

}

function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}
