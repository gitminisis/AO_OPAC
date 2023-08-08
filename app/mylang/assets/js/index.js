let HOME_SESSID = getCookie("HOME_SESSID");
let SESSID = getCookie("SESSID");
let client_name = '';
let client_id = '';
let home_sessid = HOME_SESSID.split('-')[0];
let sessionId = home_sessid.split('/').pop();
let sessid = "^SESSID^";
let patron_id = getCookie("M2L_PATRON_ID");
let patron_name = getCookie("M2L_PATRON_NAME");
let timeout = 900; // Timeout in seconds
let curWidth = window.innerWidth;

const accessLinks = {
    1: '/scripts/mwimain.dll/144/DESCRIPTION_WEB?DIRECTSEARCH',
    2: '/scripts/mwimain.dll/144/BIBLIO_WEB?DIRECTSEARCH',
    3: '/scripts/mwimain.dll/144/COLLECTIONS_WEB?DIRECTSEARCH',
    4: 'http://ao.minisisinc.com/scripts/mwimain.dll/144/IMAGES?DIRECTSEARCH'
}


/* * * * * * * * * * * *
 * *                 * *
 * *  Document Ready * *
 * *                 * *
 * * * * * * * * * * * */
$(document).ready(function() {
    //timerCountdown();
    client_name = getCookie('M2L_PATRON_NAME');
    client_name = unescapeString(client_name);
    client_id = getCookie('M2L_PATRON_ID');

    // Display Account Info after Login
    getAccountInfo();


    // Detail Report "Save to Bookmark"
    $('div.detail_result_check label').click(function() {
        // Basically, we want to check the invisible checkbox and submit the form
        // so that the "label" acts like a button.
        $(this).parent('div.detail_result_check').find('input[type=checkbox]').attr('checked', 'checked');
        $('#web_det_form').submit();
    });

    // Detail Bookmark
    // When Clicked ajax sends href to minisis to add selected record to list.
    // Once success, reload the page. Report Checks whether record is in the list or not
    $('.bookmarkbutton').on('click', function() {
        $.ajax({
            type: "GET",
            url: $(this).attr('href'),
            success: function() {
                location.reload();
            }
        });
    });

    // Filters
    if ($("#filter_results").length) {
        if (document.getElementById('filter_xml') != null) {
            var filter_inner_xml = $("div").find('#filter_xml')[0].innerHTML;
            let filter_xml = "<filter_xml>\n" + filter_inner_xml + "</filter_xml>\n";
            //console.log(filter_xml);
            parser = new DOMParser();
            var xml_doc = parser.parseFromString(filter_xml, "text/xml");

            var filter_tag_list = xml_doc.getElementsByTagName("filter");
            var filter_count = filter_tag_list.length;
            //$('.filter-class').prepend($("<div class='filter_list_container'></div>"));

            // manipulation of filter data
            for (x = 0; x < filter_count; x++) {
                var filter_group = filter_tag_list[x];
                var item_group_list = filter_group.getElementsByTagName("item_group");

                var item_group_count = item_group_list.length;

                var filter_name = xml_doc.getElementsByTagName("filter")[x].getAttribute("name");
                var filter_title = xml_doc.getElementsByTagName("filter")[x].getAttribute("title");

                var filter_dropdown_id = "filter_dropdown";
                var newline = "";
                if (x > 0) {
                    filter_dropdown_id += x.toString(); // create different filter id in order to append next ul
                    newline = "<br/>";
                }
                var filter_ul_responsive = xml_doc.getElementsByTagName("filter")[x].getAttribute("title");

                if (filter_ul_responsive == "Database" || filter_ul_responsive == "Digital Media Present" || filter_ul_responsive == "Holdings") {
                    filter_ul_responsive = "filter_ul_responsive";
                } else {
                    filter_ul_responsive = "";
                }

                $('.filter-class').append($(newline + "<h4 class='filter-title' style='font-size:18px; text-align:center;'><b>" + filter_title + "</b></h4><ul id=" + filter_dropdown_id + " list-group' class='general-desc filter-ul " + filter_ul_responsive + "'></ul>"));
                //  $('.filter_list_container').append($( newline + "<div class='filter_list_container_inner'><ul id='filter_ul_main'><li id='filter_li_main'><div id='filter_title'><a href='#' name='filter_title'>" + filter_title + " <i class='fa fa-caret-down'/></a></div><ul id=" + filter_dropdown_id + " style='padding-left:0;'></ul></li></ul></div>"));

                for (i = 0; i < item_group_count; i++) {

                    var item_group = item_group_list[i];
                    var item_value = item_group.getElementsByTagName("item_value")[0].childNodes[0].nodeValue;
                    var item_frequency = item_group.getElementsByTagName("item_frequency")[0].childNodes[0].nodeValue;
                    var item_link = item_group.getElementsByTagName("item_link")[0].childNodes[0].nodeValue;
                    var item_selected = item_group.getElementsByTagName("item_selected")[0].childNodes[0].nodeValue;
                    if (item_selected == 'Y') {
                        selection_sign = " - ";
                    }

                    if (item_value == 'X') {
                        item_value = "Yes";
                    }
                    if (item_value == 'DESCRIPTION_WEB') {
                        item_value = "Archives";
                    }
                    if (item_value == 'COLLECTIONS_WEB') {
                        item_value = "Art";
                    }
                    if (item_value == 'BIBLIO_WEB') {
                        item_value = "Library";
                    }
                    //console.log("Item Value: " + item_value + "\n" + "Item Freq: " + item_frequency + "\n");


                    $('#' + filter_dropdown_id).append($("<li class='list-group-item filter-li'><a class='secondary-blue filter-record-link' href=" + item_link + ">" + item_value + " (" + item_frequency + ") " + "</a></li>")); //change here


                }
            }
        }
    } // Filter End
    // .Crowd-Source
    if (getCookie("M2L_PATRON_ID") === "") {
        //  $('button.Crowd-Source').attr('hidden');

        var crowdSource = document.querySelectorAll(".Crowd-Source");
        var reproduction = document.querySelectorAll(".Reproduction");
        var request = document.querySelectorAll(".Req-Material");
        var copyright = document.querySelectorAll(".Copyright");

        // removes these buttons for 10 records per page
        for (var i = 0; i < 10; i++) {
            if (crowdSource[i] != null) {
                crowdSource[i].style.display = "none";
            }
            if (reproduction[i] != null) {
                let parent = reproduction[i].parentNode;
                parent.style.cursor = "pointer";
                reproduction[i].disabled = true;
                reproduction[i].style.background = 'grey';
                reproduction[i].style.borderColor = 'grey';
                loginOrRegListener(parent)
            }
            // if (request[i] != null) {
            //     request[i].style.display = "none";
            // }
            if (copyright[i] != null) {
                let parent = copyright[i].parentNode;
                parent.style.cursor = "pointer";
                copyright[i].disabled = true;
                copyright[i].style.background = 'grey';
                copyright[i].style.borderColor = 'grey';
                loginOrRegListener(parent)

            }
        }
    } else {
        $('#User-Id-Input').append(getCookie("M2L_PATRON_ID"));
    }
});

