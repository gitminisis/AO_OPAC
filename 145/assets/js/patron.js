let saveButtonPressed = 0;

$(document).ready(function() {
    // document.addEventListener('visibilitychange', () => {
    //     if (document.visibilityState === 'hidden') {
    //       navigator.sendBeacon(editSkipRecord, console.log('sending data'));
    //     }
    //   });

    let editProfilePage = document.getElementById('edit-profile-page');
    if (editProfilePage != null) {
        window.onunload = () => {
            console.log('about to unload')
            if (typeof closeWindow != "undefined") {
                closeWindow();
            }
        }
    }

    getPatronClientInfo()
    $('#clientPassword').on('input', function() {
        var password = document.getElementById('clientPassword');
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        // if (!password.value.match(passwordRegex)) {
        //     alert("Password must contain at least eight characters, at least one uppercase letter, one lowercase letter, one special character and one number.")
        // }
    });
    $("button#editClientSubmit").click(function() {


        // setTimeout(updatedProfile(), 9500);
        // function updatedProfile(){
        //     location.reload();
        // }
    });

    function showMessage(text) {
        $('#reg_msg').html(`<b>${text}</b>`)
        $('#reg_modal').modal('show')
        setTimeout(function() { $('#reg_modal').modal('hide'); }, 1400);
    }

    // $("button.colorbox-edit-client").click(function(e) {
    //     let evt = e;
    //     // $(this).parent().parent().find(".cs-item-sisn");
    //     var accession = $(this).parent().parent().find(".cs-item-id");
    //     var reqSource = $(this).parent().parent().find(".cs-item-src");
    //     var title = $(this).parent().parent().find(".cs-item-title");
    //     var topicCheck = "reproductions";

    //     var patron_id = getCookie('M2L_PATRON_ID');
    //     patron_id = patron_id.split(']')[1];

    //     let url = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`

    //     let iframe;

    //     $.ajax(url).done(function(res) {
    //         var x2js = new X2JS();

    //         var jsonObj = x2js.xml2json(res);
    //         // console.log(jsonObj);
    //         let card_number = jsonObj.client.card_number;


    //         $.colorbox({
    //             iframe: true,
    //             transition: "elastic",
    //             width: "1200px",
    //             height: "780px",
    //             overlayClose: false,
    //             escKey: false,
    //             // fastIframe: false,
    //             href: HOME_SESSID + "?changesinglerecord&database=CLIENT_VIEW&de_form=[AO_ASSETS]html/editProfile.html&EXP=C_CARD_NUMBER%20" + card_number,
    //             onOpen: function() {
    //                 // this does nothing right now
    //             },
    //             onLoad: function() {
    //                 $tmp_data = accession.text(); // ACCESSION NUMBER --- F 26 G
    //                 $tmp_data2 = reqSource.text(); // REQ_SOURCE DESCRIPTION COLLECTION LIBRARY
    //                 $tmp_data3 = title.text(); // LEGAL_TITLE -- Story Book Woman

    //                 $tmp_topic = topicCheck;
    //             },
    //             onComplete: function() {
    //             },
    //             onCleanup: function() {
    //                  window.open('^SKIPRECORD^&DISCONNECT=Y&CLOSE=Y', "CLOSE", "menubar=no, scrollbars=yes, resizable=yes, location=no, toolbar=no, Width=50, Height=50")
    //             },
    //             onClosed: function() {
    //                 delete $tmp_data;
    //                 delete $tmp_data2;
    //                 delete $tmp_data3;

    //                 delete $tmp_topic;
    // 				if ( typeof closeWindow != "undefined" ) {
    // 				   closeWindow();
    // 				}					   
    //                 // window.open('^SKIPRECORD^&DISCONNECT=Y&CLOSE=Y', "CLOSE", "menubar=no, scrollbars=yes, resizable=yes, location=no, toolbar=no, Width=50, Height=50")
    //                 // location = '^skiprecord^&disconnect=y&close=y&FILE=[AO_ASSETS]html/editProfile.html';
    //             } 
    //         });
    //     })
    // });

    if (document.getElementById('editProfileForm') != null) {
        getEditProfileInfo();
    }
});

// window.onbeforeunload = () => {
// }

