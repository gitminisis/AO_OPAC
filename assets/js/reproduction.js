$(document).ready(function() {

    let reproductionPage = document.getElementsByClassName('Reproduction')[0];

    if (reproductionPage !== null)
        giveAttributePaymentButton();

})

const giveAttributePaymentButton = () => 
{
    let counter = 0;
    let enqTds = [...document.getElementsByClassName('enq-payment')];
    enqTds.shift();

    let paymentBtns = enqTds.forEach( td => 
        {   
            td.children[0].setAttribute('id', `pay-button-${counter + 1}`)
            counter += 1; 
        });
}

const payBtnClick = async (evt) => {
    let trElement = evt.parentNode.parentNode;

    // Create a new Payment Item specifically for the <tr> element representing a reproduction
    // record for payment.
    let PaymentItem = new Payment(trElement);  
    $.colorbox({
        // iframe:true,
        transition: "elastic",
        width:"1200px",
        height:"780px",
        overlayClose: true,
<<<<<<< HEAD
        href:`https://test.aims.archives.gov.on.ca/scripts/mwimain.dll/${sessionId}?GET&FILE=[AO_ASSETS]html/payment.html`,
=======
        href:`https://aims.archives.gov.on.ca/scripts/mwimain.dll/${sessionId}?GET&FILE=[AO_ASSETS]html/payment.html`,
>>>>>>> 08dbde68d64df01cdb7fd31cb451ee6a4eef3128
        onLoad:  function(evt) {
            // Nothing to do here yet
       },
        onComplete: function() {
            PaymentItem.initClientSidePayment();
        },
        onClose: function() {
            console.log('something leaves here');
        }

    });

}




