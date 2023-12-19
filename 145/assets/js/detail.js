const ITEM_INFO_FIELDS = {

    copy_number: {
        type: "field",
        title: "Copy",
    },
    item_call_number: {
        type: "field",
        title: "Call Number",
    },
    volume_id: {
        type: "field",
        title: "Vol/Issue",
    },
    location: {
        type: "field",
        title: "Location",
    },
    public_note: {
        type: "field",
        title: "Note",
    },
    i_collect_code: {
        type: "field",
        title: "Media",
    },
    item_status: {
        type: "field",
        title: "Circ Status",
    },
    barcode: {
        type: "field",
        title: "Order",
    },
};
let holdingsFieldArray = [];

/**
 * This function takes a XML Element and converts it to
 * JSON object, specifically for Itenm Info Object from
 * BIBLIO
 *
 * The XML is created in WEB_BIBLIO_ITEM_INFO
 *
 *
 * @param {XML Node Element} xml
 */
function toJson(xml) {
    /**
     * Specify which one is an array of objects
     */
    var x2js = new X2JS({
        arrayAccessFormPaths: [
            "item_info.item_detail"
        ],
    });
    var jsonObj = x2js.xml_str2json(xml);
    return jsonObj;
}


/**
 *  Return a HTML Table in the Items Detail Table
 */
function renderItemInfoTable(itemInfoTable) {
    let itemInfoObject = itemInfoTable.renderedItem;
    let index = itemInfoTable.currentIndex;
    let length = itemInfoTable.length;
    let tableParent = $("#item-detail");

    let renderedItem = itemInfoObject.item_detail[index];

    /**
     * Empty the table
     */
    tableParent.empty();

    let table =
        '<table id="items-detail-table" class="table"><tr><td class="item-detail-label" colspan="" style=" font-weight:bold;">ITEMS DETAIL (' +
        Number(index + 1) +
        "/" +
        length +
        ")</td></tr>";

    /**
     * For each property, table will append a new row
     */
    for (let prop in ITEM_INFO_FIELDS) {
        if (renderedItem[prop]) {
            table += renderItemInfoField(renderedItem, prop);
        }
    }

    // Render the arrow buttons here
    let arrow_row =
        '<tr style="background:#efefef"><div class="col-12">' +
        '<button id="prev-item" class="btn btn-default" style="width:100px; margin: 0.5em;" title="View Previous Copy">&laquo; Previous</button>' +
        '<button id="next-item" class="btn btn-default" style="float:right; width:100px; margin: 0.5em;" title="View Next Copy">Next &raquo; </button>' +
        "</div><div class='col-12' style='text-align:center; margin-bottom:0.5em'><button type='button' class='btn btn-default' data-toggle='modal' data-target='#viewAllItemDetail' title='Click to view all item detail' style='width:50%;'>View All</button></div></tr>";
    if (itemInfoTable.length > 1) {
        table += arrow_row;
    }

    table += "</table></div>";
    //tableParent.html(table);

    /**
     * Adding click functions for the previous
     * and next button
     */
    $("#next-item").on("click", function() {
        itemInfoTable.nextItem();
    });

    $("#prev-item").on("click", function() {
        itemInfoTable.prevItem();
    });

    /**
     * Prevent users from going back when the table shows
     * the first item and going next when the table shows
     * the last item
     */
    if (index === 0) {
        $("#prev-item").remove();
    } else if (index === itemInfoTable.length - 1) {
        $("#next-item").remove();
    }
}

function renderFieldItem(item, field) {
    let value = item[field];
    return (
        "<tr style='background:#efefef'><p class='item-detail-label' style='margin: 1em 0; padding:0 0.75rem 0 0.75rem;'>" +
        ITEM_INFO_FIELDS[field].title +
        ": " +
        value +
        "</p></tr>"
    );
}

const requestContainer = (nmemonic, barcode) => {
    let db_RecId = document.getElementById('bar-req-db-recid');
    let req_ItemId = document.getElementById('bar-req-item-id');
    let containerForm = document.getElementById('bar-form-request');

    db_RecId.value = nmemonic;
    req_ItemId.value = barcode;

    containerForm.submit();
}

