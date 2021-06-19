const onClickSearchOption = (value) => {
    let option = value == 'Keyword Search' ? 'Option 1: ' : 'Option 2: ';
    let span = document.getElementById('Option-Choice');
    span.innerText = option + value;
}


  const menuBtn = document.querySelector('.menu-btn')
  console.log(menuBtn)
  const accordion = document.getElementById('accordion-button'); // we get the accordion button to add eventlistner
  let menuOpen = false;
  accordion.addEventListener('click', () => {
    if(!menuOpen) {
      menuBtn.classList.add('open');
      menuOpen = true;
    } else {
      menuBtn.classList.remove('open');
      menuOpen = false;
    }
  });

  const menuBtn2 = document.querySelectorAll('.menu-btn')
  console.log(menuBtn2)
