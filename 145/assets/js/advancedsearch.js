/* * * * * * * * * * * * * * * * * * *
 * *                               * *
 * *     Search Filter             * *
 * *     (DESC, COLL, BIB)         * *
 * *                               * *
 * * * * * * * * * * * * * * * * * * */

const CLUSTER_BODY_ID = "cluster-body";
const KEYLIST_MODAL_DIALOG_ID = "fullHeightModalRight";

const UN_TITLE_FIELD = "UN_TITLE_CL";

// DESC
const REFD_FIELD = "REFD";
const REFD_HIGHER_FIELD = "REFD_HIGHER"
const TITLE_FIELD = "TITLE";
const SCOPE_FIELD = "SCOPE";
const ORIGINATOR_FIELD = "ORIGINATOR";
const ASSO_ORG_FIELD = "ASSO_ORG_CL";
const LEVEL_FIELD = "LEVEL_DESC";
const SEARCH_DATE_FIELD = "DATE_SEARCH";
const PHYS_DESC_FIELD = "PHYSICAL_DESC";
const FINDAID_FIELD = "FINDAIDLINK";
const BARCODE_DESC_FIELD = "BARCODE_ID";
const SUBJECT_DESC_FIELD = "SUBJECT";
const DATE_FIELD = "DATE_CR_INC";
const FORM_FIELD = "FORM";


// COLL
const AN_FIELD = "ACCESSION_NUMBER";
const LEGAL_TITLE_FIELD = "LEGAL_TITLE";
const OBJ_DESC_FIELD = "OBJ_DESCRIPTION";
const OBJ_TYPE_FIELD = "OBJ_TYPE";
const SUB_KEYWORD_FIELD = "SUB_KEYWORD";
const EARLY_FIELD = "EARLY";
const MAKER_FULLNAME_FIELD = "MAKER_FULLNAME";
const MAKE_ORG_FIELD = "MAKER_ORG";
const MEDIUM_FIELD = "MEDIUM";
const MATERIAL_FIELD = "MATERIAL_COO";
const OBJECT_NAME_FIELD = "OBJECT_NAME";
const PRIMARY_FIELD = "PRIMARY";
const BUILDING_FIELD = "BUILDING";
const OBJECT_STATUS_FIELD = "OBJECT_STATUS";

// BIBLIO
const ALL_TITLE_FIELD = "ALL_TITLE_WORD";
const AUTHOR_FIELD = "AUTHOR_WORD";
const LIB_PUB_FIELD = "LIB_PUB_CL";
const SUBJECT_FIELD = "SUBJECT_WORD";
const SERIES_FIELD = "SERIES_WORD";
const ISBN_FIELD = "020_A";
const ISSN_FIELD = "022_A";
const CIT_REF_FIELD = "511_A";
const MEDIA_TYPE_FIELD = "MEDIA_TYPE"; //
const MAT_TYPE_FIELD = "I_COLLECT_CODE"; //
const HOLD_CENTRE_FIELD = "HOLDING_CENTRE"; //
const BARCODE_FIELD = "BARCODE"; //
const RECORD_ID_FIELD = "001";

const FIELD_020_A = "020_A";
const FIELD_022_A = "022_A";


// PEOPLE_VAL
const FULLNAME3_FIELD = "FULLNAME3";
const ORG_MAIN_BODY_FIELD = "ORG_MAIN_BODY";


// PEOPLE_VAL_SYN ADVANCED SEARCH
const KEYWORDS_PEOPLE_FIELD = "KEYWORDS";
const KEYNAMES_PEOPLE_FIELD = "KEYNAMES";
// const P_AUTH_TYPE_FIELD     = "P_AUTH_TYPE;"


// ORGANIZATION_VAL_SYN ADVANCED SEARCH
const KEYWORDS_FIELD = "KEYWORDS";
const KEYNAMES_FIELD = "KEYNAMES";
// const VENDER_ROLES_FIELD          = 'VENDER_ROLES';
const DATES_EXISTED_FIELD = "DATES_EXISTED";


