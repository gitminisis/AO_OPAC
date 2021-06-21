var HOME_SESSID = getCookie("HOME_SESSID");
var SESSID = getCookie("SESSID");

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

/* * * * * * * * * * * * *
 * *                   * *
 * *      Cookies      * *
 * *                   * *
 * * * * * * * * * * * * */
function deleteCookie(cname) {
    document.cookie = cname + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
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

