Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '-' : '-0') + mm,
        (dd > 9 ? '-' : '-0') + dd
    ].join('');
};



$(document).ready(function() {
    function getClientInfo() {

        let patron_id = getCookie('M2L_PATRON_ID');

        patron_id = patron_id.split(']')[1];


        let url = `https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?SESSIONSEARCH#`

        let tempString = window.location.href;
        let tempUrlCheck = tempString.split("/");

        if (tempUrlCheck[tempUrlCheck.length - 1] == 'enquiry.html') {
            $.ajax(url).done(function(res) {
                console.log(res)
                let x2js = new X2JS();

                let jsonObj = x2js.xml2json(res);
                let first_name = jsonObj.client.name_first;
                let last_name = jsonObj.client.name_last;
                let full_name = jsonObj.client.name_full;
                let email = jsonObj.client.email;

                document.getElementById('enqFullName').value = full_name;
                document.getElementById('enqFirstName').value = first_name;
                document.getElementById('enqFirstName').readOnly = true;
                document.getElementById('enqLastName').value = last_name;
                document.getElementById('enqLastName').readOnly = true;
                document.getElementById('enqEmail').value = email;
                document.getElementById('enqEmail').readOnly = true;
                document.getElementById('enqPatronID').value = patron_id;

                if (document.getElementById('first_cor')) {
                    document.getElementById('enqCorWho').value = full_name
                }

            })

        }


        /**
Hey John, this function getClientInfo()
only runs when user is logged in  
*/
        setEnquiryTopic();
    }

    if (document.getElementById('first_cor')) {

        generateFirstCorrespondence()
        setAffinity('Public Body')

    } else if (document.getElementById('edit_enq')) {
        generateEditableCorrespondence();
    }



    let patron_id = getCookie("M2L_PATRON_ID");

    if (patron_id) {
        getClientInfo();

    } else {
        setAffinity('Public User')
    }

    // Confirm Page
    let enq_id_confirm = $('#enq_id_confirm').text();
    if (enq_id_confirm) {
        $("#success-enquiry").append(`<br /><br /><span>Enquiry Reference Number: ${enq_id_confirm}</span>`)
    }
    $('#enqFirstName').on('change', function() {
        console.log('test')
        let firstName = document.getElementById('enqFirstName').value;
        let lastName = document.getElementById('enqLastName').value;

        fullName = firstName + ' ' + lastName;
        document.getElementById('enqFullName').value = fullName
        if (document.getElementById('first_cor')) {
            document.getElementById('enqCorWho').value = fullName
        }
    })

    $('#enqLastName').on('change', function() {
        console.log('test')
        let firstName = document.getElementById('enqFirstName').value;
        let lastName = document.getElementById('enqLastName').value;

        fullName = firstName + ' ' + lastName;
        document.getElementById('enqFullName').value = fullName
        if (document.getElementById('first_cor')) {
            document.getElementById('enqCorWho').value = fullName
        }
    })

    $('#enqTitle').on('change', function() {

        if (document.getElementById('first_cor')) {
            document.getElementById('enqCorSub').value = $(this).val()
        }
    })
    $('#enqDetail').on('change', function() {

        if (document.getElementById('first_cor')) {
            document.getElementById('enqCorText').value = $(this).val()
        }
    })




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
});



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
    let url_str = `https://aoopac.minisisinc.com/scripts/mwimain.dll/144/ENQUIRIES_VIEW/ENQUIRY_DETAIL?SESSIONSEARCH&EXP=ENQ_ID ${enq_id}&NOMSG=[AO_INCLUDES]error\noenquiry.htm#`

    $.ajax(url_str).done(function(res) {

        let x2js = new X2JS({
            arrayAccessFormPaths: [
                "xml.cor_group.item"
            ]
        });

        let jsonObj = x2js.xml2json(res);
        console.log(jsonObj)
        let cor_div = document.getElementById("cor_div");
        let len = jsonObj.xml.cor_group.item.length
        jsonObj.xml.cor_group.item.map((el, idx) => {
            $('#cor_div').append(generateCorForm(el, idx, len, false))
                // $('#cor_div').append(generateCorForm(el, idx, len, false))
        })

        $('#cor_div').append(generateCorForm(null, len, len, true))

        $('#cor_div').slick({
            infinite: false,
            draggable: false,
            prevArrow: '<button type="button" class="slick-prev cor-prev-btn cor-btn btn btn-primary">&larr;</button>',
            nextArrow: '<button type="button" class="slick-next cor-next-btn cor-btn btn btn-primary">&rarr;</button>'
        });
    })

}