// HAWKE
const HAWKE_SURNAME = "SURNAME";
const HAWKE_GIVENNAME = "GIVENNAME";
const HAWKE_NATION = "NATION";
const HAWKE_TRADEWHOLE = "TRADEWHOLE";
const HAWKE_SHIPWHOLE = "SHIPWHOLE";
const HAWKE_DESTWHOLE = "DESTWHOLE";
const HAWKE_YEAR = "YEAR";


// AOHEIRS
const HEIRS_HD_SURNAME = "HD_SURNAME";
const HEIRS_HD_FIRSTNAME = "HD_FIRSTNAME";
const HEIRS_HD_PLACE = "HD_PLACE";
const HEIRS_HD_DATE = "HD_DATE";



var clustername = "";

// retrieve a page of key values from web site
function load_index_page(url) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            if (xhttp.responseText != "") {
                console.log(xhttp)
                    // console.log(xhttp.responseText)
                document.getElementById(CLUSTER_BODY_ID).innerHTML = xhttp.responseText;
            }
        } else {
            console.log(this)
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// UNION
$("#UN_TITLE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=UN_TITLE_CL&DATABASE=UNION_VIEW&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = UN_TITLE_FIELD;
});


// DESCRIPTION
$("#REFD_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=REFD&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = REFD_FIELD;
});
$("#REFD_HIGHER_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=REFD_HIGHER&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = REFD_HIGHER_FIELD;
});

$("#TITLE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=TITLE&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = TITLE_FIELD;
});
$("#FORMATS_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=FORMATS_CL&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = TITLE_FIELD;
});
$("#SCOPE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=SCOPE&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = SCOPE_FIELD;
});

$("#ORIGIN_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=ORIGINATOR&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = ORIGINATOR_FIELD;
});

$("#ASSO_ORG_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=ASSO_ORG_CL&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = ASSO_ORG_FIELD;
});

$("#PHYS_DESC_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=PHYSICAL_DESC&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = PHYS_DESC_FIELD;
});

$("#SEARCH_DATE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=DATE_SEARCH&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = SEARCH_DATE_FIELD;
});

$("#LEVEL_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=LEVEL_DESC&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = LEVEL_FIELD;
});

$("#FINDAID_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=FINDAIDLINK&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = FINDAID_FIELD;
});
$("#BARCODE_DESC_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=BARCODE_ID&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = BARCODE_DESC_FIELD;
});
$("#SUBJECT_DESC_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=SUBJECT&DATABASE=DESCRIPTION_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = SUBJECT_DESC_FIELD;
});

// COLLECTIONS
$("#AN_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=ACCESSION_NUMBER&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = AN_FIELD;
});

$("#LEGAL_TITLE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=LEGAL_TITLE&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = LEGAL_TITLE_FIELD;
});

$("#OBJ_DESC_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=OBJ_DESCRIPTION&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = OBJ_DESC_FIELD;
});

$("#OBJ_TYPE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=OBJECT_TYPE&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = OBJ_TYPE_FIELD;
});

$("#SUB_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=SUB_KEYWORD&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = SUB_KEYWORD_FIELD;
});

$("#EARLY_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=EARLY&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = EARLY_FIELD;
});

$("#MAKER_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=MAKER_FULLNAME&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = MAKER_FULLNAME_FIELD;
});

$("#MAKER_ORG_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=MAKER_ORG&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = MAKE_ORG_FIELD;
});

$("#MEDIUM_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=MEDIUM&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = MEDIUM_FIELD;
});
$("#MATERIAL_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=MATERIAL_COO&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = MATERIAL_FIELD;
});

$("#BUILDING_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=BUILDING&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = BUILDING_FIELD;
});


$("#OBJ_NAME_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=OBJECT_NAME&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = OBJECT_NAME_FIELD;
});

$("#PRIMARY_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=PRIMARY&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = PRIMARY_FIELD;
});

$("#OBJ_STATUS_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=OBJECT_STATUS&DATABASE=COLLECTIONS_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = OBJECT_STATUS_FIELD;
});


// LIBRARY 

$("#ALL_TITLE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=ALL_TITLE_WORD&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = ALL_TITLE_FIELD;
});

$("#AUTHOR_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=AUTHOR_WORD&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = AUTHOR_FIELD;
});

