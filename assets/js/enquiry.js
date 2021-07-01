$(document).ready(function() {
  if (document.querySelector("#Question-Form")) {
    document.querySelector(".Question-Option").selected = true;
  } else if (document.querySelector("#Donation-Form")) {

    document.querySelector(".Donation-Option").selected = true;
  } else if (document.querySelector("#FOI-Form")) {
    document.querySelector(".FOI-Option").selected = true;
  }
});
