window.onload = () => {
    setpayCss(); // temporary measure for proof of concept

    if (document.getElementById('cancel-page'))
        cancelLast();
    else if (document.getElementById('receipt-page')) {
        console.log('setting partial paid')
        setPartialPaid();
    }
}

// An enum representing the indexes of desired nodes of an HTMLCOLLECTION object for a <tr> element 
// (if you look at the HTMLCOLLECTION object you will see that every over index/property is filled with empty-string text)
let ReproEnum = {
    MERCHANTNUM: 1,
    PRODID: 3,
    TOPIC: 5,
    TITLE: 7,
    AMOUNT: 11,
    TAX: 17,
    HANDLING: 19,
    CHARGE: 21
}

class Payment {
    #privatePaymentItem;

    constructor(node) {
        this.#privatePaymentItem = node;
    }

    initClientSidePayment = () => {
        let trNodes = this.#privateGetReproductionRowValues(this.#privatePaymentItem);
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

        console.log(childNodes)

        formValues.patronId = patron_id.split(']')[1];
        formValues.merchantNum = childNodes[ReproEnum.MERCHANTNUM].innerText;
        formValues.locale = document.getElementsByTagName('html')[0].getAttribute('Lang');;
        formValues.prodId = childNodes[ReproEnum.PRODID].innerText;
        formValues.topic = childNodes[ReproEnum.TOPIC].innerText;
        formValues.title = childNodes[ReproEnum.TITLE].innerText;
        formValues.amt = childNodes[ReproEnum.AMOUNT].innerText;
        formValues.tax = childNodes[ReproEnum.TAX].innerText;
        formValues.handling = childNodes[ReproEnum.HANDLING].innerText;
        formValues.charge = childNodes[ReproEnum.CHARGE].innerText;
        formValues.successUrl = undefined;
        formValues.cancelUrl = undefined;


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
        payNodes.tax.innerText = `$${formValues.tax}`;
        payNodes.handling.innerText = `$${formValues.handling}`;
        payNodes.charge.innerText = `$${formValues.charge}`;
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
        let charge = document.getElementById('Pay-Charge');


        return { patronId, merchantNum, prodId, topic, title, amt, tax, handling, charge };
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

    // AOPay expected POST data for InitPay
    let myData = {
        "req_order_num": merchantNum,
        "req_patron_id": patronId,
        "pay_amount": amt.replace('$', '').toString(),
        "success_url": `https://aims.archives.gov.on.ca/scripts/mwimain.dll/144/PAYMENT_VIEW/WEB_PAY_RCPT_DET/REQ_ORDER_NUM ${merchantNum}?COMMANDSEARCH&sess=${sessionId}`,
        "cancel_url": `https://aims.archives.gov.on.ca/scripts/mwimain.dll/144/PAYMENT_VIEW/WEB_PAY_CANCEL_DET/REQ_ORDER_NUM ${merchantNum}?COMMANDSEARCH&sess=${sessionId}`,
        "locale": "en",
        testLevel: 1
    }

    console.log(myData)

    reqInitPay(myData);

}

const reqInitPay = (myData) => {

    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 3000);


    fetch('https://aimsaoccpay.minisisinc.com/api/initPay', {
            method: 'POST',
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application.json'
            },
            body: JSON.stringify(myData)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Success:', data)
            window.location = data.redirect_url;
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
                reqInitPay(myData)
            } else console.error(`Error: ${err}`)
        })
}

/*
    Function sets rel stylesheet in the head of the DOM
*/
const setpayCss = () => {
    let head = document.getElementsByTagName('head');
    let paymentLink = document.createElement('link');

    paymentLink.setAttribute('href', '/assets/css/payment.css');
    paymentLink.setAttribute('rel', 'stylesheet');

    head[0].append(paymentLink);
}

/*
    Function begins process of clientside payment settlement.
*/
const completePayment = async() => {
    console.log('starting payment completion')
    let orderNum = document.getElementById('req-order-num').innerHTML

    settlePay(orderNum); // Settle the payment with CCPAY
}


/*
    Functions sends a POST requestion to call SettleLast endpoint which in turn calls CCPAY API 
    to settle the payment transaction.

    SettleLast endpoint returns the data of the last settle call made to CCPay API 
*/
const settlePay = (orderNum) => {

    console.log('settling payment')

    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 3000);

    // AOPay expected POST data for SettleLast
    let postData = {
        req_order_num: orderNum
    }

    fetch('https://aimsaoccpay.minisisinc.com/api/SettleLast', {
            method: 'POST',
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            queryLast(orderNum)
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
                settlePay(orderNum)
            } else throw new Error(`HTTP error! status: ${err}`)
        })

}