$(window).on('load', function() {
    console.log('window loading')
    chooseSlider(curWidth)
    window.addEventListener('resize', widthDidChange);
})

const loginOrRegListener = (node) => {
    node.addEventListener('click', () => alert("Please login or signup to use this feature"))
}

const onClickSearchOption = (value) => {
    let option = value == 'Keyword Search' ? 'Option 1: ' : 'Option 2: ';
    let span = document.getElementById('Option-Choice');
    span.innerText = option + value;
}

// let timerCountdown = () => {
//     let timer = setInterval(() => {
//         timeout--;
//         if (timeout === 10) {
//             $('body').append(`<div id="timeoutModal" class="modal fade " tabindex="-1" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Notification</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" > <p id="timeoutModalBody">Your session is going to timeout and you will be logged out in ${timeout} second(s)</p> </div> <div class="modal-footer"> <button type="button" id="sessionContinue" class="btn btn-primary">Continue</button> <button type="button" id="sessionEnd"  class="btn btn-secondary" data-dismiss="modal">Logout</button> </div> </div> </div> </div>`)
//             var myModal = new bootstrap.Modal(document.getElementById('timeoutModal'))
//             myModal.show()

//             $("#sessionContinue").on('click', function() {
//                 clearInterval(timer)
//                 location.reload();
//             })
//             $("#sessionEnd").on('click', function() {
//                 window.location = '/assets/html/PubSecureLogout.html'
//             })
//         } else if (timeout < 10 && timeout >= 0) {
//             $('#timeoutModalBody').text(`Your session is going to timeout and you will be logged out in ${timeout} second(s)`)
//         }
//         if (timeout === 0) {
//             clearInterval(timer)
//             window.location = '/assets/html/PubSecureLogout.html'
//         }
//     }, 1000);
// }

