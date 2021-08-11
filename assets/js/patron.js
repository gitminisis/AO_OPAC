$(document).ready(function() {
    getPatronClientInfo()

});

/*
 This function gets a clients information by taking a cookie (eg. M2L_Patron_ID) and creating a GET request
 for the clients information from the requisite MINISIS Database.
 It then pre-fills out the Patron Profile for display to the Patron.
*/
function getPatronClientInfo() {
    // Stored cookie containing a string of the Patron's ID
    var patron_id = getCookie('M2L_PATRON_ID');
    patron_id = patron_id.split(']')[1];

    let url = `https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`
        // let url = `https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%2020210001?SESSIONSEARCH`


    let tempString = window.location.href;

    // Split the URI on "/" and take the last element of the array
    let tempUrlCheck = tempString.split("/");

    let myRequestURL = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/DOC_REQUEST/REQUEST_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20` + patron_id + `&NOMSG=[AO_INCLUDES]error\\norequest.htm`
    // $("a.Patron-Link").attr("href", myRequestURL);

    let myPatronLink = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/ENQUIRIES_VIEW/ENQUIRY_SUMMARY?SESSIONSEARCH&EXP=ENQ_PATRON_ID%20` + patron_id + `&NOMSG=[AO_INCLUDES]error\\noenquiry.htm`
    // $(".Patron-Enquiry-Link").on('click', function() { window.location = myPatronLink })

    let myCrowdURL = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/COMMENTS_VIEW/CROWD_SOURCE_SUMMARY?SESSIONSEARCH&EXP=CREATOR_ID%20` + patron_id + `&NOMSG=[AO_INCLUDES]error\\nocrowd.htm`
    // $("a.Patron-Crowd-Link").attr("href", myCrowdURL);


    // Check that the current window.location is patronProfile.html
    if (tempUrlCheck[tempUrlCheck.length - 1] == 'patronProfile.html') {

        $.ajax(url).done(function(res) {
            var x2js = new X2JS();

            var jsonObj = x2js.xml2json(res);

            let first_name = jsonObj.client.name_first;
            let last_name = jsonObj.client.name_last;
            let fullname = jsonObj.client.name_full;
            let organization = jsonObj.client.organization
            let tel = jsonObj.client.tel_home
            let card_number = jsonObj.client.card_numbe;
            let email = jsonObj.client.email;
            let emailLink = `mailto: ${email}`


            document.getElementById('Client-First').innerText = first_name;
            document.getElementById('Client-First').readOnly = true;
            document.getElementById('Client-Last').innerText = last_name;
            document.getElementById('Client-Last').readOnly = true;
            document.getElementById('Client-Full').innerText = fullname;
            document.getElementById('Client-Full').readOnly = true;
            document.getElementById('Client-Email').innerText = email;
            document.getElementById('Client-Email').setAttribute("href", emailLink);
            document.getElementById('Client-Org').innerText = organization;
            document.getElementById('Client-Org').readOnly = true;
            document.getElementById('Client-Card').innerText = card_number;
            document.getElementById('Client-Card').readOnly = true;
            document.getElementById('Client-Tel').innerText = tel;
            document.getElementById('Client-Tel').readOnly = true;

        })
    } else return;



}

const patronLinkOnclick = (e) => {
    let client_id = patron_id.split(']')[1];

    // let bookmarkURL = '^HOME_SESSID^?SHOWORDERLIST&NOMSG=[AO_INCLUDES]error\nobookmark.htm&COOKIE=BOOKMARK'
    let bookmarkURL = `${HOME_SESSID}?SHOWORDERLIST&NOMSG=[AO_INCLUDES]error\nobookmark.htm&COOKIE=BOOKMARK`

    let myRequestURL = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/DOC_REQUEST/REQUEST_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20` + client_id + `&NOMSG=[AO_INCLUDES]error\\norequest.htm`;
    let myPatronLink = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/ENQUIRIES_VIEW/ENQUIRY_SUMMARY?SESSIONSEARCH&EXP=ENQ_PATRON_ID%20` + client_id + `&NOMSG=[AO_INCLUDES]error\\noenquiry.htm`;
    let myCrowdURL = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/COMMENTS_VIEW/CROWD_SOURCE_SUMMARY?SESSIONSEARCH&EXP=CREATOR_ID%20` + client_id + `&NOMSG=[AO_INCLUDES]error\\nocrowd.htm`;

    if (e.getAttribute('id') == 'Patron-Request')
        window.location = myRequestURL;
    else if (e.getAttribute('id') == 'Patron-Crowd-Sourcing')
        window.location = myCrowdURL;
    else if (e.getAttribute('id') == 'Patron-Enquiry')
        window.location = myPatronLink;
    else 
        window.location = bookmarkURL;
} 