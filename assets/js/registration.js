$(document).ready(function () {

    var prev_page_sibling = null;
    var prev_status_sibling = null;
    var next_page_sibling = null;
    var next_status_sibling = null;

    $(".next").click(function () {
        //var activePage = $("div.active");        

        $(".page").each(function () {
            if ($(this).attr('class').split(' ').slice(-1) == "active" && requiredFieldsCompleted(this)) {

                var page = this;
                next_page_sibling = $(page).next()[0];
                if (next_page_sibling != null) {
                    $(page).removeClass("active");

                    $(page).hide("slide", { direction: "left" }, 500, function () {
                        $(next_page_sibling).show("slide", { direction: "right" }, 750);
                    });

                    $("#status li").each(function () {
                        if ($(this).attr('class') == "active") {
                            $(this).removeClass("active");
                            next_status_sibling = $(this).next()[0];
                        }
                    });
                }
            }
        });

        if (next_page_sibling != null) {
            $(next_page_sibling).addClass("active");
        }
        if (next_status_sibling != null) {
            $(next_status_sibling).addClass("active");
        }

    });

    $(".prev").click(function () {
        $(".page").each(function () {
            if ($(this).attr('class').split(' ').slice(-1) == "active") {

                var page = this;
                prev_page_sibling = $(page).prev()[0];
                if (prev_page_sibling != null) {
                    $(page).removeClass("active");

                    $(page).hide("slide", { direction: "right" }, 500, function () {
                        $(prev_page_sibling).show("slide", { direction: "left" }, 750);
                    });

                    $("#status li").each(function () {
                        if ($(this).attr('class') == "active") {
                            $(this).removeClass("active");
                            prev_status_sibling = $(this).prev()[0];
                        }
                    });

                }
            }

        });

        if (prev_page_sibling != null) {
            $(prev_page_sibling).addClass("active");
        }

        if (prev_status_sibling != null) {
            $(prev_status_sibling).addClass("active");
        }

    });

});


// Check that required fields have been filled
function requiredFieldsCompleted(element) {
    var returnValue = true;

    var children = $(element).find(".required");

    $(children).each(function () {
        var input = $(this).find(".text")[0];

        if (input != undefined && input != null && input.value == "") {
            returnValue = false;
            $(input).css("border-color", "red");
        }
        else if (input != undefined && input != null && input.value != "") {
            $(input).css("border-color", "#CCCCCC");
        }

    });

    if (returnValue == false) {
        $("#drawer").slideDown();
    }
    else {
        $("#drawer").slideUp();
    }
    return returnValue;
}

function Set_Other_Value() {
    document.form1.C_RES_PURPOSE1.checked = false;
    document.form1.C_RES_PURPOSE2.checked = false;
    document.form1.C_RES_PURPOSE3.checked = false;
    document.form1.C_RES_PURPOSE4.checked = false;
    document.form1.C_RES_PURPOSE5.checked = false;
    document.form1.other.disabled = false;
}
function Set_Other_Value2() {
    if (document.form1.C_RES_SUBJECT8.checked == true) {
        document.form1.other2.disabled = false;
    } else {
        document.form1.other2.disabled = true;
        document.form1.other2.value = "";
    }
}

function Disable_Other_Value() {
    document.form1.other.value = "";
    document.form1.other.disabled = true;
}