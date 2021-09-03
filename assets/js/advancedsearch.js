/* * * * * * * * * * * * * * * * * * *
 * *                               * *
 * *     Search Filter             * *
 * *     (DESC, COLL, BIB)         * *
 * *                               * *
 * * * * * * * * * * * * * * * * * * */

const CLUSTER_BODY_ID         = "cluster-body";
const KEYLIST_MODAL_DIALOG_ID = "fullHeightModalRight";

const UN_TITLE_FIELD = "UN_TITLE";


const REFD_FIELD = "REFD";
const TITLE_FIELD = "TITLE";
const DATE_FIELD = "DATE_CR_INC";
const PHYS_DESC_FIELD = "PHYSICAL_DESC";
const FORM_FIELD = "FORM";
const LEVEL_DESC_FIELD = "LEVEL_DESC";

const LEGAL_TITLE_FIELD = "LEGAL_TITLE";
const EARLY_FIELD = "EARLY";
const OBJECT_NAME_FIELD = "OBJECT_NAME";
const PRIMARY_FIELD = "PRIMARY";
const AN_FIELD = "ACCESSION_NUMBER";

const ALL_TITLE_FIELD = "ALL_TITLE_WORD";
const AUTHOR_FIELD = "AUTHOR_WORD";
const SUBJECT_FIELD = "SUBJECT_WORD";
const SERIES_FIELD  = "SERIES_WORD";
const FIELD_020_A = "020_A";
const FIELD_022_A = "022_A";


var clustername = "";

// retrieve a page of key values from web site
function load_index_page ( url ) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      if ( xhttp.responseText != "" ) {
        document.getElementById(CLUSTER_BODY_ID).innerHTML = xhttp.responseText;
      }
    }
    else {
      console.log(this)
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


$("#UN_TITLE_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=UN_TITLE_CL&DATABASE=UNION_VIEW&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = UN_TITLE_FIELD;
});


// DESCRIPTION
$("#REFD_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=REFD&DATABASE=DESCRIPTION_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = REFD_FIELD;
});

$("#TITLE_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=TITLE&DATABASE=DESCRIPTION_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = TITLE_FIELD;
});

$("#DATE_CR_INC_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=DATE_CR_INC&DATABASE=DESCRIPTION_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = DATE_FIELD;
});

$("#PHYS_DESC_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=PHYSICAL_DESC&DATABASE=DESCRIPTION_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = PHYS_DESC_FIELD;
});

$("#FORM_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=FORM&DATABASE=DESCRIPTION_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = FORM_FIELD;
});

$("#LEVEL_DESC_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=LEVEL_DESC&DATABASE=DESCRIPTION_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = LEVEL_DESC_FIELD;
});



// COLLECTIONS

$("#LEGAL_TITLE_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=LEGAL_TITLE&DATABASE=COLLECTIONS_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = LEGAL_TITLE_FIELD;
});

$("#EARLY_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=EARLY&DATABASE=COLLECTIONS_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = EARLY_FIELD;
});

$("#OBJ_NAME_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=OBJECT_NAME&DATABASE=COLLECTIONS_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = OBJECT_NAME_FIELD;
});

$("#PRIMARY_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=PRIMARY&DATABASE=COLLECTIONS_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = PRIMARY_FIELD;
});

$("#AN_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=ACCESSION_NUMBER&DATABASE=COLLECTIONS_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = AN_FIELD;
});

// LIBRARY 

$("#ALL_TITLE_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=ALL_TITLE_WORD&DATABASE=BIBLIO_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = ALL_TITLE_FIELD;
});

