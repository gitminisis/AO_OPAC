const onClickSearchOption = (value) => {
    let option = value == 'Keyword Search' ? 'Option 1: ' : 'Option 2: ';
    let span = document.getElementById('Option-Choice');
    span.innerText = option + value;
}


let headOpen  = false;
let quickOpen = false;
const headAccordionOnClick = (e) => {
  if (!headOpen) {
    e.parentNode.classList.add('open');
    headOpen = true;
  } else {
    e.parentNode.classList.remove('open');
    headOpen = false;
  }
}

const navAccordionOnClick = (e) => {
  if (!quickOpen) {
    e.parentNode.classList.add('open');
    quickOpen = true;
  } else {
    e.parentNode.classList.remove('open');
    quickOpen = false;
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

