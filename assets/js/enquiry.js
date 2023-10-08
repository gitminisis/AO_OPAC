Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "-" : "-0") + mm,
    (dd > 9 ? "-" : "-0") + dd,
  ].join("");
};

$(document).ready(function () {
  enableDatePicker();

  let enq_id_confirm = $("#enq_id_confirm").text();

  let enq_assisnged = $("#enq_assigned").text();
  if (enq_id_confirm) {
    $("#success-enquiry").append(
      `<br /><br /><span>Inquiry Reference Number: ${enq_id_confirm}</span>`
    );
    let SESSID = getCookie("HOME_SESSID");
    let subject = "New Incoming Inquiry";

    let body = "New Incoming Inquiry\n\n";
    body += `Please log in your personal profile portal to view the incoming message for the Inquiry: ${enq_id_confirm}`;
    $.ajax({
      type: "GET",
      url: `${SESSID}?MANIPXMLRECORD&READ=Y&DATABASE=USER_PROFILE&KEY=USER_NAME&VALUE=${enq_assisnged}`,
    }).then((res) => {
      if (res.querySelector("error").innerHTML === "0") {
        let email = res.querySelector("USER_EMAIL_ADDR").innerHTML;
        // let email = "mikehoangdn1@gmail.com"
        let url = `${SESSID}?save_mail_form&async=y&xml=y&subject_default=${subject}&from_default=noreplyaimstest@minisisinc.com&to_default=${email}`;
        $.ajax({
          type: "POST",
          url: url,
          contentType: "text/html",
          data: `sender=noreplyaimstest@minisisinc.com&receiver=${email}&subject=${subject}&mailbody=${body}`,
        }).then((res) => {
          console.log(res);
        });
      }
    });
  }
  getBarcodeInquiryInfo();

  if (document.getElementById("enqTopic") != null) {
    setEnquiryTopic();

    let value = document.getElementById("enqTopic").value;
    setupTopicForm(value);

    if (document.getElementById("first_cor")) {
      generateFirstCorrespondence();
      setFileUploadHandler();
    } else if (document.getElementById("edit_enq")) {
      generateEditableCorrespondence();
      setFileUploadHandler(false);
      document.getElementById("enqTopic").disabled = true;
      document.getElementById("enqTitle").readOnly = true;
      document.getElementById("enqDetail").readOnly = true;
    }

    let patron_id = getCookie("M2L_PATRON_ID");

    if (patron_id !== "[M2L_PATRON_ID]") {
      getClientInfo();
    } else {
      setAffinity("Public User");
      document.getElementById("enqLastName").value;
      document.getElementById("enqFirstName").focus();
    }

    // Confirm Page

    $("#enqFirstName").on("change", function () {
      let firstName = document.getElementById("enqFirstName").value;
      let lastName = document.getElementById("enqLastName").value;

      fullName = firstName + " " + lastName;
      document.getElementById("enqFullName").value = fullName;
      if (document.getElementById("first_cor")) {
        document.getElementById("enqCorWho").value = fullName;
      }
    });

    $("#enqLastName").on("change", function () {
      let firstName = document.getElementById("enqFirstName").value;
      let lastName = document.getElementById("enqLastName").value;

      fullName = firstName + " " + lastName;
      document.getElementById("enqFullName").value = fullName;
      if (document.getElementById("first_cor")) {
        document.getElementById("enqCorWho").value = fullName;
      }
    });

    $("#enqTitle").on("change", function () {
      if (document.getElementById("first_cor")) {
        document.getElementById("enqCorSub").value = $(this).val();
      }
    });

    $("#enqDetail").on("keyup", function () {
      if (document.getElementById("first_cor")) {
        document.getElementById("enqCorText").value = $(this).val();
      }
    });

    $("#enqTopic").on("change", function (e) {
      let value = e.target.value;
      setupTopicForm(value);
    });
    let status;
    try {
      status = document.getElementById("enqStatus").value;
    } catch (e) {
      console.log(e);
    }

    if (status === "Closed") {
      // Disable some input fields

      $("#enqFirstName").prop("disabled", true);
      $("#enqLastName").prop("disabled", true);
      $("#enqEmail").prop("disabled", true);
      $("#enqPhone").prop("disabled", true);

      // Add closed status indication text
      $("#Enquiry-Form").prepend(
        '<h3 style="text-align: center; color:red">This inquiry has been closed</h3>'
      );
      $("#submit-enquiry").remove();
    }

    // parse ENQ_PATRON_NAME
    var full_name = "";
    if (document.getElementById("enqFullName") != null) {
      full_name = document.getElementById("enqFullName").value;
    }
    var name_comp = full_name.split(" ");
    var ix = 0;

    // extract first name
    while (ix < name_comp.length && name_comp[ix] == "") {
      ix++;
    }
    if (ix < name_comp.length) {
      // set "enqFirstName" field to first name
      document.getElementById("enqFirstName").value = name_comp[ix].replace(
        ",",
        ""
      );
      ix++;
    }

    // extract last name
    while (ix < name_comp.length && name_comp[ix] == "") {
      ix++;
    }
    if (ix < name_comp.length) {
      // set "enqLastName" field to last name
      document.getElementById("enqLastName").value = name_comp[ix].replace(
        ",",
        ""
      );
      ix++;
    }
  } // if "EnqTopic" != null
  // if (document.getElementById('enquiry-confirmation-FR')) return;
  // else redirectEnquiryFr();

  window.addEventListener("beforeunload", function (e) {
    // e.preventDefault();  // turn off confirmation message

    if (typeof enquiry_submitted != "undefined" && !enquiry_submitted) {
      if (typeof close_enquiry_url != "undefined") {
        unlockRecord(close_enquiry_url);
      }
    }
    return true; // return true to close web page
  });
}); //Document Ready Function End

