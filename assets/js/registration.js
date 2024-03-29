let emailCheck = false;
$(document).ready(function() {
    let useremail = sessionStorage.getItem('useremail');
    let usersub = sessionStorage.getItem('usersub');
    if (useremail) {
        document.getElementById('c_email').value = useremail;
    }
    if (usersub) {
        document.getElementById('reg-password').value = usersub;
    }

    // var password = dynamicPassword(useremail);
    // // alert ( password );
    // $("#reg-password").val(password);

    $("#msform").on("keypress", function(event) {
        var keyPressed = event.keyCode || event.which;
        if (keyPressed === 13) {
            event.preventDefault();
            return false;
        }
    });
    let current_fs, next_fs, previous_fs; //fieldsets
    let opacity;

    function nextForm() {
        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({
                    'opacity': opacity
                });
            },
            duration: 600
        });
    }
    $(".next").click(function() {

        // Page 1 - Registration Details Requirements
        var firstName = document.getElementById('reg-firstname');
        var lastName = document.getElementById('reg-lastname');
        var street = document.getElementById('c_street')
        var city = document.getElementById('c_city')
        var prov = document.getElementById('c_prov_state');
        var postal = document.getElementById('c_postal_zip')
        var country = document.getElementById('c_country')
        var email = document.getElementById('c_email');
        var password = document.getElementById('reg-password');
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/
            // Page 2 - Registration Details Requirements
            // Page 3 - Registration Details Requirements
            // Page 4 - Registration Details Requirements

        let index = $(".next").index(this)
        if (index === 0) {
            if ((!firstName.value.match(/^[a-zA-Z ,.'-]+$/i)) || (firstName.value === '')) {
                showMessage("First name must only contain letters or non-empty.")
            } else if ((!lastName.value.match(/^[a-zA-Z ,.'-]+$/i)) || (lastName.value === '')) {
                showMessage("Last name must only contain letters or non-empty.")
            } else {
                current_fs = $(this).parent();
                next_fs = $(this).parent().next();
                nextForm();

            }
        } else if (index === 1) {
            if (street.value.trim() === '') {
                showMessage("Please enter an address.")
            } else if (city.value.trim() === '') {
                showMessage("Please enter a city.")
            } else if (prov.value.trim() === '') {
                showMessage("Please enter a province.")
            } else if (postal.value.trim() === '') {
                showMessage("Please enter a postal code.")
            } else if ((country.value.trim() === '')) {
                showMessage("Please enter a country.")
            } else {
                current_fs = $(this).parent();
                next_fs = $(this).parent().next();
                nextForm();

            }
        } else {
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            nextForm();
        }




        // }





    });

    // disables Next button whenever email field add/delete characters
    $('#c_email').on('change', function() {
        emailCheck = false;
        $('#email-check').text('Verify');
        $('#email-check').removeClass('btn-success');
        $('#email-check').addClass('btn-light');
        // $('#detail-next').attr("disabled", true);
    });

    let checkEmail = async _ => {
        let emailInput = document.getElementById('c_email').value;


        console.log(emailInput)
        const res = await fetch(`https://aims.archives.gov.on.ca/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_EMAIL_CHECK/C_EMAIL "${emailInput}"?SESSIONSEARCH&NOMSG=[AO_INCLUDES]noEmail.xml`)
        const data = await res.text()
        console.log(data)

        var parser = new DOMParser();
        var doc = parser.parseFromString(data, "text/html");
        let count = doc.getElementById('email-count').innerText;
        console.log(count)
        if (count === '0') {
            return true;
        }

        return false;



    }

    function showMessage(text) {
        $('#reg_msg').html(`<b>${text}</b>`)
        $('#reg_modal').modal('show')
        setTimeout(function() { $('#reg_modal').modal('hide'); }, 1400);
    }


    $(".previous").click(function() {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({
                    'opacity': opacity
                });
            },
            duration: 600
        });
    });

    $('.radio-group .radio').click(function() {
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });



    $('#submit_registation').click(function() {
        // console.log(emailCheck)
        // if (emailCheck) {

        // } else {
        //     showMessage('Please verify your email address again !')
        // }
        $('#msform').submit()
    })

});