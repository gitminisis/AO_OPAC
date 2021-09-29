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

$(document).ready(function() {
    // console.log(parent.$tmp_data);
    // console.log(parent.$tmp_data)
    // console.log(parent.$tmp_data2)

    // console.log(parent.$tmp_data3)
    if (document.getElementById('reqTopic') != null) {

    if (parent.$tmp_topic == "copyrightServices") {
        $("#reqTopic option#reqGeneral").removeAttr("selected");
        $("#reqTopic option#reqCopyright").attr('selected', true);
        //$("select#reqTopic").attr("disabled", true);
        $(".reqEmailContainer").after("<div class='reqIDContainer col-md-6 col-sm-12'><label for='reqID' class='form-label'>Item ID*</label><input id='reqID' type='text' class='form-control' placeholder='Accession Number' aria-label='Accession Number' name='REQ_ITEM_ID' required='' readonly=''></div>" +
            "<div class='reqSourceContainer col-md-6 col-sm-12'><label for='reqSource' class='form-label'>Item Source*</label><input id='reqSource' type='text' class='form-control' placeholder='Item Source' aria-label='Item Source' name='REQ_DB_NAME' required='' readonly=''></div>" +
            "<div class='reqTitleContainer col-md-6 col-sm-12'><label for='reqTitle' class='form-label'>Item Title*</label><input id='reqTitle' type='text' class='form-control' placeholder='Item Title' aria-label='Item Title' name='REQ_ITEM_TITLE' required='' readonly=''></div>");
        document.getElementById('reqID').value = parent.$tmp_data;
        document.getElementById('reqSource').value = parent.$tmp_data2;
        document.getElementById('reqTitle').value = parent.$tmp_data3;
        document.getElementById('reqItemTitle').value = parent.$tmp_data3;
        document.getElementById('reqMethodRequest').value = "Web";


    }

    if (parent.$tmp_topic == "reproductions") {
        $("#reqTopic option#reqGeneral").removeAttr("selected");
        $("#reqTopic option#reqReproduction").attr('selected', 'selected');
        //$("select#reqTopic").attr("disabled", true);

        $(".reqEmailContainer").after("<div class='reqIDContainer col-md-6 col-sm-12'><label for='reqID' class='form-label'>Item ID*</label><input id='reqID' type='text' class='form-control' placeholder='Accession Number' aria-label='Accession Number' name='REQ_ITEM_ID' required='' readonly=''></div>" +
            "<div class='reqSourceContainer col-md-6 col-sm-12'><label for='reqSource' class='form-label'>Item Source*</label><input id='reqSource' type='text' class='form-control' placeholder='Item Source' aria-label='Item Source' name='REQ_DB_NAME' required='' readonly=''></div>" +
            "<div class='reqTitleContainer col-md-6 col-sm-12'><label for='reqTitle' class='form-label'>Item Title*</label><input id='reqTitle' type='text' class='form-control' placeholder='Item Title' aria-label='Item Title' name='REQ_ITEM_TITLE' required='' readonly=''></div>");
        document.getElementById('reqID').value = parent.$tmp_data;
        document.getElementById('reqSource').value = parent.$tmp_data2;
        document.getElementById('reqTitle').value = parent.$tmp_data3;
        document.getElementById('reqItemTitle').value = parent.$tmp_data3;
        document.getElementById('reqMethodRequest').value = "Web";
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

const requestLinks = ["retrieval.html",
    "request.html",
    "reproductionCertification.html",
    "copyright.html",
    "restrictedHolding.html",
    "loan.html",
    "semiHolding.html",
    "vitalStats.html"
];



// Look for class Page-Heading in page. If found grab the id of the <h1> tag (it's first direct child)
let pageHeading = document.getElementsByClassName('Page-Heading')[0]

// if (document.getElementById('donationForm')) {
//     document.getElementById('donationForm').style.display = 'none'
// }

// if (document.getElementById('requestFormPage')) {
if (patron_id) {
    addRequesLink();
    displayAccountLinks(false);
    removePatronLoginLink();
    if (document.getElementById('Request-Page')) {
        getRequestClientInfo();
    }

} else {
    displayAccountLinks(true);
}

// if (pageHeading) 
// {
//     let pageForm = pageHeading.children[0].getAttribute('id');
//     selectElement('reqTopic', requestDict.get(pageForm));
// }



function addRequesLink() {
    var patron_id = getCookie('M2L_PATRON_ID');
    var patron_name = getCookie('M2L_PATRON_NAME');
    // let requestLink = `<a class='Quick-Links-Item Color-Orange Rale-Med' href='${HOME_SESSID}?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/request.html'><b>Submit a Request</b></a>`
    let reqArr = document.getElementsByClassName('Req-Topic');

    for (let i = 0; i < reqArr.length; i++) {
        reqArr[i].setAttribute('href', `${HOME_SESSID}?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/${reqArr[i].name}.html`);
        reqArr[i].hidden = false;
    }
}

function displayAccountLinks(bool) {
    let clientProfile = document.getElementsByClassName('Client-Profile');
    for (let i = 0; i < clientProfile.length; i++)
        clientProfile[i].hidden = bool;
}

function removePatronLoginLink() {
    if(document.getElementById('Patron-Login') != null){
        let regLink = document.getElementsByClassName('Patron-Reg');
        let regLogin = document.getElementById('Patron-Login');      
        let regLoginMobile = document.getElementById('Patron-Login-Mobile');      

        regLogin.hidden = true;
        regLoginMobile.hidden = true;
        for (let i = 0; i < regLink.length; i++) {
            regLink[i].hidden = true;
        }
    }
}


function getRequestClientInfo() {

    let patron_id = getCookie('M2L_PATRON_ID');
    patron_id = patron_id.split(']')[1];


    let url = `https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`

    // let tempString = window.location.href;
    // let tempUrlCheck = tempString.split("/");

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
            document.getElementById('reqTopic').readOnly = true;


            // document.getElementById('reqAffiliation').hidden = true;
            // document.getElementById('reqPatronID').value = patron_id;

        


        });

    }

}

// function getRequestClientInfo() {
//     let patron_id = getCookie('M2L_PATRON_ID');

//     patron_id = patron_id.split(']')[1];

//     // Get the current window.location URI
//     let tempString = window.location.href;

//     // Split the URI on "/" and take the last element of the array
//     let tempUrlCheck = tempString.split("/");
//     for (i = 0; i < requestLinks.length; i++) {
//         if (tempUrlCheck[tempUrlCheck.length - 1] == requestLinks[i]) {

//             let url = `https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`
//             $.ajax(url).done(function(res) {
//                 console.log(res)
//                 let x2js = new X2JS();

//                 let jsonObj = x2js.xml2json(res);
//                 let first_name = jsonObj.client.name_first;
//                 let last_name = jsonObj.client.name_last;
//                 let full_name = `${first_name} ${last_name}`
//                 let email = jsonObj.client.email;

//                 document.getElementById('reqFullName').value = full_name;
//                 document.getElementById('reqFirstName').value = first_name;
//                 document.getElementById('reqFirstName').readOnly = true;
//                 document.getElementById('reqLastName').value = last_name;
//                 document.getElementById('reqLastName').readOnly = true;
//                 document.getElementById('reqEmail').value = email;
//                 document.getElementById('reqEmail').readOnly = true;

//             })
//         }
//     }

// }

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

    window.location(`http://aoopac.minisisinc.com/scripts/mwimain.dll/144/DOC_REQUEST/REQUEST_SUMMARY?SESSIONSEARCH&EXP=REQ_PATRON_ID%20${patron_id}&NOMSG=[AO_INCLUDES]error\\norequest.htm`)
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