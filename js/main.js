$(document).ready(function () {
    "use strict";
//Appointment form
    $(document).on("click", '#cf-submit', function () {
        var error = ValidationProjectContactForm();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/send_form_email.php",
                data: $("#appointment-form").serialize(),
                success: function (result) {
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#success-project-contact-form").html(result);
                    $("#success-project-contact-form").fadeIn("slow");
                    $('#success-project-contact-form').delay(4000).fadeOut("slow");
                }
            });
        }
    });
    function ValidationProjectContactForm() {
        var error = true;
        $('#appoinment input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#appointment-form").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#appointment-form").find("input:eq(" + index + ")").removeClass("required-error");
                }
            } else if (index == 2) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#appointment-form").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#appointment-form").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }

        });
        return error;
    }
});