function generateCorForm(data, idx, len, edit = false) {
    let newOcc =
        `$${Number.parseInt(len) + 1}$1`;
    return (`<div class="card"> <div class="card-header"> <h5 class="mb-0"> <button class="btn" type="button" data-toggle="collapse show" data-target="collapse${idx}" aria-expanded="true" aria-controls="collapse${idx}">  Response ${Number.parseInt(idx) + 1}/${len +1}: ${data?data.cor_sub:"New Reply"}  </button> </h5> </div> <div id="collapse${idx}" class="collapse show" aria-labelledby="headingOne" data-parent="cor_div"> <div class="card-body"> 

    <div class="col-md-12 col-sm-12">
    <label for="corDate" class="form-label">Date</label>
    <input name=${edit ? `CORRESPOND_DATE${newOcc}` : `"" `}  value=${edit ? new Date().yyyymmdd() : data.cor_date}  type="text" id="corDate" class="form-control" placeholder="Date" aria-label="Date"   ${edit ? '' : 'readonly'}/>
    </div>

    <div class="col-md-12 col-sm-12">
    <label for="corType" class="form-label">Type</label>
    <input name=${edit ? `CORRESPOND_TYPE${newOcc}` : `"" `} value=${edit ? "Incoming" : data.cor_type} type="text" id="corType" class="form-control" placeholder="Type" aria-label="Type"  ${edit ? '' : 'readonly'}/>
    </div>

    <div class="col-md-12 col-sm-12">
    <label for="corWho" class="form-label">Sender</label>
    <input name=${edit ? `CORRESPOND_WHO${newOcc}` : `"" `} value=${edit ? ` "${document.getElementById('enqFullName').value}" ` : ` "${data.cor_who}" `} type="text" id="corWho" class="form-control" placeholder="Sender" aria-label="Sender"  ${edit ? '' : 'readonly'} />
    </div>

    <div class="col-md-12 col-sm-12">
    <label for="corSubj" class="form-label">Subject</label>
    <input name=${edit ? `CORRESPOND_SUBJ${newOcc}` : `"" `} value=${edit ? ' "" ' : ` "${data.cor_sub}" `} type="text" id="corSubj" class="form-control" placeholder="Subject" aria-label="Subject"  ${edit ? '' : 'readonly'} />
    </div>

    <div class="col-md-12 col-sm-12">
    <label for="corSubj" class="form-label">Message Text</label>

    <textarea class="form-control Rale-Reg"  placeholder="Leave a message here" id="enqDetail" name=${edit ? `MESSAGE_TEXT${newOcc}` : `"" `}  ${edit ? '' : 'readonly'}>${edit ? '' : ` ${data.cor_text} `}</textarea>

 
    </div>

    </div> </div> </div>`)
}
const redirectToEnquiry = (sessid, e) => {
  let url = `${sessid}?addsinglerecord&database=ENQUIRIES_VIEW&de_form=[AO_ASSETS]html/enquiry.html&topic=${e.getAttribute('name')}`;
  window.location = url;

}

const setEnquiryTopic = () => {

  let enqTopic = document.getElementById('enqTopic');

  if (enqTopic == null) return;

  let url = window.location.href;
  let urlParams = new URL(url);
  var topic = urlParams.searchParams.get('topic');
  enqTopic.value = topic == null ? 'General' : topic;
}