window.onload = () => {
    let urlArr = window.location.href.split('/');
    let html = urlArr[urlArr.length - 1];

    if (html == 'payment.html')
        requestPayment();
}

const requestPayment = () => {
    let clientId = patron_id.split(']')[1]
    let lang    = document.getElementsByTagName('html')[0].getAttribute('lang');

    let sillyTestUrl = 'https://www.google.ca/'

    // Hidden inputs
    let userLang = document.getElementById('Pay-Language').value = lang;
    let returnSuccess = document.getElementById('Return-Success').value = sillyTestUrl;
    let returnCancel = document.getElementById('Return-Cancel').value = sillyTestUrl;

    console.log(userLang);
    console.log(returnSuccess);
    console.log(returnCancel);
    
    //User pre-populated inputs
    let userId = document.getElementById('Pay-Client-Id');
    let prodId = document.getElementById('Pay-Product-Id');
    let amt    = document.getElementById('Pay-Amount');

    userId.value = clientId;
    prodId.value = 'F 21-1';
    amt.value    = 400.00;

    
}