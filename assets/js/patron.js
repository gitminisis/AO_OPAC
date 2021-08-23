$(document).ready(function() {
    getPatronClientInfo()


    $("button.colorbox-edit-client").click(function(e) {
        let evt = e;
        // $(this).parent().parent().find(".cs-item-sisn");

        var accession = $(this).parent().parent().find(".cs-item-id");
        var reqSource = $(this).parent().parent().find(".cs-item-src");
        var title = $(this).parent().parent().find(".cs-item-title");
        var topicCheck = "reproductions";


        $.colorbox({
            iframe:true,
            transition: "elastic",
            width:"1200px",
            height:"780px",
            overlayClose: true,
            href:HOME_SESSID + "?addsinglerecord&database=CLIENT_VIEW&de_form=[AO_ASSETS]html/editProfile.html&new=y",
            onLoad: function() {

                console.log(evt);
                console.log(evt.target.id);


                $tmp_data = accession.text(); // ACCESSION NUMBER --- F 26 G
                $tmp_data2 = reqSource.text(); // REQ_SOURCE DESCRIPTION COLLECTION LIBRARY
                $tmp_data3 = title.text(); // LEGAL_TITLE -- Story Book Woman

                $tmp_topic = topicCheck;
              

            },
            onComplete: function() {
                //$("#test_btn").click();
                
            },
            onClose: function() {
                delete $tmp_data;
                delete $tmp_data2;
                delete $tmp_data3;

                delete $tmp_topic;

           }

        });
    });

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
            console.log(jsonObj)
            let first_name = jsonObj.client.name_first;
            let last_name = jsonObj.client.name_last;
           //let full_name = `${first_name} ${last_name}`
            let organization = jsonObj.client.organization
            let tel = jsonObj.client.tel_home
            let card_number = jsonObj.client.card_numbe;
            let email = jsonObj.client.email;
            let emailLink = `mailto: ${email}`


            document.getElementById('Client-First').innerText = first_name;
            document.getElementById('Client-First').readOnly = true;
            document.getElementById('Client-Last').innerText = last_name;
            document.getElementById('Client-Last').readOnly = true;
            // document.getElementById('Client-Full').innerText = full_name;
            // document.getElementById('Client-Full').readOnly = true;
            document.getElementById('Client-Email').innerText = email;
            document.getElementById('Client-Email').setAttribute("href", emailLink);

            if(organization != null) {
                document.getElementById('Client-Org').innerText = organization;
                document.getElementById('Client-Org').readOnly = true;
            } else {
                $(".organization-item").remove();
            }
            
            if(card_number != null) {
                document.getElementById('Client-Card').innerText = card_number;
                document.getElementById('Client-Card').readOnly = true;
            } else {
                $(".card-item").remove();
            }
            
            if(tel != null) {
                document.getElementById('Client-Tel').innerText = tel;
                document.getElementById('Client-Tel').readOnly = true;
            } else {
                $(".homePhone-item").remove();
            }
        })
    } else return;



}

const clientLinkOnclick = (e) => {
    let client_id = patron_id.split(']')[1];

    // let bookmarkURL = '^HOME_SESSID^?SHOWORDERLIST&NOMSG=[AO_INCLUDES]error\\nobookmark.htm&COOKIE=BOOKMARK'
    let bookmarkURL = `${HOME_SESSID}?SHOWORDERLIST&NOMSG=[AO_INCLUDES]error\\nobookmark.htm&COOKIE=BOOKMARK`;
    let myRequestURL = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/DOC_REQUEST/REQUEST_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20` + client_id + `&NOMSG=[AO_INCLUDES]error\\norequest.htm`;
    let myClientLink = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/ENQUIRIES_VIEW/ENQUIRY_SUMMARY?SESSIONSEARCH&EXP=ENQ_PATRON_ID%20` + client_id + `&NOMSG=[AO_INCLUDES]error\\noenquiry.htm`;
    let myCrowdURL = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/COMMENTS_VIEW/CROWD_SOURCE_SUMMARY?SESSIONSEARCH&EXP=CREATOR_ID%20` + client_id + `&NOMSG=[AO_INCLUDES]error\\nocrowd.htm`;
    let myCopyright = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/REQUEST_VIEW/COPYRIGHT_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20` + client_id + `%20AND%20REQ_TOPIC%20Copyright%20Services` + `&NOMSG=[AO_INCLUDES]error\\nocopyright.htm`;
    let myReproduction = `http://aoopac.minisisinc.com/scripts/mwimain.dll/144/REQUEST_VIEW/REPROD_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20` + client_id + `%20AND%20REQ_TOPIC%20Reproduction%2FCertification%20Services` + `&NOMSG=[AO_INCLUDES]error\\noreproduction.htm`;
    
    if (e.getAttribute('id') == 'Client-Request')
        window.location = myRequestURL;
    else if (e.getAttribute('id') == 'Client-Crowd-Sourcing')
        window.location = myCrowdURL;
    else if (e.getAttribute('id') == 'Client-Enquiry')
        window.location = myClientLink;
    else if (e.getAttribute('id') == 'Client-Copyright')
        window.location = myCopyright;
    else if (e.getAttribute('id') == 'Client-Reproduction')
        window.location = myReproduction;
    else
        window.location = bookmarkURL;
}

