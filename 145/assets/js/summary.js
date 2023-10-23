$(document).ready(function() {
    let page = document.getElementById("summary-page");
    try {
        setPaginationAccessiblity(page);
    } catch (error) {}

    if (page !== null) {
        let countImg = 1,
            countDoc = 1,
            countAud = 1,
            countVid = 1;
        let countImg2 = 1,
            countDoc2 = 1,
            countAud2 = 1,
            countVid2 = 1;
        let countMarcBtn = 1,
            countMarcXML = 1,
            countMarcModal = 1;
        if ($(".Detail-Container").length === 0) {
            $(".image-icon").each(function() {
                $(this).attr("data-bs-target", "#detailModalImage" + countImg++);
            });
            $(".doc-icon").each(function() {
                $(this).attr("data-bs-target", "#detailModalDoc" + countDoc++);
            });
            $(".audio-icon").each(function() {
                $(this).attr("data-bs-target", "#detailModalAudio" + countAud++);
            });
            $(".video-icon").each(function() {
                $(this).attr("data-bs-target", "#detailModalVideo" + countVid++);
            });

            $(".modal#detailModalImage").each(function() {
                $(this).attr("id", "detailModalImage" + countImg2++);
            });
            $(".modal#detailModalAudio").each(function() {
                $(this).attr("id", "detailModalAudio" + countAud2++);
            });
            $(".modal#detailModalVideo").each(function() {
                $(this).attr("id", "detailModalVideo" + countVid2++);
            });
            $(".modal#detailModalDoc").each(function() {
                $(this).attr("id", "detailModalDoc" + countDoc2++);
            });
        }

        $(".marc-btn").each(function() {
            $(this).attr("data-bs-target", "#marcModal" + countMarcBtn++);
        });
        $("marc#marc").each(function() {
            $(this).attr("id", "marc" + countMarcXML++);
        });

        // $("#marcModal").each(function() {
        //     $(this).attr("id", "marcModal" + countMarcModal++);
        // });
        $("button.colorbox").click(function(e) {
            let evt = e;
            // $(this).parent().parent().find(".cs-item-sisn");

            var test1 = $(this).parent().parent().find(".cs-item-id");
            var test2 = $(this).parent().parent().find(".cs-item-src");
            var test3 = client_name;

            $.colorbox({
                iframe: true,
                transition: "elastic",
                width: "1200px",
                height: "780px",
                overlayClose: true,
                href: HOME_SESSID +
                    "?addsinglerecord&database=COMMENTS_VIEW&de_form=[AO_ASSETS]html/crowdSourceEntry.html&new=y",
                onLoad: function() {
                    let csitemSISN = document.getElementsByClassName("cs-item-sisn");
                    let csitemSRC = document.getElementsByClassName("cs-item-src");
                    let csitemID = document.getElementsByClassName("cs-item-id"); // F 23-G,

                    console.log(evt);
                    console.log(evt.target.id);

                    $tmp_data = test1.text(); // F 26 G
                    $tmp_data2 = test2.text(); // DESCRIPTION COLLECTION LIBRARY
                    $tmp_data3 = test3;
                    $tmp_data4 = client_id.split("]")[1];
                },
                onComplete: function() {
                    //$("#test_btn").click();
                },
                onClose: function() {
                    delete $tmp_data;
                    delete $tmp_data2;
                    delete $tmp_data3;
                    delete $tmp_data4;
                },
            });
        });

        // $("#cpa-form").submit(function(e){
        //     return false;
        // });
        //onchange="this.form.submit()"
        // Summary Bookmark
        $("#web_sum_form").on("submit", function(e) {
            e.preventDefault();
        });

        var count = false;

        $(".bookmark-btn").on("click", function() {
            if (count == false) {
                count = true;
                console.log("success");
                $.ajax({
                    type: "POST",
                    url: $(".web_sum_form").attr("data-action"),
                    data: $(this).find("input").attr("name") +
                        "=" +
                        $(this).find("input").attr("value"),
                    success: function(textStatus, status) {
                        // console.log(textStatus);
                        // console.log(status);
                    },
                    error: function(xhr, textStatus, error) {
                        // console.log(xhr.responseText);
                        // console.log(xhr.statusText);
                        // console.log(textStatus);
                        // console.log(error);
                    },
                }).done(function() {
                    console.log("reloading");
                    location.reload();
                });
            }
        });
        $(".Delete-Bookmark").on("click", function() {
            $.ajax({
                url: $("#web_sum_form").attr("action"),
                type: "POST",
                data: $(this).find("input").attr("name") +
                    "=" +
                    $(this).find("input").attr("value"),
            }).then(function(data) {
                location.reload();
            });
        });
        // var bookmark_desc = document.getElementById("bookmark-database")
        // $.ajax({
        //     url: $("#bookmark-id-btn").attr("action"),
        //     type: "POST",
        //     data: "?ADDSELECTION&COOKIE=BOOKMARK&DBNAME=",
        //   }).then(function (data) {
        //     location.reload();
        //   });

        checkMedia();
        // Remove minisis search cluster
        if (document.getElementById("search-statement")) {
            $("div#search-statement").html(
                $("div#search-statement")
                .html()
                .replace(
                    /KEYWORD_CLUSTER |ALL_ |RECORD_ID_CL |ACCESSION_NUMBER |OBJ_DESCRIPTION |OBJECT_TYPE |SUB_KEYWORD |EARLY |MAKER_FULLNAME |MAKER_ORG |MEDIUM |MATERIAL_COO |OBJECT_STATUS |AUTHOR_CL |LIB_PUB_CL |ISBN_CL |ISSN_CL |MEDIA_TYPE_CL |BARCODE_CL |RECORD_ID_CL  |REFD_HIGHER_CL |ORIGIN_CL |ASSO_ORG_CL |ASSO_ORG_CL |DATES_EXISTED |VENDOR_ROLE |P_AUTH_TYPE |KEYWORDS |KEYNAMES |TITLE_CL |SCOPE_CL |DATE_CL |REFD_CL |ORIGINATOR_CL |PHYSICAL_DESC_CL |FORMATS_CL |SUBJECT_CL |RELATED_MAT_CL |AND_WORD |OR_WORD |ADJ_WORD |KEYWORD_CLUSTER AND_WORD |HD_FIRSTNAME&nbsp;|HD_SURNAME&nbsp;|HD_PLACE&nbsp;|HD_DATE&nbsp;|SURNAME&nbsp;|GIVENNAME&nbsp;|NATION&nbsp;|TRADEWHOLE&nbsp;|SHIPWHOLE&nbsp;|DESTWHOLE&nbsp;|YEAR&nbsp;|HD_FIRSTNAME |HD_SURNAME |HD_PLACE |HD_DATE |SURNAME |GIVENNAME |NATION |TRADEWHOLE |SHIPWHOLE |DESTWHOLE |YEAR /g,
                    ""
                )
            );
        }

        // Truncate any fields in records that exceeds over a certain character amount
        var truncateTitle = document.querySelectorAll(".Record-Title b a");

        for (var i = 0; i < truncateTitle.length; i++) {
            if (truncateTitle[i].innerText.length > 75) {
                truncateTitle[i].innerText =
                    truncateTitle[i].innerText.substring(0, 75) + "...";
            }
        }
    }
}); // document end

