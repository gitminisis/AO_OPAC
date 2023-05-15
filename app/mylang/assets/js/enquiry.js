Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '-' : '-0') + mm,
        (dd > 9 ? '-' : '-0') + dd
    ].join('');
};



$(document).ready(function() {
    enableDatePicker()
    let enq_id_confirm = $('#enq_id_confirm').text();
    // console.log(document.getElementById('enq_id_confirm'))
    if (enq_id_confirm) {
        $("#success-enquiry").append(`<br /><br /><span>Inquiry Reference Number: ${enq_id_confirm}</span>`)
    }
    getBarcodeInquiryInfo();

    if (document.getElementById('enqTopic') != null) {
        setEnquiryTopic()

        let value = document.getElementById('enqTopic').value;
        setupTopicForm(value)



        if (document.getElementById('first_cor')) {
            generateFirstCorrespondence()
        } else if (document.getElementById('edit_enq')) {
            generateEditableCorrespondence();

            document.getElementById('enqTopic').disabled = true;
            document.getElementById('enqTitle').readOnly = true;
            document.getElementById('enqDetail').readOnly = true;
        }




        let patron_id = getCookie("M2L_PATRON_ID");

        if (patron_id !== '[M2L_PATRON_ID]') {
            getClientInfo();

        } else {
            setAffinity('Public User')
            document.getElementById('enqLastName').value
            document.getElementById('enqFirstName').focus();
        }



        // Confirm Page



        $('#enqFirstName').on('change', function() {
            let firstName = document.getElementById('enqFirstName').value;
            let lastName = document.getElementById('enqLastName').value;

            fullName = firstName + ' ' + lastName;
            document.getElementById('enqFullName').value = fullName
            if (document.getElementById('first_cor')) {
                document.getElementById('enqCorWho').value = fullName
            }
        })

        $('#enqLastName').on('change', function() {
            let firstName = document.getElementById('enqFirstName').value;
            let lastName = document.getElementById('enqLastName').value;

            fullName = firstName + ' ' + lastName;
            document.getElementById('enqFullName').value = fullName
            if (document.getElementById('first_cor')) {
                document.getElementById('enqCorWho').value = fullName
            }
        })

        $('#enq-title').on('change', function() {
            if (document.getElementById('first_cor')) {
                document.getElementById('enqCorSub').value = $(this).val()
                console.log(document.getElementById('enqCorSub').value)
            }
        })

        $('#enqDetail').on('keyup', function() {
            if (document.getElementById('first_cor')) {
                document.getElementById('enqCorText').value = $(this).val()
            }
        })

        $('#enqTopic').on('change', function(e) {
            let value = e.target.value
            setupTopicForm(value)
        })
        let status;
        try{
            status = document.getElementById('enqStatus').value;
        } catch (e) {console.log(e)}

        if (status === 'Closed') {

            // Disable some input fields

            $("#enqFirstName").prop("disabled", true)
            $("#enqLastName").prop("disabled", true)
            $("#enqEmail").prop("disabled", true)
            $("#enqPhone").prop("disabled", true)

            // Add closed status indication text
            $('#Enquiry-Form').prepend('<h3 style="text-align: center; color:red">This inquiry has been closed</h3>')
            $('#submit-enquiry').remove();
        }


        // parse ENQ_PATRON_NAME
        var full_name = '';
        if (document.getElementById('enqFullName') != null) {
            full_name = document.getElementById('enqFullName').value;
        }
        var name_comp = full_name.split(' ');
        var ix = 0;

        // extract first name
        while (ix < name_comp.length && name_comp[ix] == '') {
            ix++;
        }
        if (ix < name_comp.length) {
            // set "enqFirstName" field to first name
            document.getElementById('enqFirstName').value = name_comp[ix].replace(',', '');
            ix++;
        }

        // extract last name
        while (ix < name_comp.length && name_comp[ix] == '') {
            ix++;
        }
        if (ix < name_comp.length) {
            // set "enqLastName" field to last name
            document.getElementById('enqLastName').value = name_comp[ix].replace(',', '');
            ix++;
        }

        window.addEventListener('beforeunload', function(e) {
            // e.preventDefault();  // turn off confirmation message

            if (typeof enquiry_submitted != 'undefined' && !enquiry_submitted) {
                if (typeof close_enquiry_url != 'undefined') {
                    unlockRecord(close_enquiry_url);
                }
            }
            return true; // return true to close web page
        });

    } // if "EnqTopic" != null
}); //Document Ready Function End