function getClientInfo() {
  let patron_id = getCookie("M2L_PATRON_ID");

  patron_id = patron_id.split("]")[1];

  let url = `https://aims.archives.gov.on.ca/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_CLIENT/C_CLIENT_NUMBER%20${patron_id}?COMMANDSEARCH#`;

  let tempString = window.location.href;
  let tempUrlCheck = tempString.split("/");
  let enquiry = tempUrlCheck[tempUrlCheck.length - 1].split("&")[0];

  $.ajax(url).done(function (res) {
    let x2js = new X2JS();

    let jsonObj = x2js.xml2json(res);
    if (jsonObj && jsonObj.client) {
      let first_name = jsonObj.client.name_first;
      let last_name = jsonObj.client.name_last;
      let full_name = `${first_name} ${last_name}`;
      let email = jsonObj.client.email;
      let tel = jsonObj.client.tel_home;

      document.getElementById("enqFullName").value = full_name;
      document.getElementById("enqFirstName").value = first_name;
      document.getElementById("enqFirstName").readOnly = true;
      document.getElementById("enqLastName").value = last_name;
      document.getElementById("enqLastName").readOnly = true;
      document.getElementById("enqEmail").value = email;
      document.getElementById("enqEmail").readOnly = true;
      if (tel) {
        document.getElementById("enqPhone").value = tel;
        document.getElementById("enqPhone").readOnly = true;
      } else document.getElementById("enqPhone").focus();

      setAffinity(jsonObj.client.client_type);

      if (document.getElementById("first_cor")) {
        document.getElementById("enqPatronID").value = patron_id;

        document.getElementById("enqCorWho").value = full_name;
      }
    }
  });
}