// Checks if user has record requested and grays out Request Button when in Detail Record
const disableRequestBtn = (url) => {

    var patron_id = getCookie('M2L_PATRON_ID');
    patron_id = patron_id.split(']')[1];

    if (patrion_id != '') {
        let url1 = `https://aims.archives.gov.on.ca/scripts/mwimain.dll/144/DOC_REQUEST/CHECK_REQUEST_STATUS/REQ_PATRON_ID%20${patron_id}?COMMANDSEARCH#`;

        $.ajax(url1).done(function(res) {
            var x2js = new X2JS();
            var jsonObj1 = x2js.xml2json(res);
            console.log(jsonObj1);
            var reqStatusLength;
            var detail_refd;

            try {
                reqStatusLength = jsonObj1.checkReqStatus.request.length;
                detail_refd = document.getElementsByClassName("req-refd")[0].value;
            } catch (e) {
                console.log(e)
            }



            for (i = 0; i < reqStatusLength; i++) {
                console.log('checking record ')
                console.log(jsonObj1.checkReqStatus.request[i])
                if ((jsonObj1.checkReqStatus.request[i].req_stat == "Requested") && (detail_refd == jsonObj1.checkReqStatus.request[i].req_refd)) {
                    document.getElementById("detail-requestx").disabled = true;
                }
            }
        });
    }
}

// Copyright Form Button Click
const copyrightBtnClick = () => {

    $("button.colorbox-copyright").click(function() {
        // $(this).parent().parent().find(".cs-item-sisn");
        // var accession = $(this).parent().parent().find(".cs-item-id");
        // var reqSource = $(this).parent().parent().find(".cs-item-src");
        // var title = $(this).parent().parent().find(".cs-item-title");
        var accession = document.getElementsByClassName("cs-item-id")[0];
        var reqSource = document.getElementsByClassName("cs-item-src")[0];
        var title = document.getElementsByClassName("cs-item-title")[0];
        var topicCheck = "copyrightServices";

        $.colorbox({
            iframe: true,
            transition: "elastic",
            width: "1200px",
            height: "780px",
            overlayClose: true,
            href: HOME_SESSID + "?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/copyright.html&new=y",
            onLoad: function() {

                $tmp_data = accession.textContent; // ACCESSION NUMBER --- F 26 G
                $tmp_data2 = reqSource.textContent; // REQ_SOURCE DESCRIPTION COLLECTION LIBRARY
                $tmp_data3 = title.textContent; // LEGAL_TITLE -- Story Book Woman   
                $tmp_topic = topicCheck;

                console.log('copyright')
                console.log($tmp_data, $tmp_data2, $tmp_data3)



            },
            onComplete: function() {
                let message = document.getElementById('reqDetail')
                console.log(message)
            },
            onClose: function() {
                delete $tmp_data;
                delete $tmp_data2;
                delete $tmp_data3;
                delete $tmp_topic;
            }
        });
    });
}

// Reproduction Form Button Click
const reproductionBtnClick = () => {
    $("button.colorbox-reproduction").click(function() {
        // $(this).parent().parent().find(".cs-item-sisn");
        // var accession = $(this).parent().parent().find(".cs-item-id");
        // var reqSource = $(this).parent().parent().find(".cs-item-src");
        // var title = $(this).parent().parent().find(".cs-item-title");
        var accession = document.getElementsByClassName("cs-item-id")[0];
        var reqSource = document.getElementsByClassName("cs-item-src")[0];
        var title = document.getElementsByClassName("cs-item-title")[0];
        var topicCheck = "reproductions";

        $.colorbox({
            iframe: true,
            transition: "elastic",
            width: "1200px",
            height: "780px",
            overlayClose: true,
            href: HOME_SESSID + "?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/reproductionCertification.html&new=y",
            onLoad: function() {

                $tmp_data = accession.textContent; // ACCESSION NUMBER --- F 26 G
                $tmp_data2 = reqSource.textContent; // REQ_SOURCE DESCRIPTION COLLECTION LIBRARY
                $tmp_data3 = title.textContent; // LEGAL_TITLE -- Story Book Woman   
                $tmp_topic = topicCheck;

                console.log('reproduction')
                console.log($tmp_data, $tmp_data2, $tmp_data3)
            },
            onComplete: function() {},
            onClose: function() {

                console.log('reproduction close')
                delete $tmp_data;
                delete $tmp_data2;
                delete $tmp_data3;
                delete $tmp_topic;
            }
        });
    });
}

