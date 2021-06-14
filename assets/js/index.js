console.log('hello')

const onClickSearchOption = (value) => {
    let option = value == 'Keyword Search' ? 'Option 1: ' : 'Option 2: ';
    let span = document.getElementById('Option-Choice');
    span.innerText = option + value;
}

let lastKnownScrollPosition = 0;
let ticking = false;

const  doSomething = (scrollPos) => {
    // Do something with the scroll position
    console.log(scrollPos)
}

let scroll = document.getElementById('FAQ-Wheel');

scroll.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = scroll.scrollY;
    console.log(e)
  
    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(lastKnownScrollPosition);
        ticking = false;
      });
  
      ticking = true;
    }
  });