function setFileUploadHandler(first_cor = true) {
  let fileInput = document.getElementById("file-upload-input");
  let fileSelect = document.getElementsByClassName("file-upload-select")[0];
  fileSelect.onclick = function () {
    fileInput.click();
  };
  fileInput.onchange = function () {
    let prefix =
      new Date().toISOString().split("T")[0].split("-").join(".") +
      `.${new Date().getTime()}`;
    let filename = fileInput.files[0].name;
    console.log(fileInput.files[0]);
    let selectName = document.getElementsByClassName("file-select-name")[0];
    selectName.innerText = filename;
    let url = document.querySelector("#file-upload-url");
    let action = url.innerText.trim() + prefix;
    let form_data = new FormData();
    form_data.append("file", $("input[type=file]")[0].files[0]);
    $.ajax({
      async: true,
      type: "POST",
      enctype: "multipart/form-data",
      url: action,
      data: form_data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (data) {
        console.log(data);
        let path = data.querySelector("path").innerHTML;
        document.querySelector("#enqCorLink").value = path;
      },
    });
  };
}
// send MWI SKIPRECORD command to unlock record ig web page is closed.
function unlockRecord(close_url) {
  if (navigator.sendBeacon) {
    // add dummy form data because sendBeacon sends post HTTP request
    var formData = new FormData();
    formData.append("SKIP", "YES");
    var status = navigator.sendBeacon(close_url, formData);
  }
}

// send flag to indciate record has been unlocked
function setSubmitFlag() {
  if (typeof enquiry_submitted != "undefined") {
    enquiry_submitted = true;
  }
  return true;
}

function generateFirstCorrespondence() {
  document.getElementById("enqCorDate").value = new Date().yyyymmdd();
}

function setAffinity(affinity) {
  $("#enqAffliation").val(affinity);
}

function generateEditableCorrespondence() {
  let enq_id = document.getElementById("enqID").value;
  let xml_tree = document.getElementById("enq_xml");
  let x2js = new X2JS({
    arrayAccessFormPaths: [
      "record.correspond_grp.correspond_grp_occurrence",
      "record.correspond_grp.correspond_grp_occurrence.link_group.link_group_occurrence",
    ],
  });

  let jsonObj = x2js.xml2json(xml_tree);
  console.log(jsonObj);
  let cor_div = document.getElementById("cor_div");
  let len = jsonObj.record.correspond_grp.correspond_grp_occurrence.length;

  let occ_type = typeof jsonObj.record.correspond_grp.correspond_grp_occurrence;
  if (Array.isArray(jsonObj.record.correspond_grp.correspond_grp_occurrence)) {
    jsonObj.record.correspond_grp.correspond_grp_occurrence.map((el, idx) => {
      $("#cor_div").append(generateCorForm(el, idx, len, false));
    });
  } else if (occ_type === "object") {
    $("#cor_div").append(
      generateCorForm(
        jsonObj.record.correspond_grp.correspond_grp_occurrence,
        0,
        1,
        false
      )
    );
    len = 1;
  }
  let status = document.getElementById("enqStatus").value;
  if (status !== "Closed") {
    $("#cor_div").append(generateCorForm(null, len, len, true));
  }

  $("#cor_div").slick({
    infinite: false,
    draggable: false,
    prevArrow:
      '<button type="button" id="inquiry-prev-btn"  class="slick-prev cor-prev-btn cor-btn btn btn-primary" disabled>Previous Message</button>',
    nextArrow:
      '<button type="button" id="inquiry-next-btn"  class="slick-next cor-next-btn cor-btn btn btn-primary">Next Message</button>',
  });
  nextObserver();
  prevObserver();
}

function getHyperLinkTag(str) {
  let regexp = /HYPERLINK.&quot;(.*?)&quot;/g;

  let matchAll = decodeTextField(str).matchAll(regexp);

  // replace all HYPERLINK delimeter
  matchAll = Array.from(matchAll).map((exp, index) => {
    let replaceString = index % 2 == 0 ? `<a href=${exp[1]}>` : `<a/>`;
    str = decodeTextField(str).replace(exp[0], replaceString);
  });

  return str;
}