const checkMedia = () => {
    let x = document.getElementsByClassName("media-container");

    for (let i = 0; i < x.length; i++) {
        let iconSet1 = x[i].children[2].children[0].children.length;
        let iconSet2 = x[i].children[2].children[1].children.length;
        let iconSets = iconSet1 + iconSet2;

        if (iconSets === 0) x[i].style.display = "none";
    }
};

const setPaginationAccessiblity = (page) => {
    if (!page) return;
    let paginations = document.getElementsByClassName("pagination-container");
    if (paginations.length == 0) return;

    let len = paginations[0].children.length;
    let dblRight = null;
    let dblLeft = null;
    let prev = null;
    let next = null;
    let list = null;
    let grid = null;

    for (let i = 0; i < 2; i++) {
        for (let j = 1; j < len - 1; j++) {
            let pageIdx = paginations[i].children[j];
            pageIdx.setAttribute("aria-label", `Page ${pageIdx.textContent}`);
        }
    }

    dblright = [...document.getElementsByClassName("summary-double-right")];
    dblLeft = [...document.getElementsByClassName("summary-double-left")];
    prev = [...document.getElementsByClassName("summary-prev-btn")];
    next = [...document.getElementsByClassName("summary-next-btn")];
    list = [...document.getElementsByClassName("summary-list-btn")];
    grid = [...document.getElementsByClassName("summary-grid-btn")];

    dblright.forEach((elem) => {
        let parent = elem.parentNode;
        parent.nodeName == "A" ?
            elem.parentNode.setAttribute("aria-label", "Next Page") :
            elem.setAttribute("aria-label", "Next Page");
    });
    dblLeft.forEach((elem) => {
        let parent = elem.parentNode;
        parent.nodeName == "A" ?
            elem.parentNode.setAttribute("aria-label", "Previous Page") :
            elem.setAttribute("aria-label", "Previous Page");
    });
    prev.forEach((elem) => {
        let parent = elem.parentNode;
        parent.nodeName == "A" ?
            elem.parentNode.setAttribute("aria-label", "Previous Page") :
            elem.setAttribute("aria-label", "Previous Page");
    });
    next.forEach((elem) => {
        let parent = elem.parentNode;
        parent.nodeName == "A" ?
            elem.parentNode.setAttribute("aria-label", "Next Page") :
            elem.setAttribute("aria-label", "Next Page");
    });
    list.forEach((elem) => {
        let parent = elem.parentNode;
        parent.nodeName == "A" ?
            elem.parentNode.setAttribute("aria-label", "Switch to List View") :
            elem.setAttribute("aria-label", "Switch to List View");
    });
    grid.forEach((elem) => {
        let parent = elem.parentNode;
        parent.nodeName == "A" ?
            elem.parentNode.setAttribute("aria-label", "Switch to Grid View") :
            elem.setAttribute("aria-label", "Switch to Grid View");
    });
};

let artCarousel = [...document.getElementsByClassName("art-carousel-img")];

artCarousel.forEach((img) => {
    img.addEventListener("keypress", (e) => {
        // If the user presses the "Enter" key on the keyboard
        if (e.key === "Enter") {
            carouselImgOnclick(e.target);
        }
    });
});