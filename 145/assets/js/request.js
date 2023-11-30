// $(document).ready(function () {
//     // document.getElementById('donationForm').style.display = 'none'

// const { link } = require("fs");

// });

$(document).ready(function() {
    // console.log(parent.$tmp_data);
    // console.log(parent.$tmp_data2)
    // console.log(parent.$tmp_data3)
    var SESSID = getCookie("HOME_SESSID");

    if (document.getElementById('reqTopic') != null) {

        if (parent.$tmp_topic == "copyrightServices") {

            $("#reqTopic option#reqGeneral").removeAttr("selected");
            $("#reqTopic option#reqCopyright").attr('selected', 'selected');
            //$("select#reqTopic").attr("disabled", true);
            $(".reqEmailContainer").after("<div class='reqIDContainer col-md-6 col-sm-12'><label for='reqID' class='form-label'>ID d'élément*</label><input id='reqID' type='text' class='form-control' placeholder='Numéro d'acquisition' aria-label='Accession Number' name='REQ_ITEM_ID' required='' readonly=''></div>" +
                "<div class='reqSourceContainer col-md-6 col-sm-12'><label for='reqSource' class='form-label'>Source de l'élément*</label><input id='reqSource' type='text' class='form-control' placeholder='Source de l'élément' aria-label='Item Source' name='REQ_DB_NAME' required='' readonly=''></div>" +
                "<div class='reqTitleContainer col-md-6 col-sm-12'><label for='reqTitle' class='form-label'>Titre de l'élément*</label><input id='reqTitle' type='text' class='form-control' placeholder='Titre de l'élément' aria-label='Item Title' name='REQ_ITEM_TITLE' required='' readonly=''></div>");
            document.getElementById('reqID').value = parent.$tmp_data;
            document.getElementById('reqSource').value = parent.$tmp_data2;
            document.getElementById('reqTitle').value = parent.$tmp_data3;
            document.getElementById('reqItemTitle').value = parent.$tmp_data3;
            document.getElementById('reqMethodRequest').value = "Web";
            document.getElementById('reqType').focus()

        }

        if (parent.$tmp_topic == "reproductions") {

            $("#reqTopic option#reqGeneral").removeAttr("selected");
            $("#reqTopic option#reqReproduction").attr('selected', 'selected');
            //$("select#reqTopic").attr("disabled", true);

            $(".reqEmailContainer").after("<div class='reqIDContainer col-md-6 col-sm-12'><label for='reqID' class='form-label'>ID d'élément*</label><input id='reqID' type='text' class='form-control' placeholder='Numéro d'acquisition' aria-label='Numéro d'acquisition' name='REQ_ITEM_ID' required='' readonly=''></div>" +
                "<div class='reqSourceContainer col-md-6 col-sm-12'><label for='reqSource' class='form-label'>Source de l'élément*</label><input id='reqSource' type='text' class='form-control' placeholder='Source de l'élément' aria-label='Source de l'élément' name='REQ_DB_NAME' required='' readonly=''></div>" +
                "<div class='reqTitleContainer col-md-6 col-sm-12'><label for='reqTitle' class='form-label'>Titre de l'élément*</label><input id='reqTitle' type='text' class='form-control' placeholder='Titre de l'élément' aria-label='Titre de l'élément' name='REQ_ITEM_TITLE' required='' readonly=''><input id='reqRepro' type='text' class='form-control' placeholder='Reproduction?' aria-label='Reproduction?' name='REQ_REPRO' required='' readonly='' hidden><input id='reqQueue' type='text' class='form-control' placeholder='File d'attente' aria-label='File d'attente' name='REQ_QUEUE' required='' readonly='' hidden><input id='reqSelected' type='text' class='form-control' placeholder='Sélectionné' aria-label='Sélectionné' name='REQ_SELECTED' required='' readonly='' hidden><input id='recStatus' type='text' class='form-control' placeholder='État' aria-label='État' name='REC_STATUS' required='' readonly='' hidden><input id='reqStatus' type='text' class='form-control' placeholder='État de la demande' aria-label='État de la demande' name='REQ_STATUS' required='' readonly='' hidden></div>");
            document.getElementById('reqID').value = parent.$tmp_data;
            document.getElementById('reqSource').value = parent.$tmp_data2;
            document.getElementById('reqTitle').value = parent.$tmp_data3;
            document.getElementById('reqItemTitle').value = parent.$tmp_data3;
            document.getElementById('reqMethodRequest').value = "Web";
            document.getElementById('reqRepro').value = "Y";
            document.getElementById('reqQueue').value = "X";
            document.getElementById('reqSelected').value = "X";
            document.getElementById('recStatus').value = "Active";
            document.getElementById('reqStatus').value = "Retrieve";
            document.getElementById('reqType').focus()

        }

        // let value = document.getElementById('reqTopic').value;
        // setupTopicForm(value);
        // $('#reqTopic').on('change', function(e) {
        //     console.log(e.target.value)
        //     let value = e.target.value
        //     setupReqTopicForm(value)
        // })
    }

    // This is a continuation function that requires storeAdditionalReqFields(btn_number) from detail.js
<<<<<<< HEAD
    if (document.getElementById("direct-request-form") != null) {
=======
    if(document.getElementById("direct-request-form") != null){
>>>>>>> 08dbde68d64df01cdb7fd31cb451ee6a4eef3128
        let call_number = sessionStorage.getItem("Call Number");
        let volume_id = sessionStorage.getItem("Volume ID");
        console.log('call number: ', call_number, 'vol id: ', volume_id)
        $(".para1").after("<p class='para2'>Numéro d'appel : <strong>" + 'chicken' + "</strong></p><p class='para2'>ID de volume : <strong>" + volume_id + "</strong></p>");
    }
<<<<<<< HEAD
    if (document.getElementById("request-confirmation-form") != null) {
=======
    if(document.getElementById("request-confirmation-form") != null){
>>>>>>> 08dbde68d64df01cdb7fd31cb451ee6a4eef3128
        let call_number = sessionStorage.getItem("Call Number");
        let volume_id = sessionStorage.getItem("Volume ID");
        console.log('call number: ', call_number, 'vol id: ', volume_id)
        $(".refd-dd").after("<dt class='call-num-dt'>Numéro d'appel</dt><dd class='call-number-dd'>" + 'chicken' + "</dd><dt class='volume-id-dt'>ID de volume</dt><dd class='volume-id-dd'>" + volume_id + "</dd>");

        sessionStorage.removeItem("Call Number");
        sessionStorage.removeItem("Volume ID");
    }
});

// Look for class Page-Heading in page. If found grab the id of the <h1> tag (it's first direct child)
let pageHeading = document.getElementsByClassName('Page-Heading')[0]

// if (document.getElementById('donationForm')) {
//     document.getElementById('donationForm').style.display = 'none'
// }
// if (document.getElementById('requestFormPage')) {
let patronCookie = getCookie("M2L_PATRON_ID");
if (patronCookie === undefined || patronCookie === '' || patronCookie === '[M2L_PATRON_ID]') {
    displayAccountLinks(true);

} else {
    // addRequesLink();
    displayAccountLinks(false);
    removePatronLoginLink();
    // Error below. ID Request-Page is in the colorbox and cannot be grabbed when its not open where JS loads before the colorbox is even clicked(Copyright, Reproduction, etc..)
    // if (document.getElementById('Request-Page')) {
    getRequestClientInfo();
    // } 

}

function displayAccountLinks(bool) {
    let clientProfile = document.getElementsByClassName('Client-Profile');
    for (let i = 0; i < clientProfile.length; i++)
        clientProfile[i].hidden = bool;
}


/**
 * 06/15/2022
 * Mike Hoang
 * Added for loop to hide all Login Buttons
 */
function removePatronLoginLink() {
    let loginBtn = document.getElementsByClassName('pub-sec-login-btn');
    try {
        for (let i = 0; i < loginBtn.length; i++) {
            loginBtn[i].hidden = true;
        }

    } catch (e) {
        console.log('Error: ', e)
    }
}


function getRequestClientInfo() {

    patron_id = patron_id.split(']')[1];


<<<<<<< HEAD
    let url = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/145/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`
=======
    let url = `https://aims.archives.gov.on.ca/scripts/mwimain.dll/145/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`
>>>>>>> 08dbde68d64df01cdb7fd31cb451ee6a4eef3128


    if (document.getElementById('Request-Form') != null) {

        $.ajax(url).done(function(res) {
            let x2js = new X2JS();

            let jsonObj = x2js.xml2json(res);
            let first_name = jsonObj.client.name_first;
            let last_name = jsonObj.client.name_last;
            let full_name = `${first_name} ${last_name}`
            let email = jsonObj.client.email;
            let c_type = jsonObj.client.client_type;
            let client_id = jsonObj.client.card_number;

            // console.log(jsonObj);
            document.getElementById('reqFullName').value = full_name;
            document.getElementById('reqFirstName').value = first_name;
            document.getElementById('reqFirstName').readOnly = true;
            document.getElementById('reqLastName').value = last_name;
            document.getElementById('reqLastName').readOnly = true;
            document.getElementById('reqEmail').value = email;
            document.getElementById('reqEmail').readOnly = true;
            document.getElementById('reqAffiliation').value = c_type;
            document.getElementById('reqAffiliation').readOnly = true;
            document.getElementById('reqClientID').value = client_id;
            document.getElementById('reqTopic').disabled = true;
            // document.getElementById('reqType').autofocus = true;
        });

    }

}

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}


const setRequestTopic = () => {

    let reqTopic = document.getElementById('reqTopic');

    if (reqTopic == null) return;

    let url = window.location.href;
    let urlParams = new URL(url);
    var request = urlParams.searchParams.get('request');
    reqTopic.value = request == null ? 'General' : request;
}

function goToClientRequest() {
    let patron_id = getCookie('M2L_PATRON_ID');
    patron_id = patron_id.split(']')[1];

<<<<<<< HEAD
    window.location(`https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/145/DOC_REQUEST/REQUEST_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20${patron_id}&NOMSG=[ao_opac]/145/includes/error\\norequest.htm`)
=======
    window.location(`https://aims.archives.gov.on.ca/scripts/mwimain.dll/145/DOC_REQUEST/REQUEST_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20${patron_id}&NOMSG=[ao_opac]/145/includes/error\\norequest.htm`)
>>>>>>> 08dbde68d64df01cdb7fd31cb451ee6a4eef3128
}

function toggleReqTopicForm(value, option, id) {
    if (option === value) {
        document.getElementById(id).style.display = 'inherit'
    } else {
        document.getElementById(id).style.display = 'none'
    }
}

function setupReqTopicForm(value) {
    toggleReqTopicForm(value, "Donations", "donationForm")
    toggleReqTopicForm(value, "Loan/Exhibitions", "loanForm")
    toggleReqTopicForm(value, "Request Transfer", "requestTransferForm")
    toggleReqTopicForm(value, "Request Refile/Interfile", "requestRefileForm")
    toggleReqTopicForm(value, "Record Schedule", "requestScheduleForm")
    toggleReqTopicForm(value, "Transfer Agreement", "transferForm")
    toggleReqTopicForm(value, "Record Disposition", "dispositionForm")
    toggleReqTopicForm(value, "Acquisitions", "acquisitionForm")
}


// get home session ID
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '[' + cname + ']';
}