const crowdsourceBtnClick = () => {
    $("button.colorbox-detail").click(function(e) {
        let evt = e;
        // $(this).parent().parent().find(".cs-item-sisn");

        // var test1 = $(this).parent().parent().find(".cs-item-id");
        // var test2 = $(this).parent().parent().find(".cs-item-src");
        // var test3 = client_name;

        let test1 = document.getElementsByClassName('cs-item-id')[0].textContent
        let test2 = document.getElementsByClassName('cs-item-src')[0].textContent
        let test3 = client_name;

        // console.log('this from detail')
        $.colorbox({
            iframe: true,
            transition: "elastic",
            width: "70%",
            // width:"95%",
            height: "85%",
            overlayClose: true,
            href: HOME_SESSID + "?addsinglerecord&database=COMMENTS_VIEW&de_form=[AO_ASSETS]html/crowdSourceEntry.html&new=y",
            onLoad: function() {


                let csitemSISN = document.getElementsByClassName("cs-item-sisn");
                let csitemSRC = document.getElementsByClassName("cs-item-src");
                let csitemID = document.getElementsByClassName("cs-item-id"); // F 23-G,

                console.log(evt);
                console.log(evt.target.id);

                $tmp_data = test1 // F 26 G
                $tmp_data2 = test2 // DESCRIPTION COLLECTION LIBRARY
                $tmp_data3 = test3;
                $tmp_data4 = client_id.split(']')[1];

            },
            onComplete: function() {
                //$("#test_btn").click();

            },
            onClose: function() {
                delete $tmp_data;
                delete $tmp_data2;
                delete $tmp_data3;
                delete $tmp_data4;
            }

        });
    });
}


/* * * * * * * * * * * * *
 * *                   * *
 * *   Document Ready  * *
 * *                   * *
 * * * * * * * * * * * * */
