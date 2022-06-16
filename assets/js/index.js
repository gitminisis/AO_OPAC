let HOME_SESSID = getCookie("HOME_SESSID");
let SESSID = getCookie("SESSID");
let client_name = '';
let client_id = '';

let home_sessid = HOME_SESSID.split('-')[0];
let sessionId = home_sessid.split('/').pop();
let sessid = "^SESSID^";
let patron_id = getCookie("M2L_PATRON_ID");
let patron_name = getCookie("M2L_PATRON_NAME");

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
                $('.filter-class').append($(newline + "<h4 class='filter-title' style='font-size:18px; text-align:center;'><b>" + filter_title + "</b></h4><ul id=" + filter_dropdown_id + " list-group' class='general-desc filter-ul'></ul>"));
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
                        item_value = "Description";
                    }
                    if (item_value == 'COLLECTIONS_WEB') {
                        item_value = "Collections";
                    }
                    if (item_value == 'BIBLIO_WEB') {
                        item_value = "Biblio";
                    }
                    //console.log("Item Value: " + item_value + "\n" + "Item Freq: " + item_frequency + "\n");


                    $('#' + filter_dropdown_id).append($("<li class='list-group-item filter-li'><a class='secondary-blue' href=" + item_link + ">" + item_value + " (" + item_frequency + ") " + "</a></li>")); //change here


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

    try {
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
                wrapperClass: 'MyWrapper'
            });
        });
    } catch (e) {
        console.log('bxSlider Error: ', e)
    }

});

const loginOrRegListener = (node) => {
    node.addEventListener('click', () => alert("Please login or signup to use this feature"))
}

const onClickSearchOption = (value) => {
    let option = value == 'Keyword Search' ? 'Option 1: ' : 'Option 2: ';
    let span = document.getElementById('Option-Choice');
    span.innerText = option + value;
}

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
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
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
    var patron_id = getCookie('M2L_PATRON_ID');
    var patron_name = getCookie('M2L_PATRON_NAME');

    if (patron_name) {
        $('#accountInfo').append(`<p>Welcome, <strong>${patron_name}</strong></p>`)
        let logout = `` +

            '<a  class="btn btn-dark btn-sm" value="Log Out" id="logout" href="/assets/html/PubSecureLogout.html"> Log Out </a>' +
            '';
        $('#accountInfo').append(logout)
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

const onClickLoginBtn = () => window.location = '/assets/html/PubSecureLogin.html';

const onClickRegistrationBtn = () => window.location = 'https://stage.signin.ontario.ca/signin/register';

const accessCardListener = (card) => window.location = accessLinks[card];

const carouselImgOnclick = (e) => {
    // The img file name
    let sisn = e.getAttribute('sisn')
    console.log(sisn)
    let siteAddress = 'https://uataoopac.minisisinc.com/scripts/mwimain.dll/144/COLLECTIONS_WEB/WEB_COLL_DET'
    window.location = `${siteAddress}?SESSIONSEARCH&EXP=SISN ${sisn}&ERRMSG=[AO_INCLUDES]error/norecordArt.htm`

}

const redirectToArtAdvance = () => window.location = `${home_sessid}?GET&FILE=[AO_ASSETS]html/advancedsearchArt.html`;
const redirectToArchiveAdvance = () => window.location = `${home_sessid}?GET&FILE=[AO_ASSETS]html/advancedsearchArchives.html`;
const redirectToLibraryAdvance = () => window.location = `${home_sessid}?GET&FILE=[AO_ASSETS]html/advancedsearchLibrary.html`;