function getClientInfo() {

    let patron_id = getCookie('M2L_PATRON_ID');

    patron_id = patron_id.split(']')[1];


    let url = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`

    let tempString = window.location.href;
    let tempUrlCheck = tempString.split("/");
    let enquiry = tempUrlCheck[tempUrlCheck.length - 1].split('&')[0]



    $.ajax(url).done(function(res) {
        let x2js = new X2JS();

        let jsonObj = x2js.xml2json(res);
        if (jsonObj && jsonObj.client) {
            let first_name = jsonObj.client.name_first;
            let last_name = jsonObj.client.name_last;
            let full_name = `${first_name} ${last_name}`
            let email = jsonObj.client.email;
            let tel = jsonObj.client.tel_home;


            document.getElementById('enqFullName').value = full_name;
            document.getElementById('enqFirstName').value = first_name;
            document.getElementById('enqFirstName').readOnly = true;
            document.getElementById('enqLastName').value = last_name;
            document.getElementById('enqLastName').readOnly = true;
            document.getElementById('enqEmail').value = email;
            document.getElementById('enqEmail').readOnly = true;
            if (tel) {
                document.getElementById('enqPhone').value = tel;
                document.getElementById('enqPhone').readOnly = true;
            } else document.getElementById('enqPhone').focus();





            setAffinity(jsonObj.client.client_type);



            if (document.getElementById('first_cor')) {
                document.getElementById('enqPatronID').value = patron_id;

                document.getElementById('enqCorWho').value = full_name
            }
        }

    })




}

// send MWI SKIPRECORD command to unlock record ig web page is closed.
function unlockRecord(close_url) {
    if (navigator.sendBeacon) {
        // add dummy form data because sendBeacon sends post HTTP request
        var formData = new FormData();
        formData.append('SKIP', 'YES');
        var status = navigator.sendBeacon(close_url, formData);
    }
}

// send flag to indciate record has been unlocked
function setSubmitFlag() {
    if (typeof enquiry_submitted != 'undefined') {
        enquiry_submitted = true;
    }
    return true;
}

function generateFirstCorrespondence() {
    document.getElementById('enqCorDate').value = new Date().yyyymmdd();
}

function setAffinity(affinity) {
    $('#enqAffliation').val(affinity)
}

function generateEditableCorrespondence() {

    let enq_id = document.getElementById('enqID').value;
    let url_str = `https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/ENQUIRIES_VIEW/ENQUIRY_DETAIL?SESSIONSEARCH&EXP=ENQ_ID ${enq_id}&NOMSG=[AO_INCLUDES]error/noenquiry.htm#`

    $.ajax(url_str).done(function(res) {
        let x2js = new X2JS({
            arrayAccessFormPaths: [
                "xml.cor_group.item"
            ]
        });

        let jsonObj = x2js.xml2json(res);

        let cor_div = document.getElementById("cor_div");
        let len = jsonObj.xml.cor_group.item.length

        jsonObj.xml.cor_group.item.map((el, idx) => {

                $('#cor_div').append(generateCorForm(el, idx, len, false))

                // $('#cor_div').append(generateCorForm(el, idx, len, false))
            })
            // console.log($('#cor_div'))
        let status = document.getElementById('enqStatus').value;
        if (status !== "Closed") {
            $('#cor_div').append(generateCorForm(null, len, len, true))
        }


        $('#cor_div').slick({
            infinite: false,
            draggable: false,
            prevArrow: '<button type="button" id="inquiry-prev-btn"  class="slick-prev cor-prev-btn cor-btn btn btn-primary" disabled>Previous Message</button>',
            nextArrow: '<button type="button" id="inquiry-next-btn"  class="slick-next cor-next-btn cor-btn btn btn-primary">Next Message</button>'
        });
        nextObserver();
        prevObserver();
    })

}

