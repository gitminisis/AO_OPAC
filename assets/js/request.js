// $(document).ready(function () {
//     // document.getElementById('donationForm').style.display = 'none'

// const { link } = require("fs");

// });

$(document).ready(function() {
    // console.log(parent.$tmp_data);
    // console.log(parent.$tmp_data2)
    // console.log(parent.$tmp_data3)

    if (document.getElementById('reqTopic') != null) {

        if (parent.$tmp_topic == "copyrightServices") {

            $("#reqTopic option#reqGeneral").removeAttr("selected");
            $("#reqTopic option#reqCopyright").attr('selected', 'selected');
            //$("select#reqTopic").attr("disabled", true);
            $(".reqEmailContainer").after("<div class='reqIDContainer col-md-6 col-sm-12'><label for='reqID' class='form-label'>Item ID*</label><input id='reqID' type='text' class='form-control' placeholder='Accession Number' aria-label='Accession Number' name='REQ_ITEM_ID' required='' readonly=''></div>" +
                "<div class='reqSourceContainer col-md-6 col-sm-12'><label for='reqSource' class='form-label'>Item Source*</label><input id='reqSource' type='text' class='form-control' placeholder='Item Source' aria-label='Item Source' name='REQ_DB_NAME' required='' readonly=''></div>" +
                "<div class='reqTitleContainer col-md-6 col-sm-12'><label for='reqTitle' class='form-label'>Item Title*</label><input id='reqTitle' type='text' class='form-control' placeholder='Item Title' aria-label='Item Title' name='REQ_ITEM_TITLE' required='' readonly=''></div>");
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

            $(".reqEmailContainer").after("<div class='reqIDContainer col-md-6 col-sm-12'><label for='reqID' class='form-label'>Item ID*</label><input id='reqID' type='text' class='form-control' placeholder='Accession Number' aria-label='Accession Number' name='REQ_ITEM_ID' required='' readonly=''></div>" +
                "<div class='reqSourceContainer col-md-6 col-sm-12'><label for='reqSource' class='form-label'>Item Source*</label><input id='reqSource' type='text' class='form-control' placeholder='Item Source' aria-label='Item Source' name='REQ_DB_NAME' required='' readonly=''></div>" +
                "<div class='reqTitleContainer col-md-6 col-sm-12'><label for='reqTitle' class='form-label'>Item Title*</label><input id='reqTitle' type='text' class='form-control' placeholder='Item Title' aria-label='Item Title' name='REQ_ITEM_TITLE' required='' readonly=''><input id='reqRepro' type='text' class='form-control' placeholder='Reproduction?' aria-label='Reproduction?' name='REQ_REPRO' required='' readonly='' hidden><input id='reqQueue' type='text' class='form-control' placeholder='Queue' aria-label='Queue' name='REQ_QUEUE' required='' readonly='' hidden><input id='reqSelected' type='text' class='form-control' placeholder='Selected' aria-label='Selected' name='REQ_SELECTED' required='' readonly='' hidden><input id='recStatus' type='text' class='form-control' placeholder='Status' aria-label='Status' name='REC_STATUS' required='' readonly='' hidden><input id='reqStatus' type='text' class='form-control' placeholder='Request Status' aria-label='Request Status' name='REQ_STATUS' required='' readonly='' hidden></div>");
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
});

// Look for class Page-Heading in page. If found grab the id of the <h1> tag (it's first direct child)
let pageHeading = document.getElementsByClassName('Page-Heading')[0]

// if (document.getElementById('donationForm')) {
//     document.getElementById('donationForm').style.display = 'none'
// }

// if (document.getElementById('requestFormPage')) {
if (patron_id != '') {
    // addRequesLink();
    displayAccountLinks(false);
    removePatronLoginLink();
    // Error below. ID Request-Page is in the colorbox and cannot be grabbed when its not open where JS loads before the colorbox is even clicked(Copyright, Reproduction, etc..)
    // if (document.getElementById('Request-Page')) {
    getRequestClientInfo();
    // } 
} else {
    displayAccountLinks(true);
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

    let patron_id = getCookie('M2L_PATRON_ID');
    patron_id = patron_id.split(']')[1];


    let url = `https://uataoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`


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
    var patron_id = getCookie('M2L_PATRON_ID');
    patron_id = patron_id.split(']')[1];

    window.location(`https://uataoopac.minisisinc.com/scripts/mwimain.dll/144/DOC_REQUEST/REQUEST_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20${patron_id}&NOMSG=[AO_INCLUDES]error\\norequest.htm`)
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