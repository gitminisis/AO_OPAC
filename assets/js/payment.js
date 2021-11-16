// An enum representing the indexes of desired nodes of an HTMLCOLLECTION object for a <tr> element 
// (if you look at the HTMLCOLLECTION object you will see that every over index/property is filled with empty-string text)
let ReproEnum = {
    MERCHANTNUM: 1,
    PRODID:      3,
    TOPIC:       5,
    TITLE:       7,
    AMOUNT:      11,
    TAX:         17,
    HANDLING:    19
}

class Payment {
    #privatePaymentItem;

    constructor(node){
        this.#privatePaymentItem = node;
    }

    initClientSidePayment = () => {
        let trNodes  = this.#privateGetReproductionRowValues(this.#privatePaymentItem);
        let payNodes = this.#privateGetPayNodes();
        this.#privateSetForm(trNodes, payNodes); 
    }
    
    /* 
        This functions takes in a HTML Node and gets the values needed to
        prepopulate a payment form
    
        @params { node }       a JSON object (HTMLCOLLECTION Object)
        @return { formValues } a JSON object
    */
    #privateGetReproductionRowValues = (node) => {
        let formValues = {};
        let childNodes = node.childNodes;

        
        formValues.patronId    = patron_id.split(']')[1];
        formValues.merchantNum = childNodes[ReproEnum.MERCHANTNUM].innerText;
        formValues.locale      = document.getElementsByTagName('html')[0].getAttribute('Lang');;
        formValues.prodId      = childNodes[ReproEnum.PRODID].innerText;
        formValues.topic       = childNodes[ReproEnum.TOPIC].innerText;
        formValues.title       = childNodes[ReproEnum.TITLE].innerText;
        formValues.amt         = childNodes[ReproEnum.AMOUNT].innerText;
        formValues.tax         =childNodes[ReproEnum.TAX].innerText;
        formValues.handling         =childNodes[ReproEnum.HANDLING].innerText;
        formValues.successUrl  = undefined;
        formValues.cancelUrl   = undefined;
    
    
        return formValues;        
    }
    
    /*  
        This function takes in an object containting values for the payment form
        @param { formValues } a JSON object
        @param { payNodes }   a JSON object
    */
    #privateSetForm = (formValues, payNodes) => {

        payNodes.patronId.innerText = formValues.patronId;
        payNodes.merchantNum.innerText = formValues.merchantNum;
        payNodes.prodId.innerText = formValues.prodId;
        payNodes.topic.innerText = formValues.topic;
        payNodes.title.innerText = formValues.title;
        payNodes.amt.innerText = formValues.amt;
        payNodes.tax.innerText = formValues.tax;
        payNodes.handling.innerText = formValues.handling;
    }
    
    /*
        This function gets the HTML nodes for the colorbox payform and return it as a JSON.
    
        @returns { JSON } a JSON object
    */
    #privateGetPayNodes = () => {
        let patronId = document.getElementById('Pay-Client-Id');
        let merchantNum = document.getElementById('Pay-Merchant-Num');
        let prodId = document.getElementById('Pay-Product-Id');
        let topic = document.getElementById('Pay-Product-Topic');
        let title = document.getElementById('Pay-Product-Title');
        let amt = document.getElementById('Pay-Amount');
        let tax = document.getElementById('Pay-Tax');
        let handling = document.getElementById('Pay-Handling');

    
        return { patronId, merchantNum, prodId, topic, title, amt, tax, handling };
    }

}

const requestOrder = () => {
    // let formData = new FormData();
    
    let patronId = document.getElementById('Pay-Client-Id').innerText;
    let merchantNum = document.getElementById('Pay-Merchant-Num').innerText;
    // let prodId = document.getElementById('Pay-Product-Id').innerText;
    // let topic = document.getElementById('Pay-Product-Topic').innerText;
    // let title = document.getElementById('Pay-Product-Title').innerText;
    let amt = document.getElementById('Pay-Amount').innerText;
    // let tax = document.getElementById('Pay-Tax').innerText;
    // let handling = document.getElementById('Pay-Handling').innerText;

    let myData = 
    {
        "req_order_num": merchantNum,
        "req_patron_id": patronId,
        "pay_amount": amt,
        "success_url": "https://aoopac.minisisinc.com/assets/html/paymentSuccess.html?req_order_num=${merchantNum}",
        "cancel_url": "https://aoopac.minisisinc.com/assets/html/paymentCancel.html?req_order_num=${merchantNum}",
        "locale": "en"
    }


    fetch('https://aopay.minisisinc.com/api/initPay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application.json'
        },
        body: JSON.stringify(myData)
    })
    .then  (res => res.json())
    .then  (data => { console.log('Success:', data) })
    .catch (err => { console.error(`Error: ${err}`) })

}

