
/* * * * * * * * * * * * *
 * *                   * *
 * *   Document Ready  * *
 * *                   * *
 * * * * * * * * * * * * */
$(document).ready(function() {

    // Detail Bookmark
    // When Clicked ajax sends href to minisis to add selected record to list.
    // Once success, reload the page. Report Checks whether record is in the list or not
    $('.bookmarkbutton').on('click',function() {
        $.ajax({
        type: "GET",
        url:$(this).attr('href'),
        success:function() {
            location.reload();
        }
        });
    });



    $("button.colorbox-detail").click(function(e) {
        let evt = e;
        // $(this).parent().parent().find(".cs-item-sisn");

        var test1 = $(this).parent().parent().find(".cs-item-id");
        var test2 = $(this).parent().parent().find(".cs-item-src");
        var test3 = client_name;

        $.colorbox({
            iframe:true,
            transition: "elastic",
            width:"1200px",
            height:"780px",
            overlayClose: true,
            href:HOME_SESSID + "?addsinglerecord&database=COMMENTS_VIEW&de_form=[AO_ASSETS]html/crowdSourceEntry.html&new=y",
            onLoad: function() {


                let csitemSISN = document.getElementsByClassName("cs-item-sisn");
                let csitemSRC = document.getElementsByClassName("cs-item-src");
                let csitemID = document.getElementsByClassName("cs-item-id"); // F 23-G,

                console.log(evt);
                console.log(evt.target.id);

                $tmp_data = test1.text(); // F 26 G
                $tmp_data2 = test2.text(); // DESCRIPTION COLLECTION LIBRARY
                $tmp_data3 = test3;
                $tmp_data4 = client_id;

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

});