function generateCorForm(data, idx, len, edit = false) {
  let status = document.getElementById("enqStatus").value;
  let maxLength = status === "Closed" ? len : len + 1;
  let link_group =
    data && data.link_group !== undefined
      ? data.link_group.link_group_occurrence
      : null;
  let SESSID = getCookie("HOME_SESSID");

  if (link_group && !Array.isArray(link_group)) {
    link_group = [link_group];
  }
  if (data && data.reply_text) {
    data.reply_text = getHyperLinkTag(data.reply_text);
  }
  if (data && data.message_text) {
    data.message_text = getHyperLinkTag(data.message_text);
  }

  let generatedMonth = new Date().getMonth();
  let generatedDay = new Date().getDate();
  let month =
    generatedMonth < 10 ? `0${generatedMonth + 1}` : generatedMonth + 1;
  let day = generatedDay < 10 ? `0${generatedDay}` : generatedDay;

  let newOcc = `$${Number.parseInt(len) + 1}$1`;
  return `<div class="card"> <div class="card-header"> <h5 class="mb-0"> <button class="btn" type="button" data-toggle="collapse show" data-target="collapse${idx}" aria-expanded="true" aria-controls="collapse${idx}">  Response ${
    Number.parseInt(idx) + 1
  }/${maxLength}: ${
    data && data.correspond_subj ? data.correspond_subj : "New Reply"
  }  </button> </h5> </div> <div id="collapse${idx}" class="collapse show" aria-labelledby="headingOne" data-parent="cor_div"> <div class="card-body row"> 
    
        <div class="col-md-6 col-sm-12">
        <label for="corDate" class="form-label">Date</label>
        <input name=${edit ? `CORRESPOND_DATE${newOcc}` : `"" `}  value=${
    edit ? `${new Date().getFullYear()}-${month}-${day}` : data.correspond_date
  }  type="text" id=${
    edit ? ' "corDate" ' : ' "" '
  }class="form-control date-control" placeholder="Date" aria-label="Date"   ${
    edit ? "readonly" : "readonly"
  }/>
        </div>
        <div class="col-md-6 col-sm-12">
        <label for="corDueDate" class="form-label">Due Date</label>
        <input id="corDueDate"  value=${
          edit
            ? ' "" '
            : ` "${data.reply_due_date ? data.reply_due_date : ""}" `
        }  type="text" id=${
    edit ? ' "corDate" ' : ' "" '
  } class="form-control" placeholder="Due Date" aria-label="Due Date"   ${
    edit ? "readonly" : "readonly"
  }/>
        </div>
       
        <br /><div class="col-md-12 col-sm-12">
        <label for="corSubj" class="form-label">Subject</label>
        <input name=${edit ? `CORRESPOND_SUBJ${newOcc}` : `"" `} value=${
    edit
      ? ` "${document.querySelector("#enqTitle").value}" `
      : ` "${data.correspond_subj ? data.correspond_subj : ""}" `
  } type="text" id="corSubj" class="form-control subject-control" placeholder="Subject" aria-label="Subject"  ${
    edit ? "" : "readonly"
  } />
        </div>  
        <br />
        <div class="col-md-12 col-sm-12">
        <label for="enqDetail" class="form-label">Message Text*</label>
    
        ${
          edit
            ? ` <textarea class="form-control Rale-Reg"  placeholder="Leave a message here" id="enqDetail" name=${`MESSAGE_TEXT${newOcc}`} ></textarea>`
            : `<div class="enqCorrespondenceTextbox"> ${
                data.message_text ? decodeTextField(data.message_text) : ""
              }</div>`
        }

        ${
          edit
            ? `
        <br /><div class="file-upload">
            <div class="file-upload-select">
                <span id="file-upload-url" hidden>${SESSID}?upload&target=[MEDIA]&prefix=</span>
                <div class="file-select-button">Choose File</div>
                <div class="file-select-name">No file chosen...</div>
                <input type="text" name=${`LINK_PATH${newOcc}`} id="enqCorLink" hidden />
                <input type="file"  id="file-upload-input">
            </div>
        </div>`
            : ""
        }

        ${
          !edit && data.reply_text
            ? `<br /><div class="col-md-12 col-sm-12">
        <label for="replyText" class="form-label">Reply Text</label>
        <div class="enqCorrespondenceTextbox"> ${
          data.reply_text ? decodeTextField(data.reply_text) : ""
        }</div>`
            : ""
        }
        
       
    
        ${
          edit
            ? ""
            : link_group
            ? `<br /><div class="col-md-12 col-sm-12"><label for="linkPath" class="form-label">Media:</label>
            <ul>
            ${link_group.map((e, i) => {
              let { link_type, link_path } = e;
              let name = link_path.replace("[MEDIA]", "");
              let path = link_path.replace("[MEDIA]", "/MEDIA/");
              return ` <li><a name=${`LINK_PATH${newOcc}`} id="linkPath" href=${path} target='_blank'>${
                link_path != null ? name : ""
              }</a></li>`;
            })}
            </ul></div>`
            : ""
        }
     
        
        
        ${
          edit
            ? ""
            : `<br /><div class="col-md-12 col-sm-12"><label for="linkType" class="form-label" ${
                data.link_type != null ? "" : "hidden"
              }>${data.link_type != null ? "Media Type" : ""}</label>
        <input name="${edit ? `LINK_TYPE${newOcc}` : ""}" value="${
                data.link_type != null ? data.link_type : ""
              }" type="text" id="linkType" class="form-control subject-control" aria-label="Media Type"  ${
                data.link_type != null ? "readonly" : "hidden"
              } /></div>`
        }
        
    
        </div>
    
        </div> </div> </div>`;
}

redirectToEnquiry = (sessid, subj = null) => {
  let url = `${sessid}?addsinglerecord&database=ENQUIRIES_VIEW&de_form=[AO_ASSETS]html/enquiry.html&subj=${subj}`;
  // let url2 = `${sessid}?addsinglerecord&database=ENQUIRIES_VIEW&de_form=[AO_ASSETS]html/enquiry.html`
  window.open(url, "_blank");
};

const descSubjGenerator = (sessid, refd, barcode = null, title) => {
  let subj;
  if (title != null) subj = title;
  else subj = `${refd}${barcode != null ? ` - ${barcode}` : ""}`;
  redirectToEnquiry(sessid, subj);
};
const artSubjGenerator = (sessid, e) => {
  let title = e.getAttribute("title");
  // redirectToEnquiry(sessid, title);
  window.location = "https://www.archives.gov.on.ca/en/about/contact.aspx";
};

const biblioSubjGenerator = (sessid, barcode = null) => {
  const title = document.getElementsByClassName("cs-item-title")[0].textContent;

  let subj;
  if (!barcode) subj = title;
  else subj = `${barcode} - ${title}`;

  // redirectToEnquiry(sessid, subj)
  window.location = "https://www.archives.gov.on.ca/en/about/contact.aspx";
};

const setEnquiryTopic = () => {
  let enqSubj = document.getElementById("enqTitle");

  let url = window.location.href;
  let urlParams = new URL(url);

  let subj = urlParams.searchParams.get("subj");

  if (subj !== "null" && subj !== null) {
    enqSubj.value = subj;
  }
};

function decodeTextField(str) {
  if (str === undefined || str === null) {
    return "";
  }
  const SCarray = {
    "&#126;": "~",
    "&#96;": "`",
    "&#33;": "!",
    "&#35;": "#",
    "&#34;": '"',
    "&#quot;": '"',
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
  // str = str.replace(new RegExp("&amp;", "gi"), "&");
  return str;
}