/* * * * * * * * * * * * *
 * *                   * *
 * *      Cookies      * *
 * *                   * *
 * * * * * * * * * * * * */
function deleteCookie(cname) {
    document.cookie = cname + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";

}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function WriteCookie(name, value) {
    var argv = WriteCookie.arguments;
    var argc = WriteCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;

    document.cookie = name + "=" + value + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + "; path=/" + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return (document.cookie.substring(offset, endstr));
}

function ReadCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;

    while (i < clen) {
        var var2;
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            var2 = getCookieVal(j);
            return unescape(var2);
        }

        i = document.cookie.indexOf(" ", i) + 1;

        if (i == 0) {
            break;
        }
    }
    return "null";
}


let headOpen = false;
let quickOpen = false;
const headAccordionOnclick = (e) => {
    let navBody = document.getElementById('panelsStayOpen-collapseheaderMobile');
    if (!headOpen) {
        e.parentNode.classList.add('open');
        navBody.classList.add('show');
        headOpen = true;
    } else {
        e.parentNode.classList.remove('open');
        headOpen = false;
    }
}

const navAccordionOnClick = (e) => {
    let navBody = document.getElementById('panelsStayOpen-collapse-quick-mobile');
    if (!quickOpen) {
        e.parentNode.classList.add('open');
        navBody.classList.add('show');
        quickOpen = true;
    } else {
        e.parentNode.classList.remove('open');
        quickOpen = false;
    }

    if (navBody.classList.contains('show')) {
        e.parentNode.classList.add('open');
        quickOpen = true;
    }
}

function getAccountInfo() {

    if (patron_name) {
        $('#accountInfo').append(`<p> Welcome, <strong>${patron_name}</strong></p>`);
        let logout = `
                                ` +
            '<a  class="btn btn-dark btn-sm" value="Log Out" id="logout" href="/assets/html/PubSecureLogout.html"> Log Out </a>' +
            '';
        $('#accountInfo').append(logout);
        let myOntarioAccount = `<a class="btn btn-dark btn-sm" style="margin-top:20px;width:100%" value="My Ontario Account" id="ontarioAccount" href="https://stage.signin.ontario.ca/enduser/settings"> My Ontario Account </a>`;
        $('#accountInfo').append(myOntarioAccount);



    }
}

function unescapeString(str) {
    return str.replace(/%20/g, ' ').replace(/%28/g, '(').replace(/%29/g, ')').replace(/%26/g, '&').replace(/%2f/g, '/').replace(/%3f/g, '?').replace(/%5c/g, '\\').replace(/%2c/g, ',').replace(/%25/g, '%');
}

// prompt user to edit enquiry record
function editEnquiry(sessid) {
    var enquiry_id = prompt("Enter Enquiry ID ", "");
    if (enquiry_id !== null && enquiry_id != '') {
        var url = sessid + '?changesinglerecord&database=ENQUIRIES_VIEW&de_form=[AO_ASSETS]html/enquiry.html&exp=ENQ_ID%20"' + enquiry_id + '"';
        window.location = url;
    }
}

/**
 * Rework Simple Search Behaviour. 
 * Enable display for loading spinner
 * Disable simple search button
 * Submit form
 */
function submitSimpleSearch() {
    $("#Main-Form").on('submit', function(e) {
        $(".icon-container").css('display', 'block');
        $(".simple-search-btn").attr('disabled', true);

    })
}

