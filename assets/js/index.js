var HOME_SESSID = getCookie("HOME_SESSID");
var SESSID = getCookie("SESSID");
var client_name = '';

/* * * * * * * * * * * *
 * *                 * *
 * *  Document Ready * *
 * *                 * *
 * * * * * * * * * * * */
$(document).ready(function () {

   client_name = getCookie('M2L_PATRON_NAME');
   client_name = unescapeString(client_name);

  // Display Account Info after Login
  getAccountInfo();

  // Summary Report "Save to Bookmark"
  // $('div.summary_result_check label').click(function () {
  //   // Basically, we want to check the invisible checkbox and submit the form
  //   // so that the "label" acts like a button.
  //   console.log("clicked");
  //   $(this).parent('div.summary_result_check').find('input[type=checkbox]').attr('checked', 'checked');

  //   $('#web_sum_form').submit();
  // });
  // Detail Report "Save to Bookmark"
  $('div.detail_result_check label').click(function () {
    // Basically, we want to check the invisible checkbox and submit the form
    // so that the "label" acts like a button.
    $(this).parent('div.detail_result_check').find('input[type=checkbox]').attr('checked', 'checked');
    $('#web_det_form').submit();
  });

  // Detail Bookmark
  // When Clicked ajax sends href to minisis to add selected record to list.
  // Once success, reload the page. Report Checks whether record is in the list or not
  // to color in the bookmark heart
  $('.bookmarkbutton').on('click', function () {
    $.ajax({
      type: "GET",
      url: $(this).attr('href'),
      success: function () {
        location.reload();
      }
    });
  });

  // Filters
  if ($("#filter_results").length) {
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

  }// Filter End
  // .Crowd-Source
  if (getCookie("M2L_PATRON_ID") === "") {
    //  $('button.Crowd-Source').attr('hidden');

    var crowdSource = document.querySelectorAll(".Crowd-Source");
    var reproduction = document.querySelectorAll(".Reproduction");
    var request = document.querySelectorAll(".Req-Material");

    // removes these buttons for 10 records per page
    for (var i = 0; i < 10; i++) {
      // crowdSource[i].style.display = "none";
      reproduction[i].style.display = "none";
      request[i].style.display = "none";
    }
  }
  else {
    $('#User-Id-Input').append(getCookie("M2L_PATRON_ID"));
  }

});

const onClickSearchOption = (value) => {
  let option = value == 'Keyword Search' ? 'Option 1: ' : 'Option 2: ';
  let span = document.getElementById('Option-Choice');
  span.innerText = option + value;
}
/* * * * * * * * * * * * *
 * *                   * *
 * *      Bookmark     * *
 * *                   * *
 * * * * * * * * * * * * */
function bookmark() {

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

function ReadCookie(nom) {
  var arg = nom + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;

  while (i < clen) {
    var var2;
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg) {
      var2 = getCookieVal(j);
      var2 = replaceAll(escape(var2), "%20%A0", "+");
      var2 = replaceAll(var2, "%A0", "+");
      var2 = replaceAll(var2, "%20", "+");
      return var2;
    }
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}


let headOpen = false;
let quickOpen = false;
const headAccordionOnClick = (e) => {
  if (!headOpen) {
    e.parentNode.classList.add('open');
    headOpen = true;
  } else {
    e.parentNode.classList.remove('open');
    headOpen = false;
  }
}

const navAccordionOnClick = (e) => {
  if (!quickOpen) {
    e.parentNode.classList.add('open');
    quickOpen = true;
  } else {
    e.parentNode.classList.remove('open');
    quickOpen = false;
  }
}



function getAccountInfo() {
  var patron_id = getCookie('M2L_PATRON_ID');
  var patron_name = getCookie('M2L_PATRON_NAME');

  if (patron_name) {
    $('#accountInfo').append(`<p>Welcome, <strong>${patron_name}</strong></p>`)
    let logout = `<form method="post" action="${HOME_SESSID}?PATRONLOGOFF&file=[AO_ASSETS]html/logout.html" id="logout-form">`
      + '<input type="hidden" name="C_CLIENT_NUMBER" value="Guest">'
      + '<input type="submit" class="btn btn-dark btn-sm" value="Log Out" id="logout">'
      + '</form>';
    $('#accountInfo').append(logout)
  }
}

function unescapeString(str) {
  return str.replace(/%20/g,' ').replace(/%28/g,'(').replace(/%29/g,')').replace(/%26/g,'&').replace(/%2f/g,'/').replace(/%3f/g,'?').replace(/%5c/g,'\\').replace(/%2c/g,',').replace(/%25/g,'%');
}