$(document).ready(function() {

    let countMarcBtn = 1,
        countMarcXML = 1;
    let page = document.getElementById('Detail-Content');

    if (page !== null) {
        // disableRequestBtn();

        if ($(".Detail-Container").length === 1) {
            $(".marc-btn").each(function() {
                $(this).attr("data-bs-target", "#marcModal" + countMarcBtn++);
            });
            $("marc#marc").each(function() {
                $(this).attr("id", "marc" + countMarcXML++);
            });
        }

        let xml = document.getElementById("item_info");
        //console.log(xml);
        if (xml) {
            let xmlText = new XMLSerializer().serializeToString(xml);
            let itemInfoObject = toJson(xmlText);
            //console.log(itemInfoObject.item_info)
            //   if (itemInfoObject) {
            //     let itemInfoTable = new ItemsInfoTable(itemInfoObject.item_info);
            //     itemInfoTable.render();
            //   }
        }
        let xmlText;
        let itemInfoObject;
        let itemDetailLength;
        let itemNum;
        let itemDetailJson;
        let holdingsAction;
        let holdingsSISN;
        let biblioAN;
        let holdingsCallNumber;
        let holdingsVolumeID;
        try {
            xmlText = new XMLSerializer().serializeToString(xml);
            itemInfoObject = toJson(xmlText);
            console.log(itemInfoObject)
            itemDetailLength = itemInfoObject.item_info.item_detail.length;
            itemNum = 1;
            itemDetailJson = itemInfoObject.item_info.item_detail;
            holdingsAction = 'action=' + document.getElementsByClassName("holdings-action")[0].innerHTML;
            holdingsSISN = document.getElementsByClassName("holdings-sisn")[0].innerHTML;
            biblioAN = document.getElementsByClassName("cs-item-id")[0].innerHTML;
            // console.log(holdingsAction)
            // console.log(itemDetailJson);
            // console.log(biblioAN)

        } catch (e) {
            console.log(e)
        }
        if (itemDetailLength > 0) {
            let itemTable = '<tr><table class="holdings-table">';
            let titleForHoldings = document.getElementsByClassName("titleForHoldings")[0].innerHTML;

            itemTable += "<tr class='holdings-title'><th>Copy</th><th>Call Number</th><th>Vol/Issue</th><th>Location</th><th>Note</th><th>Media</th><th>Circ Type</th><th>Request</th></tr>";

            for (var i = 0; i < itemDetailLength; ++i) {
                itemTable += "<tr class='holdings-record-row'>";
                itemTable += "<td>" + (itemDetailJson[i].copy_number != null ? itemDetailJson[i].copy_number : "N/A") + "</td>";
                itemTable += "<td>" + (itemDetailJson[i].item_call_number != null ? itemDetailJson[i].item_call_number : "N/A") + "</td>";
                holdingsFieldArray.push((itemDetailJson[i].item_call_number != null ? itemDetailJson[i].item_call_number : "N/A"));
                itemTable += "<td>" + (itemDetailJson[i].volume_id != null ? itemDetailJson[i].volume_id : "N/A") + "</td>";
                holdingsFieldArray.push((itemDetailJson[i].volume_id != null ? itemDetailJson[i].volume_id : "N/A"));
                itemTable += "<td>" + (itemDetailJson[i].location != null ? itemDetailJson[i].location : "N/A") + "</td>";
                itemTable += "<td>" + (itemDetailJson[i].public_note != null ? itemDetailJson[i].public_note : "N/A") + "</td>";
                itemTable += "<td>" + (itemDetailJson[i].i_collect_code != null ? itemDetailJson[i].i_collect_code : "N/A") + "</td>";
                itemTable += "<td>" + (itemDetailJson[i].item_status != null ? itemDetailJson[i].item_status : "N/A") + "</td>";
                // itemTable += "<td>" + (itemDetailJson[i].barcode != null ? "<form class='form-request' method='post' onsubmit='storeAdditionalReqFields("+ (i+1) +");' id='request_form' " + holdingsAction + "><input type='hidden' name='ITEM_REQ_TIME' value='9:00'><input type='hidden' name='METHOD_REQUEST' value='Web'><input type='hidden' name='REQ_TOPIC' value='Retrieval Services'><input type='hidden' name='REQ_APPL_NAME' value='M2A'><input type='hidden' name='REQ_DB_NAME' value='LIBRARY'><input type='hidden' name='REQ_DB_RECID' value='BARCODE'><input type='hidden' name='REQ_TITLE' value='"+ biblioAN + "'><input type='hidden' name='REQ_DB_LINK3' value='" + holdingsSISN + "'><input type='hidden' name='REQ_ITEM_ID' value='" + itemDetailJson[i].barcode + "'><input type='hidden' name='REQ_ITEM_TITLE' value='" + titleForHoldings + "'><input type='hidden' name='REQ_QUEUE' value='X'><input type='hidden' name='REQ_CALL_NUMBER' value='" + itemDetailJson[i].item_call_number + "'><input type='hidden' name='REQ_VOLUME_ID' value='" + (itemDetailJson[i].volume_id != null ? itemDetailJson[i].volume_id 
                //   : "S. O.")+ "'><button id='holdings_record_" + itemDetailJson[i].barcode +  "' class='holdings_req_btn_" + (i+1) + "' onclick='biblioRedirectToEnquiry(^sessid^, this)' title=" + itemDetailJson[i].barcode + " vol=" + itemDetailJson[i].volume_id + " barcode=" + itemDetailJson[i].barcode + " callNum=" + itemDetailJson[i].item_call_number + ">Inquiry</button>" 
                //   : "Unavailable")  + "</form></td>";
                itemTable += "<td>" + (itemDetailJson[i].barcode != null ? `<button id='holdings_record_${itemDetailJson[i].barcode}' class='holdings_req_btn_${i+1} general-focus focus-red' onclick='biblioSubjGenerator(sessid, "${itemDetailJson[i].barcode}")'>Inquiry</button>` :
                    "Unavailable") + "</td>";
                // itemTable += "<td>" + (itemDetailJson[i].barcode != null ? "<button id='holdings_record_" + itemDetailJson[i].barcode + " class='holdings_req_btn_" + (i+1) + "' " + "onclick='biblioSubjGenerator(" + title + ", " +  itemDetailJson[i].barcode + ">Inquiry</button>" : "Unavailable")  + "</td>";
                itemTable += "</tr>";
            }
            itemTable += "</table></tr>";
            // console.log(itemTable)
            $('#item-details').addClass('item-details');
            if (document.getElementById("item-details")) {
                document.getElementById("item-details").innerHTML = itemTable;
            }
        }



        if ($(".pub-det-field").length) {
            const x = document.getElementsByClassName("pub-det-field")[0].innerText;
            document.getElementsByClassName("pub-det-field")[0].innerHTML = unescapeHtml(x);
        }

        // Detail Bookmark
        // When Clicked ajax sends href to minisis to add selected record to list.
        // Once success, reload the page. Report Checks whether record is in the list or not
        // $('.bookmarkbutton').on('click',function() {
        //     $.ajax({
        //     type: "GET",
        //     url:$(this).attr('href'),
        //     success:function() {
        //         location.reload();
        //     }
        //     });
        // });


        crowdsourceBtnClick();
        copyrightBtnClick();
        reproductionBtnClick();
        showSingleImage();
        setCarouselNavListener();
        initImgCarouselSelected()
        formatCarouselNav();

    }

});

