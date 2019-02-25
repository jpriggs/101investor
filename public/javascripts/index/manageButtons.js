$(document).ready(function () {

    //Set form's initial state
    setInitialLoginState();
    
    //Fire click event on button push
    $('#username-button, #google-button, #facebook-button, #github-button').on('click', function () {
        //Manage username login form animations
        if (this.id === 'username-button') {
            $('#login-wheel, #login-header').fadeOut(500, function () {

                //Fades in login form
                $('#blurbox, .username-box').fadeIn(500);
            });
        }
    });

    //Show registration form
    $('.user-register-btn').on('click', function () {
        //Move error message and change text to match registration context
        $('.password-error').css('top', '185px').text("passwords don't match");
        setRegistrationState();
    });

    //Cancel registration and remove registration inputs
    $('.user-cancel-btn').on('click', function () {
        //Move error message and change text to match log in context
        $('.password-error').css('top', '140px').text('incorrect username or password');
        cancelRegistration();
    });

    //Close button hover animation
    $('.close-button').mouseover(function () {
        $(this).css('transform', 'rotate(360deg)').css('transition', 'transform 0.5s ease-out 0s');
    });
    $('.close-button').mouseout(function () {
        $(this).css('transform', 'rotate(0deg)').css('transition', 'transform 0.5s ease-out 0s');
    });

    //Closes form and brings back login wheel options
    $('.close-button').on('click', function () {

        //Fades out the login form
        $('#blurbox, .username-box').fadeOut(500, function () {

            //Fade in the login wheel
            $('#login-wheel, #login-header').fadeIn(500, function () {
                //Reset form state after fade out
                $('.user-login-btn').removeClass('btn-success').addClass('btn-primary').text('Log In');
                $('.user-register-btn').show();
                $('.password-error').css('top', '140px').text('incorrect username or password');
                setInitialLoginState();
            });
        });
    });
});

//Sets the initial login form state
function setInitialLoginState() {
    //Hide 'sign up' elements on form until sign up button is clicked
    $('#blurbox, .username-box, #password-confirm, .email-label, #email, #email-confirm, .error-msg, .user-cancel-btn').hide();

    //Set initial form element positions and container size
    $('#blurbox').css('height', '280px');
    $('.password-error').css('top', '140px');
    $('.user-login-btn').css('top', '165px');
    $('.user-register-btn').css('top', '210px');
}

//Expands the form to be in the user registration state
function setRegistrationState() {
    //Increase registration form height
    $('#blurbox').stop().animate({ height: '460px' });
    
    //Fade out register button
    $('.user-register-btn').fadeOut(100, function () {
        //Change submit button text from 'Login' to 'Register', move, and disable it
        $('.user-login-btn').stop().animate({ top: '340' })
            .text('Register')
            .removeClass('btn-primary').addClass('btn-success')
            .attr('disabled', 'disabled');

        //Fade in registration inputs and cancel button
        $('#password-confirm, .email-label, #email, #email-confirm').fadeIn(1500, function () {
            //Re-enable register button after animation
            $('.user-login-btn').removeAttr('disabled');
        });
        //Show the cancel button
        $('.user-cancel-btn').fadeIn(1200);
    });

}

function cancelRegistration() {

    //Fade out the cancel button
    $('.user-cancel-btn').fadeOut(100, function () {
        //Fade out registration form inputs
        $('#password-confirm, .email-label, #email, #email-confirm').fadeOut(250);

        //Move, disable, and rename registration button
        $('.user-login-btn').stop().animate({ top: '165' }, 500)
            .text('Log In')
            .removeClass('btn-success').addClass('btn-primary')
            .attr('disabled', 'disabled');

        //Decrease registration form height
        $('#blurbox').stop().animate({ height: '280px' }, 500);

        //Fade in login button after registration inputs fade out
        $('.user-register-btn').fadeIn(1500, function () {
            //Re-enable login button after animation
            $('.user-login-btn').removeAttr('disabled');
        });
    });    
}
