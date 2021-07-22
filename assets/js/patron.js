$(document).ready(function () {
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
    patron_id     = patron_id.split(']')[1];

    // let url = `https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`
    let url       = `https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%2020210001?SESSIONSEARCH`
    
    let tempString = window.location.href;

    // Split the URI on "/" and take the last element of the array
    let tempUrlCheck = tempString.split("/");

    // Check that the current window.location is patronProfile.html
    if (tempUrlCheck[tempUrlCheck.length - 1] == 'patronProfile.html') {

        $.ajax(url).done(function (res) {
            var x2js = new X2JS();
    
            var jsonObj = x2js.xml2json(res);
    
            let first_name   = jsonObj.client.name_first;
            let last_name    = jsonObj.client.name_last;
            let fullname     = jsonObj.client.name_full;
            let organization = jsonObj.client.organization
            let tel          = jsonObj.client.tel_home
            let card_number  = jsonObj.client.card_numbe;
            let email        = jsonObj.client.email;
            let emailLink    = `mailto: ${email}`
            
    
            document.getElementById('Patron-First').innerText = first_name;
            document.getElementById('Patron-First').readOnly  = true;
            document.getElementById('Patron-Last').innerText  = last_name;
            document.getElementById('Patron-Last').readOnly   = true;
            document.getElementById('Patron-Full').innerText  = fullname;
            document.getElementById('Patron-Full').readOnly   = true;
            document.getElementById('Patron-Email').innerText = email; 
            document.getElementById('Patron-Email').setAttribute("href", emailLink);
            document.getElementById('Patron-Org').innerText   = organization;
            document.getElementById('Patron-Org').readOnly    = true;
            document.getElementById('Patron-Card').innerText  = tel;
            document.getElementById('Patron-Card').readOnly   = true;
            document.getElementById('Patron-Tel').innerText   = card_number;
            document.getElementById('Patron-Tel').readOnly    = true;
    
        })
    } else return;
    
    

}