const setFields = (orderNum, authCode, authTime, card, name) => {

    console.log('setting record fields')
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 3000);

    // AOPay expected POST data for SetFields
    let postData = {
        req_order_num: orderNum,
        gwy_auth_code: authCode,
        gwy_auth_time: authTime,
        maskedCard: card,
        nameOnCard: name
    }

    console.log(JSON.stringify(postData))

    fetch('https://aimsaoccpay.minisisinc.com/api/SetFields', {
            method: 'POST',
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(data => {
            console.log("Finished setting fields")
            console.log(data)
            successRedirectToProfile(orderNum)
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
                setFields = (orderNum, authCode, authTime, card, name)
            } else throw new Error(`HTTP error! status: ${err}`)
        })

}

const queryLast = (orderNum) => {

    console.log('querying last')

    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 3000);

    // AOPay expected POST data for QueryLast
    let postData = {
        req_order_num: orderNum
    }

    fetch('https://aimsaoccpay.minisisinc.com/api/QueryLast', {
            method: 'POST',
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let code = data.gwy_auth_code;
            let time = data.gwy_auth_time;
            let card = data.maskedCard;
            let name = data.nameOnCard;
            setFields(orderNum, code, time, card, name);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
                queryLast(orderNum)
            } else throw new Error(`HTTP error! status: ${err}`)
        })
}



const cancelLast = () => {
    console.log('getting cancel information');

    let orderNum = document.getElementById('req-order-num').innerHTML
    let postData = {
        req_order_num: orderNum
    }

    fetch('https://aimsaoccpay.minisisinc.com/api/CancelLast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => { throw new Error(`HTTP error! status: ${err}`) })
}

const setPartialPaid = () => {

    console.log('partial paid reporting in')

    let orderNum = document.getElementById('req-order-num').innerHTML;
    let amt = document.getElementById('req-paid-amt').innerHTML;

    console.log(orderNum, amt)

    let postData = {
        req_order_num: orderNum,
        req_partial_paid: amt
    }

    fetch('https://aimsaoccpay.minisisinc.com/api/SetPartialPaid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        // .then  ( res => res.json())
        .then(data => {
            console.log('set partial paid')
            console.log(data)
        })
        .catch(err => { throw new Error(`HTTP error! status: ${err}`) })
}

// This function disables
const agreementChecked = () => {
    let checkbox = document.getElementById('pay-agreement');
    let payBtn = document.getElementById('complete-pay-btn');

    if (checkbox.checked == true) payBtn.disabled = false;
    else payBtn.disabled = true;
}

// This function redirects back to client profile when in page back button is pressed
const backToProfile = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sess = urlParams.get('sess')

    window.location = `https://aims.archives.gov.on.ca/scripts/mwimain.dll/${sess}?GET&FILE=[AO_ASSETS]html/patronProfile.html`
}

// This function redirects to the client profile after successfully completing a payment transaction
const successRedirectToProfile = async(orderNum) => {
    let url = `https://aims.archives.gov.on.ca/scripts/mwimain.dll/144/PAYMENT_VIEW/WEB_PAY_RCPT_FINAL/REQ_ORDER_NUM ${orderNum}?COMMANDSEARCH&sess=${sessionId}`
    let animation = document.getElementById('animation-loader');

    animation.style.display = 'flex';

    let start = await new Promise(resolve => setTimeout(resolve, 5000));
    clearTimeout(start);

    animation.style.display = 'none';
    console.log('Success: redirecting back now');
    window.location = url;
}

/*
 * This function gets the receipt for an order payment. It takes in a string representing the value of the search expression
 *  @params { e } a string 
 */
const getReceiptOnClick = (e) => {
    let url = `${home_sessid}/REQ_ORDER_NUM ${e.dataset.searchExp}?SEARCH_N_OUTPUTFILE&DATABASE=REQUEST_INFO&REPORT=CCPAY_PAY_RECEIPT&DOWNLOADPAGE=[AO_INCLUDES]pdf.htm&NOMSG=[AO_INCLUDES]error/nopayreceipt.htm&EXTENSION=PDF`;
    // let url = `${home_sessid}/REQ_ORDER_NUM ${e.dataset.searchExp}?SEARCH_N_OUTPUTFILE&DATABASE=REQUEST_INFO&REPORT=CCPAY_PAY_RECEIPT&NOMSG=[AO_INCLUDES]error/nopayreceipt.htm&EXTENSION=PDF`;
    console.log(url);

    // <!-- RL-20211221 - load /includes/load_pdf.htm page in the separate form tab -->
    $outputfile_url = url;
    window.open('/includes/load_pdf.htm', "_blank");
}