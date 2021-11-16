let emailCheck = false;
$(document).ready(function() {

    $("#msform").on("keypress", function(event) {
        var keyPressed = event.keyCode || event.which;
        if (keyPressed === 13) {
            event.preventDefault();
            return false;
        }
    });
    let current_fs, next_fs, previous_fs; //fieldsets
    let opacity;
    
    $(".next").click(function() {

        // Page 1 - Registration Details Requirements
        var firstName = document.getElementById('reg-firstname');
        var lastName = document.getElementById('reg-lastname');
        var email = document.getElementById('c_email');
        var password = document.getElementById('reg-password');
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        // Page 2 - Registration Details Requirements
        // Page 3 - Registration Details Requirements
        // Page 4 - Registration Details Requirements



        if ((!firstName.value.match(/^[A-Za-z]+$/)) || (firstName.value === '')) {
            showMessage("First name must only contain letters or non-empty.")
        } else if ((!lastName.value.match(/^[A-Za-z]+$/)) || (lastName.value === '')) {
            showMessage("Last name must only contain letters or non-empty.")
        } else if (!emailCheck) {
            checkEmail().then(res => {
                console.log(password.value)
                if (document.getElementById('c_email').value.trim() === '') {
                    showMessage("Please fill out your email address.")
                } else if (!res) {
                    showMessage('This email address has already been registered ! Please use another email address.')
                } else if (!password.value.match(passwordRegex)) {
                    showMessage("Password must contain at least eight characters, at least one uppercase letter, one lowercase letter, one special character and one number.")
                } else {
                    current_fs = $(this).parent();
                    next_fs = $(this).parent().next();

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
            });


        }
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
        const res = await fetch(`https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_EMAIL_CHECK/C_EMAIL "${emailInput}"?SESSIONSEARCH&NOMSG=[AO_INCLUDES]noEmail.xml`)
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
    // $('#email-check').click(function() {

    //     let emailInput = document.getElementById('c_email').value;


    //     console.log(emailInput)

    //     $.ajax(`https://aoopac.minisisinc.com/scripts/mwimain.dll/144/CLIENT_REGISTRATION/WEB_EMAIL_CHECK/C_EMAIL "${emailInput}"?SESSIONSEARCH&NOMSG=[AO_INCLUDES]noEmail.xml`).done(res => {
    //         console.log(res)

    //         var parser = new DOMParser();
    //         var doc = parser.parseFromString(res, "text/html");
    //         let count = doc.getElementById('email-count').innerText;
    //         console.log(count)
    //         if (count === '0') {
    //             // showMessage('This email is available to use.')
    //             emailCheck = true
    //             $('#email-check').text('Verified !')

    //             $('#email-check').removeClass('btn-warning');
    //             $('#email-check').addClass('btn-success');
    //             // $('#detail-next').removeAttr("disabled");
    //             // chk4 = true;
    //         } else {
    //             emailCheck = false
    //             showMessage('This email address has already been registered ! Please use another email address.')
    //         }
    //     })

    // })


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