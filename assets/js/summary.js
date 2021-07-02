window.onload = () => {
    getRecordModals();
    setModalAttributes(getRecordModals());
}

const getRecordModals = () => {
    let classList = document.getElementsByClassName('modal');
    return classList;
}

const setModalAttributes = (list) => {
    for (let i = 0; i < list.length; i++)
    {
        // The crowd source button of the record item
        let trigger = list[i].parentNode.childNodes[3].childNodes[1];
        // The h5 of the modal of the record item
        let h5 = list[i].childNodes[1].childNodes[1].childNodes[1].childNodes[1];
        // The button for closing the modal
        let button = list[i].childNodes[1].childNodes[1].childNodes[1].childNodes[3];

        let title= list[i].parentNode.childNodes[1].childNodes[3].innerText.split('Title: ')[1];
        console.log(title)

        let textNode = document.createTextNode(title)



        trigger.setAttribute('data-bs-target', `#modal-${i}`);
        list[i].setAttribute('id', `modal-${i}`);
        list[i].setAttribute('aria-labelledby', `modal-label-${i}`);
        h5.setAttribute('id', `modal-label-${i}`);
        h5.appendChild(textNode);
        
    }
}

