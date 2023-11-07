window.onload = () => {
    setTestPayForm(testPay)
}


// REMINDER https://aims.archives.gov.on.ca/scripts/mwimain.dll/177070042?GET&FILE=[ao_opac]/145/assets/html/patronProfile.html


let req_order_num = '0000000894';
// let nomsg = 'https://aims.archives.gov.on.ca/scripts/mwimain.dll/?GET&FILE=[ao_opac]/145/includes/error/nopayreceipt.html';
// let testSuccessUrl2 = `${home_sessid}/144/REQUEST_INFO/WEB_PAY_RCPT_DET/REQ_ORDER_NUM ${req_order_num}?SESSIONSEARCH`;
let  testSuccessUrl = `https://aims.archives.gov.on.ca/scripts/mwimain.dll/145/PAYMENT_VIEW/WEB_PAY_RCPT_DET/REQ_ORDER_NUM ${req_order_num}?COMMANDSEARCH`;


{/* <Site Address>
/{minisa.dll|mwimain.dll|mwimain.php}
/<Language ID>
/<Application ID>
/<Report Specification>
[/<Search Expression>]  
?COMMANDSEARCH
[&SHOWSINGLE={Y|N}]
[&DISPLAY=<Display Text>]
[&EXP=<Search Expression>]
[&FLD=<Search Mnemonic>]
[&NOMSG=<Message File Path>]
[&URLMARKER=<URL Marker>]
[&RANKING={Y|N}]
[&HIGHLIGHTING={Y|N}]
[&SIMPLE_EXP={Y|N}]
[PREFIX=<Prefix>]
[&NO_RANK_SORT={Y|N}] */}


let testPay = {
    req_order_num: req_order_num,
    req_patron_id: "karl@minisisinc.com",
    pay_amount: "10.00",
    success_url: testSuccessUrl,
    cancel_url: `https://aims.archives.gov.on.ca/assets/html/paymentCancel.html?REQ_ORDER_NUM=${req_order_num}`,
    locale: "en",
    testLevel: 1
}

const setTestPayForm = (testPay) => {
    let clientId = document.getElementById('Test-Pay-Client-Id')
    let orderNum = document.getElementById('Test-Pay-Merchant-Num')
    let amt = document.getElementById('Test-Pay-Amount')

    clientId.innerText = testPay.req_patron_id
    orderNum.innerText = testPay.req_order_num
    amt.innerText = testPay.pay_amount
}

const requestTestOrder = () => {
    fetch('https://minaopay.minisisinc.com/api/initPay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(testPay)
    })
    .then  (res => res.json())
    .then  (data => { 
        console.log('Requesting to pay')
        getData(data)
    })
    .catch (err => { console.error(`Error: ${err}`) })
}

const getData = data => {
    console.log('Getting data')
    console.log(data)
    window.location = data.redirect_url
}
