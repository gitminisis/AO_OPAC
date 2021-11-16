

$(document).ready(function(){
    $("button.colorbox").click(function(e) {
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

    // $("#cpa-form").submit(function(e){
    //     return false;
    // });
    //onchange="this.form.submit()"
    // Summary Bookmark

    var count = false;
    
    $('.bookmark-btn').on('click',function() {
        if (count == false){
            count = true;
            console.log("success")
        $.ajax({
        type: "POST",
        url:$(".web_sum_form").attr('data-action'),
        data:$(this).find("input").attr('name') + "=" + $(this).find("input").attr('value'),
        }).done(function(){
            location.reload();
        });
    }

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

});

const checkMedia = () => {
    let x  = document.getElementsByClassName('media-container');
    for (let i = 0; i < x.length; i++) {
        let iconSet1 = x[i].children[2].children[0].children.length;
        let iconSet2 = x[i].children[2].children[1].children.length;
        let iconSets =  iconSet1 + iconSet2;

        console.log(iconSets)

        if (iconSets === 0)
            x[i].style.display = 'none';
    }
}