function generateCorForm(data, idx, len, edit = false) {
    let status = document.getElementById('enqStatus').value;
    let maxLength = status === "Closed" ? len : len + 1;
    let newOcc =
        `$${Number.parseInt(len) + 1}$1`;
    return (`<div class="card"> <div class="card-header"> <h5 class="mb-0"> <button class="btn" type="button" data-toggle="collapse show" data-target="collapse${idx}" aria-expanded="true" aria-controls="collapse${idx}">  Response ${Number.parseInt(idx) + 1}/${maxLength}: ${data ? data.cor_sub : "New Reply"}  </button> </h5> </div> <div id="collapse${idx}" class="collapse show" aria-labelledby="headingOne" data-parent="cor_div"> <div class="card-body"> 

    <div class="col-md-12 col-sm-12">
    <label for="corDate" class="form-label">Date</label>
    <input name=${edit ? `CORRESPOND_DATE${newOcc}` : `"" `}  value=${edit ? `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` : data.cor_date}  type="text" id=${edit ? ' "corDate" ' : ' "" '}class="form-control date-control" placeholder="Date" aria-label="Date"   ${edit ? 'readonly' : 'readonly'}/>
    </div>
    <br />
    <div class="col-md-12 col-sm-12">
    <label for="corType" class="form-label">Type</label>
    <input name=${edit ? `CORRESPOND_TYPE${newOcc}` : `"" `} value=${edit ? ' "Incoming" ' : data.cor_type} type="text" id="corType" class="form-control type-control" placeholder="Type" aria-label="Type"  ${edit ? 'readonly' : 'readonly'}/>
    </div>
    <br />
    <div class="col-md-12 col-sm-12">
    <label for="corWho" class="form-label">Sender</label>
    <input name=${edit ? `CORRESPOND_WHO${newOcc}` : `"" `} value=${edit ? `"${$('#enqFullName').val()}"` : ` "${data.cor_who ? data.cor_who : ""}" `} type="text" id="corWho" class="form-control sender-control" placeholder="Sender" aria-label="Sender"  ${edit ? 'readonly' : 'readonly'} />
    </div>
    <br />
    <div class="col-md-12 col-sm-12">
    <label for="corSubj" class="form-label">Subject</label>
    <input name=${edit ? `CORRESPOND_SUBJ${newOcc}` : `"" `} value=${edit ? ' "" ' : ` "${data.cor_sub}" `} type="text" id="corSubj" class="form-control subject-control" placeholder="Subject" aria-label="Subject"  ${edit ? '' : 'readonly'} />
    </div>
    <br />
    <div class="col-md-12 col-sm-12">
    <label for="enqDetail" class="form-label">Message Text*</label>

    ${edit ? ` <textarea class="form-control Rale-Reg"  placeholder="Leave a message here" id="enqDetail" name=${`MESSAGE_TEXT${newOcc}`} }></textarea>` : `<div class="enqCorrespondenceTextbox"> ${data.cor_text ? decodeTextField(data.cor_text) : ""}</div>`}
   

    ${edit ?
            "" :
            `${data.link_path != null}` ?
                `<br /><div class="col-md-12 col-sm-12"><label for="linkPath" class="form-label">${data.link_path != null ? "Media" : ""}</label><a name=${`LINK_PATH${newOcc}`} id="linkPath" href=${data.link_path} target='_blank'>${data.link_path != null ? data.link_path : ""}</a></div>` :
                ""}
 
    
    
    ${edit ? "" : `<br /><div class="col-md-12 col-sm-12"><label for="linkType" class="form-label" ${data.link_type != null ? '' : 'hidden'}>${data.link_type != null ? "Media Type" : ""}</label>
    <input name="${edit ? `LINK_TYPE${newOcc}` : ""}" value="${data.link_type != null ? data.link_type : ""}" type="text" id="linkType" class="form-control subject-control" aria-label="Media Type"  ${data.link_type != null ? 'readonly' : 'hidden'} /></div>`}
    

    </div>

    </div> </div> </div>`)
}
// const redirectToEnquiry = (sessid, e, barcode, title, refd) => {
//     sessionStorage.removeItem("Desc Inquiry");
//     let url = `${sessid}?addsinglerecord&database=ENQUIRIES_VIEW&de_form=[AO_ASSETS]html/enquiry.html&topic=${e.getAttribute('name')}&subj=${e.getAttribute('subj')}`;
//     let url2 = `${sessid}?addsinglerecord&database=ENQUIRIES_VIEW&de_form=[AO_ASSETS]html/enquiry.html&topic=${e.getAttribute('name')}&barcode=${barcode}&refd=${refd}&title=${title}`;
//     let url3 = `${sessid}?addsinglerecord&database=ENQUIRIES_VIEW&de_form=[AO_ASSETS]html/enquiry.html&subj=${e.getAttribute('subj')}&vol=${e.getAttribute('vol')}&callNum=${e.getAttribute('callNum')}&title=${e.getAttribute('title')}`;
//     if (!barcode || !refd) window.location = url;
//     else {
//         sessionStorage.setItem("Desc Inquiry", "True");
//         window.location = url2;
//     }
// }