// decode encoded XML string
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    var result = txt.value;
    if (result.indexOf('&') >= 0) {
        txt.innerHTML = result;
        result = txt.value;
    }

    return result;
}

// search for XML tag value
function getXmlFieldValue(xml_parent, xml_tag) {
    var result = "";

    var xml_nodes = xml_parent.getElementsByTagName(xml_tag);
    if (xml_nodes.length > 0) {
        result = decodeHtml(xml_nodes[0].textContent);
        if (result == null) {
            result = "";
        }
    }

    return result;
}

function cancel_request(req_order_num) {
    var m2aonline_url = getCookie('HOME_SESSID') + "?MANIPXMLRECORD&KEY=REQ_ORDER_NUM&VALUE=" + req_order_num + "&DATABASE=REQUEST_INFO";
    var xmlForm = '<?xml version="1.0" encoding="UTF-8"?>\n<RECORD>\n';
    xmlForm = xmlForm.concat('<REC_STATUS>Deleted</REC_STATUS>\n');

    $.ajax({
        async: false,
        type: "POST",
        url: m2aonline_url,
        contentType: "text/xml",
        dataType: "xml",
        data: xmlForm,
        processData: false,
        cache: false,
        timeout: 300000,
        success: function(data, textStatus, xhr) {
            if (jQuery.isXMLDoc(data)) {
                var xml_value = getXmlFieldValue(data, "error");
                if (xml_value != '' && parseInt(xml_value, 10) == 0) {
                    // alert ('Status is changed');
                    window.location.reload();
                }
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}