$("#AUTHOR_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=AUTHOR_WORD&DATABASE=BIBLIO_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = AUTHOR_FIELD;
});
$("#SUBJECT_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=SUBJECT_WORD&DATABASE=BIBLIO_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = SUBJECT_FIELD;
});
$("#SERIES_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=SERIES_WORD&DATABASE=BIBLIO_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = SERIES_FIELD;
});
$("#020_A_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=020_A&DATABASE=BIBLIO_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = FIELD_020_A;
});
$("#022_A_CL").on("click", function() {
  var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=022_A&DATABASE=BIBLIO_WEB&form=[AO_ASSETS]%2fhtml%2findex-body.html&TITLE=Browse%20values";
  load_index_page ( url );
  clustername = FIELD_022_A;
});



// paste selected value to search form
function assignValue() {
  var jquery_input = null;
  var selected_value = "";

  switch (clustername) {

    //UNION
    case UN_TITLE_FIELD:
      jquery_input = $("input[name=UN_TITLE_CL]");
      break;

    // DESCRIPTION
    case REFD_FIELD:
      jquery_input = $("input[name=REFD_CL]");
      break;
    case TITLE_FIELD:
      jquery_input = $("input[name=TITLE_CL]");
      break;
    case DATE_FIELD:
      jquery_input = $("input[name=DATE_CR_INC_CL]");
      break;
    case PHYS_DESC_FIELD:
      jquery_input = $("input[name=PHYS_DESC_CL]");
      break;
    case FORM_FIELD:
      jquery_input = $("input[name=FORM_CL]");
      break;
    case LEVEL_DESC_FIELD:
      jquery_input = $("input[name=LEVEL_DESC_CL]");
      break;

    // COLLECTIONS
    case LEGAL_TITLE_FIELD:
      jquery_input = $("input[name=LEGAL_TITLE_CL]");
      break;
    case EARLY_FIELD:
      jquery_input = $("input[name=EARLY_CL]");
      break;
    case OBJECT_NAME_FIELD:
      jquery_input = $("input[name=OBJ_NAME_CL]");
      break;
    case PRIMARY_FIELD:
      jquery_input = $("input[name=PRIMARY_CL]");
      break;
    case AN_FIELD:
      jquery_input = $("input[name=AN_CL]");
      break;
      
    // LIBRARY
    case ALL_TITLE_FIELD:
      jquery_input = $("input[name=ALL_TITLE_CL]");
      break;
    case AUTHOR_FIELD:
      jquery_input = $("input[name=AUTHOR_CL]");
      break;
    case SUBJECT_FIELD:
      jquery_input = $("input[name=SUBJECT_CL]");
      break;
    case SERIES_FIELD:
      jquery_input = $("input[name=SERIES_CL]");
      break;
    case FIELD_020_A:
      jquery_input = $("input[name=020_A_CL]");
      break;
    case FIELD_022_A:
      jquery_input = $("input[name=022_A_CL]");
      break;
  }

  if ( jquery_input != null ) {
    var jquery_select = $("#search-value option:selected");
    if ( jquery_select != null ) {
      selected_value = jquery_select.val();
    }
    if ( typeof selected_value == 'undefined' || selected_value == "" ) {
      alert ( "No value is selected" );
    }
    else {
      clustername = "";
      jquery_input.val(selected_value);
      $("#" + KEYLIST_MODAL_DIALOG_ID).modal("hide");
    }
  }
}

// load a page of key values - called from index-body.html
function clusterButton(event, url) {
  event.preventDefault();
  event.stopPropagation();

  //  if url is not #, load page
  if ( url != "#" ) {
    load_index_page ( url );
  }
}

// read a page of key values by value
function searchValue(form_id, request_url) {
  var jquery_form = "#" + form_id;
  var form_data = $(jquery_form).serialize();

  $.ajax({
    async: false,
    type: "POST",
    dataType: "html",
    url: request_url,
    data: form_data,
    success: function (data) {
      if ( data != "" ) {
        document.getElementById(CLUSTER_BODY_ID).innerHTML = data;
      }
      else {
        alert ( "Search key is not found" );
      }
    },
    error: function (xhr, status, error) {
      alert ( "Unable to find search key" );
    }
  });
}