submitSimpleSearch();

// Added hard-code lang paramter in the URL
const onClickLoginBtn = () => window.location = '/assets/html/PubSecureLogin.html';

const onClickRegistrationBtn = () => window.location = 'https://stage.signin.ontario.ca/signin/register';

const accessCardListener = (card) => window.location = accessLinks[card];

const carouselImgOnclick = (e) => {
    // The img file name
    let sisn = e.getAttribute('sisn')
    console.log(sisn)
    let siteAddress = 'https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/144/COLLECTIONS_WEB/WEB_COLL_DET'
    window.location = `${home_sessid}/SISN/${sisn}?KEYSEARCH&DATABASE=COLLECTIONS_WEB&ERRMSG=[AO_INCLUDES]error/norecordArt.htm`
}

const redirectToArtAdvance = () => window.location = `${home_sessid}?GET&FILE=[AO_ASSETS]html/advancedsearchArt.html`;
const redirectToArchiveAdvance = () => window.location = `${home_sessid}?GET&FILE=[AO_ASSETS]html/advancedsearchArchives.html`;
const redirectToLibraryAdvance = () => window.location = `${home_sessid}?GET&FILE=[AO_ASSETS]html/advancedsearchLibrary.html`;

const howToSearch = (db) => {
    switch (db) {
        case "desc":
            window.location = "http://www.archives.gov.on.ca/en/db/add/help/h-searching_add.aspx";
            break;
        case "art":
            window.location = "http://www.archives.gov.on.ca/en/db/goac/goac_help.aspx";
            break;
        case "biblio":
            window.location = "http://ao.minisisinc.com/aolib/biblionhelp.htm"
            break;
        default:
            window.location = "http://www.archives.gov.on.ca/en/db/add/help/h-searching_add.aspx";

    }
}

const detectWidth = () => window.innerWidth
const widthDidChange = () => {
    let newWidth = detectWidth();
    if (curWidth >= 768 && newWidth >= 768) return;
    else if (curWidth >= 425 && curWidth < 768 && newWidth >= 425 && newWidth < 768) return;
    else if (curWidth < 425 && newWidth < 425) return;
    else {
        console.log('CHANGE')
        curWidth = newWidth;
        chooseSlider(curWidth);
    }
    
}

const chooseSlider = (width) => {
    console.log(width)
    if (document.getElementById('art-content-container' == null)) return;

    if (width >= 768) {
        console.log('I am 768')
        try {
            // slider.destroySlider();
            $(function() {
                $('.bxslider').bxSlider({
                    mode: 'vertical',
                    easing: 'ease',
                    slideWidth: 300,
                    adaptiveHeight: true,
                    adaptiveHeightSpeed: 60,
                    responsive: true,
                    pager: false,
                    minSlides: 5,
                    wrapperClass: 'slideWrapper'
                });
            });
        } catch (e) {
            console.log('bxSlider Error: ', e)
        }
    }
    else if (width >= 425) {
        console.log('less that 768')
        try {
            // slider.destroySlider();
            $(function() {
                $('.bxslider-tab').bxSlider({
                    mode: 'horizontal',
                    easing: 'ease',
                    slideWidth: 210,
                    shrinkItems: true,
                    adaptiveHeight: true,
                    adaptiveHeightSpeed: 60,
                    ariaLive: true,
                    ariaHidden: true,
                    responsive: true,
                    pager: true,
                    minSlides: 5,
                    // wrapperClass: 'tabWrapper'
                });
            });
        } catch (e) {
            console.log('bxSlider Error: ', e)
        }
    }
    else {
        console.log('less than 425')
        try {
            // slider.destroySlider();
            $(function() {
                $('.bxslider-mobile').bxSlider({
                    mode: 'horizontal',
                    easing: 'ease',
                    slideWidth:280,
                    adaptiveHeight: true,
                    adaptiveHeightSpeed: 60,
                    responsive: true,
                    pager: true,
                    minSlides: 1,
                    // wrapperClass: 'mobWrapper'
                });
            });
        } catch (e) {
            console.log('bxSlider Error: ', e)
        }
    }
}