function toggleTopicForm(value, option, id) {
  if (option === value) {
    document.getElementById(id).style.display = "inherit";
  } else {
    document.getElementById(id).style.display = "none";
  }
}

function setupTopicForm(value) {
  // toggleTopicForm(value, "General", "generalForm")
  toggleTopicForm(value, "Donations", "donationForm");
  toggleTopicForm(value, "Loan/Exhibitions", "loanForm");
  toggleTopicForm(value, "Request Transfer", "requestTransferForm");
  toggleTopicForm(value, "Request Refile/Interfile", "requestRefileForm");
  toggleTopicForm(value, "Record Schedule", "requestScheduleForm");
  toggleTopicForm(value, "Transfer Agreement", "transferForm");
  toggleTopicForm(value, "Record Disposition", "dispositionForm");
  toggleTopicForm(value, "Acquisitions", "acquisitionForm");
}

function enableDatePicker() {
  let format = { format: "yyyy-mm-dd" };
  today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  $("#enqAcqDate").datepicker(format);
  $("#enqLoanDate").datepicker(format);
  // $('#corDate').datepicker({ format: 'yyyy-mm-dd', minDate: today, maxDate: today })
}

const nextObserver = () => {
  let status = document.getElementById("enqStatus").value;
  let nextBtn = document.getElementById("inquiry-next-btn");
  const config = { attributes: true };
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (
        (mutation.type === "attributes") &
        (mutation.attributeName === "class") &
        mutation.target.classList.contains("slick-disabled")
      ) {
        mutation.target.textContent = "Reply Here";
        mutation.target.disabled = true;
      }
      if (
        (mutation.type === "attributes") &
        (mutation.attributeName === "class") &
        !mutation.target.classList.contains("slick-disabled")
      ) {
        mutation.target.textContent = "Next Message";
        mutation.target.disabled = false;
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(nextBtn, config);
};

const prevObserver = () => {
  let nextBtn = document.getElementById("inquiry-prev-btn");
  const config = { attributes: true };
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (
        (mutation.type === "attributes") &
        (mutation.attributeName === "class") &
        mutation.target.classList.contains("slick-disabled")
      ) {
        setCorrespondence();
        mutation.target.disabled = true;
      }
      if (
        (mutation.type === "attributes") &
        (mutation.attributeName === "class") &
        !mutation.target.classList.contains("slick-disabled")
      ) {
        mutation.target.disabled = false;
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(nextBtn, config);
};

const setCorrespondence = () => {
  let dates = document.getElementsByClassName("date-control");
  let curDate = dates[dates.length - 1];
  curDate.value = new Date().yyyymmdd();
  let types = document.getElementsByClassName("type-control");
  if (types.length === 1) return; // stop now if there is only 1 correspondence

  let type = types[types.length - 1];
  let senders = document.getElementsByClassName("sender-control");
  let sender = senders[senders.length - 1];
  let subjects = document.getElementsByClassName("subject-control");
  let subject = subjects[subjects.length - 1];

  type.value = types[0]?.value;
  sender.value = senders[0]?.value;
  subject.value = subjects[0]?.value;
};

// This function is used when users click the Inquiry Button in Description Detailed Record
const getBarcodeInquiryInfo = () => {
  if (sessionStorage.getItem("Desc Inquiry") != null) {
    let sub_input = document.getElementById("enq-title");
    sub_input.readOnly = true;

    const params = new URLSearchParams(window.location.search);
    const barcode_inq_barcode = params.get("barcode");
    const barcode_inq_refd = params.get("refd");
    const barcode_inq_title = params.get("title");

    sub_input.value =
      "Barcode: " +
      barcode_inq_barcode +
      " / " +
      barcode_inq_refd +
      " - " +
      barcode_inq_title;
    document.getElementById("enqTopic").selectedIndex = 2;
  }
};

const checkEnquiryConfirmation = () => {
  let page = window.location.href.split("/").pop();
  if (page == "enquiryConfirmation.html") return 1; // true;
  else return 0; // false
};

const redirectEnquiryFr = () => {
  if (checkCookieExists("LANG") && checkEnquiryConfirmation())
    if (getDocumentCookie("LANG") == 145)
      window.location = `${home_sessid}?GET&FILE=[ao_opac]/145/assets/html/enquiryConfirmation.html`;
    else return;
};