// window.onunload = () => {
// }
/*
 This function gets a clients information by taking a cookie (eg. M2L_Patron_ID) and creating a GET request
 for the clients information from the requisite MINISIS Database.
 It then pre-fills out the Patron Profile for display to the Patron.
*/
function getPatronClientInfo() {
    // Stored cookie containing a string of the Patron's ID
    var patron_id = getCookie('M2L_PATRON_ID');
    patron_id = patron_id.split(']')[1];
    let url = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`
        // let url = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%2020210001?SESSIONSEARCH`


    let tempString = window.location.href;

    // Split the URI on "/" and take the last element of the array
    let tempUrlCheck = tempString.split("/");

    let myRequestURL = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/DOC_REQUEST/REQUEST_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20` + patron_id + `&NOMSG=[AO_INCLUDES]error\\norequest.htm`
        // $("a.Patron-Link").attr("href", myRequestURL);

    let myPatronLink = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/ENQUIRIES_VIEW/ENQUIRY_SUMMARY?SESSIONSEARCH&EXP=ENQ_PATRON_ID%20` + patron_id + `&NOMSG=[AO_INCLUDES]error\\noenquiry.htm`
        // $(".Patron-Enquiry-Link").on('click', function() { window.location = myPatronLink })

    let myCrowdURL = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/COMMENTS_VIEW/CROWD_SOURCE_SUMMARY?SESSIONSEARCH&EXP=CREATOR_ID%20` + patron_id + `&NOMSG=[AO_INCLUDES]error\\nocrowd.htm`
        // $("a.Patron-Crowd-Link").attr("href", myCrowdURL);

    let frame;
    // Check that the current window.location is patronProfile.html
    if (tempUrlCheck[tempUrlCheck.length - 1] == 'patronProfile.html') {

        $.ajax(url).done(function(res) {
            var x2js = new X2JS();

            var jsonObj = x2js.xml2json(res);

            let first_name = jsonObj.client.name_first;
            let last_name = jsonObj.client.name_last;
            //let full_name = `${first_name} ${last_name}`
            let organization = jsonObj.client.organization;
            let id_number = jsonObj.client.card_number; // this is not a card the number is actually the user ID
            let email = jsonObj.client.email;
            let emailLink = `mailto: ${email}`
            let tel = jsonObj.client.tel_home;

            document.getElementById('Client-First').innerText = first_name;
            document.getElementById('Client-First').readOnly = true;
            document.getElementById('Client-Last').innerText = last_name;
            document.getElementById('Client-Last').readOnly = true;
            // document.getElementById('Client-Full').innerText = full_name;
            // document.getElementById('Client-Full').readOnly = true;
            document.getElementById('Client-Email').innerText = email;
            document.getElementById('Client-Email').setAttribute("href", emailLink);


            if (organization != null) {
                document.getElementById('Client-Org').innerText = organization;
                document.getElementById('Client-Org').readOnly = true;
            } else {
                $(".organization-item").remove();
            }

            // switch from card_number to id_number
            if (id_number != null) {
                document.getElementById('Client-Id').innerText = id_number;
                document.getElementById('Client-Id').readOnly = true;
            } else {
                $(".card-id").remove();
            }

            if (tel != null) {
                document.getElementById('Client-Tel').innerText = tel;
                document.getElementById('Client-Tel').readOnly = true;
            } else {
                $(".homePhone-item").remove();
            }
        })

    } else return;

    if (document.getElementById('clientBookmarkInner')) {
        $("#clientBookmarkInner").append("<a class='btn btn-primary btn-sm Client-Profile Rale-Reg' id='login-btn' href='" + home_sessid + "?GET&amp;FILE=[AO_ASSETS]html/patronProfile.html'>Back to Client Profile</a>");
    }
}

const clientLinkOnclick = (e) => {
    var patron_id = getCookie('M2L_PATRON_ID');
    let client_id = patron_id.split(']')[1];
    console.log(client_id)
        // let bookmarkURL = '^HOME_SESSID^?SHOWORDERLIST&NOMSG=[AO_INCLUDES]error\\nobookmark.htm&COOKIE=BOOKMARK'
    let bookmarkURL = `${HOME_SESSID}?SHOWORDERLIST&NOMSG=[AO_INCLUDES]error\\nobookmark.htm&COOKIE=BOOKMARK`;
    let myRequestURL = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/DOC_REQUEST/REQUEST_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20` + client_id + `&NOMSG=[AO_INCLUDES]error\\norequest.htm`;
    let myClientLink = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/ENQUIRIES_VIEW/ENQUIRY_SUMMARY?SESSIONSEARCH&EXP=ENQ_PATRON_ID%20` + client_id + `&NOMSG=[AO_INCLUDES]error\\noenquiry.htm`;
    // let myCopyright    = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/REQUEST_VIEW/COPYRIGHT_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20` + client_id + `%20AND%20REQ_TOPIC%20Copyright%20Services` + `&NOMSG=[AO_INCLUDES]error\\nocopyright.htm`;
    // let myReproduction = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/REQUEST_VIEW/REPROD_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20` + client_id + `%20AND%20REQ_TOPIC%20Reproduction%2FCertification%20Services` + `&NOMSG=[AO_INCLUDES]error\\noreproduction.htm`;
    // else if (e.getAttribute('id') == 'Client-Crowd-Sourcing')
    //     window.location = myCrowdURL;
    // else if (e.getAttribute('id') == 'Client-Copyright')
    //     window.location = myCopyright;
    // else if (e.getAttribute('id') == 'Client-Reproduction')
    //     window.location = myReproduction;
    // else if (e.getAttribute('id') == 'Client-Bookmarks')
    //     window.location = bookmarkURL;
}

