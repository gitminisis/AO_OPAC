const onClickSearchOption = (value) => {
    let option = value == 'Keyword Search' ? 'Option 1: ' : 'Option 2: ';
    let span = document.getElementById('Option-Choice');
    span.innerText = option + value;
}


let open = false;
const accordionOnClick = (e) => {
  console.log(e);
  console.log(e.parentNode)
  console.log(e.classList[1])
  if (!open) {
    console.log('closed');
    e.parentNode.classList.add('open');
    open = true;
    console.log('opening');
  } else {
    console.log('open');
    e.parentNode.classList.remove('open');
    open = false;
    console.log('closing');
  }
}

  // const headerBurger = document.querySelector('.Header-Btn')
  // const accordion = document.getElementById('accordion-button'); // we get the accordion button to add eventlistner
  // let burgerOpen = false;
  // accordion.addEventListener('click', () => {
  //   if(!burgerOpen) {
  //     headerBurger.classList.add('open');
  //     burgerOpen = true;
  //   } else {
  //     headerBurger.classList.remove('open');
  //     burgerOpen = false;
  //   }
  // });

