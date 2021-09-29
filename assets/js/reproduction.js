$(document).ready(function() {

    let reproductionPage = document.getElementsByClassName('Reproduction')[0];

    if (reproductionPage)
    {
        giveAttributePaymentButton();
    }

})

const giveAttributePaymentButton = () => 
{
    console.log('init stuff')
    let counter = 0;
    let enqTds = [...document.getElementsByClassName('enq-payment')];
    enqTds.shift();

    let paymentBtns = enqTds.forEach( td => 
        {   
            td.children[0].setAttribute('id', `pay-button-${counter + 1}`)
            counter += 1; 
        });
}

const payBtnClick = (evt) => {
    console.log(evt);


    $.colorbox({
        // iframe:true,
        transition: "elastic",
        width:"1200px",
        height:"780px",
        overlayClose: true,
        href:"https://aoopac.minisisinc.com/scripts/mwimain.dll/113296019?GET&FILE=[AO_ASSETS]html/payment.html",
        onLoad: function() {
            console.log('something goes here')
        },
        onComplete: function() {
            //$("#test_btn").click();
        },
        onClose: function() {
            console.log('something leaves here')
        }

    });

}