$(document).ready(function () {



});

let fullName = ''
$('#enqFirstName').change(function () {
  console.log('test')
  let firstName = document.getElementById('enqFirstName').value;
  let lastName = document.getElementById('enqLastName').value;

  fullName = firstName + ' ' + lastName;
  document.getElementById('enqFullName').value = fullName
})

$('#enqLastName').change(function () {
  console.log('test')
  let firstName = document.getElementById('enqFirstName').value;
  let lastName = document.getElementById('enqLastName').value;

  fullName = firstName + ' ' + lastName;
  document.getElementById('enqFullName').value = fullName
})