/** This function is to transfer minisis fields through the Request functionality
    from Detailed Report to DIRECT_REQUEST_FORM report*/
function storeAdditionalReqFields(btn_number) {
    sessionStorage.removeItem("Call Number");
    sessionStorage.removeItem("Volume ID");
    if (btn_number == 1) {
        btn_number = 0;
    }
    if (btn_number > 1) {
        btn_number = (btn_number * 2) - 2;
    }
    sessionStorage.setItem("Call Number", holdingsFieldArray[btn_number]);
    ++btn_number;
    sessionStorage.setItem("Volume ID", holdingsFieldArray[btn_number]);
    // alert(holdingsFieldArray);
    // alert(btn_number + " " + sessionStorage.getItem("Call Number"));
    // alert(btn_number + " " + sessionStorage.getItem("Volume ID"));
}

$("#crowd-source-comment").on("load", function() {
    let iframe = document.getElementById('crowd-source-comment');
    let doc = document.getElementById('crowd-source-comment').contentWindow.document;
    let arr = doc.getElementsByClassName('comment-container')
    console.log("array: ", arr)

    if (arr.length === 0)
        iframe.style.display = 'none';
});

const showSingleImage = () => {
    let arr = document.getElementsByClassName('img-container');
    if (arr.length > 1) {
        for (let i = 1; i < arr.length; i++) {
            arr[i].style.display = 'none';
        }
    }
}

try {
    // Initialise Carousel
    const mainCarousel = new Carousel(document.querySelector("#mainCarousel"), {
        Dots: false,
    });

    var myCarousel = null;
    if (document.querySelector(".carousel") != null) {
        myCarousel = new Carousel(document.querySelector(".carousel"), {
            Dots: false
        });
    }
} catch (e) {
    console.log(e)
}

// Thumbnails
// const thumbCarousel = new Carousel(document.querySelector("#thumbCarousel"), {
// Sync: {
//     target: mainCarousel,
//     friction: 0,
// },
// Dots: false,
// Navigation: false,
// center: true,
// slidesPerPage: 1,
// infinite: false,
// });

// Customize Fancybox
// Fancybox.bind('[data-fancybox="gallery"]', {
// Carousel: {
//     on: {
//     change: (that) => {
//         mainCarousel.slideTo(mainCarousel.findPageForSlide(that.page), {
//         friction: 0,
//         });
//     },
//     },
// },
// });