$("#LIB_PUB_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=LIB_PUB_CL&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = LIB_PUB_FIELD;
});
$("#ISBN_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=020_A&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = ISBN_FIELD;
});
$("#ISSN_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=022_A&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = ISSN_FIELD;
});
$("#SUBJECT_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=SUBJECT_WORD&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = SUBJECT_FIELD;
});
$("#CIT_REF_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=511_A&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = CIT_REF_FIELD;
});

$("#MEDIA_TYPE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=MEDIA_TYPE&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = MEDIA_TYPE_FIELD;
});

$("#MAT_TYPE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=I_COLLECT_CODE&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = MAT_TYPE_FIELD;
});

$("#HOLD_CENTRE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=HOLDING_CENTRE&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HOLD_CENTRE_FIELD;
});

$("#BARCODE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=BARCODE&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = BARCODE_FIELD;
});

$("#RECORD_ID_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=001&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = RECORD_ID_FIELD;
});

$("#ITEM_CALL_NUMBER").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=ITEM_CALL_NUMBER&DATABASE=BIBLIO_WEB&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = RECORD_ID_FIELD;
});




// PEOPLE_VAL_SYN
$("#FULLNAME3").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=FULLNAME3&DATABASE=PEOPLE_VAL_SYN&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = FULLNAME3_FIELD;
});

// ORGANIZATION_VAL_SYN
$("#ORG_MAIN_BODY").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=ORG_MAIN_BODY&DATABASE=ORGANIZATION_VAL_SYN&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = ORG_MAIN_BODY_FIELD;
});


//PEOPLE_VAL_SYN & ORGANIZATION_VAL_SYN ADVANCED SEARCH

$("#KEYWORDS_PEOPLE").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=KEYWORDS&DATABASE=PEOPLE_VAL_SYN&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = KEYWORDS_PEOPLE_FIELD;
});

$("#KEYNAMES_PEOPLE").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=KEYNAMES&DATABASE=PEOPLE_VAL_SYN&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = KEYNAMES_PEOPLE_FIELD;
});

// $("#P_AUTH_TYPE").on("click", function() {
//   var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=P_AUTH_TYPE&DATABASE=PEOPLE_VAL_SYN&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
//   load_index_page ( url );
//   clustername = P_AUTH_TYPE_FIELD;
// });


$("#KEYWORDS").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=KEYWORDS&DATABASE=ORGANIZATION_VAL_SYN&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = KEYWORDS_FIELD;
});

$("#KEYNAMES").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=KEYNAMES&DATABASE=ORGANIZATION_VAL_SYN&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = KEYNAMES_FIELD;
});

// $("#VENDER_ROLE").on("click", function() {
//   var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=VENDER_ROLE&DATABASE=ORGANIZATION_VAL_SYN&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
//   load_index_page ( url );
//   clustername = VENDER_ROLE_FIELD;
// });

$("#DATES_EXISTED").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=DATES_EXISTED&DATABASE=ORGANIZATION_VAL_SYN&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = DATES_EXISTED_FIELD;
});


// HAWKE

$("#SURNAME_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=SURNAME&DATABASE=HAWKE&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HAWKE_SURNAME;
});
$("#GIVENNAME_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=GIVENNAME&DATABASE=HAWKE&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HAWKE_GIVENNAME;
});
$("#NATION_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=NATION&DATABASE=HAWKE&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HAWKE_NATION;
});
$("#TRADEWHOLE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=TRADEWHOLE&DATABASE=HAWKE&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HAWKE_TRADEWHOLE;
});
$("#SHIPWHOLE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=SHIPWHOLE&DATABASE=HAWKE&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HAWKE_SHIPWHOLE;
});
$("#DESTWHOLE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=DESTWHOLE&DATABASE=HAWKE&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HAWKE_DESTWHOLE;
});
$("#YEAR_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=YEAR&DATABASE=HAWKE&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HAWKE_YEAR;
});


