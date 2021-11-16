window.onload = () => {
    setTestPayForm(testPay)
}


let testPay = {
    req_order_num: "0000000883",
    req_patron_id: "karl@minisisinc.com",
    pay_amount: "40.00",
    success_url: "https://aoopac.minisisinc.com/assets/html/paymentSuccess.html?req_order_num=${merchantNum}",
    cancel_url: "https://aoopac.minisisinc.com/assets/html/paymentCancel.html?req_order_num=${merchantNum}",
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
    fetch('https://aopay.minisisinc.com/api/initPay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application.json'
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