function unescapeHtml(safe) {
    return safe.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

// function myFunction() {
//   var copyText = document.getElementById("myInput");
//   copyText.select();
//   copyText.setSelectionRange(0, 99999);
//   navigator.clipboard.writeText(copyText.value);

//   var tooltip = document.getElementById("myTooltip");
//   tooltip.innerHTML = "Copied: " + copyText.value;
// }

const copyPermalinkFR = (e, rep) => {
    let exp = e.value;
    let params = '';

    if (rep == 'coll') {
        params = 'COLLECTIONS_WEB/WEB_COLL_DET_FR?SESSIONSEARCH&exp=sisn%20';
    } else if (rep == 'desc') {
        params = 'DESCRIPTION_WEB/WEB_DESC_DET_FR?SESSIONSEARCH&exp=sisn%20';
    } else if (rep == 'biblio') {
        params = 'BIBLIO_WEB/WEB_BIBLIO_DET_FR?SESSIONSEARCH&exp=sisn%20';
    } else if (rep == 'people') {
        params = 'PEOPLE_VAL_SYN/WEB_PEOPLE_DET_OPAC_FR?SESSIONSEARCH&exp=PERSON_ID%20';
    } else {
        params = 'ORGANIZATION_VAL_SYN/WEB_ORG_DET_OPAC_FR?SESSIONSEARCH&exp=ORG_ID%20';
    }


    let url = `https://aims.archives.gov.on.ca/scripts/mwimain.dll/145/${params}${exp}`
        // let url = `https://aims.archives.gov.on.ca/scripts/mwimain.dll/144/${report}?SESSIONSEARCH&NOMSG=[ao_opac]/includes/error/norecordArchives.htm&exp=sisn%20${exp}`;
        // let url = `https://aims.archives.gov.on.ca/scripts/mwimain.dll/144/${report} ${exp}?SESSIONSEARCH&NOMSG=[ao_opac]/includes/error/norecordArchives.htm`;
        // let url = `https://aims.archives.gov.on.ca/scripts/mwimain.dll/144/DESCRIPTION_WEB/WEB_DESC_DET/SISN ${sisn}?SESSIONSEARCH&NOMSG=[ao_opac]/includes/error/norecordArchives.htm`;

    console.log(url)
    navigator.clipboard.writeText(url);
    e.textContent = 'Lien Copié!';
}

const permaOut = (e) => {
    e.textContent = "Copiez le lien de l'enregistrement";
    e.style.backgroundColor = '#047BC1'
}

// function outFunc() {
//   var tooltip = document.getElementById("myTooltip");
//   tooltip.innerHTML = "Copy to clipboard";
// }

let detailSlides = [...document.getElementsByClassName('carousel__slide')]

// detailSlides.forEach ( el => {
//   el.addEventListener("keypress", e => {
//     if (e.key === "Enter") {
//       el.click()
//     }
//   })
// })

const formatCarouselNav = () => {
    let carNavArr = document.getElementsByClassName('carousel__nav');
    let carNav = null;
    let prev = null;

    if (carNavArr.length !== 1) {
        for (let i = 1; i < carNavArr.length; i++) {
            carNavArr[i].remove();
        }
    }
    carNav = carNavArr[0];
    prev = document.getElementsByClassName('is-prev')[0];
    if (!carNav) {
        return
    }
    try {
        carNav.prepend(prev);
    } catch (e) {
        console.error(e);
        return;
    }
}

// let lg = document.getElementById('lightgallery');

// lg.addEventListener('onBeforeSlide', e => {
//   console.log( e.detail.prevIndex, e.detail.index)
//   console.log( e.detail.fromThumb)
// })

const setCarouselNavListener = () => {

    let prev = null
    let next = null
    try {
        prev = document.getElementsByClassName('is-prev')[0];
        next = document.getElementsByClassName('is-next')[0];
        if (!prev || !next) {
            return;
        }
        prev.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                updateCarouselSelected();
            }
        })
        next.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                updateCarouselSelected();
            }
        })
    } catch (e) {
        console.log('Error: ', e);
    }

}

const initImgCarouselSelected = () => {
    let carouselArr = document.getElementsByClassName('carousel__slide');
    for (let i = 0; i < carouselArr.length; i++) {
        let slide = carouselArr[i];
        if (slide.classList.contains('is-selected')) {
            slide.tabIndex = 0;
            return;
        }
    }
}

const updateCarouselSelected = () => {
    let carouselArr = document.getElementsByClassName('carousel__slide');
    for (let i = 0; i < carouselArr.length; i++) {
        let slide = carouselArr[i];
        if (slide.classList.contains('is-selected')) {
            console.log('selected')
            slide.tabIndex = 0;
        } else {
            slide.removeAttribute('tabindex')
            slide.classList.remove('is-selected')
        }
    }
}