// AOHEIRS
$("#HD_SURNAME_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=HD_SURNAME&DATABASE=AOHEIRS&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HEIRS_HD_SURNAME;
});
$("#HD_FIRSTNAME_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=HD_FIRSTNAME&DATABASE=AOHEIRS&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HEIRS_HD_FIRSTNAME;
});
$("#HD_PLACE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=HD_PLACE&DATABASE=AOHEIRS&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HEIRS_HD_PLACE;
});
$("#HD_DATE_CL").on("click", function() {
    var url = HOME_SESSID + "/FIRST?INDEXLIST&KEYNAME=HD_DATE&DATABASE=AOHEIRS&form=[ao_opac]/145/assets/%2fhtml%2findex-body.html&TITLE=Browse%20values";
    load_index_page(url);
    clustername = HEIRS_HD_DATE;
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
        case REFD_HIGHER_FIELD:
            jquery_input = $("input[name=REFD_HIGHER_CL]");
            break;
        case TITLE_FIELD:
            jquery_input = $("input[name=TITLE_CL]");
            break;
        case SCOPE_FIELD:
            jquery_input = $("input[name=SCOPE_CL]");
            break;
        case ORIGINATOR_FIELD:
            jquery_input = $("input[name=ORIGIN_CL]");
            break;
        case ASSO_ORG_FIELD:
            jquery_input = $("input[name=ASSO_ORG_CL]");
            break;
        case LEVEL_FIELD:
            jquery_input = $("input[name=LEVEL_CL]");
            break;
        case SEARCH_DATE_FIELD:
            jquery_input = $("input[name=SEARCH_DATE_CL]");
            break;
        case PHYS_DESC_FIELD:
            jquery_input = $("input[name=PHYS_DESC_CL]");
            break;
        case FINDAID_FIELD:
            jquery_input = $("input[name=FINDAID_CL]");
            break;
        case BARCODE_DESC_FIELD:
            jquery_input = $("input[name=BARCODE_DESC_CL]");
            break;
        case SUBJECT_DESC_FIELD:
            jquery_input = $("input[name=SUBJECT_DESC_CL]");
            break;

            // COLLECTIONS
        case AN_FIELD:
            jquery_input = $("input[name=ACCESSION_NUMBER]");
            break;
        case LEGAL_TITLE_FIELD:
            jquery_input = $("input[name=LEGAL_TITLE]");
            break;
        case OBJ_DESC_FIELD:
            jquery_input = $("input[name=OBJ_DESCRIPTION]");
            break;
        case OBJ_TYPE_FIELD:
            jquery_input = $("input[name=OBJECT_TYPE]");
            break;
        case SUB_KEYWORD_FIELD:
            jquery_input = $("input[name=SUB_KEYWORD]");
            break;
        case EARLY_FIELD:
            jquery_input = $("input[name=EARLY]");
            break;
        case MAKER_FULLNAME_FIELD:
            jquery_input = $("input[name=MAKER_FULLNAME]");
            break;
        case MAKE_ORG_FIELD:
            jquery_input = $("input[name=MAKER_ORG]");
            break;
        case MEDIUM_FIELD:
            jquery_input = $("input[name=MEDIUM]");
            break;
        case MATERIAL_FIELD:
            jquery_input = $("input[name=MATERIAL_COO]");
            break;
        case OBJECT_NAME_FIELD:
            jquery_input = $("input[name=OBJ_NAME_CL]");
            break;
        case PRIMARY_FIELD:
            jquery_input = $("input[name=PRIMARY_CL]");
            break;
        case BUILDING_FIELD:
            jquery_input = $("input[name=BUILDING]");
            break;
        case OBJECT_STATUS_FIELD:
            jquery_input = $("input[name=OBJECT_STATUS]");
            break;

            // LIBRARY
        case ALL_TITLE_FIELD:
            jquery_input = $("input[name=ALL_TITLE_CL]");
            break;
        case AUTHOR_FIELD:
            jquery_input = $("input[name=AUTHOR_CL]");
            break;
        case LIB_PUB_FIELD:
            jquery_input = $("input[name=LIB_PUB_CL]");
            break;
        case SUBJECT_FIELD:
            jquery_input = $("input[name=SUBJECT_CL]");
            break;
        case SERIES_FIELD:
            jquery_input = $("input[name=SERIES_CL]");
            break;
        case ISBN_FIELD:
            jquery_input = $("input[name=ISBN_CL]");
            break;
        case ISSN_FIELD:
            jquery_input = $("input[name=ISSN_CL]");
            break;
        case CIT_REF_FIELD:
            jquery_input = $("input[name=CIT_REF_CL]");
            break;
        case MEDIA_TYPE_FIELD:
            jquery_input = $("input[name=MEDIA_TYPE_CL]");
            break;
        case MAT_TYPE_FIELD:
            jquery_input = $("input[name=MAT_TYPE_CL]");
            break;
        case HOLD_CENTRE_FIELD:
            jquery_input = $("input[name=HOLD_CENTRE_CL]");
            break;
        case BARCODE_FIELD:
            jquery_input = $("input[name=BARCODE_CL]");
            break;
        case RECORD_ID_FIELD:
            jquery_input = $("input[name=RECORD_ID_CL]");
            break;

            // PEOPLE_VAL
        case FULLNAME3_FIELD:
            jquery_input = $("input[name=FULLNAME3]");
            break;
        case ORG_MAIN_BODY_FIELD:
            jquery_input = $("input[name=ORG_MAIN_BODY]");
            break;

            // PEOPLE_VAL ADVANCED SEARCH
        case KEYWORDS_PEOPLE_FIELD:
            jquery_input = $("input[name=KEYWORDS]");
            break;
        case KEYNAMES_PEOPLE_FIELD:
            jquery_input = $("input[name=KEYNAMES]");
            break;
            // case P_AUTH_TYPE:
            //   jquery_input = $("input[name=P_AUTH_TYPE]");
            //   break;


            // ORGANIZATION_VAL_SYN ADVANCED SEARCH
        case KEYWORDS_FIELD:
            jquery_input = $("input[name=KEYWORDS]");
            break;
        case KEYNAMES_FIELD:
            jquery_input = $("input[name=KEYNAMES]");
            break;
            // case VENDER_ROLES:
            //   jquery_input = $("input[name=VENDOR_ROLES]");
            //   break;
        case DATES_EXISTED_FIELD:
            jquery_input = $("input[name=DATES_EXISTED]");
            break;


            // HAWKE
        case HAWKE_SURNAME:
            jquery_input = $("input[name=SURNAME]");
            break;
        case HAWKE_GIVENNAME:
            jquery_input = $("input[name=GIVENNAME]");
            break;
        case HAWKE_NATION:
            jquery_input = $("input[name=NATION]");
            break;
        case HAWKE_TRADEWHOLE:
            jquery_input = $("input[name=TRADEWHOLE]");
            break;
        case HAWKE_SHIPWHOLE:
            jquery_input = $("input[name=SHIPWHOLE]");
            break;
        case HAWKE_DESTWHOLE:
            jquery_input = $("input[name=DESTWHOLE]");
            break;
        case HAWKE_YEAR:
            jquery_input = $("input[name=YEAR]");
            break;

            // AOHEIRS
        case HEIRS_HD_SURNAME:
            jquery_input = $("input[name=HD_SURNAME]");
            break;
        case HEIRS_HD_FIRSTNAME:
            jquery_input = $("input[name=HD_FIRSTNAME]");
            break;
        case HEIRS_HD_PLACE:
            jquery_input = $("input[name=HD_PLACE]");
            break;
        case HEIRS_HD_DATE:
            jquery_input = $("input[name=HD_DATE]");
            break;

    }




    if (jquery_input != null) {
        var jquery_select = $("#search-value option:selected");
        if (jquery_select != null) {
            selected_value = jquery_select.val();
        }
        if (typeof selected_value == 'undefined' || selected_value == "") {
            alert("[--No value is selected--]");
        } else {
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
    if (url != "#") {
        load_index_page(url);
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
        success: function(data) {
            if (data != "") {
                document.getElementById(CLUSTER_BODY_ID).innerHTML = data;
            } else {
                alert("Clé de recherche introuvable");
            }
        },
        error: function(xhr, status, error) {
            alert("Impossible de trouver la clé de recherche");
        }
    });
}

$("#listSearch").keypress(
    function(event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    });


if (document.getElementById('cluster-body')) {
    $('#listSearch').attr('placeholder', '')
}