redirectToEnquiry = (sessid, subj=null) => {
    let url = `${sessid}?addsinglerecord&database=ENQUIRIES_VIEW&de_form=[AO_ASSETS]html/enquiry.html&subj=${subj}`;
    let url2 = `${sessid}?addsinglerecord&database=ENQUIRIES_VIEW&de_form=[AO_ASSETS]html/enquiry.html`
    if (!subj) {
        window.location = url2;
        console.log('subj: ', subj)
    }
    else {
        console.log('else')
        window.location = url
    }
}


const descSubjGenerator = (sessid, refd, barcode=null, title) => {
    let subj;
    if (title != null) subj = title;
    else subj = `${refd}${barcode != null ? ` - ${barcode}` : ''}`
    redirectToEnquiry(sessid, subj)
}
const artSubjGenerator = (sessid, title) => redirectToEnquiry(sessid, title);

const biblioSubjGenerator = (sessid, barcode=null) => {
    const title = document.getElementsByClassName('cs-item-title')[0].textContent
    
    let subj
    if (!barcode) subj = title;
    else subj = `${barcode} - ${title}`

    redirectToEnquiry(sessid, subj)
}




const setEnquiryTopic = () => {

    // let enqTopic = document.getElementById('enqTopic');
    let enqSubj = document.getElementById('enq-title');

    // if (enqTopic == null) return;
    

    let url = window.location.href;
    let urlParams = new URL(url);
    // var topic = urlParams.searchParams.get('topic');
    // let barcode = urlParams.searchParams.get('barcode');
    // let refd = urlParams.searchParams.get('refd');
    let subj = urlParams.searchParams.get('subj');

    // let vol = urlParams.searchParams.get('vol');
    // let callNum = urlParams.searchParams.get('callNum');
    // let title = urlParams.searchParams.get('title');

    enqSubj.value  = subj == 'null' ? enqSubj.value : subj;

    // if (!barcode || !refd)
    // {
    //     // enqTopic.value = topic == 'null' ? document.getElementById('enqTopic').value : topic;
    //     enqSubj.value  = subj == 'null' ? enqSubj.value : subj;
    // }
    // else {
    //     let subj = `${refd} - ${barcode}`;
    //     let enqTitle = document.getElementById('enq-title')
    //     enqSubj.value =subj == 'null' ? enqSubj.value : subj;
    // }


}

function decodeTextField(str) {
    if (str === undefined || str === null) {
        return '';
    }
    const SCarray = {
        "&#126;": "~",
        "&#96;": "`",
        "&#33;": "!",
        "&#35;": "#",
        "&#34;": "\"",
        "&#quot;": "\"",
        "&#36;": "$",
        "&#37;": "%",
        "&amp;": "&",
        "&#38;": "&",
        "&#39;": "'",
        "&#40;": "(",
        "&#41;": ")",
        "&#42;": "*",
        "&#43;": "+",
        "&#44;": ",",
        "&#45;": "-",
        "&#46;": ".",
        "&#47;": "/",
        "&#58;": ":",
        "&#59;": ";",
        "&#61;": "=",
        "&lt;": "<",
        "&#60;": "<",
        "&gt;": ">",
        "&#62;": ">",
        "&#63;": "?",
        "&#64;": "@",
        "&#91;": "[",
        "&#92;": "\\",
        "&#93;": "]",
        "&#94;": "^",
        "&#95;": "_",
        "&#123;": "{",
        "&#124;": "|",
        "&#125;": "}",
    };
    for (const [key, value] of Object.entries(SCarray)) {
        str = str.replace(new RegExp(`${key}`, "gi"), `${value}`);
    }
    console.log(str)
    // str = str.replace(new RegExp("&amp;", "gi"), "&");
    return str;
}

