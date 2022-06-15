$(document).ready(function(){
    
    let countImg = 1, countDoc = 1, countAud = 1, countVid = 1;
    let countImg2 = 1, countDoc2 = 1, countAud2 = 1, countVid2 = 1;
    let countMarcBtn = 1, countMarcXML = 1, countMarcModal = 1;
    if($(".Detail-Container").length === 0) {
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
    // Remove minisis search cluster
    $("div#search-statement").html($("div#search-statement").html().replace(/KEYWORD_CLUSTER |TITLE_CL |SCOPE_CL |DATE_CL |REFD_CL |ORIGINATOR_CL |PHYSICAL_DESC_CL |FORMATS_CL |SUBJECT_CL |RELATED_MAT_CL /g,''));

    
    // Truncate any fields in records that exceeds over a certain character amount
    var truncateTitle = document.querySelectorAll('.Record-Title b a');

    for(var i = 0; i < truncateTitle.length; i++){
        if(truncateTitle[i].innerText.length > 75){
            truncateTitle[i].innerText = truncateTitle[i].innerText.substring(0,75)+ "...";
        }
    }



   
}); // document end

const checkMedia = () => {
    let x  = document.getElementsByClassName('media-container');

    for (let i = 0; i < x.length; i++) {
        let iconSet1 = x[i].children[2].children[0].children.length;
        let iconSet2 = x[i].children[2].children[1].children.length;
        let iconSets =  iconSet1 + iconSet2;

        if (iconSets === 0)  x[i].style.display = "none";
        
    }
}