function getEditProfileInfo() {
    var patron_id = getCookie('M2L_PATRON_ID');
    patron_id = patron_id.split(']')[1];

    let url = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`;

    $.ajax(url).done(function(res) {
        var x2js = new X2JS();

        var jsonObj = x2js.xml2json(res);
        // console.log(jsonObj);

        // Main 
        var card_number = jsonObj.client.card_number;
        var email = jsonObj.client.email;
        var password = jsonObj.client.password;
        var first_name = jsonObj.client.name_first;
        var last_name = jsonObj.client.name_last;
        var middle_name = jsonObj.client.middle_name;
        var alias_name = jsonObj.client.alias_name;
        var full_name = jsonObj.client.full_name;
        var division = jsonObj.client.client_division;
        var c_type = jsonObj.client.client_type;
        var title = jsonObj.client.title;
        var suffix = jsonObj.client.suffix;
        var language = jsonObj.client.language;
        var org = jsonObj.client.organization;

        // Address
        var line_1 = jsonObj.client.address_line1;
        var line_2 = jsonObj.client.address_line2;
        var line_3 = jsonObj.client.address_line3;
        var city = jsonObj.client.address_city;
        var prov = jsonObj.client.address_prov;
        var country = jsonObj.client.address_country;
        var zip = jsonObj.client.address_zip;

        // Shipping Address
        var ship_line_1 = jsonObj.client.ship_address_line1;
        var ship_line_2 = jsonObj.client.ship_address_line2;
        var ship_line_3 = jsonObj.client.ship_address_line3;
        var ship_city = jsonObj.client.ship_address_city;
        var ship_prov = jsonObj.client.ship_address_prov;
        var ship_country = jsonObj.client.ship_address_country;
        var ship_zip = jsonObj.client.ship_address_zip;

        // Telephone 
        var tel_home = jsonObj.client.tel_home;
        var tel_work = jsonObj.client.tel_work;
        var tel_cell = jsonObj.client.tel_cell;
        var tel_fax = jsonObj.client.tel_fax;


        document.getElementById('clientID').value = card_number;
        document.getElementById('clientID').readOnly = true;
        document.getElementById('clientEmail').value = email;
        document.getElementById('clientEmail').readOnly = true;
        document.getElementById('clientPassword').value = password;
        document.getElementById('clientFirstName').value = first_name;
        document.getElementById('clientFirstName').readOnly = true;
        document.getElementById('clientLastName').value = last_name;
        document.getElementById('clientLastName').readOnly = true;
        middle_name ? document.getElementById('clientMiddleName').value = middle_name : '';
        alias_name ? document.getElementById('clientAlias').value = alias_name : '';

        if (c_type == "Public Body") {
            document.getElementById('clientDivision').value = division;
        } else {
            document.getElementById('clientDivisionID').remove();
        }

        document.getElementById('clientRole').value = c_type;
        document.getElementById('clientRole').readOnly = true;
        document.getElementById('clientLanguage').value = language;
        document.getElementById('clientRole').value = c_type;
        document.getElementById('clientOrg').value = org;


        line_1 != null ? document.getElementById('clientStreetOne').value = line_1 : '';
        line_2 ? document.getElementById('clientStreetTwo').value = line_2 : '';
        line_3 ? document.getElementById('clientStreetThree').value = line_3 : '';
        city ? document.getElementById('clientCity').value = city : '';
        prov ? document.getElementById('clientProv').value = prov : '';
        country ? document.getElementById('clientCountry').value = country : '';
        zip ? document.getElementById('clientPostal').value = zip : '';

        ship_line_1 ? document.getElementById('clientShipStreetOne').value = ship_line_1 : '';
        ship_line_2 ? document.getElementById('clientShipStreetTwo').value = ship_line_2 : '';
        ship_line_3 ? document.getElementById('clientShipStreetThree').value = ship_line_3 : '';
        ship_city ? document.getElementById('clientShipCity').value = ship_city : '';
        ship_prov ? document.getElementById('clientShipProv').value = ship_prov : '';
        ship_country ? document.getElementById('clientShipCountry').value = ship_country : '';
        ship_zip ? document.getElementById('clientShipPostal').value = ship_zip : '';

        tel_home ? document.getElementById('clientHomePhone').value = tel_home : '';
        tel_work ? document.getElementById('clientWorkPhone').value = tel_work : '';
        tel_cell ? document.getElementById('clientCellPhone').value = tel_cell : '';
        tel_fax ? document.getElementById('clientFaxPhone').value = tel_fax : '';


    })
}

const returnToProfile = () => {
    const url = `${home_sessid}?GET&FILE=[AO_ASSETS]html/patronProfile.html`
    window.location = url
}

const redirectToEditProfile = () => {
    let patron_id = getCookie('M2L_PATRON_ID');
    patron_id = patron_id.split(']')[1];

    let url = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`

    $.ajax(url).done(res => {
        var x2js = new X2JS();
        var jsonObj = x2js.xml2json(res);
        let card_number = jsonObj.client.card_number;
        let redirectURL = HOME_SESSID + "?changesinglerecord&database=CLIENT_VIEW&de_form=[AO_ASSETS]html/editProfile.html&EXP=C_CARD_NUMBER%20" + card_number
        window.location = redirectURL
    })
}

const editSkipRecord = () => {
    return '^SKIPRECORD^&DISCONNECT=N&CLOSE=Y&FILE=[AO_ASSETS]html/patronProfile.html'
}