function toggleTopicForm(value, option, id) {
    if (option === value) {
        document.getElementById(id).style.display = 'inherit'
    } else {
        document.getElementById(id).style.display = 'none'
    }
}

function setupTopicForm(value) {
    // toggleTopicForm(value, "General", "generalForm")
    toggleTopicForm(value, "Donations", "donationForm")
    toggleTopicForm(value, "Loan/Exhibitions", "loanForm")
    toggleTopicForm(value, "Request Transfer", "requestTransferForm")
    toggleTopicForm(value, "Request Refile/Interfile", "requestRefileForm")
    toggleTopicForm(value, "Record Schedule", "requestScheduleForm")
    toggleTopicForm(value, "Transfer Agreement", "transferForm")
    toggleTopicForm(value, "Record Disposition", "dispositionForm")
    toggleTopicForm(value, "Acquisitions", "acquisitionForm")
}

function enableDatePicker() {
    let format = { format: 'yyyy-mm-dd' }
    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    $('#enqAcqDate').datepicker(format)
    $('#enqLoanDate').datepicker(format)
    // $('#corDate').datepicker({ format: 'yyyy-mm-dd', minDate: today, maxDate: today })
}

const nextObserver = () => {
    let status = document.getElementById('enqStatus').value;
    let nextBtn = document.getElementById('inquiry-next-btn');
    const config = { attributes: true };
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'attributes' & mutation.attributeName === 'class' & mutation.target.classList.contains('slick-disabled')) {
                mutation.target.textContent = "Reply Here";
                mutation.target.disabled = true;
            }
            if (mutation.type === 'attributes' & mutation.attributeName === 'class' & !mutation.target.classList.contains('slick-disabled')) {
                mutation.target.textContent = "Next Message";
                mutation.target.disabled = false;
            }
        }
    }

    const observer = new MutationObserver(callback);
    observer.observe(nextBtn, config);
}

const prevObserver = () => {
    let nextBtn = document.getElementById('inquiry-prev-btn');
    const config = { attributes: true };
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'attributes' & mutation.attributeName === 'class' & mutation.target.classList.contains('slick-disabled')) {
                setCorrespondence();
                mutation.target.disabled = true;


            }
            if (mutation.type === 'attributes' & mutation.attributeName === 'class' & !mutation.target.classList.contains('slick-disabled')) {
                mutation.target.disabled = false;

            }
        }
    }

    const observer = new MutationObserver(callback);
    observer.observe(nextBtn, config);
}

const setCorrespondence = () => {

    let dates = document.getElementsByClassName('date-control')
    let curDate = dates[dates.length - 1];
    curDate.value = new Date().yyyymmdd();
    let types = document.getElementsByClassName('type-control');
    if (types.length === 1) return;  // stop now if there is only 1 correspondence

    let type = types[types.length - 1];
    let senders = document.getElementsByClassName('sender-control');
    let sender = senders[senders.length - 1];
    let subjects = document.getElementsByClassName('subject-control');
    let subject = subjects[subjects.length - 1];

    console.log(types[0].value)
    console.log(senders[0].value)
    console.log(subjects[0].value)

    type.value = types[0].value;
    sender.value = senders[0].value;
    subject.value = subjects[0].value;
}

// This function is used when users click the Inquiry Button in Description Detailed Record
const getBarcodeInquiryInfo = () => {
    if (sessionStorage.getItem("Desc Inquiry") != null) {
        let sub_input = document.getElementById("enq-title");
        sub_input.readOnly = true;

        const params = new URLSearchParams(window.location.search);
        const barcode_inq_barcode = params.get('barcode');
        const barcode_inq_refd = params.get('refd');
        const barcode_inq_title = params.get('title');

        sub_input.value = "Barcode: " + barcode_inq_barcode + " / " + barcode_inq_refd + " - " + barcode_inq_title;
        document.getElementById("enqTopic").selectedIndex = 2;
    }
}