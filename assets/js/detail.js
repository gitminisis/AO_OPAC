
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

    // $('#test-slick').slick({
    //     dots: false,
    //     arrows: true,
    //     fade: true,
    //     speed: 500,
        
    //     nextArrow:
    //       '<button class="slick-next btn bt-default"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
    //     prevArrow:
    //       '<button class="slick-prev btn bt-default"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
    //   });

    $("button.colorbox-detail").click(function(e) {
        let evt = e;
        // $(this).parent().parent().find(".cs-item-sisn");

        var test1 = $(this).parent().parent().find(".cs-item-id");
        var test2 = $(this).parent().parent().find(".cs-item-src");
        var test3 = client_name;
        
        // console.log('this from detail')
        $.colorbox({
            iframe:true,
            transition: "elastic",
            width:"70%",
            // width:"95%",
            height:"85%",
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


    // Copyright Form Button Click
    $("button.colorbox-copyright").click(function(e) {
        let evt = e;
        // $(this).parent().parent().find(".cs-item-sisn");

        var accession = $(this).parent().parent().find(".cs-item-id");
        var reqSource = $(this).parent().parent().find(".cs-item-src");
        var title = $(this).parent().parent().find(".cs-item-title");
        
        var topicCheck = "copyrightServices";
        


        $.colorbox({
            iframe:true,
            transition: "elastic",
            width:"1200px",
            height:"780px",
            overlayClose: true,
            href:HOME_SESSID + "?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/copyright.html&new=y",
            onLoad: function() {

                // console.log(evt);
                // console.log(evt.target.id);
                

                $tmp_data = accession.text(); // ACCESSION NUMBER --- F 26 G
                $tmp_data2 = reqSource.text(); // REQ_SOURCE DESCRIPTION COLLECTION LIBRARY
                $tmp_data3 = title.text(); // LEGAL_TITLE -- Story Book Woman

                $tmp_topic = topicCheck;
             

            },
            onComplete: function() {
                
                
            },
            onClose: function() {
                delete $tmp_data; // accession
                delete $tmp_data2; // reqSource
                delete $tmp_data3; // title

                delete $tmp_topic;

           }

        });
    });


    $("button.colorbox-reproduction").click(function(e) {
        let evt = e;
        // $(this).parent().parent().find(".cs-item-sisn");

        var accession = $(this).parent().parent().find(".cs-item-id");
        var reqSource = $(this).parent().parent().find(".cs-item-src");
        var title = $(this).parent().parent().find(".cs-item-title");
        var topicCheck = "reproductions";


        $.colorbox({
            iframe:true,
            transition: "elastic",
            width:"1200px",
            height:"780px",
            overlayClose: true,
            href:HOME_SESSID + "?addsinglerecord&database=REQUEST_VIEW&de_form=[AO_ASSETS]html/reproductionCertification.html&new=y",
            onLoad: function() {

                // console.log(evt);
                // console.log(evt.target.id);
                

                $tmp_data = accession.text(); // ACCESSION NUMBER --- F 26 G
                $tmp_data2 = reqSource.text(); // REQ_SOURCE DESCRIPTION COLLECTION LIBRARY
                $tmp_data3 = title.text(); // LEGAL_TITLE -- Story Book Woman

                $tmp_topic = topicCheck;
              

            },
            onComplete: function() {
                //$("#test_btn").click();
                
            },
            onClose: function() {
                delete $tmp_data;
                delete $tmp_data2;
                delete $tmp_data3;

                delete $tmp_topic;

           }

        });
    });


    showSingleImage();

});

$("#crowd-source-comment").on("load", function(){
    let iframe = document.getElementById('crowd-source-comment');
    let doc = document.getElementById('crowd-source-comment').contentWindow.document;
    let arr = doc.getElementsByClassName('comment-container')

    if (arr.length === 0)
        iframe.style.display = 'none';
    // let h3 = iframe.contentWindow.document.getElementsByTagName("H3")[0];
    
    // let isComment = h3.innerHTML !== null ? false : true;
    
    // if (!isComment)
    // iframe.style.display = 'none';
    
});

const showSingleImage = () => {
    let arr = document.getElementsByClassName('img-container');
    if (arr.length > 1) {
        for (let i = 1; i < arr.length; i++)
        {
            arr[i].style.display = 'none';
        }
    }
}

// Initialise Carousel
const mainCarousel = new Carousel(document.querySelector("#mainCarousel"), {
    Dots: false,
  });
  
  // Thumbnails
  const thumbCarousel = new Carousel(document.querySelector("#thumbCarousel"), {
    Sync: {
      target: mainCarousel,
      friction: 0,
    },
    Dots: false,
    Navigation: false,
    center: true,
    slidesPerPage: 1,
    infinite: false,
  });
  
  // Customize Fancybox
  Fancybox.bind('[data-fancybox="gallery"]', {
    Carousel: {
      on: {
        change: (that) => {
          mainCarousel.slideTo(mainCarousel.findPageForSlide(that.page), {
            friction: 0,
          });
        },
      },
    },
  });
